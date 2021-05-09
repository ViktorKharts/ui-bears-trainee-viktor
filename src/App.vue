<template>
  <div id="app">
    <div class="app">
      <h1>Trello Clone</h1>
    </div>
    <div class="app-body">
      <ColumnList 
        :columns="allColumns"
        :cards="allCards"
      />
    </div>
  </div>
</template>

<script>
import ColumnList from '@/components/ColumnList'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  computed: mapGetters(['allColumns', 'allCards']),
  async mounted () {
    this.getColumns()
    this.getCards()
  },
  components: {
    ColumnList
  },
  methods: {
    ...mapActions(['getColumns', 'getCards']),
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
