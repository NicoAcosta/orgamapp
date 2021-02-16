//import {ImageHelper} from './image.mjs'

const button = document.getElementById('button')
const graphSketch = document.getElementById('graphSketch')
const graphImageArea = document.getElementById('graphImageArea')
const downloadButton = document.getElementById('downloadButton')
// let openInNewTabButton = document.getElementById('openInNewTabButton')

const resultModal = new bootstrap.Modal(
	document.getElementById('resultModal'),
	{
		keyboard: false,
	}
)

const loadingModal = new bootstrap.Modal(
	document.getElementById('loadingModal'),
	{
		keyboard: false,
	}
)

const orgChart = firebase.functions().httpsCallable('orgChart')

function graph() {
	if (graphImageArea.firstChild) {
		graphImageArea.removeChild(graphImageArea.firstChild)
	}

	const textareaValue = document.getElementById('textarea').value

	orgChart({text: textareaValue}).then((result) => {
		const html = result.data.html

		graphSketch.innerHTML = html

		const organizationChart = graphSketch.firstChild

		html2canvas(organizationChart).then((canvas) => {
			graphSketch.removeChild(graphSketch.firstChild)
			graphSketch.appendChild(canvas)

			// setTimeout(() => {
			// let [image, url] = ImageHelper.canvasToImage(canvas)
			const [image, url] = canvasToImage(canvas)

			graphSketch.removeChild(graphSketch.firstChild)
			graphImageArea.appendChild(image)

			downloadButton.href = url
			downloadButton.download = 'orgamapp.png'

			setTimeout(() => {
				loadingModal.hide()
				resultModal.toggle()
				resultModal.show()
			}, 200)
			// }, 500)

			// openInNewTabButton.href = url
			// }, 1000)
		})
	})
}

function graphButton() {
	loadingModal.toggle()
	loadingModal.show()
	window.scrollTo(0, 0)
	graph()

	// setTimeout(function () {
	// 	// 	loadingModal.toggle()
	// 	// 	loadingModal.show()
	// 	graph()
	// }, 1000)
}

button.addEventListener('click', () => {
	graphButton()
})

function canvasToImage(canvas) {
	const url = canvas.toDataURL('image/png')
	const image = document.createElement('img')
	image.src = url
	image.classList.add('orgImg')
	return [image, url]
}
