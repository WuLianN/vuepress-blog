<template>
  <div id="layout">
    <Header :one="one" />

    <div class="content" :style="{height: height}">
      <keep-alive include="home">
        <ClientOnly>
          <component :is="layout" :height="height" />
        </ClientOnly>
      </keep-alive>
    </div>

    <Footer />

    <!-- 黑夜主题 -->
    <universe v-if="needTheme" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Tech from "./views/Tech";
import Camera from "./views/Camera";
import Life from "./views/Life";
import universe from "./components/universe";
import { getCurrentPage, isNight } from "./utils";
import { routerConfig } from "./utils/themeConfig";
import { getOne, getWeather } from "./api";

export default {
  data() {
    return {
      height: "0px",
      one: "",
      needTheme: false
    };
  },

  created() {
    // console.log(this.$pagination.pages);
    this.needTheme = isNight();
  },

  mounted() {
    this.height = document.documentElement.clientHeight - 50 + "px";

    getOne()
      .then(res => {
        const data = res.data.data;

        const randomIndex = Math.floor(Math.random() * data.length);
        const randomOne = data[randomIndex];

        this.one = randomOne;
      })
      .catch(err => {
        console.log(err);
      });
  },

  computed: {
    layout() {
      // console.log(this.$page.path);
      const name = getCurrentPage(this.$page.path);
      return routerConfig[name]();
    }
  },

  components: {
    Header,
    Home,
    Tech,
    Footer,
    Camera,
    Life,
    universe
  }
};
</script>

<style scoped>
#layout {
  width: 1200px;
  height: auto;
  margin: 0 auto;
}

.content {
  width: 1200px;
  box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.05);
}
</style>