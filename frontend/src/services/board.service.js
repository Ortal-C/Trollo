import { storageService } from './async-storage.service'
import { utilService } from './util.service'
// import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'

export const boardService = {
    query,
    remove,
    add,
    getById,
    getEmptyGroup
}

// Debug technique
window.boardService = boardService

function query() {
    // return httpService.get(`board${queryStr}`)
    return storageService.query('board')
}

async function getById(boardId) {
    // const board = await httpService.get(`board/${boardId}`)
    const board = await storageService.get('board', boardId)
        // gWatchedUser = board;
    return board;
}

function remove(boardId) {
    // return httpService.delete(`board/${boardId}`)
    return storageService.delete('board', boardId)
}

async function add(board) {
    // const addedBoard = await httpService.post(`board`, board)
    const addedBoard = storageService.post('board', board)
    return addedBoard
}

function getEmptyGroup(title) {
    return {
        id: utilService.makeId(),
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

// function save(product) {
//     const savedProduct = (product._id) ? storageService.put(KEY, product) : storageService.post(KEY, product)
//     return savedProduct;
// }