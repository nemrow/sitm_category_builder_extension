var Template = {
  mainContainer: function (context) {
    var source = document.getElementById('cat-builder-container-template').innerHTML;
    return Handlebars.compile(source)(context);
  },

  indiCat: function (context) {
    var source = document.getElementById('indi-cat-container-template').innerHTML;
    return Handlebars.compile(source)(context)
  }
}
