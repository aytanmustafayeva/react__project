export const fadeIn = (direction, delay, duration = 1, type = "tween") => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
      scale: 0.9,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: type,
        duration: duration,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

export const staggeredFadeIn = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
};
