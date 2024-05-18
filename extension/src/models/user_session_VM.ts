export interface StartSessionViewModel {
   // user_id: string;
    id: string;
    url: string;
    device_type: string;
    browser_type: string;
  }
  export interface EndSessionViewModel {
    session_id: string;
    active_time: number; // Assuming active_time is measured in seconds or any other unit
  }