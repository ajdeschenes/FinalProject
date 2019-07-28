// from data.js
var tableData = d3.json("/moviedata", function(data) {
  console.log(data);
});

// get table references
var tbody = d3.select("#data-table");

function buildTable() {
  let jsonData = tableData;
 // First, clear out any existing data
tbody.html("");
console.log(jsonData.Object.values);

 
 // Next, loop through each object in the data
 // and append a row and cells for each value in the row
//  actual_data.length forEach((dataRow) => {
//    // Append a row to the table body
//    var row = tbody.append("tr");

//    // Loop through each field in the dataRow and add
//    // each value as a table cell (td)
//    Object.values(dataRow).forEach((key) => {
//      var cell = row.append("td");
//      cell.text(key);
//    });
//  });

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
var ratings_filtered = d3.select("#ratings");
var adults_filtered = d3.select("#adults");
var years_filtered = d3.select("#years");
var film_length_filtered = d3.select("#film_length");
var genre1_filtered = d3.select("#genre_1");
var genre2_filtered = d3.select("#genre_2");
var genre3_filtered = d3.select("#genre_3");

var ratings_entered = d3.select("#ratings_entered");
var adults_entered = d3.select("#adults_entered");
var years_entered = d3.select("#years_entered");
var film_length_entered = d3.select("#film_length_entered");
var genre1_entered = d3.select("#genre1_entered");
var genre2_entered = d3.select("#genre2_entered");
var genre3_entered = d3.select("#genre3_entered");


function filterTable2() {

  // if (ratings_filtered.property("value") === "") {
  //   ratings_entered.text(" ");
  //   console.log("No Date");
  // }
  // else {
  //   ratings_entered.text(ratings_filtered.property("value"));
  //   console.log(ratings_filtered.property("value"));
  // }
  
  if (adults_filtered.property("value") === "") {
    adults_entered.text(" ")
    console.log("No City");
  }
  else {
    adults_entered.text(adults_filtered.property("value"));
    console.log(adults_filtered.property("value"));
  }
  
  if (years_filtered.property("value") === "") {
    years_entered.text(" ")
    console.log("No State");
  }
  else {
    years_entered.text(years_filtered.property("value"));
    console.log(years_filtered.property("value"));
  }
  
  if (film_length_filtered.property("value") === "") {
    film_length_entered.text(" ")
    console.log("No Country");
  }
  else {
    film_length_entered.text(film_length_filtered.property("value"));
    console.log(film_length_filtered.property("value"));
  }

  if (genre1_filtered.property("value") === "") {
    genre1_entered.text(" ")
    console.log("No Shape");
  }
  else {
    genre1_entered.text(genre1_filtered.property("value"));
    console.log(genre1_filtered.property("value"));
  }

  if (genre2_filtered.property("value") === "") {
    genre2_entered.text(" ")
    console.log("No Place Holder 6");
  }
  else {
    genre2_entered.text(genre2_filtered.property("value"));
    console.log(genre2_filtered.property("value"));
  }

  if (genre3_filtered.property("value") === "") {
    genre3_entered.text(" ")
    console.log("No Place Holder 7");
  }
  else {
    genre3_entered.text(genre3_filtered.property("value"));
    console.log(genre3_filtered.property("value"));
  }

  
}

// Attach an event to listen for changes to each filter
d3.selectAll(".filter").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);
