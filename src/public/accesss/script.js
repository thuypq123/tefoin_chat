const formSubmit = document.querySelector('.submitEl');
const inputVal = document.querySelector('.message-input');

formSubmit.addEventListener('submit', e => {
    if(inputVal.value){
        inputVal.value = '';
    }
})