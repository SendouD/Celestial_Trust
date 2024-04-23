
const donate_btn=document.getElementById('donate-btn');
const email = document.getElementById('inputEmail3');
donate_btn.addEventListener('click',async(e)=>{
    const email = document.getElementById('inputEmail3');
    console.log(email.value);
    
})









function toggleDropdown(dropdownId) {
  var dropdown = document.getElementById(`${dropdownId}`);
  var dropdowns = document.querySelectorAll('.dropdown__content');

 
  dropdowns.forEach(function(item) {
      if (item.id !== dropdownId && item.style.display !== "none") {
          item.style.display = "none";
      }
  });
  if (dropdown.style.display === "none" || dropdown.style.display === "") {
      dropdown.style.display = "block";
  } else {
      dropdown.style.display = "none";
  }
}


function toggleDropdowngoddies(dropdownId) {
    var dropdown = document.getElementById(dropdownId);
    var dropdowns = document.querySelectorAll('.dropdown__content_items');
    var payment = document.getElementById("money");
    var goodies = document.getElementById("goodies");

    dropdowns.forEach(function(item) {
        if (item.id !== dropdownId && item.style.display !== "none") {
            item.style.display = "none";
        }
    });

    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }

    if (dropdownId === "goodies") {
        payment.style.display = "none";
        var inputs = payment.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
    }

    if (dropdownId === "money") {
        goodies.style.display = "none";
        var inputs = goodies.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
        payment.style.display = "block";
    }
}
