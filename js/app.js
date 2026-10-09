function initLeafletMap() {
    map = createLeafletMap('map', {
        center: [25, 10],
        zoom: 3
    });

    buildSubDropdownMenu();
    renderScene('robots');

    requestAnimationFrame(() => map.invalidateSize());
}
