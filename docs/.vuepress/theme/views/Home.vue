<template>
  <div class="home" :style="{height: height}">
    <div class="left">
      <Blogger />
    </div>

    <div class="center">
      <Repo />
    </div>

    <div class="right">
      <Weather />
    </div>
  </div>
</template>

<script>
import Blogger from "../components/Blogger";
import Weather from "../components/Weather";
import Repo from "../components/Repo";

export default {
  name: "home",
  data() {
    return {
      repoData: ""
    };
  },

  props: {
    height: String
  },

  components: {
    Blogger,
    Weather,
    Repo
  },

  methods: {}
};
</script>

<style scoped>
@import "../styles/zIndex.css";
.home {
  width: 1200px;
  height: 500px;
  background: #f4f3f3;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.left {
  width: 300px;
  height: 500px;
  /* border: 1px solid red; */
}

.center {
  width: 700px;
}

.right {
  width: 200px;
  height: auto;
  /* border: 1px solid red; */
}
</style>