import { getRoomsByUser } from './bookings';

export function submitLogin(data, username, password) {
  const ID = Number(username.slice(8));
  const checkID = ID > 0 && username.startsWith('customer');
  const checkPassword = password === 'overlook2021';
  if (checkID && checkPassword) {
    const customerName = getCustomer(ID, data);
    document.querySelector('.hello').textContent = `Welcome ${customerName}`;
  } else {
    handleLoginError
  }
}

function handleLoginError() {
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
