<template>
  <keep-alive>
    <div class="tag">
      <Header />
      <Card :pagesData="$pagination.pages" :height=height />
      <Footer />
    </div>
  </keep-alive>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
export default {
  data() {
    return {
      height: "0px"
    };
  },

  created() {
    console.log(this.$pagination.pages);
  },

  mounted() {
    this.height = document.documentElement.clientHeight - 50 + "px";
    console.log(this.height);
  },

  components: {
    Header,
    Footer,
    Card
  },

  methods: {}
};
</script>

<style scoped>
.tag {
  width: 1200px;
  height: auto;
  margin: 0 auto;
}
</style>