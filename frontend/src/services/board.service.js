import { storageService } from './async-storage.service'
// import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'

export const boardService = {
    query,
    remove,
    add,
    getById,

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
    gWatchedUser = board;
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