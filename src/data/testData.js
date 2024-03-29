
export const data = {
  bookings: [ 
    {
      id: '1', 
      userID: 9, 
      date: '2022/04/22', 
      roomNumber: 15
    },
    {
      id: '2', 
      userID: 43, 
      date: '2022/01/24', 
      roomNumber: 24
    },
    {
      id: '3', 
      userID: 13, 
      date: '2022/01/10', 
      roomNumber: 12
    },
    {
      id: '4', 
      userID: 20, 
      date: '2022/02/16', 
      roomNumber: 7
    },
    {
      id: '5', 
      userID: 1, 
      date: '2022/02/05', 
      roomNumber: 12
    },
    {
      id: '6',
      userID: 13,
      date: '2022/02/19',
      roomNumber: 1
    }
  ],

  customers: [
    {
      id: 1,
      name: 'Leatha Ullrich'
    },

    {
      id: 2,
      name: 'Rocio Schuster'
    },

    {
      id: 3,
      name: 'Kelvin Schiller'
    },
    {
      id: 4,
      name: 'Kennedi Emard'
    },
    {
      id: 5,
      name: 'Rhiannon Little'
    }
  ],

  rooms: [
    {
      number: 1,
      roomType: 'residential suite',
      bidet: true,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 358.4
    },

    {
      number: 2,
      roomType: 'suite',
      bidet: false,
      bedSize: 'full',
      numBeds: 2,
      costPerNight: 477.38
    },
    {
      number: 3,
      roomType: 'single room',
      bidet: false,
      bedSize: 'king',
      numBeds: 1,
      costPerNight: 491.14
    },
    {
      number: 4,
      roomType: 'single room',
      bidet: false,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 429.44
    },
    {
      number: 12,
      roomType: 'single room',
      bidet: false,
      bedSize: 'twin',
      costPerNight: 172.09
    }
  ]
}
