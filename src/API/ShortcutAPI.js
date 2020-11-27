/*
 * Shortcut API class.
 * This class contains shortcuts in the API for easier interaction.
 */
export class ShortcutAPI {
	/**
	 * Shortcut API
	 * @param {InorigoAPI} parentAPI - The parent API class.
	 */
	constructor(parentAPI) {
		this.parentAPI = parentAPI
	}

	/**
	 * Gets all classified entities of a given entity in an easily readable form.
	 * @param {string} definitionUUID - UUID of root entity
	 * @param {boolean} isDeep - Is it a deep search?
	 * @return {object} - Response
	 */
	getClassifiedValuesList(definitionUUID, isDeep) {
		return new Promise(resolve => {
			this.parentAPI
				.entity()
				.getSubClasses("AsDefinition", definitionUUID, isDeep)
				.then(response => {
					const promises = response.data.entities.map(entity => {
						return this.parentAPI.entity().getEntity("AsDefinition", entity.id)
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
