const Organization = require('./src/organization.js')
const SyntaxHelper = require('./src/syntax.js')

const htmlToSvg = require('./src/html-to-svg.js')

const functions = require('firebase-functions')

const runtimeOpts = {
	timeoutSeconds: 300,
	memory: '1GB',
}

exports.organizationChartSvg = functions
	.runWith(runtimeOpts)
	.https.onRequest(async (request, response) => {
		const text = request.body.text

		const graphHTML = orgHTML(text)

		const svgData = await htmlToSvg(graphHTML)

		response.status(200).send(JSON.stringify({svgData: svgData}))
	})

function orgHTML(text) {
	const organizationData = SyntaxHelper.data(text)

	const organization = new Organization(organizationData)

	const organizationChart = organization.organizationChart()

	const graphHTML = organizationChart.outerHTML

	return graphHTML
}
