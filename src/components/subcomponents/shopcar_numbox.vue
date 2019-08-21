<template>
  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
  <!-- 分析： 子组件什么时候把 数据传递给父组件 -->
</template>

<script>
  import mui from '../../lib/mui/js/mui.js'

  export default {
    mounted() {
      // 初始化数字选择框组件
      mui('.mui-numbox').numbox()
    },
    methods: {
      countChanged() {
        // 数量改变了
        // console.log(this.$refs.numbox.value);
        // 每当数量值改变，则立即把最新的数量同步到购物车的 store 中，覆盖之前的数量值
        this.$store.commit('updateGoodsInfo', {
          id: this.goodsid,
          count: this.$refs.numbox.value
        })
        console.log(this);
      }
    },
    // props 中传递的参数，千万别有空格！！！名字一定要准确！！！
    // 获取或者传递参数的时候，要多用 浏览器中的 vue 和 vuex 插件，观察参数是否传递正确
    props: ['initcount', 'goodsid']
  }
</script>

<style lang="scss" scoped>
.mui-numbox {
  height: 25px;
}
</style>
