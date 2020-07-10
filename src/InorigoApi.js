import axios from "axios";
import * as https from 'https';

/*
 * This is the main API communication class.
 * This class contains functions that return communication instances of each respective API of Inorigo, but with one shared API class instance.
 * The class uses Axios under the hood to do the heavy lifting.
*/
export default class InorigoAPI {

  constructor(url, { rejectUnauthorized, authorization, apiEndpoint }) {
    this.IS_SECURE = true
    this.BASE_URL = url;
    this.BASE_URL_API = url += "services/api/v1/"
    this.DEFAULTCONFIG = {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Accept": "application/json",
        "Access-Control-Max-Age": 1728000
      },
      data: {},
      withCredentials: true
    }

    if (apiEndpoint) {
      this.BASE_URL_API = this.BASE_URL + apiEndpoint
    }

    if (rejectUnauthorized !== undefined) {
      this.IS_SECURE = rejectUnauthorized
      const agent = new https.Agent({
        rejectUnauthorized: rejectUnauthorized
      })
      this.DEFAULTCONFIG = {
        ...this.DEFAULTCONFIG,
        httpsAgent: agent
      }
    }

    if (authorization) {
      if (authorization.username && authorization.password) {
        this.DEFAULTCONFIG.headers.Authorization = "Basic " +
          this.genericBtoA(authorization.username + ":" + authorization.password)
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
    return axios.post(`${this.BASE_URL}services/open/login`, {}, CONFIG);
  }

  logout() {
    return axios.post(`${this.BASE_URL}services/open/logout`, {}, this.DEFAULTCONFIG);
  }

  getSession() {
    return axios.get(`${this.BASE_URL}services/open/session/user`, this.DEFAULTCONFIG);
  }

  /* API Shortcuts (Common inorigo helper functions) */

  shortcuts() {
    return {

      getClassifiedValuesList: (definitionUUID, isDeep) => {
        return new Promise((resolve, reject) => {
          this.entity().getSubClasses("AsDefinition", definitionUUID, isDeep).then(response => {
            const promises = response.data.entities.map(entity => {
              return this.entity().getEntity("AsDefinition", entity.id)
            })
            Promise.all(promises).then(result => {
              const options = result.map(genderOption => {
                return {
                  presentation: genderOption.data.presentation,
                  id: genderOption.data.id,
                  abstract: genderOption.data.attributeValues.filter(item => { return item.name === "abstract" })[0].value
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

      refresh: (vrid) => {
        return axios.post(`${this.BASE_URL_API}application/runtime/${vrid}/refresh`, {}, this.DEFAULTCONFIG)
      },

      calculate: (vrid) => {
        return axios.post(`${this.BASE_URL_API}application/runtime/${vrid}/calculate`, {}, this.DEFAULTCONFIG)
      },

      clear: (vrid, where) => {
        return axios.post(`${this.BASE_URL_API}application/runtime/${vrid}/select/clear${this.buildURIParams({
          where: where,
        })}`,
          {}, this.DEFAULTCONFIG)
      },

      getValue: (vrid, where) => {
        return axios.get(`${this.BASE_URL_API}application/runtime/${vrid}/variable/value?key=${where}`, this.DEFAULTCONFIG)
      },

      selectOne: (vrid, where, what, isClearFirst) => {
        return axios.post(`${this.BASE_URL_API}application/runtime/${vrid}/select/one${this.buildURIParams({
          where: where,
          what: what,
          clear: isClearFirst
        })}`,
          {}, this.DEFAULTCONFIG)
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

      getScript: (vrid) => {
        return axios.get(`${this.BASE_URL_API}application/runtime/${vrid}/script`, this.DEFAULTCONFIG)
      },
    }
  }

  /* Knowledgeset (Flattened Structure) */

  knowledgeset() {
    return {

      getMetaData: uuid => {
        return axios.post(`${this.BASE_URL_API}knowledgeset/${uuid}?metadata=true&page=1&pagesize=0`, {}, this.DEFAULTCONFIG)
      },

      getResult: (uuid, isDistinct, page, pagesize, parameters, allowCache) => {
        let uriParams = {
          metadata: true,
          distinct: isDistinct,
          page: page,
          pagesize: pagesize
        }
        if (allowCache !== undefined && allowCache !== null) {
          uriParams.allowcache = "" + allowCache
        }
        return axios.post(`${this.BASE_URL_API}knowledgeset/${uuid}${this.buildURIParams(uriParams)}`,
          parameters !== undefined && parameters !== null ? { parameters: parameters } : {},
          this.DEFAULTCONFIG)
      },

      getTreeResult: (uuid, metaData, compactLeafs, parameters, allowCache) => {
        let uriParams = {
          metadata: metaData,
          compactleafs: compactLeafs,
        }
        if (allowCache !== undefined && allowCache !== null) {
          uriParams.allowcache = "" + allowCache
        }
        return axios.post(`${this.BASE_URL_API}knowledgeset/tree/${uuid}${this.buildURIParams(uriParams)}`,
          parameters !== undefined && parameters !== null ? { parameters: parameters } : {},
          this.DEFAULTCONFIG)
      },

      getAvailable: () => {
        return axios.get(`${this.BASE_URL_API}knowledgeset/list`, this.DEFAULTCONFIG)
      },

      query: (uuid, query) => {
        return axios.post(`${this.BASE_URL_API}knowledgeset/${uuid}/query?sql=${query}`, {}, this.DEFAULTCONFIG)
      },

      countRows: (uuid, isDistinct) => {
        return axios.post(`${this.BASE_URL_API}knowledgeset/${uuid}/count${this.buildURIParams({
          distinct: isDistinct
        })}`,
          {}, this.DEFAULTCONFIG)
      }

    }
  }

  /* Entity (Data Objects) */

  entity() {
    return {

      generateUUID: count => {
        return axios.get(`${this.BASE_URL_API}entity/generateid${this.buildURIParams({
          count: count
        })}`,
          this.DEFAULTCONFIG)
      },

      getEntity: (entityType, uuid) => {
        return axios.get(`${this.BASE_URL_API}entity/${entityType}/${uuid}/`, this.DEFAULTCONFIG)
      },

      getinstances: (entityType, uuid, informationType, page, pagesize) => {
        return axios.get(`${this.BASE_URL_API}entity/${entityType}/${uuid}/instances${this.buildURIParams({
          info: informationType,
          page: page,
          pagesize: pagesize
        })}`,
          this.DEFAULTCONFIG)
      },

      partners: (entityType, uuid, relationUuid, direction, isRecursive, isLeafsOnly, informationType, page, pagesize) => {
        return axios.get(`${this.BASE_URL_API}entity/${entityType}/${uuid}/partners${this.buildURIParams({
          relation: relationUuid,
          direction: direction,
          recursive: isRecursive,
          leafsonly: isLeafsOnly,
          info: informationType,
          page: page,
          pagesize: pagesize
        })}`,
          this.DEFAULTCONFIG)
      },

      getDefinitions: (entityType, uuid, isDeep, informationType, page, pagesize) => {
        return axios.get(`${this.BASE_URL_API}entity/${entityType}/${uuid}/definitions${this.buildURIParams({
          deep: isDeep,
          info: informationType,
          page: page,
          pagesize: pagesize
        })}`,
          this.DEFAULTCONFIG)
      },

      getSuperClasses: (entityType, uuid, isDeep, informationType, page, pagesize) => {
        return axios.get(`${this.BASE_URL_API}entity/${entityType}/${uuid}/superclasses?deep=${this.buildURIParams({
          deep: isDeep,
          info: informationType,
          page: page,
          pagesize: pagesize
        })}`,
          this.DEFAULTCONFIG)
      },

      getSubClasses: (entityType, uuid, isDeep, informationType, page, pagesize) => {
        return axios.get(`${this.BASE_URL_API}entity/${entityType}/${uuid}/subclasses${this.buildURIParams({
          deep: isDeep,
          info: informationType,
          page: page,
          pagesize: pagesize
        })}`,
          this.DEFAULTCONFIG)
      },

      getReferents: (entityType, uuid, page, pagesize) => {
        return axios.get(`${this.BASE_URL_API}entity/${entityType}/${uuid}/referents${this.buildURIParams({
          page: page,
          pagesize: pagesize
        })}`,
          this.DEFAULTCONFIG)
      },

      getRelations: (entityType, uuid, relationUuid, direction, page, pagesize) => {
        return axios.get(`${this.BASE_URL_API}entity/${entityType}/${uuid}/relations${this.buildURIParams({
          specifier: relationUuid,
          direction: direction,
          page: page,
          pagesize: pagesize
        })}`,
          this.DEFAULTCONFIG)
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

      getSimplifiedInstances: (definitionUUID) => {
        return axios.get(`${this.BASE_URL_API}entity/AsDefinition/${definitionUUID}/instances?info=values`,
          this.DEFAULTCONFIG)
          .then(result => {
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
            return new Promise((resolve, reject) => {
              resolve(simplifiedJSON)
            })
          })
      }

    }
  }

  /* Resource (Files) */

  resource() {
    return {

      getResource: (uuid) => {
        return axios.get(`${this.BASE_URL_API}resource/resource/${uuid}/`, this.DEFAULTCONFIG)
      },

      deleteResource: (uuid) => {
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
          return [key, tempObj[key]].map(encodeURIComponent).join("=")
        })
        .join("&")
    )
  }

  genericBtoA(b) {
    if (typeof process === 'object' && Object.prototype.toString.call(process) === '[object process]') {
      //If running in node, use Buffer
      return Buffer.from(b).toString("base64")
    }
    else {
      //If running in browser, use btoa()
      return btoa(b)
    }
  }

}
