<template>
  <div id="app">
    <div class="app">
      <h1>Trello Clone</h1>
    </div>
    <div>
      <ColumnList 
        :columns="columns"
        @remove-column="removeColumn"
        @remove-card="removeCard"
        @add-column="addColumn"
        @add-card="addCard"
        @change-column-title="columnChangeTitle"
        @edit-card="editCard"
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
      columns: [
        {id: 1, title: 'Колонка 1', items: [
          {id: 1.1, title: 'Карточка 1', description: 'Должно быть как-то так.' },
          {id: 1.2, title: 'Карточка 2', description: 'А нет, должно быть так.' },
          {id: 1.3, title: 'Карточка 3', description: 'Должно быть, вообще, не так.' },
        ]},
        {id: 2, title: 'Колонка 2', items: [
          {id: 2.1, title: 'Карточка 4', description: 'Должно быть как-то так.' },
          {id: 2.2, title: 'Карточка 5', description: 'А нет, должно быть так.' },
          {id: 2.3, title: 'Карточка 6', description: 'Должно быть, вообще, не так.' },
        ]},
        {id: 3, title: 'Колонка 3', items: [
          {id: 3.1, title: 'Карточка 7', description: 'Должно быть как-то так.' },
          {id: 3.2, title: 'Карточка 8', description: 'А нет, должно быть так.' },
          {id: 3.3, title: 'Карточка 9', description: 'Должно быть, вообще, не так.' },
        ]},
      ]
    }
  },
  components: {
    ColumnList
  },
  methods: {
    removeColumn(column_id) {
      this.columns = this.columns.filter(col => col.id !== column_id)
    },
    removeCard(column__id, item_id) {
      this.columns[column__id].items = this.columns[column__id].items.filter(item => item.id !== item_id)
    },
    addColumn(newColumn) {
      this.columns.push(newColumn)
    },
    addCard(newCard, column____id) {
      this.columns[column____id].items.push(newCard)
    },
    columnChangeTitle(column_____id, newTitle) {
      this.columns[column_____id].title = newTitle
      console.log(this.columns[column_____id])
    },
    editCard(column______id, item_______id, cardTitle, cardDesc) {
      this.columns[column______id].items[item_______id].title = cardTitle
      this.columns[column______id].items[item_______id].description = cardDesc
      console.log(this.columns[column______id].items[item_______id])
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
  margin-top: 60px;
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
</style>
