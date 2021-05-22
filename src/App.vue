<template>
  <div id="app">
    <div class="app">
      <h1>Trello Clone</h1>
    </div>
    <div class="app-body">
      <ColumnList 
        :columns="allData"
      />
    </div>
  </div>
</template>

<script>
import ColumnList from '@/components/ColumnList'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      data: []
    }
  },
  computed: {
    ...mapGetters(['allColumns', 'allCards']),
    allData() {
      this.data = []
      const columns = this.allColumns
      const cards = this.allCards
      columns.forEach((column, index) => {
        this.data.push(column)
        this.data[index].cardsArray = []
        cards.forEach(card => {
          if(column.id === card.columnId) {
            this.data[index].cardsArray.push(card)
          }
        })
      })
      return this.data
    }
  },
  async created () {
    await this.getColumns()
    await this.getCards()
  },
  components: {
    ColumnList
  },
  methods: mapActions(['getColumns', 'getCards'])
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
