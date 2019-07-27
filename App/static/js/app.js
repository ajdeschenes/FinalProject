// from data.js
var tableData = d3.json("/internRoute", function(data) {
  console.log(data);
});

// get table references
var tbody = d3.select("#data-table");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    var row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      var cell = row.append("td");
      cell.text(val);
    });
  });

  filterTable2();
}

// Keep Track of all filters
var filters = {};

function updateFilters() {

  // Save the element, value, and id of the filter that was changed
  var changedElement = d3.select(this).select("input");
  var elementValue = changedElement.property("value");
  var filterId = changedElement.attr("id");

  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
  if (elementValue) {
    filters[filterId] = elementValue;
  }
  else {
    delete filters[filterId];
  }
  // console.log(filters);
  // Call function to apply all filters and rebuild the table
  filterTable();

}

function filterTable() {

  // Set the filteredData to the tableData
  let filteredData = tableData;

  // Loop through all of the filters and keep any data that
  // matches the filter values
  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });

  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}

// var tbody2 = d3.select("#filter-table");
var date_filtered = d3.select("#datetime");
var city_filtered = d3.select("#city");
var state_filtered = d3.select("#state");
var country_filtered = d3.select("#country");
var shape_filtered = d3.select("#shape");
var ph6_filtered = d3.select("#six");
var ph7_filtered = d3.select("#seven");

var date_entered = d3.select("#date_entered");
var city_entered = d3.select("#city_entered");
var state_entered = d3.select("#state_entered");
var country_entered = d3.select("#country_entered");
var shape_entered = d3.select("#shape_entered");
var ph6_entered = d3.select("#place_holder6");
var ph7_entered = d3.select("#place_holder7");


function filterTable2() {

  if (date_filtered.property("value") === "") {
    date_entered.text(" ");
    console.log("No Date");
  }
  else {
    date_entered.text(date_filtered.property("value"));
    console.log(date_filtered.property("value"));
  }
  
  if (city_filtered.property("value") === "") {
    city_entered.text(" ")
    console.log("No City");
  }
  else {
    city_entered.text(city_filtered.property("value"));
    console.log(city_filtered.property("value"));
  }
  
  if (state_filtered.property("value") === "") {
    state_entered.text(" ")
    console.log("No State");
  }
  else {
    state_entered.text(state_filtered.property("value"));
    console.log(state_filtered.property("value"));
  }
  
  if (country_filtered.property("value") === "") {
    country_entered.text(" ")
    console.log("No Country");
  }
  else {
    country_entered.text(country_filtered.property("value"));
    console.log(country_filtered.property("value"));
  }

  if (shape_filtered.property("value") === "") {
    shape_entered.text(" ")
    console.log("No Shape");
  }
  else {
    shape_entered.text(shape_filtered.property("value"));
    console.log(shape_filtered.property("value"));
  }

  // if (ph6_filtered.property("value") === "") {
  //   place_holder6.text(" ")
  //   console.log("No Place Holder 6");
  // }
  // else {
  //   place_holder6.text(ph6_filtered.property("value"));
  //   console.log(ph6_filtered.property("value"));
  // }

  // if (ph7_filtered.property("value") === "") {
  //   place_holder7.text(" ")
  //   console.log("No Place Holder 7");
  // }
  // else {
  //   place_holder7.text(ph7_filtered.property("value"));
  //   console.log(ph7_filtered.property("value"));
  // }

  
}

// Attach an event to listen for changes to each filter
d3.selectAll(".filter").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);
