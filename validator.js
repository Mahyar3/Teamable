function isInvalidEmail(userobject){
    return !userobject.email.includes("@")
}
function isEmptyPayload(userobject){
    return Object.keys(userobject).length === 0
}

module.exports={
    isInvalidEmail,
    isEmptyPayload
}