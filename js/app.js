const searchPhone = () => {
  const searchfield = document.getElementById('search-field');

  // Error Handling
  const error = document.getElementById('error')

  const searchText = searchfield.value;
  if (searchText == "") {
    error.innerText = 'Please Give a Number'
  }
  // console.log(searchText);
  searchfield.value = "";
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data))

}

// Search Result
const displaySearchResult = phone => {
  const searchResult = document.getElementById('search-result');
  const showTwentyResult = phone.slice(0, 20);
  console.log(showTwentyResult)
  for (const phones of showTwentyResult) {
    // console.log(showTwentyResult.image)
    const div = document.createElement('div')
    div.classList.add("col-lg-4")
    div.classList.add("col-sm-12")
    div.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="${phones.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phones.brand}</h5>
          <p class="card-text">${phones.phone_name}</p>
          <button class="btn btn-primary" onclick="loadPhoneDetails('${phones.slug}')">Show Detail</button>
        </div >
      </div >
  `
    searchResult.appendChild(div)
  }
}

// Show Phone Details 
const loadPhoneDetails = detail => {
  const url = `https://openapi.programming-hero.com/api/phone/${detail}`
  console.log(url)
  fetch(url)
    .then(res => res.json())
    .then(data => displaySinglePhoneDetail(data.data))
}
const displaySinglePhoneDetail = phone => {
  // console.log(phone);
  const phoneDetails = document.getElementById('single-phone-detail');
  const div = document.createElement('div')
  div.classList.add('card')
  div.classList.add("col-lg-4")
  div.classList.add("col-sm-12")
  div.innerHTML = `
  <img src="..." class="img-fluid rounded-start" alt="...">
  <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
  `
  phoneDetails.appendChild(div)
}