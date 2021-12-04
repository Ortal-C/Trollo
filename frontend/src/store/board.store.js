import { boardService } from "../services/board.service";
import { utilService } from "../services/util.service";

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
        // addGroup(state, { group }) {
        //     state.board.groups.push(group)
        //     console.log(state.board.groups);
        // },
        // removeGroup(state, { groups }) {
        //     state.board.groups = groups
        // },
    },
    actions: {
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
                console.log('Issues with updateBoard', err);
                throw err
            }
        },
        //GROUP ACTIONS//
        async saveGroup(context, { group }) {
            try {
                const board = await boardService.saveGroup(context.state.board, {...group })
                context.commit({ type: 'setBoard', board })
            } catch (err) {
                console.log('Issues with saveGroup', err);
                throw err
            }
        },
        async removeGroup(context, { groupId }) {
            try {
                const board = await boardService.removeGroup(context.state.board, groupId)
                context.commit({ type: 'setBoard', board })
            } catch (err) {
                console.log(('Issues with removing group', err));
                throw err
            }
        },
        //CARD ACTIONS//
        async saveCard(context, { payload }) {
            const { groupId, card } = payload
            try {
                const board = await boardService.saveCard(context.state.board, groupId, card)
                context.commit({ type: 'setBoard', board })
            } catch (err) {
                console.log(('Issues with adding card', err));
                throw err
            }
        },
        async removeCard(context, { payload }) {
            const { groupId, cardId } = payload;
            try {
                const board = await boardService.removeCard(context.state.board, groupId, cardId)
                context.commit({ type: 'setBoard', board })
            } catch (err) {
                console.log(('Issues with removing card', err));
                throw err
            }
        }


        // async toggleStar(context, { isStarred }) {
        //     try {
        //         const updatedBoard = await boardService.save({ ...context.state.board, isStarred })
        //         context.commit({ type: 'setBoard', board: updatedBoard })
        //         return updatedBoard;
        //     } catch (err) {
        //         console.log(('issues with toggleStar', err));
        //         throw err
        //     }
        // }
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