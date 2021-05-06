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
        @change-column-title="columnChangeTitle"
        @edit-card-title="editCardTitle"
        @edit-card-desc="editCardDesc"
      />
    </div>
  </div>
</template>

<script>
import ColumnList from '@/components/ColumnList'
export default {
  name: 'App',
  data () {
    return {
      columns: [],
      cards: []
    }
  },
  async created () {    
    const responseColumns = await fetch('http://localhost:3000/dev/columns')
    const responseCards = await fetch('http://localhost:3000/dev/cards')
    this.columns = await responseColumns.json()
    this.cards = await responseCards.json()
  },
  components: {
    ColumnList
  },
  methods: {
    async addColumn(newColumn) {
      await fetch('http://localhost:3000/dev/column', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newColumn)
      })
    },
    async removeColumn(columnId) {
      await fetch(`http://localhost:3000/dev/column/${columnId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    async columnChangeTitle(columnId, newTitle) {
      await fetch(`http://localhost:3000/dev/column/${columnId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTitle)
      })
    },
    async addCard(newCard) {
      await fetch('http://localhost:3000/dev/card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCard)
      })
    },
    async removeCard(itemId) {
      await fetch(`http://localhost:3000/dev/card/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    async editCardTitle(itemId, cardTitle) {
      await fetch(`http://localhost:3000/dev/card/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardTitle)
      })
    },
    async editCardDesc(itemId, cardDesc) {
      await fetch(`http://localhost:3000/dev/card/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardDesc)
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
