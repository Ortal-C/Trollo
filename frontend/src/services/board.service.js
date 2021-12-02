import { storageService } from './async-storage.service'
import { utilService } from './util.service'
// import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'

const KEY = 'boardsDB'
export const boardService = {
    query,
    remove,
    save,
    getById,
    getEmptyGroup
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

function save(board) {
    return (board._id) ? storageService.put(KEY, board) : storageService.post(KEY, board)
}

function getEmptyGroup(id = utilService.makeId(), title = '') {
    return {
        id,
        title,
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