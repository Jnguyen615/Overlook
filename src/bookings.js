export function getUserId(username) {
  if (username.startsWith('customer')) {
    const extractedId = username.slice(8);
    if (!isNaN(extractedId)) {
      return parseInt(extractedId, 10);
    }
  }
  return null;
}

export function getRoomNumbers(userId, data) {
  const userBookings = data.bookings.filter(booking => {
    return booking.userID === userId;
  });
  return userBookings.map(booking => booking.roomNumber);
}

export function getBookingsByCustomer(userId, data) {
  const matchingBookings = data.bookings.filter(booking => {
    return booking.userID === userId;
  });
  return matchingBookings;
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

export function handleDateSelection(data, selectedDateValue) {
  if (selectedDateValue) {
    const selectedDate = new Date(selectedDateValue);
    const matchingBookings = getBookingsByDate(data, selectedDate);
    // const roomNumbers = getRoomNumbersFromBookings(matchingBookings);

    return selectedDate;
  } else {
    console.log('Please select a date from the calendar.');
    return null;
  }
}
export function getAvailableRoomsByDate(data, searchForDate) {
  const matchingBookings = data.bookings.filter(booking => {
    let formattedDate = booking.date.replace(/\//g, '-');
    console.log('formattedDate', formattedDate);
    return formattedDate === searchForDate;
  })
  const bookedRoomNumbers = matchingBookings.map(booking => booking.roomNumber);
console.log('bookedRoomNumbers', bookedRoomNumbers)
  const availableRooms = data.rooms.filter(
    room => !bookedRoomNumbers.includes(room.number),
  );

  const availableRoomNumbers = availableRooms.map(room => room.number);

  if (availableRoomNumbers.length === 0) {
    return [];
  }

  return availableRoomNumbers;
}

export function filterRoomsByType(
  availableRoomNumbers,
  selectedRoomType,
  data,
) {
  // const availableRoomNumbers = getAvailableRoomsByDate(data) //?????????
  console.log('availableRoomsInFunction', availableRoomNumbers);
  return availableRoomNumbers.filter(roomNumber => {
    const room = data.rooms.filter(room => room.number === roomNumber);

    return room.roomType === selectedRoomType;
  });
  return room;
}
