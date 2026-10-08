import HeroSection from "@/components/HeroSection";

import Categories from "@/components/CategoriesCards";
import Benefits from "@/components/Benefits";
import NewArrivals from "@/components/NewArrivals";
import EditorialSection from "@/components/EditorialSection";
import BestSellers from "@/components/BestSellers";

export default function Home() {
  return (
    <div className="bg-[#F8F6F2] text-[#292722] selection:bg-[#B49A78]/30">
      <HeroSection />
      <Categories />
      <Benefits />
      <NewArrivals />
      <EditorialSection />
      <BestSellers />
    </div>
  );
}