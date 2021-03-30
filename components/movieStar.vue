<template name="movieStar"><!-- //template中的name属性可以不给 -->
    <!-- 评分组件 -->
	<view class="moive-star">
	    <!-- <image src="../../static/icos/star-yellow.png" class="star-icon"></image>
	    <image src="../../static/icos/star-yellow.png" class="star-icon"></image>
	    <image src="../../static/icos/star-yellow.png" class="star-icon"></image> -->
        <!-- 可以让v-for直接循环一个数字5，这样会输出5个元素 -->
	    <image 
        v-for="yellow in yellowScore"
        src="/static/icos/star-yellow.png" class="star-icon " ></image>
	    <image 
        v-for="gray in grayScore" 
        src="/static/icos/star-gray.png" class="star-icon"></image>
        <!-- 这里的score是直接用的props的数据，而不是data的 ，如果isShow数值为1，则显示-->
	    <text class="movie-score" v-if="isScore==1">{{score}}</text>
        <!-- <text>{{val}}</text> -->
	</view>
</template>

<script>
	export default {
        // 给组件起名
        name:"movieStar",
        // 使用props属性来接收父级的组件,但是传过来的数据最好做数据验证，所以可以将props属性改为对象的写法，并且传过来的属性名也要做对象处理
        // props:["val"],
        props:{
            // hotMovieStar是来自父级传递过来的动态数据
          // hotMovieStar:{
          //     type:Array
          // },
            // props里面还可以写一个占位符，该占位符通过父级传进来
          score:0, //定义即将被传过来的评分,这里其实是当做了数据源，会被created函数给处理，处理的数据给了data属性对应的值，然后再将该值传递给视图。这里面的值是默认值
          isScore:0 //定义是否显示评分，因为有时候不希望显示评分，而只显示星星，0为不显示（默认），1为显示.注意：这里的值不是默认值，如果要设置默认值，则要改为对象的形式，并且写上default:默认值
          /* 
          举例：
          自定义属性：数据的原始类型 或
          自定义属性：{
              type:数据的原始类型,
              default:默认值，且当类型是Array或Object时，default就是一个函数
          }
          */
        },
		data() {
			return {
				msg:"hello,vue组件！",
                // 这里定义两个静态数据（变量），用来决定黄色星星和灰色星星要显示的个数
                // 一共要显示5颗星星，所以两个变量的值加起来要刚好等于5，这样才能通过数值去决定循环输出多少个星星到上面
                yellowScore:0,
                grayScore:5
			};
		},
        created() {
            // 生命周期函数：当组件创建完成时就会调用，这个用来给评分的那两个变量赋值的，因为这两个变量的值来源于父级，所以在组件创建完毕后就需要将值计算好并赋值给data中的那两个变量，计算的来源在于props属性
            
            // 首先判断从父级传过来的数据是不能为空且合法的
            // 先定义一个临时变量，用来保存传过来的值，然后再通过该值来确定每种星星的个数
            var tempScore=0;
            if(this.score!=null && this.score!=undefined && this.score!=""){
                // 分数共为10分，所以1颗星星代表2分
                tempScore=this.score;
            }
            // 黄色星星为：
            this.yellowScore=parseInt(tempScore/2);
            // 灰色星星为剩下的
            this.grayScore=5-this.yellowScore;
            
            // console.log(this.score)
        }
	}
</script>

<style>
.moive-star{
    display: flex;
    flex-direction: row;
    height: 40upx;
}
.star-icon{
    width: 25upx;
    height: 25upx;
    margin-top: 5upx;
}
.movie-score{
    font-size: 12px;
    margin-left: 10upx;
}
</style>
