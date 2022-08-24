<template>
  <section>
    <transition-group name="list" tag="ul">
      <li
        v-for="({ key, date, value }, index) in getTodoItem"
        :key="key"
        class="shadow"
      >
        <i class="check-btn fa fa-check" aria-hidden="true"></i>
        {{ value }}&nbsp;&nbsp;
        <span class="text-muted"> {{ date }}</span>
        <span
          class="edit-btn"
          type="button"
          @click="editTodo(key, index, value)"
        >
          <i class="fas fa-pencil-alt" aria-hidden="true"></i>
        </span>
        <span
          class="remove-btn"
          type="button"
          @click="removeTodo(key, index)"
        >
          <i class="fa fa-trash" aria-hidden="true"></i>
        </span>
      </li>
    </transition-group>
    <modal v-if="editModal" @close="editModal = false">
      <h3 slot="header">수정하기</h3>
      <span slot="footer">
        수정할 내용을 작성해주세요
        <input
          type="text"
          v-model="getEditItem.text"
          onfocus="this.select()"
          @keypress.enter="editTodoAction()"
        />&nbsp;
        <span
          class="fixBtn"
          type="button"
          @click="editTodoAction()"
        >
          <i class="fas fa-pencil-alt" aria-hidden="true"></i>
        </span>
        <i
          class="close-modal-btn fa fa-times"
          aria-hidden="true"
          @click="editModal = false"
        ></i>
      </span>
    </modal>
  </section>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';
import Modal from './common/Modal.vue';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      editModal: false,
    };
  },
  computed: {
    ...mapGetters(['getTodoItem', 'getEditItem']),
  },
  methods: {
    ...mapActions(['actionRemoveTodo', 'actionEditTodo']),
    removeTodo(key, index) {
      this.actionRemoveTodo({ key, index });
    },
    editTodo(key, index, value) {
      this.getEditItem.index = index;
      this.getEditItem.text = value;
      this.getEditItem.key = key;
      this.editModal = !this.editModal;
    },
    editTodoAction() {
      const date = moment();
      const formatdate = date.format('YYYY.MM.DD HH:mm:ss');
      const objDate = formatdate;
      const objIndex = this.getEditItem.index;
      const objKey = this.getEditItem.key;
      const objText = this.getEditItem.text;
      this.actionEditTodo({
        objIndex,
        objKey,
        objDate,
        objText,
      });
      this.editModal = false;
    },
  },

};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0px;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.check-btn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.edit-btn,
.fixBtn {
  margin-left: auto;
  color: forestgreen;
  cursor: pointer;
}
.remove-btn {
  margin-left: 10px;
  color: #de4343;
  cursor: pointer;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-move {
  transition: transform 1s;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.text-muted {
  color: gray;
  font-size: 0.6em;
}
</style>
