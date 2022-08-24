import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    todoItems: [],
    editTodoObj: {
      key: '',
      index: '',
      text: '',
    },
  },
  getters: {
    getTodoItem: (state) => state.todoItems,
    getEditItem: (state) => state.editTodoObj,
  },
  mutations: {
    addTodo: (state, payload) => {
      state.todoItems.push(payload);
      localStorage.setItem('vue-todo', JSON.stringify(state.todoItems));
    },
    removeAllOfParents: (state) => {
      state.todoItems = [];
      localStorage.setItem('vue-todo', JSON.stringify(state.todoItems));
    },
    removeTodo: (state, payload) => {
      state.todoItems.splice(payload.index, 1);
      localStorage.setItem('vue-todo', JSON.stringify(state.todoItems));
    },
    editTodo: (state, payload) => {
      const item = {
        key: payload.objKey,
        value: payload.objText,
        date: payload.objDate,
      };
      state.todoItems.splice(payload.objIndex, 1, item);
      localStorage.setItem('vue-todo', JSON.stringify(state.todoItems));
    },
  },
  actions: {
    actionAddTodo: (context, payload) => context.commit('addTodo', payload),
    actionRemoveAllOfParents: (context) => context.commit('removeAllOfParents'),
    actionRemoveTodo: (context, payload) => context.commit('removeTodo', payload),
    actionEditTodo: (context, payload) => context.commit('editTodo', payload),
  },
});
