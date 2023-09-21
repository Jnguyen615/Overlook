export function getPastBookingsData (userId, data)  {
  const pastUserBookings = data.bookings.filter((booking) => {
    return booking.userID === userId
  })
  return pastUserBookings
}
  
export function getRoomNumbers (userId, data) {
  return data.bookings.filter((booking) => {
     return booking.userID === userId
    })
    .map(booking => booking.roomNumber)
  }
     
export function getRoomObjects (userId, data) {
  const pastUserBookings = data.bookings.filter((booking) => {
    return booking.userID === userId
   })
   const mappedRooms = pastUserBookings.map(booking => booking.roomNumber)
 }

 export function getRoomsByUserAndRoomNumber(userId, roomNumber, data) {
  const matchingBooking = data.bookings.find((booking) => {
    return booking.userID === userId && booking.roomNumber === roomNumber;
  });
  if (matchingBooking) {
    const room = data.rooms.find((room) => {
      return room.number === matchingBooking.roomNumber;
    });
    return room || null;
  }
  return null;
}

export function calculateTotalRoomCost(userId, data) {
  const userBookings = data.bookings.filter((booking) => booking.userID === userId);
  const totalCost = userBookings.reduce((totalCost, booking) => {
    const room = data.rooms.find((r) => r.number === booking.roomNumber);
    if (room) {
      return totalCost + room.costPerNight;
    }
    return totalCost;
  }, 0);

  return totalCost;
}

