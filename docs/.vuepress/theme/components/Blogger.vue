<template>
  <div class="blogger">
    <img class="blogger-avatar" src="https://api.bearcub.club/user/avatar.jpg" alt />
    <div class="blogger-name">WuLianN</div>
    <div class="blogger-link">
      <a href="https://github.com/WuLianN" target="_block" ref="noopener">
        <img class="blogger-link-github-logo" src="../../public/github.png" alt="github" />
      </a>
       <a href="https://admin.bearcub.club" target="_block" ref="noopener">
        <img class="blogger-link-github-logo" src="../../public/profile.png" alt="admin" />
      </a>
    </div>

    <div class="blogger-text">喜欢花里胡哨的东西</div>
    <div class="blogger-text">不喜欢花里胡哨的话</div>
  </div>
</template>

<style scoped>
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
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.blogger-link-github-logo {
  width: 30px;
  height: 30px;
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
