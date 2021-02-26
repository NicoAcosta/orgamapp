const Organization = require('./src/organization.js')
const SyntaxHelper = require('./src/syntax.js')

const htmlToSvg = require('./src/html-to-svg.js')

const functions = require('firebase-functions')
// const admin = require('firebase-admin')
// const cors = require('cors')({origin: true})
// admin.initializeApp(functions.config().firebase)

exports.orgChart = functions.https.onCall((data, context) => {
	const text = data.text

	const orgData = SyntaxHelper.data(text)

	const org = new Organization(orgData)

	const organizationChart = org.organizationChart()

	const graphHTML = organizationChart.outerHTML

	console.log('graphHTML')
	console.log(graphHTML)

	return {html: graphHTML}
})

exports.time = functions.https.onCall((data, context) => {
	const now = `${Date.now()}`
	return {time: now}
})

// exports.htmlToSvg = functions.https.onCall(async (data, context) => {
// 	const graphHTML = data.html
// 	const svgData = await htmlToSvg(graphHTML)

// 	console.log('svgData')
// 	console.log(svgData)

// 	return {svgData: svgData}
// })

exports.htmlToSvg = functions.https.onCall((data, context) => {
	const graphHTML = data.html

	htmlToSvg(graphHTML).then((svgData) => {
		console.log('svgData')
		console.log(svgData)
		return {svgData: svgData}
	})
})

exports.htmlToSvg2 = functions.https.onRequest((request, response) => {
	const graphHTML = data.html

	htmlToSvg(graphHTML).then((svgData) => {
		console.log('svgData')
		console.log(svgData)
		return {svgData: svgData}
	})
})

exports.orgSvgData = functions.https.onCall(async (data, context) => {
	const text = data.text

	const orgData = SyntaxHelper.data(text)

	const org = new Organization(orgData)

	const organizationChart = org.organizationChart()

	const graphHTML = organizationChart.outerHTML

	const svgData = await htmlToSvg(graphHTML)

	console.log('svgData')
	console.log(svgData)

	return {svgData: svgData}
})
