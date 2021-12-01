// динамический импорт данных
let {
    loadResource
} = await import('./api.js');

let {
    renderPage,
    createListItem,
    preload
} = await import('./view.js');

// загрузка элементов детального списка
function loadItem(data, list, id) {
    Promise.all(data.map(src => loadResource(src, id)))
    .then(res => {
        createListItem(res, list);
    });
}

// загрузка сторонних ресурсов
function loadPage() {
    preload();
    const id = JSON.parse(localStorage.getItem('id'));
    Promise.all([
        `https://swapi.dev/api/films/${id}`,
        './css/style.css'
    ].map(src => loadResource(src, id)))
        .then(([data]) => {
            renderPage(data, loadPage);
            if (data) {
                loadItem(data.planets, 'planets', id);
                loadItem(data.species, 'species', id);
                loadItem(data.starships, 'starships', id);
            }
        });
}
loadPage();

// отрисовка соответствующего контента при использовании кнопок браузера "назад" / "вперед"
window.addEventListener('popstate', function() {
    loadPage();
});
