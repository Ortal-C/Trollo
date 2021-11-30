import { storageService } from './async-storage.service'
// import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'

export const boardService = {
    query
}

// Debug technique
window.boardService = boardService

function query() {
    return storageService.query('board')
}