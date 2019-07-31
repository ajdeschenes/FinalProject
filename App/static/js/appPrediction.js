// from data.js
var tableData = [];

// var ratings_entered = d3.select("#ratings_entered");
// var adults_entered = d3.select("#adults_entered1").value();
// var years_entered = d3.select("#years_entered1").value();
// var film_length_entered = d3.select("#film_length_entered1").value();
// var genre1_entered = d3.select("#genre1_entered1").value();
// var genre2_entered = d3.select("#genre2_entered1").value();
// var genre3_entered = d3.select("#genre3_entered1").value();
console.log(years_entered1);
console.log(typeof years_entered1)
// var attempt = Object.keys(years_entered1).map(function(key) {
//     return [Number(key), obj[key]];
//   });
// console.log(attempt);
console.log(Object.entries(years_entered1));

// var years_entered2 = d3.select("#years_entered1").property("value");
// var years_entered2 = d3.select("years_entered1").node().value;
// var years_entered2 = d3.select("years_entered1").property("value").text();
// console.log(years_entered2);

function buildTable(DATA) {
//   if (rating === "") {
//     d3.json("/moviedata", function (dataPlease) {
//       console.log(dataPlease);
//       var AllData = dataPlease;
//       console.log(AllData);
//       // display all values
//       for (var i = 0; i < AllData.length; i++) {
//         tableData.push(AllData[i]);
//       }
//       // get table references
//       var tbody2 = d3.select("#data-table");
//       // First, clear out any existing data
//       tbody2.html("");
//       //console.log(DATA);


//       // Next, loop through each object in the data
//       // and append a row and cells for each value in the row
//       DATA.forEach((dataRow) => {
//         // Append a row to the table body
//         var row = tbody2.append("tr");

//         // Loop through each field in the dataRow and add
//         // each value as a table cell (td)
//         Object.entries(dataRow).forEach(([key, value]) => {
//           var cell = row.append("td");
//           cell.text(value);
//         });
//       });
//     });
//   } else{
    d3.json("/moviedata", function (dataPlease) {
      FilteredDATA = dataPlease.filter(function (datum) {
        // var rounded_rating = Math.round(rating * 10) / 10
        // return datum.selection == rounded_rating
        return datum.selection == years_entered2
      });
      console.log(FilteredDATA);
      for (var i = 0; i < FilteredDATA.length; i++) {
        tableData.push(FilteredDATA[i]);
      }
      // get table references
      var tbody2 = d3.select("#data-table");
      // First, clear out any existing data
      tbody2.html("");
      //console.log(DATA);


      // Next, loop through each object in the data
      // and append a row and cells for each value in the row
      DATA.forEach((dataRow) => {
        // Append a row to the table body
        var row = tbody2.append("tr");

        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.entries(dataRow).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
      });
    });
//   }

  //console.log(tableData);

  // filterTable2();
}




// // Keep Track of all filters
// var filters = {};

// function updateFilters() {

//   // Save the element, value, and id of the filter that was changed
//   var changedElement = d3.select(this).select("input");
//   var elementValue = changedElement.property("value");
//   var filterId = changedElement.attr("id");

//   // If a filter value was entered then add that filterId and value
//   // to the filters list. Otherwise, clear that filter from the filters object
//   if (elementValue) {
//     filters[filterId] = elementValue;
//   }
//   else {
//     delete filters[filterId];
//   }
//   // console.log(filters);
//   // Call function to apply all filters and rebuild the table
//   filterTable();

// }

// function filterTable() {

//   // Set the filteredData to the tableData
//   let filteredData = tableData;

//   // Loop through all of the filters and keep any data that
//   // matches the filter values
//   Object.entries(filters).forEach(([key, value]) => {
//     filteredData = filteredData.filter(row => row[key] === value);
//   });

//   // Finally, rebuild the table using the filtered Data
//   buildTable(filteredData);
// }

// var tbody2 = d3.select("#filter-table");
// var ratings_filtered = d3.select("#ratings");
// var adults_filtered = d3.select("#adults");
// var years_filtered = d3.select("#years");
// var film_length_filtered = d3.select("#film_length");
// var genre1_filtered = d3.select("#genre_1");
// var genre2_filtered = d3.select("#genre_2");
// var genre3_filtered = d3.select("#genre_3");

// var ratings_entered = d3.select("#ratings_entered");
// var adults_entered = d3.select("#adults_entered");
// var years_entered = d3.select("#years_entered");
// var film_length_entered = d3.select("#film_length_entered");
// var genre1_entered = d3.select("#genre1_entered");
// var genre2_entered = d3.select("#genre2_entered");
// var genre3_entered = d3.select("#genre3_entered");


// function filterTable2() {

//   // if (ratings_filtered.property("value") === "") {
//   //   ratings_entered.text(" ");
//   //   console.log("No Date");
//   // }
//   // else {
//   //   ratings_entered.text(ratings_filtered.property("value"));
//   //   console.log(ratings_filtered.property("value"));
//   // }

//   if (adults_filtered.property("value") === "") {
//     adults_entered.text(" ")
//     console.log("No Adult Filter Entered");
//   }
//   else {
//     adults_entered.text(adults_filtered.property("value"));
//     console.log(adults_filtered.property("value"));
//   }

//   if (years_filtered.property("value") === "") {
//     years_entered.text(" ")
//     console.log("No Years Filter Entered");
//   }
//   else {
//     years_entered.text(years_filtered.property("value"));
//     console.log(years_filtered.property("value"));
//   }

//   if (film_length_filtered.property("value") === "") {
//     film_length_entered.text(" ")
//     console.log("No Film Length Filter Entered");
//   }
//   else {
//     film_length_entered.text(film_length_filtered.property("value"));
//     console.log(film_length_filtered.property("value"));
//   }

//   if (genre1_filtered.property("value") === "") {
//     genre1_entered.text(" ")
//     console.log("No Primary Genre Entered");
//   }
//   else {
//     genre1_entered.text(genre1_filtered.property("value"));
//     console.log(genre1_filtered.property("value"));
//   }

//   if (genre2_filtered.property("value") === "") {
//     genre2_entered.text(" ")
//     console.log("No Secondary Genre Entered");
//   }
//   else {
//     genre2_entered.text(genre2_filtered.property("value"));
//     console.log(genre2_filtered.property("value"));
//   }

//   if (genre3_filtered.property("value") === "") {
//     genre3_entered.text(" ")
//     console.log("No Tertiary Genre Entered");
//   }
//   else {
//     genre3_entered.text(genre3_filtered.property("value"));
//     console.log(genre3_filtered.property("value"));
//   }


// }

// // Attach an event to listen for changes to each filter
// d3.selectAll(".button").on("click", updateFilters);

// Build the table when the page loads
buildTable(tableData);
