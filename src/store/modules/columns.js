import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/dev'

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

      try {
        const res = await axios.get('/columns')
        commit('updateColumnList', res.data.sort((a, b)=>a.createdAt-b.createdAt))
      } catch (error) {
        console.log('Failed to get columns.', error)
        commit('updateColumnList', [])
      }
    },

    async addColumn({commit}, newColumn) {

      try {
        const res = await axios.post('/column', {
          title: newColumn.title
        })
        commit('addColumn', res.data)
      } catch (error) {
        console.log('Failed to create a new column.', error)
      }
    },

    async removeColumn({commit}, columnId) {

      try {
        const res = await axios.delete(`/column/${columnId}`)
        commit('removeColumn', columnId)
      } catch (error) {
        console.log('Failed to delete a column.', error)
      }
    },

    async editColumTitle({commit}, { columnId, title }) {

      try {
        const res = await axios.put(`/column/${columnId}`, {
          "paramName": "title",
          "paramValue": title
        })
      } catch (error) {
        console.log('Failed to edit a column.', error)
      }
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