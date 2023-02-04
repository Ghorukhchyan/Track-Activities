<template>
  <div class="body">
    <DoughnutChart :percent="percent" />
    <div>
      <div class="header rounded-12">
        <div v-for="list in months" :key="list.id" class="months-position">
          <h2 class="mb-4">
            {{ list.month }}
          </h2>

          <div v-if="list.type === 'completed'">
            <div
              v-for="complete in isComplete"
              :key="complete.id"
              class="green-colour rounded-12 mb-4"
            ></div>
          </div>

          <div v-else-if="list.type === 'booked'">
            <div
              v-for="complete in isBooked"
              :key="complete.id"
              class="blue-colour rounded-12 mb-4"
            ></div>
          </div>

          <div v-else-if="list.type === 'book-now'">
            <div
              v-for="complete in bookNow"
              :key="complete.id"
              class="light-blue-colour rounded-12 mb-4"
            ></div>
          </div>
        </div>
      </div>

      <div class="position">
        <Todo />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import DoughnutChart from "@/components/DoughnutChart.vue";
import Todo from "@/components/Todo.vue";

import months from "../../constants/months";

export default {
  components: {
    DoughnutChart,
    Todo,
  },
  data() {
    return {
      months,
    };
  },

  computed: {
    ...mapState({
      todos: (state) => state.todo.todos,
      percent: (state) => state.todo.percent,
    }),
    ...mapGetters(["isComplete", "isBooked", "bookNow"]),
  },

  methods: {
    ...mapActions(["deleteLine"]),
  },
};
</script>

<style scoped>
.body {
  display: flex;
  justify-content: space-around;
}

.rounded-12 {
  border-radius: 12px;
}

.green-colour {
  border: 2px solid green;
}
.blue-colour {
  border: 2px solid blue;
}

.light-blue-colour {
  border: 2px solid rgb(142, 142, 255);
}

.mb-4 {
  margin-bottom: 4px;
}

.header {
  display: flex;
  padding: 0px 16px 16px;
  border: 1px solid gray;
}
.months-position {
  margin: 0px 35px;
}

.status {
  padding-right: 12px;
}

.completed {
  color: green;
  opacity: 0.4;
}
.booked {
  color: blue;
}
.book-now {
  color: rgb(142, 142, 255);
}

.position {
  margin-top: 35px;
}

@media screen and (max-width: 1700px) {
  .months-position {
    margin: 0px 10px;
  }
}

@media screen and (max-width: 1120px) {
  .months-position {
    margin: 0px;
  }
}
</style>
