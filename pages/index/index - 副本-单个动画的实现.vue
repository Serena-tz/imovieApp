<template>
	<view class="page">
        <!-- 幻灯片组件 :interval="3000" :duration="1000" -->
        <swiper :indicator-dots="true" :autoplay="true" class="carousel">
            <!-- 通过在v-for中添加 v-if="index<4" 来指定循环的次数，如果不指定，则会将所有的数据都会循环出来 -->
            <swiper-item v-for="item,index in slideList" :key="index">
                <image :src="item.image" class="carousel"></image>
            </swiper-item>
            <!-- <swiper-item>
                <image src="../../static/carousel/spiderman.png" class="carousel"></image>
            </swiper-item> -->
        </swiper>
        <!-- 热门超英模块：使用滚动条组件 -->
        <view class="page-block hot-wrapper">
            <!-- 標題 -->
            <view class="hot-title-wrapper">
                <!-- mode="widthFix" 表示设置宽度后，让高度等比例缩放自适应 -->
                <image src="../../static/icos/hot.png" class="hot-icon" mode="widthFix"></image>
                <view class="hot-title">
                    热门超英
                </view>
            </view>
            <!-- 内容滾動組件 -->
            <scroll-view scroll-x="true" class="hot-scroll">
                <!-- 所有的电影用一个盒子包裹 -->
                <view class="hot-scroll-wrapper">
                    <!-- 每一部电影 通过v-for循环实现-->
                    <view class="single-moive" v-for="item,i in hotMovieList"  :key="i">
                        
                        <image :src="item.cover" class="moive-thumb"></image>
                        <view class="moive-name mt10 cutFont font14">
                            {{item.name}}
                        </view>
                        <!-- 评分组件,如果是静态的数据，使用val="hello,我是从父级过去的"传，否则添加： -->
                        <!-- hotMovieStar，给自定义标签传递一个属性过去，该属性的值会被传递到组件中 ,isShow表示是否要显示评分，默认是都显示，该数据并不是来自于json，而是自己配的一个开关-->
                        <movieStar :score="item.score" isScore="1"></movieStar>
                    </view>
                <!-- 电影view-scroll结束 -->    
                </view>
            </scroll-view>
        </view>
        <!-- 超英結束END -->
        <!-- 热门预告 -->
        <view class="page-block hot-trailer">
            <!-- 標題 -->
            <view class="hot-title-wrapper">
                <!-- mode="widthFix" 表示设置宽度后，让高度等比例缩放自适应 -->
                <image src="../../static/icos/interest.png" class="hot-icon" mode="widthFix"></image>
                <view class="hot-title">
                    热门预告
                </view>
            </view>
            <view class="trailer-list">
                <video 
                v-for="trailer,index in hotTrailerList"
                :id="trailer.id"
                :src="trailer.trailer"
                :poster="trailer.poster"
                :key="index"
                class="trailer-video-item"
                controls
                ></video>
            </view>
        </view>
        <!-- 热门预告END -->
        
        <!-- 猜你喜欢 -->
        <view class="page-block hot-trailer">
            <!-- 標題 -->
            <view class="hot-title-wrapper">
                <!-- mode="widthFix" 表示设置宽度后，让高度等比例缩放自适应 -->
                <image src="../../static/icos/guess-u-like.png" class="hot-icon" mode="widthFix"></image>
                <view class="hot-title">
                    猜你喜欢
                </view>
            </view>
            <view class="guess-u-like">
                <view class="guess-u-like-item">
                    <image class="guess-img" src="http://122.152.205.72:88/superhero/DC/BatManTheDarkKnightRises/cover.jpg" mode=""></image>
                    <view class="guess-desc">
                        <view class="guess-desc-title cutFont">蝙蝠侠:黑暗骑士崛起</view>
                        <movieStar :score="9.1" isScore="0"></movieStar>
                        <view class="guess-desc-info">
                            2018 / 美国 / 科幻 / 超级英雄
                        </view>
                        <view class="guess-desc-info">
                            上映时间：2008-04-30(中国大陆) 
                        </view>
                    </view>
                    
                    <view class="guess-opt" @click="praiseMe">
                        <image class="praise-icon" src="../../static/icos/praise.png" mode=""></image>
                        <text class="praise-me">点赞</text>
                        <!-- 最后在这里调用动画数据 -->
                        <text :animation="animationData" class="praise-me animation-opacity">+1</text>
                        
                    </view>
                </view>
              
            </view>
        </view>
        <!-- 猜你喜欢END -->
        
	</view>
</template>

<script>
    // 将外部JS通过import导入到当前页面中
    // 这样做后，common就是一个对象
    // import common from "../../common/common.js";
    // 导入电影评分组件,需要在组件实例中注册一下
    import movieStar from "../../components/movieStar.vue";
    
	export default {
		data() {
			return {
				title: '超英预告',
                // 轮播图数据
                slideList:[],
                // 热门超英数据
                hotMovieList:[],
                // 热门超英预告数据
                hotTrailerList:[],
                // 创建一个动画数据，该数据是一个对象
                animationData:{}
			}
		},
        // onload生命周期函数在每次页面载入时就会执行
		onLoad() {
            // 将common.js中的serverUrl赋值给serverUrl变量
            // console.log(this);  this是vue的实例
            var serverUrl=this.serverUrl;
            // debugger;
            // console.log("启动了首页！")
            // 轮播图数据：https://www.imovietrailer.com/superhero/index/carousel/list
            uni.request({
                // 因为这个地址在很多地方都可能会使用，所以可以将域名保存为一个变量放在全局环境中，下次万一地址改了，可以只改那个变量即可实现全页面都生效。办法是在根目录下新建一个common文件夹，在该文件夹下新建一个JS文件，再在当前页面导入即可
                url: serverUrl+'/index/carousel/list?qq=947876', //仅为示例，并非真实接口地址。
                method:"POST",
                success: (res) => {
                    // console.log(res.data);
                    // 只有数据请求成功才将获取的数据赋值给轮播图data变量
                    if(res.data.status==200){
                        this.slideList=res.data.data;
                    }
                }
            });
            // 熱門超英动态数据获取
            uni.request({
                url:serverUrl+'//index/movie/hot?type=superhero&&qq=947876', 
                method:"POST",
                success:(res)=>{
                    console.log(res.data);
                    if(res.data.status==200){
                       this.hotMovieList=res.data.data; 
                    }
                }
            });
            // 热门超英预告数据获取
            uni.request({
                url:serverUrl+'//index/movie/hot?type=trailer&&qq=947876', 
                method:"POST",
                success:(res)=>{
                    // console.log(res.data);
                    if(res.data.status==200){
                       this.hotTrailerList=res.data.data; 
                    }
                }
            });
            // 创建一个临时的动画对象
            // https://uniapp.dcloud.io/api/ui/animation?id=createanimation
            var animation=uni.createAnimation();
            // 将变量挂载到页面实例（vue）中
            this.animation=animation;
            // console.log(animation)
            
		},
        // 当页面卸载后，清空创建的动画数据
        onUnload() {
          this.animationData={}
        },
		methods: {
            // 点击点赞时，执行该动画函数
            praiseMe(){
                
                // 构建动画数据，并且通过step来表示这组动画的完成。
                
                this.animation.translateY(-60).scale(1.5).opacity(1).step({duration:400});
                // 再将以上的动画数据通过export导出到animationData中,实现动画效果
                this.animationData= this.animation.export();
                
                // console.log(this.animationData)
                // 执行完毕后要还原动画到初始状态，这样下次才能重新开始
                // var that=this;
                setTimeout(function() {
                    // 还原到初始状态
                   this.animation.translateY(0).scale(1).opacity(0).step({duration:0});  
                   // 将数据更新到data中
                   this.animationData= this.animation.export();
                   // 注意：延时器时间大于以上duration的时间值就可以了
                }.bind(this), 500);
                //bind(this)是什么意思： 将延时器绑定到vue实例中，因为在定时器中的this会跑，指向页面，比如到window，所以要将this重新改为vue的实例。这样在定时器中的回调函数中的this才会是外面this所表示的那个对象，这里是vue的实例。修正定时器this指向其实有3种方法：
                // 1、在外面保存为this的副本，在定时器里面使用该副本
                // 2、在回调函数后面接上 bind(this)
                // 3、回调函数改成箭头函数,需要去掉bind(this)
            }
		},
        // 注册组件
        components:{
            movieStar
        }
	}
</script>

<style>
	/* 本页面css,可以在外部导入一个css */
    @import url("index.css");
</style>
