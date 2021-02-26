const button = document.getElementById('button')
const graphSketch = document.getElementById('graphSketch')
const graphImageArea = document.getElementById('graphImageArea')
const resultImage = document.getElementById('resultImage')
const downloadButton = document.getElementById('downloadButton')
downloadButton.download = 'orgamapp.png'

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

// firebase.functions().useEmulator('localhost', 5001)
// const orgChart = firebase.functions().httpsCallable('orgChart')
const orgSvgData = firebase.functions().httpsCallable('orgSvgData')

function graph() {
	const textareaValue = document.getElementById('textarea').value

	orgSvgData({text: textareaValue}).then((result) => {
		const imageData = result.data.svgData

		resultImage.src = imageData

		downloadButton.href = imageData
		loadingModal.hide()
		resultModal.toggle()
		resultModal.show()
	})
}

function graphButton() {
	loadingModal.toggle()
	loadingModal.show()
	window.scrollTo(0, 0)
	graph()
}

button.addEventListener('click', () => {
	graphButton()
})
