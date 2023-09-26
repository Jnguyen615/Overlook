import { displayNewBooking, populateRoomCardSelection } from './dom-updates';

let data;

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
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify({
      userID: userID,
      date: selectedDate,
      roomNumber: roomNumber,
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
      console.log('PR', postResponse);

      return fetch('http://localhost:3001/api/v1/bookings');
    })
    .then(updatedBookings => {
      if (!updatedBookings.ok) {
        throw new Error(
          `GET network response was not ok: ${updatedBookings.status}`,
        );
      }
      return updatedBookings.json();
    })
    .catch((error) => {
      console.error('Error creating and displaying new booking:', error);
      return error;
    });
}
