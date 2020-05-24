<template>
  <div id="layout">
    <Header :one="one" />

    <div class="content">
      <keep-alive :include="['home', 'beauty']">
        <ClientOnly>
          <component :is="layout" :height="height" />
        </ClientOnly>
      </keep-alive>
    </div>

    <Footer />

    <!-- 黑夜主题 -->
    <Universe v-if="needTheme" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Tech from "./views/Tech";
import Beauty from "./views/Beauty";
import Life from "./views/Life";
import Universe from "./components/Universe";
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

  mounted() {
    this.height = document.documentElement.clientHeight - 50 + "px";
    this.needTheme = isNight();

    getOne()
      .then(res => {
        const data = res.data;

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
      const name = getCurrentPage(this.$page.path);
      return routerConfig[name]();
    }
  },

  watch: {
    layout(val) {
      const night = isNight()
      if (night === true) {
        if (val === "beauty") {
          this.needTheme = false;
        } else {
          this.needTheme = true;
        }
      }
    }
  },

  components: {
    Header,
    Home,
    Tech,
    Footer,
    Beauty,
    Life,
    Universe
  }
};
</script>

<style scoped>
#background {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    1600px at 70% 120%,
    rgba(33, 39, 80, 1) 10%,
    #020409 100%
  );
}

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