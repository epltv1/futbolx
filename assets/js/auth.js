function checkAuthStatus() {
  const vipSession = localStorage.getItem('vipSession');
  const adminToken = localStorage.getItem('adminToken');
  const loginLink = document.getElementById('loginLink');
  const logoutButton = document.getElementById('logoutButton');
  if (vipSession || adminToken) {
    loginLink.classList.add('d-none');
    logoutButton.classList.remove('d-none');
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('vipSession');
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    });
  } else {
    loginLink.classList.remove('d-none');
    logoutButton.classList.add('d-none');
  }
}
