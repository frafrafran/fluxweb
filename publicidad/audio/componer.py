"""
Banda sonora original del reel «Hacemos webs a medida».

Todo se sintetiza acá con numpy, sin samples ni música de terceros. Sale un WAV
estéreo a 48 kHz en public/media/audio.wav, ya masterizado a -14 LUFS (lo que
Instagram normaliza).

La grilla musical está atada a los gestos del video: el compás 1 cae justo
cuando aparecen los dos índices (2,00 s) y el golpe final cuando la mano tapa
la lente (5,45 s). Entre esos dos puntos hay exactamente dos compases, de ahí
el tempo: 8 negras en 3,45 s, unos 139 BPM tocados a medio tiempo.

Uso: python audio/componer.py
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
import wave

import numpy as np

SR = 48_000
DUR = 8.5
N = int(SR * DUR)
RNG = np.random.default_rng(2110)

# --- Grilla ------------------------------------------------------------------
B = 3.45 / 8  # una negra
G0 = 2.0 - 4 * B  # arranque del compás 0 (la intro)


def T(bar: int, beat: float = 0.0) -> float:
    return G0 + (bar * 4 + beat) * B


# Momentos del video (en segundos) que la música respeta.
DROP = T(1)  # aparecen los índices y la primera captura
CARDS = [T(1, i) for i in range(5)]  # una captura por negra
QUESTION = T(2, 1)  # entra la pregunta
HAND = 5.15  # la mano empieza a tapar la lente
HIT = T(3)  # placa final

# --- Utilidades --------------------------------------------------------------


def midi(n: float) -> float:
    return 440.0 * 2 ** ((n - 69) / 12)


def t_axis(dur: float) -> np.ndarray:
    return np.arange(int(dur * SR)) / SR


def place(bus: np.ndarray, sig: np.ndarray, at: float, gain=1.0, pan=0.0):
    """Suma `sig` (mono o estéreo) en `bus` desde el segundo `at`."""
    i = int(round(at * SR))
    if i >= bus.shape[1]:
        return
    if sig.ndim == 1:
        left = np.cos((pan + 1) * np.pi / 4)
        right = np.sin((pan + 1) * np.pi / 4)
        sig = np.vstack([sig * left, sig * right]) * np.sqrt(2)
    j = min(bus.shape[1], i + sig.shape[1])
    bus[:, i:j] += sig[:, : j - i] * gain


def fftconv(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    n = len(a) + len(b) - 1
    size = 1 << (n - 1).bit_length()
    out = np.fft.irfft(np.fft.rfft(a, size) * np.fft.rfft(b, size), size)
    return out[:n]


def spectral(x: np.ndarray, gain_fn, nfft=2048, hop=512) -> np.ndarray:
    """Filtro que puede cambiar en el tiempo: STFT, ganancia por cuadro, OLA.

    gain_fn(freqs, t) devuelve la ganancia para cada frecuencia en el
    instante t (segundos desde el inicio de x).
    """
    win = np.hanning(nfft)
    pad = np.concatenate([np.zeros(nfft), x, np.zeros(nfft)])
    out = np.zeros_like(pad)
    norm = np.zeros_like(pad)
    freqs = np.fft.rfftfreq(nfft, 1 / SR)
    for start in range(0, len(pad) - nfft, hop):
        frame = pad[start : start + nfft] * win
        t = (start - nfft + nfft / 2) / SR
        spec = np.fft.rfft(frame) * gain_fn(freqs, t)
        out[start : start + nfft] += np.fft.irfft(spec, nfft) * win
        norm[start : start + nfft] += win**2
    out /= np.maximum(norm, 1e-6)
    return out[nfft : nfft + len(x)]


def lowpass_curve(f, fc, order=4):
    return 1 / np.sqrt(1 + (f / max(fc, 1)) ** (2 * order))


def highpass_curve(f, fc, order=4):
    return 1 / np.sqrt(1 + (max(fc, 1) / np.maximum(f, 1)) ** (2 * order))


def band_curve(f, fc, q=1.5):
    return np.exp(-0.5 * (np.log2(np.maximum(f, 1) / fc) * q) ** 2)


def lowpass(x, fc, order=4):
    return spectral(x, lambda f, t: lowpass_curve(f, fc, order))


def highpass(x, fc, order=4):
    return spectral(x, lambda f, t: highpass_curve(f, fc, order))


def bandpass(x, fc, q=1.5):
    return spectral(x, lambda f, t: band_curve(f, fc, q))


def env_adsr(n, a=0.003, d=1.0, floor=0.0):
    t = np.arange(n) / SR
    att = np.clip(t / max(a, 1e-4), 0, 1)
    return att * (floor + (1 - floor) * np.exp(-t / d))


def fade(sig, fin=0.002, fout=0.02):
    n = sig.shape[-1]
    e = np.ones(n)
    a, b = int(fin * SR), int(fout * SR)
    if a:
        e[:a] = np.linspace(0, 1, a)
    if b:
        e[-b:] *= np.linspace(1, 0, b)
    return sig * e


# --- Instrumentos ------------------------------------------------------------


def rhodes(note: float, dur: float, vel=0.8) -> np.ndarray:
    """Piano eléctrico FM: un par 1:1 para el cuerpo y otro 14:1 para la púa."""
    f = midi(note)
    t = t_axis(dur)
    idx = 1.6 * vel * np.exp(-t / 0.45) + 0.25
    body = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * f * t))
    tine_idx = 1.2 * vel * np.exp(-t / 0.04)
    tine = np.sin(2 * np.pi * f * t + tine_idx * np.sin(2 * np.pi * 14 * f * t))
    decay = 2.4 * (220 / f) ** 0.35
    sig = (0.8 * body + 0.35 * tine * np.exp(-t / 0.25)) * env_adsr(len(t), 0.004, decay)
    return fade(sig * vel, 0.002, 0.08)


def chord_rhodes(notes, dur, vel=0.7, spread=0.012):
    """Acorde con un rasgueo mínimo y paneo abierto, como tocado a mano."""
    out = np.zeros((2, int((dur + spread * len(notes)) * SR)))
    for k, n in enumerate(notes):
        pan = np.interp(k, [0, len(notes) - 1], [-0.45, 0.45])
        place(out, rhodes(n, dur, vel * (0.92 + 0.08 * RNG.random())), k * spread, 0.5, pan)
    t = np.arange(out.shape[1]) / SR
    trem = 0.12 * np.sin(2 * np.pi * 4.6 * t)
    out[0] *= 1 + trem
    out[1] *= 1 - trem
    return out


def pad(notes, dur, bright=2200.0) -> np.ndarray:
    """Colchón de sierras desafinadas, filtrado y con ataque lento."""
    t = t_axis(dur)
    out = np.zeros((2, len(t)))
    for n in notes:
        f0 = midi(n)
        for side, det in ((0, -7), (1, 6), (0, 2), (1, -3)):
            f = f0 * 2 ** (det / 1200)
            phase = RNG.random() * 2 * np.pi
            h_max = int(min(9000 / f, 40))
            saw = sum(np.sin(2 * np.pi * f * h * t + phase * h) / h for h in range(1, h_max + 1))
            out[side] += saw
    out = np.vstack([lowpass(out[0], bright, 2), lowpass(out[1], bright, 2)])
    e = np.clip(t / 0.6, 0, 1) * np.clip((dur - t) / 0.8, 0, 1)
    return out * e * 0.035


def bass(note: float, dur: float, vel=0.9) -> np.ndarray:
    f = midi(note)
    t = t_axis(dur)
    sig = np.sin(2 * np.pi * f * t) + 0.25 * np.sin(4 * np.pi * f * t)
    sig = np.tanh(1.6 * sig) * env_adsr(len(t), 0.006, 0.9, 0.35)
    return fade(sig * vel, 0.003, 0.06)


def kick(vel=1.0) -> np.ndarray:
    t = t_axis(0.6)
    f = 44 + 120 * np.exp(-t / 0.028)
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * np.exp(-t / 0.28)
    click = highpass(RNG.standard_normal(len(t)) * np.exp(-t / 0.002), 2500) * 0.25
    return np.tanh(1.4 * (body + click)) * vel


def clap(vel=1.0) -> np.ndarray:
    t = t_axis(0.45)
    noise = RNG.standard_normal(len(t))
    e = np.zeros(len(t))
    for k, off in enumerate((0, 0.009, 0.019)):
        tt = np.clip(t - off, 0, None)
        e += (t >= off) * np.exp(-tt / (0.007 if k < 2 else 0.11))
    return bandpass(noise * e, 1700, 1.1) * vel * 0.9


def hat(vel=1.0, open_=False) -> np.ndarray:
    t = t_axis(0.4 if open_ else 0.12)
    metal = sum(
        np.sign(np.sin(2 * np.pi * f * t))
        for f in (205.3, 304.4, 369.6, 522.7, 540, 800)
    )
    noise = RNG.standard_normal(len(t))
    sig = highpass(0.4 * metal + noise, 7500, 3)
    return sig * np.exp(-t / (0.12 if open_ else 0.022)) * vel * 0.32


def shaker(vel=1.0) -> np.ndarray:
    t = t_axis(0.09)
    e = np.clip(t / 0.008, 0, 1) * np.exp(-t / 0.03)
    return bandpass(RNG.standard_normal(len(t)), 7000, 1.2) * e * vel * 0.22


def marimba(note: float, vel=0.8) -> np.ndarray:
    """Golpe de vidrio y madera para cada captura que entra."""
    f = midi(note)
    t = t_axis(1.4)
    sig = (
        np.sin(2 * np.pi * f * t) * np.exp(-t / 0.42)
        + 0.32 * np.sin(2 * np.pi * 3.98 * f * t) * np.exp(-t / 0.07)
        + 0.08 * np.sin(2 * np.pi * 9.1 * f * t) * np.exp(-t / 0.015)
    )
    return fade(sig * vel, 0.0015, 0.05)


def pop(vel=1.0) -> np.ndarray:
    """Burbuja corta: le da el «tac» táctil a la captura que aparece."""
    t = t_axis(0.05)
    f = 520 + 900 * (1 - np.exp(-t / 0.006))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.012) * vel


def tick(vel=1.0) -> np.ndarray:
    t = t_axis(0.04)
    tone = np.sin(2 * np.pi * 2350 * t) * np.exp(-t / 0.006)
    noise = highpass(RNG.standard_normal(len(t)), 3000) * np.exp(-t / 0.003) * 0.3
    return (tone + noise) * vel


def bell(note: float, dur=3.0, vel=0.6) -> np.ndarray:
    f = midi(note)
    t = t_axis(dur)
    idx = 2.2 * np.exp(-t / 0.6)
    sig = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * 3.5 * f * t))
    return fade(sig * np.exp(-t / 1.1) * vel, 0.002, 0.2)


def whoosh(dur: float, f_lo=250.0, f_hi=4200.0, peak=0.75) -> np.ndarray:
    """Ruido que barre la banda y se infla hacia `peak` (fracción de dur)."""
    t = t_axis(dur)
    n = RNG.standard_normal(len(t))

    def g(f, tt):
        p = np.clip(tt / dur, 0, 1)
        curve = p / peak if p < peak else 1 - (p - peak) / (1 - peak) * 0.7
        fc = f_lo * (f_hi / f_lo) ** curve
        return band_curve(f, fc, 0.9)

    sig = spectral(n, g)
    p = t / dur
    amp = np.where(p < peak, (p / peak) ** 2.2, np.exp(-(p - peak) / (1 - peak) * 3.5))
    sig = sig * amp
    pan = np.interp(p, [0, 1], [-0.6, 0.6])
    sig = sig / np.max(np.abs(sig)) * 0.6
    return np.vstack([sig * np.cos((pan + 1) * np.pi / 4), sig * np.sin((pan + 1) * np.pi / 4)]) * np.sqrt(2)


def riser(dur: float) -> np.ndarray:
    t = t_axis(dur)
    p = t / dur
    noise = spectral(
        RNG.standard_normal(len(t)),
        lambda f, tt: highpass_curve(f, 400 * (12 ** np.clip(tt / dur, 0, 1)), 2),
    )
    f = 180 * (6 ** p)
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.25
    return (noise * 0.6 + tone) * p**2.5


def reverse_crash(dur: float) -> np.ndarray:
    t = t_axis(dur)
    sig = highpass(RNG.standard_normal(len(t)), 5000, 2) * np.exp(-t / (dur / 3))
    return sig[::-1] * 0.5


def boom() -> np.ndarray:
    t = t_axis(2.6)
    f = 34 + 40 * np.exp(-t / 0.08)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.9)
    thump = lowpass(RNG.standard_normal(len(t)) * np.exp(-t / 0.05), 300) * 0.5
    return np.tanh(1.8 * (body + thump)) * 0.9


def vinyl(dur: float) -> np.ndarray:
    """Crujido de vinilo muy bajo: le saca lo digital al resto."""
    n = int(dur * SR)
    hiss = bandpass(RNG.standard_normal(n), 3500, 0.6) * 0.012
    pops = np.zeros(n)
    idx = RNG.choice(n, size=int(dur * 14), replace=False)
    pops[idx] = RNG.standard_normal(len(idx)) * RNG.random(len(idx)) ** 3
    pops = bandpass(pops, 2500, 0.8) * 0.5
    return hiss + pops


def reverb_ir(rt=2.3, length=3.0, predelay=0.018) -> np.ndarray:
    t = t_axis(length)
    out = []
    for _ in range(2):
        tail = RNG.standard_normal(len(t)) * np.exp(-6.9 * t / rt)
        tail = spectral(tail, lambda f, tt: lowpass_curve(f, 5200 * np.exp(-tt / 1.4) + 900, 1))
        early = np.zeros(len(t))
        for d, a in ((0.011, 0.5), (0.019, 0.35), (0.031, 0.3), (0.047, 0.2)):
            early[int((d + RNG.random() * 0.004) * SR)] = a * RNG.choice([-1, 1])
        ir = np.concatenate([np.zeros(int(predelay * SR)), early + tail * 0.35])
        out.append(ir / np.sqrt(np.sum(ir**2)))
    return np.array(out)


# --- Arreglo -----------------------------------------------------------------

# Re mayor: vi – IV – V – I
BM9 = (62, 66, 69, 73)  # D F# A C#  sobre B
GMAJ9 = (59, 62, 66, 69)  # B D F# A   sobre G
A69 = (61, 66, 71, 76)  # C# F# B E  sobre A
DMAJ9 = (66, 69, 73, 76)  # F# A C# E  sobre D


def build():
    music = np.zeros((2, N))
    drums = np.zeros((2, N))
    sfx = np.zeros((2, N))
    send = np.zeros((2, N))  # lo que va a la reverb

    # Intro: acorde soñado, filtrado, que se abre hacia el drop.
    intro = chord_rhodes(BM9, 2.2, 0.55)
    intro = np.vstack([
        spectral(ch, lambda f, t: lowpass_curve(f, 700 * (4 ** np.clip(t / 1.7, 0, 1)), 2))
        for ch in intro
    ])
    place(music, intro, T(0), 0.6)
    place(send, intro, T(0), 0.5)
    place(music, pad(BM9, DROP - 0.05, 1400), 0.0, 0.7)
    place(music, bass(35, 1.6, 0.45), T(0), 0.18)  # B1 suave

    # Textos de la intro: dos notas en el acorde.
    for at, n in ((0.30, 78), (0.62, 81)):
        place(music, marimba(n, 0.45), at, 0.35, -0.2 if n == 78 else 0.2)
        place(send, marimba(n, 0.45), at, 0.35)

    # El saludo: un brillo alto y corto.
    for k, n in enumerate((86, 90, 93)):
        place(sfx, bell(n, 1.2, 0.12), 0.70 + k * 0.06, 0.6, 0.3)
        place(send, bell(n, 1.2, 0.12), 0.70 + k * 0.06, 0.8)

    # Antes del drop: Gmaj9 al revés + riser + el barrido de la mano.
    rev = chord_rhodes(GMAJ9, 0.9, 0.7)[:, ::-1]
    place(music, rev, DROP - rev.shape[1] / SR + 0.01, 0.55)
    place(sfx, riser(0.75), DROP - 0.75, 0.35)
    place(sfx, whoosh(0.42, 300, 5000, 0.72), 1.70, 0.9)

    # Compases 1 y 2: el groove con las capturas.
    for bar, (root, ch) in ((1, (31, GMAJ9)), (2, (33, A69))):
        c = chord_rhodes(ch, 4 * B + 0.4, 0.68)
        place(music, c, T(bar), 0.85)
        place(send, c, T(bar), 0.35)
        place(music, pad(ch, 4 * B + 0.3, 2600), T(bar), 0.9)
        # bajo: tónica, octava sincopada y aproximación
        for beat, n, d in ((0, root + 12, 1.3 * B), (1.5, root + 24, 0.45 * B), (2, root + 12, 0.9 * B), (3.5, root + 14, 0.4 * B)):
            place(music, bass(n, d), T(bar, beat), 0.32)

        kicks = (0, 1.5) if bar == 1 else (0, 1.5, 2.75)
        for beat in kicks:
            place(drums, kick(), T(bar, beat), 0.72)
        place(drums, clap(), T(bar, 2), 0.55)
        place(send, clap(), T(bar, 2), 0.45)
        for k in range(8):
            beat = k * 0.5
            if bar == 2 and beat >= 3.0:
                break  # se vacía antes de la mano
            swing = 0.035 * B if k % 2 else 0
            place(drums, hat(0.9 if k % 2 else 0.55), T(bar, beat) + swing, 3.6, 0.25)
        for k in range(16):
            if bar == 2 and k >= 12:
                break
            place(drums, shaker(0.5 + 0.5 * (k % 4 == 2)), T(bar, k * 0.25), 2.6, -0.3)
        if bar == 1:
            place(drums, hat(0.6, open_=True), T(bar, 3.5), 2.4, 0.25)

    # Las capturas: arpegio ascendente, alternando lados como las tarjetas.
    for k, (at, n) in enumerate(zip(CARDS, (78, 81, 83, 86, 88))):
        pan = -0.35 if k % 2 == 0 else 0.35
        place(sfx, marimba(n, 0.8), at, 0.55, pan)
        place(send, marimba(n, 0.8), at, 0.5)
        place(sfx, pop(0.8), at, 0.22, pan)

    # La pregunta: dos ticks, uno por renglón.
    for k, at in enumerate((QUESTION, QUESTION + 0.22)):
        place(sfx, tick(0.6), at, 0.3, -0.15 + 0.3 * k)
        place(send, tick(0.6), at, 0.2)

    # La mano tapa la lente: barrido grave + crash al revés hacia el golpe.
    place(sfx, whoosh(HIT - HAND + 0.12, 180, 2600, 0.85), HAND, 0.95)
    place(sfx, reverse_crash(1.1), HIT - 1.1, 0.6)

    # Placa final: Dmaj9 abierto, golpe grave y campana con el logo.
    end = chord_rhodes(DMAJ9, DUR - HIT, 0.8)
    place(music, end, HIT, 1.0)
    place(send, end, HIT, 0.6)
    place(music, pad(DMAJ9, DUR - HIT, 3000), HIT, 1.2)
    place(music, bass(26, 2.4, 1.0), HIT, 0.28)  # D1
    place(drums, kick(1.0), HIT, 0.8)
    place(sfx, boom(), HIT, 0.45)
    for at, n, v in ((HIT, 86, 0.5), (HIT + 0.012, 93, 0.3), (HIT + B, 81, 0.25), (HIT + 2 * B, 86, 0.22)):
        place(sfx, bell(n, 3.0, v), at, 0.55, 0.15)
        place(send, bell(n, 3.0, v), at, 0.9)

    place(music, np.vstack([vinyl(DUR), vinyl(DUR)]), 0.0, 1.0)

    # Bombeo: el piano y el bajo le hacen lugar a cada bombo.
    duck = np.ones(N)
    kick_times = [T(b, x) for b, ks in ((1, (0, 1.5)), (2, (0, 1.5, 2.75))) for x in ks] + [HIT]
    for kt in kick_times:
        i = int(kt * SR)
        L = int(0.32 * SR)
        shape = 1 - 0.38 * np.exp(-np.arange(L) / (0.09 * SR))
        duck[i : i + L] = np.minimum(duck[i : i + L], shape[: max(0, min(L, N - i))])
    music *= duck

    ir = reverb_ir()
    wet = np.vstack([fftconv(send[c], ir[c])[:N] for c in range(2)])
    wet = np.vstack([highpass(w, 220, 2) for w in wet])

    mix = 0.78 * music + 0.85 * drums + 0.9 * sfx + 0.34 * wet

    # Cola: bajada final suave.
    t = np.arange(N) / SR
    mix *= np.clip((DUR - t) / 1.2, 0, 1) ** 1.5
    mix = np.tanh(mix * 1.1) / 1.1
    return mix


def write_wav(path: str, x: np.ndarray):
    x = np.clip(x, -1, 1)
    data = (x.T * 32767).astype("<i2").tobytes()
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data)


def master(raw: str, out: str):
    """Limitador y normalización a -14 LUFS en dos pasadas con ffmpeg."""
    chain = "acompressor=threshold=-18dB:ratio=2.2:attack=8:release=120:makeup=2,alimiter=limit=0.89:attack=4:release=60"
    probe = subprocess.run(
        ["ffmpeg", "-hide_banner", "-i", raw, "-af", chain + ",loudnorm=I=-14:TP=-1.2:LRA=9:print_format=json", "-f", "null", "-"],
        capture_output=True, text=True,
    )
    log = probe.stderr
    m = json.loads(log[log.rindex("{") : log.rindex("}") + 1])
    ln = (
        f"loudnorm=I=-14:TP=-1.2:LRA=9:linear=true:measured_I={m['input_i']}:measured_TP={m['input_tp']}"
        f":measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}"
    )
    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-i", raw, "-af", chain + "," + ln, "-ar", str(SR), "-c:a", "pcm_s24le", out],
        check=True,
    )


if __name__ == "__main__":
    here = os.path.dirname(os.path.abspath(__file__))
    media = os.path.join(here, "..", "public", "media")
    os.makedirs(media, exist_ok=True)
    raw = os.path.join(media, "audio-crudo.wav")
    out = os.path.join(media, "audio.wav")
    mix = build()
    peak = np.max(np.abs(mix))
    write_wav(raw, mix / peak * 0.7)
    master(raw, out)
    os.remove(raw)
    print(f"listo: {os.path.normpath(out)}  (drop {DROP:.3f}s, golpe {HIT:.3f}s)", file=sys.stderr)
