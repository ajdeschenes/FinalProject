// from data.js
var tableData = [];

function buildTable(DATA) {
  d3.json("/moviedata", function (dataPlease) {
    console.log(dataPlease);
    var AllData = dataPlease;
    console.log(AllData);
    // display all values
    for (var i = 0; i < AllData.length; i++) {
      tableData.push(AllData[i]);
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
  
}

// Build the table when the page loads
buildTable(tableData);
