/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
/* chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
  if(tab.url && tab.url.includes('youtube.com/watch')){

    const queryParameters = tab.url.split('?')[1];
    const urlParameters = new URLSearchParams(queryParameters);
    const currentVideoId = urlParameters.get('v');

    chrome.tabs.sendMessage(tabId, {
      type: 'NEW_VIDEO',
      videoId: currentVideoId
    });
  }
}); */ 

/******/ })()
;
//# sourceMappingURL=background.js.map