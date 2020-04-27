<template>
  <div class="tagsList" ref="tagsList">
    <div
      class="tag"
      v-for="(item, index) in tagData"
      :key="index"
      @click="go(item)"
      :style="{backgroundImage: `url(${$withBase(item.img)})`}"
    >
      <span class="tag-name">{{item.name}}</span>
      <span class="tag-count">{{item.pages.length}}篇</span>
    </div>
  </div>
</template>

<script>
import { tagType, tagTypeConfig } from "../utils/themeConfig";
export default {
  data() {
    return {};
  },

  props: {
    tagData: Array
  },

  mounted() {
    console.log(this.tagData);
    if (this.tagData.length < 5) {
      this.$refs.tagsList.style.height = `${window.innerHeight - 50}px`;
    }
  },

  created() {
    console.log(this.tagData);
    console.log(this.$withBase);
  },

  components: {},

  methods: {
    go(item) {
      this.$router.push(item.path);
      // this.$router.push({ path: item.path, query: { pagesData: item.pages } });
    }
  }
};
</script>

<style scoped>
.tagsList {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  padding: 30px 0 0 0;
}

.tag {
  width: 555px;
  height: 300px;
  display: flex;
  margin: 0 0 30px 30px;
  cursor: pointer;
  background-size: 100% 100%;
}

.tag-img {
  width: 300px;
  height: 200px;
}

.tag-name {
  font-size: 30px;
  color: white;
  padding: 20px 20px 0 20px;
}

.tag-count {
  padding: 35px 20px 0 10px;
}
</style>