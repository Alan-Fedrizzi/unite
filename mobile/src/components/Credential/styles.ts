import { tv } from "tailwind-variants";

export const credentialStyles = tv({
  slots: {
    base: "w-full self-stretch items-center",
    imageStyles: "w-24 h-52 z-10",
    container:
      "bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5",
    imageBackground:
      "px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden",
    textContainer: "w-full flex-row items-center justify-between",
    text: "text-zinc-50 text-sm font-bold",
    shadow: "w-40 h-40 bg-black rounded-full",
    avatar: "w-36 h-36 rounded-full -mt-24",
    buttonAvatar:
      "w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center",
    name: "font-bold text-2xl text-zinc-50 mt-4",
    email: "font-regular text-base text-zinc-300 mb-4",
    qrcode: "w-32 h-32",
    ampliarButton: "mt-6",
    ampliar: "font-body text-orange-500 text-sm",
  },
});
