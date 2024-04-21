
const temp1 = document.querySelector('.trust1');
const temp2 = document.querySelector('.trust2');
const temp3 = document.querySelector('.trust3');
const temp4 = document.querySelector('.trust4');
const btn = document.querySelector('.filter1');
const btn1 = document.querySelector('.search1');
const t_hyp = document.querySelectorAll('.t-hy');
const searchbar = document.querySelector('.filter-by-type');
const d_btn1 = document.querySelector('.btn1');
const d_btn2 = document.querySelector('.btn2');
const d_btn3 = document.querySelector('.btn3');
const d_btn4 = document.querySelector('.btn4');
const namesearchbar = document.querySelector('.search-by-name');

let trustId;
let type = 'All';
let num = '1';
let name1 = 'Child';
temp1.style.backgroundImage = 'url("../images/images/trusts/child education/child-1.jpg")';
temp2.style.backgroundImage = 'url("../images/images/trusts/child education/child-2.jpg")';
temp3.style.backgroundImage = 'url("../images/images/trusts/child education/child-3.webp")';
temp4.style.backgroundImage = 'url("../images/images/trusts/child education/child-4.jpg")';

btn.addEventListener('click', async () => {
    type = searchbar.value;
    searchbar.value = '';
    if(type==='') type='All';
    fetch_post(0);
});

btn1.addEventListener('click', async () => {
    name1 = namesearchbar.value;
    if(namesearchbar.value = '') console.alert('Name search cannot be empty!');
    else fetch_post(2);
});

t_hyp.forEach(t_hy => {
    t_hy.addEventListener('click', async(event) => {
        type = searchbar.value;
        searchbar.value = '';
        num = event.target.textContent;
        console.log(num);
        fetch_post(1);
    });
})

async function fetch_post(flag){
    try {
        const response = await fetch('/trustInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type,num,name1,flag })
        });
        console.log(response);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        window.location.reload();

        console.log('Data posted successfully');
    } catch (error) {
        console.error('Error posting data:', error);
    }
}

d_btn1.addEventListener('click',async() => {
    trustId = document.querySelector(".trust1_id").innerText;
    window.location.href = `/trustInfo/${trustId}`;
    console.log("inside");
});

d_btn2.addEventListener('click',async() => {
    trustId = document.querySelector(".trust2_id").innerText;
    window.location.href = `/trustInfo/${trustId}`;
});

d_btn3.addEventListener('click',async() => {
    trustId = document.querySelector(".trust3_id").innerText;
    window.location.href = `/trustInfo/${trustId}`;
});

d_btn4.addEventListener('click',async() => {
    trustId = document.querySelector(".trust4_id").innerText;
    window.location.href = `/trustInfo/${trustId}`;
});

