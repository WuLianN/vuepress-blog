<template>
  <keep-alive>
    <div class="tag">
      <Header />
      <Card :pagesData="$pagination.pages" />
      <Footer />
    </div>
  </keep-alive>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
export default {
  created() {
    console.log(this.$pagination.pages);
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