// dev only: async fetch bundle

const arrowURLs = [ 'http://localhost:3000' ];

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status !== 'loading') return;
  const matched = arrowURLs.every(url => !!tab.url.match(url));
  if (!matched) return;

  chrome.tabs.executeScript(tabId, {
    code: 'var injected = window.browserReduxInjected; window.browserReduxInjected = true; injected;',
    runAt: 'document_start'
  }, (result) => {
    if (chrome.runtime.lastError || result[0]) return;
    fetch('http://localhost:3000/js/inject.bundle.js').then(response => {
      return response.text();
    }).then(response => {

      // Include Redux DevTools extension
      const httpRequest = new XMLHttpRequest();
      httpRequest.open('GET', 'chrome-extension://lmhkpmbekcpmknklioeibfkpmmfibljd/js/inject.bundle.js');
      httpRequest.send();
      httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
          chrome.tabs.executeScript(tabId, { code: httpRequest.responseText, runAt: 'document_start' });
        }
      };

      chrome.tabs.executeScript(tabId, { code: response, runAt: 'document_end' });
    });
  });
});
