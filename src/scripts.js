import './css/styles.css';
import { fetchData } from './api-calls';
import { submitLogin } from './customers';
import { populateRoomCardSection, createRoomCard } from './dom-updates';
import { getUserId, getRoomNumber, getRoomsByUser } from './bookings';
import flatpickr from 'flatpickr';

const form = document.getElementById('login-form');
const loginButton = document.getElementById('login-button');
const mainPageLogo = document.querySelector('.title');
const mainPageView = document.querySelector('.main-view');
const newBookingButton = document.querySelector('#new-booking-button');
const topBar = document.querySelector('.main-page-view-top-bar');

let data;

document.addEventListener('DOMContentLoaded', function () {
  const promises = [
    fetchData('customers'),
    fetchData('rooms'),
    fetchData('bookings'),
  ];

  Promise.all(promises)
    .then(results => {
      data = {
        customers: results[0].customers,
        rooms: results[1].rooms,
        bookings: results[2].bookings,
      };
      console.log(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

loginButton.addEventListener('click', function (event) {
  event.preventDefault();
  const usernameInput = document.querySelector('#username');
  const passwordInput = document.querySelector('#password');
  const signInOrError = document.querySelector('.sign-in-or-error-tag');

  const username = usernameInput.value;
  const password = passwordInput.value;

  submitLogin(data, username, password, signInOrError);
  form.hidden = true;
  mainPageLogo.hidden = true;
  mainPageView.hidden = false;
  topBar.style.display = 'flex';
  const userID = getUserId(username);
  const roomNumber = getRoomNumber(userID, data);
  getRoomsByUser(userID, data);
});

newBookingButton.addEventListener('click', function () {
  mainPageView.hidden = true;
});
