<template>
  <div class="home">
    <p class="size">2021 Wellness Plan</p>
    <Progress />
  </div>
</template>

<script>
import Progress from "@/components/Progress.vue";

export default {
  name: "Home",
  components: {
    Progress,
  },
};
</script>

<style scoped>
.size {
  font-size: 36px;
  font-weight: 700;
  margin-top: 0;
}
</style>
