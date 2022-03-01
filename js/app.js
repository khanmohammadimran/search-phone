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
        console.log(showTwentyResult.image)
        const div = document.createElement('div')
        div.classList.add("col-lg-4")
        div.classList.add("col-sm-12")
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="${phones.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
        `
        searchResult.appendChild(div)
    }
}