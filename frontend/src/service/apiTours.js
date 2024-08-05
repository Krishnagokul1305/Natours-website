import { API_BASE_URL } from "../../config";

const BASE_URL = `${API_BASE_URL}/tours`;

async function getAllTours() {
  try {
    const res = await fetch(`${BASE_URL}`);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const { data: tours } = await res.json();
    return tours; 
  } catch (err) {
    console.error(err);
  }
}

async function getTourById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const { data: tour } = await res.json();
    return tour;
  } catch (err) {
    console.error(err);
  }
}

async function getPopularTour() {
  try {
    const res = await fetch(`${BASE_URL}/top-3-tours`);
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const { data: popularTours } = await res.json();
  
    return popularTours; 
  } catch (err) {
    console.error(err);
    return [];
  }
}

export { getAllTours, getTourById, getPopularTour };
