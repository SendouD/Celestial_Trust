const donate_btn = document.getElementById("donate_btn");
const volunteer_btn = document.getElementById("volunteer_btn");
const style = document.getElementsByTagName("style")[0];
const print_btn = document.querySelectorAll(".print_btn1");
console.log(print_btn);

let newstyle;
if (!style) {
    newstyle = document.createElement("style");
} else {
    style.remove();
    newstyle = document.createElement("style");


}

donate_btn.addEventListener("click", () => {
    const css = `@media print {
        body *{
           display:none;
        }
        
        .donate_table *{
           display:table;
       }
       
       .donate_table tr {
        display: table-row;
    }
    .donate_table th,
  .donate_table td {
    display: table-cell;
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }
    
.display_table {
    width: 100%;
    height: auto;

}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
}

td a {
    text-decoration: none;
    color: #000;
}

td a:hover {
    text-decoration: underline;
}



th {
    background-color: #f2f2f2;
}

th {
    text-align: center;
}

td {
    padding-left: 0.5rem;
    font-size: 1.1rem;
    font-family: "Roboto Mono", monospace;
}

.t_header {
    font-family: "Poppins", serif;
    font-weight: 300 !important;
    font-style: normal;
    font-size: 1rem;


}
     }`
    newstyle.textContent = css;
    document.head.appendChild(newstyle);
    print();

})


volunteer_btn.addEventListener("click", () => {
    const css = `@media print {
        body *{
           display:none;
        }
        
        .volunteer_table *{
           display:table;
       }
       
       .volunteer_table tr {
        display: table-row;
    }
    .volunteer_table th,
  .volunteer_table td {
    display: table-cell;
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }
    
.display_table {
    width: 100%;
    height: auto;

}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
}

td a {
    text-decoration: none;
    color: #000;
}

td a:hover {
    text-decoration: underline;
}



th {
    background-color: #f2f2f2;
}

th {
    text-align: center;
}

td {
    padding-left: 0.5rem;
    font-size: 1.1rem;
    font-family: "Roboto Mono", monospace;
}

.t_header {
    font-family: "Poppins", serif;
    font-weight: 300 !important;
    font-style: normal;
    font-size: 1rem;


}
     }`
    newstyle.textContent = css;
    document.head.appendChild(newstyle);
    print();
});


print_btn.forEach((p_btn)=>{
    p_btn.addEventListener("click", async() => {
        console.log("fetch hit");
        
        const parent=p_btn.parentElement
        const parent_of_parent=parent.parentElement;
        const volunteer_name=parent_of_parent.querySelector(".user_name").textContent;
        const json_file={
            user_name:volunteer_name
        }
    
        const response=await fetch("/contribution/trust",{
            
            method: "POST",
            body:JSON.stringify(json_file) ,
            headers: {
              "Content-Type": "application/json",
            },
          })
            console.log(response);
          if(response.ok){
            alert("Issued the certificate");
            
            window.location.href="/contribution/trust";
          
          }else{
            console.log("error");
          }
        
        
            
        })
        
})