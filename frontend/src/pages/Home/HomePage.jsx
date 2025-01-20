import { useLoaderData } from "react-router-dom";
import Footer from "../../components/Footer";
import HeroSection from "./HeroSection";
import NavBar from "../../components/NavBar";
import NewsLetter from "./NewsLetter";
import PremiumTours from "./PremiumTours";
import Process from "./Process";

function HomePage() {
  const popularTours = useLoaderData();

  return (
    <div>
      <NavBar />
      <HeroSection />
      <PremiumTours tours={popularTours} />
      <Process />
      <NewsLetter />
    </div>
  );
}

export default HomePage;
