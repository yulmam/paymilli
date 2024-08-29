const API_ENDPOINT =
  'https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev';

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error while fetching data:', error);
    return [];
  }
};

export const getRandomCatData = async () => {
  return fetchData(`${API_ENDPOINT}/api/cats/random50`);
};

export const getSearchCatData = async (keyword, pages) => {
  return fetchData(
    `${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${pages}`
  );
};

export const getDetailCatData = async (id) => {
  return fetchData(`${API_ENDPOINT}/api/cats/${id}`);
};
