<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newsinfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发布时间:{{ newsinfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>
    <hr>
    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content"></div>
    <!-- 评论子组件区域 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
  // 导入评论组件
  import comment from "../subcomponents/comment.vue"

  export default {
    data () {
      return {
        // 将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
        id: this.$route.params.id,
        // 新闻对象
        newsinfo: {}
      }
    },
    created () {
      this.getNewsInof()
    },
    methods: {
      // 获取新闻详情
      getNewsInof() {
        this.$http.get('api/getnew/' + this.id).then(result => {
          if (result.body.status === 0) {
            this.newsinfo = result.body.message[0]
          } else {
            Toast('获取数据失败！')
          }
        })
      }
    },
    components: {
      // 用来注册子组件的节点
      "comment-box": comment
    }
  }
</script>

<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    font-size: 13px;
    color: #229cffc5;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%
    }
  }
}
</style>
