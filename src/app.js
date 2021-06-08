/* app.json */
function setTitleError() {
	const h2 = document.querySelector('main > h2');
	if (!(h2 instanceof Element)) return;
	h2.innerHTML = 'Error';
}
function showNoGoogleError() {
	setTitleError();
	[...document.querySelectorAll('.no-google')].forEach((div) => {
		div.removeAttribute('hidden');
	});
	[...document.querySelectorAll('#google-maps')].forEach((el) => {
		el.setAttribute('hidden', 'hidden');
	});
}
function showNoWorkerError() {
	setTitleError();
	[...document.querySelectorAll('.no-workers')].forEach((div) => {
		div.removeAttribute('hidden');
	});
}

class GTFS extends Worker {
	constructor(...args) {
		super(...args);
	}

	listAgencies(agencies) {
		if (!Array.isArray(agencies)) {
			return;
		}
		const main = document.querySelector('main');
		if (!(main instanceof Element)) {
			return;
		}
		const el = document.createElement('section');
		el.classList.add('agency');
		agencies.forEach((agency) => {
			if (!agency || agency.agency_id == '') return;
			el.insertAdjacentHTML('beforeend', `<h1>${agency.agency_name}`);
			if (agency.agency_url) {
				el.insertAdjacentHTML('beforeend', `<a href="${agency.agency_url}" target="_blank">Agency Website`);
			}
		});
		[...document.querySelectorAll('main section.agency')].forEach(s => s.remove());
		main.appendChild(el);
	}
};

yodasws.page('home').setRoute({
	template: 'pages/home.html',
	route: '/([a-z]{2}/(\\w+/)?)?',
}).on('load', () => {
	// Require Web Workers
	if (!window.Worker) {
		showNoWorkerError();
		return;
	}

	// Start loading GTFS files
	const gtfs = new GTFS('res/gtfs.js');
	if (!(gtfs instanceof Worker)) {
		showNoWorkerError();
		return;
	}
	gtfs.onmessage = (e) => {
		const [fn, ...args] = e.data;
		if (typeof gtfs[fn] === 'function') {
			gtfs[fn](...args);
		}
	}

	// Get basic information about location
	const loc = (() => {
		const loc = window.location.hash.replace(/^#!\/|\/$/g, '');
		let locs = {
			'jp/hakone': {
				search: 'Hakone, Japan',
				title: 'Hakone, Japan',
				files: 'jp/hakone',
			},
			'us/charlotte': {
				search: 'Charlotte, NC, USA',
				title: 'Charlotte',
				files: 'us/charlotte',
			},
		};
		if (locs[loc]) {
			return locs[loc];
		}
		locs = Object.entries(locs).filter(([key, obj]) => key.includes(loc));
		return locs[Math.floor(Math.random() * locs.length)][1];
	})();
	if (!loc) {
		showNoGoogleError();
		return;
	}

	gtfs.postMessage([
		'loadGTFS',
		loc.files,
	]);

	// Show Page to User
	[...document.querySelectorAll('#google-maps, .gtfs')].forEach((el) => {
		el.removeAttribute('hidden');
	});

	// Set Page Title
	(() => {
		const h2 = document.querySelector('main > h2');
		if (!(h2 instanceof Element)) return;
		h2.innerHTML = loc.title;
	})();

	// Require Google Maps JavaScript API
	if (!google || !google.maps) {
		showNoGoogleError();
		return;
	}
	const div = document.getElementById('google-maps');
	if (!(div instanceof Element)) {
		showNoGoogleError();
		return;
	}

	// Load and Display Google Maps
	const geocoder = new google.maps.Geocoder();
	geocoder.geocode({ address: loc.search }, (results, status) => {
		if (status == 'OK') {
			// Load Google Maps
			gtfs.map = new google.maps.Map(document.getElementById('google-maps'), {
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				gestureHandling: 'cooperative',
				keyboardShortcuts: true,
				disableDefaultUI: true,
				scaleControl: true,
				scrollWheel: true,
				zoomControl: true,
				maxZoom: 18,
				minZoom: 9,
				zoom: 11,
				center: results[0].geometry.location,
				restriction: {
					latLngBounds: (() => {
						if (loc.bounds) {
							return loc.bounds;
						}
						const bounds = results[0].geometry.bounds;
						if (bounds.Ua && bounds.La) {
							return {
								north: bounds.Ua.i,
								east: bounds.La.i,
								south: bounds.Ua.g,
								west: bounds.La.g,
							};
						}
						return {
							north: bounds.northeast.lat,
							east: bounds.northeast.lng,
							south: bounds.southwest.lat,
							west: bounds.southwest.lng,
						};
					})(),
				},
			});
			gtfs.map.zoom = gtfs.map.getZoom();
			gtfs.map.addListener('zoom_changed', (e) => {
				// Make Lines Thicker for Easier Reading
				if (gtfs.poly && typeof gtfs.poly === 'object') {
					const weightAdjust = (gtfs.map.zoom >= 14 ? gtfs.map.zoom - 13 : 6 - Math.floor((gtfs.map.zoom - 1) / 2));
					Object.values(gtfs.poly).forEach((poly) => {
						if (!gtfs.poly[i].Polyline) return;
						poly.Polyline.setOptions({
							strokeWeight: poly.weight + weightAdjust,
						});
					});
				}
			});
		} else {
			showNoGoogleError();
			console.log('Sam, Geocoder failed,', status);
		}
	});

	return;

	// Call loadGTFS on each location in travels.json
	// eg: gtfs.loadGTFS('js/hakone');
	console.log('loading gtfs for', locale.name);
	gtfs.postMessage([
		'loadGTFS',
		`${locale.cc}/${locale.name.toLowerCase().replace(/\W+/g, '_')}`,
	]);

$(document).ready(() => {
	// Highlight Routes
	element.on('click', 'section[data-route-id]', (e) => {
		if (!gtfs.routes) return; // TODO: Web Workers
		const isOpen = $(e.target).closest('section[data-route-id]').is('.active');
		let switching = $(e.target).closest('li[data-stop-id]').length > 0;
		// If switched Stops, don't reset Map
		if (isOpen && switching) {
			switching = switching && $(e.target).closest('li[data-stop-id]').is('.active');
		}
		// Highlight Route on Map
		if (!isOpen) {
			$('section[data-route-id].active').trigger('unfocus');
			const $s = $(e.target).closest('section[data-route-id]').addClass('active');
			const route_id = $s.data('route-id');
			const shape = gtfs.routes[route_id].shape;
			const pts = [];
			if (!shape || !gtfs.poly[shape]) return;
			gtfs.poly[shape].Polyline.setOptions({
				strokeWeight: 4,
				opacity: 1,
				zIndex: 1,
			});
			gtfs.routes[route_id].stops.forEach((s) => {
				pts.push(gtfs.stops[s]);
			});
			$('html,body').animate({scrollTop: 0}, 300, () => {
				if (pts.length) gtfs.setBounds(pts);
				else if (gtfs.map && gtfs.map.fitBounds) gtfs.map.fitBounds(gtfs.extremes);
			});
		} else if (!switching) {
			// Reset Map
			$('section[data-route-id].active').trigger('unfocus');
		}
	}).on('unfocus', (e) => {
		if (!gtfs.routes) return; // TODO: Web Workers
		const $s = $(e.target).closest('section[data-route-id]').removeClass('active');
		const route_id = $s.data('route-id');
		const shape = gtfs.routes[route_id].shape;
		if (!shape || !gtfs.poly[shape]) return
		if (gtfs.map && gtfs.map.fitBounds) gtfs.map.fitBounds(gtfs.extremes)
		gtfs.poly[shape].Polyline.setOptions({
			strokeWeight: gtfs.poly[shape].weight,
			opacity: gtfs.poly[shape].opacity || .6,
			zIndex: 0,
		});
	});

	// Show Station/Stop on Map
	element.on('click', 'li[data-stop-id]', (e) => {
		if (!gtfs.stops) return; // TODO: Web Workers
		const $t = $(e.target).closest('li[data-stop-id]');
		const id = $t.data('stop-id');
		const route_id = $t.parents('section[data-route-id]').data('route-id');
		const isOpen = gtfs.stops[id].Marker.getVisible();
		if ($(e.target).closest('section[data-route-id]').is('.active') || !$t.is('.active')) {
			gtfs.hideStops();
			$('li[data-stop-id].active').removeClass('active');
			$('section[data-route-id].highlighted').removeClass('highlighted');
			if (!isOpen) {
				$('li[data-stop-id="' + id + '"]').addClass('active').parents('section[data-route-id]').addClass('highlighted');
				gtfs.stops[id].Marker.setVisible(true);
				if (gtfs.map && gtfs.map.panTo) gtfs.map.panTo(gtfs.stops[id].Marker.getPosition());
			}
		}
	});
}).on('click', (e) => {
	if (!$(e.target).closest('section[data-route-id]').length && !$(e.target).closest('#google-maps').length) {
		$('section[data-route-id].active').trigger('unfocus');
	}
});

});

yodasws.on('page-loaded', () => {
	if (typeof $ === 'undefined' || !$) return;

	// Highlight Routes
	$('main').on('click', 'section[data-route-id]', (e) => {
		const isOpen = $(e.target).closest('section[data-route-id]').is('.active');
		let switching = $(e.target).closest('li[data-stop-id]').length > 0;
		// If switched Stops, don't reset Map
		if (isOpen && switching) {
			switching = switching && $(e.target).closest('li[data-stop-id]').is('.active');
		}
		// Highlight Route on Map
		if (!isOpen) {
			$('section[data-route-id].active').trigger('unfocus');
			var $s = $(e.target).closest('section[data-route-id]').addClass('active')
				route = $s.data('route-id'),
				shape = gtfs.routes[route].shape,
				pts = [];
			if (!shape || !gtfs.poly[shape]) return;
			gtfs.poly[shape].Polyline.setOptions({
				strokeWeight: 4,
				opacity: 1,
				zIndex: 1,
			});
			gtfs.routes[route].stops.forEach((s) => {
				pts.push(gtfs.stops[s]);
			});
			$('html, body').animate({ scrollTop: 0 }, 300, () => {
				if (pts.length) gtfs.setBounds(pts);
				else gtfs.map.fitBounds(gtfs.extremes);
			});
		} else if (!switching) {
			// Reset Map
			$('section[data-route-id].active').trigger('unfocus');
		}
	}).on('unfocus', (e) => {
		var $s = $(e.target).closest('section[data-route-id]').removeClass('active'),
			route = $s.data('route-id'),
			shape = gtfs.routes[route].shape;
		if (!shape || !gtfs.poly[shape]) return;
		gtfs.map.fitBounds(gtfs.extremes);
		gtfs.poly[shape].Polyline.setOptions({
			strokeWeight: gtfs.poly[shape].weight,
			opacity: gtfs.poly[shape].opacity || .6,
			zIndex: 0,
		});
	});
	$(document).on('click', (e) => {
		if (!$(e.target).closest('section[data-route-id]').length && !$(e.target).closest('#google-maps').length) {
			$('section[data-route-id].active').trigger('unfocus');
		}
	});
	// Show Station/Stop on Map
	$('main').on('click', 'li[data-stop-id]', (e) => {
		var $t = $(e.target).closest('li[data-stop-id]'),
			id = $t.data('stop-id'),
			route_id = $t.parents('section[data-route-id]').data('route-id'),
			isOpen = gtfs.stops[id].Marker.getVisible()
		if ($(e.target).closest('section[data-route-id]').is('.active') || !$t.is('.active')) {
			gtfs.hideStops();
			$('li[data-stop-id].active').removeClass('active');
			$('section[data-route-id].highlighted').removeClass('highlighted');
			if (!isOpen) {
				$('li[data-stop-id="' + id + '"]').addClass('active').parents('section[data-route-id]').addClass('highlighted');
				gtfs.stops[id].Marker.setVisible(true);
				gtfs.map.panTo(gtfs.stops[id].Marker.getPosition());
			}
		}
	});
});

const jsMaps = document.querySelector('script[src*="maps.google.com/maps/api/js"]');
if (jsMaps instanceof Element) {
	jsMaps.addEventListener('load', () => {
		/*
<?php
foreach ($_SESSION['gtfs_locs'] as $loc) {
	echo "gtfs.loadGTFS('$loc');";
}
?>
	/**/
	});
}
