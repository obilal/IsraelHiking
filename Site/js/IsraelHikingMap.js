$(document).ready(function($) {

	// backwards compatibility
    var zoom = parseInt(getURLParameter('zoom'));
    var lat = parseFloat(getURLParameter('lat'));
    var lng = parseFloat(getURLParameter('lng'));
    if (zoom !== null && lng !== null && lat !== null)
    {
        map.setView([lat, lng], zoom);
    }
});

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}