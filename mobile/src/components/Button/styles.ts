import { tv } from "tailwind-variants";

export const buttonStyles = tv({
  slots: {
    base: "w-full h-14 bg-orange-500 items-center justify-center rounded-lg",
    text: "text-green-500 text-base font-bold uppercase",
    spinner: "text-green-500",
  },
  variants: {
    isLoading: {
      true: "opacity-50",
    },
  },
});
