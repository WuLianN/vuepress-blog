<template>
  <div class="home" :style="{height: height}">
    <div class="left">
      <div class="blogger">
        <img class="blogger-avatar" src="https://api.bearcub.club/user/avatar.jpg" alt />
        <div class="blogger-name">WuLianN</div>
        <div class="blogger-link">
          <a href="https://github.com/WuLianN" target="_block">
            <img class="blogger-link-github-logo" src="../../public/github.png" alt="github" />
          </a>
        </div>

        <div class="blogger-text">喜欢花里胡哨的东西</div>
        <div class="blogger-text">不喜欢花里胡哨的话</div>
      </div>
    </div>

    <div class="right">
      <div class="weather">
        <div class="weather-location flex">
          <img class="weather-location-logo" src="../../public/location.png" alt="loction" />
          <span>{{weather.city}}</span>
        </div>
        <div class="weather-type flex">
          <img class="weather-type-logo zIndex" :src="weatherTypeLogo" alt />
          <span class="weather-type-text">{{weather.weather}}</span>
        </div>
        <div class="flex">{{weather.temperature}}°C</div>
      </div>
    </div>
  </div>
</template>

<script>
import { weatherTypeConfig } from "../utils/themeConfig";
export default {
  name: "home",
  data() {
    return {
      
    };
  },

  computed: {
    weatherTypeLogo: function() {
      const weatherType = this.weather.weather;
      const weather = weatherTypeConfig[weatherType];
      let imgUrl;

      if (weather) {
        const hour = new Date().getHours();

        if (weather === "晴.png" && hour >= 19) {
          imgUrl = "夜晴.png";
        } else if (weather === "日间多云.png" && hour >= 19) {
          imgUrl = "夜间多云.png";
        } else {
          imgUrl = weather;
        }
      } else {
        imgUrl = "无.png";
      }

      // 这里有个 坑 需要解释哦  外部引入完整连接 -> cannot find module
      return require("../../public/" + imgUrl);
    }
  },

  props: {
    height: String,
    weather: Object
  },

  created() {
    
  },

  components: {},

  methods: {}
};
</script>

<style scoped>
@import '../styles/zIndex.css';
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

.blogger {
  width: 200px;
  height: 330px;
  padding: 20px 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  background: white;
}

.blogger-avatar {
  width: 200px;
  height: 200px;
}

.blogger-name {
  width: 200px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}

.blogger-link {
  width: 200px;
  height: 30px;
  position: relative;
}

.blogger-link-github-logo {
  width: 30px;
  height: 30px;
  display: block;
  display: block;
  margin: 0 auto;
}

.blogger-text {
  width: 200px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background-image: -webkit-linear-gradient(bottom, #054144, #1a6a77, #0d09f3);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.right {
  width: 200px;
  height: auto;
  /* border: 1px solid red; */
}

.weather {
  width: 200px;
  height: 200px;
  background: white;
  padding: 10px 0 0 0;
}

.weather-location {
  position: relative;
  width: 100%;
  height: 30px;
  line-height: 30px;
}

.weather-location-logo {
  width: 30px;
  height: 30px;
  margin: 0 0 0 -20px;
}

.weather-type {
  position: relative;
  width: 100%;
  margin: 10px 0;
}

.weather-type-logo {
  width: 100px;
  height: 100px;
}

.weather-type-text {
  align-self: flex-end;
  position: absolute;
  left: 80px;
}

.flex {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
</style>