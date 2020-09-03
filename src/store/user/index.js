export const user = {
    namespaced: true,
    state: {
        username: "qimiao"
    },
    mutations: {
        changeUsername(state, username) {
            state.username = username
        }
    },
    actions: {
        actionUsername({ commit }) {
            console.log(123)
        }
    },
    getters: {
        getUsername(state) {
            return state.username
        }
    }
}