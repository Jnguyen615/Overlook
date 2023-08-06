const loginButton = document.getElementById('login-button')

loginButton.addEventListener('click', () => {
  const form = document.getElementById('form')
  if (form.style.display === 'none') {
    form.style.display = 'block'
  } else {
    form.style.display = 'none'
  }
})

