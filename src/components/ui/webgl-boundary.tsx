"use client";

import { Component, type ReactNode } from "react";

/**
 * Red de seguridad para las piezas con WebGL.
 * Si el navegador no puede crear el contexto (hardware viejo, aceleración
 * desactivada, extensiones de privacidad) la sección muestra la alternativa
 * estática en lugar de romper la página.
 */
export class WebGLBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("[webgl] no se pudo renderizar la escena:", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
