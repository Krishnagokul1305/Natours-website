const BASE_URL = "http://127.0.0.1:8000/api/v1/users";

export async function signin(newUser) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  console.log(data);
  return data
}

export async function login(user) {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    console.log(data);
    return data
  }