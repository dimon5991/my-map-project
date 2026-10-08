function initGoogleMap() {
    map = createGoogleMapAdapter('map', {
        center: [25, 10],
        zoom: 3
    });

    buildSubDropdownMenu();
    renderScene('robots');

    setTimeout(() => {
        map.invalidateSize();
    }, 200);
}
