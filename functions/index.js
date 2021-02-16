const functions = require('firebase-functions')
// const express = require('express')

const Organization = require('./src/organization.js')
const SyntaxHelper = require('./src/syntax.js')
const htmlToImage = require('html-to-image')

const jsdom = require('jsdom')
const {JSDOM} = jsdom

// const graphStyle = `.graph { color: black; border-color: black; background: white;}.amplio { /* width: 3000px; */ height: 2000px;}.organizationChart { padding: 50px 0; display: inline-block;}.area { display: flex; justify-content: center; align-items: center; flex-direction: column;}.area-content { display: flex; justify-content: center; align-items: center; flex-direction: column; padding: 0px 60px;}.onlyChild { padding: 0px 0px;}.children { display: flex; justify-content: center; flex-direction: column; align-items: center;}.children-areas { display: flex; justify-content: center; flex-direction: row; align-items: flex-start;}.entegrama { border: 2px solid black; padding: 30px; display: flex; justify-content: center; align-items: center; width: 400px; height: 200px; font-size: 60px;}.topDiv { display: flex; flex-direction: row; justify-content: center;}.blankForConsultancy { width: 520px; height: 200px;}.consultancySeparation { width: 120px; height: 200px; display: flex; align-items: center;}.consultancyLine { width: 100%;}.espacio { width: 400px; height: 100px; display: flex; justify-content: center;}.linea { background: black; width: 2px;}.horizontal-contenedor { height: 2px; width: 100%;}.horizontal-linea { height: 2px; background: black;}.conector-horizontal { height: 2px; width: 50%; float: left; background: black;}.entegrama h3 { font-weight: 400; font-size: 44px; text-align: center; margin: 0; line-height: 56px;}`

exports.orgChart = functions.https.onCall((data, context) => {
	const text = data.text

	const orgData = SyntaxHelper.data(text)

	const org = new Organization(orgData)

	const organizationChart = org.organizationChart()

	const graphHTML = organizationChart.outerHTML

	return {html: graphHTML}
})

// exports.orgChart = functions.https.onCall((data, context) => {
// 	const text = data.text

// 	const orgData = SyntaxHelper.data(text)

// 	const org = new Organization(orgData)

// 	const organizationChart = org.organizationChart()

// 	const graphHTML = organizationChart.outerHTML

// 	const dom = new JSDOM(
// 		`<!DOCTYPE html><head><style>${graphStyle}</style></head><body><div class="graph" id="graph">${graphHTML}</div></body>`,
// 		{runScripts: 'dangerously'}
// 	)

// 	dom.window.document.body.children.length === 2

// 	// console.log('res: ' + organizationChart.outerHTML)

// 	htmlToImage.toPng(organizationChart).then(function (dataUrl) {
// 		return {html: organizationChart.outerHTML, img: `1`}
// 	})
// })