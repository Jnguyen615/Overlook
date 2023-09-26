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

export function createNewBooking(userID, selectedDate, roomNumber) {
  console.log({userID, selectedDate, roomNumber})
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify({
      userID: userID,
      date: selectedDate,
      roomNumber: roomNumber
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(postResponse => {
      console.log('PR', postResponse)
      if (!postResponse.ok) {
        throw new Error(
          `POST network response was not ok: ${postResponse.status}`,
        );
      }
      return postResponse.json();
    })
    .then(newBooking => {
      console.log(data)
      console.log('new booking', newBooking)
      data.bookings.push(newBooking);
      displayNewBooking(data, newBooking)
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
