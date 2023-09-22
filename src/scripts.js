import './css/styles.css'
import { promises } from './api-calls'
import { populateRoomCardSection, createRoomCard } from './dom-updates'
import flatpickr from "flatpickr"

const form = document.getElementById("login-form");
const loginButton = document.getElementById("login-button")
const mainPageLogo = document.querySelector('.title')
const pastBookingsArea = document.querySelector('.past-booking-cards')
const upcomingBookingsArea = document.querySelector('.upcoming-bookings-cards')
const mainPageView = document.querySelector('.main-view')
const newBookingButton = document.querySelector('#new-booking-button')
const topBar = document.querySelector('.main-page-view-top-bar')


document.addEventListener('DOMContentLoaded', function () {
  let data;
  Promise.all(promises)
  .then(results => {
    data = {
      customers: results['0'].customers,
      rooms: results['1'].rooms,
      bookings: results['2'].bookings
    }
    console.log(data)
  })
})

loginButton.addEventListener("click", function () {
  form.hidden = true
  mainPageLogo.hidden = true
  mainPageView.hidden = false
  topBar.style.display = 'flex'
   rooms.forEach(function (room) {
     createRoomCard(room, 'past-bookings-section');
     populateRoomCardSection(room, 'upcoming-bookings-section');

   })
});

newBookingButton.addEventListener('click', function() {
  mainPageView.hidden = true
})