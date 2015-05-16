L.Control.Routing = L.Control.extend({
	options: { position: 'topleft' }
	,initialize: function (options) {
		this._snapping = new L.geoJson(null, {
            style: {
                opacity: 0
              , clickable: false
            }
        });
		this._routing = new L.Routing({
            position: 'bottomleft' // this is a workaround since Routing is a control and not a class...
          , routing: {
              router: this._router
          }
          , snapping: {
              layers: []
          }
          , snapping: {
              layers: [this._snapping]
            , sensitivity: 15
            , vertexonly: false
          }
        });
		
		L.Util.setOptions(this, options);
	}
	
    , _router: function (m1, m2, cb) {
            var route = 'http://h2096617.stratoserver.net:443/brouter?nogos=&profile=trekking&alternativeidx=0&format=geojson';
            var params = '&lonlats=' + m1.lng + "," + m1.lat + "|" + m2.lng + "," + m2.lat;
            $.getJSON(route + params, function (geojson, status) {
                if (!geojson || !geojson.features || !geojson.features || geojson.features.length === 0) {
                    console.log('OSM router failed', geojson);
                    return cb(new Error());
                }
                return cb(null, L.geoJson(geojson).getLayers()[0]);
            });
        }
		
	, _onMoveEnd: function() {
            if (this._map.getZoom() <= 12) {
				this._snapping.clearLayers();
				return;
			}
			var proxy = 'http://www2.turistforeningen.no/routing.php?url=';
			var route = 'http://www.openstreetmap.org/api/0.6/map';
			var params = '&bbox=' + this._map.getBounds().toBBoxString() + '&1=2';
			var snapping = this._snapping;
			$.get(proxy + route + params).always(function (osm, status) {
				if (status !== 'success' || typeof osm !== 'object') {
					return;
				}
				var geojson = osmtogeojson(osm);

				snapping.clearLayers();
				for (var i = 0; i < geojson.features.length; i++) {
					var feat = geojson.features[i];
					if (feat.geometry.type === 'LineString' && feat.properties.tags.highway) {
						snapping.addData(geojson.features[i]);
					}
				}
			});
        }
	
    , onAdd: function(map) {
		this._map = map;
		this._snapping.addTo(map);
        map.addControl(this._routing);
		
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control'),
            link = L.DomUtil.create('a', 'leaflet-info leaflet-bar-part leaflet-bar-part-single', container);

		link.title = 'Start drawing a route';
        link.innerHTML = '<i class="fa fa-road fa-lg"></i>';

        L.DomEvent
            .on(link, 'click', L.DomEvent.stopPropagation)
            .on(link, 'mousedown', L.DomEvent.stopPropagation)
            .on(link, 'dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.preventDefault)
            .on(link, 'click', function() { this._routing.draw(true) }, this);
		
		this._onMoveEnd();
		map.on('moveend', L.bind(this._onMoveEnd, this));
        return container;
    }
});

L.Control.routing = function (options) {
    return new L.Control.Routing(options);
};