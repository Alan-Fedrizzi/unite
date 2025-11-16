import { tv } from "tailwind-variants";

export const headerStyles = tv({
  slots: {
    base: "w-full h-28 flex-row items-end bg-black/20 px-8 pb-4 border-b border-white/10",
    titleStyles: "flex-1 text-white font-medium text-lg text-center",
  },
});
