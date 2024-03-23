function createTableRow(index, name, location, benefits) {
  var row = document.createElement("tr");

  var indexCell = document.createElement("td");
  indexCell.textContent = index;
  row.appendChild(indexCell);

  var nameCell = document.createElement("td");
  var nameLink = document.createElement("a");
  nameLink.href = "";
  nameLink.textContent = name;
  nameCell.appendChild(nameLink);
  row.appendChild(nameCell);

  var locationCell = document.createElement("td");
  locationCell.textContent = location;
  row.appendChild(locationCell);

  var benefitsCell = document.createElement("td");
  benefitsCell.textContent = benefits;
  row.appendChild(benefitsCell);

  return row;
}

function generateRows() {
  var tableBody = document.getElementById("tableBody");
  for (var i = 1; i <= 20; i++) {
    var row = createTableRow(i, "Name " + i, "Location " + i, "Benefits " + i);
    tableBody.appendChild(row);
  }
}

document.addEventListener("DOMContentLoaded", generateRows);
