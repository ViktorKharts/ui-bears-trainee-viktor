<template>
  <div>
    <div class="column-title">
      <form class="column-form" @submit.prevent="editTitle">
        <input class="input-field" type="text" v-model="newTitle">
      </form>
      <b-button @click="deleteColumn" pill variant="outline-danger" size="sm">&times;</b-button>
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
    }
  },
  data() {
    return {
      newTitle: this.column.title
    }
  },
  methods: {
    ...mapActions(['getColumns', 'removeColumn', 'editColumTitle']),
    async deleteColumn() {
      await this.removeColumn(this.column.id)
      await this.getColumns()
    },
    async editTitle() {
      if (this.newTitle.trim()) {
        await this.editColumTitle({
          columnId: this.column.id, 
          title: this.newTitle
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
</style>
