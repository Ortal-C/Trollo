import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'

const KEY = 'boardsDB'
export const boardService = {
    query,
    remove,
    add,
    saveBoard,
    getById,
    getEmptyBoard,

    // GROUP FUNCTIONS //
    getEmptyGroup,
    saveGroup,
    removeGroup,

    //CARD FUNCTIONS//
    getEmptyCard,
    saveCard,
    removeCard,
}

function query() {
    // return storageService.query(KEY)
    return httpService.get(`board`)
}

async function getById(boardId) {
    // const board = await storageService.get(KEY, boardId)
    const board = await httpService.get(`board/${boardId}`)
    return board;
}

function remove(boardId) {
    // return storageService.remove(KEY, boardId)
    return httpService.delete(`board/${boardId}`)
}

async function add(board) {
    const addedBoard = await httpService.post(`board`, board)
    return addedBoard;
}

async function saveBoard(board) {
    const savedBoard = await httpService.put(`board/${board._id}`, board)
    return savedBoard;
}

function saveGroup(board, group) {
    let newBoard = JSON.parse(JSON.stringify(board))
    if (group.id) {
        const idx = newBoard.groups.findIndex(currGroup => currGroup.id === group.id)
        newBoard.groups.splice(idx, 1, group)
    } else {
        group.id = utilService.makeId()
        newBoard.groups.push(group)
    }
    return saveBoard(newBoard)
}

function removeGroup(board, groupId) {
    let newBoard = JSON.parse(JSON.stringify(board))
    newBoard.groups = newBoard.groups.filter((group) => group.id !== groupId)
    return saveBoard(newBoard)
}

function saveCard(board, groupId, card) {
    let newBoard = JSON.parse(JSON.stringify(board))
    const idx = newBoard.groups.findIndex(group => group.id === groupId)
    if (card.id) {
        const cardIdx = newBoard.groups[idx].cards.findIndex(currCard => currCard.id === card.id)
        newBoard.groups[idx].cards.splice(cardIdx, 1, card)
    } else {
        card.id = utilService.makeId()
        newBoard.groups[idx].cards.push(card)
    }
    return saveBoard(newBoard)
}

function removeCard(board, groupId, cardId) {
    let newBoard = JSON.parse(JSON.stringify(board))
    const idx = newBoard.groups.findIndex(group => group.id === groupId)
    newBoard.groups[idx].cards = newBoard.groups[idx].cards.filter((card) => card.id !== cardId)
    return saveBoard(newBoard)
}

//-------------------------- GET EMPTY ITEM --------------------------//

function getEmptyGroup() {
    return {
        id: '',
        title: '',
        cards: [],
    }
}

function getEmptyCard() {
    return {
        id: '',
        title: '',
        description: '',
        isDone: false,
        byMember: {},
        members: [],
        labelsIds: [],
        checklists: [],
        attachments: [],
        activities: [],
        comments: [],
        createdAt: Date.now(),
        dueDate: '',
        style: { size: '', color: '' },
    }
}

function getEmptyBoard() {
    return {
        title: '',
        isStarred: false,
        style: "#838c91",
        createdBy: {},
        labels: [
            {
                id: "l101",
                title: "Copy Request",
                color: "#cc0033"
            },
            {
                id: "l102",
                title: "One more step",
                color: "#ff8000"
            },
            {
                id: "l103",
                title: "Priority",
                color: "#ffbf00"
            },
            {
                id: "l104",
                title: "Design team",
                color: "#00cc00"
            },
            {
                id: "l105",
                title: "Product marketing",
                color: "#0099cc"
            },
            {
                id: "l106",
                title: "Waiting for feedback",
                color: "#66d9ff"
            },
            {
                id: "l107",
                title: "Halp",
                color: "#bf80ff"
            },
            {
                id: "l108",
                title: "Important",
                color: "#ff66ff"
            }
        ],
        members: [],
        groups: [
            {
                id: "g101",
                title: "Todos",
                cards: [],
                style: {}
            },
            {
                id: "g102",
                title: "In progress",
                cards: [],
                style: {}
            },
            {
                id: "g103",
                title: "Done!",
                cards: [],
                style: {}
            }
        ],
        activities: []
    }
}

// function query() {
//     return storageService.query(KEY)
// }

// function getById(id) {
//     return storageService.get(KEY, id)
// }

// function remove(id) {
//     return storageService.remove(KEY, id)
// }