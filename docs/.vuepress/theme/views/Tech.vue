<template>
  <div class="tech" :style="{height: height}">
    <div
      class="card"
      :style="{backgroundImage: randomColor(item)}"
      v-for="(item, index) in $pagination.pages"
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

    <div class="tech-pagination" :style="{top: height}">
      <Pagination />
    </div>
  </div>
</template>

<script>
import { tagType, tagTypeConfig } from "../utils/themeConfig";
import { Pagination } from "@vuepress/plugin-blog/lib/client/components";
import Tags from "../Tags";
export default {
  name: "tech",

  created() {
    console.log(document.documentElement.clientHeight, window.innerHeight);
    // console.log(this.$pagination);
  },

  props: {
    height: String
  },

  mounted() {
    // this.$refs.tech.style.height = `${window.innerHeight}px`;
    // this.$refs.pagination.style.top = `${document.documentElement.clientHeight -
    //   55}px`;
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
    }
  }
};
</script>

<style scoped>
.tech {
  width: 1200px;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;   
  background: url("https://api.bearcub.club/tag/car.jpg") 100% 100%;
  background-size: 100% 100%;
}

.card {
  width: 555px;
  height: 300px;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  margin: 30px 0 0 30px;
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

.tech-pagination {
  width: 1200px;
  height: 50px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tech-sort {
  width: 1200px;
  height: auto;
  display: flex;
  flex-flow: row wrap;
}
</style>