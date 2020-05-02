<template v-if="weather">
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
</template>

<script>
import { weatherTypeConfig } from "../utils/themeConfig";
import { getWeather } from "../api";
export default {
  name: "weather",
  data() {
    return {
      weather: ''
    };
  },

  created() {},

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

  mounted() {
    // 获取天气预报
    getWeather().then(res => {
      // 将数据存储到
      this.weather = res.data.weather;
    });
  },

  components: {},

  methods: {}
};
</script>

<style scoped>
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