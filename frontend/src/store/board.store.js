import { boardService } from '../services/board.service';

export const boardStore = {
    state: {
        boards: [],
        board: null,
        currGroup: null,
        currCard: null,
        currEdit: ''
    },
    getters: {
        boards(state) { return state.boards },
        board(state) { return state.board },
        currEdit(state) { return state.currEdit },
        currGroup(state) { return state.currGroup },
        currCard(state) { return state.currCard },
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards;
        },
        setBoard(state, { board }) {
            state.board = board;
        },
        setCurrEdit(state, { currEdit }) {
            state.currEdit = currEdit;
        },
        setCurrGroup(state, { group }) {
            state.currGroup = group;
        },
        setCurrCard(state, { card }) {
            state.currCard = card;
        }
    },
    actions: {
        async addBoard({ commit, state }, { board }) {
            // console.log('context', context);
            try {
                const newBoard = await boardService.add(board);
                const boards = [...state.boards, newBoard]
                commit({ type: 'setBoards', boards })
            } catch (err) {
                console.log('boardStore: Error in loadBoards', err)
                throw err
            }
        },
        async loadBoards(context) {
            try {
                const boards = await boardService.query()
                context.commit({ type: 'setBoards', boards })
                return boards;
            } catch (err) {
                console.log('boardStore: Error in loadBoards', err)
                throw err
            }
        },
        async loadBoard(context, { boardId }) {
            try {
                const board = await boardService.getById(boardId)
                // board = await boardService.query(board)
                context.commit({ type: 'setBoard', board })
                return board;
            } catch (err) {
                console.log('BoardStore: Error in loadBoard', err)
                throw err
            }
        },
        async updateBoard(context, { board }) {
            try {
                const updatedBoard = await boardService.saveBoard(board)
                context.commit({ type: 'setBoard', board: updatedBoard })
                return updatedBoard;
            } catch (err) {
                console.log('BoardStore: Issues with updateBoard', err);
                throw err
            }
        },
        //GROUP ACTIONS//
        async saveGroup(context, { group }) {
            try {
                const board = await boardService.saveGroup(context.state.board, { ...group })
                context.commit({ type: 'setBoard', board })
            } catch (err) {
                console.log('BoardStore: Issues with saveGroup', err);
                throw err
            }
        },
        async removeGroup(context, { groupId }) {
            try {
                const board = await boardService.removeGroup(context.state.board, groupId)
                context.commit({ type: 'setBoard', board })
            } catch (err) {
                console.log('BoardStore: Issues with removing group', err);
                throw err
            }
        },
        //CARD ACTIONS//
        async saveCard(context, { payload }) {
            const { groupId, card } = payload
            try {
                const board = await boardService.saveCard(context.state.board, groupId, card)
                context.commit({ type: 'setCurrCard', card })
                context.commit({ type: 'setBoard', board })
            } catch (err) {
                console.log('BoardStore: Issues with adding card', err);
                throw err
            }
        },
        async removeCard(context, { payload }) {
            const { groupId, cardId } = payload;
            try {
                const board = await boardService.removeCard(context.state.board, groupId, cardId)
                context.commit({ type: 'setBoard', board })
            } catch (err) {
                console.log('BoardStore: Issues with removing card', err);
                throw err
            }
        },
    },
}