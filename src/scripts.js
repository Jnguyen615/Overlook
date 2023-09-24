import './css/styles.css';
import { fetchData } from './api-calls';
import { checkUsernameAndPassword, getCustomer } from './login';
import { populateRoomCardSection, handleLoginError, displayTotalSpent } from './dom-updates';
import { getUserId } from './bookings';
import flatpickr from 'flatpickr';


const form = document.getElementById('login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const loginButton = document.getElementById('login-button');
const mainPageLogo = document.querySelector('.title');
const mainPageView = document.querySelector('.main-view');
const newBookingButton = document.querySelector('#new-booking-button');
const topBar = document.querySelector('.main-page-view-top-bar');
const bookingsArea = document.querySelector('#bookings-section');
const welcomeTitle = document.querySelector('.welcome-user');

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

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const submitResponse = checkUsernameAndPassword(username, password);
  if (submitResponse === true) {
    form.hidden = true;
    mainPageLogo.hidden = true;
    mainPageView.hidden = false;
    topBar.style.display = 'flex';
    const userID = getUserId(username);
    const customerName = getCustomer(userID, data);
    if (bookingsArea) {
      populateRoomCardSection(data.rooms, userID, data, bookingsArea);
      displayTotalSpent(userID, data)
    }
    welcomeTitle.textContent = `Welcome ${customerName}`;
  } else {
    handleLoginError();
  }
});

newBookingButton.addEventListener('click', function () {
  mainPageView.hidden = true;
});

function checkInputs() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  if (username !== '' && password !== '') {
    loginButton.removeAttribute('disabled');
  } else {
    loginButton.setAttribute('disabled', 'true');
  }
}
form.addEventListener('submit', function (e) {
  e.preventDefault();
});
