import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import draggable from 'vuedraggable';

export const useTodoListStore = defineStore('todoList', () => {
  const todoList = ref([]);
  const id = ref(0);

  const todoListLocal = localStorage.getItem('todoList');
  if (todoListLocal) {
    todoList.value = JSON.parse(todoListLocal)._value;
  }
  // getters
  watch(
    () => todoList,
    (newValue) => {
      localStorage.setItem('todoList', JSON.stringify(newValue));
    },
    { deep: true }
  );

  // actions
  const addTodo = (item) => {
    todoList.value.push({
      id: id.value++,
      item,
      completed: false,
    });
  };
  const deleteTodo = (itemId) => {
    todoList.value = todoList.value.filter((obj) => obj.id !== itemId);
  };
  const toggleCompleted = (idToFind) => {
    const todo = todoList.value.find((obj) => obj.id === idToFind);
    todo.completed = !todo.completed;
  };
  const clearCompleted = () => {
    todoList.value = todoList.value.filter((obj) => !obj.completed);
  };

  return { todoList, id, addTodo, deleteTodo, toggleCompleted, clearCompleted };
});
