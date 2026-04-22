import RefinedHero from "@/components/RefinedHero";
import RefinedStory from "@/components/RefinedStory";
import RefinedBento from "@/components/RefinedBento";
import RefinedFeatures from "@/components/RefinedFeatures";
import RefinedCategories from "@/components/RefinedCategories";
import RefinedCTA from "@/components/RefinedCTA";
import RefinedFooter from "@/components/RefinedFooter";
import FinalCTA from "@/components/FinalCTA";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      {/* <Hero/> */}
      <RefinedHero />
      <RefinedStory />
      <RefinedBento />
      <RefinedFeatures />
      <RefinedCategories />
      <FinalCTA />
      {/* <RefinedCTA /> */}
      <RefinedFooter />
    </main>
  );
}
