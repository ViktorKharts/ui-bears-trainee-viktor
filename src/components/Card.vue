<template>
  <div>
    <div class="card-title" @click="modalShow = !modalShow">
      <h5 v-if="item.title.length < 15">{{item.title}}</h5>
      <h5 v-else>{{item.title.slice(0, 15) + '...'}}</h5>
      <b-button @click="removeCard" pill variant="outline-danger" size="sm">&times;</b-button>
    </div>

    <b-modal id="modal-win" v-model="modalShow" centered hide-header hide-footer>
      <b-form @submit.prevent="editCard">
        <b-form-group label="Card Title">
          <b-form-input v-model="cardTitle" />
        </b-form-group>
        <b-form-group label="Card Description">
          <b-form-input v-model="cardDesc" />
        </b-form-group>
        <b-button type="submit" variant="success" @click="$bvModal.hide('modal-win')">OK</b-button>
      </b-form>
    </b-modal>
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
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      modalShow: false,
      cardTitle: this.item.title,
      cardDesc: this.item.description
    }
  },
  methods: {
    removeCard() {
      const column_id = this.columns.indexOf(this.column)
      const item_id = this.item.id
      this.$emit('remove-card', column_id, item_id)
    },
    editCard() {
      const column_id = this.columns.indexOf(this.column)
      const item_id = this.column.items.indexOf(this.item)
      if (this.cardTitle.trim() && this.cardDesc.trim()) {
        this.$emit('edit-card', column_id, item_id, this.cardTitle, this.cardDesc)
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
</style>
