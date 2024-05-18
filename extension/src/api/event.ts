import { sendRequest } from '../utils/apiHelper';
import { genericOnSuccess, genericOnFailure } from '../utils/responseHandler';
import { CreateEventViewModel } from '../models/event_VM';


export const createEvent = async (data: Omit<CreateEventViewModel, 'page_view_id'>, tabId: number): Promise<void> => {
  chrome.storage.local.get(`pageview_${tabId}`, async (result) => {
    const pageViewId = result[`pageview_${tabId}`];
    if (!pageViewId) {
      console.error(`No page view ID found for tab ID: ${tabId}`);
      return;
    }

    const completeData: CreateEventViewModel = {
      ...data,
      page_view_id: pageViewId,
    };

    const onSuccess = (response: any) => {
      console.log('Event created successfully:', response);
      genericOnSuccess(response);
    };

    const onFailure = (error: Error) => {
      console.error('Error creating event:', error);
      genericOnFailure(error);
    };

    await sendRequest({
      endpoint: '/events/create',
      type: 'POST',
      data: completeData,
      onSuccess: onSuccess,
      onFailure: onFailure,
    });
  });
};