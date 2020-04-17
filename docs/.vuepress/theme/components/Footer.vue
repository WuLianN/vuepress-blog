<template>
  <div class="footer">
    <div class="footer-left"></div>
    <div class="footer-right">
      <p>©2020 WuLianN</p>
      <p>粤ICP备18115352号</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {},

  components: {},

  methods: {}
};
</script>

<style scoped>
.footer {
  width: 1200px;
  height: 50px;
  background: #f9f9f9;
  box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  align-items: center;
}

.footer-left {
  width: 500px;
  height: 50px;
}

.sponsor {
  width: 100px;
  height: 50px;
  display: flex;
  align-items: center;
}

.sponsor-img {
  width: 70px;
  height: 40px;
}

.footer-right {
  width: 300px;
  height: 50px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
</style>