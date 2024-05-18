import { getToken, loginUser, removeToken } from '../utils/auth';

async function init() {
  const accessToken = await getToken();
  if (accessToken) {
    // If a token exists, redirect to the success page
    window.location.href = 'success.html';
    return;
  }

  // Setup login event listener
  document.getElementById('loginBtn')?.addEventListener('click', async (event) => {
    event.preventDefault();
    const usernameInput = document.getElementById('username') as HTMLInputElement | null;
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;
    const statusElement = document.getElementById('status') as HTMLElement | null;

    if (usernameInput && passwordInput && statusElement) {
      try {
        await loginUser(usernameInput.value, passwordInput.value);
        window.location.href = 'success.html';
      } catch (error) {
        console.error('Login error:', error);
        statusElement.innerText = 'Login failed. Please try again.';
      }
    } else {
      console.error('One or more required elements are missing.');
    }
  });

  // Setup logout event listener
  document.getElementById('logoutBtn')?.addEventListener('click', async () => {
    const accessToken = await getToken();
    if (!accessToken) {
      alert('No access token found in the Chrome local storage.');
      return;
    }
    try {
      await removeToken();
      alert('Logged out successfully.');
      window.location.reload(); // Optionally, refresh or redirect to login page
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to log out.');
    }
  });
}

document.addEventListener('DOMContentLoaded', init);