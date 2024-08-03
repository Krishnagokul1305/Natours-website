import { getAllTours, getPopularTour, getTourById } from "../service/apiTours";

export async function popularTourLoader() {
  const popularTours = await getPopularTour();
  return popularTours;
}

export async function tourLoader({ params }) {
  const tour = await getTourById(params.id);
  return tour;
}

export async function allToursLoader({ params }) {
  const tours = await getAllTours();
  return tours;
}
