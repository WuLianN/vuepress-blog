<template>
  <div class="tech" :style="{height: height}">
    <div class="card-wrap">
      <div
        class="card zIndex"
        :style="{backgroundImage: randomColor(item)}"
        v-for="(item, index) in pagesData"
        :key="index"
        @click="go(item)"
      >{{item.title}}</div>
    </div>

    <div class="tech-pagination zIndex" :style="{top: height}">
      <Pagination />
    </div>

    <!-- <div class="loading">
      <div class="truck" v-if="loading">
        <div class="truck-container"></div>
        <div class="glases"></div>
        <div class="bonet"></div>
        <div class="base"></div>
        <div class="base-aux"></div>
        <div class="wheel-back"></div>
        <div class="wheel-front"></div>
        <div class="smoke"></div>
      </div>

      <div v-if="none">没有更多了</div>
    </div>-->
  </div>
</template>

<script>
import { tagType, tagTypeConfig } from "../utils/themeConfig";
import { Pagination } from "@vuepress/plugin-blog/lib/client/components";
import Tags from "../Tags";
import _ from "loadsh";
export default {
  name: "tech",
  data() {
    return {
      moreData: [],
      loading: false,
      none: false,
      debounce: null
    };
  },

  created() {
    console.log(this.pagesData);
    console.log(this.$pagination);
  },

  props: {
    pagesData: Array,
    height: String
  },

  components: {
    Pagination,
    Tags
  },

  methods: {
    randomColor(item) {
      const R = Math.floor(Math.random() * 255);
      const G = Math.floor(Math.random() * 255);
      const B = Math.floor(Math.random() * 255);
      const R1 = Math.floor(Math.random() * 255);
      const G1 = Math.floor(Math.random() * 255);
      const B1 = Math.floor(Math.random() * 255);

      const transparent = 0.5;

      const color = `rgba(${R}, ${G}, ${B}, ${transparent})`;
      const color1 = `rgba(${R1}, ${G1}, ${B1}, ${transparent})`;

      return `linear-gradient(to right, ${color}, ${color1})`;
    },

    go(item) {
      this.$router.push(item.path);
    }
  }
};
</script>

<style scoped>
@import "../styles/truck.css";
@import "../styles/zIndex.css";

.tech {
  width: 1200px;
  box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.05);
  background: url("https://api.bearcub.club/tag/car.jpg") 100% 100%;
  background-size: 100% 100%;
}

.card-wrap {
  display: flex;
  flex-flow: row wrap;
  padding: 30px 0 0 0;
}

.card {
  width: 555px;
  height: 50px;
  position: relative;
  margin: 0 0 30px 30px;
  color: white;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
}

.tech-pagination {
  width: 1200px;
  height: 50px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  width: 1200px;
  /* height: 100px; */
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>