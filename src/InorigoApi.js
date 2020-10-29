import axios from "axios"

/*
 * This is the main API communication class.
 * This class contains functions that return communication instances of each respective API of Inorigo, but with one shared API class instance.
 * The class uses Axios under the hood to do the heavy lifting.
 */
export default class InorigoAPI {
    constructor(url, { customHttpsAgent, authorization, apiEndpoint }) {
        this.IS_SECURE = true
        this.BASE_URL = url
        this.BASE_URL_API = url += "services/api/v1/"
        this.DEFAULTCONFIG = {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Accept: "application/json",
                "Access-Control-Max-Age": 1728000
            },
            data: {},
            withCredentials: true
        }

        if (apiEndpoint) {
            this.BASE_URL_API = this.BASE_URL + apiEndpoint
        }

        if (customHttpsAgent !== undefined) {
            this.IS_SECURE = false
            this.DEFAULTCONFIG = {
                ...this.DEFAULTCONFIG,
                httpsAgent: customHttpsAgent
            }
        }

        if (authorization) {
            if (authorization.username && authorization.password) {
                this.DEFAULTCONFIG.headers.Authorization = "Basic " + this.genericBtoA(authorization.username + ":" + authorization.password)
            }
        }
    }

    /* Security, Global Settings */

    injectCookies(cookies) {
        this.DEFAULTCONFIG.headers.Cookie = cookies
    }

    /* Account, Session */

    login(username, password) {
        const CONFIG = {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Accept: "application/json",
                Authorization: "Basic " + this.genericBtoA(username + ":" + password)
            },
            data: {},
            withCredentials: true
        }
        if (!this.IS_SECURE) {
            CONFIG.httpsAgent = this.DEFAULTCONFIG.httpsAgent
        }
        return axios.post(`${this.BASE_URL}services/open/login`, {}, CONFIG)
    }

    logout() {
        return axios.post(`${this.BASE_URL}services/open/logout`, {}, this.DEFAULTCONFIG)
    }

    getSession() {
        return axios.get(`${this.BASE_URL}services/open/session/user`, this.DEFAULTCONFIG)
    }

    /* API Shortcuts (Common inorigo helper functions) */

    shortcuts() {
        return {
            getClassifiedValuesList: (definitionUUID, isDeep) => {
                return new Promise(resolve => {
                    this.entity()
                        .getSubClasses("AsDefinition", definitionUUID, isDeep)
                        .then(response => {
                            const promises = response.data.entities.map(entity => {
                                return this.entity().getEntity("AsDefinition", entity.id)
                            })
                            Promise.all(promises).then(result => {
                                const options = result.map(genderOption => {
                                    return {
                                        presentation: genderOption.data.presentation,
                                        id: genderOption.data.id,
                                        abstract: genderOption.data.attributeValues.filter(item => {
                                            return item.name === "abstract"
                                        })[0].value
                                    }
                                })
                                resolve(options)
                            })
                        })
                })
            }
        }
    }

    /* Verso (Application Builder) */

    versoRuntime() {
        return {
            refresh: vrid => {
                return axios.post(`${this.BASE_URL_API}application/runtime/${vrid}/refresh`, {}, this.DEFAULTCONFIG)
            },

            calculate: vrid => {
                return axios.post(`${this.BASE_URL_API}application/runtime/${vrid}/calculate`, {}, this.DEFAULTCONFIG)
            },

            clear: (vrid, where) => {
                return axios.post(
                    `${this.BASE_URL_API}application/runtime/${vrid}/select/clear${this.buildURIParams({
                        where: where
                    })}`,
                    {},
                    this.DEFAULTCONFIG
                )
            },

            getValue: (vrid, where) => {
                return axios.get(`${this.BASE_URL_API}application/runtime/${vrid}/variable/value?key=${where}`, this.DEFAULTCONFIG)
            },

            selectOne: (vrid, where, what, isClearFirst) => {
                return axios.post(
                    `${this.BASE_URL_API}application/runtime/${vrid}/select/one${this.buildURIParams({
                        where: where,
                        what: what,
                        clear: isClearFirst
                    })}`,
                    {},
                    this.DEFAULTCONFIG
                )
            },

            selectMany: (vrid, selectionJSON) => {
                return axios.post(`${this.BASE_URL_API}application/runtime/${vrid}/select/many`, selectionJSON, this.DEFAULTCONFIG)
            },

            countAll: (vrid, where) => {
                return axios.get(`${this.BASE_URL_API}application/runtime/${vrid}/items/count/all?where=${where}`, this.DEFAULTCONFIG)
            },

            countSelected: (vrid, where) => {
                return axios.get(`${this.BASE_URL_API}application/runtime/${vrid}/items/count/selected?where=${where}`, this.DEFAULTCONFIG)
            },

            countExplicit: (vrid, where) => {
                return axios.get(`${this.BASE_URL_API}application/runtime/${vrid}/items/count/explicit?where=${where}`, this.DEFAULTCONFIG)
            },

            countImplicit: (vrid, where) => {
                return axios.get(`${this.BASE_URL_API}application/runtime/${vrid}/items/count/implicit?where=${where}`, this.DEFAULTCONFIG)
            },

            getScript: vrid => {
                return axios.get(`${this.BASE_URL_API}application/runtime/${vrid}/script`, this.DEFAULTCONFIG)
            },

            getTooltip: (vrid, componentID, row, column) => {
                return axios.get(
                    `${this.BASE_URL_API}application/runtime/${vrid}/cell/tooltip${this.buildURIParams({
                        componentID: componentID,
                        row: row,
                        column: column
                    })}`,
                    this.DEFAULTCONFIG
                )
            },

            evaluateExpression: (vrid, expression) => {
                return axios.get(`${this.BASE_URL_API}application/runtime/${vrid}/evaluate?expression=${expression}`, this.DEFAULTCONFIG)
            },

            setRuntimeVariable: (vrid, name, type, element, value) => {
                const payload = {
                    name: name,
                    type: type,
                    element: element,
                    value: value
                }
                return axios.post(`${this.BASE_URL_API}application/runtime/${vrid}/set/runtime/value`, payload, this.DEFAULTCONFIG)
            },

            lockSelection: (vrid, where) => {
                return axios.post(
                    `${this.BASE_URL_API}application/runtime/${vrid}/lock/selection${this.buildURIParams({
                        where: where
                    })}`,
                    {},
                    this.DEFAULTCONFIG
                )
            },

            unlockSelection: (vrid, where) => {
                return axios.post(
                    `${this.BASE_URL_API}application/runtime/${vrid}/unlock/selection${this.buildURIParams({
                        where: where
                    })}`,
                    {},
                    this.DEFAULTCONFIG
                )
            },

            focusComponent: (vrid, component) => {
                return axios.post(`${this.BASE_URL_API}application/runtime/${vrid}/component/focus/${component}`, {}, this.DEFAULTCONFIG)
            }
        }
    }

    /* Knowledgeset (Flattened Structure) */

    knowledgeset() {
        return {
            getMetaData: uuid => {
                return axios.post(`${this.BASE_URL_API}knowledgeset/${uuid}?metadata=true&page=1&pagesize=0`, {}, this.DEFAULTCONFIG)
            },

            getResult: (uuid, isDistinct, page, pagesize, parameters) => {
                let uriParams = {
                    metadata: true,
                    distinct: isDistinct,
                    page: page,
                    pagesize: pagesize
                }
                return axios.post(
                    `${this.BASE_URL_API}knowledgeset/${uuid}${this.buildURIParams(uriParams)}`,
                    parameters !== undefined && parameters !== null ? { parameters: parameters } : {},
                    this.DEFAULTCONFIG
                )
            },

            searchResult: (uuid, text, fuzzy, metaData, compactLeafs, allowCache, searchIDs, includedColumns, excludedColumns) => {
                let uriParams = {
                    text: text,
                    fuzzy: fuzzy,
                    metadata: metaData,
                    compactleafs: compactLeafs,
                    allowCache: allowCache,
                    searchIDs: searchIDs,
                    includedColumns: includedColumns,
                    excludedColumns: excludedColumns
                }
                return axios.get(`${this.BASE_URL_API}knowledgeset/${uuid}/tree/search/text${this.buildURIParams(uriParams)}`, this.DEFAULTCONFIG)
            },

            getCachedResult: (uuid, page, pagesize, compactPaths) => {
                let uriParams = {
                    metadata: true,
                    compactPaths: compactPaths,
                    page: page,
                    pagesize: pagesize
                }
                return axios.get(`${this.BASE_URL_API}knowledgeset/${uuid}/cache/read${this.buildURIParams(uriParams)}`, this.DEFAULTCONFIG)
            },

            getTreeResult: (uuid, metaData, compactLeafs, parameters, allowCache) => {
                let uriParams = {
                    metadata: metaData,
                    compactleafs: compactLeafs,
                    allowCache: allowCache
                }
                return axios.post(
                    `${this.BASE_URL_API}knowledgeset/tree/${uuid}${this.buildURIParams(uriParams)}`,
                    parameters !== undefined && parameters !== null ? { parameters: parameters } : {},
                    this.DEFAULTCONFIG
                )
            },

            searchTreeResult: (uuid, text, fuzzy, metaData, compactLeafs, allowCache, searchIDs, includedColumns, excludedColumns) => {
                let uriParams = {
                    text: text,
                    fuzzy: fuzzy,
                    metadata: metaData,
                    compactleafs: compactLeafs,
                    allowCache: allowCache,
                    searchIDs: searchIDs,
                    includedColumns: includedColumns,
                    excludedColumns: excludedColumns
                }
                return axios.get(`${this.BASE_URL_API}knowledgeset/${uuid}/tree/search/text${this.buildURIParams(uriParams)}`, this.DEFAULTCONFIG)
            },

            getAvailable: () => {
                return axios.get(`${this.BASE_URL_API}knowledgeset/list`, this.DEFAULTCONFIG)
            },

            query: (uuid, query, metadata, context, parameters, allowCache) => {
                let uriParams = {
                    sql: query,
                    metadata: metadata,
                    context: context,
                    allowCache: allowCache
                }
                return axios.post(
                    `${this.BASE_URL_API}knowledgeset/${uuid}/query${this.buildURIParams(uriParams)}`,
                    parameters !== undefined && parameters !== null ? { parameters: parameters } : {},
                    this.DEFAULTCONFIG
                )
            },

            countRows: (uuid, isDistinct) => {
                return axios.post(
                    `${this.BASE_URL_API}knowledgeset/${uuid}/count${this.buildURIParams({
                        distinct: isDistinct
                    })}`,
                    {},
                    this.DEFAULTCONFIG
                )
            },

            getSchedulingStatus: () => {
                return axios.get(`${this.BASE_URL_API}knowledgeset/scheduling/status`, this.DEFAULTCONFIG)
            }
        }
    }

    /* Entity (Data Objects) */

    entity() {
        return {
            generateUUID: count => {
                return axios.get(
                    `${this.BASE_URL_API}entity/generateid${this.buildURIParams({
                        count: count
                    })}`,
                    this.DEFAULTCONFIG
                )
            },

            getEntity: (entityType, uuid) => {
                return axios.get(`${this.BASE_URL_API}entity/${entityType}/${uuid}/`, this.DEFAULTCONFIG)
            },

            getinstances: (entityType, uuid, informationType, page, pagesize) => {
                return axios.get(
                    `${this.BASE_URL_API}entity/${entityType}/${uuid}/instances${this.buildURIParams({
                        info: informationType,
                        page: page,
                        pagesize: pagesize
                    })}`,
                    this.DEFAULTCONFIG
                )
            },

            partners: (entityType, uuid, relationUuid, direction, isRecursive, isLeafsOnly, informationType, page, pagesize) => {
                return axios.get(
                    `${this.BASE_URL_API}entity/${entityType}/${uuid}/partners${this.buildURIParams({
                        relation: relationUuid,
                        direction: direction,
                        recursive: isRecursive,
                        leafsonly: isLeafsOnly,
                        info: informationType,
                        page: page,
                        pagesize: pagesize
                    })}`,
                    this.DEFAULTCONFIG
                )
            },

            getDefinitions: (entityType, uuid, isDeep, informationType, page, pagesize) => {
                return axios.get(
                    `${this.BASE_URL_API}entity/${entityType}/${uuid}/definitions${this.buildURIParams({
                        deep: isDeep,
                        info: informationType,
                        page: page,
                        pagesize: pagesize
                    })}`,
                    this.DEFAULTCONFIG
                )
            },

            getSuperClasses: (entityType, uuid, isDeep, informationType, page, pagesize) => {
                return axios.get(
                    `${this.BASE_URL_API}entity/${entityType}/${uuid}/superclasses?deep=${this.buildURIParams({
                        deep: isDeep,
                        info: informationType,
                        page: page,
                        pagesize: pagesize
                    })}`,
                    this.DEFAULTCONFIG
                )
            },

            getSubClasses: (entityType, uuid, isDeep, informationType, page, pagesize) => {
                return axios.get(
                    `${this.BASE_URL_API}entity/${entityType}/${uuid}/subclasses${this.buildURIParams({
                        deep: isDeep,
                        info: informationType,
                        page: page,
                        pagesize: pagesize
                    })}`,
                    this.DEFAULTCONFIG
                )
            },

            getReferents: (entityType, uuid, page, pagesize) => {
                return axios.get(
                    `${this.BASE_URL_API}entity/${entityType}/${uuid}/referents${this.buildURIParams({
                        page: page,
                        pagesize: pagesize
                    })}`,
                    this.DEFAULTCONFIG
                )
            },

            getRelations: (entityType, uuid, relationUuid, direction, page, pagesize) => {
                return axios.get(
                    `${this.BASE_URL_API}entity/${entityType}/${uuid}/relations${this.buildURIParams({
                        specifier: relationUuid,
                        direction: direction,
                        page: page,
                        pagesize: pagesize
                    })}`,
                    this.DEFAULTCONFIG
                )
            },

            updateEntity: entityJSON => {
                return axios.put(`${this.BASE_URL_API}entity`, entityJSON, this.DEFAULTCONFIG)
            },

            createEntity: entityJSONArray => {
                return axios.post(`${this.BASE_URL_API}entity`, entityJSONArray, this.DEFAULTCONFIG)
            },
            transaction: transactionData => {
                return axios.post(`${this.BASE_URL_API}entity/commit/transaction`, transactionData, this.DEFAULTCONFIG)
            },

            deleteEntity: (entityType, uuid) => {
                return axios.delete(`${this.BASE_URL_API}entity/${entityType}/${uuid}`, this.DEFAULTCONFIG)
            },

            getSimplifiedInstances: definitionUUID => {
                return axios.get(`${this.BASE_URL_API}entity/AsDefinition/${definitionUUID}/instances?info=values`, this.DEFAULTCONFIG).then(result => {
                    const simplifiedJSON = result.data.entities.map(entity => {
                        const newEntity = {
                            id: entity.id,
                            type: entity.dataType
                        }
                        newEntity.values = entity.attributeValues.reduce((simplifiedOilEntity, attributeValue) => {
                            simplifiedOilEntity[attributeValue.name] = attributeValue.value
                            return simplifiedOilEntity
                        }, {})
                        return newEntity
                    })
                    return new Promise(resolve => {
                        resolve(simplifiedJSON)
                    })
                })
            },

            getSimplifiedEntity: (entityType, uuid) => {
                return axios.get(`${this.BASE_URL_API}entity/${entityType}/${uuid}/`, this.DEFAULTCONFIG).then(result => {
                    let simplifiedResult = result.data.attributeValues.reduce((acc, attributeValue) => {
                        acc[attributeValue.name] = attributeValue.value
                        return acc
                    }, {})
                    simplifiedResult.type = entityType
                    simplifiedResult.uuid = uuid
                    simplifiedResult.presentation = result.data.presentation
                    Promise.resolve(simplifiedResult)
                })
            },

            getGraphDependencies: (
                entityType,
                uuid,
                dependants = true,
                dependencies = true,
                values = true,
                references = true,
                relations = true,
                instances = true,
                presentations = true
            ) => {
                return axios.get(
                    `${this.BASE_URL_API}entity/${entityType}/${uuid}/dependencies/graph${this.buildURIParams({
                        dependants: dependants,
                        dependencies: dependencies,
                        values: values,
                        references: references,
                        relations: relations,
                        instances: instances,
                        presentations: presentations
                    })}`,
                    this.DEFAULTCONFIG
                )
            },

            getPossibleEntityReferences: (entityType, uuid) => {
                return axios.get(
                    `${this.BASE_URL_API}entity/possible/references${this.buildURIParams({
                        type: entityType,
                        id: uuid
                    })}`,
                    this.DEFAULTCONFIG
                )
            },

            getPossibleInstanceReferences: (definitionType, uuid) => {
                return axios.get(
                    `${this.BASE_URL_API}entity/possible/instance/references${this.buildURIParams({
                        type: definitionType,
                        id: uuid
                    })}`,
                    this.DEFAULTCONFIG
                )
            },

            getPresentation: (entityType, uuid, povAttributeID) => {
                return axios.get(
                    `${this.BASE_URL_API}entity/${entityType}/${uuid}/presentation${this.buildURIParams({
                        povAttributeID: povAttributeID
                    })}`,
                    this.DEFAULTCONFIG
                )
            },

            getDependencyEdges: (
                entityType,
                uuid,
                dependants = true,
                dependencies = true,
                values = true,
                references = true,
                relations = true,
                instances = true,
                presentations = true
            ) => {
                return axios.get(
                    `${this.BASE_URL_API}entity/${entityType}/${uuid}/dependencies/edges${this.buildURIParams({
                        dependants: dependants,
                        dependencies: dependencies,
                        values: values,
                        references: references,
                        relations: relations,
                        instances: instances,
                        presentations: presentations
                    })}`,
                    this.DEFAULTCONFIG
                )
            },

            getEntityIcon: (entityType, uuid, size, contextID) => {
                return axios.get(
                    `${this.BASE_URL_API}entity/${entityType}/${uuid}/icon${this.buildURIParams({
                        size: size,
                        contextID: contextID
                    })}`,
                    this.DEFAULTCONFIG
                )
            },

            getEntityIconID: (entityType, uuid, contextID) => {
                return axios.get(
                    `${this.BASE_URL_API}entity/${entityType}/${uuid}/icon/id${this.buildURIParams({
                        contextID: contextID
                    })}`,
                    this.DEFAULTCONFIG
                )
            },

            getValueset: uuid => {
                return axios.get(`${this.BASE_URL_API}entity/valueset/${uuid}`, this.DEFAULTCONFIG)
            },

            getPresentations: entityArray => {
                return axios.post(`${this.BASE_URL_API}entity/presentations/`, entityArray, this.DEFAULTCONFIG)
            }
        }
    }

    /* Resource (Files) */

    resource() {
        return {
            getResource: uuid => {
                return axios.get(`${this.BASE_URL_API}resource/resource/${uuid}/`, this.DEFAULTCONFIG)
            },

            deleteResource: uuid => {
                return axios.delete(`${this.BASE_URL_API}resource/resource/${uuid}`, this.DEFAULTCONFIG)
            },

            createResource: resourceJSONArray => {
                return axios.post(`${this.BASE_URL_API}resource/resource`, resourceJSONArray, this.DEFAULTCONFIG)
            },

            updateResource: resourceJSONArray => {
                return axios.put(`${this.BASE_URL_API}resource/resource`, resourceJSONArray, this.DEFAULTCONFIG)
            }
        }
    }

    /* Legacy Endpoints (some of which are undocumented!) */

    legacy() {
        return {
            executeMethod: (uuid, contextID, commit, inputArray) => {
                const inputString = inputArray.reduce((acc, item) => {
                    acc += `&input=${item}`
                    return acc
                }, "")
                return axios.get(`${this.BASE_URL}services/authorized/${contextID}/execute/method/${uuid}?commit=${commit}${inputString}`, this.DEFAULTCONFIG)
            },

            executeChange: (uuid, contextID, commit, inputArray) => {
                const inputString = inputArray.reduce((acc, item) => {
                    acc += `&input=${item}`
                    return acc
                }, "")
                return axios.get(`${this.BASE_URL}services/authorized/${contextID}/execute/change/${uuid}?commit=${commit}${inputString}`, this.DEFAULTCONFIG)
            }
        }
    }

    /* Utility Functions */

    buildURIParams(object) {
        let returnString = ""
        //Stringify removes the undefined values
        let tempObj = JSON.stringify(object)
        if (tempObj !== JSON.stringify({})) {
            returnString = "?"
        }
        tempObj = JSON.parse(tempObj)
        return (
            returnString +
            Object.keys(tempObj)
                .map(key => {
                    if (Array.isArray(tempObj[key])) {
                        let uriShard = ""
                        tempObj[key].forEach(value => {
                            uriShard = `${uriShard}&${key}=${value}`
                        })
                        return encodeURIComponent(uriShard.substr(1))
                    }
                    return [key, "" + tempObj[key]].map(encodeURIComponent).join("=")
                })
                .join("&")
        )
    }

    genericBtoA(b) {
        if (typeof process === "object" && Object.prototype.toString.call(process) === "[object process]") {
            //If running in node, use Buffer
            return Buffer.from(b).toString("base64")
        } else {
            //If running in browser, use btoa()
            return btoa(b)
        }
    }
}
