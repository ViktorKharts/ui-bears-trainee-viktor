<template>
<div class="container">
  <draggable  class="container"
              v-model="columnsArray"
              animation="50"
              draggable=".column-card"
              ghostClass="ghost"
              @change="updateColumns($event, columns)">
    <div class="column-card" v-for="column of columnsArray" :key="column.id">
      <Column :column="column"
              :columns="columns"/>
      <draggable  class="draggable-card"
                  v-model="column.cardsArray"
                  group="cards"
                  ghostClass="ghost"
                  chosenClass="chosen"
                  animation="50"
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
import { mapActions, mapMutations } from 'vuex'
import draggable from 'vuedraggable'

export default {
  props: {
    columns: {
      type: Array,
      required: true
    }
  },
  computed: {
    columnsArray: {
      get() {
        return this.columns
      },
      set(value) {
        this.updateColumnList(value)
      }
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
    ...mapMutations(['updateColumnList']),

    async updateColumns(event, columns) {
      this.$isLoading(true)
      for(let column of columns) {
        await this.updateColumn({
          id: column.id,
          createdAt: column.createdAt,
          title: column.title,
          orderId: columns.indexOf(column) 
        })
        this.$forceUpdate()
      }
      await this.getColumns()
      this.$isLoading(false)
    },

    async updateCards(event, targetColumn) {
      this.$isLoading(true)
      let card
      let column

      // check type of action
      // performed on a card and
      // update data of that card
      if(event.added) {
        card = event.added.element
        column = targetColumn
        this.$forceUpdate()
        await this.editCard({
          cardId: card.id,
          columnId: column.id,
          title: card.title,
          desc: card.description,
          orderId: this.columnsArray.column.cardsArray.indexOf(card)
        })
      } else if (event.moved) {
        card = event.moved.element
        column = targetColumn
        this.$forceUpdate()
        await this.editCard({
          cardId: card.id,
          columnId: column.id,
          title: card.title,
          desc: card.description,
          orderId: column.cardsArray.indexOf(card)
        })
      } 

      // make sure that all orderId 
      // of each of the cards corresponds
      // to cards' positiong in the array
      for (let col of this.columnsArray) {
        for (let card of col.cardsArray)
          await this.editCard({
            cardId: card.id,
            columnId: col.id,
            title: card.title,
            desc: card.description,
            orderId: col.cardsArray.indexOf(card)
        })
      }

      await this.getCards()
      this.$isLoading(false)
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

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

.draggable-card {
  min-height: 25px;
}

.ghost {
  opacity: 0;
}
</style>
