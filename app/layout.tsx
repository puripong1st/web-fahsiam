import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ฟ้าสยาม SiamAgriTech",
  url: "https://web-fahsiam.vercel.app",
  logo: "https://web-fahsiam.vercel.app/favicon-32x32.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "082-529-8388",
    contactType: "customer service",
    availableLanguage: "Thai",
  },
  sameAs: [
    "https://www.facebook.com/share/p/1ArBAZtMvr/",
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>

        <Navbar />
        <meta name="google-site-verification" content="O3pc6KHLALRFMBuOyRKW-XdUb04EdGycLs4Iy--7d70" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Footer />

      </body>
    </html>
  );
}