<template>
<div class="container">
  <draggable 
    class="container" 
    :list="columns"
    animation="200"
    draggable=".column-card"
  >
    <div class="column-card" v-for="column of columns" :key="column.id">
      <Column 
        :column="column"
      />
      <draggable
        class="draggable-card" 
        :list="cards.card" 
        group="cards"
        ghostClass="on-drag"
        animation="300"
      >
        <div v-for="card of cards" :key="card.id">
          <div v-if="matchCardToColumn(card.columnId, column.id)">
            <Card 
              :card="card"
            />
          </div>
        </div>
      </draggable>
      <AddCard 
        :column="column"
      />
      <hr>
    </div>
    <AddColumn 
      :columns="columns"
    />
  </draggable>
</div>
</template>

<script>
import AddCard from '@/components/AddCard'
import AddColumn from '@/components/AddColumn'
import Card from '@/components/Card'
import Column from '@/components/Column'

import draggable from 'vuedraggable'

export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    cards: {
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
    matchCardToColumn(cardId, columnId) {
      if (cardId === columnId) {
        return true
      }
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
  min-height: 10px;
}

.on-drag {
  color: white;
}
</style>