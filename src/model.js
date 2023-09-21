import { bookings, rooms } from '../src/data/testData'

export function getPastBookingsData (userId)  {
  const pastUserBookings = bookings.filter((booking) => {
    return booking.userID === userId
  })
  return pastUserBookings
}
  
export function getRoomNumbers (userId) {
  return bookings.filter((booking) => {
     return booking.userID === userId
    }).map(booking => booking.roomNumber)
  }
     
export function getRoomObjects (userId) {
  const pastUserBookings = bookings.filter((booking) => {
    return booking.userID === userId
   })
   const mappedRooms = pastUserBookings.map(booking => booking.roomNumber)
 }

 export function getRoomsByUserAndRoomNumber(userId, roomNumber) {
  const matchingBooking = bookings.find((booking) => {
    return booking.userID === userId && booking.roomNumber === roomNumber;
  });
  if (matchingBooking) {
    const room = rooms.find((room) => {
      return room.number === matchingBooking.roomNumber;
    });
    return room;
  }
  return null;
}

