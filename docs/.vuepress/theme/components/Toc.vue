<template>
  <div class="toc">
    <div class="toc-title" v-for="(item, index) in headers" :key="index">
      <a :href="`#${item.slug}`" :title="item.title">{{ item.title }}</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    headers: Array
  },

  created() {},

  components: {},

  methods: {}
};
</script>

<style scoped>
.toc {
  width: 200px;
  /* height: 300px; */
  position: fixed;
  top: 200px;
  left: 100px;
  border-radius: 5%;
  box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.05);
  color: blue;
}

.toc-title {
  margin: 10px 0 10px 10px;
}
</style>