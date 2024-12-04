chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({
      url: chrome.runtime.getURL("index.html"), // 열고자 하는 HTML 파일
    });
  });