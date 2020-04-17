<template>
  <div class="front-matter">
    <img class="img" :src="frontMatter.image" alt />
    <div class="p">{{frontMatter.title}}</div>
    <div class="p">{{frontMatter.date}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    frontMatter: Object
  },

  created() {},

  components: {},

  methods: {}
};
</script>

<style scoped>
.front-matter {
  width: 700px;
  height: 600px;
  position: relative;
  margin: 30px 0;
  padding: 30px 30px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  border-radius: 5%;
  box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.05);
}

.img {
  width: 600px;
  height: 500px;
}

.p {
  width: 600px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  position: relative;
  top: 30px;
}

</style>