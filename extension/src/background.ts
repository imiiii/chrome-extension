import { startSession, endSession } from './api/user_session';
import { startPageView, endPageView } from './api/page_view';
import { isTokenAvailable } from './utils/auth';
import { extractDomain } from './utils/urlParser';
import { StartSessionViewModel, EndSessionViewModel } from './models/user_session_VM';
import { StartPageViewModel, EndPageViewModel } from './models/page_view_VM';
import { createEvent } from './api/event';
// Enhanced tabUrls object to track active state and accumulated active time
const tabUrls: { [key: number]: { url: string, startTime: number, isActive: boolean, accumulatedActiveTime: number } } = {};

async function handleNewLink(tabId: number, url: string) {
  const deviceType = "detectDeviceType"; // Placeholder for actual device type detection
  const browserType = "detectBrowserType"; // Placeholder for actual browser type detection

  const startSessionModel: StartSessionViewModel = {
    id: '',
    url,
    device_type: deviceType,
    browser_type: browserType
  };

  const sessionId = await startSession(startSessionModel, tabId);

  const startPageViewModel: StartPageViewModel = {
    session_id: sessionId,
    url,
  };

  await startPageView(startPageViewModel, tabId);

  // Initialize isActive and accumulatedActiveTime for the new link
  tabUrls[tabId] = { url, startTime: Date.now(), isActive: true, accumulatedActiveTime: 0 };
}

async function handleCloseTab(tabId: number) {
  const tabInfo = tabUrls[tabId];
  if (!tabInfo) return;

  const activeTime = tabInfo.isActive ? Date.now() - tabInfo.startTime + tabInfo.accumulatedActiveTime : tabInfo.accumulatedActiveTime;
  await endPageView(tabId, activeTime);
  await endSession(tabId, 0);
  delete tabUrls[tabId];
}

async function handleChangeUrl(tabId: number, newUrl: string) {
  const oldUrl = tabUrls[tabId]?.url;
  const oldDomain = extractDomain(oldUrl);
  const newDomain = extractDomain(newUrl);

  if (oldDomain !== newDomain) {
    await handleCloseTab(tabId);
    await handleNewLink(tabId, newUrl);
  } else {
    const tabInfo = tabUrls[tabId];
    const activeTime = tabInfo.isActive ? Date.now() - tabInfo.startTime + tabInfo.accumulatedActiveTime : tabInfo.accumulatedActiveTime;
    await endPageView(tabId, activeTime);
    await startPageView({
      url: newUrl
    }, tabId);
    tabUrls[tabId] = { url: newUrl, startTime: Date.now(), isActive: true, accumulatedActiveTime: 0 };
  }
}

// Function to update the active state and accumulated active time for a tab
function updateTabActiveState(tabId: number, isActive: boolean) {
  const tabInfo = tabUrls[tabId];
  if (!tabInfo) return;

  const currentTime = Date.now();
  if (isActive) {
    tabInfo.startTime = currentTime;
    tabInfo.isActive = true;
  } else if (tabInfo.isActive) {
    tabInfo.accumulatedActiveTime += currentTime - tabInfo.startTime;
    tabInfo.isActive = false;
  }
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!changeInfo.url || changeInfo.url === 'chrome://newtab/') return;

  const tokenExists = await isTokenAvailable();
  if (!tokenExists) {
    console.log('Token not found. Actions will not be performed.');
    return;
  }

  if (!tabUrls[tabId] || extractDomain(tabUrls[tabId].url) !== extractDomain(changeInfo.url)) {
    await handleNewLink(tabId, changeInfo.url);
  } else if (tabUrls[tabId] && extractDomain(tabUrls[tabId].url) === extractDomain(changeInfo.url)) {
    await handleChangeUrl(tabId, changeInfo.url);
  }
});

chrome.tabs.onRemoved.addListener(async (tabId) => {
  if (tabUrls[tabId]) {
    await handleCloseTab(tabId);
  }
});

chrome.tabs.onActivated.addListener(activeInfo => {
  updateTabActiveState(activeInfo.tabId, true);
  Object.keys(tabUrls).forEach(tabId => {
    if (parseInt(tabId) !== activeInfo.tabId) {
      updateTabActiveState(parseInt(tabId), false);
    }
  });
});



// Assuming window focus and blur events are relevant to your application's architecture
chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    // No Chrome window is focused
    Object.keys(tabUrls).forEach(tabId => {
      updateTabActiveState(parseInt(tabId), false);
    });
  } else {
    // A Chrome window is focused, find the active tab in this window
    chrome.tabs.query({active: true, windowId: windowId}, (tabs) => {
      if (tabs.length > 0) {
        // Assuming only one active tab per window
        updateTabActiveState(tabs[0].id, true);
      }
    });
  }
});

chrome.tabs.onActivated.addListener(activeInfo => {
  // Set the newly active tab as active
  updateTabActiveState(activeInfo.tabId, true);

  // Set all other tabs in the same window as inactive
  chrome.tabs.query({windowId: activeInfo.windowId}, (tabs) => {
    tabs.forEach(tab => {
      if (tab.id !== activeInfo.tabId) {
        updateTabActiveState(tab.id, false);
      }
    });
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'createEvent' && sender.tab?.id) {
    createEvent(message.data, sender.tab.id).then(() => {
      console.log('Event logged successfully');
    }).catch((error) => {
      console.error('Error logging event:', error);
    });
  }
});