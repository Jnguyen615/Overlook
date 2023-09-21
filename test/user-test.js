const expect = chai.expect;
import chai from 'chai';
import { data } from '../src/data/testData';
import {
  getPastBookingsData,
  getRoomNumbers,
  getRoomsByUserAndRoomNumber,
  calculateTotalRoomCost,
  } 
  from '../src/model';

describe('Get past bookings', function () {
  it('should retrieve past bookings data', function () {
    const userId = 13;
    const pastBookings = getPastBookingsData(userId, data);

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
    const pastBookings = getPastBookingsData(userId, data);

    expect(pastBookings).to.deep.equal([]);
  });

  it('should retrieve room numbers from bookings data', function () {
    const userId = 13;
    const pastBookings = getRoomNumbers(userId, data);

    expect(pastBookings).to.deep.equal([12, 1]);
  });

  it('should retrieve the correct room object, when a matching booking is found', function () {
    const userId = 13;
    const roomNumber = 1;

    const room = getRoomsByUserAndRoomNumber(userId, roomNumber, data);
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
    const room = getRoomsByUserAndRoomNumber(userId, roomNumber, data);

    expect(room).to.equal(null);
  });

  it('should return null when userID is not found in the bookings data', function () {
    const userId = 999;
    const roomNumber = 1;
    const room = getRoomsByUserAndRoomNumber(userId, roomNumber, data);

    expect(room).to.equal(null);
  });

  it('should return null when roomNumber is not found in the bookings data', function () {
    const userId = 13;
    const roomNumber = 999;
    const room = getRoomsByUserAndRoomNumber(userId, roomNumber, data);

    expect(room).to.equal(null);
  });
});

describe('Calculate total room cost', function () {
  it('should calculate the total cost of rooms for a user with bookings', function () {
    const userId = 13;
    const totalCost = calculateTotalRoomCost(userId, data);
   
    expect(totalCost).to.equal(530.49); // Adjust the delta as needed
  });

  it('should calculate the total cost as zero for a user with no bookings', function () {
    const userId = 6;
    const totalCost = calculateTotalRoomCost(userId, data);

    expect(totalCost).to.equal(0);
  });

  it('should calculate the total cost as zero when userID is not found in the bookings data', function () {
    const userId = 999;
    const totalCost = calculateTotalRoomCost(userId, data);

    expect(totalCost).to.equal(0);
  });
});
