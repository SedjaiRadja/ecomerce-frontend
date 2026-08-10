import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Categories from "../components/CategoriesCards";
import Benefits from "../components/Benefits";
export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Categories />
      <Benefits />
    </div>
  );
}
