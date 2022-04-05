// default: 0.113037109375ms
// default: 0.807861328125ms // create one

function queryS(element = "div") {
	try { return document.querySelector(element) }
	catch (error) { this.error("createE", element) }
}

/*--------------------------------------------------------------------------/
/--------------------------------------------------------------------------*/
export const MiDom = function (node = "div", create = true) {
	// this.node = create ? this.createE(node) : this.queryS(node);
	this.node = node ? this.createE(node, create) : "";
	// this.value = "bg-red";
	// this.property = "className";
}


MiDom.prototype = {
	//-----------------------------------------------------//
	// set setNode(target) {
	// 	console.log(this.node1, "=" + target);
	// 	return target
	// },
	// get node() {
	// 	return this._node
	// },
	//-----------------------------------------------------//
	createE: function (element = "div", create = true) {
		try {
			return create ?
				document.createElement(element) :
				this.node = document.querySelector(element)
		} catch (error) { this.error("createE", element) }
	},

	queryS,

	// queryS: (element = "div") => {
	// 	try { return document.querySelector(element) }
	// 	catch (error) { this.error("createE", element) }
	// },

	//-----------------------------------------------------//

	appendC: function (where = "body") {
		try {
			if (typeof where === 'object') {
				where.node ? where.node.appendChild(this.node) : where.appendChild(this.node)
			} else {
				this.queryS(where).appendChild(this.node);
			}
			return this
		} catch (error) { this.error("appendC", where) }

	},

	innerH: function (text = "") {
		try {
			if (this.node.value === undefined) {
				if (typeof text === "string") {
					this.node.innerText = text
				} else {
					this.node.innerHTML = text
				}
			} else { // input, textarea, option
				this.node.value = text
			}
			return this
		} catch (error) { this.error("appendC", text) }

	},

	addE: function (func, event = "click", scope = true) {
		this.node.addEventListener(event, (e) => func(e, this), scope);
		// this.node.addEventListener(event, func, scope);
		return this
	},

	//-----------------------------------------------------//

	styleT: function (styles) { this.node.style.cssText = styles; return this },

	addId: function (id) { this.node.id = id; return this },

	// sobre escribe
	classL: function (clase) { this.node.classList = clase; return this },

	// agrega
	addC: function () {
		for (var i = 0; i < arguments.length; i++) { this.node.classList.add(arguments[i]); }
		return this
	},
	removeC: function (clase) { this.node.classList.remove(clase); return this },

	classTg: function (clase) { this.node.classList.toggle(clase); return this },

	replace: function (clase, whit) { this.node.classList.replace(clase, whit); return this },

	setSty: function (property, value) { this.node.style[property] = value; return this },

	setAtt: function (att, value) { this.node.setAttribute(att, value); return this },

	dataset: function (dataName, value) { this.node.dataset[dataName] = value; return this },

	removeA: function (att) { this.node.removeAttribute(att); return this },

	value: function () { return this.node.value },

	content: function () { return this.node.textContent },

	error: function (message, item) {
		console.error(message)
		if (item) {
			console.log(item)
		}
		return this
	},

	// finally: function (message) {
	//   if (this.node === null) error(message)
	//   return this
	// },

	insertFn: function (fn) {
		fn(this)
		return this
	},

	destroy: function () { delete this.node },

	removeChild: function (child) { this.node.removeChild(child); return this },

	removeChild: function (nuevo, old) { this.node.replaceChild(nuevo, old); return this },

	repeat: function (self, num) {
		for (let i = 1; i <= num; i++) {
			log(i)
			this.createE(self[0])
			this.innerH(self[1])
			this.appendC()
		}
	},

	pre: function (text, where = "body") {
		let pre = this.createE("pre")
		pre.innerHTML = JSON.stringify(text)
		this.queryS(where).appendChild(pre)
		return this
	},

};


// const algo = new MiDom("input")
// 	.innerH("xxxxx")
// 	.setSty("color", "blue")
// 	.appendC()
// 	.addE((e, self) => { console.log(e, self) })
// // console.log(algo)
// new MiDom("p").appendC().innerH("document.title -- " + document.title)

// // var num = 3
// for (let i = 1; i <= num; i++) {
//   log(i)
// }



/*--------------------------------------------------------------------------/
document.getElementById(id)
document.getElementsByTagName(name)
document.createElement(name)
parentNode.appendChild(node)
element.innerHTML
element.style.left
element.setAttribute()
element.getAttribute()
element.addEventListener()
window.content
window.onload
window.scrollTo()

// align
// title
// lang
// translate
// dir
// hidden
// access
// Key
// draggable
// spellcheck
// autocapitalize
// contentEditable
// isContentEditable
// inputMode
// offsetParent
// offsetTop
// offsetLeft
// offsetWidth
// offsetHeight
// style
// innerText

/--------------------------------------------------------------------------*/


/*--------------------------------------------------------------------------/

					Finding HTML Elements
Method	                        Description
document.getElementById(id)	Find an element by element id
document.getElementsByTagName(name)	Find elements by tag name
document.getElementsByClassName(name)	Find elements by class name

					Changing HTML Elements
Property	                      Description
element.innerHTML =  new html content	Change the inner HTML of an element
element.attribute = new value	Change the attribute value of an HTML element
element.style.property = new style	Change the style of an HTML element

Method	                    Description
element.setAttribute(attribute, value)	Change the attribute value of an HTML element

				Adding and Deleting Elements
Method	                        Description
document.createElement(element)	Create an HTML element
document.removeChild(element)	Remove an HTML element
document.appendChild(element)	Add an HTML element
document.replaceChild(new, old)	Replace an HTML element
document.write(text)	Write into the HTML output stream

					Adding Events Handlers
Method	                      Description
document.getElementById(id).onclick = function(){code}	Adding event handler code to an onclick event

					Finding HTML Objects
The first HTML DOM Level 1 (1998), defined 11 HTML objects, object collections, and properties. These are still valid in HTML5.
Later, in HTML DOM Level 3, more objects, collections, and properties were added.
Property	                    Description	DOM
document.anchors	Returns all <a> elements that have a name attribute	1
document.applets	Returns all <applet> elements (Deprecated in HTML5)	1
document.baseURI	Returns the absolute base URI of the document	3
document.body	Returns the <body> element	1
document.cookie	Returns the document's cookie	1
document.doctype	Returns the document's doctype	3
document.documentElement	Returns the <html> element	3
document.documentMode	Returns the mode used by the browser	3
document.documentURI	Returns the URI of the document	3
document.domain	Returns the domain name of the document server	1
document.domConfig	Obsolete. Returns the DOM configuration	3
document.embeds	Returns all <embed> elements	3
document.forms	Returns all <form> elements	1
document.head	Returns the <head> element	3
document.images	Returns all <img> elements	1
document.implementation	Returns the DOM implementation	3
document.inputEncoding	Returns the document's encoding (character set)	3
document.lastModified	Returns the date and time the document was updated	3
document.links	Returns all <area> and <a> elements that have a href attribute	1
document.readyState	Returns the (loading) status of the document	3
document.referrer	Returns the URI of the referrer (the linking document)	1
document.scripts	Returns all <script> elements	3
document.strictErrorChecking	Returns if error checking is enforced	3
document.title	Returns the <title> element	1
document.URL	Returns the complete URL of the document	1

/--------------------------------------------------------------------------*/
// new MiDom("p").appendC().innerH("document.title -- " + document.title)
// new MiDom("p").appendC().innerH("document.URL -- " + document.URL)
// new MiDom("p").appendC().innerH("document.strictErrorChecking -- " + document.strictErrorChecking)
// new MiDom("p").appendC().innerH("document.scripts -- " + document.scripts)
// new MiDom("p").appendC().innerH("document.referrer -- " + document.referrer)
// new MiDom("p").appendC().innerH("document.readyState -- " + document.readyState)
// new MiDom("p").appendC().innerH("document.readyState -- " + document.readyState)
// new MiDom("p").appendC().innerH("document.links -- " + document.links)
// new MiDom("p").appendC().innerH("document.lastModified -- " + document.lastModified)
// new MiDom("p").appendC().innerH("document.inputEncoding -- " + document.inputEncoding)
// new MiDom("p").appendC().innerH("document.implementation -- " + document.implementation)
// new MiDom("p").appendC().innerH("document.images -- " + document.images)
// new MiDom("p").appendC().innerH("document.head -- " + document.head)
// new MiDom("p").appendC().innerH("document.forms -- " + document.forms)
// new MiDom("p").appendC().innerH("document.embeds -- " + document.embeds)
// new MiDom("p").appendC().innerH("document.domConfig -- " + document.domConfig)
// new MiDom("p").appendC().innerH("document.documentURI -- " + document.documentURI)
// new MiDom("p").appendC().innerH("document.documentMode -- " + document.documentMode)
// new MiDom("p").appendC().innerH("document.documentElement -- " + document.documentElement)
// new MiDom("p").appendC().innerH("document.doctype -- " + document.doctype)
// new MiDom("p").appendC().innerH("document.cookie -- " + document.cookie)
// new MiDom("p").appendC().innerH("document.body -- " + document.body)
// new MiDom("p").appendC().innerH("document.baseURI -- " + document.baseURI)
// new MiDom("p").appendC().innerH("document.applets -- " + document.applets)
// new MiDom("p").appendC().innerH("document.anchors -- " + document.anchors)


// console.group("‘group’")

// console.trace(1)
// console.error(1)

// console.time()
// console.timeEnd()

// log(console.memory)

// console.profile("profileName")
// console.profileEnd("profileName")

// console.count("stuff")

// console.assert(true, "Log me!")
// console.assert(false, "Log me!")

// console.groupEnd("‘group’")




//-----------------------------------------------------//
// class Domm {
//   constructor(node = "div") {
//     this.node = node;
//   }
// }
// Domm.prototype = {
//   crear: function () {
//    log(123)
//   }
// }

// let gg = new Domm("JavaScript", "Java");

// log(gg)

// gg.crear()
// function miDom() {
// 	return {
// 		nodex: "hola",
// 		set node(target) {
// 			console.log(target);
// 			// this.node = target
// 			// target.property = value
// 			return target
// 		},
// 		get node() {

// 			return 123
// 		}

// 	}
// }
/***********************InputClass***************************/
function createE(element = "input") {
	try {
		return document.createElement(element)
		// this.node = document.querySelector(element)
	} catch (error) { this.error("createE", element) }
}
// ----------------------------
export const InputClass = function (node = "input") {
	this._node = this.createE(node)
	this._atributes = "xxx"
	this._value = "bg-red"
	// this._regex = "bg-red"
}

// ------------------------------------
InputClass.prototype = {
	set setValue(value) {
		if (typeof value === "string") {
			this._value = value
			this.innerH(value)
		}
		// console.log(this.node1, "=" + value);
		// return value
	},
	set setRegex(value) {
		// value.match(reGex) ?
		// Reflect.set(target, "background", value.match(reGex)) :
		// Reflect.set(target, "background", "")
		// console.log(this.node1, "=" + value);
		// return value
	},

	// -----------
	get node() {
		return this._node
	},
	// -------------------
	createE,
	queryS,
	// ------
	appendC: function (where = "body") {
		try {
			if (typeof where === 'object') {
				where.node ? where.node.appendChild(this._node) : where.appendChild(this._node)
			} else {
				this.queryS(where).appendChild(this._node);
			}
			return this
		} catch (error) { this.error("appendC", where) }
	},

	// -----------
	innerH: function (text = "") {
		try {
			this.node.value = text
			return this
		} catch (error) { this.error("appendC", text) }

	},
}
// ----------------------------------

