// Function to retrieve the stored token
// Function to retrieve the stored token
export const getToken = async (): Promise<string | null> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(['access_token'], (result) => {
      if (result.access_token) {
        resolve(result.access_token);
      } else {
        // Resolve with null to indicate no token found, instead of rejecting
        resolve(null);
      }
    });
  });
};
  
  // Function to store the token
  //export const setToken = (token: string): void => {
  //  chrome.storage.local.set({ access_token: token });
  //};
  // Ensure setToken is properly set up for asynchronous operations
  export const setToken = (token: string | null): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (token === null) {
        // Clear the token if null is explicitly passed
        chrome.storage.local.remove('access_token', () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } else {
        // Set the token as before
        chrome.storage.local.set({ access_token: token }, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      }
    });
};


export async function checkLoginStatusAndRedirect() {
  const accessToken = await getToken();
  if (accessToken) {
    window.location.href = 'success.html';
  }
}

export async function loginUser(username: string, password: string) {
  try {
    const response = await fetch('http://127.0.0.1:8000/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'password',
        username: username,
        password: password,
        client_id: 'your-client-id',
        client_secret: 'your-client-secret',
      }),
    });

    if (response.ok) {
      const tokenData = await response.json();
      const accessToken = tokenData.access_token;
      await setToken(accessToken);
      window.location.href = 'success.html';
    } else {
      const errorData = await response.json();
      throw new Error(`Login failed: ${errorData.error_description}`);
    }
  } catch (error) {
    throw error;
  }
}
// Function to remove the stored token
export const removeToken = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove('access_token', () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
};
export async function isTokenAvailable(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['access_token'], function(result) {
      if (result.access_token) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}