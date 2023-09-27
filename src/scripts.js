import './css/styles.css';
import { fetchData } from './api-calls';
import { checkUsernameAndPassword, getCustomer } from './login';
import {
  populateRoomCardSection,
  handleLoginError,
  displayTotalSpent,
  displayAvailableRoomCards,
  displayFilteredRooms,
} from './dom-updates';
import { getUserId, filterRoomsByType } from './bookings';
import './images/main-view-background.png';

const form = document.getElementById('login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const loginButton = document.getElementById('login-button');
const mainPageLogo = document.querySelector('.title');
const mainPageView = document.querySelector('.main-view');
const newBookingButton = document.getElementById('new-booking-button');
const topBar = document.querySelector('.main-page-view-top-bar');
const searchViewTopBar = document.querySelector('.search-view-top-bar');
const bookingsArea = document.getElementById('bookings-section');
const welcomeTitle = document.querySelector('.welcome-user');
const body = document.body;
const dateInput = document.querySelector('.date-calendar');
const currentDate = new Date().toISOString().split('T')[0];
const container = document.getElementById('available-rooms-section');
const searchView = document.querySelector('.search-view');
const dropDownMenu = document.getElementById('dropdown');
const backToMainButton = document.getElementById('back-to-main');
const totalSpent = document.querySelector('.total-spent');

let data;
let username;
let userID;

window.addEventListener('DOMContentLoaded', function () {
  const promises = [
    fetchData('customers'),
    fetchData('rooms'),
    fetchData('bookings'),
  ];
  body.style.backgroundImage = 'url("./images/main-view-background.png")';
  dateInput.setAttribute('min', currentDate);
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
  const loginMessage = document.querySelector('.login-message');
  const password = passwordInput.value.trim();
  username = usernameInput.value.trim();
  const submitResponse = checkUsernameAndPassword(username, password);

  if (submitResponse === true) {
    form.hidden = true;
    mainPageLogo.hidden = true;
    mainPageView.hidden = false;
    topBar.style.display = 'flex';
    userID = getUserId(username);
    const customerName = getCustomer(userID, data);
    if (bookingsArea) {
      populateRoomCardSection(data.rooms, userID, data, bookingsArea);
      displayTotalSpent(userID, data, totalSpent);
    }
    welcomeTitle.textContent = `Welcome ${customerName}`;
  } else {
    handleLoginError(loginMessage);
  }
});

newBookingButton.addEventListener('click', function (event) {
  event.preventDefault();
  mainPageView.hidden = true;
  searchViewTopBar.hidden = false;
  searchView.hidden = false;
  const searchForDate = document.getElementById('selected-date-input').value;

  if (searchForDate) {
    displayAvailableRoomCards(data, searchForDate, container, username);
  } else {
    console.log('Please select a date from the calendar.');
  }
});

dateInput.addEventListener('input', function () {
  if (dateInput.value) {
    newBookingButton.disabled = false;
  }
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

dropDownMenu.addEventListener('change', function (event) {
  const selectedRoomType = event.target.value;
  const searchForDate = document.getElementById('selected-date-input').value;
  if (selectedRoomType === 'select an option') {
    displayAllRooms(data, searchForDate, username);
  } else {
    const filteredRooms = filterRoomsByType(selectedRoomType, data);
    displayFilteredRooms(
      data,
      filteredRooms,
      searchForDate,
      username,
      container,
    );
  }
});

backToMainButton.addEventListener('click', function (event) {
  container.hidden = true;
  searchViewTopBar.hidden = true;
  searchView.hidden = true;
  mainPageView.hidden = false;
  ƒ;
  populateRoomCardSection(data.rooms, userID, data.bookings, bookingsArea);
});
