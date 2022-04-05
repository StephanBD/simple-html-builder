import { query, queryAll } from "./helpers"
// --------------------------------
// 🗛
document.querySelector("#font-deincrease").addEventListener("click", () => {
	const fontSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--font-size-adjust')) - 1 + "px"
	document.documentElement.style.setProperty('--font-size-adjust', fontSize);
})
document.querySelector("#font-increase").addEventListener("click", () => {
	const fontSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--font-size-adjust')) + 1 + "px"
	document.documentElement.style.setProperty('--font-size-adjust', fontSize);
})
// 👁️
query("#revealer").addEventListener("click", e => {
	e.preventDefault();
	const i = query("i", query("#revealer"));

	i.classList.toggle("fa-eye");
	i.classList.toggle("fa-eye-slash");

	query("body").classList.toggle("_reveal");
});

// 🌞
query("#dark-theme").addEventListener("click", e => {
	e.preventDefault();
	const i = query("i", query("#dark-theme"));
	// <i class="far fa-sun"></i>
	i.classList.toggle("fa-moon");
	i.classList.toggle("fa-sun");

	query("body").classList.toggle("dark-theme");
});

// --------------------------------
const btn = query("#btn-menu");
const menubar = query(".menubar");

// -------------------------------
btn.addEventListener("click", e => {
	e.preventDefault();
	// console.log("click menu", query(".menubar"));
	menubar.classList.toggle("active");
});

// -------------------------------
menubar.addEventListener(
	"click",
	e => {
		// console.log(e.target);

		// let childDropdown;
		// if (
		// 	e.target.classList.contains("menubar-dropdown") &&
		// 	e.target.children[0]
		// ) {
		// 	childDropdown = query(".menubar-dropdown-item", e.target);
		// 	// console.log("father");

		// } else if (e.target.parentElement.classList.contains("menubar-dropdown")) {
		// 	childDropdown = query(".menubar-dropdown-item", e.target.parentElement);
		// }
		// -----
		// console.log(e.target.parentElement);
		// if (childDropdown) {
		// 	if (
		// 		!menubar.classList.contains("active") ||
		// 		childDropdown.classList.contains("hide")
		// 	) {
		// 		menubar.classList.add("active");
		// 		childDropdown.classList.remove("hide");
		// 	} else {
		// 		toggleClass(childDropdown);
		// 	}
		// } else {
		// 	menubar.classList.toggle("active");
		// 	console.log("here");
		// }

		// childDropdown = query(".menubar-dropdown-item", e.target);
		// console.log(childDropdown);
		// if (childDropdown) {
		//   toggleBlock(childDropdown);
		// }
		// --------
		// const tagName = e.target.tagName
		if (e.target.classList.contains("show-more") || e.target === menubar) {
			menubar.classList.toggle("active");
		}
	},
	false
);


// -----------------
function toggleClass(node) {
	node.classList.toggle("hide");
}
function toggleBlock(node) {
	let $display =
		document.defaultView
			.getComputedStyle(node, null)
			.getPropertyValue("display") === "block"
			? "none"
			: "block";
	// console.log($display);
	node.style.display = $display;
}



// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { CSSRulePlugin } from "gsap/CSSRulePlugin";

// gsap.registerPlugin(CSSRulePlugin);
// gsap.registerPlugin(ScrollTrigger);
// -------------------------------

// -------------------------------

// let obj = { value: "xxx", nodes: [inputClass] }

// let focusNode = new Proxy(obj, {
// 	get: function (target, property) {
// 		if (target.hasOwnProperty(property))
// 			return target[property]
// 	},
// 	set: (target, property, value) => {
// 		Reflect.set(target, "value", value);
// 		// console.log(target.nodes[0]);
// 		target.nodes.forEach(element => {
// 			// element.setAttribute('value', value);
// 			element.value = value
// 			// console.log(element.value = value);
// 		});
// 	}
// })
