function toggleEditMode(event, fieldId) {
  event.preventDefault();
  var detailInfo = document.getElementById(fieldId);
  var editButton = detailInfo.nextElementSibling.querySelector("a");
  console.log(editButton);

  if (detailInfo.contentEditable === "true") {
    var newValue = detailInfo.innerText;
    console.log("New value:", newValue);

    detailInfo.contentEditable = "false";
    editButton.innerText = "Edit";
  } else {
    detailInfo.contentEditable = "true";
    detailInfo.focus();
    editButton.innerText = "Save";
  }
}
function show() {
  document.querySelector(".hamburger").classList.toggle("open");
  document.querySelector(".navigation").classList.toggle("active");
}
