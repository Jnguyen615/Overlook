const bookingsArea = document.querySelector('.booking-section');
import { getBookingsByCustomer } from './bookings';

export function handleLoginError() {
  const signInOrError = document.querySelector('.sign-in-or-error-text');
  signInOrError.textContent = 'Please check your username and password again';
}

export function createRoomCard(room) {
  const card = document.createElement('div');
  card.classList.add('room-card');

  const roomNumber = document.createElement('p');
  roomNumber.textContent = `Room ${room.number}`;
  card.appendChild(roomNumber);

  const roomDetails = document.createElement('ul');
  roomDetails.innerHTML = `
    <li>Date: ${room.date}</li>
    <li>Room Type: ${room.roomType}</li>
    <li>Bidet: ${room.bidet ? 'Yes' : 'No'}</li>
    <li>Bed Size: ${room.bedSize}</li>
    <li>Number of Beds: ${room.numBeds}</li>
    <li>Cost Per Night: $${room.costPerNight}</li>
  `;
  card.appendChild(roomDetails);
  return card;
}

export function populateRoomCardSection(rooms, userID, data, bookingsArea) {
  if (bookingsArea) {
    const customerBookings = getBookingsByCustomer(userID, data);
    bookingsArea.innerHTML = '';
    customerBookings.forEach(booking => {
      const room = rooms.find(room => room.number === booking.roomNumber);
      if (room) {
        const roomCard = createRoomCard(room);
        bookingsArea.appendChild(roomCard);
      }
    });
  }
}
