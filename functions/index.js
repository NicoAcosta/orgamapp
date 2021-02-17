const functions = require('firebase-functions')
// const express = require('express')

const Organization = require('./src/organization.js')
const SyntaxHelper = require('./src/syntax.js')

const imageFromHTML = require('./src/image.js')

exports.orgChart = functions.https.onCall((data, context) => {
	const text = data.text

	const orgData = SyntaxHelper.data(text)

	const org = new Organization(orgData)

	const organizationChart = org.organizationChart()

	const graphHTML = organizationChart.outerHTML

	return {html: graphHTML}
})

exports.orgSvgData = functions.https.onCall((data, context) => {
	const text = data.text

	const orgData = SyntaxHelper.data(text)

	const org = new Organization(orgData)

	const organizationChart = org.organizationChart()

	const graphHTML = organizationChart.outerHTML

	//

	//

	return imageFromHTML(graphHTML)
})
