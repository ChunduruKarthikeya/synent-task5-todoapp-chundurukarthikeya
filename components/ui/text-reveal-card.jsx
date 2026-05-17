"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
  lightMode = false
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      const { left, width: localWidth } =
        cardRef.current.getBoundingClientRect();
      setLeft(left);
      setLocalWidth(localWidth);
    }
  }, []);

  function mouseMoveHandler(event) {
    event.preventDefault();

    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }
  function mouseEnterHandler() {
    setIsMouseOver(true);
  }
  function touchMoveHandler(event) {
    event.preventDefault();
    const clientX = event.touches[0].clientX;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  const rotateDeg = (widthPercentage - 50) * 0.1;
  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      ref={cardRef}
      className={cn(
        lightMode
          ? "bg-white border border-neutral-200/80 w-[40rem] rounded-lg p-8 relative overflow-hidden shadow-2xl shadow-neutral-200/50"
          : "bg-[#1d1c20] border border-white/[0.08] w-[40rem] rounded-lg p-8 relative overflow-hidden",
        className
      )}>
      {children}
      <div className="h-40  relative flex items-center overflow-hidden">
        <motion.div
          style={{
            width: "100%",
          }}
          animate={
            isMouseOver
              ? {
                  opacity: widthPercentage > 0 ? 1 : 0,
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
              : {
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
          }
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className={cn(
            "absolute z-20 will-change-transform",
            lightMode ? "bg-white" : "bg-[#1d1c20]"
          )}>
          <p
            style={lightMode ? undefined : {
              textShadow: "4px 4px 15px rgba(0,0,0,0.5)",
            }}
            className={cn(
              "text-base sm:text-[3rem] py-10 font-bold bg-clip-text text-transparent",
              lightMode
                ? "bg-gradient-to-b from-neutral-800 to-neutral-900 text-neutral-900"
                : "bg-gradient-to-b from-white to-neutral-300 text-white"
            )}>
            {revealText}
          </p>
        </motion.div>
        <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className={cn(
            "h-40 w-[8px] absolute z-50 will-change-transform",
            lightMode
              ? "bg-gradient-to-b from-transparent via-neutral-300 to-transparent"
              : "bg-gradient-to-b from-transparent via-neutral-800 to-transparent"
          )}></motion.div>

        <div
          className=" overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
          <p
            className={cn(
              "text-base sm:text-[3rem] py-10 font-bold bg-clip-text text-transparent",
              lightMode ? "bg-neutral-100/60" : "bg-[#323238]"
            )}>
            {text}
          </p>
          <MemoizedStars lightMode={lightMode} />
        </div>
      </div>
    </div>
  );
};

export const TextRevealCardTitle = ({
  children,
  className
}) => {
  return (
    <h2 className={twMerge("text-white text-lg mb-2", className)}>
      {children}
    </h2>
  );
};

export const TextRevealCardDescription = ({
  children,
  className
}) => {
  return (<p className={twMerge("text-[#a9a9a9] text-sm", className)}>{children}</p>);
};

const Stars = ({ lightMode = false }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(80)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            backgroundColor: lightMode ? "#6366f1" : "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"></motion.span>
      ))}
    </div>
  );
};

export const MemoizedStars = memo(Stars);
