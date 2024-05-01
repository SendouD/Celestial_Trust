const btn=document.querySelector(".btn");
const form=document.getElementById("form");
const loader = document.querySelector(".loader");
const container = document.querySelector(".total");


btn.addEventListener('click',async(event)=>{
    event.preventDefault();
    loader.style.display='block';
    container.style.display='none';
    const formData = new FormData(form);
    
    try {
        console.log("start");
        const response = await fetch("/trust/trustinfo", {
          method: "POST",
          body: formData,
          
        });
        console.log("end");
        console.log(response.ok);
  
        if (response.ok) {
          loader.style.display='none';
          container.style.display='block';
  
          window.location.href = "/"; // Reset the form fields
        } else {
          if(confirm("Error occured  try again")){
            window.location.href = "/trust/trustinfo";
          }
          
        }
      } catch (error) {
        console.error("Error:", error);
      }finally{
        loader.style.display='none';
        container.style.display='block';
      }
})