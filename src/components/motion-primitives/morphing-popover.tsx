"use client";

import {
  useState,
  useId,
  useRef,
  useEffect,
  createContext,
  useContext,
  isValidElement,
  useMemo,
} from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  Transition,
  Variants,
} from "motion/react";
import useClickOutside from "./useClickOutside";
import type { DynamicMotionTag } from "./dynamic-tag";
import { cn } from "@/lib/utils";

/* `motion.create()` fuera del render y con caché por tipo: llamarlo durante el
   render devolvía un componente distinto en cada pasada, y con él se perdía el
   estado del disparador. */
const motionTriggerCache = new WeakMap<
  React.ComponentType<Record<string, unknown>>,
  DynamicMotionTag
>();

function createMotionTrigger(
  type: React.ComponentType<Record<string, unknown>>,
): DynamicMotionTag {
  const cached = motionTriggerCache.get(type);
  if (cached) return cached;
  const created = motion.create(type) as DynamicMotionTag;
  motionTriggerCache.set(type, created);
  return created;
}

const TRANSITION: Transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.4,
};

type MorphingPopoverContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  uniqueId: string;
  variants?: Variants;
};

const MorphingPopoverContext =
  createContext<MorphingPopoverContextValue | null>(null);

function usePopoverLogic({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} = {}) {
  const uniqueId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isOpen = controlledOpen ?? uncontrolledOpen;

  const open = () => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(true);
    }
    onOpenChange?.(true);
  };

  const close = () => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(false);
    }
    onOpenChange?.(false);
  };

  return { isOpen, open, close, uniqueId };
}

export type MorphingPopoverProps = {
  children: React.ReactNode;
  transition?: Transition;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variants?: Variants;
  className?: string;
} & React.ComponentProps<"div">;

function MorphingPopover({
  children,
  transition = TRANSITION,
  defaultOpen,
  open,
  onOpenChange,
  variants,
  className,
  ...props
}: MorphingPopoverProps) {
  const popoverLogic = usePopoverLogic({ defaultOpen, open, onOpenChange });

  return (
    <MorphingPopoverContext.Provider value={{ ...popoverLogic, variants }}>
      <MotionConfig transition={transition}>
        <div
          className={cn("relative flex items-center justify-center", className)}
          key={popoverLogic.uniqueId}
          {...props}
        >
          {children}
        </div>
      </MotionConfig>
    </MorphingPopoverContext.Provider>
  );
}

export type MorphingPopoverTriggerProps = {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<typeof motion.button>;

function MorphingPopoverTrigger({
  children,
  className,
  asChild = false,
  ...props
}: MorphingPopoverTriggerProps) {
  const context = useContext(MorphingPopoverContext);

  /* El hijo se envuelve en un componente de Motion. Se memoriza por tipo y
     antes de cualquier retorno, para no crear un componente nuevo en cada
     render ni llamar al hook de forma condicional. */
  const childType =
    asChild && isValidElement(children)
      ? (children.type as React.ComponentType<Record<string, unknown>>)
      : null;
  const MotionComponent = useMemo(
    () => (childType ? createMotionTrigger(childType) : null),
    [childType],
  );

  if (!context) {
    throw new Error(
      "MorphingPopoverTrigger must be used within MorphingPopover",
    );
  }

  if (MotionComponent && isValidElement(children)) {
    const childProps = children.props as Record<string, unknown>;

    return (
      /* La regla sigue el rastro hasta `motion.create`, pero aca el componente
         viene del useMemo de arriba y de la cache por tipo: es estable. */
      // eslint-disable-next-line react-hooks/static-components
      <MotionComponent
        {...childProps}
        onClick={context.open}
        layoutId={`popover-trigger-${context.uniqueId}`}
        className={childProps.className}
        key={context.uniqueId}
        aria-expanded={context.isOpen}
        aria-controls={`popover-content-${context.uniqueId}`}
      />
    );
  }

  return (
    <motion.div
      key={context.uniqueId}
      layoutId={`popover-trigger-${context.uniqueId}`}
      onClick={context.open}
    >
      <motion.button
        {...props}
        layoutId={`popover-label-${context.uniqueId}`}
        key={context.uniqueId}
        className={className}
        aria-expanded={context.isOpen}
        aria-controls={`popover-content-${context.uniqueId}`}
      >
        {children}
      </motion.button>
    </motion.div>
  );
}

export type MorphingPopoverContentProps = {
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<typeof motion.div>;

function MorphingPopoverContent({
  children,
  className,
  ...props
}: MorphingPopoverContentProps) {
  const context = useContext(MorphingPopoverContext);
  if (!context)
    throw new Error(
      "MorphingPopoverContent must be used within MorphingPopover",
    );

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, context.close);

  useEffect(() => {
    if (!context.isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") context.close();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [context.isOpen, context.close]);

  return (
    <AnimatePresence>
      {context.isOpen && (
        <>
          <motion.div
            {...props}
            ref={ref}
            layoutId={`popover-trigger-${context.uniqueId}`}
            key={context.uniqueId}
            id={`popover-content-${context.uniqueId}`}
            role="dialog"
            aria-modal="true"
            className={cn(
              "absolute overflow-hidden rounded-md border border-zinc-950/10 bg-white p-2 text-zinc-950 shadow-md dark:border-zinc-50/10 dark:bg-zinc-700 dark:text-zinc-50",
              className,
            )}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={context.variants}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export { MorphingPopover, MorphingPopoverTrigger, MorphingPopoverContent };
