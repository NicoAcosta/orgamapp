// import {Relationship, Consultancy} from "./modeling.mjs"
// import {RegExHelper} from "./regex.mjs"

const RegExHelper = require('./regex.js')
const Modeling = require('./modeling.js')

class SyntaxHelper {
	static data(text) {
		const lines = text.split(/\s*\n+\s*/)
		let root = null
		const relationships = []
		const consultancies = []

		for (const line of lines) {
			if (RegExHelper.isRoot(line)) {
				root = RegExHelper.root(line)
			} else if (RegExHelper.isConsultancy(line)) {
				const parent = RegExHelper.consultancyParent(line)
				const child = RegExHelper.consultancyChild(line)

				const consultancy = new Modeling.Consultancy(parent, child)
				consultancies.push(consultancy)
			} else if (RegExHelper.isRelationship(line)) {
				const distance = RegExHelper.relationshipDistance(line)
				const parent = RegExHelper.relationshipParent(line)

				if (RegExHelper.isMultipleRelationship(line)) {
					const children = RegExHelper.relationshipMultipleChildren(line)

					for (const child of children) {
						const relationship = new Modeling.Relationship(
							parent,
							child,
							distance
						)
						relationships.push(relationship)
					}
				} else {
					const child = RegExHelper.relationshipSingleChild(line)

					const relationship = new Modeling.Relationship(
						parent,
						child,
						distance
					)
					relationships.push(relationship)
				}
			}
		}

		const data = [root, relationships, consultancies]

		return data
	}
}

module.exports = SyntaxHelper
