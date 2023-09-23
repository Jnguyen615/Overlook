const expect = chai.expect;
import chai from 'chai';
import { data } from '../src/data/testData';
import { getPastBookingsData, calculateTotalRoomCost } from '../src/bookings';

describe('getPastBookingsData', function () {
  it('should return the correct past bookings for a user with past bookings', function () {
    const userId = 13; // User ID with past bookings
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

  it('should return an empty array for a user with no past bookings', function () {
    const userId = 99; // User ID with no past bookings
    const pastBookings = getPastBookingsData(userId, data);
    expect(pastBookings).to.deep.equal([]);
  });
});

describe('Calculate Total Room Cost', function () {
  it('should calculate the total cost of rooms for a user with multiple bookings', function () {
    const userId = 13;
    const totalCost = calculateTotalRoomCost(userId, data);

    expect(totalCost).to.equal(530.49);
  });

  it('should return 0 for a user with no bookings', function () {
    const userId = 99;
    const totalCost = calculateTotalRoomCost(userId, data);
    expect(totalCost).to.equal(0);
  });

  it('should return 0 for a non-existent user', function () {
    const userId = 999;
    const totalCost = calculateTotalRoomCost(userId, data);
    expect(totalCost).to.equal(0);
  });
});
