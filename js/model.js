var Model = {
  loadLocalData: function (callback) {
    chrome.storage.local.get(null, function (response) {
      if (response.cats == undefined) {
        Model.cats = {};
      } else {
        Model.cats = response.cats;
      }
      Model.addVendorIfUndefined(Model.vendor());
      callback()
    });
  },

  previousDept: "womens",

  previousClothingType: "dress",

  vendor: function () {
    return View.getVendorHost();
  },

  allCatUrls: function () {
    var cats = Model.cats[Model.vendor()]
    var urlArray = [];
    for (i=0; i < cats.length; i++) {
      urlArray.push(cats[i].url)
    }
    return urlArray
  },

  generateCatJSON: function () {
    return JSON.stringify(Model.cats[Model.vendor()]).replace(/'/g, "\\'");
  },

  addUrlToCurrentVendor: function (node) {
    var data = Model.generateCatData(node)
    var vendor = View.getVendorHost();
    Model.cats[vendor].unshift(data);
    Controller.refresh();
  },

  generateCatData: function (node) {
    return {
      url: node.href,
      clothingType: Model.previousClothingType,
      dept: Model.previousDept,
      name: node.textContent
    }
  },

  updateCatData: function (index) {
    var node = document.getElementsByClassName('indi-cat-container-id-' + index)[0]
    data = {
      url: node.getElementsByClassName('cat-url')[0].value,
      clothingType: node.getElementsByClassName('cat-clothingType')[0].value,
      dept: node.getElementsByClassName('cat-dept')[0].value,
      name: node.getElementsByClassName('cat-name')[0].value
    };
    return data
  },

  updatePreviousData: function (data) {
    Model.previousDept = data['dept'];
    Model.previousClothingType = data['clothingType'];
  },

  addVendorIfUndefined: function (vendor) {
    if (Model.cats[vendor] == undefined) {
      Model.cats[vendor] = [];
    };
  },

  updateLocalData: function () {
    chrome.storage.local.set({'cats': Model.cats});
    console.log(Model.cats)
  },

  updateCat: function (index) {
    var vendor = View.getVendorHost();
    var newData = Model.updateCatData(index);
    Model.cats[vendor][index] = newData;
    Model.updatePreviousData(newData);
    Model.updateLocalData();
  }
};
