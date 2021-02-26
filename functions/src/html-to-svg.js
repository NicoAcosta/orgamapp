const puppeteer = require('puppeteer')

async function htmlToSvg(html) {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.addStyleTag({path: 'src/graph.css'})

	await page.addScriptTag({
		content: `
    document.body.innerHTML = '${html}'
	pData = '<p id="data"></p>'
	document.body.innerHTML += pData
    `,
	})

	await page.addScriptTag({path: 'src/dom-to-image.js'})

	await page.addScriptTag({
		content: `
    let orgChart = document.getElementById('organizationChart')
    let dataP = document.getElementById('data')
    domtoimage.toSvg(orgChart).then(function (dataUrl) {
        dataP.innerHTML = dataUrl
    })
    `,
	})

	// console.log(await page.content())

	const data = await page.evaluate(
		() => document.querySelector('#data').innerHTML
	)

	return data
}

//

module.exports = htmlToSvg
