import { query, queryAll, insertBefore, insertAfter, dragElement, pasteHtmlAtCaret, offset } from "./helpers"
require("./navbar");
import { MiDom } from "./framework"
import allClasses from './colorsArray'
// import { tags, components } from "./tags";
import { allTags } from "./tags";
/*************************vars*************************/

let form, tagname, copyBtn, draggableBtn, deleteBtn, fatherBtn, arrowUp, arrowDown, classesControl, tabBtns, dragModal, tagsTab, componentsTab, switchBox, textareaCode, btnCode, btnGenerateCode, btnCopyCode, proxyNode, moveMe, whereDrop
/*************************init*************************/
function init() {
	// const dropzone = query("#dropzone")
	form = query(".modal-draggable")
	tagname = query("#tagname")
	// ------- btns
	copyBtn = query("#copy-btn")
	draggableBtn = query("#draggable-btn")
	deleteBtn = query("#delete-btn")
	fatherBtn = query("#father-btn")
	arrowUp = query("#arrow-up-btn")
	arrowDown = query("#arrow-down-btn")

	// -----classes input
	classesControl = query("#classes-control")
	// tab btn
	tabBtns = queryAll(".btn-tab")
	// drag modal
	dragModal = query("#drag-modal")
	// tabs
	tagsTab = query("#tags")
	componentsTab = query("#components")
	// show html
	switchBox = query("#switchBox")
	// var dropzone, sDefTxt;
	switchBox.addEventListener("click", e => {
		if (proxyNode.node === dropzone) return
		if (proxyNode.node.classList.contains("pre-html-code")) {
			nodeEdit(proxyNode.node)
		} else {
			htmlEdit(proxyNode.node)
		}
	})
	// autocomplete
	autocomplete(query("#myInput"), allClasses, proxyNode);
	// tabs
	tabBtns.forEach(btn => {
		btn.addEventListener("click", (e) => { openTab(e, btn.textContent) })
		if (btn.classList.contains("active")) {
			btn.click()
		}
	});
	// ------------------

	allTags.tags.forEach((node, index) => {
		createNodes(node, { attributes: { className: "btn-sm bg-orange m" }, tag: "div" }, index, false, "tags")
			.appendC(tagsTab)
	});

	allTags.components.forEach((node, index) => {
		createNodes(node, { attributes: { className: "btn-sm bg-orange m" }, tag: "div" }, index, false, "components")
			.appendC(componentsTab)
	});


	/*************************create code*************************/
	textareaCode = query("#copy");
	btnCode = queryAll(".btn-copy");
	btnGenerateCode = query(".btn-generate-code");
	btnCopyCode = query(".btn-copy-code");

	// --------------------
	btnCode.forEach(btn => {
		btn.addEventListener("click", e => {
			generateCode();
		});
	});
	// --------
	btnGenerateCode.addEventListener("click", e => { generateCode() })
	btnCopyCode.addEventListener("click", e => { copyToClipboard() })

	// remove cell and class
	classesControl.addEventListener("click", function (e) {
		if (e.target.classList.contains("close-btn")) {
			let className = e.target.dataset.className
			proxyNode.removeClass = className
			delete e.target.parentNode.remove()
		}
	})

	//==========================proxyNode==========================//
	proxyNode = new Proxy({ node: null, tabSelected: null }, {
		get: function (target, property) {
			if (target.hasOwnProperty(property) && target[property])
				// if (target.hasOwnProperty(property) && typeof target[property] !== 'undefined')
				return target[property]
		},
		// ---------
		set: (target, property, value) => {

			if (target.node !== value && property === "node") {
				if (target.node !== null || value === null) {
					target.node.removeAttribute("contentEditable")
					target.node.removeAttribute("draggable")
					target.node.removeEventListener("dragstart", dragMove)
					// form.classList.add("hide")
					// tabBtns[0].style.visibility = "hidden"
					for (let i = 0; i < target.node.childElementCount; i++) {
						target.node.children[i].removeAttribute("contentEditable");
					}
				}

				// ----- save
				Reflect.set(target, "node", value);

				// ----- focus
				if (value !== null) {
					target.node.contentEditable = true

					for (let i = 0; i < target.node.childElementCount; i++) {
						target.node.children[i].contentEditable = false
					}

					tagname.innerText = proxyNode.node.tagName
					// target.node.focus()
					form.classList.remove("hide")
					// console.log(value.className,);
					// if (value.className !== "" && value.className.length > 0)
					classesControl.innerHTML = ""
					// tabBtns[0].style.visibility = "visible"
					tabBtns[0].classList.remove("t-gray")



					if (!hasBlankSpaces(value.className)) {
						// createCells(value.className.split(" "))
						value.className.split(" ").forEach((element) => { createCell(element) });
					}
				}
			}
			// ------
			else if (property === "delete") {
				delete target.node.remove()
				Reflect.set(target, "node", null);
				tabBtns[0].classList.add("t-gray")
				tabBtns[1].click()
			}
			// ------
			// remove class from node
			else if (property === "removeClass") {
				// console.log(property, target, value);
				target.node.classList.remove(value)
			}
			// ------
			// add class 
			else if (property === "addClass") {
				// console.log(property, target, value);
				target.node.classList.add(value)
			}
			return true
		}
	})
	// -------
	initDropzone()
	// # end init
}


//==========================dropzone==========================//
function initDropzone() {
	dropzone.addEventListener('keypress', function (e) {
		if (document.activeElement === proxyNode.node && e.key === 'Enter') {
			e.preventDefault()
			pasteHtmlAtCaret()
		}
	});

	dropzone.addEventListener("paste", function (e) {
		e.preventDefault();
		if (document.activeElement === proxyNode.node) {
			let paste = (e.clipboardData || window.clipboardData).getData('text/html').replace(/<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/g, '$1')
			proxyNode.node.innerHTML = paste.replace(/ style="[a-zA-Z:\ \:\0-9\;\-\&]*\"/g, "");
		}

	});


	// -----------------
	dropzone.addEventListener("click", (e) => {
		e.preventDefault()
		e.stopPropagation();

		if (e.target !== proxyNode.node) {
			proxyCreate(e.target)
			// proxyNode.node = e.target
			e.target.contentEditable = true
			e.target.focus()
			tabBtns[0].click()
			// proxyDrag();
		}

		// proxyClasses.className = e.target.className
	})
	// -----------------
	dropzone.addEventListener("dblclick", (e) => {
		e.preventDefault()
		e.stopPropagation();


		if (e.target === proxyNode.node) {
			proxyNoDrag();
			e.target.contentEditable = true
			e.target.focus()
			// tabBtns[0].click()
		}


	})

	// -------------------------------- drag Modal ---------------------------
	// Make the DIV element draggable:
	dragElement(form, dragModal);




	// ------------------------------------------------
	// .move-me.preview(draggable="true").absolute.top.left 
	moveMe = new MiDom("div").classL("h-1 move-me preview absolute top left hid").appendC().node
	// const moveMe = query(".move-me")
	whereDrop = null

	dropzone.addEventListener("dragover", (e) => {
		// console.log("dragover...");

		e.preventDefault()
		e.stopPropagation();



		// -----------
		const rect = e.target.getBoundingClientRect();

		const y = e.clientY - rect.top;

		const { left, top } = offset(e.target)

		// ------------
		moveMe.style.display = "block"
		moveMe.style.left = left + "px";
		moveMe.style.width = e.target.offsetWidth + "px";
		// moveMe.style.left = e.clientX + "px";
		if (e.target !== dropzone && e.target !== moveMe) {
			if (y < e.target.offsetHeight / 3) {
				moveMe.style.height = "0";
				moveMe.style.top = top - 2 + "px";
				whereDrop = "insertBefore"
			} else if (y > (e.target.offsetHeight / 3) * 2) {
				moveMe.style.height = "0";
				moveMe.style.top = e.target.offsetHeight + top + "px";
				whereDrop = "insertAfter"
			}
			else {
				moveMe.style.top = top + "px";
				moveMe.style.height = e.target.offsetHeight + "px";
				whereDrop = "inside"
			}
		} else if (e.target === dropzone) {
			moveMe.style.height = "16px";
			if (y < e.target.offsetHeight / 3) {
				moveMe.style.top = dropzone.offsetTop + "px";
				whereDrop = "first"
			} else if (y > (e.target.offsetHeight / 3) * 2) {
				moveMe.style.top = e.target.offsetHeight + top - 16 + "px";
				whereDrop = "last"
			}
		}


	})

	dropzone.addEventListener("dragleave", (e) => {
		// previewNode.remove()
		// console.log(e.target);
		moveMe.style.display = "none"
		whereDrop = null
		// emoveClasses(e.target, "drag-is-top", "drag-is-center", "drag-is-bottom")
	})

	// ===========================drop=============================================
	dropzone.addEventListener("drop", (e) => {
		// console.log(e.target === proxyNode.node);

		if (typeof e.target === proxyNode.node) return
		// e.target.classList.remove("bg-yellow")
		e.preventDefault()
		e.stopPropagation();
		// let target=  e.target === dropzone ? : e.target
		let element

		// --------
		if (e.dataTransfer.getData("tag/create")) {
			let type = e.dataTransfer.getData("tag/create").match(/\w+/g)

			element = createNodes(allTags[type[0]][type[1]]).node


		} else {
			element = proxyNode.node
		}

		try {
			switch (whereDrop) {
				case "insertBefore":
					insertBefore(element, e.target)
					break;
				case "insertAfter":
					insertAfter(element, e.target)
					break;
				case "inside":
					e.target.appendChild(element)
					break;
				case "first":
					if (dropzone.firstElementChild) {
						insertBefore(element, dropzone.firstElementChild)
					} else {
						dropzone.appendChild(element)
					}
					break;
				case "last":
					dropzone.appendChild(element)
					// insertAfter(element, dropzone.lastElementChild)
					break;
				default:
					break;
			}
		} catch (error) {
			// console.log(error);
			return
		}


		moveMe.style.display = "none"
		whereDrop = null
		// emoveClasses(e.target, "drag-is-top", "drag-is-center", "drag-is-bottom")
	})


	// -------------
	arrowUp.addEventListener("click", function (e) {
		if (proxyNode.node && proxyNode.node.previousSibling && proxyNode.node !== dropzone) {
			insertBefore(proxyNode.node, proxyNode.node.previousSibling)
		}
	})

	// -------------
	arrowDown.addEventListener("click", function (e) {
		if (proxyNode.node && proxyNode.node.nextSibling && proxyNode.node !== dropzone) {
			insertAfter(proxyNode.node, proxyNode.node.nextSibling)
		}
	})

	// ------------- 
	copyBtn.addEventListener("click", function (e) {
		if (proxyNode.node !== dropzone && proxyNode.node) {
			let dupNode = proxyNode.node.cloneNode(true);
			// console.log(dupNode);
			insertAfter(dupNode, proxyNode.node)
		}
	})

	// -------------
	deleteBtn.addEventListener("click", function (e) {
		if (proxyNode.node !== dropzone && proxyNode.node) {
			proxyNode.delete = true
		}
	})

	// -------------
	fatherBtn.addEventListener("click", function (e) {
		if (proxyNode.node !== dropzone && proxyNode.node) {
			proxyNode.node = proxyNode.node.parentNode
		}
	})

	// -------
	draggableBtn.addEventListener("click", function (e) {
		if (proxyNode.node !== dropzone && proxyNode.node) {
			proxyNode.node.draggable = true
			proxyNode.node.contentEditable = false
			// proxyNode.focus()
			// console.log(proxyNode.node);
			proxyNode.node.addEventListener("dragstart", dragMove)
			proxyNode.node.addEventListener("dragend", dragEnd)
			// console.log("xxxxx");
		}
	})
}

// contentEditable="true"
function proxyCreate(node) { proxyNode.node = node }
function proxyAdd(className, cell = true) {
	let classes = className.trim().split(' ')
	if (classes.length > 1) {
		for (let i = 0; i < classes.length; i++) {
			proxyNode.addClass = classes[i]
			cell && createCell(classes[i])
		}
	} else {
		// console.log(classes);
		proxyNode.addClass = classes[0]
		cell && createCell(classes[0])
	}
}
function proxyRemove(className) { proxyNode.removeClass = className }
function proxyDelete() { proxyNode.delete = true }
// ------------
function proxyDrag() {
	if (proxyNode.node !== dropzone && proxyNode.node) {
		proxyNode.node.draggable = true
		proxyNode.node.contentEditable = false
		// proxyNode.focus()
		// console.log(proxyNode.node);
		proxyNode.node.addEventListener("dragstart", dragMove)
		proxyNode.node.addEventListener("dragend", dragEnd)
		// console.log("xxxxx");
	}
}
function proxyNoDrag() {
	if (proxyNode.node !== dropzone && proxyNode.node) {
		proxyNode.node.removeAttribute("draggable")
	}
}

//==========================validator==========================//
function hasBlankSpaces(str) {
	return str === null || str.match(/^ *$/) !== null;
}
let cellClassOld = ""

//==========================cell==========================//

function createCell(className) {
	if (hasBlankSpaces(className)) return;
	// -------
	// let cell = new MiDom("div")
	let cell = new MiDom("div")
		.classL("cell")
		.appendC(classesControl)
	// .innerH(className)
	new MiDom("input")
		.classL("cell-input")
		.innerH(className)
		.setAtt("type", "text")
		.appendC(cell)
	new MiDom("span")
		.classL("close-btn")
		.appendC(cell)
		.innerH("x")
		.dataset("className", className)
	// ------------
	cell.addE((e) => { cellClassOld = className }, "focus")
	// ----
	cell.addE((e) => {
		// console.log(cellClassOld, e.target.value.split(' ')[0]);
		if (e.key === 'Enter' && e.target.value !== cellClassOld && !hasBlankSpaces(e.target.value)) {
			// console.log(e.target.value)
			let newValue = e.target.value.split(' ')[0]
			proxyAdd(newValue, false)
			proxyRemove(cellClassOld)
			cellClassOld = newValue
			e.target.value = newValue
			e.target.nextSibling.dataset["className"] = newValue

		}
	}, "keypress")

}


// -------
function dragCreate(e, tag) {
	e.dataTransfer.setData("tag/create", tag)
}
// -------
function dragMove(e) {
	e.dataTransfer.setData("tag/move", proxyNode.node)
}
// -------
function dragEnd(e) {
	// previewNode.remove()
	moveMe.style.display = "none"
	whereDrop = null
}

/*************************create nodes *************************/
function PropertyToNode(propertiesObj, element) {
	for (const key in propertiesObj) {
		if (Object.hasOwnProperty.call(propertiesObj, key)) {
			const value = propertiesObj[key];
			// console.log(value, key);
			// ----
			switch (key) {
				case "className":
					element.classL(value)
					break;
				case "id":
					element.addId(value)
					break;
				case "style":
					element.styleT(value)
					break;
				case "value":
					element.innerH(value)
					break;

				default:
					element.setAtt(key, value)
					break;
			}
			// ----
		}
	}
}
// console.log(allTags);
// ==============================createNodes=================================
function createNodes(node, custome = null, index = null, deep = true, nodeType = "") {
	let element

	// --------
	if (custome && custome.tag) {
		element = new MiDom(custome.tag)
	} else if (node.tag) {
		element = new MiDom(node.tag)
	}
	// ------------
	if (element.node.tagName == "IMG") {
		// console.log("is img");
		// src="https://via.placeholder.com/150"
		element.setAtt("src", "https://via.placeholder.com/500")
	}


	// ------------
	if (custome && custome.attributes) {
		PropertyToNode(custome.attributes, element)
	} else if (node.attributes && Object.keys(node.attributes).length !== 0) {
		PropertyToNode(node.attributes, element)
	}

	// ------------
	if (deep && typeof node.children === "object" && node.children.length > 0) {
		node.children.forEach(child => {
			createNodes(child).appendC(element.node)
		});
	} else {
		element.node.innerHTML = node.textContent || typeof node.textContent === "string" ? node.textContent : node.children
	}

	// -------
	if (index !== null) {
		// element.dataset("type", nodeType)
		element.node.draggable = true
		element.node.addEventListener("dragstart", (e) => { dragCreate(e, nodeType + "-" + index,) })
		element.node.addEventListener("dragend", dragEnd)
	}

	// --------
	return element
}




// --------
function generateCode(node = dropzone) {
	proxyNode.node = null
	tabBtns[0].classList.add("t-gray")
	queryAll(".pre-html-code").forEach(element => {
		nodeEdit(element)
		// console.log(element);
	});

	// ------
	const string = node.outerHTML || new XMLSerializer().serializeToString(node);
	textareaCode.value = string;
}

function copyToClipboard(node = dropzone) {
	textareaCode.focus();
	textareaCode.select();
	textareaCode.setSelectionRange(0, 99999); /* For mobile devices */
	document.execCommand("copy");
	textareaCode.blur();
}





/*************************tabs*************************/

function openTab(evt, textContent) {
	if (textContent === "classes" && proxyNode.node === undefined) {
		return
	}

	// Declare all variables
	var i, tabcontent, tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = form.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		// tabcontent[i].style.display = "none";
		tabcontent[i].classList.remove("active");
	}

	// Get all elements with class="btn-tab" and remove the class "active"
	tablinks = form.getElementsByClassName("btn-tab");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	document.getElementById(textContent).classList.add("active");
	evt.currentTarget.className += " active";
}

function createObjNodes(element) {

	// -----------
	const node = {};
	// -----------
	if (element.children && element.children.length > 0) {
		let childs = []

		for (let index = 0; index < element.children.length; index++) {
			// const element = element.children[index];
			childs.push(createObjNodes(element.children[index]))
			// childs.push(element.children[index].tagName)
		}

		node.children = childs

	} else {
		node.children = element.textContent
	}
	// ----------
	node.tag = element.tagName
	// node.className = element.className
	// ----------
	node.attributes = {}

	for (var i = 0; i < element.attributes.length; i++) {
		var attrib = element.attributes[i];
		if (attrib.name === "class") {
			node.attributes["className"] = attrib.value

		} else {
			node.attributes[attrib.name] = attrib.value

		}

	}



	// ---------
	return node

}


/*************************autocomplete*************************/

// ---------------------
export function autocomplete(inp, arr) {
	/*the autocomplete function takes two arguments,
	the text field element and an array of possible autocompleted values:*/
	var currentFocus;
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener("input", function (e) {

		var a, b, i, val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) { return false; }
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		/*for each item in the array...*/
		for (i = 0; i < arr.length; i++) {
			/*check if the item starts with the same letters as the text field value:*/
			if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				/*create a DIV element for each matching element:*/
				b = document.createElement("DIV");
				/*make the matching letters bold:*/
				b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
				b.innerHTML += arr[i].substr(val.length);
				/*insert a input field that will hold the current array item's value:*/
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
				/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function (e) {
					/*insert the value for the autocomplete text field:*/
					// inp.value = this.getElementsByTagName("input")[0].value;
					// let value = this.getElementsByTagName("input")[0].value
					inp.value = "";
					proxyAdd(this.getElementsByTagName("input")[0].value)
					// proxyNode.addClass = value;
					// createCell(value)

					/*close the list of autocompleted values,
					(or any other open lists of autocompleted values:*/
					closeAllLists();
				});
				a.appendChild(b);
			}
		}
	});
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function (e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			/*If the arrow DOWN key is pressed,
			increase the currentFocus variable:*/
			currentFocus++;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 38) { //up
			/*If the arrow UP key is pressed,
			decrease the currentFocus variable:*/
			currentFocus--;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 13) {
			/*If the ENTER key is pressed, prevent the form from being submitted,*/
			e.preventDefault();
			if (currentFocus > -1) {
				/* and simulate a click on the "active" item:*/
				if (x) x[currentFocus].click();
			} else {
				// let inputValues = e.target.value.split(' ')

				proxyAdd(inp.value)
				// proxyNode.addClass = inp.value
				// createCell(inp.value)
				inp.value = "";
			}
		}
	});
	function addActive(x) {
		/*a function to classify an item as "active":*/
		if (!x) return false;
		/*start by removing the "active" class on all items:*/
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
		/*a function to remove the "active" class from all autocomplete items:*/
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}
	function closeAllLists(elmnt) {
		/*close all autocomplete lists in the document,
		except the one passed as an argument:*/
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}
	/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
}




//-------------------show html----------------------------------//
function htmlEdit(element) {
	let oContent;
	oContent = document.createTextNode(element.outerHTML);
	let oPre = document.createElement("pre");

	oPre.innerHTML = "";
	oPre.classList.add("pre-html-code")
	oPre.contentEditable = false;
	// oPre.id = "sourceText";
	// oPre.contentEditable = true;
	// dropzone.appendChild(oPre);
	oPre.appendChild(oContent)
	insertAfter(oPre, element)
	element.remove()
	oPre.click()
}
// -----
function nodeEdit(element) {
	const node = stringToHTML(element)
	// console.log(node);
	insertAfter(node, element)
	element.remove()
	node.click()
}
// -----------------
function stringToHTML(element) {
	let oContent
	let div = document.createElement("div")
	oContent = document.createRange();
	oContent.selectNodeContents(element);
	div.innerHTML = oContent.toString();

	// console.log(div.firstElementChild);
	return div.firstElementChild;

};
// -----------------

const dropzone = query("#dropzone")
if (dropzone) {
	init()
}
// ------------------------
