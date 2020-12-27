const loginContainer = document.querySelector(".login");
const loginForm = loginContainer.querySelector("form");
const headerContainer = document.querySelector("header");
const currentUser = 'currentUser';

function fade(){
    loginContainer.classList.remove("fadein");
    loginContainer.classList.add("hidden");
    document.querySelector("hr").classList.remove("hidden");
    document.querySelector("hr").classList.add("fadein");
    document.querySelector(".wrap").classList.remove("hidden");
    document.querySelector(".wrap").classList.add("fadein");
    document.querySelector("header").classList.remove("hidden");
    document.querySelector("header").classList.add("fadein");
}

function setUser(event){
    event.preventDefault();
    const username = loginForm.querySelector("input").value;
    localStorage.setItem(currentUser, username);
    fade();
    printUser();
}

function printUser(){
    const CURRENT_USER = localStorage.getItem(currentUser);
    if(CURRENT_USER){
        headerContainer.querySelector(".username").innerHTML = `${CURRENT_USER}`;
    } else{
        headerContainer.querySelector(".username").innerHTML = `guest`;
    }
}

function init(){
    if(localStorage.getItem(currentUser) === null){
        loginForm.addEventListener('submit', setUser);
    } else {
        fade();
        printUser();
    }
}

init();

