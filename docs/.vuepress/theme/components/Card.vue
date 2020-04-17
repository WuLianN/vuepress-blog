<template>
  <div class="tech">
    <div
      class="card"
      :style="{backgroundImage: randomColor(item)}"
      v-for="(item, index) in data"
      :key="index"
      @click="go(item)"
    >
      <div class="card-header">{{item.title}}</div>
      <div class="card-content">{{item.summary}}</div>
      <div class="card-tag">
        <button
          class="card-tag-btn"
          v-for="(item, index) in item.frontmatter.tag"
          :key="index"
          :style="{color: getTagColor(item)}"
          @click.stop="sort(item)"
        >{{item}}</button>
      </div>

      <div class="card-footer">
        <span>{{item.frontmatter.date}}</span>
        <span>{{item.frontmatter.author}}</span>
        <!-- <span>{{item.frontmatter.location}}</span> -->
      </div>
    </div>

    <div class="loading">
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
    </div>
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
      data: [],
      moreData: [],
      loading: false,
      none: false,
      debounce: null
    };
  },

  created() {
    console.log(this.pagesData);
    // console.log(this.$pagination);

    this.slicePages(this.pagesData);
  },

  props: {
    pagesData: Array
  },

  mounted() {
    this.debounce = _.debounce(this.handleScroll, 500, {
      leading: false,
      trailing: true
    });
    window.addEventListener("scroll", this.debounce, true);
  },

  destroyed() {
    window.removeEventListener("scroll", this.debounce, true);
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
    },

    getTagColor(type) {
      if (tagType.includes(type)) {
        return tagTypeConfig[type]();
      } else {
        return "black";
      }
    },

    sort(type) {
      this.$router.push(`/tag/`);
    },

    // 选取6篇文章
    slicePages(pagesData) {
      this.loading = false;
      this.none = false;
      if (pagesData.length > 0) {
        if (this.data.length === 0) {
          // initial
          if (pagesData.length > 5) {
            this.data.push(...pagesData.slice(0, 6));
            pagesData.splice(0, 6);
          } else {
            const rest = pagesData.length;
            this.data.push(...pagesData);
            pagesData.splice(0, rest);
          }
        } else {
          // get more data
          this.loading = true;
          if (pagesData.length / 6 > 1) {
            this.data.push(...pagesData.slice(0, 6));
            pagesData.splice(0, 6);
          } else {
            const rest = pagesData.length % 6;
            this.data.push(...pagesData.slice(0, rest));
            pagesData.splice(0, rest);
          }
        }
      } else {
        console.log("没有更多了");
        this.none = true;
      }
    },

    handleScroll() {
      // console.log(document.documentElement.scrollTop);
      // console.log(document.documentElement.clientHeight);
      // console.log(document.documentElement.scrollHeight);

      console.log(500);

      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (scrollTop + clientHeight > scrollHeight - 50) {
        this.slicePages(this.pagesData);
      }
    }
  }
};
</script>

<style scoped>
@import "../styles/truck.css";

.tech {
  width: 1200px;
  /* height: auto; */
  display: flex;
  flex-flow: row wrap;
  background: black;
  box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.05);
  padding: 30px 0 0 0;
}

.card {
  width: 555px;
  height: 300px;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  margin: 0 0 30px 30px;
  color: white;
}

.card-header {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
}

.card-content {
  position: relative;
  width: 400px;
  height: 167px;
  left: 70px;
  text-indent: 30px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
}

.card-tag {
  width: 400px;
  height: 30px;
  position: relative;
  left: 80px;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
}

.card-tag-btn {
  width: auto;
  height: 30px;
  border: none;
  border-radius: 10%;
  font-weight: bold;
  margin: 0 20px 0 0;
  background: #e9e9ebab;
  cursor: pointer;
}

.card-tag-btn::before {
  content: "\00a0";
}

.card-tag-btn::after {
  content: "\00a0";
}

.card-footer {
  position: relative;
  left: 70px;
  bottom: 0;
  width: 400px;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
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