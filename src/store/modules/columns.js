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
        const res = await axios.get('/sortedcolumns')
        commit('updateColumnList', res.data)
      } catch (error) {
        console.log('Failed to get columns.', error)
        commit('updateColumnList', [])
      }
    },

    async addColumn({commit}, {id, title, orderId}) {

      try {
        const res = await axios.post('/column', {
          id,
          title,
          orderId
        })
        commit('addColumn', res.data)
      } catch (error) {
        console.log('Failed to create a new column.', error)
      }
    },

    async removeColumn({commit}, {id, createdAt}) {
      
      try {
        const res = await axios.delete(`/column/${id}/${createdAt}`)
        commit('removeColumn', id)
      } catch (error) {
        console.log('Failed to delete a column.', error)
      }
    },

    async updateColumn({commit}, {id, createdAt, title, orderId}) {

      // try {
      //   const res = await axios.delete(`/column/${id}/${createdAt}`)
      //   console.log('Successfully deleted a', title)
      //   commit('removeColumn', id)
      // } catch (error) {
      //   console.log('While updating failed to delete a column', error)
      // }
      try {
        const res = await axios.put(`/column/${id}/${createdAt}`, {
          title,
          orderId
        })
      } catch (error) {
        console.log('While updating failed to create a new column', error)
      }

      // try {
      //   const res = await axios.get('/columns')
      //   commit('updateColumnList', res.data)
      // } catch (error) {
      //   console.log('While updating failed to retrieve all columns', error)
      // }
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