export const fetchData = dataType => {
  return fetch(`http://localhost:3001/api/v1/${dataType}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Get network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error(`Error fetching ${dataType}: ${error}`);
    });
};

export function createNewBooking() {
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify({
      id: (data.bookings.length + 1).toString(),
      userID: userID,
      date: selectedDate,
      roomNumber: roomNumber
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(postResponse => {
      if (!postResponse.ok) {
        throw new Error(
          `POST network response was not ok: ${postResponse.status}`,
        );
      }
      return postResponse.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
