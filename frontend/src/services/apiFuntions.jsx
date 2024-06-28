import api from './apis';  // Assuming you've defined your Axios instance in a file named 'api.js'

export const fetchProblems = async () => {
  try {
    const response = await api.get('/apis/problem/');  // Replace '/problems' with your actual API endpoint
    return response.data;  // Assuming your API returns data in a format you expect
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw error;  // Rethrow or handle the error as needed
  }
};
