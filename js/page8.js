const map = L.map('map').setView([35.602, 139.68], 16);

const baseLayers = {
    'OpenStreetMap': L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }),
    'CartoDB Positron': L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map),
};

const jikkokuIcon = L.icon({
    iconUrl: '../img/jikkoku/jikkoku.png',
    shadowUrl: '../img/jikkoku/jikkoku_shadow.png',
    iconSize: [38, 95],
    shadowSize: [38, 95],
    iconAnchor: [22, 94],
    shadowAnchor: [22, 94],
    popupAnchor: [-3, -76]
});

// D3 rainbow color scale
const colorScale = d3.scaleSequential(d3.interpolateRainbow);

// Load data from Google Sheets
const sheetId = '1WfswObL32ljscc9s0JiqzbU7PYOOWo5qI50iWnmzqS8';
const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

d3.csv(csvUrl).then(data => {
    // Process and validate data
    const validLocations = data
        .map((d, i) => {
            const latLong = d['Lat, Long'] || d['Lat,Long'] || d['Lat Long'];
            if (!latLong) return null;
            
            const [lat, lng] = latLong.split(',').map(coord => parseFloat(coord.trim()));
            if (isNaN(lat) || isNaN(lng)) return null;
            
            return { ...d, lat, lng, index: i };
        })
        .filter(d => d !== null);
    
    // Set color scale domain
    colorScale.domain([0, validLocations.length - 1]);
    
    // Create markers with popups
    const markers = validLocations.map((d, i) => {
        
        return L.marker([d.lat, d.lng], { icon: jikkokuIcon })
            .addTo(map)
            .bindPopup(`
                    <strong>${d.Name}</strong><br>
                    ${d.Address}<br>
                    ${d.Phone}
                </div>
            `);
    });
    
    // Create Voronoi diagram layer
    const voronoiLayer = L.layerGroup();
    
    if (validLocations.length > 1) {
        // Calculate bounds using d3.extent
        const [minLat, maxLat] = d3.extent(validLocations, d => d.lat);
        const [minLng, maxLng] = d3.extent(validLocations, d => d.lng);
        const padding = 0.5;
        
        // Create Delaunay triangulation and Voronoi diagram
        const delaunay = d3.Delaunay.from(validLocations, d => d.lng, d => d.lat);
        const voronoi = delaunay.voronoi([
            minLng - padding, minLat - padding,
            maxLng + padding, maxLat + padding
        ]);
        
        // Create polygons for each Voronoi cell
        validLocations.forEach((d, i) => {
            const cell = voronoi.cellPolygon(i);
            if (!cell) return;
            
            const color = d3.color(colorScale(i)).copy({ opacity: 0.3 });
            
            L.polygon(
                cell.map(([lng, lat]) => [lat, lng]),
                {
                    color: color.formatRgb(),
                    fillColor: color.formatRgb(),
                    fillOpacity: 0.3,
                    weight: 2
                }
            )
            .on('click', () => markers[i].openPopup())
            .addTo(voronoiLayer);
        });
    }
    
    // Add layer control
    const overlays = { 'Voronoi Regions': voronoiLayer };
    L.control.layers(baseLayers, overlays).addTo(map);
    
    // Auto-fit map using d3.extent
    if (validLocations.length > 0) {
        const latExtent = d3.extent(validLocations, d => d.lat);
        const lngExtent = d3.extent(validLocations, d => d.lng);
        map.fitBounds([[latExtent[0], lngExtent[0]], [latExtent[1], lngExtent[1]]]);
    }
}).catch(error => console.error('Error loading data:', error));
