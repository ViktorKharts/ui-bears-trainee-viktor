<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input id="add-card-input" type="text" v-model="title" placeholder="+ Add a card">
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
          title: this.title,
          columnId: this.column.id,
          description: ''
        }

        this.$emit('add-card', newCard)
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
