/*
 * The parser is used to transform data from Inorigo in different ways, as well as extract meta data.
 * This class is deprecated but kept for legacy reasons.
 */

export class Parser {
	/* DEPRECATED */
	parseRawKSToJSON(dataSetOriginal) {
		const dataSet = { ...dataSetOriginal }
		const columns = dataSet.dataSets[0].metadata.columns
		const rows = dataSet.dataSets[0].rows
		return this.parseKSToTree(columns, rows)
	}

	/* DEPRECATED */
	groupColumns(columns) {
		const colsArray = []
		let groupedPaths = []
		let prevPath = []
		let prevParentPath = ""
		let group = 0

		columns.forEach(column => {
			const currentPath = column.path.slice(0, column.path.length - 1)
			const pathIsEqual = JSON.stringify(prevPath) === JSON.stringify(currentPath)
			const parentPath = column.path[column.path.length - 2]
			const parentIsEqual = parentPath === prevParentPath

			if (!parentIsEqual) {
				group++
				const parentObj = {}
				parentObj.title = parentPath
				parentObj.path = currentPath
				parentObj.isParent = true
				parentObj.group = group

				colsArray.push(parentObj)
			}

			if (!pathIsEqual) {
				group++
			}

			const colObj = {}
			colObj.title = column.title
			colObj.path = currentPath
			colObj.group = group
			colObj.isParent = false

			colsArray.push(colObj)

			prevPath = currentPath
			prevParentPath = parentPath
		})

		const grouped = this.groupBy(colsArray, "group")
		groupedPaths = Object.values(grouped)
		return groupedPaths
	}

	/* DEPRECATED */
	parseKSToTree(column, row) {
		const columns = this.copyObject(column)
		const rows = this.copyObject(row)

		//Loop through all columns and determine the object breakpoints, metadata, and relationships
		const objectIndex = []
		const relationIndex = {}
		let lastIndex = 0
		const keyMap = {}

		columns.forEach(column => {
			//If we find "ID" it means this is a new object definition
			//Store the path (minus the last object, since that is an attribute) with the index where the object begins
			if (column.path.includes("ID")) {
				keyMap[JSON.stringify(column.path).replace(",\"ID\"]", "]")] = column.index
			}
			//If it is a new object definition (and not the origin), or if it is the last index in the table
			if ((column.path.includes("ID") && column.index !== 0) || column.index === columns.length - 1) {
				//Set the names of the definition columns
				const columnTitles = []
				//If it's the final item then we have to make sure to push the last column too..
				const lessThan = column.index === columns.length - 1 ? column.index + 1 : column.index
				for (let i = lastIndex; i < lessThan; i++) {
					columnTitles.push(columns[i].title)
				}
				//Where does the definition start, and end. What are the column titles, etc.
				objectIndex.push({
					start: lastIndex,
					end: lessThan,
					columns: columnTitles,
					title: columns[lastIndex].path[columns[lastIndex].path.length - 2]
				})
				//There could be a gap if the closest parent is not included in the actual data. Find the closest existing parent.
				let isFound = false
				let hierarchySteps = 2
				while (!isFound) {
					if (keyMap[JSON.stringify(columns[lastIndex].path.slice().splice(0, columns[lastIndex].path.length - hierarchySteps))] !== undefined) {
						isFound = true
					} else if (columns[lastIndex].path.slice().splice(0, columns[lastIndex].path.length - hierarchySteps).length === 0) {
						isFound = true
					} else {
						hierarchySteps++
					}
				}
				//What previous definition owns this definition?
				//Remove the last two objects from the path and lookup the startindex of the parent object
				const parent = keyMap[JSON.stringify(columns[lastIndex].path.slice().splice(0, columns[lastIndex].path.length - hierarchySteps))]
				if (parent !== undefined) {
					if (relationIndex[parent] === undefined) {
						relationIndex[parent] = []
					}
					relationIndex[parent].push(lastIndex)
				}
				//Prepare for next column
				lastIndex = column.index
			}
		})

		//Split the input row array into arrays per object definitions identified
		//Store them by definition start index
		const rowObjects = {}
		objectIndex.forEach(objIndex => {
			const processedIDs = []
			const values = rows
				.map(row => {
					return row.cells.slice(objIndex.start, objIndex.end)
				})
				//Clear duplicates
				.filter(row => {
					if (processedIDs.includes(row[0])) return false
					else processedIDs.push(row[0])
					return true
				})
				//Convert to objects using the definition data
				.map(row => {
					const object = {}
					for (let i = 0; i < objIndex.columns.length; i++) {
						object[objIndex.columns[i]] = row[i]
					}
					return object
				})
			rowObjects[objIndex.start] = values
		})
		//Build the result set by connecting all the dots
		rows.forEach(row => {
			this.buildResultSetRecursive(0, row, rowObjects, relationIndex, objectIndex)
		})
		const result = rowObjects[0]
		return result
	}

	/* DEPRECATED */
	buildResultSetRecursive(currentIndex, row, rowObjects, relationIndex, objectIndex) {
		const currentObject = rowObjects[currentIndex].filter(rowObj => {
			return rowObj.ID === row.cells[currentIndex]
		})[0]
		if (relationIndex[currentIndex] !== undefined) {
			relationIndex[currentIndex].forEach(childIndex => {
				if (row.cells[childIndex] !== undefined) {
					const attrName = objectIndex.filter(objIndex => {
						return objIndex.start === childIndex
					})[0].title
					const objValue = rowObjects[childIndex].filter(childObj => {
						return childObj.ID === row.cells[childIndex]
					})
					if (currentObject[attrName] === undefined) {
						currentObject[attrName] = []
					}
					if (
						currentObject[attrName].filter(item => {
							return item.ID === objValue[0].ID
						}).length === 0 &&
						objValue[0].ID !== null
					) {
						currentObject[attrName].push(objValue[0])
					}
					//Now go recursively down!
					this.buildResultSetRecursive(childIndex, row, rowObjects, relationIndex, objectIndex)
				}
			})
		}
	}

	// *** HELPERS *** //
	/* DEPRECATED */
	copyObject(o) {
		let v
		let key
		const out = Array.isArray(o) ? [] : {}
		for (key in o) {
			v = o[key]
			out[key] = typeof v === "object" && v !== null ? this.copyObject(v) : v
		}
		return out
	}

	/* DEPRECATED */
	groupBy(xs, key) {
		return xs.reduce((rv, x) => {
			(rv[x[key]] = rv[x[key]] || []).push(x)
			return rv
		}, {})
	}
}
