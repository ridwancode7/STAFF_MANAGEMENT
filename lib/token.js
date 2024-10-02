import axios from 'axios';

// Function to get the authentication token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Function to set a cookie in localStorage
const setCookie = (name, value, days) => {
  localStorage.setItem(name, value);
};

// Function to get a cookie from localStorage
const getCookie = (name) => {
  return localStorage.getItem(name);
};

// Function to erase a cookie from localStorage
const eraseCookie = (name) => {
  localStorage.removeItem(name);
};

// Function to create a session by posting to the session create endpoint
const createSession = async (formData) => {
  try {
    console.log(formData); // Ensure formData is correctly populated
    const response = await axios.post('/api/session/create', JSON.stringify(formData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setCookie('session', response.data, 7); // Assuming response.data is the session data from server
    return response.data;
  } catch (error) {
    console.error('Failed to create session', error);
    throw error;
  }
};

// Function to retrieve a session by getting from the session retrieve endpoint
const getSession = async () => {
  try {
    const response = await axios.post('/api/session/retrieve');
    return response.data;
  } catch (error) {
    console.error('Failed to retrieve session', error);
    throw error;
  }
};

// Function to destroy a login session using the session destroy endpoint
const destroySession = async () => {
  try {
    const response = await axios.post('/api/session/destroy');
    return response.data;
  } catch (error) {
    console.error('Failed to retrieve session', error);
    throw error;
  }
};

// Exporting the storage object with all functions
const storage = {
  getAuthToken,
  setCookie,
  getCookie,
  eraseCookie,
  createSession,
  getSession,
  destroySession
};

export default storage;
