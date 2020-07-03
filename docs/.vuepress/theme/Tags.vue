<template>
  <div class="tags">
    <Header :one="one" />
    <TagsList :tagData="tagData" />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import TagsList from "./components/TagsList";
import { tagImg } from "./utils/themeConfig";
export default {
  name: "tags",
  data() {
    return {
      tagData: null,
      one: ''
    };
  },

  created() {
    this.tagData = JSON.parse(JSON.stringify(this.$frontmatterKey.list));
    this.tagData.forEach((item, index) => {
      let img = tagImg[index];
      this.$set(item, "img", img);
    });
  },

  components: { Header, Footer, TagsList },

  methods: {},

  mounted(){
    this.one = window.sessionStorage.getItem("one");
  }
};
</script>

<style scoped>
.tags {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  background: #f9f9f9;
  box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.05);
}
</style>