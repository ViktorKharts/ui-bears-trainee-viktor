<template>
  <div>
    <div class="link-container" v-if="!showInputField" @click="showInputField = true">
      <a href="#"><b-icon icon="plus"></b-icon>Add another column</a>
    </div>
    <form v-if="showInputField" @submit.prevent="onSubmit">
      <b-input-group id="input-group">
        <b-form-input type="text" v-model="title" placeholder="Enter a column name..."></b-form-input>
        <b-input-group-append>
          <b-button @click="showInputField = false" variant="danger">
            <b-icon icon="x" />
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </form>
  </div>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  props: {
    columns: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      title: '',
      showInputField: false
    }
  },
  computed: mapGetters(['allColumns']),
  methods: {
    ...mapActions(['getColumns', 'addColumn']),
    async onSubmit() {
      if (this.title.trim()) {
        await this.addColumn({
          title: this.title,
          orderId: this.columns.length
        })
        this.title = ''
        this.showInputField = false
      
        await this.getColumns()
        this.$forceUpdate()
      }
    }
  }
}
</script>

<style scoped>
form {
  margin: 10px;
}

.link-container {
  width: 200px;
  margin: 10px;
  background-color: rgba(46, 47, 49, 0.993);
  padding: 7px;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.75;
}

.link-container:hover {
  opacity: 0.40;
}

a, a:hover {
  text-decoration: none;
  color: white;
  width: 100%;
  height: auto;
}

#input-group {
  width: 250px;
  height: auto;
}
</style>