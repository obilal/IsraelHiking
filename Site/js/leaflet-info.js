(function(e){if("function"==typeof bootstrap)bootstrap("leafletinfo",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeleafletInfo=e}else"undefined"!=typeof window?window.leafletInfo=e():global.leafletInfo=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
module.exports = window.L.Control.extend({
    options: { position: 'topright' },
	_initialized: false,
	
    _toggle: function() {
		if (this._initialized == false)
		{
			$('.info').popover({
				placement: 'left',
				trigger: 'click',
				content: this._getEnglishText(),
				container: 'body',
				html: true,
			});
			this._initialized = true;
			$('.info').popover('show');
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
        var container = L.DomUtil.create('div', 'leaflet-control-layers leaflet-control'),
			div = L.DomUtil.create('div', 'info leaflet-bar', container);

		div.title = '<h4>Info - <a href="' + this._getLegendAddress() + '"> Go to legend</a><h4>';
        div.innerHTML = '<i class="fa fa-info fa-2x"></i>';

        L.DomEvent
            .on(div, 'click', L.DomEvent.stopPropagation)
            .on(div, 'mousedown', L.DomEvent.stopPropagation)
            .on(div, 'dblclick', L.DomEvent.stopPropagation)
            .on(div, 'click', L.DomEvent.preventDefault)
            .on(div, 'click', L.bind(this._toggle, this), this);

        return container;
    }
});

},{}]},{},[1])(1)
});

L.Control.Info = function (options) {
    return new leafletInfo();
};