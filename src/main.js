// 入口文件 
import Vue from 'vue'

// SA-1 导入路由包
import VueRouter from 'vue-router'
// SA-2 安装路由
Vue.use(VueRouter)
// SA-3 导入自定义的 router 模块
import router from './router.js'  

// SB-1 导入 vue-resource
import VueResource from 'vue-resource'
// SB-2 安装 vue-resource
Vue.use(VueResource)
// SB-3 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

// SC-1 注册 vuex
import Vuex from 'vuex'
// SC-2 安装vuex
Vue.use(Vuex)

// 每次刚进入网站,肯定会调用 main.js 在刚调用的时候，先从本地存储中，把购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: {
    // this.$store.state.***
    // 将购物车中的商品数据，用一个数组来存储起来，在 car 数组中，存储一下商品的对象。可以暂时将这个商品对象，设计成这个样子
    // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
    car: car
  },
  mutations: {
    // this.$store.commit('方法的名称', '按需传递唯一的参数')
    addToCar(state, goodsinfo) {
      // 点击加入购物车，把商品信息保存到 store 中的 car 上
      // 分析：
      // 1. 如果购物车中，之前就已经有这个对应的商品了。那么，只需要更新数量
      // 2. 如果没有，则直接把商品数据 push 到 car 中即可

      // 假设在购物车中没找到对应的商品
      var flag = false

      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      // 如果最终循环完毕得到 flag 还是 false ，则把商品数据直接 push 到购物车中
      if (!flag) {
        state.car.push(goodsinfo)
      }
      // 当更新 car 之后，把 car 数组存储到本地的 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state, goodsinfo) {
      // 修改购物车中商品的数量值
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar(state, id) {
      // 根据 Id 从 state 里的 购物车car 中删除对应的商品数据
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      // 把最新的 所有购物车商品的状态保存到 store 中去
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    // this.$store.getters.***
    // 相当于计算属性，也相当于 filters
    getAllCount(state) {
      var c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {
      var s = {}
      state.car.forEach(item => {
        s[item.id] = item.selected
      })
      return s
    },
    getGoodsCountAndAmount(state) {
      var j = {
        // 勾选的数量
        count: 0,
        // 勾选的总价
        amount: 0
      }
      state.car.forEach(item => {
        if (item.selected) {
          j.count += item.count
          j.amount += item.price * item.count
        }
      })
      return j
    }
  }
})

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

// 按需导入 Mint-UI 中组件
import 'mint-ui/lib/style.css'
// import { Header, Swipe, SwipeItem,  Button, Lazyload } from 'mint-ui'
// Vue.component( Header.name, Header )
// Vue.component( Swipe.name, Swipe )
// Vue.component( SwipeItem.name, SwipeItem )
// Vue.component( Button.name, Button )
// Vue.use(Lazyload)
import MintUI from 'mint-ui'
Vue.use(MintUI)

// 导入 MUI 样式
import './lib/mui/css/mui.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


// 导入 App 根组件
import app from './App.vue';

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  // SA-4 挂载路由对象到 VM实例
  router,
  //  SC-3 挂载 store 状态管理对象
  store
})


