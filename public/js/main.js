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

async function graph() {
	const textareaValue = document.getElementById('textarea').value

	const res = await fetch('https://orgamapp.web.app/organizationChartSvg', {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'post',
		body: JSON.stringify({text: textareaValue}),
	})

	const json = await res.json()

	const svgData = json.svgData
	console.log('svgData')
	console.log(svgData)

	resultImage.src = svgData
	downloadButton.href = svgData
	loadingModal.hide()
	resultModal.toggle()
	resultModal.show()
}

function graphButton() {
	loadingModal.toggle()
	loadingModal.show()
	window.scrollTo(0, 0)
	graph()
}
