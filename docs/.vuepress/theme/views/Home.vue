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
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },

  props: {
    height: ""
  },

  created() {},

  components: {},

  methods: {}
};
</script>

<style scoped>
.home {
  width: 1200px;
  height: 500px;
  background: #f4f3f3;
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
</style>