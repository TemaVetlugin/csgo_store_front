// About Page

export const ABOUT_ITEMS_VARIANTS = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export const ABOUT_ITEM_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

// Components

// Product Card

export const PRODUCT_ITEMS_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export const PRODUCT_ITEM_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 0,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

// Burger Menu

export const BURGER_NAV_ITEMS_VARIANTS = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.2,
      when: "afterChildren",
    },
  },
};

export const BURGER_NAV_ITEM_VARIANTS = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "backOut",
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.3,
      ease: "backInOut",
    },
  },
};

// Product Dialog

export const PRODUCT_DIALOG_FLIP = {
  hidden: {
    scale: 0,
    rotateX: -360,
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  show: {
    scale: 1,
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export const MOTION_CONFIG = {
  DEFAULT: {},
  HEADER: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.1, ease: "backInOut" },
    },
  },
  FOOTER: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,

      transition: { duration: 0.5, delay: 0.1, ease: "backInOut" },
    },
  },
  PRODUCT_CARDS: {
    variants: PRODUCT_ITEMS_VARIANTS,
    initial: "hidden",
    animate: "show",
  },
  PRODUCT_CARD: {
    variants: PRODUCT_ITEM_VARIANTS,
  },
  PRODUCT_CARD_SKELETON: {
    initial: {
      opacity: 0,
    },
    animate: (index) => ({
      opacity: 1,
      transition: {
        delay: 0.2 * Math.floor(index + 1),
        type: "spring",
        ease: "backInOut",
      },
    }),
    exit: (index) => ({
      opacity: 0,
      transition: {
        delay: 0.2 * index,
        ease: "backOut",
      },
    }),
  },
  PRODUCT_CARD_WITH_HOVER: {
    initial: {
      opacity: 0,
    },
    whileInView: (index) => ({
      opacity: 1,
      transition: {
        delay: 0.1 * index,
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    }),
    viewport: { once: true },
  },
  PRODUCT_CARD_SELL_CAROUSEL: {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: {
        delay: 0.1,
        type: "backInOut",
      },
    },
    viewport: { once: true },
    exit: {
      opacity: 0,
      x: 50,
    },
  },
  PRODUCT_STICKERS_HOVER: {
    whileHover: { scale: 1.05 },
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  PRODUCT_DIALOG: {
    variants: PRODUCT_DIALOG_FLIP,
    initial: "hidden",
    animate: "show",
  },
  STORE_RETURN_TO_TOP_BUTTON: {
    whileHover: { scale: 1.05 },
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  CAROUSEL_SLIDE_CARD: {
    initial: { rotateY: 90, opacity: 0.8 },
    animate: { rotateY: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: {
      rotateY: -90,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  },
  SLIDE_UP_WHILE_IN_VIEW: {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 1 } },
    viewport: { once: true },
  },
  ABOUT_PAGE_ITEMS: {
    variants: ABOUT_ITEMS_VARIANTS,
    initial: "hidden",
    animate: "show",
  },
  ABOUT_PAGE_ITEM: {
    variants: ABOUT_ITEM_VARIANTS,
  },
  ABOUT_PAGE_TAB_ICON: {
    animate: {
      x: [0, 5, 0, 5, 0],
      transition: { duration: 0.5, ease: "backOut" },
    },
  },
  ABOUT_PAGE_TAB_CONTENT: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    exit: { scale: 0.95, opacity: 0, transition: { duration: 0.5 } },
  },
  FAQ_PAGE_TAB_CONTENT: {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.1, ease: "backInOut" },
    },
  },
  FAQ_PAGE_MOBILE_TAB: {
    initial: { scale: 0.75, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: "backOut" },
    },
    exit: { scale: 0.75, opacity: 0, transition: { duration: 0.2 } },
  },
  BASKET_ICON_DOT: {
    animate: {
      scale: [1, 0.8, 1],
      transition: { duration: 1.5, repeat: Infinity },
    },
  },
  PAGE_WRAPPER: {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.1 },
    },
    exit: { opacity: 0, y: 1000 },
  },
  ANIMATE_TEXT_DEFAULT_ANIMATION: {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  },
  BURGER_MENU_DIALOG: {
    initial: { opacity: 0, x: -300 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 1,
      x: 1000,
      transition: { duration: 0.5, delay: 1, ease: "backInOut" },
    },
  },
  BURGER_MENU_DIALOG_NAV: {
    variants: BURGER_NAV_ITEMS_VARIANTS,
    initial: "hidden",
    animate: "show",
    exit: "exit",
  },
  BURGER_MENU_DIALOG_NAV_ITEM: {
    variants: BURGER_NAV_ITEM_VARIANTS,
  },
  HEADER_BANNER_TITLE: {
    initial: { x: -500 },
    animate: {
      x: 0,
      transition: { delay: 0.4, duration: 1.5, ease: "easeInOut" },
    },
  },
  HEADER_BANNER_TEXT: {
    initial: { x: -500 },
    animate: {
      x: 0,
      transition: { delay: 0.7, duration: 1.5, ease: "easeInOut" },
    },
  },
  HEADER_BANNER_IMG: {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5, duration: 1.5, ease: "backOut" },
    },
  },
};
