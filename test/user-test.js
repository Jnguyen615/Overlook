import chai from 'chai';
import { bookings, rooms } from '../src/data/testData';
import {
  getPastBookingsData,
  getRoomNumbers,
  getRoomsByUserAndRoomNumber,
  calculateTotalRoomCost,
} from '../src/model';
const expect = chai.expect;

describe('Get past bookings', function () {
  it('should retrieve past bookings data', function () {
    const userId = 13;
    const pastBookings = getPastBookingsData(userId);

    expect(pastBookings).to.deep.equal([
      {
        id: '3',
        userID: 13,
        date: '2022/01/10',
        roomNumber: 12,
      },
      {
        id: '6',
        userID: 13,
        date: '2022/02/19',
        roomNumber: 1,
      },
    ]);
  });

  it('should return an empty array when the user has no past bookings', function () {
    const userId = 7; // Assuming there's no userID 6 in your data
    const pastBookings = getPastBookingsData(userId);

    expect(pastBookings).to.deep.equal([]);
  });

  it('should retrieve room numbers from bookings data', function () {
    const userId = 13;
    const pastBookings = getRoomNumbers(userId);

    expect(pastBookings).to.deep.equal([12, 1]);
  });

  it('should retrieve the correct room object, when a matching booking is found', function () {
    const userId = 13;
    const roomNumber = 1;

    const room = getRoomsByUserAndRoomNumber(userId, roomNumber);
    expect(room).to.deep.equal({
      number: 1,
      roomType: 'residential suite',
      bidet: true,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 358.4,
    });
  });

  it('should return null when no matching booking is found', function () {
    const userId = 9;
    const roomNumber = 1;
    const room = getRoomsByUserAndRoomNumber(userId, roomNumber);

    expect(room).to.equal(null);
  });

  it('should return null when userID is not found in the bookings data', function () {
    const userId = 999;
    const roomNumber = 1;
    const room = getRoomsByUserAndRoomNumber(userId, roomNumber);

    expect(room).to.equal(null);
  });

  it('should return null when roomNumber is not found in the bookings data', function () {
    const userId = 13;
    const roomNumber = 999;
    const room = getRoomsByUserAndRoomNumber(userId, roomNumber);

    expect(room).to.equal(null);
  });
});
