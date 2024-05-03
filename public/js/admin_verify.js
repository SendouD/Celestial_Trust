const verify=document.querySelector('.verify');


verify.addEventListener('click', async(e)=>{
    e.preventDefault();
    const parent=verify.parentElement;
    const parent_of_parent=parent.parentElement;
    const trust_no=parent_of_parent.querySelector('.trust_id').textContent;
    console.log(trust_no);
    const payload={trust_unique_no:trust_no};
    console.log(payload);
    const response= await fetch("/admin/trust_verify",{
        method: "POST",
        body:JSON.stringify(payload) ,
        headers: {
          "Content-Type": "application/json",
        },
      })
        console.log(response);
      if(response.ok){
        alert("Verified the trust");
        
        window.location.href="/admin/trust_verify";
      
      }else{
        console.log("error");
      }

})