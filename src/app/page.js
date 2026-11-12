import HeroVideo from "@/components/HeroVideo";
import AwardStrip from "@/components/AwardStrip";
import Wedeliver from "@/components/Wedeliver";
import Strategy from "@/components/Strategy";
import ServicesGrid from "@/components/ServicesGrid";
import Grow from "@/components/Grow";
import OurWork from "@/components/OurWork";
import StatsCounter from "@/components/StatsCounter";
import FAQSection from "@/components/FAQSection";
import { heroContent } from "@/data/heroContent";
import { awardStripItems } from "@/data/awardStrip";
import { strategySteps } from "@/data/strategySteps";
import { servicesList } from "@/data/servicesList";
import { ourWork } from "@/data/ourWork";
import { stats } from "@/data/stats";
import { faqs } from "@/data/faqs";

export default function Home() {
  return (
    <>
      <HeroVideo {...heroContent} />
      <AwardStrip items={awardStripItems} />
      <Wedeliver />
      <StatsCounter stats={stats} />
      <Strategy steps={strategySteps} />
      <ServicesGrid
        services={servicesList}
        title="We Deliver Excellence."
        subtitle="Everything you need to get found, get clicks and get customers, from one team."
        headingLevel="h2"
      />
      <Grow />
      <OurWork projects={ourWork} limit={6} />
      <FAQSection faqs={faqs} />
    </>
  );
}
