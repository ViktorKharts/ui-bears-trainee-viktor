<template>
  <div>
    <div class="column-title">
      <form class="column-form" @submit.prevent="editColumnTitle">
        <input class="input-field" type="text" v-model.trim="newTitle">
      </form>
      <b-button @click="deleteColumn" id="icon-button"><b-icon icon="trash" id="icon"></b-icon></b-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    column: {
      type: Object,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      newTitle: this.column.title
    }
  },
  methods: {
    ...mapActions(['getColumns', 'removeColumn', 'updateColumn', 'addColumn', 'removeCard']),
    async deleteColumn() {
      this.$isLoading(true)
      if (this.column.cardsArray.length >= 1) {
        for (let card of this.column.cardsArray) {
          await this.removeCard(card.id)
        }
      }

      await this.removeColumn({
        id: this.column.id, 
        createdAt: this.column.createdAt
      })

      await this.getColumns()
      this.$isLoading(false)
    },
    async editColumnTitle() {
      this.$isLoading(true)
      await this.updateColumn({
        id: this.column.id,
        createdAt: this.column.createdAt,
        title: this.newTitle,
        orderId: this.column.orderId
      })
      document.activeElement.blur()
      
      this.$isLoading(false)
    }
  }
}
</script>

<style>
.column-form {
  width: 230px;
  height: auto;
}

.column-title {
  display: flex;
  justify-content: space-between;
  padding: 5px;
}

.input-field {
  font-weight: bold;
  border: none;
  background: rgb(216, 183, 139);
  margin-right: 2px;
}

.input-field:focus {
  background: rgb(255, 255, 255);
  border: 1px solid rgb(63, 145, 221);
}

#icon-button {
  color: black;
  background-color: rgb(216, 183, 139);
  border-color: rgb(216, 183, 139);
}

#icon-button:hover {
  background-color: rgb(216, 183, 139);
  border-color: rgb(216, 183, 139);
}

#icon:hover {
  background-color: rgb(216, 183, 139);
  border-color: rgb(216, 183, 139);
  color: white;
  opacity: .55;
}
</style>
