// Listen for click events
document.addEventListener('click', (event) => {
  // Assert event.target as an Element to access the tagName property
  const element = (event.target as Element).tagName; // Correctly access tagName
  chrome.runtime.sendMessage({
    action: 'createEvent',
    data: {
      event_type: 'click',
      element: element,
      timestamp: new Date().toISOString(),
    }
  });
});