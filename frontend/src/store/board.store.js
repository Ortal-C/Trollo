import { boardService } from "../services/board.service";

export const boardStore = {
    state: {
        boards: [],
        board: null,
        currGroup: null,
    },
    getters: {
        boards(state) { return state.boards },
        board(state) { return state.board },
        // groups(state) { return state.board.groups },
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards;
        },
        setBoard(state, { board }) {
            state.board = board;
        },
        addGroup(state, { group }) {
            state.board.groups.push(group)
        },
        // addBoard(state, { board }) 
        //     state.boards.push(board)
        // },
        // removeBoard(state, { reviewId }) {
        //     state.boards = state.boards.filter(board => board._id !== reviewId)
        // },
    },
    actions: {
        async loadBoard(context, { board }) {
            try {
                board = await boardService.query(board)
                context.commit({ type: 'setBoard', board })
                return board;
            } catch (err) {
                console.log('boardStore: Error in setBoard', err)
                throw err
            }
        },
        async addGroup({ commit }, { title }) {
            try {
                const group = await boardService.getEmptyGroup(title)
                commit({ type: 'addGroup', group })
            } catch (err) {
                console.log(('issues with creating a new group', err));
                throw err
            }
            // return toyService
            //     .getEmptyGroup()
            //     .then((title) => commit({ type: 'addGroup', title }))
        },
        // async addBoard(context, { board }) {
        //     try {
        //         board = await reviewService.add(board)
        //         context.commit({ type: 'addBoard', board })
        //         context.dispatch({ type: 'increaseScore' })

        //         return board;
        //     } catch (err) {
        //         console.log('reviewStore: Error in addBoard', err)
        //         throw err
        //     }
        // },
        // async loadBoards(context) {
        //     try {
        //         const boards = await reviewService.query();
        //         context.commit({ type: 'setBoards', boards })
        //         socketService.off(SOCKET_EVENT_REVIEW_ADDED)
        //         socketService.on(SOCKET_EVENT_REVIEW_ADDED, board => {
        //             console.log('Got board from socket', board);
        //             context.commit({ type: 'addBoard', board })
        //         })
        //         socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
        //         socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, board => {
        //             console.log('board about me!', board);

        //         })

        //     } catch (err) {
        //         console.log('reviewStore: Error in loadBoards', err)
        //         throw err
        //     }
        // },
        // async removeBoard(context, { reviewId }) {
        //     try {
        //         await reviewService.remove(reviewId);
        //         context.commit({ type: 'removeBoard', reviewId })
        //     } catch (err) {
        //         console.log('reviewStore: Error in removeBoard', err)
        //         throw err
        //     }
        // },
    }
}