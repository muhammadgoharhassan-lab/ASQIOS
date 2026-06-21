import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { WhatIs } from "@/components/WhatIs";
import { IntelligenceStack } from "@/components/IntelligenceStack";
import { Architecture } from "@/components/Architecture";
import { ResearchPhilosophy } from "@/components/ResearchPhilosophy";
import { Constitution } from "@/components/Constitution";
import { GovernanceEngine } from "@/components/GovernanceEngine";
import { ShariahFramework } from "@/components/ShariahFramework";
import { Roadmap } from "@/components/Roadmap";
import { ResearchLibrary } from "@/components/ResearchLibrary";
import { Founder } from "@/components/Founder";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <WhatIs />
        <IntelligenceStack />
        <Architecture />
        <ResearchPhilosophy />
        <Constitution />
        <GovernanceEngine />
        <ShariahFramework />
        <Roadmap />
        <ResearchLibrary />
        <Founder />
      </main>
      <Footer />
    </>
  );
}
