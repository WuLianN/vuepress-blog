<template>
  <div class="repo-wrap" v-if="repoData.length > 0">
    <p class="announce">仍在维护的小项目</p>
    <div class="repo" v-for="(item, index) in repoData" :key="index">
      <a :href="item.html_url" target="_blank" class="repo-url">{{item.name}}</a>
      <div>{{item.description}}</div>
      <div class="repo-info">
        <span class="repo-lang">{{item.language}}</span>
        <a
          href="https://github.com/WuLianN/music-player/stargazers"
          target="_blank"
          class="repo-star"
        >{{item.stargazers_count}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { needRepo, getTheBestRepo } from "../api";
export default {
  name: 'repo',
  data() {
    return {
      repoData: []
    };
  },

  mounted() {
    getTheBestRepo().then(res => {
      res.data.filter(item => {
        const isNeed = needRepo.includes(item.name);
        if (isNeed) {
          this.repoData.push(item);
        }
      });
    });
  },

  created() {},

  components: {},

  methods: {}
};
</script>

<style scoped>
.repo-wrap {
  position: relative;
  width: 500px;
  margin: 0 100px 0 50px;
}

.announce {
  width: 300px;
  height: 30px;
  background: url("../../public/喇叭.png") 0% 100% no-repeat;
  background-size: 10% 100%;
  text-indent: 40px;
  line-height: 30px;
}

.repo {
  width: 500px;
  height: 100px;
  border: 1px solid #d1d5da;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  justify-self: left;
  padding: 10px 0 5px 30px;
  background: white;
  font-size: 14px;
  border-radius: 10px;
  margin: 0 0 10px 0;
}

.repo-info {
  display: flex;
  flex-flow: row nowrap;
  margin: 5px 0 0 0;
}

.repo-url {
  color: blue;
}

.repo-url:hover {
  text-decoration: underline;
}

.repo-lang {
  height: 25px;
  line-height: 30px;
}

.repo-star {
  width: 50px;
  height: 25px;
  background: url("../../public/star.png") 0% 100% no-repeat;
  background-size: 50% 100%;
  text-indent: 27px;
  line-height: 30px;
  margin: 0 0 0 30px;
}
</style>