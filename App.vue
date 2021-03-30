<script>
	export default {
		// onLaunch: function() {
		// 	console.log('App Launch')
		// },
		// onShow: function() {
		// 	console.log('App Show')
		// },
		// onHide: function() {
		// 	console.log('App Hide')
		// }
	}
</script>

<style>
	/*每个页面公共css，这里放所有页面的公共样式，每个页面都会共享 */
    .page{
        width: 100%;
        height: 100%;
        background-color: #f7f7f7;
        /* position: absolute; */
    }
    .page-block{
        margin-top: 12upx;
        background-color: #FFFFFF;
        padding-bottom: 20upx;
    }
    /* 文字省略号 */
    .cutFont{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    /* 字体大小 */
    .font14{
        font-size: 14px;
    }
    /* 间距 */
    .mt10{
        margin-top: 10upx;
    }
</style>
