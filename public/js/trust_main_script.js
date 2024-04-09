const trust_btn=document.getElementById("sign-up-btn");
const trust_form=document.getElementById("sign-up-form");
const successMessage=document.getElementsByClassName("successregister")[0];
const loader = document.querySelector(".loader");
const container = document.querySelector(".container");
console.log(loader);

trust_btn.addEventListener('click',async(event)=>{
    event.preventDefault();
    loader.style.display='block';
    container.style.display='none';
    const formData = new FormData(trust_form);
    
    try {
        console.log("start");
        const response = await fetch("/trust/data/signup", {
          method: "POST",
          body: formData,
          
        });
        console.log("end");
        console.log(response.ok);
  
        if (response.ok) {
          successMessage.style.display = "block"; 
          trust_form.reset();
          window.location.href = "/"; 
        } else {
          console.error("Registration failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }finally{
        loader.style.display='none';
        container.style.display='block';
      }
})