export const fetchData = (dataType) => {
  return fetch(`http://localhost:3001/api/v1/${dataType}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Get network response was not ok: ${response.status}`)
    }
    return response.json();
  }) 
  .catch((error) => {
    console.error(`Error fetching ${dataType}: ${error}`);
  });
};

export const promises = [
  fetchData('customers'),
  fetchData('rooms'),
  fetchData('bookings')
]
