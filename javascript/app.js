const preactiveItem = document.querySelector('.pre-active')
const barItems = document.querySelectorAll('.bar-item')

barItems.forEach(element => {
	element.addEventListener("click", changeActive)
})



function changeActive(ev) {
	preactiveItem.classList.remove('pre-active')

	barItems.forEach(element => {
		element.classList.remove('active')
	})

	ev.target.classList.add('active')
}

