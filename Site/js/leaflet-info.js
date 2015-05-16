L.Control.Info = L.Control.extend({
    options: { position: 'topleft' },
	_initialized: false,
	
    _toggle: function() {
		if (this._initialized == false)
		{
			$('.leaflet-info').popover({
				placement: 'right',
				trigger: 'click',
				content: this._getEnglishText(),
				container: 'body',
				template: '<div class="popover popover-info"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>',
				html: true,
			});
			this._initialized = true;
			$('.leaflet-info').popover('show');
		} 
    },
	
	_getHebrewText : function() {
		var text = '<div class="container">' +
            '<p> המפה הזו נוצרה בעזרת מידע מ- <a href="http://www.openstreetmap.org/" target="_blank">Open Street Map</a> שם ניתן לראות ולערוך אותו. כל שיש לעשות הוא לפתוח חשבון ולהתחיל למפות. שימו לב, המפה אינה מתעדכנת באופן מיידי.</p>' +
            '<h4> להלן כמה קישורים הקשורים לפרוייקט </h4>' +
            '<ul>' +
            '<li><a href="https://github.com/HarelM/IsraelHiking/#israel-hiking-map" target="_blank">Github</a> הוראות איך ליצור את המפה בעצמך וקישורים להורדת מפות</li>' +
            '<li><a href="http://wiki.openstreetmap.org/wiki/WikiProject_Israel" target="_blank">Israel OSM Wiki Project</a> חוקים נפוצים של קהילת הממפים הישראלית של OSM</li>' +
            '<li><a href="http://forum.openstreetmap.org/viewforum.php?id=33" target="_blank">Israel OSM Forum</a> היכן שניתן למצוא תשובות ולשאול שאלות לגבי המיפוי</li>' +
            '</ul>' +
            '<i>' +
            '<p align="left">' +
            'תודה על תרומתכם!<br>' +
            'הראל וזאב<br>' +
            '</p>' +
            '</i>' +
            '</div>';
		return text;
	},
	
	_getEnglishText: function() {
		var text = '<p> This map was generated from <a href="http://www.openstreetmap.org/" target="_blank">Open Street Map (OSM)</a> data where it can be viewed and edited. All you need to do is create an account and start mapping. Note that the changes will not affect this map instantly.</p>' +
				'<h4> Below are some links related to this project </h4>' +
				'<ul>' +
				'<li>See <a href="https://github.com/HarelM/IsraelHiking/#israel-hiking-map" target="_blank">Github</a> for instructions on how to create the map by yourself and links to map downloads.</li>' +
				'<li>See <a href="http://wiki.openstreetmap.org/wiki/WikiProject_Israel" target="_blank">Israel OSM Wiki Project</a> for common rules of the Israeli Open Street Map community.</li>' +
				'<li>See <a href="http://forum.openstreetmap.org/viewforum.php?id=33" target="_blank">Israel OSM Forum</a> for the Israeli Open Street Map forum where you can post questions and look for answers.</li>' +
				'</ul>' +
				'<i>' +
				'<p align="right">' +
				'Thank you for your support!<br>' +
				'Harel and Zeev<br>' +
				'</p>' +
				'</i>';
		return text;
	},
	
	_getLegendAddress: function() {
		 var address = window.location.href.match(/^[^\#\?]+/)[0];
		 return address + "#13/32.8176/35.5707";
	},
	
    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control'),
            link = L.DomUtil.create('a', 'leaflet-info cursor-pointer leaflet-bar-part leaflet-bar-part-single', container);

		link.title = '<h4>Info - <a href="' + this._getLegendAddress() + '"> Go to legend</a><h4>';
        link.innerHTML = '<i class="fa fa-info fa-lg"></i>';

        L.DomEvent
            .on(link, 'click', L.DomEvent.stopPropagation)
            .on(link, 'mousedown', L.DomEvent.stopPropagation)
            .on(link, 'dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.preventDefault)
            .on(link, 'click', L.bind(this._toggle, this), this);

        return container;
    }
});

L.Control.info = function (options) {
    return new L.Control.Info();
};