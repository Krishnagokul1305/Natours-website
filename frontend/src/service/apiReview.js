import { API_BASE_URL } from "../../config";
import { getCurrentUser } from "./apiUser";

export async function postReview({ review, userId, tourId }) {
  try {
    const res = await fetch(`${API_BASE_URL}/tours/${tourId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...review,
        tour: tourId,
        user: userId,
      }),
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const { data: booking } = await res.json();
    return booking;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getreviews(tourId) {
  try {
    const res = await fetch(`${API_BASE_URL}/tours/${tourId}/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserReviews() {
  try {
    const user = await getCurrentUser();
    const res = await fetch(`${API_BASE_URL}/reviews?user=${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    return data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteReview(reviewId) {
  try {
    await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
      method: "DELETE",
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateReview(reviewId, updatedata) {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedata),
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
