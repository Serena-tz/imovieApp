import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 其实我们还可以通过将全局变量挂载到Vue的原型属性上来实现所有页面的共用
Vue.prototype.serverUrl="https://www.imovietrailer.com/superhero";
// 假设这样后，自定义属性就会挂载到Vue的实例属性上了，通过this.serverUrl来读取该全局变量

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
