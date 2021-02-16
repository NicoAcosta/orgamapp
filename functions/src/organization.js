//import {CastingHelper} from './typeCasting.mjs'
// import {Area, Relationship, Consultancy, Child} from "./modeling.mjs"
// import {RegExHelper} from "./regex.js"

const Modeling = require('./modeling.js')
const RegExHelper = require('./regex.js')
const document = require('./jsdom.js')

class Organization {
	constructor(data) {
		const [rootName, relationships, consultancies] = data
		this.areas = []
		this.root = new Modeling.Area(rootName)
		this.areas.push(this.root)
		this.relationships = relationships
		this.addAreas()
		this.relate()
		this.consultancies = consultancies
		this.addConsultancies()
	}

	organizationChart() {
		const div = document.createElement('div')
		div.id = 'organizationChart'
		div.classList.add('organizationChart')
		const areas = this.root.areaDiv()
		div.appendChild(areas)
		return div
	}

	relate() {
		for (const relationship of this.relationships) {
			const parentArea = this.getAreaByName(relationship.parent)
			const childArea = this.getAreaByName(relationship.child)
			const distance = relationship.distance

			childArea.distanceToParent = distance
			childArea.parent = parentArea

			const newChild = new Modeling.Child(childArea, distance)
			parentArea.addChild(newChild)
		}
	}

	getAreaByName(areaName) {
		return this.areas.find((area) => area.id == RegExHelper.id(areaName))
	}

	addAreas() {
		for (const relationship of this.relationships) {
			this.addArea(relationship.parent)
			this.addArea(relationship.child)
		}
	}

	addArea(areaName) {
		if (!this.alreadyAdded(areaName))
			this.areas.push(new Modeling.Area(areaName))
	}

	alreadyAdded(areaName) {
		const ids = this.areas.map((area) => area.id)
		return ids.includes(RegExHelper.id(areaName))
	}

	addConsultancies() {
		for (const consultancy of this.consultancies) {
			const parent = this.getAreaByName(consultancy.parent)
			parent.setConsultancy(consultancy.child)
		}
	}
}

module.exports = Organization
