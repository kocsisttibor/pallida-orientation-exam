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

function render(input) {
  let container = document.querySelector('div.result');
  let previousContent = document.querySelector('div.result > table');
  if (previousContent !== null) {
    container.removeChild(previousContent);
  }
  let content = `<table>
                <thead>
                  <th>Licence plate</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Color</th>
                  <th>Year</th>
                </thead>
                <tbody>`
  input.data.forEach(row => {
    content += `<tr>
                <td>${row.plate}</td>
                <td class= brand>${row.car_brand}</td>
                <td>${row.car_model}</td>
                <td>${row.color}</td>
                <td>${row.year}</td>
              </tr>`
            });
            content += `</tbody></table>`;
            let table = document.createElement('table');
  table.innerHTML = content;
  container.appendChild(table);
  addClickWatchers();
}

function addClickWatchers() {
  let brands = document.querySelectorAll('td.brand');
  brands.forEach(brand => {
    brand.addEventListener('click',() => getBrandFilteredPlates(brand.innerHTML));
  });
}

function getPlates(input) {
  let police = document.querySelector('input.police').checked ? 1: 0;
  let diplomat = document.querySelector('input.diplomat').checked ? 1: 0;
  ajax('GET',false, '/search?q=' + input + '&police=' + police + '&diplomat=' + diplomat, render);
}

function getBrandFilteredPlates(brand) {
  ajax('GET', false, '/search/' + brand, render);
}

const inputField = document.querySelector('input');
const queryButton = document.querySelector('button.query');

queryButton.addEventListener('click', () => getPlates(inputField.value));
