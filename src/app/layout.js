import "./compiled-tailwind.css";
import { CartProvider } from "@/context/CartContext";
import StoreLayoutWrapper from "@/components/StoreLayoutWrapper";

export const metadata = {
  title: "V-MIND FASHION | Contemporary Indian Streetwear & Apparel",
  description:
    "Official store of V-MIND FASHION. Reimagining street style with premium 240+ GSM cotton, textured waffle knits, clasp hoodies, and canvas outerwear crafted in Jaipur, India.",
  keywords: "V-MIND FASHION, streetwear, oversized t-shirts, waffle tees, henley, hoodies, Jaipur, India",
  icons: {
    icon: "/brand/vmind_emblem.png",
    shortcut: "/brand/vmind_emblem.png",
    apple: "/brand/vmind_emblem.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/brand/vmind_emblem.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="font-sans min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-[#11716c] selection:text-white">
        <CartProvider>
          <StoreLayoutWrapper>{children}</StoreLayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
