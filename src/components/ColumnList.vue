<template>
  <div class="container">
    <div class="column-card" v-for="column of columns" :key="column.id">
        <Column 
          :column="column"
        />
      <div v-for="card of cards" :key="card.id">
        <div v-if="matchCardToColumn(card.columnId, column.id)">
          <Card 
            :card="card"
          />
        </div>
      </div>
      <AddCard 
        :column="column"
      />
      <hr>
    </div>
    <AddColumn 
      :columns="columns"     
    />
  </div>
</template>

<script>
import AddCard from '@/components/AddCard'
import AddColumn from '@/components/AddColumn'
import Card from '@/components/Card'
import Column from '@/components/Column'
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
    AddColumn
  },
  data () {
    return {
      columnTitle: ''
    }
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
</style>