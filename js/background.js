var builderContainer = document.getElementById('cat-builder-content-outer-container')
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.insertCSS(tab.id, { file: "css/style.css" });
  if (typeof Handlebars == 'undefined') {
    chrome.tabs.executeScript(tab.id, { file: "js/handlebars-v1.3.0.js" });
  };
  chrome.tabs.executeScript(tab.id, { file: "js/handlebars_helpers.js" });
  chrome.tabs.executeScript(tab.id, { file: "js/data.js" });
  chrome.tabs.executeScript(tab.id, { file: "js/template.js" });
  chrome.tabs.executeScript(tab.id, { file: "js/model.js" });
  chrome.tabs.executeScript(tab.id, { file: "js/view.js" });
  chrome.tabs.executeScript(tab.id, { file: "js/controller.js" });
});
