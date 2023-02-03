<template>
  <div class="progress">
    <div class="title">
      <h1>Your Progress <span class="size">3 steps to complete</span></h1>
      <h1 @click="show = !show" class="cursor">hide</h1>
    </div>
    <Transition>
      <div v-if="show">
        <Appointments />
      </div>
    </Transition>
  </div>
</template>

<script>
import Appointments from "@/components/Appointments.vue";
export default {
  components: {
    Appointments,
  },
  data() {
    return {
      show: true,
    };
  },
};
</script>

<style scoped>
.progress {
  border: 1px solid gray;
  border-radius: 12px;
  padding: 0px 22px;
}
.title {
  display: flex;
  justify-content: space-between;
}

.cursor {
  cursor: pointer;
}

.size {
  font-size: 20px;
  color: gray;
}

/* ///transition/// */

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
