<template>
  <div class="tag">
    <Header :one="one" />
    <Card :pagesData="$pagination.pages" :height="height" />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
export default {
  name: "tag",
  data() {
    return {
      height: "",
      one: ""
    };
  },

  created() {
    console.log(this.$pagination);
  },

  mounted() {
    this.height = document.documentElement.clientHeight - 50 + "px";

    this.one = window.sessionStorage.getItem("one");
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
  height: 800px;
  /* height: auto; */
  margin: 0 auto;
}
</style>