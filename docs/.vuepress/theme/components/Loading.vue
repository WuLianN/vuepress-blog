<template>
  <div>
    <div class="truck" v-if="!notMore">
      <div class="truck-container"></div>
      <div class="glases"></div>
      <div class="bonet"></div>
      <div class="base"></div>
      <div class="base-aux"></div>
      <div class="wheel-back"></div>
      <div class="wheel-front"></div>
      <div class="smoke"></div>
    </div>

    <div class="notMore" v-if="notMore">~~ 身体被掏空了 ~~</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    notMore: Boolean
  }
};
</script>

<style scoped>
@import "../styles/truck.css";

.notMore {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-image: -webkit-linear-gradient(bottom, #054144, #1a6a77, #0d09f3);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
