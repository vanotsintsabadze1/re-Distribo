import localFont from "next/font/local";

export const mainFont = localFont({
  src: [
    {
      path: "../public/font/Distribo-Light.woff2",
      style: "normal",
      weight: "300",
    },
    {
      path: "../public/font/Distribo-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/font/Distribo-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/font/Distribo-Bold.woff2",
      style: "normal",
      weight: "800",
    },
  ],
  display: "swap",
});
