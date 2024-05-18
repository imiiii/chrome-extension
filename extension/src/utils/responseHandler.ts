// Generic onSuccess handler
export const genericOnSuccess = (response: any, callback?: (response: any) => void) => {
    console.log('Request succeeded with response:', response);
    if (callback) {
      callback(response);
    }
  };
  
  // Generic onFailure handler
  export const genericOnFailure = (error: Error, callback?: (error: Error) => void) => {
    console.error('Request failed with error:', error);
    if (callback) {
      callback(error);
    }
  };