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

    document.getElementById('upvote').addEventListener('click', () => {
        fetch(`/kitten/upvote`, {
            method: "PATCH",
          })
          .then (res => {
              if (!res.ok) throw Error(res.statusText);
              return res.json();
          })
          .then (data => {
              console.log(data);
              let score = document.getElementsByClassName('score');
              score[0].innerHTML = data.score;
          })
          .catch (err => {
            alert(res.message);
          })
    });

    document.getElementById('downvote').addEventListener('click', () => {
        fetch(`/kitten/downvote`, {
            method: "PATCH",
          })
          .then (res => {
              if (!res.ok) throw Error(res.statusText);
              return res.json();
          })
          .then (data => {
              console.log(data);
              let score = document.getElementsByClassName('score');
              score[0].innerHTML = data.score;
          })
          .catch (err => {
             alert(res.message);
          })
    });

});
