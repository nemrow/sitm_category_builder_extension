var Controller = {
  init: function () {
    Controller.injectTemplates(Controller.enableCatBuilder)
  },

  enableCatBuilder: function () {
    Model.loadLocalData(Controller.activateDom);
  },

  activateDom: function () {
    View.displayCatBuilder();
    View.disableAllClickables();
    Controller.activateLinkDetector();
    Controller.activateEditableFields();
    Controller.activateCatClose();
    Controller.activateCatRemoval();
    Controller.activateJSONViewer();
    Controller.highlightCurrentCatLinks();
  },

  activateJSONViewer: function () {
    View.jsonButton().addEventListener('click', function () {
      View.injectJSONToView();
      View.showJSON();
    });
    View.jsonCloseButton().addEventListener('click', function () {
      View.hideJSON();
    });
  },

  activateCatClose: function () {
    View.catClose().addEventListener('click', function(){
      View.outerCatContainer().remove();
      View.enableAllClickables();
    });
  },

  injectTemplates: function (callback) {
    var xhReq = Controller.getInitXhrReq()
    xhReq.send(null);
    var serverResponse = xhReq.responseText;
    View.bodyDiv().innerHTML += serverResponse;
    callback()
  },

  activateLinkDetector: function () {
    var allLinks = View.allLinks();
    for (i=0; i < allLinks.length; i++) {
      allLinks[i].addEventListener('click', function(){
        Model.addUrlToCurrentVendor(this);
      });
    }
  },

  getInitXhrReq: function () {
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", chrome.extension.getURL('html/template.html'), false);
    return xhReq;
  },

  addEventlistenersToEditableFields: function (cat, index) {
    var inputs = cat.querySelectorAll('input[type="text"], select')
    for (var i=0; i < inputs.length; i++) {
      inputs[i].addEventListener('change', function(){
        Model.updateCat(index);
      });
    }
  },

  addEventlistenersToRemovalButtons: function (button, index) {
    var vendor = View.getVendorHost();
    button.addEventListener('click', function(){
      Model.cats[vendor].splice(index, 1);
      Controller.refresh();
    })
  },

  activateCatRemoval: function () {
    var removal = View.catRemovalButtons();
    for (var i=0; i < removal.length; i++) {
      Controller.addEventlistenersToRemovalButtons(removal[i], i);
    };
  },

  activateEditableFields: function () {
    var allCats = View.indiCats();
    for (var i=0; i < allCats.length; i++) {
      Controller.addEventlistenersToEditableFields(allCats[i], i)
    }
  },

  highlightCurrentCatLinks: function () {
    var allLinks = View.allLinks();
    for (var i = 0; i < allLinks.length; i++) {
      if (Controller.currentCatUrlMatch(allLinks[i])) {
        allLinks[i].style.backgroundColor = "yellow";
        allLinks[i].style.color = "black";
      } else {
        allLinks[i].style.backgroundColor = "";
        allLinks[i].style.color = "";
      }
    };
  },

  currentCatUrlMatch: function (link) {
    var urls = Model.allCatUrls();
    for (var i=0; i < urls.length; i++) {
      if (urls[i] == link.href) {
        return true
      };
    }
    return false
  },

  refresh: function () {
    Model.updateLocalData();
    View.updateContainer();
    Controller.activateEditableFields();
    Controller.activateCatRemoval();
    Controller.highlightCurrentCatLinks();
  }
};

Controller.init();


