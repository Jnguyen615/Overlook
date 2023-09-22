import './css/styles.css';
import { promises } from './api-calls';
import { submitLogin } from './users';
import { populateRoomCardSection, createRoomCard } from './dom-updates';
import flatpickr from 'flatpickr';
import { data } from './data/testData';

const usernameInput = document.querySelector('input[name="username"]');
const passwordInput = document.querySelector('input[name="password"]');
const form = document.querySelector('#login-form');
const loginButton = document.getElementById('login-button');
const mainPageLogo = document.querySelector('.title');
const pastBookingsArea = document.querySelector('.past-booking-cards');
const upcomingBookingsArea = document.querySelector('.upcoming-bookings-cards');
const mainPageView = document.querySelector('.main-view');
const newBookingButton = document.querySelector('#new-booking-button');
const topBar = document.querySelector('.main-page-view-top-bar');

document.addEventListener('DOMContentLoaded', function () {
  let data;
  Promise.all(promises).then(results => {
    data = {
      customers: results['0'].customers,
      rooms: results['1'].rooms,
      bookings: results['2'].bookings,
    };
    console.log(data);
  });
});

loginButton.addEventListener('click', function (event) {
  event.preventDefault();
  submitLogin();
  form.hidden = true;
  mainPageLogo.hidden = true;
  mainPageView.hidden = false;
  topBar.style.display = 'flex';
  return data.rooms.forEach(function (room) {
    createRoomCard(room, 'past-bookings-section');
    populateRoomCardSection(room, 'past-bookings-section');
  });
});

newBookingButton.addEventListener('click', function () {
  mainPageView.hidden = true;
});

// form.addEventListener('submit', (event) => {
// })
