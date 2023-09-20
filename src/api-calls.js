export const fetchData = (dataType) => {
  return fetch(`http://localhost:3001/api/v1/${dataType}`)
  .then(response => response.json()) 
}

export const promises = [
  fetchData('customers'),
  fetchData('rooms'),
  fetchData('bookings')
]
