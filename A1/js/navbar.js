var showElements = false;
var menuItems = 6;

// since we are overriding the css display attributes in toggle_nav_elements, this is not possible doing in css
function onResize() {
	var elems = document.getElementsByClassName("menu-div");
	if (window.innerWidth > 922) {
		for (var elem = 0; elem < menuItems; elem++) {
			elems[elem].style.display = 'table-cell';
		}
	}
	if (window.innerWidth < 922) {
		for (var elem = 0; elem < menuItems; elem++) {
			elems[elem].style.display = 'none';
		}
	}
}

// toggle the nav menu item list, usually when the screen width is small
function toggle_nav_elements() {
	showElements = !showElements;
	var elems = document.getElementsByClassName("menu-div");
	if (showElements) {
		for (var elem = 0; elem < menuItems; elem++) {
			elems[elem].style.display = 'block';
		}
	} else {
		for (var elem = 0; elem < menuItems; elem++) {
			elems[elem].style.display = 'none';
		}
	}
}