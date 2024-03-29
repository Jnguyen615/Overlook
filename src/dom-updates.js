import {
  getBookingsByCustomer,
  calculateTotalRoomCost,
  getAvailableRoomsByDate,
  getUserId,
} from './bookings';

import { createNewBooking } from './api-calls';
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

export function displayTotalSpent(userId, data, totalSpent) {
  if (totalSpent) {
    const totalCost = calculateTotalRoomCost(userId, data);
    totalSpent.textContent = `Total Spent: $${totalCost.toFixed(2)}`;
  }
}

export function displayAvailableRoomCards(
  data,
  searchForDate,
  container,
  username,
) {
  const roomCards = generateRoomCards(data, searchForDate, username);
  container.innerHTML = null;
  roomCards.forEach(roomCard => {
    container.appendChild(roomCard);
  });
}

export function createNewBookingRoomCard(data, room, username) {
  const card = document.createElement('div');
  card.classList.add('new-booking-room-card');

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
  <br></br>
  <button id="book-now-button" type="button">Book Now!</button>
`;
   
  const bookNowButton = roomDetails.querySelector('#book-now-button');
  if (bookNowButton) {
    bookNowButton.addEventListener('click', function (event) {
      event.preventDefault();
      const selectedDate = document.getElementById('selected-date-input').value;
      const userID = getUserId(username);
      let originalDateFormat = selectedDate.replace(/-/g, '/');
      createNewBooking(userID, originalDateFormat, room.number).then(
        updatedBookings => {
          data.bookings = updatedBookings;
        },
      );
    });

    card.appendChild(roomDetails);
    return card;
  }
}

export function generateRoomCards(data, searchForDate, username) {
  const availableRoomNumbers = getAvailableRoomsByDate(data, searchForDate);
  const roomCards = [];

  availableRoomNumbers.forEach(roomNumber => {
    const room = data.rooms.find(room => room.number === roomNumber);
    const booking = data.bookings.find(
      booking => booking.roomNumber === roomNumber,
    );

    const card = createNewBookingRoomCard(data, room, username);
    roomCards.push(card);
  });
  return roomCards;
}

export function displayFilteredRoomsByType(selectedRoomType) {
  roomElements.forEach(roomElement => {
    const roomDataFromType = roomElement.getAttribute('data-room-type');

    if (roomDataFromType === selectedRoomType) {
      roomElement.style.display = 'block';
    } else {
      roomElement.style.display = 'none';
    }
  });
}

export function displayNewBooking(data, booking) {
  const bookingsArea = document.getElementById('bookings-section');
  if (bookingsArea) {
    if (typeof data.rooms === 'object' && booking.roomNumber in data.rooms) {
      const room = data.rooms[booking.roomNumber];
      if (room) {
        const roomCard = createRoomCard(booking);
        bookingsArea.appendChild(roomCard);
      }
    }
  }
  displayNewBookingMessage(booking);
}

export function displayNewBookingMessage(data, newBooking) {
  const successMessage = document.querySelector('.available-room-text');

  if (successMessage) {
    successMessage.textContent = 'Room successfully booked!';
  }
}

export function displayFilteredRooms(
  data,
  filteredRooms,
  searchForDate,
  username,
  container,
) {
  container.innerHTML = '';

  const roomCards = generateRoomCards(
    data,
    searchForDate,
    username,
    filteredRooms,
  );
  roomCards.forEach(roomCard => {
    container.appendChild(roomCard);
  });
}
