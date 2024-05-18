import { getToken, removeToken } from '../utils/auth';

// Function to toggle services
function toggleService(serviceId: string, turnOn: () => void, turnOff: () => void) {
  document.getElementById(serviceId)!.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      turnOn();
    } else {
      turnOff();
    }
  });
}

// Function to handle logout
function setupLogoutButton() {
  const logoutButton = document.getElementById('logoutBtn');
  logoutButton?.addEventListener('click', async () => {
    try {
      await removeToken(); // Call removeToken to delete the access token
      console.log('Logged out successfully.');
      window.location.href = 'popup.html'; // Adjust the redirection URL as needed
    } catch (error) {
      console.error('Logout failed:', error);
    }
  });
}

// Function to check token and handle UI accordingly
async function checkTokenAndHandleUI() {
  try {
    const token = await getToken();
    if (!token) {
      console.log('No access token found. Please log in.');
      // Optionally, redirect to login page or handle accordingly
      // For example, you might want to hide certain UI elements
      // or show a login link/button
    } else {
      // Token is found, you can adjust UI for logged in state if needed
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
    // Handle error, possibly by showing an error message to the user
  }
}

// Initialize functionality when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  setupLogoutButton();
  checkTokenAndHandleUI();
});