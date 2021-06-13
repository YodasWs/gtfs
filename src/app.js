/* app.json */
function showNoGoogleError() {
	[...document.querySelectorAll('.no-google')].forEach((div) => {
		div.removeAttribute('hidden');
	});
	[...document.querySelectorAll('#google-maps')].forEach((el) => {
		el.setAttribute('hidden', 'hidden');
	});
}
function showNoWorkerError() {
	[...document.querySelectorAll('.no-workers')].forEach((div) => {
		div.removeAttribute('hidden');
	});
}

// TODO: Place DOM and Maps manipulation here
// TODO: Place Data manipulation in Worker
class GTFS extends Worker {
	constructor(...args) {
		super(...args);
		this.extremes = {
			north: -90,
			south: 90,
			east: -180,
			west: 180,
		};
		this.polylines = {};
		this.shapes = {};
	}

	enlargeExtremes(latlng) {
		if (latlng instanceof google.maps.LatLng) {
			this.extremes = {
				north: Math.max(this.extremes.north, latlng.lat()),
				south: Math.min(this.extremes.south, latlng.lat()),
				east: Math.max(this.extremes.east, latlng.lng()),
				west: Math.min(this.extremes.west, latlng.lng()),
			};
		}
		if (latlng instanceof google.maps.LatLngBounds) {
			this.extremes = {
				north: Math.max(this.extremes.north, latlng.Ua.i),
				south: Math.min(this.extremes.south, latlng.Ua.g),
				east: Math.max(this.extremes.east, latlng.La.i),
				west: Math.min(this.extremes.west, latlng.La.g),
			};
		}
		if (Number.isFinite(latlng.lat)) {
			this.extremes = {
				north: Math.max(this.extremes.north, latlng.lat),
				south: Math.min(this.extremes.south, latlng.lat),
			};
		}
		if (Number.isFinite(latlng.lng)) {
			this.extremes = {
				east: Math.max(this.extremes.east, latlng.lng),
				west: Math.min(this.extremes.west, latlng.lng),
			};
		}
		if (Number.isFinite(latlng.north)) {
			this.extremes.north = Math.max(this.extremes.north, latlng.north);
		}
		if (Number.isFinite(latlng.south)) {
			this.extremes.south = Math.min(this.extremes.south, latlng.south);
		}
		if (Number.isFinite(latlng.east)) {
			this.extremes.east = Math.max(this.extremes.east, latlng.east);
		}
		if (Number.isFinite(latlng.west)) {
			this.extremes.west = Math.min(this.extremes.west, latlng.west);
		}
		this.map.setOptions({
			restriction: {
				latLngBounds: this.extremes,
			},
		});
	}

	listAgencies(agencies) {
		if (!Array.isArray(agencies)) {
			return;
		}
		const main = document.querySelector('main');
		if (!(main instanceof Element)) {
			return;
		}

		let section = document.querySelector('section.agency');
		if (!(section instanceof Element)) {
			section = document.createElement('section');
			section.classList.add('agency');
		}

		agencies.forEach((agency) => {
			if (typeof agency !== 'object' || agency === null || !agency.agency_id) {
				return;
			}
			section.insertAdjacentHTML('beforeend', `<h1>${agency.agency_name}`);
			if (agency.agency_url) {
				section.insertAdjacentHTML('beforeend', `<a href="${agency.agency_url}" target="_blank">Agency Website`);
			}
		});
		main.appendChild(section);
	}

	listRoutes(routes) {
		if (!Array.isArray(routes)) {
			return;
		}
		const main = document.querySelector('main');
		if (!(main instanceof Element)) {
			return;
		}

		routes.forEach((route) => {
			let section = document.querySelector(`section[data-route-id="${route.route_id}"]`);
			if (!(section instanceof Element)) {
				section = document.createElement('section');
				section.setAttribute('data-route-id', route.route_id);
			}
			main.appendChild(section);

			if (route.route_short_name) {
				section.insertAdjacentHTML('beforeend', `<h1 style="background:#${route.route_color || 'ffffff'};color:#${route.route_text_color || '000000'}">&#x${route.x_route_icon};&#xfe0f; ${route.route_short_name}`);
				section.insertAdjacentHTML('beforeend', `<h2 style="background:#${route.route_color || 'ffffff'};color:#${route.route_text_color || '000000'}">&#x${route.x_route_icon};&#xfe0e; ${route.route_long_name}`);
			} else {
				section.insertAdjacentHTML('beforeend', `<h1 style="background:#${route.route_color || 'ffffff'};color:#${route.route_text_color || '000000'}">&#x${route.x_route_icon};&#xfe0f; ${route.route_long_name} &#x${route.x_route_icon};&#xfe0e;`);
			}
			if (typeof route.route_desc === 'string' && route.route_desc !== '') {
				section.insertAdjacentHTML('beforeend', `<div>${route.route_desc}`);
			}
		});
	}

	zoomChangePolylines(shape = null) {
		// TODO: Use shape.route_type to further adjust weight and opacity
		const adjust = {
			opacity: {
				rail: 1,
				bus: 1,
				etc: 1,
			},
			weight: {
				rail: 0,
				bus: 0,
				etc: 0,
			},
		};
		const routeTypeMap = new Map([
			[1, 'rail'],
			[7, 'bus'],
		]);
		let opacityAdjust = 1;
		if (this.map.zoom >= 10) {
			adjust.weight.rail = 1;
		}
		if (this.map.zoom >= 12) {
			adjust.weight.rail = 2;
		}
		if (this.map.zoom >= 14) {
			opacityAdjust = 1.5;
			adjust.weight.bus = this.map.zoom - 13;
			adjust.weight.rail = this.map.zoom - 12;
		}
		if (this.map.zoom >= 16) {
			adjust.weight.bus = this.map.zoom - 14;
		}
		Object.entries(
			typeof shape === 'object' && shape !== null ? {
				[shape.shape_id]: shape,
			} : this.shapes
		).forEach(([shape_id, shape]) => {
			if (this.polylines[shape.shape_id] instanceof google.maps.Polyline) {
				let route_type = 'etc';
				if (Number.parseInt(shape.route_type) >= 100) {
					const num = Math.floor(Number.parseInt(shape.route_type) / 100);
					if (routeTypeMap.has(num)) route_type = routeTypeMap.get(num);
				} else if (shape.route_type === '0') {
					route_type = 'rail';
				} else if (shape.route_type === '2') {
					route_type = 'rail';
				} else if (shape.route_type === '3') {
					route_type = 'bus';
				}
				this.polylines[shape.shape_id].setOptions({
					strokeOpacity: shape.opacity * opacityAdjust,
					strokeWeight: shape.weight + adjust.weight[route_type],
				});
			}
		});
	}

	drawPolylines(shapes) {
		if (google && this.map) {
			Object.values(shapes).forEach(this.drawPolyline.bind(this));
		}
	}

	drawPolyline(shape) {
		if (typeof google !== 'object' || typeof this.map !== 'object' || !Array.isArray(shape.path) || shape.path.length <= 1) {
			return;
		}
		this.shapes[shape.shape_id] = shape;
		console.log('Sam, bounds, drawing polyline,', shape.shape_id);
		if (!(this.polylines[shape.shape_id] instanceof google.maps.Polyline)) {
			this.polylines[shape.shape_id] = new google.maps.Polyline({
				geodesic: true,
				opacity: 0.6,
				clickable: true,
				map: this.map,
			});
		}
		this.polylines[shape.shape_id].setOptions({
			strokeColor: `#${shape.route_color || '008800'}`,
			zIndex: ((route_type) => {
				switch (Math.floor(Number.parseInt(route_type) / 100)) {
					case 1: // Railway
						return 10;
					case 7: // Bus Service
						return 0;
				}
				switch (route_type) {
					case '0': // Tram, Streetcar, Light rail
						return 8;
					case '1': // Metro, Subway
						return 9;
					case '2': // Rail
						return 10;
					case '3': // Bus
						return 0;
					case '1200': // Ferry Service
					case '4': // Ferry
						return 7;
					case '1300': // Aerial Lift
					case '6': // Aerial Lift
						return 6;
					case '1400': // Funicular
					case '7': // Funicular
						return 7;
					case '12': // Monorail
						return 9;
				}
				return 1;
			})(shape.route_type),
			path: shape.path,
		});
		this.zoomChangePolylines(shape);

		let bounds = {
			...this.extremes,
		};
		shape.path.forEach((pt) => {
			bounds = {
				north: Math.max(bounds.north, pt.lat),
				south: Math.min(bounds.south, pt.lat),
				east: Math.max(bounds.east, pt.lng),
				west: Math.min(bounds.west, pt.lng),
			};
		});
		this.enlargeExtremes(bounds);
	}

	listStops(routes) {
		Object.entries(routes).forEach(([route_id, stops]) => {
			console.log('Sam, listStops:', route_id, stops);
			let section = document.querySelector(`section[data-route-id="${route_id}"]`);
			if (!(section instanceof Element)) {
				console.error('Sam, route', route_id, 'not set?!');
				return;
			}
			if (!Array.isArray(stops) || stops.length === 0) {
				console.error('Sam, route', route_id, 'has no stops?!');
				return;
			}
			[...section.querySelectorAll('ol')].forEach(list => list.remove());
			const list = document.createElement('ol');
			stops.forEach((stop) => {
				list.insertAdjacentHTML('beforeend', `<li>${stop.stop_name}`);
			});
			section.appendChild(list);
		});
	}
};

yodasws.page('home').setRoute({
	template: 'pages/home.html',
	route: '/([a-z]{2}/([\\w-]+/)?)?',
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
				files: [
					'jp/hakone',
				],
			},
			'us/charlotte': {
				search: 'Charlotte, NC, USA',
				title: 'Charlotte',
				files: [
					'us/charlotte',
				],
			},
			'us/new-york': {
				search: 'New York City',
				title: 'New York City',
				files: [
					'us/nyc-subway',
					'us/nyc-bus',
				],
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

	loc.files.forEach((feed) => {
		gtfs.postMessage([
			'loadGTFS',
			feed,
		]);
	});

	(() => {
		// Show Page to User
		[...document.querySelectorAll('#google-maps, .gtfs')].forEach((el) => {
			el.removeAttribute('hidden');
		});
		// Set Page Title
		yodasws.setPageTitle(loc.title);
		const h2 = document.querySelector('main > h2');
		if (!(h2 instanceof Element)) return;
		h2.innerHTML = loc.title;
	})();

	// Require Google Maps JavaScript API
	if (typeof google !== 'object' || google === null || typeof google.maps !== 'object' || google.maps === null) {
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
		if (status !== 'OK') {
			showNoGoogleError();
			console.error('Sam, Geocoder failed,', status);
			return;
		}
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
			if (gtfs.polylines && typeof gtfs.polylines === 'object') {
				gtfs.zoomChangePolylines();
			}
		});
		const loadHandler = gtfs.map.addListener('tilesloaded', () => {
			// console.log('Sam, bounds, getting bounds');
			gtfs.enlargeExtremes(gtfs.map.getBounds());
			google.maps.event.removeListener(loadHandler);
		});
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
