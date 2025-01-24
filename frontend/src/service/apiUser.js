import { API_BASE_URL } from "../../config";
const BASE_URL = `${API_BASE_URL}/users`;

export async function signin(newUser) {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(
        `Error signing in: ${
          res.statusText.includes("Conflict")
            ? "Duplicate email"
            : res.statusText
        }`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function login(user) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Incorrect email or password`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function updateUserPassword({ currentPassword, newPassword }) {
  try {
    const res = await fetch(`${BASE_URL}/updatePassword`, {
      method: "PATCH",
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
}

export async function updateUser(formData) {
  try {
    const res = await fetch(`${BASE_URL}/updateMe`, {
      method: "PATCH",
      body: formData,
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
}
export async function getCurrentUser() {
  try {
    const res = await fetch(`${BASE_URL}/getUser`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    const {
      data: { user },
    } = await res.json();
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error;
  }
}

export async function logoutService() {
  try {
    const res = await fetch(`${BASE_URL}/logout`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    let data = await res.json();
    return data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}
