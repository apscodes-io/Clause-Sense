import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import UploadPanel from "@/components/UploadPanel";
import FeatureCards from "@/components/FeatureCards";
import HowItWorks from "@/components/HowItWorks";
import Capabilities from "@/components/Capabilities";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <Hero />

      <Stats />

      <UploadPanel />

      <FeatureCards />

      <HowItWorks />

      <Capabilities />

      <Footer />
    </main>
  );
}