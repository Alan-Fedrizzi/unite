import { tv } from "tailwind-variants";

export const ticketStyles = tv({
  slots: {
    base: "flex-1 bg-green-500",
    // scrollContainer: "-mt-28 -z-10",
    scrollContainer: "-mt-28",
    scrollContent: "px-8 pb-16",
    header: "z-10",
    arrow: "self-center my-6",
    text: "text-white text-2xl font-bold mt-4",
    message: "text-white text-base font-regular mt-1 mb-6",
    remove: "mt-10",
    removeText: "text-white text-base font-bold text-center",
    modal: "flex-1 bg-green-500 items-center justify-center",
    modalClose: "font-body text-orange-500 text-sm text-center mt-10",
  },
});
