<template>
	<view class="contentk">
		<view class="tit">客户订单</view>
	
		<z-paging ref="paging" @query="queryList" :list.sync="tableList" style="height: calc(100% - 80rpx);">
			<!-- 设置自定义emptyView组件，非必须。空数据时会自动展示空数据组件，不需要自己处理 -->
			<empty-view slot="empty"></empty-view>
			<!-- list数据，建议像下方这样在item外层套一个view，而非直接for循环item，因为slot插入有数量限制 -->
			<view>
		<view class="bottxt" v-for="item in tableList" :key="item">
			<view class="bottxt_top">
				<view class="bottxt_top_y"></view>
				<view class="bottxt_top_jiantou">{{item.addtime}}</view>
			</view>
			<view class="bottxt_mid">
				<view class="bottxt_mid_right">
					<view>订单产品：<text class="txt2">{{item.depict}}</text></view>
					<view>订单类型：<text class="txt2">{{item.depict}}</text></view>
					<view>下单人：{{item.ad_name}}</view>
				</view>
			</view>
		</view>
		</view>
			</z-paging>
		</view>
		
		
	</view>
</template>

<script>

	export default {
	
		
		props: {
			activeId: {
				type: String // 指定传入的类型
			}
		},
		data() {
			return {
				drawWid: '100%',
				tableList:[],
				token: "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTM1NDYzODgsImlhdCI6MTYxMzUxMDM4OCwiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6NTIsIm5hbWUiOiJcdTc2ZDhcdTUzZTRcdTZkNGJcdThiZDU1MiIsImV0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam8xTWl3aWFYTnpJam9pWlhKd0lpd2lhR1ZoWkdWeWN5STZleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjlMQ0psZUhBaU9qRTJNVE0xTXprd05qUXNJbWxoZENJNk1UWXhNelV4TURJMk5Dd2lkWE5sY2w5dVlXMWxJam9pWEhVM05tUTRYSFUxTTJVMFhIVTJaRFJpWEhVNFltUTFOVElpZlEuU3dodFVIRlp6UE9KREV1X2RUT2xqV2pEUUhrdWJMVFNxZjh4OHVkWEtkTSIsImNsb3VkX2lkIjoyLCJ1bl9pZCI6MiwidW5fbmFtZSI6Ilx1NmM4OFx1OTYzM1x1NzZkOFx1NTNlNCIsImRlX2lkIjoxMywiZGVfbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsImRlcGFydHR5cGUiOjEwLCJwb3N0X25hbWUiOiJcdTYwM2JcdTc2ZDEiLCJsZXZlbCI6NzcsInN1cGVyX2lkIjoxNywia2EiOjAsImlwIjoiMjIzLjEwMS43MC4xNTEiLCJsYXN0dGltZSI6MTYxMzUxMDM4NiwicG9zdHMiOlt7ImlkIjowLCJkbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsIm5hbWUiOiJcdTYwM2JcdTc2ZDEifSx7ImlkIjoxLCJkbmFtZSI6Ilx1NTkyN1x1NWI5ZVx1NjViZFx1OTBlOCIsIm5hbWUiOiJcdTYwM2JcdTc2ZDEifV0sInBvd2VycyI6IjE3NDI4ODE3OTg2MTA5ODc0MTg4NTc3Mjc3MzY3OTkxNTYxOTk0ODgzOTkzOTcwMjc1NDA4OTU3NDY5ODE3NzQyOTY1ODc0MzU5Mjc3MTcwMDg2NzU0NTE4NTQ0OTg5OTcyODk5ODAzMTI0MDA0NDA5NDQ1NTY0ODA2NTU1MjYzNjAyNTEzMzIzNzQxOTk2ODc1MjA3ODI2NzgyNjg5MTQ5NzY4MDQ1MTA3NjIzNzMwMjU2MTc2MjY3MTM5NDQzNDg3NzQ1ODA4NTgzMDEzNzA0OTkzMTgxNjQxNzM2NDMwOTc0MjQyNjM3NzA0MDc3MTA2NTM2MDQ1MDE2NzQ4OTc2Mzg0NTExMzc0MTg4NzQ2ODU3MzM3MTAwNjM5NTk1MzU0NDYxNzMxODQzMjQzMjA4ODc4MDI2ODM2NDY1MjQyNjUxMDYyNDQyNTEwODE2NDU2OTY3MTI2MDY0NzE5NDEzMTY2NDk1NzIyMTQ0MzQ2MTUzNzEwNDU5MzUxNDAzNjcyOTQzMjk5MzQ2NDk4NzA2MDczNTkzMTU3MzgwNTU5NjMzMDM3MjI0MjI1ODI1NDM4MDc4ODU3MjA5MzU5MzIzNDQ3ODE5MTUxNjY5NzIwMjUwODcxNzQ3NjAxNjE0OTI1ODcxNDI5MjEyMDUxNTQzNjE5OTE1NjM0MTcyMjU4NjU5Nzk4Njg1MDA0NTAyMzM1MTQxNDMzMDY4Mzc2Mzc4NDM4NjQ2NDc1NDE3NzY3MTk2MDA5NTg5MTM1NTQyMzgxMjY0ODgwMTgwNDY3NjQ3Njc3NzYzNjQxMDcyNTkzMzgwMDU4Nzc1ODI5MDE3NDUwMTQzNTUzOTcyNDYwMDMyOTAwNzM3NTkxNjYzNzE2MDA4MDUzMzA5NjEzMTg3MjI0MDU5MTE0NTM1MzUyMzgwMDA5MzMyMTIyNjI5NjY5ODI1Mzg3MDg4Mzg1NzAwNjE5NDc3Nzk0NTY4MjcyMjk3NTAwNzExNTc3OTE5NDk3MDYyMDg2MTk2NjY5MTgwODg4OTA1NTc4ODk3OTA1NTIxNzQ3Mjc2MzUxNjEyMTUyNDgxOTc1NTU4ODE4NzY1NzcxNDk3MTUyNTQxNTUzNDg3ODU1Njg3MDAwNTE4NDg4NTg5MDY0MzE1MjU4MjAxMzkwMDc5NDE3NTg0ODA1NjQxNjc3NzY4MjExMDMxODQwNzgwMjI4NjgxMjk1NTYzMjU4NDg5MzcwMDUwNTU2In19.3Jr9JWOGhFW5kYTU-lmUsQJI2kM1wCYocqUi3js4vjU"
			}
		},
	
		mounted() {
			this.fuwu();
		},
		methods: {
			queryList(pageNo, pageSize) {
				uni.request({
					url: this.$burl + '/api/customer/getOrders',
					header: {
						// 'Authorization': this.token
						'Authorization': "JWT " + getApp().globalData.token
},
					data: {
						limit: pageSize,
						pn: pageNo,
						id:94,
					},
					success: (res) => {
						if(res.data.data==''){
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
						}
						else{
						this.$refs.paging.addData(res.data.data.data);
						}
					},
					fail: (err) => {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
					}
				})

			},
			//抽屉打开
			drawer() {
				this.$refs.drawer.open();
			},
			//抽屉关闭
			clox() {
				this.$refs.drawer.close();
			},
			//客户概况接口
			fuwu(type) {
				uni.showLoading();
				uni.request({
					url: this.$burl + '/api/customer/getOrders',
					header: {
						'Authorization': "JWT " + getApp().globalData.token
					},
					data: {
						id:94,
					},
					success: (res) => {
						if (res.data.data.status == 200) {
							uni.hideLoading();
							this.tableList = res.data.data.data;
						}
					},
					fail: (err) => {
						
					}
				})
			},
		}
	}
</script>

<style>
	page {
		height: 100%;
	}
	
	.content {
		height: 100%;
		/* 父节点建议开启flex布局 */
		display: flex;
		flex-direction: column;
	}
	

	.uni-list-cell-db {
		display: flex;
		background: #f6f6f6;
		height: 70upx;
		line-height: 70upx;
		border-radius: 5px;
		text-indent: 20upx;
		text-align: left;
	}

	.tit {
		width: 95%;
		color: #666666;
		font-size: 30upx;
		height: 70upx;
		line-height: 70upx;
		text-align: left;
		position: relative;
	}

	.bottxt {
		width: 96%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: url(../../static/xx.jpg) repeat-y 8upx;
	}

	.bottxt_top {
		width: 100%;
		display: flex;
		height: 70upx;
		line-height: 70upx;
		align-items: center;
		justify-items: center;
	}

	.bottxt_mid {
		width: 95%;
		align-items: center;
		justify-items: center;



		padding-left: 5%;
	}

	.bottxt_mid_right {
		width: 95%;
		font-size: 28upx;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		padding: 2%;
		color: #666;
	}

	.txt1 {
		color: #000;
	}

	.txt2 {
		color: #4873c1;
	}

	.bottxt_top_y {
		width: 20upx;
		height: 20upx;
		background: #e4e7ed;
		border-radius: 50%;
	}

	.bottxt_top_jiantou {
		line-height: 50upx;
		color: #909399;
		font-size: 24upx;
		margin-left: 10upx;

	}

	.shai-btn {
		width: 50upx;
		height: 50upx;
		background: url(../../static/shaixun.png) no-repeat;
		background-size: 70%;
		background-position: center;
		position: absolute;
		right: 0;
		top: 10upx;
	}

	.shai-btn:after {
		border: none;
	}

	.uni-picker-tips {
		font-size: 12px;
		color: #666;
		margin-bottom: 15px;
		padding: 0 15px;
		/* text-align: right; */
	}

	.chou_tit {
		padding: 10px;
		color: 666666;
	}

	.check_bj {
		width: 100%;
		display: flex;
		justify-content: center;

		line-height: 70upx;
		margin-bottom: 10upx;

	}

	.check_box_k {
		width: 90%;
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;

	}

	.bottombtn {
		width: 80%;
		
		position: absolute;
		bottom: 30upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.anbtn {
		width: 45%;
	}

	.check_box {
		margin-bottom: 10upx;
		width: 220rpx;
		height: 70upx;
		line-height: 70upx;
		display: flex;
		margin-right: 5upx;
		color: rgb(64, 158, 255);
		position: relative;
	}

	.cketext {
		width: 220rpx;
		position: absolute;
		text-align: center;
		z-index: 1;
	}

	/deep/.uni-checkbox-input {
		background: #f4f4f4;
		border: none;
		width: 200rpx;
		position: absolute;
		height: 70upx;
		line-height: 70upx;
	}

	/deep/.uni-checkbox-input-checked {
		background-color: #ecf5ff;
	}

	/deep/.uni-checkbox-input-checked:before {
		display: none;
	}

	/deep/uni-picker {
		width: 100%;
	}
</style>
