// рендер страницы
export function renderPage(data, loadPage) {
    const page = document.querySelector('.page');
    switch (location.pathname) {
        case '/index.html':
            localStorage.clear();
            page.innerHTML = `
                <h1 class="visually-hidden">Star Wars</h1>
                <div class="page__content container">
                    <svg width="360" height="200" class="page__logo">
                        <use xlink:href="./sprite.svg#logo-icon"></use>
                    </svg>
                    <h4 class="page__main-title">In Detail</h4>
                    <div class="page__main-links">
                        <a href="./detail.html" class="page__main-link" data-id="4">Episode I</a>
                        <a href="./detail.html" class="page__main-link" data-id="5">Episode II</a>
                        <a href="./detail.html" class="page__main-link" data-id="6">Episode III</a>
                        <a href="./detail.html" class="page__main-link" data-id="1">Episode IV</a>
                        <a href="./detail.html" class="page__main-link" data-id="2">Episode V</a>
                        <a href="./detail.html" class="page__main-link" data-id="3">Episode VI</a>
                    </div>
                </div>
            `;
            const mainLinks = document.querySelectorAll('.page__main-link');
            if (mainLinks) {
                mainLinks.forEach(link => {
                    link.addEventListener('click', function(e) {
                        const path = link.dataset.id;
                        localStorage.setItem('id', JSON.stringify(path));
                        e.preventDefault();
                        history.pushState(null, '', this.href);
                        loadPage();
                    });
                });
                preloadDone();
            }
            break;
        case '/detail.html':
            page.innerHTML = `
                <div class="page__content container">
                    <h1 class="page__heading"></h1>
                    <a href="./index.html" class="page__back-link">Back to episodes</a>
                    <p class="page__description"></p>
                    <h2 class="page__detail-title">Planets</h2>
                    <ul class="page__detail-list" data-title="planets"></ul>
                    <h2 class="page__detail-title">Species</h2>
                    <ul class="page__detail-list" data-title="species"></ul>
                    <h2 class="page__detail-title">Starships</h2>
                    <ul class="page__detail-list" data-title="starships"></ul>
                </div>
            `;
            const backLink = document.querySelector('.page__back-link');
            if (backLink) {
                let romanNum;
                const detailHeading = document.querySelector('.page__heading');
                const detailDescription = document.querySelector('.page__description');

                switch (data.episode_id) {
                    case 1:
                        romanNum = 'I';
                        break;
                    case 2:
                        romanNum = 'II';
                        break;
                    case 3:
                        romanNum = 'III';
                        break;
                    case 4:
                        romanNum = 'IV';
                        break;
                    case 5:
                        romanNum = 'V';
                        break;
                    case 6:
                        romanNum = 'VI';
                        break;
                }
                detailHeading.textContent = `Episode ${romanNum} - ${data.title}`;
                detailDescription.textContent = data.opening_crawl;

                backLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    history.pushState(null, '', this.href);
                    loadPage();
                });
            }
            break;
    }
}
// создание элементов детальной страницы
export function createListItem(data, list) {
    const lists = document.querySelectorAll('.page__detail-list');
    const listNames = ['planets', 'species', 'starships'];
    lists.forEach(el => {
        if (el.dataset.title === list) {
            data.forEach(dataItem => {
                const item = document.createElement('li');
                item.classList.add('page__list-item');
                switch (list) {
                    case listNames[0]:
                        item.innerHTML = `
                            <h4 class="page__list-title">${dataItem.name}</h4>
                            <ul class="page__list-content">
                                <li class="page__list-param"><span class="page__list-param--desc">Diameter:</span> ${dataItem.diameter}m</li>
                                <li class="page__list-param"><span class="page__list-param--desc">Gravity:</span> ${dataItem.gravity}</li>
                                <li class="page__list-param"><span class="page__list-param--desc">Orbital period:</span> ${dataItem.orbital_period} years</li>
                                <li class="page__list-param"><span class="page__list-param--desc">Rotation period:</span> ${dataItem.rotation_period} years</li>
                                <li class="page__list-param"><span class="page__list-param--desc">Climate:</span> ${dataItem.climate}</li>
                                <li class="page__list-param"><span class="page__list-param--desc">Terrain:</span> ${dataItem.terrain}</li>
                            </ul>
                        `;
                        break;
                    case listNames[1]:
                        item.innerHTML = `
                            <h4 class="page__list-title">${dataItem.name}</h4>
                            <ul class="page__list-content">
                                <li class="page__list-param"><span class="page__list-param--desc">Classification:</span> ${dataItem.classification}</li>
                                <li class="page__list-param"><span class="page__list-param--desc">Designation:</span> ${dataItem.designation}</li>
                                <li class="page__list-param"><span class="page__list-param--desc">Average height:</span> ${dataItem.average_height}cm</li>
                                <li class="page__list-param"><span class="page__list-param--desc">Average lifespan:</span> ${dataItem.average_lifespan} years</li>
                                <li class="page__list-param"><span class="page__list-param--desc">Language:</span> ${dataItem.language}</li>
                                <li class="page__list-param"><span class="page__list-param--desc">Skin colors:</span> ${dataItem.skin_colors}</li>
                            </ul>
                        `;
                        break;
                    case listNames[2]:
                        item.innerHTML = `
                            <h4 class="page__list-title">${dataItem.name}</h4>
                            <ul class="page__list-content">
                                <li class="page__list-param"><span class="page__list-param--desc">Model:</span> ${dataItem.model}</li>
                                <li class="page__list-param"><span class="page__list-param--desc">Manufacturer:</span> ${dataItem.manufacturer}</li>
                                <li class="page__list-param"><span class="page__list-param--desc">Cost in credits:</span> ${dataItem.cost_in_credits}</li>
                                <li class="page__list-param"><span class="page__list-param--desc">Length:</span> ${dataItem.length}m</li>
                                <li class="page__list-param"><span class="page__list-param--desc">Max atmosphering speed:</span> ${dataItem.max_atmosphering_speed}</li>
                                <li class="page__list-param"><span class="page__list-param--desc">Starship class:</span> ${dataItem.starship_class}</li>
                            </ul>
                        `;
                        break;
                }
                el.append(item);
            });
            preloadDone();
        }
    });
}

// вкл прелодер
export function preload() {
    const preloader = document.getElementById('preloader');
    preloader.classList.remove('done');
}
// выкл прелодер
function preloadDone() {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('done');
}
