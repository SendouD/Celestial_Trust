
const temp1 = document.querySelector('.trust1');
const temp2 = document.querySelector('.trust2');
const temp3 = document.querySelector('.trust3');
const temp4 = document.querySelector('.trust4');
const btn = document.querySelector('.filter1');
const btn1 = document.querySelector('.search1');
const t_hyp = document.querySelectorAll('.t-hy');
const searchbar = document.querySelector('.filter-by-type');
const details_btn1 = document.querySelector('.btn1');
const details_btn2 = document.querySelector('.btn2');
const details_btn3 = document.querySelector('.btn3');
const details_btn4 = document.querySelector('.btn4');
const donate_btn1 = document.querySelector('.d_btn1');
const donate_btn2 = document.querySelector('.d_btn2');
const donate_btn3 = document.querySelector('.d_btn3');
const donate_btn4 = document.querySelector('.d_btn4');
const save_btn1 = document.querySelector('.s_btn1');
const save_btn2 = document.querySelector('.s_btn2');
const save_btn3 = document.querySelector('.s_btn3');
const save_btn4 = document.querySelector('.s_btn4');
const namesearchbar = document.querySelector('.search-by-name');

let trustId,trustId1;
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
});

save_btn1.addEventListener('click', () => {
    trustId1 = document.querySelector(".trust1_id").innerText;
    fetch_post(3);
});

save_btn2.addEventListener('click', () => {
    trustId1 = document.querySelector(".trust2_id").innerText;
    fetch_post(3);
});

save_btn3.addEventListener('click', () => {
    trustId1 = document.querySelector(".trust3_id").innerText;
    fetch_post(3);
});

save_btn4.addEventListener('click', () => {
    trustId1 = document.querySelector(".trust4_id").innerText;
    fetch_post(3);
});

async function fetch_post(flag){
    try {
        const response = await fetch('/trustInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type,num,name1,trustId1,flag })
        });
        console.log(response);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        if(flag !== 3) window.location.reload();

        console.log('Data posted successfully');
    } catch (error) {
        console.error('Error posting data:', error);
    }
}

details_btn1.addEventListener('click',async() => {
    trustId = document.querySelector(".trust1_id").innerText;
    window.location.href = `/trustInfo/${trustId}`;
});

details_btn2.addEventListener('click',async() => {
    trustId = document.querySelector(".trust2_id").innerText;
    window.location.href = `/trustInfo/${trustId}`;
});

details_btn3.addEventListener('click',async() => {
    trustId = document.querySelector(".trust3_id").innerText;
    window.location.href = `/trustInfo/${trustId}`;
});

details_btn4.addEventListener('click',async() => {
    trustId = document.querySelector(".trust4_id").innerText;
    window.location.href = `/trustInfo/${trustId}`;
});

donate_btn1.addEventListener('click',async() => {
    trustId = document.querySelector(".trust1_id").innerText;
    window.location.href = `/trustInfo/${trustId}/donate`;
});

donate_btn2.addEventListener('click',async() => {
    trustId = document.querySelector(".trust2_id").innerText;
    window.location.href = `/trustInfo/${trustId}/donate`;
});

donate_btn3.addEventListener('click',async() => {
    trustId = document.querySelector(".trust3_id").innerText;
    window.location.href = `/trustInfo/${trustId}/donate`;
});

donate_btn4.addEventListener('click',async() => {
    trustId = document.querySelector(".trust4_id").innerText;
    window.location.href = `/trustInfo/${trustId}/donate`;
});

