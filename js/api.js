export function loadResource(src, id) {
    // CSS файл
    const cssPromises = {};
    if (src.endsWith('.css')) {
        if (!cssPromises[src]) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = src;
            cssPromises[src] = new Promise(resolve => {
                link.addEventListener('load', function() {
                    resolve();
                });
            });
            document.head.append(link);
        }
        return cssPromises[src];
    }
    // данные сервера
    if (id) {
        return fetch(src).then(res => res.json());
    }
}
