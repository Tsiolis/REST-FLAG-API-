const container = document.getElementById('flag-container')
const search = document.getElementById('search');
const searchIcon = document.getElementById('search-icon');
const region = document.getElementById('region');
const searchFilter = document.getElementById('search-filter');
const detail = document.getElementById('detail');
const back = document.querySelectorAll('button');


function searchCountry() {
    container.innerHTML = '';
    const searchTerm = search.value;

    const getCountry = fetch(`https://restcountries.eu/rest/v2/name/${searchTerm}`)
        .then(response => response.json())
        .then((searchTerm) => {
            searchTerm.forEach(i => {
                container.innerHTML +=
                    `
            <div data-name="${i.name}" class="flag">
            <img alt="${i.name} Flag" data-name="${i.name}" src="${i.flag}">
            <h2 data-name="${i.name}">${i.name}</h2>
            <h3 data-name="${i.name}">Population: <span>${i.population.toLocaleString()}</span></h3>
            <h3 data-name="${i.name}">Region: <span>${i.region}</span></h3>
            <h3 data-name="${i.name}">Capital: <span>${i.capital}</span></h3>
            </div>
            `
                search.innerHTML = '';
            })
        });
}

function getAllCountries() {
    const data = fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then((data) => {
            data.forEach(i => {
                container.innerHTML +=
                    `
        <div data-name="${i.name}" class="flag">
        <img alt="${i.name} Flag" data-name="${i.name}" src="${i.flag}">
        <h2 data-name="${i.name}">${i.name}</h2>
        <h3 data-name="${i.name}">Population: <span>${i.population.toLocaleString()}</span></h3>
        <h3 data-name="${i.name}">Region: <span>${i.region}</span></h3>
        <h3 data-name="${i.name}">Capital: <span>${i.capital}</span></h3>
        </div>
        `
            });

        })
}


function getByRegion() {
    container.innerHTML = '';
    const selectedRegion = region.value;
    if (selectedRegion === '') {
        getAllCountries();
    } else {
        const data = fetch(`https://restcountries.eu/rest/v2/region/${selectedRegion}`)
            .then(response => response.json())
            .then((data) => {
                data.forEach(i => {
                    container.innerHTML +=
                        `
        <div data-name="${i.name}" class="flag">
        <img alt="${i.name} Flag" data-name="${i.name}" src="${i.flag}">
        <h2 data-name="${i.name}">${i.name}</h2>
        <h3 data-name="${i.name}">Population: <span>${i.population.toLocaleString()}</span></h3>
        <h3 data-name="${i.name}">Region: <span>${i.region}</span></h3>
        <h3 data-name="${i.name}">Capital: <span>${i.capital}</span></h3>


        </div>
        `

                });

            })
    }
}

container.addEventListener('click', e => {
    searchFilter.style.display = 'none';

    const clicked = e.target.getAttribute('data-name');

    const getCountry = fetch(`https://restcountries.eu/rest/v2/name/${clicked}`)
        .then(response => response.json())
        .then((clickedCountry) => {
            clickedCountry.forEach(i => {
                container.innerHTML = '';
                detail.innerHTML +=
                    `
        <div class="detail-container">
        
        <div class="dets-0">
        <button onclick="clearDetail(),getAllCountries()" id="btn">Back</button>
        <img alt="${i.name} Flag" class="dets-img" src="${i.flag}">
     </div>
        <div class="dets dets-1">
        <div><h1 class="details-h1">${i.name}</h1></div>
        <div class="dets-cont">
        <div>
        <h3>Native Name: ${i.nativeName}</h3>
        <h3>Population: ${i.population.toLocaleString()}</h3>
        <h3>Region: ${i.region}</h3>
        <h3>Sub Region: ${i.subregion}</h3>
        <h3>Capital: ${i.capital}</h3>
        </div>
        <div>
        <h3>Top Level Domain: ${i.topLevelDomain}</h3>
        <h3>Currencies: ${i.currencies.map(currency => currency.name).join(', ')}</h3>
        <h3>Languages: ${i.languages.map(language => language.name).join(', ')}</h3>
       </div> 
        </div>
        <h3>Border countries:</h3>
        <div>
        ${i.borders.map(border => detail.innerHTML = `<button data-name"${border} class="border-btn">${border}</button>`
                    ).join(' ')}
        <div>
        </div>
        </div>
            `
                search.innerHTML = '';
            })
        });

})

detail.addEventListener('click', e => {
    const clicked = e.target.innerHTML;

    const getBorder = fetch(`https://restcountries.eu/rest/v2/alpha?codes=${clicked}`)
        .then(response => response.json())
        .then((clickedBorder) => {
            clickedBorder.forEach(i => {
                detail.innerHTML = '';
                detail.innerHTML +=
                    `
    <div class="detail-container">
    
    <div class="dets-0">
    <button onclick="clearDetail(),getAllCountries()" id="btn">Back</button>
    <img alt="${i.name} Flag" class="dets-img" src="${i.flag}">
    </div>
    <div class="dets dets-1">
    <div><h1 class="details-h1">${i.name}</h1></div>
    <div class="dets-cont">
    <div>
    <h3>Native Name: ${i.nativeName}</h3>
    <h3>Population: ${i.population.toLocaleString()}</h3>
    <h3>Region: ${i.region}</h3>
    <h3>Sub Region: ${i.subregion}</h3>
    <h3>Capital: ${i.capital}</h3>
    </div>
    <div>
    <h3>Top Level Domain: ${i.topLevelDomain}</h3>
    <h3>Currencies: ${i.currencies.map(currency => currency.name).join(', ')}</h3>
    <h3>Languages: ${i.languages.map(language => language.name).join(', ')}</h3>
    </div> 
    </div>
    <h3>Border countries:</h3>
    <div>
    ${i.borders.map(border => detail.innerHTML = `<button data-name"${border} class="border-btn">${border}</button>`
                    ).join(' ')}
    <div>
    </div>
    </div>
        `
                search.innerHTML = '';
            })
        });
})

function clearDetail() {
    searchFilter.style.display = 'flex';
    detail.innerHTML = '';
}

getAllCountries();

searchIcon.addEventListener('click', searchCountry);
region.addEventListener('change', getByRegion);






