export function query(node, from = document) {
	return from.querySelector(node);
}
export function queryAll(node) {
	return document.querySelectorAll(node);
}

export function getXY(e) {
	// Get the bounding rectangle of target
	const rect = e.target.getBoundingClientRect();
	// Mouse position
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;
	return { x, y }
}
export function emoveClasses(element, ...classes) {
	// console.log(classes);
	classes.forEach(className => {
		element.classList.remove(className)
	});
	// return element
}
// -------------------------------------------------
export function insertBefore(newNode, existingNode) {
	existingNode.parentNode.insertBefore(newNode, existingNode);
}
export function insertAfter(newNode, existingNode) {
	existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}


// function log() {
// 	for (var i = 0; i < arguments.length; i++) {
// 		console.log(arguments[i]);
// 	}
// }

// random colors  ==================================================================
// ranColor = () => "#" + Math.random().toString(16).substring(-6)
// rgbRandom = () => `rgb(${random(255)},${random(255)},${random(255)})`
// random = (num) => Math.floor(Math.random() * (num + 1))




//-------------------drag----------------------------------//
export function offset(elem) {
	if (!elem) elem = this;

	var x = elem.offsetLeft;
	var y = elem.offsetTop;

	while (elem = elem.offsetParent) {
		x += elem.offsetLeft;
		y += elem.offsetTop;
	}

	return { left: x, top: y };
}
//-------------------drag----------------------------------//



export function dragElement(elmntToDrag, dragWith) {

	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	if (dragWith) {
		// if present, the header is where you move the DIV from:
		dragWith.onmousedown = dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		elmntToDrag.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmntToDrag.style.top = (elmntToDrag.offsetTop - pos2) + "px";
		elmntToDrag.style.left = (elmntToDrag.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

//-------------------pasteHtmlAtCaret----------------------------------//
export function pasteHtmlAtCaret(html = "<br>", selectPastedContent) {
	var sel, range;
	if (window.getSelection) {
		// IE9 and non-IE
		sel = window.getSelection();
		if (sel.getRangeAt && sel.rangeCount) {
			range = sel.getRangeAt(0);
			range.deleteContents();

			// Range.createContextualFragment() would be useful here but is
			// only relatively recently standardized and is not supported in
			// some browsers (IE9, for one)
			var el = document.createElement("div");
			el.innerHTML = html;
			var frag = document.createDocumentFragment(),
				node,
				lastNode;
			while ((node = el.firstChild)) {
				lastNode = frag.appendChild(node);
			}
			var firstNode = frag.firstChild;
			range.insertNode(frag);

			// Preserve the selection
			if (lastNode) {
				range = range.cloneRange();
				range.setStartAfter(lastNode);
				if (selectPastedContent) {
					range.setStartBefore(firstNode);
				} else {
					range.collapse(true);
				}
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	} else if ((sel = document.selection) && sel.type != "Control") {
		// IE < 9
		var originalRange = sel.createRange();
		originalRange.collapse(true);
		sel.createRange().pasteHTML(html);
		if (selectPastedContent) {
			range = sel.createRange();
			range.setEndPoint("StartToStart", originalRange);
			range.select();
		}
	}
}