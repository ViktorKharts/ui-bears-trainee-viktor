<template>
  <div>
    <div class="card-title">
      <h5 class="card-box" @click="modalShow = !modalShow">{{card.title}}</h5>
      <b-button @click="deleteCard" pill variant="outline-danger" size="sm">&times;</b-button>
    </div>

    <b-modal id="modal-win" v-model="modalShow" centered hide-header hide-footer>
      <b-form @submit.prevent="editCard">
        <b-form-group label="Card Title">
          <b-form-input v-model.trim="cardTitle" />
        </b-form-group>
        <b-form-group label="Card Description">
          <b-form-input v-model.trim="cardDesc" />
        </b-form-group>
        <b-button type="submit" variant="success" @click="$bvModal.hide('modal-win')">OK</b-button>
      </b-form>
    </b-modal>

    <b-modal id="modal-err" v-model="modalErr" centered hide-header hide-footer>
      <div>Please fill in both of the fields when editing a card.</div>
      <b-button type="submit" variant="success" @click="$bvModal.hide('modal-err')">OK</b-button>
    </b-modal>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      modalShow: false,
      modalErr: false,
      cardTitle: this.card.title,
      cardDesc: this.card.description
    }
  },
  methods: {
    ...mapActions(['getCards', 'removeCard', 'editCard']),
    async deleteCard() {
      await this.removeCard(this.card.id)
      await this.getCards()
    },
    async editCard() {
      if(this.cardTitle && this.cardDesc) {
        await this.editCard({
          cardId: this.card.id, 
          title: this.cardTitle,
          desc: this.cardDesc
        })
        await this.getCards()
      } else {
        this.modalErr = true
        this.cardDesc = this.card.description
      }
    }
  }
}
</script>

<style scoped>
.card-title {
  width: 100%;
  height: 100%;
  background: rgb(216, 183, 139);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 0px black;
}

.card-title:hover {
  opacity: 0.9;
  box-shadow: 2px 2px 10px 0px black;
}

.card-box {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
