const BASE_URL = "http://127.0.0.1:8000/api/v1";

// http://127.0.0.1:8000/api/v1/users/66ab984951fd7b306076efb9/bookings
async function getUserBookings({ id: userId, token }) {
  try {
    console.log(userId, token);
    const res = await fetch(`${BASE_URL}/users/${userId}/bookings`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

async function postBookings({ tourId, userId, token }) {
  try {
    const res = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tour: tourId, user: userId }),
    });
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const { data: booking } = await res.json();
    return booking;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export { getUserBookings, postBookings };
