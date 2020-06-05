<template>
  <div class="techLog">
    <Header :class="{sticky: isSticky}" />

    <Toc :headers="$page.headers" />
    <div class="md">
      <FrontMatter :frontMatter="$page.frontmatter" />
      <Content class="md-content" />
      <Vssue class="md-comment" :title="$title" />
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toc from "./components/Toc";
import FrontMatter from "./components/FrontMatter";
import _ from "lodash";
export default {
  name: "techLog",
  data() {
    return {
      isSticky: false,
      debounce: null,
      scrollTop: 0,
      firstTime: true
    };
  },

  mounted() {
    this.debounce = _.debounce(this.handleScroll, 100, {
      leading: false,
      trailing: true
    });
    window.addEventListener("scroll", this.debounce, true);
  },

  destroyed() {
    window.removeEventListener("scroll", this.debounce, true);
  },

  components: {
    Header,
    Footer,
    Toc,
    FrontMatter
  },

  methods: {
    handleScroll() {
      const scrollTop = document.documentElement.scrollTop;

      // 记录第一个scrollTop
      if (this.firstTime) {
        this.scrollTop = scrollTop;
        this.firstTime = false;
      }

      // 是否展示头部
      if (scrollTop > this.scrollTop) {
        console.log("向下滚动");
        this.isSticky = false;
        this.scrollTop = scrollTop;
      } else if (scrollTop < this.scrollTop) {
        console.log("向上滚动");
        this.isSticky = true;
        this.scrollTop = scrollTop;
      }
    }
  }
};
</script>

<style src="prismjs/themes/prism-okaidia.css"></style>
<style scoped>
.techLog {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  position: relative;
}

.md {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.md-content {
  width: 700px;
  position: relative;
  padding: 30px 30px;
  margin: 0 0 30px 0;
  border-radius: 50px;
  box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.05);
}

.md-comment {
  width: 800px;
  position: relative;
  margin: 50px 0 0 0;
}

.sticky {
  position: sticky;
  top: 0;
  z-index: 100;
}
</style>