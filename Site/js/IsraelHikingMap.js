$(document).ready(function($) {

	// backwards compatibility - convert to new style
    var zoom = parseInt(getURLParameter('zoom'));
    var lat = parseFloat(getURLParameter('lat'));
    var lng = parseFloat(getURLParameter('lng'));
    if (zoom > 0 && lng > 0 && lat > 0)
    {
		var href = window.location.pathname + "#" + zoom + "/" + lat + "/" + lng;
		window.location.href = href;
    }
});

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}