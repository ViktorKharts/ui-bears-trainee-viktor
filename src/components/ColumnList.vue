<template>
  <div class="container">
      <div class="column-card" v-for="column of columns" :key="column.id">
          <Column 
            :columns="columns" :column="column" 
            @remove-column="removeColumn"
            @change-column-title="changeColumnTitle"
          />
        <div v-for="item of column.items" :key="item.id">
            <Card 
              :columns="columns" :column="column" :item="item"
              @remove-card="removeCard"
              @edit-card="editCard"
            />
        </div>
        <AddCard 
          :columns="columns" :column="column"
          @add-card="addCard"
        />
        <hr>
      </div>
    <AddColumn 
      :columns="columns"
      @add-column="addColumn"
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
    addCard(newCard, column_id) {
      this.$emit('add-card', newCard, column_id)
    },
    addColumn(newColumn) {
      this.$emit('add-column', newColumn)
    },
    removeCard(column__id, item__id) {
      this.$emit('remove-card', column__id, item__id)
    },
    removeColumn(columnIndex) {
      this.$emit('remove-column', columnIndex)
    },
    changeColumnTitle(column_____id, newTitle) {
      this.$emit('change-column-title', column_____id, newTitle)
    },
    editCard(column______id, item___id, cardTitle, cardDesc) {
      this.$emit('edit-card', column______id, item___id, cardTitle, cardDesc)
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