L.Control.EditOSM = L.Control.extend({
    options: { position: 'topleft' },

    _edit: function() {
        var center = this._map.getCenter();
        var z = this._map.getZoom();
		window.open('http://www.openstreetmap.org/edit?editor=id#' +
			'background=custom:http://osm.org.il/IsraelHiking/Tiles/{z}/{x}/{y}.png&map=' + z + "/" + center.lat + "/" + center.lng);
    },

    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'leaflet-edit-osm leaflet-bar leaflet-control'),
            link = L.DomUtil.create('a', 'leaflet-bar-part leaflet-bar-part-single', container);

        link.href = '#';
        link.innerHTML = '<img src="assets/edit-map.png" />';
        link.title = 'Edit in OpenStreetMap';

        L.DomEvent
            .on(link, 'click', L.DomEvent.stopPropagation)
            .on(link, 'mousedown', L.DomEvent.stopPropagation)
            .on(link, 'dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.preventDefault)
            .on(link, 'click', L.bind(this._edit, this), this);

        return container;
    }
});

L.Control.editOSM = function (options) {
    return new L.Control.EditOSM();
};
