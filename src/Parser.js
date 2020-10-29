/*
 * The parser is used to transform data from Inorigo in different ways, as well as extract meta data.
 */

export default class Parser {
    parseRawKSToJSON(dataSetOriginal) {
        const dataSet = { ...dataSetOriginal }
        const columns = dataSet.dataSets[0].metadata.columns
        const rows = dataSet.dataSets[0].rows
        return this.parseKSToTree(columns, rows)
    }

    groupColumns(columns) {
        let colsArray = []
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
                let parentObj = {}
                parentObj.title = parentPath
                parentObj.path = currentPath
                parentObj.isParent = true
                parentObj.group = group

                colsArray.push(parentObj)
            }

            if (!pathIsEqual) {
                group++
            }

            let colObj = {}
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

    parseKSToTree(column, row) {
        let columns = this.copyObject(column)
        let rows = this.copyObject(row)

        //Loop through all columns and determine the object breakpoints, metadata, and relationships
        let objectIndex = []
        let relationIndex = {}
        let lastIndex = 0
        let keyMap = {}

        columns.forEach(column => {
            //If we find "ID" it means this is a new object definition
            //Store the path (minus the last object, since that is an attribute) with the index where the object begins
            if (column.path.includes("ID")) {
                keyMap[JSON.stringify(column.path).replace(",\"ID\"]", "]")] = column.index
            }
            //If it is a new object definition (and not the origin), or if it is the last index in the table
            if ((column.path.includes("ID") && column.index !== 0) || column.index === columns.length - 1) {
                //Set the names of the definition columns
                let columnTitles = []
                //If it's the final item then we have to make sure to push the last column too..
                let lessThan = column.index === columns.length - 1 ? column.index + 1 : column.index
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
                let parent = keyMap[JSON.stringify(columns[lastIndex].path.slice().splice(0, columns[lastIndex].path.length - hierarchySteps))]
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
        let rowObjects = {}
        objectIndex.forEach(objIndex => {
            let processedIDs = []
            let values = rows
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
                    let object = {}
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
        let result = rowObjects[0]
        return result
    }

    buildResultSetRecursive(currentIndex, row, rowObjects, relationIndex, objectIndex) {
        let currentObject = rowObjects[currentIndex].filter(rowObj => {
            return rowObj.ID === row.cells[currentIndex]
        })[0]
        if (relationIndex[currentIndex] !== undefined) {
            relationIndex[currentIndex].forEach(childIndex => {
                if (row.cells[childIndex] !== undefined) {
                    let attrName = objectIndex.filter(objIndex => {
                        return objIndex.start === childIndex
                    })[0].title
                    let objValue = rowObjects[childIndex].filter(childObj => {
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

    copyObject(o) {
        var out, v, key
        out = Array.isArray(o) ? [] : {}
        for (key in o) {
            v = o[key]
            out[key] = typeof v === "object" && v !== null ? this.copyObject(v) : v
        }
        return out
    }

    groupBy(xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x)
            return rv
        }, {})
    }
}
