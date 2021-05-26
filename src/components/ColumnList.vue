<template>
<div class="container">
  <draggable  class="container"
              v-model="columns"
              animation="200"
              draggable=".column-card"
              @change="updateColumns($event, columns)">
    <div class="column-card" v-for="column of columns" :key="column.id">
      <Column :column="column"
              :columns="columns"/>
      <draggable  class="draggable-card"
                  v-model="column.cardsArray"
                  group="cards"
                  ghostClass="on-drag"
                  animation="300"
                  @change="updateCards($event, column)">
        <div v-for="card of column.cardsArray" :key="card.id">
          <Card :card="card"
                :column="column"/>
        </div>
      </draggable>
      <AddCard :column="column"/>
      <hr>
    </div>
    <AddColumn :columns="columns"/>
  </draggable>
</div>
</template>

<script>
import AddCard from '@/components/AddCard'
import AddColumn from '@/components/AddColumn'
import Card from '@/components/Card'
import Column from '@/components/Column'
import { mapActions } from 'vuex'
import draggable from 'vuedraggable'

export default {
  props: {
    columns: {
      type: Array,
      required: true
    }
  },
  components: {
    Column,
    Card,
    AddCard,
    AddColumn,
    draggable
  },
  methods: {
    ...mapActions(['getColumns', 'updateColumn', 'getCards', 'editCard']),

    async updateColumns(event, columns) {
      this.$isLoading(true)
      for(let column of columns) {
        await this.updateColumn({
          id: column.id,
          createdAt: column.createdAt,
          title: column.title,
          orderId: columns.indexOf(column) 
        })
      }
      this.$isLoading(false)
    },

    async updateCards(event, column) {
      this.$isLoading(true)
      for (let card of column.cardsArray) {
        this.$forceUpdate()
        await this.editCard({
          cardId: card.id,
          columnId: column.id,
          title: card.title,
          desc: card.description,
          orderId: column.cardsArray.indexOf(card)
        })
      }
      this.$isLoading(false)
    }
  }
}
</script>

<style scoped>
.column-card {
  max-width: 300px;
  width: 100%;
  height: auto;
  margin: 10px;
  padding: 20px;
  box-shadow: 5px 5px 10px 1px black;
  background: rgb(216, 183, 139);
  border-radius: 2%;
}

.container {
  margin: 0;
  padding: 0;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.draggable-card {
  min-height: 25px;
}

.on-drag {
  color: white;
}
</style>
