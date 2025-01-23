import { API_BASE_URL } from "../../config";

const BASE_URL = API_BASE_URL;

// http://127.0.0.1:8000/api/v1/users/66ab984951fd7b306076efb9/bookings
async function getUserBookings(id) {
  try {
    const res = await fetch(`${BASE_URL}/users/${id}/bookings`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const { data: bookings } = await res.json();
    console.log(bookings);
    return bookings;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function postBookings({ tourId, userId ,paymentId}) {
  console.log(tourId,userId)
  try {
    const res = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tour: tourId, user: userId ,paid:true,paymentId}),
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const { data: booking } = await res.json();
    console.log(booking)
    return booking;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export { getUserBookings, postBookings };
