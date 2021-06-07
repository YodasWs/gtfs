window.csv = {
	splitRow(r) {
		let cells = r.match(/((?!,)|(?=^))("[^"]*"|[^,]*)(?=,|$)/g);
		if (cells && cells.length) {
			cells = cells.map(t => t.trim('"'));
		}
		return cells;
	},
};
window.gtfs = {
	extremes: { north:-90, south:180, east:-180, west:180 },
	loadedFiles: [],
	tripRoute: {},
	routes: {},
	stops: {},
	poly: {},
	setShapeRoute(shape, route) {
		this.poly[shape] = this.poly[shape] || {}
		if (this.routes[route]) {
			this.routes[route].shape = shape
			if (!this.poly[shape].color && this.routes[route].color)
				this.poly[shape].color = this.routes[route].color
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
	parseHeader(h) {
		const r = {};
		csv.splitRow(h).forEach((h, i) => {
			r[h.trim()] = i;
		});
		return r;
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
		const head = this.parseHeader(data.shift());
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
	},
	parseStops(data) {
		const rows = data.split('\n');
		const head = this.parseHeader(rows.shift());
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
	loadGTFS(url) {
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
					const head = this.parseHeader(rows.shift());
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
				const head = this.parseHeader(rows.shift())
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
				const head = this.parseHeader(rows.shift())
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
				yodasws.fire('loaded', { file: 'shapes.txt' });
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
				const head = this.parseHeader(rows.shift());
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
		for (var id in this.stops) {
			this.stops[id].Marker.setVisible(false)
		}
	},
};

yodasws.on('page-loaded', async () => {
	if (!google || !google.maps) {
		return;
	}
	const div = document.getElementById('google-maps');
	if (div instanceof Element) {
		[...document.querySelectorAll('#google-maps, .gtfs')].forEach((el) => {
			el.removeAttribute('hidden');
		});

		// Load Geocoder
		const geocoder = new google.maps.Geocoder();
		geocoder.geocode({ address: 'Hakone, Japan' }, (results, status) => {
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
						latLngBounds: {
							north: results[0].geometry.bounds.Ua?.i ?? results[0].geometry.bounds.northeast?.lat,
							east: results[0].geometry.bounds.La?.i ?? results[0].geometry.bounds.northeast?.lng,
							south: results[0].geometry.bounds.Ua?.g ?? results[0].geometry.bounds.southwest?.lat,
							west: results[0].geometry.bounds.La?.g ?? results[0].geometry.bounds.southwest?.lng,
						},
					},
				});
				gtfs.map.zoom = gtfs.map.getZoom();
				gtfs.map.addListener('zoom_changed', (e) => {
					// Make Lines Thicker for Easier Reading
					const weightAdjust = (gtfs.map.zoom >= 14 ? gtfs.map.zoom - 13 : 6 - Math.floor((gtfs.map.zoom - 1) / 2));
					Object.values(gtfs.poly).forEach((poly) => {
						if (!gtfs.poly[i].Polyline) return;
						poly.Polyline.setOptions({
							strokeWeight: poly.weight + weightAdjust,
						});
					});
				});
			} else {
				console.log('Sam, Geocoder failed,', status);
			}
		});
	}
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

yodasws.on('loaded', (e) => {
	console.log('Sam, loaded, e:', e);
	gtfs.loadedFiles.push(e.file);
});
yodasws.on('site-loaded', () => {
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
