let commentNumber = 0;

window.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
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
        // clearComments();
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
    // <div id="next-id">test<button>delete</button></div>

    let submitButton = document.getElementById('sub-button');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        let comment = document.getElementById('user-comment');
        let newComment = document.createElement('div');
        newComment.innerHTML = comment.value;
        newComment.setAttribute('class', commentNumber);
        let newButton = document.createElement('button');
        newButton.innerHTML = 'Delete';
        commentNumber++;
        newComment.appendChild(newButton);
        let commentsDiv = document.getElementsByClassName('comments');
        commentsDiv[0].appendChild(newComment);
        comment.value = '';
    })
});

function clearComments() {
    let divClassComments = document.getElementsByClassName('comments');
    for(let i = 0; i <= commentNumber; i++) {
        // remove the comment div
        let commentDiv = document.getElementsByClassName(`${i}`);
        divClassComments[0].removeChild(commentDiv);
        // call 'delete on the comment number'
        fetch(`/kitten/comments/${i}`,
            {method: "DELETE"})
            .then((res) => {
                if (!res.ok) throw res.status;
            })
            .catch(err => {
                alert(err);
            })

    }
    // set comment number = 0
    commentNumber = 0;
}
