/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content/utils.ts":
/*!******************************!*\
  !*** ./src/content/utils.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getActiveTabURL": () => (/* binding */ getActiveTabURL),
/* harmony export */   "getTime": () => (/* binding */ getTime)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getActiveTabURL() {
    return __awaiter(this, void 0, void 0, function* () {
        const tabs = yield chrome.tabs.query({
            currentWindow: true,
            active: true
        });
        return tabs[0];
    });
}
const getTime = (seconds) => {
    const date = new Date(0);
    date.setSeconds(seconds);
    const date1 = date.toISOString().substring(11, 19);
    return date1;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/content/contentScript.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/content/utils.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

let currentVideo = "";
let currentVideoBookmarks = [];
let youtubeVideo;
const getBookmarks = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield chrome.storage.sync.get([currentVideo]);
    const bookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];
    return bookmarks;
});
const checkIfBookmarkExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = currentVideoBookmarks.find((bookmark) => bookmark.id === id);
    if (exists)
        return true;
    else
        return false;
});
const addBookmarkEventHandler = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentVideoTime = youtubeVideo.currentTime;
    const existe = yield checkIfBookmarkExist(currentVideoTime.toString());
    if (existe === false) {
        const newBookmark = {
            id: currentVideoTime.toString(),
            title: 'Bookmark at ' + (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getTime)(currentVideoTime),
            time: currentVideoTime
        };
        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark])
        });
        currentVideoBookmarks = yield getBookmarks(); // 3
    }
});
const newVideoLoaded = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookmarkExists = document.querySelector('.bookmark-btn');
    currentVideoBookmarks = yield getBookmarks();
    if (!bookmarkExists) {
        const youtubeLeftControls = document.querySelector('.ytp-left-controls');
        youtubeVideo = document.querySelector('.video-stream');
        const container = document.createElement('div');
        container.className = 'bookmark-icon-container';
        const bookmarkBtn = document.createElement('img');
        bookmarkBtn.src = chrome.runtime.getURL("bookmark-icon.png");
        bookmarkBtn.className = 'ytp-button bookmark-btn';
        bookmarkBtn.style.width = '30px';
        bookmarkBtn.style.height = '30px';
        container.appendChild(bookmarkBtn);
        youtubeLeftControls === null || youtubeLeftControls === void 0 ? void 0 : youtubeLeftControls.appendChild(container);
        bookmarkBtn.addEventListener('click', addBookmarkEventHandler);
    }
});
// Function called when a new message is received
const messagesFromBackground = (msg, sender, sendResponse) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'NEW_VIDEO') {
        currentVideo = msg.videoId;
        newVideoLoaded();
    }
    else if (msg.type === 'GO_BACK') {
        youtubeVideo.currentTime = msg.currentTime;
    }
    else if (msg.type === 'DELETE') {
        currentVideoBookmarks = currentVideoBookmarks.filter((bookmark) => bookmark.id != msg.bookmarkId);
        chrome.storage.sync.set({ [currentVideo]: JSON.stringify(currentVideoBookmarks) });
        sendResponse(currentVideoBookmarks);
    }
});
chrome.runtime.onMessage.addListener(messagesFromBackground);

})();

/******/ })()
;
//# sourceMappingURL=contentScript.js.map