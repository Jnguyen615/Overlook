import { getRoomsByUser, getUserId } from './bookings';

export function submitLogin(username, password) {
  console.log("UN", username)
  const ID = getUserId(username);
  const checkID = ID > 0 && username.startsWith('customer');
  const checkPassword = password === 'overlook2021';

  return checkID && checkPassword

}

export function showCustomerName() {
}

export function handleLoginError() {
  const signInOrError = document.querySelector('.sign-in-or-error-tag');
  signInOrError.textContent = 'Incorrect Username or Password';
}

export function getCustomer(ID, data) {
  const customer = data.customers.find(customer => customer.id === ID);
  if (customer) {
    getRoomsByUser(ID, data);
    return customer.name;
  } else {
    return null;
  }
}
