
const progressBar = document.querySelector('.progressBar');

const upload = () => {
    progressBar.setAttribute("id", "playAnimation")
}

window.onload = upload();

progressBar.addEventListener('animationend', () => {
        window.location.href = "http://www.cementgames.studio/pages/home.html";
});
