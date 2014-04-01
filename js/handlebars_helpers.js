Handlebars.registerHelper('clothingTypeSelections', function(currentValue) {
  console.log(currentValue);
  var clothingTypes = Data.clothingTypes;
  var html = '<select class="cat-clothingType">'
  for (i=0; i < clothingTypes.length; i++) {
    html += '<option value="' + clothingTypes[i] + '"'
    if (clothingTypes[i] == currentValue) {
      html += ' selected'
    }
    html += '>' + clothingTypes[i] + '</option>'
  }
  html += "</select>"
 return new Handlebars.SafeString(
    html
  );
});

Handlebars.registerHelper('departmentSelections', function(currentValue) {
  var departments = Data.departments;
  var html = '<select class="cat-dept">'
  for (i=0; i < departments.length; i++) {
    html += '<option value="' + departments[i] + '"'
    if (departments[i] == currentValue) {
      html += ' selected'
    }
    html += '>' + departments[i] + '</option>'
  }
  html += "</select>"
 return new Handlebars.SafeString(
    html
  );
});
