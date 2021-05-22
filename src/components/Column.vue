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
    ...mapActions(['getColumns', 'removeColumn', 'editColumn']),
    async deleteColumn() {
      await this.removeColumn({
        id: this.column.id, 
        orderId: this.column.orderId
      })

      for (let i = 0; i < this.columns.length; i++) {
        if (this.columns[i].orderId !== i) {
          await this.editColumn({
            title: this.columns[i].title,
            columnId: this.columns[i].id,
            orderId: i
          })
        }
      }

      await this.getColumns()
    },
    async editColumnTitle() {
      if (this.newTitle && this.newTitle !== this.column.title) {
        await this.editColumn({
          title: this.newTitle,
          columnId: this.column.id,
          orderId: this.column.orderId 
        })

        await this.getColumns()
      }
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
