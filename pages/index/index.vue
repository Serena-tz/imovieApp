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
                <!-- 通过for循环渲染数据列表 -->
                <view v-for="ulike,index in guessULikeList" class="guess-u-like-item" :key="index">
                    <image class="guess-img" :src="ulike.cover" mode=""></image>
                    <view class="guess-desc">
                        <view class="guess-desc-title cutFont">{{ulike.name}}</view>
                        <movieStar :score="ulike.score" isScore="0"></movieStar>
                        <view class="guess-desc-info">
                            <!-- 基本信息 -->
                            {{ulike.basicInfo}}
                        </view>
                        <view class="guess-desc-info">
                            <!-- 上映时间 -->
                            {{ulike.releaseDate}}
                        </view>
                    </view>
                    <!-- 如何将非input的值通过点击事件传入到函数中，可以使用自定义的data属性来做到 ,引号中的index即为上面循环中的索引-->
                    <view class="guess-opt" :data-gIndex="index" @click="praiseMe">
                        <image class="praise-icon" src="../../static/icos/praise.png" mode=""></image>
                        <text class="praise-me">点赞</text>
                        <!-- 最后在这里调用动画数据,如果是多个，则这里是动画数组 -->
                        <text :animation="animationDataArr[index]" class="praise-me animation-opacity">+1</text>
                        
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
                // 猜你喜欢数据
                guessULikeList:[],
                // 创建一个动画数据，该数据是一个对象
                animationData:{},
                // 这里创建一个动画数组，每个按钮都是用一个对象来存放，有几组就使用多少个
                animationDataArr:[
                    {},{},{},{},{}
                ]
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
            // wx.request()
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
                url:serverUrl+'/index/movie/hot?type=superhero&&qq=947876', 
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
                url:serverUrl+'/index/movie/hot?type=trailer&&qq=947876', 
                method:"POST",
                success:(res)=>{
                    // console.log(res.data);
                    if(res.data.status==200){
                       this.hotTrailerList=res.data.data; 
                    }
                }
            });
            // 猜你喜欢数据获取，为了实现代码共用，可以将以下代码包装到函数中。并放到methods属性中,然后在这里调用
            this.refresh();
            /* uni.request({
                url:serverUrl+'/index/guessULike?qq=947876', 
                method:"POST",
                success:(res)=>{
                    console.log(res.data);
                    if(res.data.status==200){
                       this.guessULikeList=res.data.data; 
                    }
                }
            }); */
            
            // 创建一个临时的动画对象
            // https://uniapp.dcloud.io/api/ui/animation?id=createanimation
            var animation=uni.createAnimation();
            // 将变量挂载到页面实例（vue）中
            this.animation=animation;
            // console.log(animation)
            // 条件编译
            // https://uniapp.dcloud.io/platform?id=%e6%9d%a1%e4%bb%b6%e7%bc%96%e8%af%91
            //#ifdef H5
                console.log('这里只会在H5页面中显示');
            //#endif
            
		},
        // 当页面卸载后，清空创建的动画数据
        onUnload() {
          this.animationData={}
        },
        // 有一个下拉刷新的生命周期函数
        // 作用其实只要去更新数据即可。也就是重新获取数据
        onPullDownRefresh() {
            this.refresh();
            // 当刷新时，最好在页面中间给个小菊花图标表示正在处理中，然后等数据完成再关闭
            uni.showLoading({
                // 參數mask表示出现载入图标时，不允许用户在界面上有其他操作
                mask:true
            });
            // 还可以添加页面标题处的loading样式
            uni.showNavigationBarLoading();
            
        },
		methods: {
            // 公共函数之首页面的下拉刷新
            
            refresh(){
                var serverUrl=this.serverUrl;
                uni.request({
                    url:serverUrl+'/index/guessULike?qq=947876', 
                    method:"POST",
                    success:(res)=>{
                        console.log(res.data);
                        if(res.data.status==200){
                           this.guessULikeList=res.data.data; 
                        }
                    },
                    // 在数据加载完成之后，应该要关闭loading样式
                    complete() {
                        uni.stopPullDownRefresh();
                        // 关闭小菊花按钮
                        uni.hideLoading();
                        // 隐藏标题的导航加载图标
                        uni.hideNavigationBarLoading();
                    }
                });
            },
            // 点击点赞时，执行该动画函数
            praiseMe(e){
                // 通过event对象来获取当前标签上的自定义属性的值
                // 注意：自定义数data中即使后面的属性名使用了大写，到JS这里时也要改为小写
                var gIndex=e.currentTarget.dataset.gindex;
                // 获取索引的目的是知道当前点击了哪个元素，并且将该动画数据放入到对应的data数据中
                console.log(gIndex);
                
                // return;
                // 构建动画数据，并且通过step来表示这组动画的完成。
                
                this.animation.translateY(-60).scale(1.5).opacity(1).step({duration:400});
                // 再将以上的动画数据通过export导出到animationData中,实现动画效果
                // this.animationData= this.animation.export();
                // 不再导出某一组了，而是将该动画数据赋值给数据，再填入到对应的动画对象数组中
                this.animationData= this.animation;
                this.animationDataArr[gIndex]=this.animationData.export();
                
                // console.log(this.animationData)
                // 执行完毕后要还原动画到初始状态，这样下次才能重新开始
                // var that=this;
                setTimeout(function() {
                    // 还原到初始状态
                   this.animation.translateY(0).scale(1).opacity(0).step({duration:0});  
                   // 将数据更新到data中
                   this.animationData= this.animation;
                   this.animationDataArr[gIndex]=this.animationData.export();
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
