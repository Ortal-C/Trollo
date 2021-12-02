import { storageService } from './async-storage.service'
import { utilService } from './util.service'
// import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'

const KEY = 'boardsDB'
export const boardService = {
    query,
    remove,
    saveBoard,
    getById,

    // GROUP FUNCTIONS //
    getEmptyGroup,
    saveGroup,
    removeGroup,

    //CARD FUNCTIONS//
    getEmptyCard,
    saveCard
}

// Debug technique
window.boardService = boardService

function query() {
    // return httpService.get(`board${queryStr}`)
    return storageService.query(KEY)
}

async function getById(boardId) {
    // const board = await httpService.get(`board/${boardId}`)
    const board = await storageService.get(KEY, boardId)
        // gWatchedUser = board;
    return board;
}

function remove(boardId) {
    // return httpService.delete(`board/${boardId}`)
    return storageService.remove(KEY, boardId)
}

function saveBoard(board) {
    return (board._id) ? storageService.put(KEY, board) : storageService.post(KEY, board)
}

function getEmptyGroup() {
    return {
        id: '',
        title: '',
        cards: [],
    }
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

function getEmptyCard() {
    return {
        id: '',
        title: '',
    }
}

function saveCard(board, groupId, card) {
    let newBoard = JSON.parse(JSON.stringify(board))
    const idx = newBoard.groups.findIndex(group => group.id === groupId)
    if (card.id) {
        const idx = newBoard.groups.cards.findIndex(currCard => currCard.id === card.id)
        newBoard.groups[idx].cards.splice(idx, 1, card)
        console.log(card);
    } else {
        card.id = utilService.makeId()
        newBoard.groups[idx].cards.push(card)

        console.log(card);
    }
    return saveBoard(newBoard)
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