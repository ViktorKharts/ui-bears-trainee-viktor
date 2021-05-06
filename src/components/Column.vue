<template>
  <div>
    <div class="column-title">
      <form class="column-form" @submit.prevent="editTitle">
        <input class="input-field" type="text" v-model="newTitle">
      </form>
      <b-button @click="removeColumn" pill variant="outline-danger" size="sm">&times;</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    colIndex: Number
  },
  data() {
    return {
      newTitle: this.column.title
    }
  },
  methods: {
    removeColumn() {
      this.$emit('remove-column', this.column.id)
    },
    editTitle() {
      if (this.newTitle.trim()) {
        const column_id = this.column.id
        this.$emit('edit-column-title', column_id, this.newTitle)
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
