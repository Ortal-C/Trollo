export const dashboardService = {
    createLabelsMap,
    setLabelsNames,
    createMembersMap,
}

function createLabelsMap(board) {
    var objMap = {}

    board.groups.forEach(group => {
        group.cards.forEach(card => {
            card.labelsIds.forEach(label => {
                objMap[label] ? objMap[label] += 1 : objMap[label] = 1
            })
        })
    })
    return objMap
}

function setLabelsNames(map, board) {
    var res = {}
    var keys = Object.keys(map)
    var namedKeys = keys.map(key => {
        var label = board.labels.find(currLabel => {
            return currLabel.id === key
        })
        return label.title
    })
    var values = Object.values(map)
    for (let i = 0; i < namedKeys.length; i++) {
        res[namedKeys[i]] = values[i]
    }
    return res
}

function createMembersMap(board) {
    var objMap = {}

    board.groups.forEach(group => {
        group.cards.forEach(card => {
            card.members.forEach(member => {
                objMap[member.fullname] ? objMap[member.fullname] += 1 : objMap[member.fullname] = 1
            })
        })
    })
    return objMap
}