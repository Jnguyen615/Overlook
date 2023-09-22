import './css/styles.css';
import { promises } from './api-calls'
import flatpickr from "flatpickr";

document.addEventListener("DOMContentLoaded", function () {
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