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
    ...mapActions(['getCards', 'addCard', 'editCard']),
    async onSubmit() {
      if (this.title.trim()) {

        await this.addCard ({
          title: this.title,
          columnId: this.column.id,
          orderId: this.column.cardsArray.length
        })
        this.title = ''

        for (let i = 0; i < this.column.cardsArray.length; i++) {
          if(this.column.cardsArray[i].orderId !== i) {
            await this.editCard({
              cardId: this.column.cardsArray[i].id,
              columnId: this.column.cardsArray[i].columnId,
              title: this.column.cardsArray[i].title,
              desc: this.column.cardsArray[i].description,
              orderId: i
            })
          }
        }

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
