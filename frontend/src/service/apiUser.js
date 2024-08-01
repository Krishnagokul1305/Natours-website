const BASE_URL = "http://127.0.0.1:8000/api/v1/users";

export async function signin(newUser) {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error signing in:", error);
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
      throw new Error(`Error: ${res.status} ${res.statusText}`);
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
        "Authorization": `Bearer ${token}`,
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

export async function updateUser(formData,token) {
  try {
    const res = await fetch(`${BASE_URL}/updateMe`, {
      method: "PATCH",
      body:formData,
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log(res)
    return data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
}
