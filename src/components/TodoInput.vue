<template>
  <div class="input-box shadow">
    <input
      type="text"
      v-model="newTodoItem"
      @keypress.enter="addTodo"
      placeholder="해야할 일을 입력하세요."
    />
    <span class="add-container" @click="addTodo">
      <i class="add-btn fa fa-plus" aria-hidden="true"></i>
    </span>
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">경고</h3>
      <span slot="footer" @click="showModal = false">
        할 일을 입력하세요.
        <i class="close-modal-btn fa fa-times" aria-hidden="true"></i>
      </span>
    </modal>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex';
import Modal from './common/Modal.vue';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      newTodoItem: '',
      showModal: false,
    };
  },
  methods: {
    ...mapActions(['actionAddTodo']),
    addTodo() {
      if (this.newTodoItem !== '' && this.newTodoItem) {
        const value = this.newTodoItem.trim();
        const date1 = moment();
        const date = date1.format('YYYY.MM.DD HH:mm:ss');
        const key = `key${date1}`;
        this.actionAddTodo({
          key,
          value,
          date,
        });
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput() {
      this.newTodoItem = '';
    },
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
.input-box {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.input-box input {
  border-style: none;
  font-size: 0.9rem;
}
.add-container {
  float: right;
  background: linear-gradient(to right, #6478fb, #8763fb);
  display: inline-block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}
.add-btn {
  color: white;
  vertical-align: middle;
}
</style>
