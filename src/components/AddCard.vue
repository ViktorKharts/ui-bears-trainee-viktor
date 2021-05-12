<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input id="add-card-input" type="text" v-model="title" placeholder="+ Add a card">
    </form>
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
  data () {
    return {
      title: ''
    }
  },
  methods: {
    ...mapActions(['getCards', 'addCard']),
    async onSubmit() {
      if (this.title.trim()) {
        await this.addCard ({
          title: this.title,
          columnId: this.column.id
        })
        this.title = ''

        await this.getCards()
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
