// extention/src/api/page_view.ts

import { sendRequest } from '../utils/apiHelper';
import { genericOnSuccess, genericOnFailure } from '../utils/responseHandler';
import { StartPageViewModel, EndPageViewModel } from '../models/page_view_VM';

// Function to start a page view
export const startPageView = async (data: Omit<StartPageViewModel, 'session_id'>, tabId: number): Promise<void> => {
  chrome.storage.local.get(`session_${tabId}`, async (result) => {
    const sessionId = result[`session_${tabId}`];
    if (!sessionId) {
      console.error(`No session ID found for tab ID: ${tabId}`);
      return;
    }

    const completeData: StartPageViewModel = {
      ...data,
      session_id: sessionId,
    };

    const onSuccess = (response: any) => {
      console.log('Page view started successfully:', response);
      const pageViewId = response.pageview_id;
      if (pageViewId) {
        chrome.storage.local.set({[`pageview_${tabId}`]: pageViewId}, () => {
          console.log(`Page view ID ${pageViewId} saved for tab ${tabId}`);
        });
      }
      genericOnSuccess(response);
    };

    const onFailure = (error: Error) => {
      console.error('Error starting page view:', error);
      genericOnFailure(error);
    };

    await sendRequest({
      endpoint: '/pageviews/start',
      type: 'POST',
      data: completeData,
      onSuccess: onSuccess,
      onFailure: onFailure,
    });
  });
};

// Function to end a page view
export const endPageView = async (tabId: number, activeTime: number): Promise<void> => {
  chrome.storage.local.get(`pageview_${tabId}`, async (result) => {
    const pageViewId = result[`pageview_${tabId}`];
    if (!pageViewId) {
      console.error(`No page view ID found for tab ID: ${tabId}`);
      return;
    }

    const data: EndPageViewModel = {
      pageview_id: pageViewId,
      active_time: activeTime,
    };

    const onSuccess = (response: any) => {
      console.log('Page view ended successfully:', response);
      chrome.storage.local.remove(`pageview_${tabId}`);
      genericOnSuccess(response);
    };

    const onFailure = (error: Error) => {
      console.error('Error ending page view:', error);
      genericOnFailure(error);
    };

    const endpoint = `/pageviews/end/${pageViewId}`;
    await sendRequest({
      endpoint: endpoint,
      type: 'PUT',
      data: data,
      onSuccess: onSuccess,
      onFailure: onFailure,
    });
  });
};