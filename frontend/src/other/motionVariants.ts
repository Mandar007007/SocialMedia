export const LeftToRight = {
  intial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    x: [200, 0],
    transition: {
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

export const RightToLeft = {
  intial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    x: [-200, 0],
    transition: {
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

export const parentAppearFromBehind = {
  initial: {
    opacity: 0,
    zIndex: -20,
    transition: {
      when: "afterChildren",
    },
  },
  animate: {
    opacity: 1,
    zIndex: 20,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

export const childRighToLeft = {
  initial: {
    opacity: 0,
  },
  animate: {
    x: [-100, 0],
    opacity: 1,
    transition: { ease: "easeOut" },
  },
};

export const childLeftToRight = {
  initial: {
    opacity: 0,
  },
  animate: {
    x: [100, 0],
    opacity: 1,
    transition: { ease: "easeOut" },
  },
};
