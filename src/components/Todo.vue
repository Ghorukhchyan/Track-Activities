<template>
  <div>
    <div v-for="(todo, inx) in todos" :key="inx" class="todos">
      <div class="item">
        <h5 contenteditable="true">{{ todo.title }}</h5>
        <div class="type">
          <img class="img" :src="todo.img" />

          <h5 class="status" :class="todo.class">{{ todo.status }}</h5>

          <div class="details" @click="todos[inx].show = !todos[inx].show">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>

          <span v-if="todo.show" class="tooltip"
            ><button @click="deleteLine(inx) && countPercent" class="btn">
              delete
            </button></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState({
      todos: (state) => state.todo.todos,
    }),
    ...mapGetters(["countPercent"]),
  },
  methods: {
    ...mapActions(["deleteLine"]),
  },
};
</script>

<style scoped>
.todos {
  padding: 0 8px;
  margin-top: 12px;
  border: 1px solid gray;
  border-radius: 12px;
}

.item {
  display: flex;
  justify-content: space-between;
}

.type {
  display: flex;
  align-items: center;
}

.img {
  height: 30px;
  padding-right: 10px;
}

.status {
  padding-right: 12px;
}

.details {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-width: 22px;
  height: 20px;
  cursor: pointer;
}

.tooltip {
  position: absolute;
  margin-bottom: 62px;
  margin-left: 100px;
}

.btn {
  color: red;
  border: 1px solid gray;
  border-radius: 7px;
  background: white;
  padding: 6px 20px;
}

.dot {
  height: 3px;
  width: 3px;
  background-color: #374042;
  border-radius: 50%;
  display: inline-block;
  font-weight: bold;
}
</style>
