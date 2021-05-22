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
        commit('updateColumnList', res.data.sort((a, b)=>a.orderId-b.orderId))
      } catch (error) {
        console.log('Failed to get columns.', error)
        commit('updateColumnList', [])
      }
    },

    async addColumn({commit}, {title, orderId}) {

      try {
        const res = await axios.post('/column', {
          title,
          orderId
        })
        commit('addColumn', res.data)
      } catch (error) {
        console.log('Failed to create a new column.', error)
      }
    },

    async removeColumn({commit}, {id, orderId}) {
      
      try {
        const res = await axios.delete(`/column/${id}/${orderId}`)
        commit('removeColumn', id)
      } catch (error) {
        console.log('Failed to delete a column.', error)
      }
    },

    async editColumn({commit}, { title, columnId, orderId }) {

      try {
        const res = await axios.put(`/column/${columnId}`, {
          "paramTitle": title,
          "paramOrderId": orderId
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