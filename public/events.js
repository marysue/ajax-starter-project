window.addEventListener("DOMContentLoaded", () => {

    fetch("/kitten/image")
        .then(res =>  { return res.json()})
        .then( (data) => console.log(data))

});
