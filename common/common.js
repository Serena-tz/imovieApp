const serverUrl="https://www.imovietrailer.com/superhero"; //开发环境
// const serverUrl="https://www.imovietrailer.com/superhero";//生产环境
// https://www.easy-mock.com/mock/5d36c3d00a801349d9304395/uniimoive/slide //这个也可以使用，我把生成的数据提交给mock了
// 因为当前变量的作用域是仅限于该文件的，假设该JS文件变量需要在其他文件中使用,需要使用exports导出去
// 如果只是添加一些全局变量，那么我们就没必要重新开一个JS文件了，可以直接通过main.js挂载到vue的原型属性上即可

export default {
    serverUrl
}