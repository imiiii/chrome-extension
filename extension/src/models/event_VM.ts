// Assuming this is added to the top of your new event.ts file or within the user_session.ts if keeping everything together

export interface CreateEventViewModel {
    page_view_id: string;
    event_type: string;
    element: string;
    timestamp: string; // or Date, depending on how you handle dates
  }