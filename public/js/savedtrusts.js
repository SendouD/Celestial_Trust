const del_btns = document.querySelectorAll('.delete-btn');
const det_btns = document.querySelectorAll('.details-btn');
const don_btns = document.querySelectorAll('.donate-btn');

let trustId;

det_btns.forEach( det_btn => {
    det_btn.addEventListener('click', async (event) => {
        trustId = event.target.parentNode.classList[1];
        window.location.href = '/trustInfo/'+trustId;
    })
});

don_btns.forEach( don_btn => {
    don_btn.addEventListener('click', async (event) => {
        trustId = event.target.parentNode.classList[1];
        window.location.href = '/trustInfo/'+trustId+'/donate';
    })
});

del_btns.forEach( del_btn => {
    del_btn.addEventListener('click', async (event) => {
        try {
            console.log("inside");
            trustId = event.target.parentNode.classList[0];
            console.log(trustId);
            const response = await fetch('/savedTrusts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ trustId })
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
    })
});