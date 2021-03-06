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

const route_types = {
	tram: { // Tram, Streetcar, Light Rail
		minZoom: 10,
		zIndex: 90,
		icon: {
			url: 'pins/icons8-tram-32.png',
			scaledSize: { width: 22, height: 22, },
			anchor: { x: 11, y: 11 },
		},
	},
	metro: { // Subway, Metro
		minZoom: 14,
		zIndex: 95,
		icon: {
			url: 'pins/icons8-tram-32.png',
			scaledSize: { width: 22, height: 22, },
			anchor: { x: 11, y: 11 },
		},
	},
	rail: { // Rail
		minZoom: 12,
		zIndex: 100,
		icon: {
			url: 'pins/icons8-tram-32.png',
			scaledSize: { width: 22, height: 22, },
			anchor: { x: 11, y: 11 },
		},
	},
	bus: { // Bus
		minZoom: 15,
		zIndex: 0,
		icon: {
			url: 'pins/icons8-bus-32.png',
			scaledSize: { width: 22, height: 22, },
			anchor: { x: 11, y: 11 },
		},
	},
};

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
		this.eventAborts = new AbortController();
		this.polylines = {};
		this.shapes = {};
		this.stops = {};
	}

	getStopOptionsForRouteType(route_type) {
		const intRouteType = Number.parseInt(route_type);
		const options = (() => {
			if (typeof route_types[route_type] === 'object'
				&& route_types[route_type] !== null
				&& Number.isFinite(route_types[route_type])) {
				return route_types[route_type];
			}
			// if (route_type !== '3') console.log('Sam, getPinForType, route_type:', route_type);
			if (Number.isFinite(intRouteType)) {
				switch (Math.floor(intRouteType / 100)) {
					case 1: // Rail
						return route_types.rail;
					case 7: // Bus
						return route_types.bus;
					case 9: // Tram
						return route_types.tram;
				}
			}
			switch (route_type) {
				case '0': // Tram, Streetcar, Light Rail
					return route_types.tram;
				case '1': // Subway, Metro
					return route_types.metro;
				case '2': // Rail
					return route_types.rail;
				case '3': // Bus
					return route_types.bus;
				case '4': // Ferry
					return route_types.tram;
				case '5': // Cable Car
					return route_types.tram;
				case '6': // Aerial Lift
					return route_types.tram;
				case '7': // Funicular
					return route_types.tram;
				case '11': // Trolleyus
					return route_types.bus;
				case '12': // Monorail
					return route_types.metro;
			}
			return route_types.bus;
		})();
		// console.log('Sam, route_type', route_type, 'zIndex', zIndex);
		return {
			...options,
			minZoom: this.getMinZoomForRouteType(route_type),
		};
	}

	getPinForType(route_type) {
	}

	getMinZoomForRouteType(route_type) {
		if (typeof route_types[route_type] === 'object'
			&& route_types[route_type] !== null
			&& Number.isFinite(route_types[route_type].minZoom)) {
			return route_types[route_type].minZoom;
		}
		const intRouteType = Number.parseInt(route_type);
		if (Number.isFinite(intRouteType)) {
			switch (intRouteType) {
				case 107: // Tourist Rail
					return route_types.rail.minZoom + 1;
				case 107: // Shuttle Rail
					return route_types.bus.minZoom;
			}
			switch (Math.floor(intRouteType / 100)) {
				case 1: // Rail
					return route_types.rail.minZoom;
				case 4: // Urban Rail
					return route_types.metro.minZoom;
				case 7: // Bus
					return route_types.bus.minZoom;
				case 8: // Trolleybus
					return route_types.bus.minZoom;
				case 9: // Tram
					return route_types.tram.minZoom;
			}
		}
		return 16;
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

		// Add to DOM
		routes.forEach((route) => {
			let section = document.querySelector(`section[data-route-id="${route.route_id}"]`);
			if (section instanceof Element && section.querySelector('h1') instanceof Element) {
				// Route box already on page, move on
				return;
			}

			section = document.createElement('section');
			section.setAttribute('data-route-id', route.route_id);
			section.setAttribute('data-route-type', route.route_type);
			section.setAttribute('data-route-short-name', route.route_short_name);
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

		// Attach event listener to highlight route
		this.eventAborts.abort();
		this.eventAborts = new AbortController();
		[...document.querySelectorAll('section[data-route-id] > h1, section[data-route-id] > h2')].forEach((section) => {
			section.addEventListener('click', this.activateRoute.bind(this), {
				signal: this.eventAborts.signal,
			});
		});

		// Sort routes in order in DOM
		[...document.querySelectorAll('section[data-route-id]')].sort((a, b) => {
			const aRouteType = a.getAttribute('data-route-type');
			const bRouteType = b.getAttribute('data-route-type');
			// TODO: Do this sort in the DOM so to apply to all agencies/files
			if (aRouteType !== bRouteType) {
				const a_num = Number.parseInt(aRouteType);
				const b_num = Number.parseInt(bRouteType);
				if (Number.isFinite(a_num) && Number.isFinite(b_num) && a_num !== b_num) {
					const aIsBus = a_num === 3 || Math.floor(a_num / 100) === 7;
					const bIsBus = b_num === 3 || Math.floor(b_num / 100) === 7;
					// Both buses, sort by code
					if (aIsBus && bIsBus) {
						return a_num - b_num;
					}
					// Bus is lowest priority
					if (aIsBus !== bIsBus) {
						if (aIsBus) return 1;
						if (bIsBus) return -1;
					}
					if (Math.floor(a_num / 100) !== Math.floor(b_num / 100)) {
						if (Math.floor(a_num / 100) == 8) return 1; // Trolleybus Service
						if (Math.floor(b_num / 100) == 8) return -1; // Trolleybus Service
						if (Math.floor(a_num / 100) == 2) return 1; // Coach Service
						if (Math.floor(b_num / 100) == 2) return -1; // Coach Service
					}
					return a_num - b_num;
				}
			}
			const aRouteName = a.getAttribute('data-route-short-name');
			const bRouteName = b.getAttribute('data-route-short-name');
			if (aRouteName && bRouteName) {
				const a_num = Number.parseInt(aRouteName);
				const b_num = Number.parseInt(bRouteName);
				if (Number.isFinite(a_num) && Number.isFinite(b_num) && a_num !== b_num) {
					return a_num - b_num;
				}
				return aRouteName.localeCompare(bRouteName);
			}
			return 0;
		}).forEach((section) => {
			main.appendChild(section);
		});
		return;
	}

	activateRoute(event) {
		const section = event.target.closest('section[data-route-id]');
		if (!(section instanceof Element)) return;
		const unhighlight = section.classList.contains('highlighted');
		// Unhighlight other routes
		[...document.querySelectorAll('section[data-route-id].highlighted')].forEach((s) => {
			const route_id = s.getAttribute('data-route-id');
			if (typeof this.stops[route_id] === 'object' && this.stops[route_id] !== null) {
				Object.entries(this.stops[route_id]).forEach(([stop_id, stop]) => {
					stop.highlighted = false;
					stop.setVisible(false);
				});
			}
			s.classList.remove('highlighted');
			const ol = s.querySelector('ol');
			if (ol instanceof Element) {
				ol.style.maxHeight = '0';
			}
		});
		if (!unhighlight) {
			// Hightlight the selected section
			section.classList.add('highlighted');
			// Make list of stops visible
			const ol = section.querySelector('ol');
			if (ol instanceof Element) {
				ol.style.maxHeight = `${ol.getAttribute('data-max-height')}px`;
			}
		}
		const route_id = section.getAttribute('data-route-id');
		console.log('Sam, activateRoute:', route_id);
		// Highlight route on map
		Object.entries(this.shapes).forEach(([shape_id, shape]) => {
			shape.highlighted = false;
			if (!shape.routes.has(route_id)) return;
			if (unhighlight) return;
			shape.highlighted = true;
			this.polylines[shape.shape_id].setOptions({
				strokeOpacity: 0.9,
				strokeWeight: 9,
				zIndex: 100,
			});
		});
		// Update Map
		if (!unhighlight && typeof this.stops[route_id] === 'object' && this.stops[route_id] !== null) {
			Object.entries(this.stops[route_id]).forEach(([stop_id, stop]) => {
				stop.setOptions(this.getStopOptionsForRouteType(stop.route_type));
				stop.highlighted = true;
				stop.setVisible(true);
			});
		}
		this.zoomChangePolylines();
		if (!unhighlight) {
			section.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
			setTimeout(() => {
				section.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			}, 1000);
			/*
			const elMap = document.querySelector('#google-maps');
			if (elMap instanceof Element) {
				elMap.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});
			}
			/**/
		}
	}

	zoomChangePolylines(shape = null) {
		// TODO: Use shape.route_type to further adjust weight and opacity
		// TODO: Use agency_id to further refine weight and opacity
		// (Because thick lines are good for Hakone and Charlotte, but not densely-packed New York City)
		(() => {
			if (typeof this.polylines !== 'object' || this.polylines === null) return;
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

			// Make Lines Thicker for Easier Reading
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
				if (shape.highlighted) return;
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
		})();

		(() => {
			if (typeof this.stops !== 'object' || this.stops === null) return;
			// Update visibility of Stops
			Object.entries(this.stops).forEach(([route_id, stops]) => {
				Object.entries(stops).forEach(([stop_id, stop]) => {
					if (this.map.zoom >= this.getMinZoomForRouteType(stop.route_type)) {
						stop.setVisible(true);
					} else if (!stop.highlighted) {
						stop.setVisible(false);
					}
				});
			});
		})();
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
		if (!(this.polylines[shape.shape_id] instanceof google.maps.Polyline)) {
			this.polylines[shape.shape_id] = new google.maps.Polyline({
				geodesic: true,
				opacity: 0.6,
				clickable: true,
				map: this.map,
			});
		}
		const zIndex = ((route_type) => {
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
		})(shape.route_type);
		this.polylines[shape.shape_id].setOptions({
			strokeColor: `#${shape.route_color || '008800'}`,
			zIndex,
			path: shape.path,
		});
		this.zoomChangePolylines(shape);
	}

	// Add Stops to Routes and Map
	listStops(routes) {
		Object.entries(routes).forEach(([route_id, stops]) => {
			console.log('Sam, listStops:', route_id, stops);
			let section = document.querySelector(`section[data-route-id="${route_id}"]`);
			if (!(section instanceof Element)) {
				console.error('Sam, route', route_id, 'not set?!');
				return;
			}
			if (!Array.isArray(stops) || stops.length === 0) {
				// Nothing to list, just move on
				return;
			}
			[...section.querySelectorAll('ol')].forEach(list => list.remove());
			if (typeof this.stops[route_id] !== 'object' || this.stops[route_id] === null) {
				this.stops[route_id] = {};
			}
			const list = document.createElement('ol');
			const route_type = section.getAttribute('data-route-type');
			stops.forEach((stop) => {
				const li = document.createElement('li');
				let title = stop.stop_name;
				if (typeof stop.stop_code === 'string' && stop.stop_code !== '') {
					title = `${stop.stop_code}. ${stop.stop_name}`;
					if (Number.isFinite(Number.parseInt(stop.stop_code))) {
						// li.setAttribute('value', stop.stop_code);
						// li.innerHTML = stop.stop_name;
					} else {
					}
						li.innerHTML = `${stop.stop_name} (${stop.stop_code})`;
				} else {
					li.innerHTML = stop.stop_name;
				}
				list.appendChild(li);
				if (!(this.stops[route_id][stop.stop_id] instanceof google.maps.Marker)) {
					this.stops[route_id][stop.stop_id] = new google.maps.Marker({
						...this.getStopOptionsForRouteType(route_type),
						position: {
							lat: Number.parseFloat(stop.stop_lat),
							lng: Number.parseFloat(stop.stop_lon),
						},
						visible: false,
						map: this.map,
						title,
					});
					// TODO: Add info windows
				}
				this.stops[route_id][stop.stop_id].route_type = route_type;
			});
			section.appendChild(list);
			// Set max-height on list
			list.setAttribute('data-max-height', list.offsetHeight);
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
					'us/nyc-bx-bus',
					'us/nyc-si-bus',
					'us/nyc-subway',
					'us/nyc-b-bus',
					'us/nyc-m-bus',
					'us/nyc-q-bus',
					'us/nyc-lirr',
					'us/nyc-path',
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

	const ROOT = window.location.hostname === 'yodasws.github.io' ? 'gtfs/' : '';
	loc.files.forEach((feed) => {
		gtfs.postMessage([
			'loadGTFS',
			`${ROOT}${feed}`,
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
		});
		gtfs.map.zoom = gtfs.map.getZoom();
		gtfs.map.addListener('zoom_changed', (e) => {
			gtfs.zoomChangePolylines();
			console.log('Sam, zoom:', gtfs.map.zoom);
		});
	});
});

yodasws.on('page-loaded', () => {
	if (typeof $ === 'undefined' || !$) return;

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
