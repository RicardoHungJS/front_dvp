export const fetchHelper = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Algo salió mal con la petición');
  }
};