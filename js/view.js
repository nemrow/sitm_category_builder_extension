var View = {
  disableAllClickables: function () {
    View.disableAllLinks();
    View.disableAllInputs();
  },

  enableAllClickables: function () {
    View.enableAllLinks();
    View.enableAllInputs();
  },

  disableAllLinks: function (e) {
    var allLinks = View.allLinks()
    for (var i = 0; i < allLinks.length; i++) {
      allLinks[i].onclick = function(e) {
        e.preventDefault();
      };
    };
  },

  disableAllInputs: function (e) {
    var allInputs = View.allInputs
    for (var i = 0; i < allInputs.length; i++) {
      allInputs[i].onclick = function(e) {
        e.preventDefault();
      };
    };
  },

  enableAllLinks: function (e) {
    var allLinks = View.allLinks();
    for (var i = 0; i < allLinks.length; i++) {
      allLinks[i].onclick = function(e) {
        return true;
      };
    };
  },

  enableAllInputs: function (e) {
    var allInputs = View.allInputs()
    for (var i = 0; i < allInputs.length; i++) {
      allInputs[i].onclick = function(e) {
        return true;
      };
    };
  },

  injectJSONToView: function () {
    View.jsonContentDiv().innerHTML = Model.generateCatJSON();
  },

  jsonContentDiv: function () {
    return document.getElementById('cat-builder-json-content-container');
  },

  jsonDiv: function () {
    return document.getElementById('cat-builder-json-viewer');
  },

  jsonButton: function () {
    return document.getElementById('submit-button');
  },

  jsonCloseButton: function () {
    return document.getElementById('hide-json');
  },

  showJSON: function () {
    View.jsonDiv().style.display = 'block';
  },

  hideJSON: function () {
    View.jsonDiv().style.display = 'none';
  },

  getVendorHost: function () {
    var url = document.URL;
    hostname = View.getUrlHostname(url);
    return hostname
  },

  getUrlHostname: function (url) {
    var urlElement = document.createElement('a');
    urlElement.href = url;
    return urlElement.hostname
  },

  allLinks: function () {
    return document.getElementsByTagName("a");
  },

  allInputs: function () {
    return document.getElementsByTagName("input");
  },

  bodyDiv: function () {
    return document.getElementsByTagName('body')[0]
  },

  outerCatContainer: function () {
    return document.getElementById('cat-builder-container')
  },

  container: function () {
    return document.getElementById('cat-builder-content-container')
  },

  indiCats: function () {
    return document.getElementsByClassName('indi-cat-container')
  },

  catClose: function () {
    return document.getElementsByClassName('cat-builder-close')[0]
  },

  catRemovalButtons: function () {
    return document.getElementsByClassName('remove-cat')
  },

  generateCurrentHtml: function () {
    var html = ""
    var vendor = View.getVendorHost();
    var vendorsCats = Model.cats[vendor];
    for (var i=0; i < vendorsCats.length; i++) {
      var context = vendorsCats[i]['id'] = i;
      html += Template.indiCat(vendorsCats[i])
    };
    return html
  },

  updateContainer: function () {
    var html = View.generateCurrentHtml();
    View.container().innerHTML = html
  },

  displayCatBuilder: function () {
    View.bodyDiv().innerHTML += Template.mainContainer();
    View.updateContainer();
  }
};
