L.Control.Routing = L.Control.extend({
	options: { position: 'topleft' }
	,_initialized: false
	,_toggleOn: false
	,_latlngs: ""
	,initialize: function (options) {
		this._snapping = new L.geoJson(null, {
            style: {
                opacity: 0
              , clickable: false
            }
        });
		this._routing = new L.Routing({
          routing: {
              router: L.bind(this._router, this)
          }
          , snapping: {
              layers: [this._snapping]
            , sensitivity: 15
            , vertexonly: false
          }
        });
		
		L.Util.setOptions(this, options);
	}
	, _toggle: function() {
		this._toggleOn = !this._toggleOn;
		this._routing.draw(this._toggleOn);
		if (this._initialized == false)
		{
			$('.leaflet-routing').popover({
				placement: 'right',
				trigger: 'click',
				content: this._getPopoverContent(),
				container: 'body',
				template: '<div class="popover popover-routing"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title" style="display:none"></h3><div class="popover-content"><p></p></div></div></div>',
				html: true,
			});
			this._initialized = true;
			$('.leaflet-routing').popover('show');
		} 
    }
	,_getPopoverContent: function () {
		return  '<div>' + 
					'<a id="download-gpx" download="israelHiking.gpx"><i class="fa fa-download">.gpx</i></a><br/>' +
					'<a id="download-kml" download="israelHiking.kml"><i class="fa fa-download">.kml</i></a><br/>' +
					'<a id="download-geojson" download="israelHiking.geoJaon"><i class="fa fa-download">.geoJson</i></a><br/>' +
				'</div>'
	}
    , _router: function (m1, m2, cb) {
		var route = 'http://h2096617.stratoserver.net:443/brouter?nogos=&profile=trekking&alternativeidx=0&format=geojson';
		var params = '&lonlats=' + m1.lng + "," + m1.lat + "|" + m2.lng + "," + m2.lat;
		if (this._latlngs == "")
		{
			this._latlngs = m1.lng + "," + m1.lat;
		}
		this._latlngs += "|" + m2.lng + "," + m2.lat;
		this._updateDownloadHref();
		$.getJSON(route + params, function (geojson, status) {
			if (!geojson || !geojson.features || !geojson.features || geojson.features.length === 0) {
				console.log('OSM router failed', geojson);
				return cb(new Error());
			}
			var layer = L.geoJson(geojson).getLayers()[0];
			return cb(null, layer);
		});
	}
	, _updateDownloadHref: function() {
		var addresWithOutFormat = "http://h2096617.stratoserver.net:443/brouter?lonlats=" + this._latlngs + "&nogos=&profile=trekking&alternativeidx=0&format=";
		$("#download-gpx").attr("href", addresWithOutFormat + "gpx");
		$("#download-kml").attr("href",addresWithOutFormat + "kml");
		$("#download-geoJson").attr("href",addresWithOutFormat + "geoJson");
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
        this._routing.onAdd(map);
		
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control'),
            link = L.DomUtil.create('a', 'leaflet-routing cursor-pointer leaflet-bar-part leaflet-bar-part-single', container);

		link.title = 'Start drawing a route';
        link.innerHTML = '<i class="fa fa-road fa-lg"></i>';

        L.DomEvent
            .on(link, 'click', L.DomEvent.stopPropagation)
            .on(link, 'mousedown', L.DomEvent.stopPropagation)
            .on(link, 'dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.preventDefault)
            .on(link, 'click', L.bind(this._toggle, this), this);
		
		this._onMoveEnd();
		map.on('moveend', L.bind(this._onMoveEnd, this));
        return container;
    }
});

L.Control.routing = function (options) {
    return new L.Control.Routing(options);
};