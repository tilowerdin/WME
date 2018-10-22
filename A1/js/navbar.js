var showElements = false;

function onResize() {
	if (window.innerWidth > 922) {
		var elems = document.getElementsByClassName("menu");
		// console.log(elems);
		for (var elem in elems) {
			elems[elem].style.display = 'table-cell';
		}
	}
	if (window.innerWidth < 922) {
		var elems = document.getElementsByClassName("menu");
		for (var elem in elems) {
			elems[elem].style.display = 'none';
		}
	}
}

function toggle_nav_elements() {
	showElements = !showElements;
	if (showElements) {
		var elems = document.getElementsByClassName("menu");
		for (var elem in elems) {
			elems[elem].style.display = 'block';
		}
	} else {
		var elems = document.getElementsByClassName("menu");
		for (var elem in elems) {
			elems[elem].style.display = 'none';
		}
	}
}