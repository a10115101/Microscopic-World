import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/records";

export async function getAllRecords(statusMode, dateMode) {
  let token = "";

  if (localStorage.getItem("user"))
    token = JSON.parse(localStorage.getItem("user")).token;

  const response = await axios.get(
    `${API_URL}/?status=${statusMode}&date=${dateMode}`,
    {
      headers: { Authorization: token },
      withCredentials: true,
    }
  );

  return response.data.data.records;
}

export async function getRecord(id) {
  let token = "";

  if (localStorage.getItem("user"))
    token = JSON.parse(localStorage.getItem("user")).token;

  const response = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: token },
    withCredentials: true,
  });

  return response.data.data.record;
}

export async function creataRecord(recordObject) {
  let token = "";

  if (localStorage.getItem("user"))
    token = JSON.parse(localStorage.getItem("user")).token;

  return axios.post(API_URL, recordObject, {
    headers: { Authorization: token },
    withCredentials: true,
  });
}

export async function updateRecord(id, updateRecordObject) {
  let token = "";

  if (localStorage.getItem("user"))
    token = JSON.parse(localStorage.getItem("user")).token;

  return await axios.patch(`${API_URL}/${id}`, updateRecordObject, {
    headers: { Authorization: token },
    withCredentials: true,
  });
}

export async function deleteRecord(id) {
  let token = "";

  if (localStorage.getItem("user"))
    token = JSON.parse(localStorage.getItem("user")).token;

  return await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: token },
    withCredentials: true,
  });
}

export async function getStatisCountries(id) {
  let token = "";

  if (localStorage.getItem("user"))
    token = JSON.parse(localStorage.getItem("user")).token;

  const response = await axios.get(`${API_URL}/statisCountries/${id}`, {
    headers: { Authorization: token },
    withCredentials: true,
  });

  return response.data.data;
}

export async function getStatisContinents(id) {
  let token = "";

  if (localStorage.getItem("user"))
    token = JSON.parse(localStorage.getItem("user")).token;

  const response = await axios.get(`${API_URL}/statisContinents/${id}`, {
    headers: { Authorization: token },
    withCredentials: true,
  });

  return response.data.data.statis;
}

export async function getRecentlyVisited(id) {
  let token = "";

  if (localStorage.getItem("user"))
    token = JSON.parse(localStorage.getItem("user")).token;

  const response = await axios.get(`${API_URL}/recentlyVisited/${id}`, {
    headers: { Authorization: token },
    withCredentials: true,
  });

  return response.data.data.recentlyVisited;
}
