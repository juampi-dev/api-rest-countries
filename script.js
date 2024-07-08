/*

Your users should be able to:

- See all countries from the API on the homepage
- Search for a country using an input field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Bonus: Toggle the color scheme between light and dark mode

*/

/* Fetching Data */
const url = 'https://restcountries.com/v3.1/all';

fetch(url)
    .then(response => response.json())
    .then(data => {
        createCards(data)
        currentData = data;
        totalPages = Math.ceil(data.length / itemsPerPage);
        displayPage(currentPage);
        createPaginationControls();
    })
    .catch(error => console.error('Error:', error));

/* Lógica para la creación de las cards de países */
function createCards(countries){
    const cardsContainer = document.querySelector('.cards'); // Seleccionamos el contenedor de las cartas para modificarlo

    countries.forEach(country => {
        const card = createCard();
        fillCardData(card, country);
        cardsContainer.appendChild(card);
    });
}

/* Función para crear la estructura básica de una card */
function createCard(){
    const card = document.createElement('article');
    card.classList.add('card'); // Asignamos la clase card a cada uno de los artículos
    
    // Creamos el header de la card (donde van las banderas)
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    figure.appendChild(img);

    // Creamos el "título" de la card (donde va el nombre de cada país)
    const section = document.createElement('section');
    const cardTitle = document.createElement('h4');
    section.appendChild(cardTitle);

    // Creamos el cuerpo de la card (aside donde van los datos de cada país)
    const aside = document.createElement('aside');
    const population = document.createElement('p');
    const region = document.createElement('p');
    const capital = document.createElement('p');
    aside.appendChild(population);
    aside.appendChild(region);
    aside.appendChild(capital);

    card.appendChild(figure);
    card.appendChild(section);
    card.appendChild(aside); // Envolvemos el contenido creado dentro de la card base

    return card;
}

/* Función para llenar la card con los datos del país */
function fillCardData(card, country){
    const img = card.querySelector('img');
    img.src = country.flags.png;
    img.alt = `${country.name.common} Flag`;

    const cardTitle = card.querySelector('h4');
    cardTitle.textContent = country.name.common;

    const [population, region, capital] = card.querySelectorAll('aside p');
    population.textContent = `Population: ${country.population}`;
    region.textContent = `Region: ${country.region}`;
    capital.textContent = `Capital: ${country.capital}`;
}

/* Lógica para paginar las cards */
let currentPage = 1;
const itemsPerPage = 10; // Número de items por página
let totalPages = 0;
let currentData = [];

/* Paginación */
function displayPage(page) {
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = ''; // Limpiar las cards existentes

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const paginatedItems = currentData.slice(startIndex, endIndex);

    paginatedItems.forEach(country => {
        const card = createCard();
        fillCardData(card, country);
        cardsContainer.appendChild(card);
    });
}

/* Control de paginación */
function createPaginationControls() {
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination');

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            displayPage(currentPage);
        });
        paginationContainer.appendChild(button);
    }

    document.body.appendChild(paginationContainer);
}

/*  */
function filterByRegion(){

}