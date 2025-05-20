function checkAuthStatus() {
  const token = localStorage.getItem('authToken');
  const loginLink = document.getElementById('loginLink');
  const logoutButton = document.getElementById('logoutButton');
  if (token) {
    loginLink.classList.add('d-none');
    logoutButton.classList.remove('d-none');
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('authToken');
      window.location.reload();
    });
  } else {
    loginLink.classList.remove('d-none');
    logoutButton.classList.add('d-none');
  }
}
