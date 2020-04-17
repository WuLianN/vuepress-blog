<template>
  <div class="header">
    <div class="left">
      <router-link to="/">
        <img class="left-profile" src="../../public/profile.png" alt />
      </router-link>
    </div>

    <div class="center" ref="center">
      <div class="centerText" ref="centerText" :class="{textAnimate: isScroll}">{{one}}</div>
    </div>

    <div class="right">
      <div class="right-nav">
        <router-link class="blackColor" to="/tech/">编程</router-link>
        <router-link class="blackColor" to="/camera">摄影</router-link>
        <router-link class="blackColor" to="/life">生活</router-link>
      </div>

      <SearchBox />
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

      console.log(centerWidth, centerTextWidth);
    }
  },

  components: { SearchBox }
};
</script>

<style scoped>
.header {
  width: 1200px;
  height: 50px;
  background: #f9f9f9;
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
  color: rgb(25, 137, 250)
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
  width: 145px;
  height: 50px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 0 60px;
}

.blackColor {
  color: black;
}

.textAnimate {
  animation: van-notice-bar-play 15s linear 1.5s infinite;
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