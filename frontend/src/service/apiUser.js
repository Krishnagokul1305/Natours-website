import { API_BASE_URL } from "../../config";

const BASE_URL = `${API_BASE_URL}/users`;

export async function signin(newUser) {
  try {
    if (newUser.password != newUser.confirmPassword) {
      throw new Error(`password does not match`);
    }
    if (newUser.password.length < 8) {
      throw new Error(`password length less than 8`);
    }
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!res.ok) {
      throw new Error(`Error signing in: ${res.statusText}`);
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

export async function updateUserPassword(password, newPassword, token) {
  try {
    const res = await fetch(`${BASE_URL}/updatePassword`, {
      method: "PATCH",
      body: JSON.stringify({
        currentPassword: password,
        newPassword: newPassword,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

export async function updateUser(formData, token) {
  try {
    const res = await fetch(`${BASE_URL}/updateMe`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
