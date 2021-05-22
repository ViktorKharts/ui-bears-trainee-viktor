import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/dev'

export default {
  state: {
    cards: []
  },
  getters: {
    allCards(state) {
      return state.cards
    }
  },
  actions: {
    async getCards({commit}) {

      try {
        const res = await axios.get('/cards')
        commit('updateCardsList', res.data.sort((a, b)=>a.orderId-b.orderId))
      } catch (error) {
        console.log('Failed to get cards.', error)
        commit('updateCardsList', [])
      }
    },

    async addCard({commit}, { title, columnId, orderId }) {

      try {
        const res = await axios.post('/card', {
          title,
          columnId,
          orderId
        })
        commit('addCard', res.data)
      } catch (error) {
        console.log('Failed to create a new card.', error)
      }
    },

    async removeCard({commit}, cardId) {
      
      try {
        const res = await axios.delete(`/card/${cardId}`, {
          'parametr': 'some data'
        })
        commit('removeCard', cardId)
      } catch (error) {
        console.log('Failed to delete a card.', error)
      }
    },
    
    async editCard(context, { cardId, columnId, title, desc, orderId }) {
      
      try {
        const res = await axios.put(`/card/${cardId}`, {
          'paramColumnId': columnId,
          'paramTitle': title, 
          'paramDesc': desc,
          'paramOrderId': orderId
        })
      } catch (error) {
        console.log('Failed to edit card title.', error)
      }
    }
  },
  mutations: {
    updateCardsList(state, cards) {
      state.cards = cards
    },
    addCard(state, newCard) {
      state.cards.push(newCard)
    },
    removeCard(state, cardId) {
      state.cards.filter(card => card.cardId !== cardId)
    }
  }
}