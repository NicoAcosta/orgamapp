const button = document.getElementById('button')
const graphSketch = document.getElementById('graphSketch')
const graphImageArea = document.getElementById('graphImageArea')
const downloadButton = document.getElementById('downloadButton')
const resultImage = document.getElementById('resultImage')
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
const orgChart = firebase.functions().httpsCallable('orgChart')

function graph() {
	const textareaValue = document.getElementById('textarea').value

	orgChart({text: textareaValue}).then((result) => {
		const html = result.data.html

		graphSketch.innerHTML = html

		const organizationChart = graphSketch.firstChild

		setTimeout(() => {
			domtoimage.toPng(organizationChart).then(function (dataUrl) {
				resultImage.src = dataUrl
				graphSketch.removeChild(graphSketch.firstChild)
				downloadButton.href = dataUrl
				loadingModal.hide()
				resultModal.toggle()
				resultModal.show()
			})
		}, 200)
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
