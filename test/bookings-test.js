const expect = chai.expect;
import chai from 'chai';
import { data } from '../src/data/testData';
import { getUserId, getBookingsByCustomer, calculateTotalRoomCost, getAvailableRoomsByDate  } from '../src/bookings';


describe('getUserId', () => {
  it('should return the correct user ID for valid customer username', () => {
    const username = 'customer13';
    const result = getUserId(username);
    expect(result).to.equal(13);
  });

  it('should return null for non-customer usernames', () => {
    const username = 'notacustomer123';
    const result = getUserId(username);
    expect(result).to.equal(null);
  });

  it('should handle leading zeros in numeric parts', () => {
    const username = 'customer004';
    const result = getUserId(username);
    expect(result).to.equal(4);
  });
});

describe('getBookingsByCustomer', function () {
  it('should return the correct past bookings for a user with past bookings', function () {
    const userId = 13; // User ID with past bookings
    const pastBookings = getBookingsByCustomer(userId, data);
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
    const pastBookings = getBookingsByCustomer(userId, data);
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

describe('it should filter available rooms by date', () => {
  it('should return the correct available room numbers for a valid date', () => {
    const searchForDate = '2022-01-24';
    const availableRooms = getAvailableRoomsByDate(data, searchForDate);

    expect(availableRooms).to.deep.equal([1, 2, 3, 4, 12]);
  });

  it('should return an empty array when no rooms are available for a specific date', () => {
    const searchForDate = '2023/06/15';
    const availableRooms = getAvailableRoomsByDate(data, searchForDate);
  
   
    expect(availableRooms).to.deep.equal([])

  });
});