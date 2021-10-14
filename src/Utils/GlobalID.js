const UUID_REGEX_MATCH = new RegExp("([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}")

/**
 *
 * @param {object} any
 * @returns true if the supplied object contains a uuid attribute and a type attribute
 */
export function isGlobalID(any) {
	return any && any.uuid && any.type
}

/**
 *
 * @param {object} one
 * @param {object} two
 * @returns true if the supplied parameters both are GlobalIDs and have the same uuid value
 */
export function sameGlobalID(one, two) {
	return (!one && !two) || (isGlobalID(one) && isGlobalID(two) && one.uuid == two.uuid)
}

/**
 *
 * @param {object} any
 * @returns true if the supplied object is a string with a proper UUID format
 */
export function isUUID(any) {
	const test = any && typeof any === "string" && any.match(UUID_REGEX_MATCH)
	return !!test
}
