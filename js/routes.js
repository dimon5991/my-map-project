function createCurvePoints(fromCoords, toCoords) {
            const lat1 = fromCoords[0], lng1 = fromCoords[1];
            const lat2 = toCoords[0], lng2 = toCoords[1];

            const midLat = (lat1 + lat2) / 2 + Math.abs(lng1 - lng2) * 0.12;
            const midLng = (lng1 + lng2) / 2;

            const points = [];
            for (let t = 0; t <= 1; t += 0.05) {
                const lat = (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * midLat + t * t * lat2;
                const lng = (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * midLng + t * t * lng2;
                points.push([lat, lng]);
            }
            return points;
        }

function drawPairConnections(sourceList, targetList, options = {}) {
            const defaultStyle = {
                color: '#00ffff',
                weight: 1.5,
                opacity: 0.6,
                dashArray: '5, 8'
            };
            const style = { ...defaultStyle, ...options };

            sourceList.forEach((src, idx) => {
                const target = targetList[idx % targetList.length];
                const polyline = L.polyline([src.coords, target.coords], style).addTo(map);
                currentLines.push(polyline);
            });
        }
