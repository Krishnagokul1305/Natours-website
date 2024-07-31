const BASE_URL = "http://127.0.0.1:8000/api/v1/tours";

async function getAllTours() {
  try {
    const res = await fetch(`${BASE_URL}`);
    console.log(res);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const { data: tours } = await res.json();
    console.log(tours);
    return tours; 
  } catch (err) {
    console.error(err);
  }
}

async function getTourById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    console.log(res);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const { data: tour } = await res.json();
    console.log(tour);
    return tour;
  } catch (err) {
    console.error(err);
  }
}

async function getPopularTour() {
  try {
    const res = await fetch(`${BASE_URL}/top-3-tours`);
    console.log(res);

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
