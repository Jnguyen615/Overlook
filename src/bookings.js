export function getUserId(username) {
  if (username.startsWith('customer')) {
    const numericPart = username.slice(8);
    if (!isNaN(numericPart)) {
      return parseInt(numericPart, 10);
    }
  }
  return null;
}

export function getPastBookingsData(userId, data) {
  const pastUserBookings = data.bookings.filter(booking => {
    return booking.userID === userId;
  });
  return pastUserBookings;
}

export function getRoomNumbers(userId, data) {
  const userBookings = data.bookings.filter(booking => {
    return booking.userID === userId;
  });
  return userBookings.map(booking => booking.roomNumber);
}

export function getRoomsByUser(userId, data) {
  const matchingBookings = data.bookings.filter(booking => {
    return booking.userID === userId;
  });
  /////need to filter out past vs upcoming bookings /////
  if (matchingBookings) {
    const rooms = data.rooms.filter(room => {
      return room.number === matchingBookings.roomNumber;
    });
    return rooms || null;
  }
}

export function calculateTotalRoomCost(userId, data) {
  const userBookings = data.bookings.filter(
    booking => booking.userID === userId,
  );
  const totalCost = userBookings.reduce((totalCost, booking) => {
    const room = data.rooms.find(r => r.number === booking.roomNumber);
    if (room) {
      return totalCost + room.costPerNight;
    }
    return totalCost;
  }, 0);

  return totalCost;
}