import { useLoaderData } from "react-router-dom";
import Footer from "../../components/Footer";
import HeroSection from "./HeroSection";
import NavBar from "../../components/NavBar";
import NewsLetter from "./NewsLetter";
import PremiumTours from "./PremiumTours";
import Process from "./Process";
import { getPopularTour } from "../../service/apiTours";

function HomePage() {
  const popularTours = useLoaderData();
  console.log(popularTours);
  return (
    <div>
      <NavBar />
      <HeroSection />
      <PremiumTours tours={popularTours} />
      <Process />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export async function loader() {
  const popularTours = await getPopularTour();

  return popularTours;
}

export default HomePage;
