<template>
  <div id="app">
    <header>
      <h1>Trello Clone</h1>
    </header>
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
    this.$isLoading(true)
    await this.getColumns()
    await this.getCards()
    this.$isLoading(false)
  },
  components: {
    ColumnList
  },
  methods: mapActions(['getColumns', 'getCards'])
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

::-webkit-scrollbar {
  display: none;
}

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url(
  https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80
  );
  background-attachment: fixed;
  background-size: cover;
  width: 1000cm;
  min-height: 100vh;
}

header {
  background: #F79720;
  background: -webkit-linear-gradient(top, #F79720, #FFD200);
  background: -moz-linear-gradient(top, #F79720, #FFD200);
  background: linear-gradient(to bottom, #F79720, #FFD200);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 1;
}

.app-body {
  margin-top: 60px;
}
</style>
