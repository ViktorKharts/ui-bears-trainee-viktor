import axios from 'axios'

export default {
  state: {
    columns: []
  },
  getters: {
    allColumns(state) {
      return state.columns
    }
  },
  actions: {
    async getColumns(ctx) {
      const columns = await axios.get('http://localhost:3000/dev/columns')
      console.log('IT\'s ALIVE!!')
      ctx.commit('updateColumnList', columns)
    } 
  },
  mutations: {
    updateColumnList(state, columns) {
      state.columns = columns
    }
  }
}