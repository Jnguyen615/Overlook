const pastBookingsArea = document.querySelector('.past-booking-cards')
const upcomingBookingsArea = document.querySelector('.upcoming-bookings-cards')
const mainPageLogo = document.querySelector('.title')
import { data } from './data/testData'

export function createRoomCard(room) {
  const card = document.createElement('div')
  card.classList.add('room-card')

  const roomNumber = document.createElement('p')
  roomNumber.textContent = `Room ${room.number}`
  card.appendChild(roomNumber);

  const roomDetails = document.createElement('ul')
  roomDetails.innerHTML = `
    <li>Room Type: ${room.roomType}</li>
    <li>Bidet: ${room.bidet ? 'Yes' : 'No'}</li>
    <li>Bed Size: ${room.bedSize}</li>
    <li>Number of Beds: ${room.numBeds}</li>
    <li>Cost Per Night: $${room.costPerNight}</li>
  `;
  card.appendChild(roomDetails)
  return card;
}

export function populateRoomCardSection() {
  if (pastBookingsArea) {
    const customerBookings = getBookingsByID(customerID, data)
    pastBookingsArea.innerHTML = ''
    customerBookings.forEach(booking => {
      const room = data.rooms.find(room => room.number === booking.roomNumber)
      if (room) {
        const roomCard = createRoomCard(room);
        pastBookingsArea.appendChild(roomCard);
      }
    });
  }
}

// export function populateRoomCardSection(rooms, sectionId) {
//   const section = document.getElementById(sectionId);
//   if (section) {
//     rooms.forEach((room) => {
//       const roomCard = createRoomCard(room);
//       section.appendChild(roomCard);
//     });
//   }
// }