import './css/styles.css';
import { fetchData } from './api-calls';
import { checkUsernameAndPasswords, getCustomer } from './login';
import { populateRoomCardSection, createRoomCard } from './dom-updates';
import { getUserId, getRoomNumbers, getBookingsByCustomer } from './bookings';
import flatpickr from 'flatpickr';

const form = document.getElementById('login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const loginButton = document.getElementById('login-button');
const mainPageLogo = document.querySelector('.title');
const mainPageView = document.querySelector('.main-view');
const newBookingButton = document.querySelector('#new-booking-button');
const topBar = document.querySelector('.main-page-view-top-bar');
const bookingsArea = document.querySelector('.booking-section')
const welcomeTitle = document.querySelector('.hello')
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

usernameInput.addEventListener('input', checkInputs);
passwordInput.addEventListener('input', checkInputs);

loginButton.addEventListener('click', function (event) {
  event.preventDefault();
  const signInOrError = document.querySelector('.sign-in-or-error-text');

  const username = usernameInput.value;
  const password = passwordInput.value;
  const submitResponse = checkUsernameAndPasswords(username, password)
  if (submitResponse === true ) {
    form.hidden = true;
    mainPageLogo.hidden = true;
    mainPageView.hidden = false;
    topBar.style.display = 'flex';
    const userID = getUserId(username);
    const customerName = getCustomer(userID, data);
    if (bookingsArea) {
      populateRoomCardSection(rooms, userID, data, bookingsArea )
    }
    welcomeTitle.textContent = `Welcome ${customerName}`;
  } else {
    signInOrError.textContent = 'Please check your username and password again'
  }
});

newBookingButton.addEventListener('click', function () {
  mainPageView.hidden = true;
});

function checkInputs() {
  if (usernameInput.value !== '' && passwordInput.value !== '') {
    loginButton.removeAttribute('disabled');
  } else {
    loginButton.setAttribute('disabled', 'true');
  }
}
form.addEventListener('submit', function (e) {
  e.preventDefault();
}
);