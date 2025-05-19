// assets/js/auth.js
function checkAuthStatus() {
  const token = localStorage.getItem('token');
  const loginLink = document.getElementById('loginLink');
  const logoutButton = document.getElementById('logoutButton');
  if (token) {
    loginLink.classList.add('d-none');
    logoutButton.classList.remove('d-none');
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    });
  } else {
    loginLink.classList.remove('d-none');
    logoutButton.classList.add('d-none');
  }
}
