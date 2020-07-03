<template>
  <div>
    <div class="waterfall" v-if="beauties">
      <div class="box" v-for="(item, index) in beauties" :key="index">
        <img class="box-img" @load="load" @error="error(index)" :src="item" alt />
      </div>
    </div>

    <Loading class="loading" v-if="loading" :notMore="notMore" />
  </div>
</template>

<script>
import { baseUrl, getBeauties } from "../api";
import _ from "lodash";
import Loading from "../components/Loading";
import mediumZoom from "medium-zoom";

export default {
  name: "beauty",
  data() {
    return {
      beauties: [],
      debounce: "",
      pageNum: 1,
      loading: false,
      notMore: false
    };
  },

  watch: {
    beauties: {
      immediate: true,
      handler() {
        this.$nextTick(function() {
          mediumZoom(
            Array.from(document.querySelectorAll(".box-img")).filter(
              img => !img.classList.contains("medium-zoom-image")
            ),{
              margin: 50,
              background: "#fff"
            }
          );
        });
      }
    }
  },

  mounted() {
    getBeauties(1, 12).then(res => {
      this.beauties = res.data.data.map(item => {
        return `${baseUrl}beauty/${item.fileName}`;
      });
    });

    this.debounce = _.debounce(this.handleScroll, 100, {
      leading: false,
      trailing: true
    });

    addEventListener("scroll", this.debounce);

    this.$on("hook:beforeDestory", () => {
      window.removeEventListener("scroll", this.debounce);
    });
  },

  components: { Loading },

  methods: {
    handleScroll() {
      const scrollTop = Math.floor(document.documentElement.scrollTop);
      const scrollHeight = Math.floor(document.documentElement.scrollHeight);
      const clientHeight = Math.floor(document.documentElement.clientHeight);

      if (scrollHeight - scrollTop <= clientHeight + 10) {
        this.pageNum += 1;
        this.loading = true; // 开启加载状态

        getBeauties(this.pageNum, 12).then(res => {
          if (res.data.data.length === 0) {
            // 没有更多了
            this.notMore = true;
          } else {
            res.data.data.map(item => {
              const url = `${baseUrl}beauty/${item.fileName}`;
              this.beauties.push(url);
            });
          }
        });
      }
    },

    // 图片加载完成
    load() {
      // 关闭加载状态
      this.loading = false;
    },

    error(index) {
      // 移除不能加载的图片
      this.data.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.waterfall {
  padding: 20px 0;
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}

.box {
  margin: 0 0 20px 20px;
  color: white;
  border-radius: 5px;
  position: relative;
  width: 275px;
}

.box-img {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.loading {
  display: flex;
  justify-content: center;
}
</style>