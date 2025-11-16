import { tv } from "tailwind-variants";

export const homeStyles = tv({
  slots: {
    base: "flex-1 justify-center items-center bg-green-500 p-6",
    image: "h-16",
    inputContainer: "w-full mt-12 gap-3",
    link: "text-gray-100 text-base font-bold text-center mt-8",
  },
});
