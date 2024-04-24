/* eslint-disable no-unused-vars */

const APIURL = import.meta.env.VITE_API_KEY;

// Unauthentice Api Functions
export const noAuthFetchData = async (route) => {
  const GET = await fetch(`${APIURL}${route}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const response = await GET.json();
  return response;
};

export const noAuthCreateData = async (route, data) => {
  const POST = await fetch(`${APIURL}${route}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  const response = await POST.json();
  return response;
};
export const noAuthUpdateeData = async (route, data) => {
  const PUT = await fetch(`${APIURL}${route}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
  const response = await PUT.json();
  return response;
};

export const noAuthDeleteData = async (route, data) => {
  const DELETE = await fetch(`${APIURL}${route}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify(data),
  });
  const response = await DELETE.json();
  return response;
};

// Authentice Api Functions
export const authFetchData = async (route) => {
  const GET = await fetch(`${APIURL}${route}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    method: "GET",
  });
  const response = await GET.json();
  return response;
};

export const authCreateData = async (route, data) => {
  const POST = await fetch(`${APIURL}${route}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  const response = await POST.json();
  return response;
};

export const authUpdateData = async (route, data) => {
  const PUT = await fetch(`${APIURL}${route}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
  const response = await PUT.json();
  return response;
};

export const authDeleteData = async (route, data) => {
  const DELETE = await fetch(`${APIURL}${route}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    method: "DELETE",
    body: JSON.stringify(data),
  });
  const response = await DELETE.json();
  return response;
};

export const verifyAuthCreateData = async (route, data) => {
  const POST = await fetch(`${APIURL}${route}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  const response = await POST.json();
  return response;
};
