<template>
  <div class="weather" v-if="hasData">
    <div class="weather-location flex">
      <img class="weather-location-logo" src="../../public/location.png" alt="loction" />
      <span>{{weather.weather.city}}</span>
    </div>
    <div class="weather-type flex">
      <img class="weather-type-logo zIndex" ref="logo" :src="imgUrl" alt />
    </div>
    <div class="weather-type-text flex">{{weather.weather.weather}}</div>
    <div class="flex">{{weather.weather.temperature}}°C</div>
  </div>
</template>

<script>
import { weatherTypeConfig } from "../utils/themeConfig";
import { getWeather } from "../api";
export default {
  name: "weather",
  data() {
    return {
      weather: "",
      imgUrl: "",
      hasData: false
    };
  },

  watch: {
    weather: function() {
      const weatherType = this.weather.weather.weather;
      const weather = weatherTypeConfig[weatherType];

      if (weather) {
        const hour = new Date().getHours();
        if (weather === "日晴.png" && hour >= 19) {
          this.imgUrl = require("../../public/夜晴.png");
        } else if (weather === "日间多云.png" && hour >= 19) {
          this.imgUrl = require("../../public/夜间多云.png");
        } else {
          this.imgUrl = require("../../public/" + weather);
        }
      } else {
        this.imgUrl = require("../../public/无.png");
      }
    }
  },

  mounted() {
    // 获取天气预报
    getWeather().then(res => {
      const result = res.data;

      // 按照数据库数据的格式 { weather: data }
      if (result.weather instanceof Object) {
        // 数据库的数据
        this.weather = res.data;
        this.hasData = true;
      } else {
        // 高德的数据
        const data = { weather: res.data };
        this.weather = data;
        this.hasData = true;
      }
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
}

.weather-type-logo {
  width: 100px;
  height: 100px;
}

.weather-type-text {
  margin: 0 0 10px 0;
}

.flex {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
</style>