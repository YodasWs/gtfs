// Extend String.prototype.trim to PHP behavior to remove more than just white space
String.prototype.trim=function(chars){return this.replace(new RegExp('^['+(chars||'\\uffef\\u00a0\\s')+']+|['+(chars||'\\uffef\\u00a0\\s')+']+$','g'),'')};

function csv(str) {
	let rows = str.trim().split('\n');
	rows = rows.map((row, i) => {
		// https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data
		let cells = row.match(/(?!\s+$)\s*('([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g);
		if (Array.isArray(cells)) {
			cells = cells.map(t => t.trim().trim(',"').trim());
		}
		return cells;
	});
	const header = {};
	rows.shift().forEach((h, i) => {
		header[i] = h.trim();
	});
	return rows.map(row => row.reduce((obj, cell, i) => {
		if (typeof header[i] === 'string' && header[i] !== '') {
			obj[header[i]] = cell;
		}
		return obj;
	}, {}));
}

function ajax({
	url,
} = {
}) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (Math.floor(xhr.status / 100) === 2) {
					resolve(csv(xhr.response));
				} else {
					reject();
				}
			}
		};
		xhr.open('GET', url);
		xhr.send();
	});
};

// TODO: Place Data manipulation here
// TODO: Place DOM and Maps manipulation in app.js
globalThis.gtfs = {
	extremes: { north: -90, south: 180, east: -180, west: 180 },
	routes: {},
	shapes: {},
	stops: {},
	trips: {},

	tripRoute: {},

	updateRoute(route_id, route = null) {
		this.routes[route_id] = {
			shapes: new Set(),
			trips: new Set(),
			...this.routes[route_id],
			...route,
			route_id,
		};
	},

	updateShape(shape_id, shape = null) {
		this.shapes[shape_id] = {
			routes: new Set(),
			trips: new Set(),
			...this.shapes[shape_id],
			...shape,
			shape_id,
		};
		postMessage(['drawPolyline', this.shapes[shape_id]]);
	},

	updateTrip(trip_id, trip = null) {
		this.trips[trip_id] = {
			...this.trips[trip_id],
			...trip,
			trip_id,
		};
	},

	// Alphabetical order: Route, Shape, Trip
	linkRouteShapeTrip(route_id, shape_id, trip_id) {
		// Link Route to Trip
		if (this.routes[route_id] === null || typeof this.routes[route_id] !== 'object') {
			this.updateRoute(route_id);
		}
		const route = this.routes[route_id];
		route.trips.add(trip_id);

		// Find and link Shape
		if (typeof shape_id === 'string' && shape_id !== '') {
			// Get Shape
			if (this.shapes[shape_id] === null || typeof this.shapes[shape_id] !== 'object') {
				this.updateShape(shape_id);
			}
			const shape = this.shapes[shape_id];
			route.shapes.add(shape_id);
			shape.routes.add(route_id);
			shape.trips.add(trip_id);
		}
	},

	setShapesStroke() {
		Object.entries(this.shapes).forEach(([shape_id, shape]) => {
			const newShape = {
				route_color: undefined,
				route_type: undefined,
				opacity: 0.5,
				weight: 1,
			};
			if (!(shape.routes instanceof Set)) {
				shape.routes = new Set();
			}
			shape.routes.forEach((route_id) => {
				const route = this.routes[route_id];
				if (typeof route.route_color === 'string' && route.route_color !== '') {
					newShape.route_color = route.route_color;
				}
				if (typeof route.route_type === 'string' && route.route_type !== '') {
					newShape.route_type = route.route_type;
					// First, 3-digit code
					switch (Math.floor(Number.parseInt(route.route_type))) {
						case 1: // Railway Service
							newShape.opacity = 0.7;
							newShape.weight = 3;
							return;
						case 7: // Bus Service
							if (route.route_type === '701') {
								// Regional Bus Service
								newShape.weight = 2;
								return;
							}
							if (route.route_type === '702') {
								// Express Bus Service
								newShape.opacity = 0.4;
								newShape.weight = 2;
								return;
							}
							// Local, Other Bus Service
							newShape.opacity = 0.4;
							return;
					}
					switch (route.route_type) {
						case '0': // Tram, Streetcar, Light rail
							newShape.opacity = 0.7;
							newShape.weight = 2;
							break;
						case '1': // Metro, Subway
							newShape.opacity = 0.7;
							newShape.weight = 2;
							break;
						case '2': // Rail
							newShape.opacity = 0.7;
							newShape.weight = 3;
							break;
						case '3': // Bus
							newShape.opacity = 0.4;
							break;
						case '1200': // Ferry
						case '4': // Ferry
							newShape.opacity = 1;
							newShape.weight = 2;
							break;
						case '5': // Cable Car
							// newShape.weight = 2;
							break;
						case '1300': // Aerial Lift
						case '6': // Gondola
							newShape.opacity = 0.4;
							newShape.weight = 2;
							break;
						case '1400': // Funicular
						case '7': // Funicular
							newShape.opacity = 0.7;
							newShape.weight = 2;
							break;
						case '11': // Trolleybus
							break;
						case '12': // Monorail
							newShape.opacity = 0.7;
							newShape.weight = 2;
							break;
					}
				}
			});
			this.updateShape(shape_id, newShape);
		});
	},

	// Load and Draw GTFS Shapes
	loadGTFS(url) {
		// Load and list agencies
		ajax({
			url: `/gtfs/${url}/agency.txt`,
		}).then((agencies) => {
			setTimeout(() => {
			console.log('Sam, agencies:', agencies);
			postMessage(['listAgencies', agencies]);
			this.loadedFiles = 'agency.txt';
			}, Math.random() * 1000);
		});

		ajax({
			url: `/gtfs/${url}/routes.txt`,
		}).then((routes) => {
			setTimeout(() => {
			// Sort routes by type then number/name
			routes.forEach((route) => {
				// Set Route Icon (emoji)
				if (typeof route.x_route_icon !== 'string' || route.x_route_icon === '') {
					switch (route.route_type) {
						case '107': // Tourist Railway
						case '0': // Tram, Streetcar, Light rail
							route.x_route_icon = '1f688';
							break;
						case '900': // Tram, Streetcar
							route.x_route_icon = '1f68b';
							break;
						case '1': // Metro, Subway
							route.x_route_icon = '1f687';
							break;
						case '100': // Railway
						case '2': // Rail
							route.x_route_icon = '1f686';
							break;
						case '101': // High Speed Rail
							route.x_route_icon = '1f684';
							break;
						case '200': // Coach Service
							route.x_route_icon = '1f68d';
							break;
						case '704': // Local Bus
						case '3': // Bus
							route.x_route_icon = '1f68c';
							break;
						case '711': // Shuttle Bus, Minibus
							route.x_route_icon = '1f690';
							break;
						case '1200': // Ferry
						case '4': // Ferry
							route.x_route_icon = '26f4';
							break;
						case '5': // Cable Car
							route.x_route_icon = '1f683';
							break;
						case '1300': // Aerial Lift
						case '6': // Gondola
							route.x_route_icon = '1f6a0';
							break;
						case '1400': // Funicular
						case '7': // Funicular
							route.x_route_icon = '1f69e';
							break;
						case '11': // Trolleybus
							route.x_route_icon = '1f68e';
							break;
						case '12': // Monorail
							route.x_route_icon = '1f69d';
							break;
						default:
							route.x_route_icon = '1f68d';
					}
				}
				this.updateRoute(route.route_id, route);
			});
			console.log('Sam, this.routes:', this.routes);
			postMessage(['listRoutes', routes]);
			this.loadedFiles = 'routes.txt';
			}, Math.random() * 1000);
		});

		ajax({
			url: `/gtfs/${url}/trips.txt`,
		}).then((trips) => {
			setTimeout(() => {
			trips.forEach((trip) => {
				this.linkRouteShapeTrip(trip.route_id, trip.shape_id, trip.trip_id);
				this.updateTrip(trip.trip_id, trip);
			});
			console.log('Sam, this.trips:', this.trips);
			this.loadedFiles = 'trips.txt';
			}, Math.random() * 1000);
		});

		// Load and draw shapes
		ajax({
			url: `/gtfs/${url}/shapes.txt`,
		}).then((shapes) => {
			setTimeout(() => {
			const points = {};
			shapes.forEach((point) => {
				points[point.shape_id] ??= [];
				points[point.shape_id].push({
					lat: Number.parseFloat(point.shape_pt_lat),
					lng: Number.parseFloat(point.shape_pt_lon),
					seq: Number.parseFloat(point.shape_pt_sequence),
				});
			});
			Object.entries(points).forEach(([shape_id, path]) => {
				path.sort((a, b) => a.seq - b.seq);
				this.updateShape(shape_id, {
					path,
				});
			});
			this.loadedFiles = 'shapes.txt';
			console.log('Sam, this.shapes:', this.shapes);
			}, Math.random() * 1000);
		});

		// Load stops information
		ajax({
			url: `/gtfs/${url}/stops.txt`,
		}).then((stops) => {
			setTimeout(() => {
			stops.forEach((stop) => {
				this.stops[stop.stop_id] = stop;
			});
			console.log('Sam, this.stops:', this.stops);
			this.loadedFiles = 'stops.txt';
			}, Math.random() * 1000);
		});

		// Add stops to routes/trips
		ajax({
			url: `/gtfs/${url}/stop_times.txt`,
		}).then((stop_times) => {
			setTimeout(() => {
			console.log('Sam, stop_times:', stop_times);
			const trips = {};
			stop_times.forEach((st) => {
				if (trips[st.trip_id] === null || typeof trips[st.trip_id] !== 'object') {
					trips[st.trip_id] = {
						trip_id: st.trip_id,
						stops: [],
					};
				}
				trips[st.trip_id].stops.push(st);
			});
				Object.values(trips).forEach((trip) => {
					this.updateTrip(trip.trip_id, trip);
				});
			this.loadedFiles = 'stop_times.txt';
			}, Math.random() * 1000);
		});

		// TODO: Cache txt files in Cache
		// https://developer.mozilla.org/en-US/docs/Web/API/Cache
	},

	/// OLD CODE BELOW

	setBounds(pts) {
		const bounds = {
			north: -90,
			south: 90,
			east: -180,
			west: 180,
		};
		pts.forEach((p) => {
			bounds.south = Math.min(bounds.south, p.lat);
			bounds.north = Math.max(bounds.north, p.lat);
			bounds.east = Math.max(bounds.east, p.lng);
			bounds.west = Math.min(bounds.west, p.lng);
		});
		this.map.fitBounds(bounds);
	},
};

(() => {
	const loadedFiles = new Set();
	Object.defineProperties(gtfs, {
		loadedFiles: {
			get() {
				return loadedFiles;
			},
			set(value) {
				loadedFiles.add(value);
				console.log('Sam, loadedFiles add', value);

				if ([
					'stop_times.txt', // List of stops for each trip
					'stops.txt', // Stop information
					'trips.txt', // Connects routes to pre-defined shapes
					'routes.txt', // Defines the routes
				].every((file) => loadedFiles.has(file))) {
					// TODO: Take into account block_id
					// TODO: For my hakone data, block_id means multiple shapes for one "route"
					// TODO: Research how real-world agencies use block_id
					// TODO: Google docs appear to infer that block_id is used only for differences in service days, not the actual, physical stops served
					const longestTripPerRoute = {};
					Object.values(this.trips).forEach((trip) => {
						if (!Array.isArray(longestTripPerRoute[trip.route_id])) {
							longestTripPerRoute[trip.route_id] = [];
						}
						if (Array.isArray(trip.stops) && trip.stops.length > longestTripPerRoute[trip.route_id].length) {
							longestTripPerRoute[trip.route_id] = trip.stops;
						}
					});

					// Use longest trip to list stops and form new shape
					Object.entries(longestTripPerRoute).forEach(([route_id, stops]) => {
						if (!Array.isArray(stops) || stops.length === 0) return;
						const route = this.routes[route_id];
						if (typeof route !== 'object' || route === null) return;
						const routeHasShape = route.shapes instanceof Set && route.shapes.size > 0;
						const path = [];
						stops.sort((a, b) => {
							return Number.parseFloat(a.stop_sequence) - Number.parseFloat(b.stop_sequence);
						}).forEach((stop, i, array) => {
							array[i] = {
								...stop,
								...this.stops[stop.stop_id],
							};
							if (!routeHasShape) {
								path.push({
									lat: Number.parseFloat(array[i].stop_lat),
									lng: Number.parseFloat(array[i].stop_lon),
									seq: Number.parseFloat(array[i].stop_sequence),
								});
							}
						});
						// Use trip_id as shape_id and link to Route
						if (!routeHasShape) {
							this.linkRouteShapeTrip(route_id, stops[0].trip_id, stops[0].trip_id);
							this.updateShape(stops[0].trip_id, {
								opacity: 0.5,
								weight: 1,
								path,
							});
						}
					});
					postMessage(['listStops', longestTripPerRoute]);
					// Routes and Shapes have been linked, update Shape with Route information
					this.setShapesStroke();
				}
			},
		},
	});
})();

onmessage = (e) => {
	const [fn, ...args] = e.data;
	if (typeof gtfs[fn] === 'function') {
		gtfs[fn](...args);
	}
}
