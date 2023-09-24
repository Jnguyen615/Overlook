import { getBookingsByCustomer, calculateTotalRoomCost } from './bookings';

export function handleLoginError(loginMessage) {
  loginMessage.textContent = 'Please check your username and password again';
}

export function createRoomCard(room, booking) {
  const card = document.createElement('div');
  card.classList.add('room-card');

  const bookingDate = document.createElement('p');
  bookingDate.classList.add('date-of-stay');
  bookingDate.textContent = `Date:  ${booking.date}`;
  card.appendChild(bookingDate);

  const roomDetails = document.createElement('ul');
  roomDetails.innerHTML = `
  <table>
  <tr>
    <td>Room Number:</td>
    <td>${room.number}</td>
  </tr>
  <tr>
    <td>Room Type:</td>
    <td>${room.roomType}</td>
  </tr>
  <tr>
    <td>Bidet:</td>
    <td>${room.bidet ? 'Yes' : 'No'}</td>
  </tr>
  <tr>
    <td>Bed Size:</td>
    <td>${room.bedSize}</td>
  </tr>
  <tr>
    <td>Number of Beds:</td>
    <td>${room.numBeds}</td>
  </tr>
  <tr>
    <td>Cost Per Night:</td>
    <td>$${room.costPerNight}</td>
  </tr>
</table>
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
        const roomCard = createRoomCard(room, booking);
        bookingsArea.appendChild(roomCard);
      }
    });
  }
}

export function displayTotalSpent(userId, data) {
  const totalSpent = document.querySelector('.total-spent');

  if (totalSpent) {
    const totalCost = calculateTotalRoomCost(userId, data);
    totalSpent.textContent = `Total Spent: $${totalCost.toFixed(2)}`;
  }
}
