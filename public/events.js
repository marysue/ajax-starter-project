let commentNumber = 0;

function getKittenImage() {
    let loader = document.querySelector('div');
    loader.innerHTML = 'loading...';
    fetch("/kitten/image")
        .then(res => {
            if (!res.ok) {
                throw res;
            } return res.json()
        })
        .then((data) => {
            let imgElt = document.querySelector('img');
            imgElt.setAttribute("src", data.src);
            loader.innerHTML = ' ';
        })
        .catch(error => {
            error.json().then((res) => alert(res.message));
        });
}
window.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    getKittenImage();

    // const wrapper = document.getElementById('comments');
    // wrapper.addEventListener('click', (event) => {
    //     console.log("event.target.nodeName = ", event.target.nodeName);
    //    const isButton = event.target.nodeName === 'BUTTON';
    //    if (!isButton || !<check button is in our comment area >) {
    //      return;
    //    }

    // });

    // set an event listener to the button
    // get the event.target.parentid
    // await deleteComment(event.target.parentid)
    // resetCommentIds(event.target.parentid)

    document.getElementById('new-pic').addEventListener('click', () => {
        clearComments();
        getKittenImage();
        let score = document.getElementsByClassName('score');
        score[0].innerHTML = 0;
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
        newComment.setAttribute('id', commentNumber);
        let newButton = document.createElement('button');
        newButton.innerHTML = 'Delete';
        commentNumber++;
        newComment.appendChild(newButton);
        let commentsDiv = document.getElementById('comments');
        commentsDiv.appendChild(newComment);
        comment.value = '';
    })
});

function clearComments() {
    let divClassComments = document.getElementById('comments');
    console.log("divClassComment: ", divClassComments);
    for(let i = 0; i < commentNumber; i++) {
        console.log("     Clearing comment #", i);
        // remove the comment div
        let commentDiv = document.getElementById(`${i}`);
        console.log("     commentDiv = ", commentDiv);
        divClassComments.removeChild(commentDiv);
        // call 'delete on the comment number'
        fetch(`/kitten/comments/:${i}`,
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


async function deleteComment(id) {
    fetch(`/kitten/comments/:${id}`,
            {method: "DELETE"})
            .then((res) => {
                if (!res.ok) throw res.status;
            })
            .catch(err => {
                alert(err);
            })
}

function resetCommentIds(delId) {
    for (let i = delId +1 ; i < commentNumber; i++)
    {
        let thisComment = document.getElementById(`${i}`);
        thisComment.setAttribute("id", `${i - 1}`);
    }
}
