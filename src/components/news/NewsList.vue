<template>
  <div>
    <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<router-link :to="'/home/newsinfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{ item.title }}</h1>
							<p class='mui-ellipsis'>
                <span>发布时间：{{ item.add_time | dateFormat}}</span>
                <span>点击：{{ item.click }}次</span>
              </p>
						</div>
					</router-link>
				</li>
			</ul>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'

  export default {
    data () {
      return {
        // 新闻列表数据
        newslist: []
      }
    },
    created () {
      this.getNewsList()
    },
    methods: {
      // 获取新闻列表
      getNewsList() {
        this.$http.get('api/getnewslist').then(result => {
          // 如果没有失败，应该把数据保存到 data 上
          if(result.body.status === 0) {
            // 获取到的数据应该保持到上面的 data 中
            this.newslist = result.body.message
          } else {
            Toast('获取数据失败！')
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #229cffc5;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
