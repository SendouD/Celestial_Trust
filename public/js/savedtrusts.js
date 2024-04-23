const del_btns = document.querySelectorAll('.delete-btn');

let trustId;



del_btns.forEach( del_btn => {
    del_btn.addEventListener('click', async (event) => {
        try {
            console.log("inside");
            trustId = event.target.parentNode.classList[0];
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