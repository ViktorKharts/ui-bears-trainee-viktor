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
        commit('updateCardsList', res.data.sort((a, b)=>a.createdAt-b.createdAt))
      } catch (error) {
        console.log('Failed to get cards.', error)
        commit('updateCardsList', [])
      }
    },

    async addCard({commit}, newCard) {

      try {
        const res = await axios.post('/card', {
          title: newCard.title,
          columnId: newCard.columnId
        })
        commit('addCard', res.data)
      } catch (error) {
        console.log('Failed to create a new card.', error)
      }
    },

    async removeCard({commit}, cardId) {
      
      try {
        const res = await axios.delete(`/card/${cardId}`)
        commit('removeCard', cardId)
      } catch (error) {
        console.log('Failed to delete a card.', error)
      }
    },
    
    async editCardTitle(context, { cardId, title, desc }) {

      try {
        const res = await axios.put(`/card/${cardId}`, {
          'paramTitle': title, 
          'paramDesc': desc
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