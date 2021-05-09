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
    async getColumns({commit}) {
      const res = await axios.get('http://localhost:3000/dev/columns')

      commit('updateColumnList', res.data.sort())
    },
    async addColumn({commit}, newColumn) {
      const res = await axios.post('http://localhost:3000/dev/column', {
        title: newColumn.title
      })

      commit('addColumn', res.data)
    },
    async removeColumn({commit}, columnId) {
      const res = await axios.delete(`http://localhost:3000/dev/column/${columnId}`)

      commit('removeColumn', columnId)
    },
    async editColumTitle(context, { columnId, title }) {
      const res = await axios.put(`http://localhost:3000/dev/column/${columnId}`, {
        "paramName": "title",
        "paramValue": title
      })
    } 
  },
  mutations: {
    updateColumnList(state, columns) {
      state.columns = columns
    },
    addColumn(state, newColumn) {
      state.columns.push(newColumn)
    },
    removeColumn(state, columnId) {
      state.columns.filter(col => col.columnId !== columnId)
    }
  }
}