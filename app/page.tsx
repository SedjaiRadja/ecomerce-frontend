import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Categories from "../components/CategoriesCards";
import Benefits from "../components/Benefits";
import NewArrivals from "../components/NewArrivals";
export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Categories />
      <Benefits />
      <NewArrivals />
    </div>
  );
}
