// 1. 导入 路由包
import VueRouter from 'vue-router'

// 2. 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'


// 3. 创建路由对象
const router = new VueRouter({
  // 配置路由规则
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer },
    { path: '/home/newslist', component: NewsList },
    // 由于点击的时候，每一列的Id都不一样的，所以必须加上Id定位
    { path: '/home/newsinfo/:id', component: NewsInfo },
    { path: '/home/photolist', component: PhotoList},
    { path: '/home/photoinfo/:id', component: PhotoInfo},
    { path: '/home/goodslist', component: GoodsList},
    { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo'},
    { path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc'},
    { path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment'}
  ],
  // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
  linkActiveClass: 'mui-active' 
})

// 4.把路由对象暴露出去
export default router

