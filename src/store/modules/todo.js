import * as mutationTypes from "../mutation-types";

import done from "@/assets/images/done.png";
import booked from "@/assets/images/booked.png";
import bookNow from "@/assets/images/book-now.png";

export default {
  state: {
    todos: [
      {
        title: "Hormone replacement therapy",
        status: "completed",
        img: done,
        class: "completed",
        show: false,
        id: "1",
      },
      {
        title: "Ozone therapy",
        status: "completed",
        img: done,
        class: "completed",
        show: false,
        id: "2",
      },
      {
        title: "NAD",
        status: "completed",
        img: done,
        class: "completed",
        show: false,
        id: "3",
      },
      {
        title: "Hormone replacement therapy",
        status: "completed",
        img: done,
        class: "completed",
        show: false,
        id: "4",
      },
      {
        title: "Ozone therapy",
        status: "Booked",
        img: booked,
        class: "booked",
        show: false,
        id: "5",
      },

      {
        title: "NAD",
        status: "Booked",
        img: booked,
        class: "booked",
        show: false,
        id: "6",
      },
      {
        title: "Hormone replacement therapy",
        status: "Book Now",
        img: bookNow,
        class: "book-now",
        show: false,
        id: "7",
      },
    ],
    percent: null,
  },
  getters: {
    // ---for months---
    isComplete(state) {
      return state.todos.filter((i) => i.status === "completed");
    },

    isBooked(state) {
      return state.todos.filter((i) => i.status === "Booked");
    },

    bookNow(state) {
      return state.todos.filter((i) => i.status === "Book Now");
    },
    // ---for count percent---
    countPercent(state) {
      const result = state.todos.filter(
        (i) => i.status === "completed" || i.status === "Booked"
      );

      const completed = result.filter((x) => x.status === "completed");

      completed.length === 0
        ? (state.percent = 0)
        : (state.percent = Math.round(
            (100 * completed.length) / result.length
          ));
    },
  },
  actions: {
    async deleteLine({ commit }, inx) {
      commit(mutationTypes.DELL_LINE, inx);
    },

    async isComplete({ commit }, inx) {
      commit(mutationTypes.IS_COMPLETE, inx);
    },
  },
  mutations: {
    [mutationTypes.DELL_LINE](state, inx) {
      state.todos = state.todos.filter((x, y) => y != inx);
      state.todos.forEach((element) => {
        element.show = false;
      });
    },
  },
};
