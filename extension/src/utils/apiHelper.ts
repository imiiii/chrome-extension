// Import necessary utilities and types
import { getToken } from './auth';
import { API_BASE_URL } from './base';

type RequestType = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  endpoint: string;
  type: RequestType;
  data?: any;
  onSuccess?: (response: any) => void; // Optional onSuccess callback
  onFailure?: (error: Error) => void; // Optional onFailure callback
}

// Generic function to send API requests
export const sendRequest = async ({ endpoint, type, data, onSuccess, onFailure }: RequestOptions): Promise<void> => {
    try {
      const accessToken = await getToken();
      if (!accessToken) {
        throw new Error('Access token is null');
      }
  
      const fullUrl = `${API_BASE_URL}${endpoint}`;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      };
  
      const fetchOptions: RequestInit = {
        method: type,
        headers: headers,
      };
  
      if (data) {
        fetchOptions.body = JSON.stringify(data);
      }
  
      const response = await fetch(fullUrl, fetchOptions);
      const handledResponse = await handleApiResponse(response);
      if (onSuccess) onSuccess(handledResponse); // Use the onSuccess callback if provided
    } catch (error) {
      console.error('Error in sendRequest:', error);
      if (onFailure) onFailure(error instanceof Error ? error : new Error(String(error)));
    }
};

// Function to handle API response
async function handleApiResponse(response: Response): Promise<any> {
    if (!response.ok) {
      const errorBody = await response.text(); // Attempt to read the error message
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }
    return response.json(); // Parse and return the JSON body
}