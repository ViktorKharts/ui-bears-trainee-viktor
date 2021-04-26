<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input id="add-card-input" type="textarea" v-model="title" placeholder="+ Add a card">
    </form>
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
    }
  },
  data () {
    return {
      title: ''
    }
  },
  methods: {
    onSubmit() {
      if (this.title.trim()) {
        const newCard = {
          id: Date.now(),
          title: this.title,
          description: ''
        }

        const column_id = this.columns.indexOf(this.column)
        this.$emit('add-card', newCard, column_id)
        this.title = ''
      }
    }
  }
}
</script>

<style scoped>
#add-card-input:hover {
  background-color:rgba(255, 255, 255, 0.829);
}
</style>
