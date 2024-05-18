import { getToken } from '../utils/auth';
import { StartSessionViewModel, EndSessionViewModel } from '../models/user_session_VM';
import { API_BASE_URL, generateGUID } from '../utils/base'; // Import the base URL
import { sendRequest } from '../utils/apiHelper';
import { genericOnSuccess, genericOnFailure } from '../utils/responseHandler'; // Import generic handlers

// Function to detect browser type
const detectBrowserType = (): string => {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) !== -1 ) {
      return 'Opera';
    } else if (navigator.userAgent.indexOf("Chrome") !== -1 ) {
      return 'Chrome';
    } else if (navigator.userAgent.indexOf("Safari") !== -1) {
      return 'Safari';
    } else if (navigator.userAgent.indexOf("Firefox") !== -1 ) {
      return 'Firefox';
    } else if ((navigator.userAgent.indexOf("MSIE") !== -1 ) || !!(document as any).documentMode) {
      return 'IE';
    } else {
      return 'Unknown';
    }
};


// Function to start a session using the Fetch API and generic response handlers
export const startSession = async (data: any, tabId: number): Promise<any> => {
  const onSuccess = (response: any) => {
    console.log('Session started successfully:', response);
    // Assuming the response contains a sessionId property
    const sessionId = response.session_id;
    if (sessionId) {
      chrome.storage.local.set({[`session_${tabId}`]: sessionId}, () => {
        console.log(`Session ID ${sessionId} saved for tab ${tabId}`);
      });
    }
    // Then call the generic success handler, possibly with additional actions
    genericOnSuccess(response, () => {
      // Additional actions after the generic success handling, if needed
    });
  };

  const onFailure = (error: Error) => {
    console.error('Error starting session:', error);
    // Then call the generic failure handler, possibly with additional actions
    genericOnFailure(error, () => {
      // Additional actions after the generic failure handling, if needed
    });
  };

  // Adjust the sendRequest call to include the onSuccess and onFailure handlers
  await sendRequest({
    endpoint: '/sessions/start',
    type: 'POST',
    data: data,
    onSuccess: onSuccess,
    onFailure: onFailure,
  });
};

export const endSession = async (tabId: number, activeTime: number): Promise<void> => {
  // Retrieve the session ID from Chrome's storage
  chrome.storage.local.get(`session_${tabId}`, async (result) => {
    const sessionId = result[`session_${tabId}`];
    if (!sessionId) {
      console.error(`No session ID found for tab ID: ${tabId}`);
      return;
    }

    const data: EndSessionViewModel = { session_id: sessionId, active_time: activeTime };

    const onSuccess = (response: any) => {
      console.log('Session ended successfully:', response);
      // Clean up after ending the session
      chrome.storage.local.remove(`session_${tabId}`);
      genericOnSuccess(response);
    };

    const onFailure = (error: Error) => {
      console.error('Error ending session:', error);
      genericOnFailure(error);
    };

    const endpoint = `/sessions/end/${sessionId}`;
    await sendRequest({
      endpoint: endpoint,
      type: 'PUT',
      data: data,
      onSuccess: onSuccess,
      onFailure: onFailure,
    });
  });
};