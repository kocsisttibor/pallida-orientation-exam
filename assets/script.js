'use strict'

const ajax = (method, data, resource, callback) => {
  const url = 'http://localhost:8080'
  const xhr = new XMLHttpRequest();
  data = data ? data : null;
  xhr.open( method, url + resource );
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send( JSON.stringify(data) );
  xhr.onreadystatechange = () => {
    if ( xhr.readyState === XMLHttpRequest.DONE ) {
      callback( JSON.parse(xhr.response) );
    }
  };
};


function printer(x) {
  console.log(x)
}

function getPlates(input) {
  ajax('GET',false, '/search?q=' + input, printer);
}

const inputField = document.querySelector('input');
const queryButton = document.querySelector('button');

queryButton.addEventListener('click', () => getPlates(inputField.value));
