const verify=document.querySelector('.verify');


verify.addEventListener('click', async(e)=>{
    e.preventDefault();
    const parent=verify.parentElement;
    const trust_no=parent.querySelector('#trust_id').innerText;
    const payload={trust_unique_no:trust_no};
    console.log(payload);
    const response= await fetch("/admin/trust_verify",{
        method: "POST",
        body:payload ,
        headers: {
          "Content-Type": "application/json",
        },
      })
        console.log(response);
      if(response.ok){
        window.location.href="/admin/trust_verify";
      }

})