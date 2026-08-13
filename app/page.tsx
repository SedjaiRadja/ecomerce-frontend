import HeroSection from "@/components/HeroSection";

import Categories from "../components/CategoriesCards";
import Benefits from "../components/Benefits";
import NewArrivals from "../components/NewArrivals";
import EditorialSection from "../components/EditorialSection";
import BestSellers from "../components/BestSellers";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <Categories />
      <Benefits />
      <NewArrivals />
      <EditorialSection />
      <BestSellers />
    </div>
  );
}
