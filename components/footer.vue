<template>
	<view class="footer-part">
		
		
		<view v-if="seen" :class="['foot-item',nowFoot==1?'now-foot':'']" @tap="goHome()">
			<image class="img" v-if="nowFoot==1" src="../static/home1.png" mode="aspectFit"></image>
			<image class="img" v-if="nowFoot!=1" src="../static/home.png" mode="aspectFit"></image>
			<view class="text">首页</view>
		</view>
		
		<view  v-else :class="['foot-item',nowFoot==1?'now-foot':'']" @tap="fh()">
			<image class="img" v-if="nowFoot==1" src="../static/fff.png" mode="aspectFit"></image>
			<image class="img" v-if="nowFoot!=1" src="../static/fff.png" mode="aspectFit"></image>
			<view class="text">返回</view>
		</view>
		
		
	
		<view :class="['foot-item',nowFoot==2?'now-foot':'']" @tap="goClue()">
			<image class="img" v-if="nowFoot==2" src="../static/xian1.png" mode="aspectFit"></image>
			<image class="img" v-if="nowFoot!=2" src="../static/xian.png" mode="aspectFit"></image>
			<view class="text">我的线索</view>
		</view>
		<view :class="['foot-item',nowFoot==3?'now-foot':'']" @tap="goMine()">
			<image class="img" v-if="nowFoot==3" src="../static/ke1.png" mode="aspectFit"></image>
			<image class="img" v-if="nowFoot!=3" src="../static/ke.png" mode="aspectFit"></image>
			<view class="text">我的客户</view>
		</view>
		<view :class="['foot-item',nowFoot==4?'now-foot':'']" @tap="goData()">
			<image class="img" v-if="nowFoot==4" src="../static/user1.png" mode="aspectFit"></image>
			<image class="img" v-if="nowFoot!=4" src="../static/user.png" mode="aspectFit"></image>
			<view class="text">关于我</view>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 用户信息
				user_id: '',
				user_name: '',
				user_phone: '',
				nowFoot: 1,
				seen: true,
			}
		},
	mounted() {
	                        let that = this;
	                       
	                        /// 获取当前路由
	                        // let nowRoute = window.location.hash;
	                        let pages=getCurrentPages();
	                        let currpage=null;
	                        if(pages.length) currpage = pages[pages.length - 1];
	                        let nowRoute=currpage.route
	                        if(nowRoute){
	                                if(nowRoute.indexOf('index/index')!=-1) {
	                                        that.nowFoot = 1;
											that.seen=true
	                                }else if(nowRoute.indexOf('myclue')!=-1) {
	                                        that.nowFoot = 2;
											that.seen=true
	                                }else if(nowRoute.indexOf('customers')!=-1){
	                                        that.nowFoot = 3;
											that.seen=true
	                                }else if(nowRoute.indexOf('mydata')!=-1){
	                                        that.nowFoot = 4;
											that.seen=true
	                                }else{
										that.nowFoot= 0;
										if(nowRoute.indexOf('details')!=-1||nowRoute.indexOf('addclue')!=-1){
											that.seen=false
										}
									}
	                        }
	                },
		methods: {
			// 首页
			goHome() {
				if (this.nowFoot!= 1) {
					uni.navigateTo({
						url: '../index/index'
					});
					this.nowFoot = 1
				}
			},
			
			fh() {
				if (this.nowFoot!= 1) {
					uni.navigateBack();
					this.nowFoot = 1
				}
			},
			
			//线索
			goClue() {
				if(this.nowFoot!=2) {
					uni.navigateTo({
						url: '../myclue/myclue'
					});
					this.nowFoot = 2
				}
			},
			// 我的
			goMine() {
				if (this.nowFoot != 3) {
					uni.navigateTo({
						url: '../customers/customers'
					});
					this.nowFoot = 3
				}
			},
			goData(){
				if (this.nowFoot != 4) {
					uni.navigateTo({
						url: '../mydata/mydata'
					})
					this.nowFoot = 4
				}
			}
		}
	};
</script>

<style scoped>
	.footer-part {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120rpx;
		z-index: 998;
		border-top: 1px solid #ececec;
		display: flex;
		background-color: #fff;
		
	}

	.foot-item {
		flex: 1;
		text-align: center;
		margin-top: 20rpx;
	}

	.img {
		width: 45rpx;
		height: 46rpx;
		margin: 0 auto 5rpx;
	}

	.add-img {
		width: 133rpx;
		height: 133rpx;
		margin: -85rpx auto 0;
	}

	.text {
		font-size: 28rpx;
		color: #999999;
	}

	.now-foot .text {
		color: #4873c1;
	}
</style>
