// Extend String.prototype.trim to PHP behavior to remove more than just white space
String.prototype.trim=function(chars){return this.replace(new RegExp('^['+(chars||'\\uffef\\u00a0\\s')+']+|['+(chars||'\\uffef\\u00a0\\s')+']+$','g'),'')};

function csv(str) {
	let rows = str.trim().split('\n');
	rows = rows.map((row) => {
		let cells = row.match(/((?!,)|(?=^))("[^"]*"|[^,]*)(?=,|$)/g);
		if (cells && cells.length) {
			cells = cells.map(t => t.trim('"'));
		}
		return cells;
	});
	const header = {};
	rows.shift().forEach((h, i) => {
		header[i] = h.trim();
	});
	return rows.map((row) => {
		return row.reduce((obj, cell, i) => {
			console.log('Sam, in reduce, obj:', obj);
			obj[header[i]] = cell;
			return obj;
		}, {});
	});
}

/*
globalThis.csv = {
	splitRow(r) {
		let cells = r.match(/((?!,)|(?=^))("[^"]*"|[^,]*)(?=,|$)/g);
		if (cells && cells.length) {
			cells = cells.map(t => t.trim('"'));
		}
		return cells;
	},
	parseHeader(h) {
		const r = {};
		csv.splitRow(h).forEach((h, i) => {
			r[h.trim()] = i;
		});
		return r;
	},
};
/**/

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
	listAgencies(data) {
		data = data.split('\n');
		const head = csv.parseHeader(data.shift());
		const $a = $('<section class="agency">');
		data.forEach((r) => {
			r = csv.splitRow(r);
			if (!r || r[head.agency_id] == '') return;
			$a.append('<h1>' + r[head.agency_name]);
			if (r[head.agency_url]) {
				$a.append('<a href="' + r[head.agency_url] + '" target="_blank">Agency Website</a>');
			}
		});
		$('main section.agency').remove();
		$a.appendTo('main');
		postMessage('agency.txt');
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
		const oneDay = 7 * 24 * 60 * 60 * 1000;
		console.log('Sam, in loadGTFS. url:', url);
		const aj = await ajax({
			url: `/gtfs/${url}/agency.txt`,
		});
		console.log('Sam, aj:', aj);

		// TODO: Load Agency Information
		/*
		// TODO: Cache txt files in Cache
		const dateAgency = Number.parseInt(localStorage.getItem(`gtfs.${url}.agency.date`));
		const txtAgency = localStorage.getItem(`gtfs.${url}.agency.txt`);
		if (!Number.isFinite(dateAgency) || !txtAgency) {
		}
		/**/

		return;

		if (
			!localStorage.getItem('gtfs.' + url + '.agency.txt')
			|| !localStorage.getItem('gtfs.' + url + '.agency.date')
			|| Number.parseInt(localStorage.getItem('gtfs.' + url + '.agency.date'), 10) < Date.now() - 1000 * 60 * 60 * 24 * 7
		) {
			$.ajax({
				url:'/gtfs/' + url + '/agency.txt',
				dateType:'text',
				success: (data) => {
					localStorage.setItem('gtfs.' + url + '.agency.date', Date.now());
					localStorage.setItem('gtfs.' + url + '.agency.txt', data);
					this.listAgencies(data);
				},
			});
		} else {
			this.listAgencies(localStorage.getItem('gtfs.' + url + '.agency.txt'))
		}
		if (
			!localStorage.getItem('gtfs.' + url + '.routes.date')
			|| !localStorage.getItem('gtfs.' + url + '.routes.head')
			|| !localStorage.getItem('gtfs.' + url + '.routes.array')
			|| Number.parseInt(localStorage.getItem('gtfs.' + url + '.routes.date'), 10) < Date.now() - 1000 * 60 * 60 * 24 * 7
		) {
			$.ajax({
				url:'/gtfs/' + url + '/routes.txt',
				dateType:'text',
				success: (data) => {
					const rows = data.split('\n');
					const head = csv.parseHeader(rows.shift());
					rows.forEach((r) => {
						r = r.split(',');
						if (!r || r[head.route_id] == '') return;
						// Save Pertinent Route Data
						this.routes[r[head.route_id]] = this.routes[r[head.route_id]] || {};
						this.routes[r[head.route_id]].txtColor = '#' + (r[head.route_text_color] || '000000');
						this.routes[r[head.route_id]].color = '#' + (r[head.route_color] || 'ffffff');
						this.routes[r[head.route_id]].icon = '&#x1f6' + (r[head.x_route_icon] || '8d') + ';';
						this.routes[r[head.route_id]].name = r[head.route_long_name];
						this.routes[r[head.route_id]].type = r[head.route_type];
						this.routes[r[head.route_id]].num = r[head.route_short_name];
						this.routes[r[head.route_id]].stops = [];
					});
					localStorage.setItem('gtfs.' + url + '.routes.date', Date.now());
					localStorage.setItem('gtfs.' + url + '.routes.head', JSON.stringify(head));
					localStorage.setItem('gtfs.' + url + '.routes.array', JSON.stringify(gtfs.routes));
					$(document).trigger($.Event('loaded', { file:'routes.txt' }));
				},
			});
		} else {
			this.routes = JSON.parse(localStorage['gtfs.' + url + '.routes.array']);
			$(document).trigger($.Event('loaded', { file:'routes.txt' }));
		}
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

/*
yodasws.on('loaded', (e) => {
	console.log('Sam, loaded, e:', e);
	gtfs.loadedFiles.push(e.file);
});
/**/

onmessage = (e) => {
	const [fn, ...args] = e.data;
	if (typeof gtfs[fn] === 'function') {
		gtfs[fn](...args);
	}
}
