window.addEventListener("DOMContentLoaded", () => {

    fetch("/kitten/image")
        .then(res => {
            if (!res.ok) {
                throw res;
            } return res.json()
        })
        .then((data) => {
            let imgElt = document.querySelector('img');
            imgElt.setAttribute("src", data.src);
        })
        .catch(error => {
            error.json().then((res) => alert(res.message));
        });

    document.getElementById('new-pic').addEventListener('click', () => {
        let loader = document.querySelector('div');
        loader.innerHTML = 'loading...';

        fetch("/kitten/image")
            .then(res => {
                if (!res.ok) {
                    throw res;
                } return res.json()
            })
            .then((data) => {
                loader.innerHTML = '';
                let imgElt = document.querySelector('img');
                imgElt.setAttribute("src", data.src);
            })
            .catch(error => {
                error.json().then((res) => alert(res.message));
            });
    });


});
