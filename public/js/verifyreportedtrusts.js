const permit_btns = document.querySelectorAll('.permit-btn');
const block_btns = document.querySelectorAll('.block-btn');

let flag = 0;

permit_btns.forEach((ele) => {
    ele.addEventListener('click',async(e) => {
        flag = 1;
        try {
            let trustid = e.target.parentNode.classList[1];
            console.log(trustid);
            const response = await fetch('/verifyReportedTrusts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ trustid,flag })
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
        flag = 0;
    })
});

block_btns.forEach((ele) => {
    ele.addEventListener('click',async(e) => {
        flag = 2;
        try {
            let trustid = e.target.parentNode.classList[1];
            console.log(trustid);
            const response = await fetch('/verifyReportedTrusts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ trustid,flag })
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
        flag = 0;
    })
});