// Loard Search Result
const loadSearchResult = (condition = true) => {
    displayOrHideElement('spinnner-below-search', 'block');
    displayOrHideElement('search-not-found', 'none');
    displayOrHideElement('phone-details', 'none');
    displayOrHideElement('load-more-button', 'none');
    if (condition === true) {
        document.getElementById('result-card').textContent = ``;
    } else {
        displayOrHideElement('spinnner-below-load-more', 'block');
    }

    const searchText = document.getElementById('search-field').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResult(data.data, condition));
};

// Display Search Result
const displaySearchResult = (data, condition) => {
    const container = document.getElementById('result-card');

    // Spinner hide after load result
    displayOrHideElement('spinnner-below-search', 'none');
    displayOrHideElement('spinnner-below-load-more', 'none');

    // No search found
    if (data.length === 0) {
        displayOrHideElement('search-not-found', 'block');
    }

    container.textContent = ``;

    const lenghtOfResult = data.length;

    //Load More Button Show and Hide Codition
    if (lenghtOfResult > 20 && condition === true) {
        displayOrHideElement('load-more-button', 'block');
    }

    let flag = 0;
    data.every(d => {
        if (flag === 20 && condition === true) {
            return false;
        }
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
		<div class="card h-100">
			<img src="${d.image}" class="card-img-top w-25 mx-auto my-4" alt="">
			<h4 class="mx-auto mt-4 fs-4 text-center">${d.phone_name}</h4>
			<h5 class="mx-auto mb-4 fs-6 text-center">Brand: ${d.brand}</h5	>
			<button class="btn btn-dark w-50  mx-auto mb-4" onclick="loadPhoneDetails('${d.slug}')">Explore</button>
	  	</div>
		`;
        container.appendChild(div);
        flag++;

        return true;
    });

};


//Load Phone Details
const loadPhoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneDetails(data.data));
};

//Display Phone Details
const displayPhoneDetails = (data) => {
    const container = document.getElementById('phone-details');
    container.textContent = ``;

    displayOrHideElement('phone-details', 'block');

    //Explore button clicked then auto scroll top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('mb-3');
    div.classList.add('pb-5');
    div.innerHTML = `
		<img src="${data.image}" class="card-img-top w-25 mx-auto my-5" alt="...">
		<div class="card-body">
	  		<h4 class="card-title text-center mt-4 fs-4">${data.name}</h4>
			<h5 class="mx-auto mb-4 fs-6 text-center">Brand: ${data.brand}</h5>
	  		<p class="card-text text-center"><small class="text-muted">${data.releaseDate ? data.releaseDate : 'No release date found'}</small></p>
		</div>
		<div class="accordion w-75 mx-auto" id="accordionPanelsStayOpenExample">
			<div class="accordion-item">
			  	<h2 class="accordion-header" id="panelsStayOpen-headingOne">
					<button class="accordion-button bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
					  Main Features
					</button>
			  	</h2>
			  	<div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
					<div class="accordion-body">
					  <li><strong>Display Size: </strong>${data?.mainFeatures?.displaySize ? data.mainFeatures.displaySize : notExistMessage()}</li>
					  <li><strong>Chipset: </strong>${data?.mainFeatures?.chipSet ? data.mainFeatures.chipSet : notExistMessage()}</li>
					  <li><strong>Memory: </strong>${data?.mainFeatures?.memory ? data.mainFeatures.memory : notExistMessage()}</li>
					  <li><strong>Storage: </strong>${data?.mainFeatures?.storage ? data.mainFeatures.storage : notExistMessage()}</li>
					  <li><strong>Sensors: </strong>${data?.mainFeatures?.sensors ? data.mainFeatures.sensors : notExistMessage()}</li>
					</div>
			  	</div>
			</div>
			<div class="accordion-item">
				  	<h2 class="accordion-header" id="panelsStayOpen-headingTwo">
						<button class="accordion-button bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
						  Others
						</button>
				  	</h2>
				  	<div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
						<div class="accordion-body">
						<li><strong>WLAN: </strong>${data?.others?.WLAN ? data.others.WLAN : notExistMessage()}</li>
						<li><strong>Bluetooth: </strong>${data?.others?.Bluetooth ? data.others.Bluetooth : notExistMessage()}</li>
						<li><strong>GPS: </strong>${data?.others?.GPS ? data.others.GPS : notExistMessage()}</li>
						<li><strong>NFC: </strong>${data?.others?.NFC ? data.others.NFC : notExistMessage()}</li>
						<li><strong>Radio: </strong>${data?.others?.Radio ? data.others.Radio : notExistMessage()}</li>
						<li><strong>USB: </strong>${data?.others?.USB ? data.others.USB : notExistMessage()}</li>
						</div>
				  	</div>
				</div>
	  </div>
	`;
    container.appendChild(div);
}

// No Exist Message Arrow Function
const notExistMessage = () => {
    return "This features doesn't exist";
}

//Display Or Hide Element Arrow Function
const displayOrHideElement = (id, displayType) => {
    document.getElementById(id).style.display = displayType;
}