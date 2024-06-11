window.onload = () => {
    if (!sessionStorage.name) {
        location.href = '/index';
    }
}




//weryfikacja danych logowania

const name = document.querySelector('.name') || null;
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');


if(name == null){ //logowanie jest otwarte
submitBtn.addEventListener('click', () => {
    fetch('/login-User', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })  
    })
    .then(res => res.json())
    .then(data =>{
   validateData(data);
        
    })
})

} else{ //rejestracja jest otwarta

submitBtn.addEventListener('click', () => {
    fetch('/signup-User', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value
        })  
    })
    .then(res => res.json())
    .then(data =>{

validateData(data);
        }
    
    )
}) } 

const validateData = (data) => {
    if(!data.name){
        alertBox(data);

    }else{
        sessionStorage.name = data.name;
        sessionStorage.email = data.email;
location.href = '/'; //przekierowanie do strony głównej
    }
}

const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
alertMsg.innerHTML = data;

alertContainer.style.top = '5%';
setTimeout(() => {
    alertContainer.style.top = null;
}, 5000);
}