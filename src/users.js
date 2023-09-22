import { data } from './data/testData';

export function submitLogin() {
  const usernameInput = document.querySelector('#username');
  const passwordInput = document.querySelector('#password');
  const signInOrError = document.querySelector('.sig-in-or-error-tag');
  const form = document.querySelector('#login-form');

  const username = usernameInput.value;
  const password = passwordInput.value;

  const ID = Number(username.slice(8));

  const checkID = ID > 0 && username.startsWith('customer');
  const checkPassword = password === 'overlook2021';

  if (checkID && checkPassword) {
    const customerName = getCustomer(ID, data);
    document.querySelector('.hello').textContent = `Welcome ${customerName}`;
  } else {
    form.InnerHTML = 'Incorrect Username or Password';
  }
}

export function getCustomer(ID, data) {
  const customer = data.customers.find(customer => customer.id === ID);

  if (customer) {
    getPastBookingsData(userId, data);

    return customer.name;
  } else {
    return null;
  }
}
