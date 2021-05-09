import axios from 'axios'

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
      const res = await axios.get('http://localhost:3000/dev/cards')

      commit('updateCardsList', res.data)
    },
    async addCard({commit}, newCard) {
      const res = await axios.post('http://localhost:3000/dev/card', {
        title: newCard.title,
        columnId: newCard.columnId
      })

      commit('addCard', res.data)
    },
    async removeCard({commit}, cardId) {
      const res = await axios.delete(`http://localhost:3000/dev/card/${cardId}`)

      commit('removeCard', cardId)
    },
    async editCardTitle(context, { cardId, title }) {
      const res = await axios.put(`http://localhost:3000/dev/card/${cardId}`, {
        'paramName': 'title',
        'paramValue': title
      })
    },
    async editCardDesc(context, { cardId, desc }) {
      const res = await axios.put(`http://localhost:3000/dev/card/${cardId}`, {
        'paramName': 'description',
        'paramValue': desc
      })
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