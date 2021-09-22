let countries;
let countryCards = $('.country-cards');
let countryDetails = $('.detail-country');
let detailSection = $('#detail');
let searchSection = $('#searchSection');

fetch("https://restcountries.eu/rest/v2/all")
.then(res => res.json())
.then(data => initialize(data))
.catch(err => console.log("Error:", err));

function initialize(countriesData){
countries = countriesData;
UIkit.grid(".country-cards").$emit((type = "update"));
for(var i = 0; i < countries.length; i++) {
    $(countryCards).append(`
        <li id="countries" data-region="${countries[i].region}">
        <div class="uk-card uk-card-default" onclick="displayCountryInCards(${i})">
            <div class="uk-card-media-top uk-cover-container img-height">
                <img src="${countries[i].flag}" uk-cover>
            </div>
            <div class="uk-card-body">
                <div id="countryName" class="uk-h4 uk-text-bold">${countries[i].name}</div>
                <div class="uk-text-bold uk-margin-bottom-small">Population:<span class="uk-margin-small-left uk-text-normal">${countries[i].population}</span></div>
                <div class="uk-text-bold uk-margin-bottom-small">Region:<span class="uk-margin-small-left uk-text-normal">${countries[i].region}</span></div>
                <div class="uk-text-bold">Capital:<span class="uk-margin-small-left uk-text-normal">${countries[i].capital}</span></div>
            </div>
        </div>
    </li>`);
    }
    UIkit.grid("#country-detail-wrapper").$emit((type = "update"));
}


function displayCountryInCards(countryId){
    let borderCountries = '';
    for (var i = 0; i < countries[countryId].borders.length; i++) {
        borderCountries += `
        <div>
            <div class="uk-button uk-button-small uk-button-default uk-border-rounded">${countries[countryId]?.borders[i]}</div>
        </div>`;
    }

    let languages = '';
    for (var i = 0; i < countries[countryId].languages.length; i++) {
        languages += `
        <span>${countries[countryId].languages[i].name}</span>`;
        if (i < countries[countryId].languages.length - 1){
            languages += `, `;
        }
        else {
            languages += ``;
        }
    }

    document.getElementById("country-detail-wrapper").innerHTML = `
    <div>
    <img src="${countries[countryId].flag}" class="uk-width-1-1">
</div>
<div>
    <div class="uk-h2">${countries[countryId].name}</div>
    <div class="uk-grid-large uk-child-width-1-2@m uk-margin-medium-bottom" uk-grid>
        <div>
            <p>Native Name: <span>${countries[countryId].nativeName}</span></p>
            <p>Population: <span>${countries[countryId].population}</span></p>
            <p>Region: <span>${countries[countryId].region}</span></p>
            <p>Sub Region: <span>${countries[countryId].subregion}</span></p>
            <p>Capital: <span>${countries[countryId].capital}</span></p>
        </div>
        <div>
            <p>Top Level Domain: <span>${countries[countryId].topLevelDomain[0]}</span></p>
            <p>Currencies: <span>${countries[countryId].currencies[0].name}</span></p>
            <p>Languages: `+languages+` </p>
        </div>
    </div>
    <div class="uk-grid-small uk-child-width-auto uk-flex-middle" uk-grid>
        <div>
            <div>Border Countries:</div>
        </div>`+borderCountries+`
    </div>
</div>
    `;
    detailSection.removeClass('uk-hidden');
    searchSection.addClass('uk-hidden');
    UIkit.grid("#country-detail-wrapper").$emit((type = "update"));
}

function searchFunction() {
    var input, filter, countryCards, countries, countryName, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    countryCards = document.getElementById("country-cards");
    countries = countryCards.querySelectorAll("#countries");
    for (var i = 0; i < countries.length; i++) {
        countryName = countries[i].querySelectorAll("#countryName")[0];
        txtValue = countryName.textContent || countryName.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            countries[i].style.display = "";
        } else {
            countries[i].style.display = "none";
        }
    }
}

function goSearch(){
    detailSection.addClass('uk-hidden');
    searchSection.removeClass('uk-hidden');
}
