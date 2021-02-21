// Separar por comas

String.prototype.commaSplit = function () {
	return this.split(/\s*,\s*/)
}

// Espacios simples

String.prototype.singleSpaces = function () {
	return this.replace(/\s+/g, ' ')
}

String.prototype.customTrim = function () {
	return this.trim().singleSpaces()
}

// Trimear espacios

Array.prototype.trimElements = function () {
	return this.map((term) => term.customTrim())
}

// Separar por ->

String.prototype.arrowSplit = function () {
	return this.split(/\s*-*>\s*/)
}

// Separar por asesoría

String.prototype.consultancySplit = function () {
	return this.split(/\s*a:\s*/)
}

///////////////////////////////////////////////////////////////////////

class RegExHelper {
	static isRoot(line) {
		let regEx = /.*raiz\s.+/
		return regEx.test(line)
	}

	static isConsultancy(line) {
		let regEx = /.+\sa:\s.+/
		return regEx.test(line)
	}

	static isRelationship(line) {
		let regEx = /.+\s-+>\s.+/
		return regEx.test(line)
	}

	static relationshipDistance(line) {
		let regEx = /-+>/g
		return line.match(regEx)[0].length - 1
	}

	static isMultipleRelationship(line) {
		let regEx = /\s*.+\s*-+>\s*\[.+\]\s*/g
		return regEx.test(line)
	}

	static relationshipMultipleChildren(line) {
		let regEx = /\[(.*?)\]/g
		let str = line.match(regEx)[0]
		return str
			.substring(1, str.length - 1)
			.commaSplit()
			.trimElements()
	}

	static relationshipParent(line) {
		return line.arrowSplit()[0].customTrim()
	}

	static relationshipSingleChild(line) {
		return line.arrowSplit()[1].customTrim()
	}

	static root(line) {
		let rootKeyIndex = line.indexOf('raiz')
		return line.slice(rootKeyIndex + 4).trim()
	}

	static consultancyParent(line) {
		return line.consultancySplit()[0].customTrim()
	}

	static consultancyChild(line) {
		return line.consultancySplit()[1].customTrim()
	}

	static id(string) {
		return string
			.replace(/\s+/g, '')
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
	}
}

module.exports = RegExHelper
