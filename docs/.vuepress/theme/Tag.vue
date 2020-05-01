<template>
  <div class="tag">
    <Header />
    <Card :pagesData="$pagination.pages" :height="height" />
    <Footer />
<!-- 
    <Universe :height="heightToCanvas" /> -->
  </div>
</template>

<script>
import Universe from "./components/Universe";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
export default {
  data() {
    return {
      height: "",
      heightToCanvas: ""
    };
  },

  created() {
    console.log(this.$pagination.pages);
  },

  mounted() {
    this.height = this.heightToCanvas =
      document.documentElement.clientHeight - 50 + "px";
  },

  components: {
    Universe,
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
  height: 800px;
  /* height: auto; */
  margin: 0 auto;
}
</style>