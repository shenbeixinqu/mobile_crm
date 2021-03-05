<template>
	<view class="content">
		<view class="indexconent">线索&客户</view>
		<view class="indeximg">
			<view class="index_n_img" @click="searchclue" style="border-left: 0;margin-left: 1px;">
				<image class="index_image" src="../../static/ssxx.png" mode="aspectFit"></image>
				<h4>搜索线索</h4>
			</view>
			<view class="index_n_img" @click="myClue">
				<image class="index_image" src="../../static/woxs.png" mode="aspectFit"></image>
				<h4>我的线索</h4>
			</view>
			<view class="index_n_img" @click="customers" style="border-right: 0;">
				<image class="index_image" src="../../static/wdkh.png" mode="aspectFit"></image>
				<h4>我的客户</h4>
			</view>
			<view class="index_n_img" @click="addClue" style="border-left: 0;margin-left: 1px;">
				<image class="index_image" src="../../static/addmx.png" mode="aspectFit"></image>
				<h4>新增线索</h4>
			</view>

			<view class="index_n_img" @click="myOcr">
				<image class="index_image" src="../../static/mp.png" mode="aspectFit"></image>
				<h4>名片识别</h4>
			</view>

			<view class="index_n_img" @click="myMarket" style="border-right: 0;">
				<image class="index_image" src="../../static/wdcf.png" mode="aspectFit"></image>
				<h4>我的出访</h4>
			</view>
		</view>

		<view class="indexconent" v-if="roles.includes('3037') || roles.includes('3028')">审核</view>
		<view class="indeximg">
			<view class="index_n_img" @click="track" v-if="roles.includes('3037')">
				<image class="index_image" src="../../static/gjsh.png" mode="aspectFit" ></image>
				<h4>跟进线索审核</h4>
			</view>
			<view class="index_n_img" @click="cusdelay" v-if="roles.includes('3028')">
				<image class="index_image" src="../../static/wdxs.png" mode="aspectFit" ></image>
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
				roles: []
			}
		},
		onLoad(options) {
			// var role = ["3000","3001","3002","3003","3004","3005","3006","3007","3008","3009","3037","3028"]
			// getApp().globalData.roles = role
			this.roles = getApp().globalData.roles
			// 	this.roles = ["3000","3001","3002","3003","3004","3005","3006","3007","3008","3009","3037"]
		},
		onShow() {

		},
		onReady() {
			
		},
		onReachBottom() {

		},
		methods: {
			addClue() {
				uni.navigateTo({
					url: "/pages/addclue/addclue"
				})
			},
			myOcr() {
				uni.navigateTo({
					url: "/pages/addclue/imgocr"
				})
			},
			myClue() {
				uni.navigateTo({
					url: "/pages/myclue/myclue"
				})
			},
			searchclue() {
				uni.navigateTo({
					url: "/pages/searchclue/searchclue"
				})
			},
			customers() {
				uni.navigateTo({
					url: "/pages/customers/customers"
				})
			},
			track() {
				uni.navigateTo({
					url: "/pages/check/track"
				})
			},
			cusdelay() {
				uni.navigateTo({
					url: "/pages/check/cusdelay"
				})
			},
			myMarket() {
				uni.navigateTo({
					url: "/pages/market/my"
				})
			}

		}
	}
</script>

<style scoped>
	page {
		background: #f2f2f2 !important;
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		align-items: center;
		background: #fff !important;

	}

	.indexconent {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		background: #f2f2f2;
		text-align: left;
		font-size: 35rpx;
		text-indent: 45rpx;
		color: #333;
		display: flex;
	}

	.indeximg {
		width: 100%;
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
		height: 200upx;
		border: 1px #f2f2f2 solid;
		box-sizing: border-box;
		margin-left: -1px;
		margin-top: -1px;
	}

	.index_image {
		width: 60rpx;
		height: 60rpx;
		display: flex;
	}

	.index_n_img h4 {
		width: 100%;
		display: flex;
		margin-top: 15rpx;
		font-size: 35rpx;
		font-weight: normal;
		color: #777;
		justify-content: center;
	}
</style>
