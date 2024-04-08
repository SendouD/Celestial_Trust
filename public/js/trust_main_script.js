const trust_btn=document.getElementById("sign-up-btn");
const trust_form=document.getElementById("sign-up-form");
const successMessage=document.getElementsByClassName("successregister")[0];
trust_btn.addEventListener('click',async(event)=>{
    event.preventDefault();
    const formData = new FormData(trust_form);
    const res = Object.fromEntries(formData);
    const payload = JSON.stringify(res);
    console.log(payload);
    try {
        console.log("start");
        const response = await fetch("/trust/data/signup", {
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json",
          },
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
      }
})