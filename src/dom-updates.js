const bookingsArea = document.querySelector('.booking-section')

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

export function populateRoomCardSection(rooms, userID, data, pastBookingsArea) {
  if (pastBookingsArea) {
    const customerBookings = getBookingsByCustomer(userID, data);
    pastBookingsArea.innerHTML = '';
    customerBookings.forEach((booking) => {
      const room = rooms.find((room) => room.number === booking.roomNumber);
      if (room) {
        const roomCard = createRoomCard(room);
        pastBookingsArea.appendChild(roomCard);
      }
    });
  }
}

// export function populateRoomCardSection(rooms) {
//   if (pastBookingsArea) {
//     const customerBookings = getBookingsByID(customerID, data)
//     pastBookingsArea.innerHTML = ''
//     customerBookings.forEach(booking => {
//       const room = data.rooms.find(room => room.number === booking.roomNumber)
//       if (room) {
//         const roomCard = createRoomCard(room);
//         pastBookingsArea.appendChild(roomCard);
//       }
//     });
//   }
// }

// export function populateRoomCardSection(rooms, userId, data, bookingsArea) {
//   console.log(userId)
//   if (bookingsArea) {
//     rooms.forEach((room) => {
//       console.log(rooms)
//       const roomCard = createRoomCard(room);
//       bookingsArea.appendChild(roomCard);
//     });
//   }
// }