<template>
  <div class="tags">
    <Header />
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
      tagData: null
    };
  },

  created() {
    this.tagData = JSON.parse(JSON.stringify(this.$frontmatterKey.list));
    this.tagData.forEach((item, index) => {
      let img = tagImg[index];
      let imgLink = `/tag/${img}`;
      this.$set(item, "img", imgLink);
    });
  },

  components: { Header, Footer, TagsList },

  methods: {}
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