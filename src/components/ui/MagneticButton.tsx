import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className = "", asChild = false, ...props }, ref) => {
    const magneticRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      const element = magneticRef.current;
      if (!element) return;
      if (window.matchMedia("(pointer: coarse)").matches) return; // Ignore on mobile/touch

      const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
      const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = element.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        xTo(x * 0.3); // 0.3 is the pull strength
        yTo(y * 0.3);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, []);

    // Combine refs
    const setRefs = (node: HTMLButtonElement) => {
      magneticRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        ref: setRefs,
        className: `${children.props.className || ""} ${className}`,
        ...props,
      });
    }

    return (
      <button ref={setRefs} className={className} {...props}>
        {children}
      </button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";
