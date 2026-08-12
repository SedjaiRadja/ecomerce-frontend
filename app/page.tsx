import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Categories from "../components/CategoriesCards";
import Benefits from "../components/Benefits";
import NewArrivals from "../components/NewArrivals";
import EditorialSection from "../components/EditorialSection";
import BestSellers from "../components/BestSellers";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Categories />
      <Benefits />
      <NewArrivals />
      <EditorialSection />
      <BestSellers />
      <Footer />
    </div>
  );
}
