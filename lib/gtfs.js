// Extend String.prototype.trim to PHP behavior to remove more than just white space
String.prototype.trim=function(chars){return this.replace(new RegExp('^['+(chars||'\\uffef\\u00a0\\s')+']+|['+(chars||'\\uffef\\u00a0\\s')+']+$','g'),'')};

function csv(str) {
	let rows = str.trim().split('\n');
	rows = rows.map((row, i) => {
		// https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data
		let cells = row.match(/(?!\s+$)\s*('([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g);
		if (Array.isArray(cells)) {
			cells = cells.map(t => t.trim(',"'));
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

globalThis.gtfs = {
	extremes: { north: -90, south: 180, east: -180, west: 180 },
	loadedFiles: [],
	tripRoute: {},
	routes: {},
	stops: {},
	poly: {},
	setShapeRoute(shape, route) {
		this.poly[shape] = this.poly[shape] || {}
		if (this.routes[route]) {
			this.routes[route].shape = shape;
			if (!this.poly[shape].color && this.routes[route].color) {
				this.poly[shape].color = this.routes[route].color;
			}
			switch (Number.parseInt(this.routes[route].type, 10)) {
				case 2: // Rail
					this.poly[shape].opacity = 1
					this.poly[shape].weight = 3
					break;
				case 3: // Bus
					this.poly[shape].weight = 2
					break;
				case 5: // Cable Car
					this.poly[shape].weight = 2
					break;
				case 6: // Gondola
					this.poly[shape].opacity = 1
					this.poly[shape].weight = 2
					break;
				case 7: // Funicular
					this.poly[shape].opacity = 1
					this.poly[shape].weight = 2
					break;
			}
		}
		if (this.poly[shape].Polyline) {
			if (this.poly[shape].opacity) this.poly[shape].Polyline.setOptions({opacity: this.poly[shape].opacity})
			if (this.poly[shape].weight) this.poly[shape].Polyline.setOptions({strokeWeight: this.poly[shape].weight})
			if (this.poly[shape].color) this.poly[shape].Polyline.setOptions({strokeColor: this.poly[shape].color})
		}
	},
	setBounds(pts) {
		const bounds = {
			north: -90,
			south: 180,
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
	saveShapePoint(shape, lat, lng) {
		// Save Shape Point
		this.poly[shape] = this.poly[shape] || {};
		this.poly[shape].path = this.poly[shape].path || [];
		this.poly[shape].path.push({ lat, lng });
	},
	parseStops(data) {
		const rows = data.split('\n');
		const head = csv.parseHeader(rows.shift());
		rows.forEach((r) => {
			r = csv.splitRow(r);
			if (!r || r[head.stop_id] == '') return;
			// Save Pertinent Stop Information for easy retrieval
			this.stops[r[head.stop_id]] = {
				lat: Number.parseFloat(r[head.stop_lat]),
				lng: Number.parseFloat(r[head.stop_lon]),
				name: r[head.stop_name],
				// Place Google Maps Marker
				Marker: new google.maps.Marker({
					position:{
						lat: Number.parseFloat(r[head.stop_lat]),
						lng: Number.parseFloat(r[head.stop_lon]),
					},
					icon:{
						url:'http://chart.apis.google.com/chart?chst=d_map_xpin_letter&chld=pin%7C%20%7CFE7569',
						anchor:new google.maps.Point(11,34),
						origin:new google.maps.Point(0,0),
						size:new google.maps.Size(21,34),
					},
					title: r[head.stop_name],
					visible: false,
					map: this.map,
				}),
			};
		});
		$(document).trigger($.Event('loaded', { file:'stops.txt' }));
	},
	// Load and Draw GTFS Shapes
	async loadGTFS(url) {
		ajax({
			url: `/gtfs/${url}/agency.txt`,
		}).then((agencies) => {
			console.log('Sam, agencies:', agencies);
			postMessage(['listAgencies', agencies]);
		});

		ajax({
			url: `/gtfs/${url}/routes.txt`,
		}).then((routes) => {
			routes.sort((a, b) => {
				if (a.route_type !== b.route_type) {
					const a_num = Number.parseInt(a.route_type);
					const b_num = Number.parseInt(b.route_type);
					if (Number.isFinite(a_num) && Number.isFinite(b_num) && a_num !== b_num) {
						if (a_num === 3) return 1;
						if (b_num === 3) return -1;
						return a_num - b_num;
					}
				}
				if (a.route_short_name && b.route_short_name) {
					const a_num = Number.parseInt(a.route_short_name);
					const b_num = Number.parseInt(b.route_short_name);
					if (Number.isFinite(a_num) && Number.isFinite(b_num) && a_num !== b_num) {
						return a_num - b_num;
					}
					return a.route_short_name.localeCompare(b.route_short_name);
				}
				return 0;
			}).forEach((route) => {
				console.log('Sam,', route.route_id, route.route_type, route.x_route_icon);
				// TODO: Use route_type
				if (!route.x_route_icon) {
					switch (route.route_type) {
						case '0':
							route.x_route_icon = '1f688';
							break;
						case '1':
							route.x_route_icon = '1f687';
							break;
						case '2':
							route.x_route_icon = '1f686';
							break;
						case '3':
							route.x_route_icon = '1f68c';
							break;
						case '4':
							route.x_route_icon = '26f4';
							break;
						case '5':
							route.x_route_icon = '1f683';
							break;
						case '6':
							route.x_route_icon = '1f6a0';
							break;
						case '7':
							route.x_route_icon = '1f69e';
							break;
						case '11':
							route.x_route_icon = '1f68e';
							break;
						case '12':
							route.x_route_icon = '1f69d';
					}
				}
				route.x_route_icon = `&#x${route.x_route_icon || '1f68d'};&#xfe0f;`;
				route.route_text_color = `#${route.route_text_color || '000000'}`;
				route.route_color = `#${route.route_color || 'ffffff'}`;
				route.stops = [];
			});
			console.log('Sam, routes:', routes);
			postMessage(['listRoutes', routes]);
		});

		ajax({
			url: `/gtfs/${url}/trips.txt`,
		}).then((trips) => {
			console.log('Sam, trips:', trips);
			trips.forEach((trip) => {
				postMessage(['addRouteToShape', trip.shape_id, trip.route_id]);
			});
		});

		ajax({
			url: `/gtfs/${url}/shapes.txt`,
		}).then((shapes) => {
			console.log('Sam, shapes:', shapes);
			const points = {};
			shapes.forEach((point) => {
				points[point.shape_id] ??= [];
				points[point.shape_id].push({
					lat: Number.parseFloat(point.shape_pt_lat),
					lng: Number.parseFloat(point.shape_pt_lon),
					seq: Number.parseFloat(point.shape_pt_sequence),
				});
			});
			Object.entries(points).forEach(([id, path]) => {
				path.sort((a, b) => a.seq - b .seq);
				postMessage(['updateShape', id, {
					path,
				}]);
			});
		});

		ajax({
			url: `/gtfs/${url}/stops.txt`,
		}).then((stops) => {
			console.log('Sam, stops:', stops);
		});

		ajax({
			url: `/gtfs/${url}/stop_times.txt`,
		}).then((stop_times) => {
			console.log('Sam, stop_times:', stop_times);
		});

		// TODO: Cache txt files in Cache
		// https://developer.mozilla.org/en-US/docs/Web/API/Cache

		return;

		$.ajax({
			url:'/gtfs/' + url + '/trips.txt',
			dateType:'text',
			success: (data) => {
				const rows = data.split('\n');
				const head = csv.parseHeader(rows.shift())
				if (head.shape_id || head.shape_id === 0) {
					rows.forEach((r) => {
						r = r.split(',');
						if (!r || r[head.trip_id] == '') return;
						route = r[head.route_id];
						shape = r[head.shape_id];
						// Associate Shape to Route
						if (shape != '') this.setShapeRoute(shape, route);
						// Associate Trip to Route
						this.tripRoute[r[head.trip_id]] = route;
					});
				}
				$(document).trigger($.Event('loaded', { file:'trips.txt' }));
			},
		});

		$.ajax({
			url:'/gtfs/' + url + '/shapes.txt',
			dateType:'text',
			success: (data) => {
				const rows = data.split('\n')
				const head = csv.parseHeader(rows.shift())
				rows.forEach((r) => {
					r = csv.splitRow(r);
					if (!r || r[head.shape_id] == '') return;
					// Save Shape Point
					this.poly[r[head.shape_id]] = this.poly[r[head.shape_id]] || {};
					this.poly[r[head.shape_id]].path = this.poly[r[head.shape_id]].path || [];
					this.poly[r[head.shape_id]].path.push({
						lat: Number.parseFloat(r[head.shape_pt_lat]),
						lng: Number.parseFloat(r[head.shape_pt_lon]),
					});
					// Save Extreme Points for Map Bounds
					this.extremes.south = Math.min(this.extremes.south, Number.parseFloat(r[head.shape_pt_lat]));
					this.extremes.north = Math.max(this.extremes.north, Number.parseFloat(r[head.shape_pt_lat]));
					this.extremes.east = Math.max(this.extremes.east, Number.parseFloat(r[head.shape_pt_lon]));
					this.extremes.west = Math.min(this.extremes.west, Number.parseFloat(r[head.shape_pt_lon]));
				});
				// Set Map Bounds
				this.map.fitBounds(this.extremes);
				// Paste Shapes on Map
				Object.values(this.poly).forEach((i) => {
					poly.Polyline = new google.maps.Polyline({
						path: poly.path,
						geodesic: true,
						strokeColor: poly.color || '#008800',
						strokeWeight: poly.weight || 2,
						opacity: poly.opacity || .6,
						strokeOpacity: 1,
						clickable: true,
					});
					poly.Polyline.setMap(this.map);
					// TODO: When Polyline clicked, activate Route Stop List
				});
				// yodasws.fire('loaded', { file: 'shapes.txt' });
			},
		});

		if (
			!localStorage.getItem('gtfs.' + url + '.stops.date')
			|| !localStorage.getItem('gtfs.' + url + '.stops.text')
			|| Number.parseInt(localStorage.getItem('gtfs.' + url + '.stops.date'), 10) < Date.now() - 1000 * 60 * 60 * 24 * 7
		) {
			$.ajax({
				url:'/gtfs/' + url + '/stops.txt',
				success: (data) => {
					this.parseStops(data);
					localStorage.setItem('gtfs.' + url + '.stops.date', Date.now());
					localStorage.setItem('gtfs.' + url + '.stops.text', data);
				},
			});
		} else {
			this.parseStops(localStorage.getItem('gtfs.' + url + '.stops.text'))
		}

		$.ajax({
			url:'/gtfs/' + url + '/stop_times.txt',
			success: (data) => {
				const rows = data.split('\n');
				const head = csv.parseHeader(rows.shift());
				rows.forEach((r) => {
					r = r.split(',');
					const trip_id = r[head.trip_id];
					const stop_id = r[head.stop_id];
					const route_id = this.tripRoute[trip_id];
					if (!r[head.stop_id]) return;
					if (
						this.routes[route_id] && this.routes[route_id].stops &&
						this.routes[route_id].stops[this.routes[route_id].stops.length - 1] != stop_id
					) {
						this.routes[route_id].stops.push(stop_id);
					}
					if (this.routes[route_id] && !this.routes[route_id].shape) {
						this.routes[route_id].shape = trip_id;
					}
				})
				// Build Lists of Route Stations
				for (i in this.routes) {
					const r = this.routes[i], $l = $('<ol>');
					$t = $('<section data-route-id="' + i + '">');
					if (r.num) {
						$t.append('<h1 style="background:' + r.color + ';color:' + r.txtColor + '">' + r.icon + ' ' + r.num);
						$t.append('<h2 style="background:' + r.color + ';color:' + r.txtColor + '">' + r.name);
					} else {
						$t.append('<h1 style="background:' + r.color + ';color:' + r.txtColor + '">' + r.icon + ' ' + r.name);
					}
					r.stops.forEach((s) => {
						if (!this.stops[s] || !this.stops[s].name) {
							console.error('Stop ' + s + ' not found!');
							return;
						}
						$l.append('<li data-stop-id="' + s + '">' + this.stops[s].name);
					});
					$('main').append($t.append($l))
					if (!this.poly[r.shape]) {
						this.poly[r.shape] = {};
						this.poly[r.shape].path = [];
						// Use this List of Stops to draw a Polyline
						r.stops.forEach((s) => {
							this.poly[r.shape].path.push(this.stops[s]);
						});
						this.setShapeRoute(r.shape, i);
						// Draw Polyline
						this.poly[r.shape].Polyline = new google.maps.Polyline({
							path: this.poly[r.shape].path,
							geodesic: true,
							strokeColor: (typeof this.poly[r.shape].color == 'string' ? this.poly[r.shape].color : '#008800'),
							strokeWeight: (this.poly[r.shape].weight || 2),
							opacity: this.poly[r.shape].opacity || .6,
							strokeOpacity: 1,
							clickable: true,
						});
						this.poly[r.shape].Polyline.setMap(this.map);
					}
				}
				$(document).trigger($.Event('loaded', { file:'stop_times.txt' }));
			},
		});
	},
	hideStops() {
		Objects.values(this.stops).forEach(stop => stop.Marker.setVisible(false));
	},
	shapeTrips(head, data) {
		if (Number.isInteger(head.shape_id) && head.shape_id >= 0) {
			data.forEach((r) => {
				r = r.split(',');
				if (!r || r[head.trip_id] === '') return;
				const route_id = r[head.route_id];
				const shape = r[head.shape_id];
				// Associate Shape to Route
				if (shape != '') gtfs.setShapeRoute(shape, route_id);
				// Associate Trip to Route
				gtfs.tripRoute[r[head.trip_id]] = route_id;
			});
		}
		$(document).trigger($.Event('loaded', { file: 'trips.txt', locale }));
	},
};

onmessage = (e) => {
	const [fn, ...args] = e.data;
	if (typeof gtfs[fn] === 'function') {
		gtfs[fn](...args);
	}
}
