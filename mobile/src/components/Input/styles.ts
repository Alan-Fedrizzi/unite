import { tv } from "tailwind-variants";

export const inputStyles = tv({
  slots: {
    base: "w-full h14 flex-row items-center gap-3 p-3 border  border-green-400 rounded-lg",
    field: "flex-1 text-white text-base font-regular",
  },
});
