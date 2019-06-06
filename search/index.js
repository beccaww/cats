'use strict';

function getCatPic() {
  fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed-id}`)
  .then(response => response.json())
  .then(responseJson => displayResults(responseJson)); 
  
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('.js-results').empty(); 
  $('.js-results').append(`<img src="${responseJson.message}">`); 
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault(); 
    getDogPic(); 
  })
}

$(watchForm);