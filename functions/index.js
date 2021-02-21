const functions = require('firebase-functions')

const Organization = require('./src/organization.js')
const SyntaxHelper = require('./src/syntax.js')

const htmlToSvg = require('./src/html-to-svg.js')

exports.orgChart = functions.https.onCall((data, context) => {
	const text = data.text

	const orgData = SyntaxHelper.data(text)

	const org = new Organization(orgData)

	const organizationChart = org.organizationChart()

	const graphHTML = organizationChart.outerHTML

	return {html: graphHTML}
})

exports.orgSvgData = functions.https.onCall(async (data, context) => {
	const text = data.text

	const orgData = SyntaxHelper.data(text)

	const org = new Organization(orgData)

	const organizationChart = org.organizationChart()

	const graphHTML = organizationChart.outerHTML

	console.log('graphHTML')
	console.log(graphHTML)

	const svgData = await htmlToSvg(graphHTML)

	console.log('svgData')
	console.log(svgData)

	return {svgData: svgData, errors: []}
})
