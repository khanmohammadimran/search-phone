const searchPhone = () => {
  const searchfield = document.getElementById('search-field');

  // Error Handling
  const error = document.getElementById('error')
  const searchText = searchfield.value;
  if (searchText == "" || searchText >= 0 || searchText <= 0) {
    error.innerText = 'Please Write a Phone Name'
  }
  else {
    // Load Data 
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
      .then(res => res.json())
      .then(data => displaySearchResult(data.data))
  }
  // Clear Data 
  searchfield.value = "";
}

// Search Result
const displaySearchResult = phone => {
  const searchResult = document.getElementById('search-result');
  const randomWord = document.getElementById('random-word-error')
  const showTwentyResult = phone.slice(0, 20);
  if (showTwentyResult.length === 0) {
    randomWord.innerText = 'Please Write a Phone Name'
    return randomWord;
  }
  else {
    searchResult.innerHTML = ''
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
          <button class="btn btn-dark" onclick="loadPhoneDetails('${phones.slug}')">Show Detail</button>
        </div >
      </div >
  `
      searchResult.appendChild(div)
      error.innerText = ''
      randomWord.innerText = ''
    }
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
  const phoneDetails = document.getElementById('single-phone-detail');
  phoneDetails.textContent = '';
  const div = document.createElement('div')
  div.classList.add('card')
  div.innerHTML = `
  <div class="row g-0">
    <div class="col-lg-8 col-sm-12 d-flex align-items-center">
        <img src="${phone.image}" class="rounded mx-auto d-block" alt="...">
    </div>
    <div class="col-lg-4 col-sm-12">
        <div class="mt-3 p-3">
            <h2 class="text-center pb-3">Main Feature</h2>
            <h5 class="card-text"> Brand: ${phone.brand ? phone.brand : 'Brand Name Not Found'}</h5>
            <hr>
            <h5 class="card-text"> Name: ${phone.name ? phone.name : 'Phone Name Not Found'}</h5>
            <hr>
            <h5 class="card-text">Release Date: ${phone.releaseDate ? phone.releaseDate : 'Release Date data not found'}</h5>
            <hr>
            <h5 class="card-text"> Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'Storage Name Not Found'}</h5>
            <hr>
            <h5 class="card-text"> Display: ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'Display Name Not Found'}</h5>
            <hr>
            <h5 class="card-text"> Chipset: ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'Chipset Name Not Found'}</h5>
            <hr>
            <h5 class="card-text"> Memory: ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'Memory Name Not Found'}</h5>
            <hr>
            <h5 class="card-text"> Sensors: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors : 'Sensors Name Not Found'}</h5>
            <hr>
            <h2 class="text-center pb-3">Other Feature</h2>
            <hr>
            <h5 class="card-text"> WLAN: ${phone?.others?.WLAN ? phone.others.WLAN : 'WLAN Name Not Found'}</h5>
            <hr>
            <h5 class="card-text"> Bluetooth: ${phone?.others?.Bluetooth ? phone.others.Bluetooth : 'Bluetooth Name Not Found'}</h5>
            <hr>
            <h5 class="card-text"> GPS: ${phone?.others?.GPS ? phone.others.GPS : 'GPS Name Not Found'}</h5>
            <hr>
            <h5 class="card-text"> NFC: ${phone?.others?.NFC ? phone.others.NFC : 'NFC Name Not Found'}</h5>
            <hr>
            <h5 class="card-text"> USB: ${phone?.others?.USB ? phone.others.USB : 'USB Name Not Found'}</h5>
            
            <hr>
        </div>
    </div>
</div>
  `
  phoneDetails.appendChild(div);
}