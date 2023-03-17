export async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true
  });

  return tabs[0];
}

export const getTime = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  
  const date1 = date.toISOString().substring(11, 19);
  return date1;
  
};

