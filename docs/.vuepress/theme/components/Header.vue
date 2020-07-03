<template>
  <div class="header">
    <div class="left">
      <router-link to="/">
        <img class="left-profile zIndex" src="../../public/profile.png" alt />
      </router-link>
    </div>

    <div class="center zIndex" ref="center">
      <div class="centerText" ref="centerText" :class="{textAnimate: isScroll}">{{one}}</div>
    </div>

    <div class="right">
      <div class="right-nav zIndex">
        <router-link class="blackColor" to="/tech/">编程</router-link>
        <router-link class="blackColor" to="/beauty">美女</router-link>
        <router-link class="blackColor" to="/life">生活</router-link>
      </div>

      <SearchBox class="search" />
    </div>
  </div>
</template>

<script>
import SearchBox from "@SearchBox";
export default {
  data() {
    return {
      isScroll: false
    };
  },

  props: {
    one: String
  },

  updated() {
    this.isNeedScroll();
  },

  methods: {
    isNeedScroll() {
      const centerWidth = this.$refs.center.getBoundingClientRect().width;
      const centerTextWidth = this.$refs.centerText.getBoundingClientRect()
        .width;

      // 滚动文字
      if (centerWidth < centerTextWidth) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
    }
  },

  components: { SearchBox }
};
</script>

<style scoped>
@import "../styles/zIndex.css";

.header {
  width: 1200px;
  height: 50px;
  background: #f4f3f3;
  box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.left {
  width: 240px;
  height: 50px;
  line-height: 50px;
}

.left-profile {
  width: 50px;
  height: 50px;
  display: flex;
  padding: 0 0 0 20px;
}

.center {
  width: 500px;
  height: 50px;
  position: relative;
  font-size: 14px;
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.centerText {
  position: absolute;
  white-space: nowrap;
  color: rgb(25, 137, 250);
}

.right {
  width: 450px;
  height: 50px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

.right-nav {
  width: 200px;
  height: 50px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 0 25px;
  position: relative;
  z-index: 10;
}

.search {
  margin: 0 0 0 10px;
  z-index: 100;
}

.blackColor {
  width: 60px;
  height: 30px;
  border-radius: 18.75%/50%;
  color: #0862f2;
  line-height: 30px;
  text-align: center;
  background: white;
}

.textAnimate {
  animation: van-notice-bar-play 15s ease-in 0s infinite;
}

@keyframes van-notice-bar-play {
  from {
    transform: translate3d(0%, 0, 0);
  }
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>