
/*************************bgColors*************************/
const colors = [
	"pink-light",
	"pink",
	"pink-dark",
	"red-light",
	"red",
	"red-dark",
	"orange-light",
	"orange",
	"orange-dark",
	"yellow-light",
	"yellow",
	"yellow-dark",
	"brown-light",
	"brown",
	"brown-dark",
	"green-light",
	"green",
	"green-dark",
	"cyan-light",
	"cyan",
	"cyan-dark",
	"blue-light",
	"blue",
	"blue-dark",
	"purple-light",
	"purple",
	"purple-dark",
	"success-light",
	"success",
	"success-dark",
	"info-light",
	"info",
	"info-dark",
	"warning-light",
	"warning",
	"warning-dark",
	"danger-light",
	"danger",
	"danger-dark",
	"accent-color-light",
	"accent-color",
	"accent-color-dark",
	"gray-light",
	"gray",
	"gray-dark",
	"primary-light",
	"primary",
	"primary-dark",
	"secondary-light",
	"secondary",
	"secondary-dark",
	"tertiary-light",
	"tertiary",
	"tertiary-dark",
	"quaternary-light",
	"quaternary",
	"quaternary-dark",
	"light",
	"dark",
	"link",
	"white",
	"black"
]

const allClasses = []

colors.forEach(color => {
	allClasses.push("bg-" + color)
	allClasses.push("t-" + color)
});



export default allClasses;