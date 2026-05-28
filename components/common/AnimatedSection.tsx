"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "horizontal";
  once?: boolean;
}

export function AnimatedSection({
  children,
  className = "",
  id,
  delay = 0,
  direction = "up",
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.15 });
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");

  useEffect(() => {
    if (direction !== "horizontal") return;

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY + 5) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY - 5) {
        setScrollDirection("up");
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [direction]);

  const getInitialAndAnimate = () => {
    if (direction === "up")
      return { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 } };
    if (direction === "down")
      return { initial: { opacity: 0, y: -35 }, animate: { opacity: 1, y: 0 } };
    if (direction === "left")
      return { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } };
    if (direction === "right")
      return { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } };

    if (direction === "horizontal") {
      return {
        initial: { opacity: 0, x: scrollDirection === "down" ? 60 : -60 },
        animate: { opacity: 1, x: 0 },
      };
    }

    return { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 } };
  };

  const { initial, animate } = getInitialAndAnimate();

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // cinematic cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
