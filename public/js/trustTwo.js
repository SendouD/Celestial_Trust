let volunteer_btn = document.querySelector('.details-btn');
let donate_btn = document.querySelector('.donate-btn');

let flag = 0;

volunteer_btn.addEventListener('click', () => {
    let trustId = volunteer_btn.id;
    window.location.href = "/trustInfo/"+trustId+"/volunteer";
});

donate_btn.addEventListener('click', () => {
    let trustId = volunteer_btn.id;
    window.location.href = "/trustInfo/"+trustId+"/donate";
});