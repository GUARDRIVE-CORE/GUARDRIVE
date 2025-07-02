import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import BenefitsSection from "../components/BenefitsSection";
import HowItWorksSection from "../components/HowItWorksSection";
import UseCasesSection from "../components/UseCasesSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>
          GuardDrive FleetShield - Segurança Veicular com Blockchain e ESG
        </title>
        <meta
          name="description"
          content="Revolucione a segurança da sua frota com tecnologia blockchain e IA. Monitoramento em tempo real, certificação ESG e tokenização de créditos de carbono. Demonstração gratuita disponível."
        />
        <meta
          name="keywords"
          content="guarddrive, fleetshield, monitoramento veicular, blockchain, ESG, sustentabilidade, segurança veicular, créditos carbono, IoT, frota inteligente"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://guarddrive.com/" />
        <meta
          property="og:title"
          content="GuardDrive FleetShield - Segurança Veicular com Blockchain"
        />
        <meta
          property="og:description"
          content="Revolucione a segurança da sua frota com tecnologia blockchain e IA. Monitoramento em tempo real e certificação ESG."
        />
        <meta
          property="og:image"
          content="https://guarddrive.com/og-image.jpg"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://guarddrive.com/" />
        <meta
          property="twitter:title"
          content="GuardDrive FleetShield - Segurança Veicular com Blockchain"
        />
        <meta
          property="twitter:description"
          content="Revolucione a segurança da sua frota com tecnologia blockchain e IA."
        />
        <meta
          property="twitter:image"
          content="https://guarddrive.com/og-image.jpg"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "GuardDrive",
            alternateName: "GuardDrive FleetShield",
            url: "https://guarddrive.com",
            logo: "https://guarddrive.com/logo.png",
            description:
              "Plataforma de monitoramento veicular com blockchain, IA e certificação ESG para frotas corporativas, seguradoras e governos.",
            foundingDate: "2024",
            founders: [
              {
                "@type": "Person",
                name: "Equipe GuardDrive",
              },
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "São Paulo",
              addressRegion: "SP",
              addressCountry: "BR",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+55-11-9999-9999",
              contactType: "customer service",
              email: "contato@guarddrive.com",
              availableLanguage: ["Portuguese", "English"],
            },
            sameAs: [
              "https://linkedin.com/company/guarddrive",
              "https://twitter.com/guarddrive",
              "https://github.com/guarddrive",
            ],
            offers: {
              "@type": "Offer",
              name: "GuardDrive FleetShield",
              description:
                "Sistema completo de monitoramento veicular com blockchain e ESG",
              category: "Software",
              availability: "https://schema.org/InStock",
            },
          })}
        </script>

        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="GuardDrive Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="pt-BR" />
        <link rel="canonical" href="https://guarddrive.com/" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Helmet>

      <Header />

      <main>
        <HeroSection />
        <BenefitsSection />
        <HowItWorksSection />
        <UseCasesSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
};

export default LandingPage;
