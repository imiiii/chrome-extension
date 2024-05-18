// @models/page_view_VM.ts

export interface StartPageViewModel {
    session_id: string; // Session ID is required for starting a page view
    url: string;
    //timestamp: number;
  }
  
  export interface EndPageViewModel {
    pageview_id: string; // Unique identifier for the page view to end
    active_time: number; // The amount of active time to record for the page view
  }