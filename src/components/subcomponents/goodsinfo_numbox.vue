<template>
  <!-- 问题： 我们不知道什么时候能得到 max 值。但是，总归会得到 正在的 max 值 -->
  <!-- 解决方法： 我们可以使用 watch 属性监听父组件 传递过来的 max值。不管 watch 会被触发几次，但是最后一次一定会 max数值 -->
  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
  import mui from '../../lib/mui/js/mui.js'

  export default {
    mounted() {
      // 初始化数字选择框组件
      mui('.mui-numbox').numbox()
      // console.log(this.max);
    },
    methods: {
      countChanged() {
        // 每当文本框的数量被修改的时候，立即把最新的数据，通过事件调用，传递给父组件
        this.$emit('getcount', parseInt(this.$refs.numbox.value))
        // console.log(this.$refs);
      }
    },
    props: ['max'],
    watch: {
      // 属性监听
      max: function (newVal, oldVal) {
        // s使用 mui插件的 JS API 设置  numbox 
       mui('.mui-numbox').numbox().setOption('max',newVal)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
