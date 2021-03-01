// import {RegExHelper} from "./regex.js"

const RegExHelper = require('./regex.js')

const document = require('./jsdom.js')

class GraphicHelper {
	static divOfClass(someClass) {
		const div = document.createElement('div')
		div.classList.add(someClass)

		return div
	}

	static topVerticalLine(area) {
		const spacing = this.divOfClass('espacio')

		const line = this.divOfClass('linea')

		spacing.appendChild(line)

		spacing.style = this.verticalLineHeightStyle(area)

		return spacing
	}

	static bottomVerticalLine() {
		const spacing = this.divOfClass('espacio')

		const line = this.divOfClass('linea')

		spacing.appendChild(line)

		return spacing
	}

	static horizontalLine() {
		const div = this.divOfClass('horizontal-contenedor')

		const line = this.divOfClass('horizontal-linea')

		div.appendChild(line)

		return div
	}

	static firstChildHorizontalLine() {
		const div = this.divOfClass('horizontal-contenedor')

		const line = this.divOfClass('horizontal-linea')
		line.style = 'width: 50%!important; float: right!important;'

		div.appendChild(line)

		return div
	}

	static lastChildhorizontalLine() {
		const div = this.divOfClass('horizontal-contenedor')

		const line = this.divOfClass('horizontal-linea')
		line.style = 'width: 50%!important; float: left!important;'

		div.appendChild(line)

		return div
	}

	static verticalLineHeightStyle(area) {
		const d = area.distanceToParent
		const separation = 100
		const entegrama = 200
		const height = separation + (d - 1) * (2 * separation + entegrama)
		return 'height: ' + height + 'px!important'
	}

	static entegrama(text) {
		const div = GraphicHelper.divOfClass('entegrama')
		const title = document.createElement('h3')
		title.classList.add('nombre')
		title.innerHTML = text
		div.appendChild(title)
		return div
	}
}

class Relationship {
	constructor(parent, child, distance) {
		this.parent = parent
		this.child = child
		this.distance = distance
	}
}

class Consultancy {
	constructor(parent, child) {
		this.parent = parent
		this.child = child
	}
}

class Child {
	constructor(area, distance) {
		this.area = area
		this.distance = distance
	}
}

class Area {
	consultancy = null
	parent = null
	id = null
	distanceToParent = null

	constructor(name) {
		this.name = name
		this.id = RegExHelper.id(name)
		this.children = [] // Child -> area, distance
	}

	addChild(newChild) {
		this.children.push(newChild)
	}

	setConsultancy(newConsultancy) {
		this.consultancy = newConsultancy
	}

	hasConsultancy() {
		return this.consultancy != null
	}

	hasChildren() {
		return this.children.length > 0
	}

	hasParent() {
		return this.parent != null
	}

	firstChild() {
		return this.children[0].area
	}

	lastChild() {
		return this.children[this.children.length - 1].area
	}

	isOnlyChild() {
		return this.parent.children.length == 1
	}

	isFirstChild() {
		if (this.hasParent()) return this.parent.firstChild() == this
	}

	isLastChild() {
		if (this.hasParent()) return this.parent.lastChild() == this
	}

	// Graphics

	entegramaWithConsultancy() {
		const topDiv = GraphicHelper.divOfClass('topDiv')

		const blankForConsultancy = GraphicHelper.divOfClass('blankForConsultancy')

		const title = GraphicHelper.entegrama(this.name)

		const consultancySeparation = GraphicHelper.divOfClass(
			'consultancySeparation'
		)

		const consultancyLine = document.createElement('svg')
		consultancyLine.id = 'consultancyLine'
		consultancyLine.innerHTML = `<line x1="0" y1="110" x2="120" y2="110" stroke="black" stroke-dasharray="11 7" stroke-width="2"></line>`

		consultancySeparation.appendChild(consultancyLine)

		const consultancy = GraphicHelper.entegrama(this.consultancy)

		topDiv.appendChild(blankForConsultancy)
		topDiv.appendChild(title)
		topDiv.appendChild(consultancySeparation)
		topDiv.appendChild(consultancy)

		return topDiv
	}

	childrenDiv() {
		const div = GraphicHelper.divOfClass('children')

		// conector horizontal

		const childrenAreas = GraphicHelper.divOfClass('children-areas')

		this.children.forEach((child) =>
			childrenAreas.appendChild(child.area.areaDiv())
		)

		div.appendChild(childrenAreas)

		return div
	}

	areaDiv() {
		const div = GraphicHelper.divOfClass('area')

		if (this.hasParent()) {
			if (!this.isOnlyChild()) {
				let horizontalLine = GraphicHelper.horizontalLine()

				if (this.isFirstChild())
					horizontalLine = GraphicHelper.firstChildHorizontalLine()
				if (this.isLastChild())
					horizontalLine = GraphicHelper.lastChildhorizontalLine()

				div.appendChild(horizontalLine)
			}

			div.appendChild(GraphicHelper.topVerticalLine(this))
		}

		const content = GraphicHelper.divOfClass('area-content')

		if (!this.hasParent() || this.isOnlyChild()) {
			content.classList.add('onlyChild')
		}

		if (this.hasConsultancy()) {
			const topDiv = content.appendChild(this.entegramaWithConsultancy())
		} else {
			const entegrama = GraphicHelper.entegrama(this.name)
			content.appendChild(entegrama)
		}

		if (this.hasChildren()) {
			content.appendChild(GraphicHelper.bottomVerticalLine())

			content.appendChild(this.childrenDiv())
		}

		div.appendChild(content)

		return div
	}
}

//export {Area, Relationship, Child, Consultancy}

module.exports = {
	Area: Area,
	Relationship: Relationship,
	Child: Child,
	Consultancy: Consultancy,
}
