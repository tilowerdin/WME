var showElements = false;
var menuItems = 6;

function onResize() {
	if (window.innerWidth > 922) {
		var elems = document.getElementsByClassName("menu-div");
		// console.log(elems);
		for (var elem = 0; elem < menuItems; elem++) {
			elems[elem].style.display = 'table-cell';
		}
	}
	if (window.innerWidth < 922) {
		var elems = document.getElementsByClassName("menu-div");
		for (var elem = 0; elem < menuItems; elem++) {
			elems[elem].style.display = 'none';
		}
	}
}

function toggle_nav_elements() {
	showElements = !showElements;
	if (showElements) {
		var elems = document.getElementsByClassName("menu-div");
		for (var elem = 0; elem < menuItems; elem++) {
			elems[elem].style.display = 'block';
		}
	} else {
		var elems = document.getElementsByClassName("menu-div");
		for (var elem = 0; elem < menuItems; elem++) {
			elems[elem].style.display = 'none';
		}
	}
}