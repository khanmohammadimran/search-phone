const searchPhone = () => {
  const searchfield = document.getElementById('search-field');

  // Error Handling
  const error = document.getElementById('error')

  const searchText = searchfield.value;
  if (searchText == "") {
    error.innerText = 'Please Give a Number'
  }
  // Clear Data 
  searchfield.value = "";

  // Load Data 
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
  div.innerHTML = `
  <div class="row g-0">
    <div class="col-lg-8 col-sm-12 d-flex align-items-center">
        <img src="${phone.image}" class="rounded mx-auto d-block" alt="...">
    </div>
    <div class="col-lg-4 col-sm-12">
        <div class="mt-3 p-3">
            <h5 class="card-title">Brand: ${phone.brand}</h5>
            <hr>
            <h5 class="card-text">Name: ${phone.name}</h5>
            <hr>
            <h5 class="card-text">Display: ${phone.mainFeatures.storage}</h5>
            <hr>
            <h5 class="card-text">Display: ${phone.mainFeatures.displaySize}</h5>
            <hr>
            <h5 class="card-text">Chipset: ${phone.mainFeatures.chipSet}</h5>
            <hr>
            <h5 class="card-text">Memeory: ${phone.mainFeatures.memory}</h5>
            <hr>
            <h5 class="card-text">Sensors: ${phone.mainFeatures.sensors}</h5>
            <hr>
            <h3>Other Feature</h3>
            <h5 class="card-text">WLAN: ${phone.others.WLAN}</h5>
            <hr>
            <h5 class="card-text">Bluetooth: ${phone.others.Bluetooth}</h5>
            <hr>
            <h5 class="card-text">GPS: ${phone.others.GPS}</h5>
            <hr>
            <h5 class="card-text">NFC: ${phone.others.NFC}</h5>
            <hr>
            <h5 class="card-text">USB: ${phone.others.USB}</h5>
            <hr>
        </div>
    </div>
</div>
  `
  phoneDetails.appendChild(div)
}