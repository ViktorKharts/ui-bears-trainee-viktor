<template>
  <div id="app">
    <div class="app">
      <h1>Trello Clone</h1>
    </div>
    <div class="app-body">
      <ColumnList 
        :columns="columns"
        :cards="cards"
        @remove-column="removeColumn"
        @remove-card="removeCard"
        @add-column="addColumn"
        @add-card="addCard"
        @edit-column-title="editColumnTitle"
        @edit-card-title="editCardTitle"
        @edit-card-desc="editCardDesc"
      />
    </div>
  </div>
</template>

<script>
import ColumnList from '@/components/ColumnList'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000/dev'
export default {
  name: 'App',
  data () {
    return {
      columns: [],
      cards: []
    }
  },
  async created () {    
    const responseColumns = await axios.get('http://localhost:3000/dev/columns')
    const responseCards = await axios.get('http://localhost:3000/dev/cards')
    this.columns = responseColumns.data
    this.cards = responseCards.data
  },
  components: {
    ColumnList
  },
  methods: {
    async addColumn(newColumn) {
      const res = await axios.post('http://localhost:3000/dev/column', {
        title: newColumn.title
      })
    },
    async removeColumn(columnId) {
      const res = await axios.delete(`http://localhost:3000/dev/column/${columnId}`)
    },
    async editColumnTitle(columnId, newTitle) {
      const res = await axios.put(`http://localhost:3000/dev/column/${columnId}`, {
        "paramName": "title",
        "paramValue": newTitle
      })
    },
    async addCard(newCard) {
      const res = await axios.post('http://localhost:3000/dev/card', {
        title: newCard.title,
        columnId: newCard.columnId
      })
    },
    async removeCard(cardId) {
      const res = await axios.delete(`http://localhost:3000/dev/card/${cardId}`)
    },
    async editCardTitle(cardId, cardTitle) {
      const res = await axios.put(`http://localhost:3000/dev/card/${cardId}`, {
        "paramName": "title",
        "paramValue": cardTitle
      })
    },
    async editCardDesc(cardId, cardDesc) {
      const res = await axios.put(`http://localhost:3000/dev/card/${cardId}`, {
        "paramName": "description",
        "paramValue": cardDesc
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app {
  background: rgb(131,58,180);
  background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

.app-body {
  margin-top: 60px;
}
</style>
