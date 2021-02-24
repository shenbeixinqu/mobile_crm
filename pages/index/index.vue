<template>
	<view class="content">
		<view class="indexconent">线索&客户</view>
		<view class="indeximg">
			<view class="index_n_img" @click="searchclue">
				<image class="index_image" src="../../static/ssxx.png" mode="aspectFit"></image>
				<h4>搜索线索</h4>
			</view>
			<view class="index_n_img" @click="myClue">
				<image class="index_image" src="../../static/woxs.png" mode="aspectFit"></image>
				<h4>我的线索</h4>
			</view>
			<view class="index_n_img" @click="customers">
				<image class="index_image" src="../../static/wdkh.png" mode="aspectFit"></image>
				<h4>我的客户</h4>
			</view>
			<view class="index_n_img" @click="addClue">
				<image class="index_image" src="../../static/addmx.png" mode="aspectFit"></image>
				<h4>新增线索</h4>
			</view>
			
			<view class="index_n_img" @click="addClue">
				<image class="index_image" src="../../static/addmx.png" mode="aspectFit"></image>
				<h4>名片识别</h4>
			</view>
			
			
			

		</view>
		<view class="indexconent">出访</view>
		<view class="indeximg">
			<view class="index_n_img" @click="myMarket">
				<image class="index_image" src="../../static/wdcf.png" mode="aspectFit"></image>
				<h4>我的出访</h4>
			</view>

		</view>
		<view class="indexconent">审核</view>
		<view class="indeximg">
			<view class="index_n_img" @click="track">
				<image class="index_image" src="../../static/gjsh.png" mode="aspectFit"></image>
				<h4>跟进线索审核</h4>
			</view>
			<view class="index_n_img" @click="cusdelay">
				<image class="index_image" src="../../static/wdxs.png" mode="aspectFit"></image>
				<h4>线索延期审核</h4>
			</view>

		</view>
		<foot-part @openLogin="openLogin"></foot-part>

	</view>


</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(options) {

		},
		onShow() {

		},
		onReady() {
			////console.log('我是onReady函数')
		},
		onReachBottom() {

		},
		methods: {
			addClue(){
				uni.navigateTo({
					url:"/pages/addclue/addclue"
				})
			},
			myClue(){
				uni.navigateTo({
					url:"/pages/myclue/myclue"
				})
			},
			searchclue(){
				uni.navigateTo({
					url:"/pages/searchclue/searchclue"
				})
			},
			customers(){
				uni.navigateTo({
					url:"/pages/customers/customers"
				})
			},
			track(){
				uni.navigateTo({
					url:"/pages/check/track"
				})
			},
			cusdelay(){
				uni.navigateTo({
					url:"/pages/check/cusdelay"
				})
			},
			myMarket(){
				uni.navigateTo({
					url:"/pages/market/my"
				})
			}

		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.indexconent {
		width: 100%;
		height:70rpx;
		line-height: 70rpx;
		background: #f2f2f2;
		text-align: left;
		font-size: 30rpx;
		text-indent:40rpx;
		color: #666666;
		display: flex;
	}

	.indeximg {
		margin-top: 50rpx;
		margin-bottom: 50rpx;
		width: 90%;
		display: flex;
		justify-content: left;
		flex-wrap: wrap;
	}

	.index_n_img {
		width: 33.333%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.index_image {
		width: 60rpx;
		height: 60rpx;
		display: flex;
	}

	.index_n_img h4 {
		width: 100%;
		display: flex;
		margin-top: 10rpx;
		font-size: 26rpx;
		font-weight: normal;
		justify-content: center;
	}
</style>
