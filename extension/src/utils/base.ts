import { HttpMethod } from './enum'; // Importing HttpMethod enum
import { getToken } from './auth'; // Adjust this import path as necessary


//GUID generator
export const generateGUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
// Define the base URL for your API
export const API_BASE_URL = 'http://127.0.0.1:8000';

// Interface for request parameters
interface RequestParams {
  url: string;
  method?: HttpMethod;
  data?: any;
}

// Generalized API request function


// Additional utility functions or constants can be added here