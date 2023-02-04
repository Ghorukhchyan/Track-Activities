<template>
  <div class="doughnut_chart" style="position: relative">
    <svg
      :width="width"
      :height="height"
      viewBox="0 0 200 200"
      style="stroke-linecap: round"
    >
      <!-- Background circle -->
      <path
        :d="dBg"
        fill="transparent"
        :stroke="
          backgroundColor && validateColor(backgroundColor)
            ? backgroundColor
            : '#ecf6ff'
        "
        :stroke-width="strokeWidth"
      />
      <!-- Move to start position, start drawing arc -->
      <path
        :d="d"
        fill="transparent"
        :stroke="
          foregroundColor && validateColor(foregroundColor)
            ? foregroundColor
            : '#1993ff'
        "
        :stroke-width="strokeWidth"
      />
    </svg>
    <div class="value-container">
      <h1 v-if="percent">
        {{ valueCountUp ? countingUpValue + "%" : percent + "%" }}
      </h1>
      <div
        v-if="customText.length"
        v-html="customText"
        :style="customTextStyle"
      />
    </div>
    <h3 class="text">Completed appointments</h3>
  </div>
</template>

<script>
export default {
  name: "DoughnutChart",
  props: {
    percent: {
      type: Number,
    },
    foregroundColor: {
      type: String,
      default: "green",
    },
    backgroundColor: {
      type: String,
      default: "#c9c9c9",
    },
    strokeWidth: {
      type: Number,
      default: 15,
    },
    radius: {
      type: Number,
      default: 85,
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 200,
    },

    valueCountUp: {
      type: Boolean,
      default: false,
      required: false,
    },

    customText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      countingUpValue: 0,
      delayTimer: null,
    };
  },
  computed: {
    // If more than 50% filled we need to switch arc drawing mode from less than 180 deg to more than 180 deg
    largeArc() {
      const number = this.valueCountUp ? this.countingUpValue : this.percent;
      return parseInt(number) < 50 ? 0 : 1;
    },
    // Where to put x coordinate of center of circle
    x() {
      return 100;
    },
    // Where to put y coordinate of center of circle
    y() {
      return 100 - this.radius;
    },
    // Calculate X coordinate of end of arc (+ 100 to move it to middle of image)
    // add some rounding error to make arc not disappear at 100%
    endX() {
      return -Math.sin(this.radians) * this.radius + 100 - 0.0001; // eslint-disable-line no-mixed-operators
    },
    // Calculate Y coordinate of end of arc (+ 100 to move it to middle of image)
    endY() {
      return Math.cos(this.radians) * this.radius + 100; // eslint-disable-line no-mixed-operators
    },
    // Calculate length of arc in radians
    radians() {
      const number = this.valueCountUp ? this.countingUpValue : this.percent;
      const degrees = (number / 100) * 360;
      const value = degrees - 180; // Turn the circle 180 degrees counter clockwise

      return (value * Math.PI) / 180;
    },
    // If we reach full circle we need to complete the circle, this ties into the rounding error in X coordinate above
    z() {
      const number = this.valueCountUp ? this.countingUpValue : this.percent;
      return parseInt(number) === 100 ? "z" : "";
    },
    dBg() {
      return `M ${this.x} ${this.y} A ${this.radius} ${this.radius} 0 1 1 ${
        this.x - 0.0001
      } ${this.y} z`;
    },
    d() {
      return `M ${this.x} ${this.y} A ${this.radius} ${this.radius} 0 ${this.largeArc} 1 ${this.endX} ${this.endY} ${this.z}`;
    },
  },

  methods: {
    validateColor(string) {
      let s = new Option().style;
      s.color = string;
      // must match a valid css color or hex value
      return s.color !== "" || /^#([0-9A-F]{3}){1,2}$/i.test(s.color);
    },
    countUpPercent() {
      if (this.percent === this.countingUpValue) {
        return;
      }
    },
  },
};
</script>
<style scoped>
h1 {
  margin: 0;
  padding: 0;
}

.text {
  max-width: 200px;
  text-align: center;
  color: gray;
}

.value-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  height: 200px;
  top: 0;
  left: 0;
}
</style>
