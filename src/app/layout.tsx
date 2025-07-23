import type { Metadata } from "next"
import "@fontsource-variable/geist"
import "./globals.css"
import Header from "@/components/layout/Header"
// import Banner from "@/components/layout/Banner"
import Footer from "@/components/layout/Footer"
import { fetchGlobalData } from "@/lib/strapi"
import { AOSInitializer } from "@/components/AOSInitializer"

export const metadata: Metadata = {
  title: "Plastigesa",
  description: "Plastigesa es una empresa familiar 100% peruana con sede en Arequipa, especialistas en producción de empaques flexibles y embalajes de alta y baja densidad.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const globalData = await fetchGlobalData()

  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
        <link rel="icon" type="image/x-icon" href="/favicon.svg" />
      </head>
      <body>
        <AOSInitializer />
        {/* <Banner data={globalData.banner} /> */}
        <Header data={globalData.header} />
        {children}
        <Footer data={globalData.footer} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function(w, d, s, u) {
        w.ChatbyWidget = { key: "nhxhsg85lwry0ujm" };
        var js = d.createElement(s);
        js.src = u;
        js.async = true;
        d.head.appendChild(js);
      })(window, document, 'script', 'https://app.chatby.io/js/widget.js');
    `,
          }}
        ></script>
      </body>
    </html>
  )
}
