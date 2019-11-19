const sendHttpRequest = (method, url, data) => {
    return fetch(url)
    .then(response => {
        return response.json();
    });
};


const getData = (url) => {
    sendHttpRequest('GET', url)
        .then(response => {
            compileTemplateWith(response.results);
            setPagination(response);
        });
};


const compileTemplateWith = data => {
    const planetListTemplate = document.getElementById('planets-template').innerHTML;
    const compiledPlanetsTemplate = Handlebars.compile(planetListTemplate);
    document.getElementById('table-body').innerHTML = compiledPlanetsTemplate({planets: data});
};

const setPagination = response => {
    const previousPage = response.previous;
    const nextPage = response.next;
    const previousButton = document.querySelector('#prev-btn');
    const nextButton = document.querySelector('#next-btn');
    
    if (previousPage) {
        previousButton.addEventListener('click', buttonClick)
        previousButton.dataset.destination = previousPage;
        previousButton.classList.remove('disabled');
    } else {
        previousButton.removeEventListener('click', buttonClick);
        previousButton.classList.add('disabled');
    }
    
    if (nextPage) {
        nextButton.addEventListener('click', buttonClick)
        nextButton.dataset.destination = nextPage;
        nextButton.classList.remove('disabled');
    } else {
        nextButton.removeEventListener('click', buttonClick);
        nextButton.classList.add('disabled');
    }
};

const buttonClick = () => {
    const destination = event.target.dataset.destination
    console.log(destination)
    insertTemplate();
    getData(destination)
};

const insertTemplate = () => {
    const tableBody = document.querySelector('#table-body');
};


// handlebars helpers

Handlebars.registerHelper('populationFormatter', function(population) {
    return population === 'unknown' ? population: `${parseInt(population).toLocaleString()} people`
})

Handlebars.registerHelper('percentageFormatter', function(percentage) {
    return percentage === 'unknown' ? percentage: `${percentage}%`
})

Handlebars.registerHelper('residentsFormatter', function(residents) {
    return residents.length > 1 ? `${residents.length} residents`: `1 resident`
})

Handlebars.registerHelper('diameterFormatter', function(diameter) {
    return diameter === 'unknown' ? diameter: `${parseInt(diameter).toLocaleString()} km`
})

getData('https://swapi.co/api/planets/');