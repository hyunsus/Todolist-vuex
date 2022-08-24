<template>
  <div class="clear-all-container">
    <span class="clear-all-btn" @click="showModal">모든 일정 삭제</span>
    <modal v-if="clearModal" @close="clearModal = false">
      <h3 slot="header">경고</h3>
      <span slot="footer" @click="clearModal = false">
        정말 모든 일정을 삭제하시겠습니까?<br>
        <span
          class="check-btn"
          type="button"
          @click="clearTodo()"
        >
          <i class="check-btn fa fa-check" aria-hidden="true"></i>
        </span>
        <i
          class="close-modal-btn fa fa-times"
          aria-hidden="true"
          @click="editModal = false"
        ></i>
      </span>
    </modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Modal from './common/Modal.vue';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      clearModal: false,
    };
  },
  methods: {
    ...mapActions(['actionRemoveAllOfParents']),
    clearTodo() {
      this.actionRemoveAllOfParents();
    },
    showModal() {
      this.clearModal = !this.clearModal;
    },
  },
};
</script>

<style scoped>
.clear-all-container {
  width: 10rem;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
}
.clear-all-btn {
  color: #e20303;
  display: black;
  cursor: pointer;
}
.check-btn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
  cursor: pointer;
}
.close-modal-btn{
  cursor: pointer;
}
</style>
