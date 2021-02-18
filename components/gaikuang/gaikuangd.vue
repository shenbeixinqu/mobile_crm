<template>

	
	<view class="contentk">
		<uni-drawer ref="drawer" mode="right" :width="drawWid">
		ddd
		</uni-drawer>
		<view class="tit">客户的基本资料</view>
		<view class="bottxt" v-if="tableList.length!=0">
			<view class="divtableleft">
				<view class="divtext">客户名称：</view>
				<view class="divright">{{ tableList.name}}</view>
				<view class="divtext">客户地区：</view>
				<view class="divright">{{ tableList.loc_lead}}</view>
				<view class="divtext">详细地址：</view>
				<view class="divright">{{ tableList.address}}</view>
				<view class="divtext">企业法人：</view>
				<view class="divright">{{ tableList.legal}}</view>
				<view class="divtext">客户电话：</view>
				<view class="divright">{{ tableList.phone}}</view>
				<view class="divtext">客户来源：</view>
				<view class="divright">{{ tableList.source_flag}}</view>
				<view class="divtext">客户资质：</view>
				<view class="divright"  @click="drawer()">请点击了解</view>
			</view>
			<view class="divtableleft1" v-if="isMore">
				<view class="divtext">传真：</view>
				<view class="divright">{{ tableList.fax }}</view>
				<view class="divtext">办公邮箱：</view>
				<view class="divright">{{ tableList.mail }}</view>
				<view class="divtext"> 邮编：</view>
				<view class="divright">{{ tableList.zipcode }}</view>
				<view class="divtext">人员规模：</view>
				<view class="divright">{{ tableList.employees }}</view>
				<view class="divtext">成立日期：</view>
				<view class="divright">{{ tableList.openingdate }}</view>
				<view class="divtext">注册资金：</view>
				<view class="divright">{{ tableList.registered }}</view>
				<view class="divtext">主营业务：</view>
				<view class="divright">{{ tableList.business }}</view>
			</view>
			<view class="divgd" @click="handleMore" v-if="isShow">了解更多客户信息>></view>
			<view class="divgd" @click="handleShou"  v-if="isSh">收回>></view>
		</view>
		<view class="tit">联系人</view>
		<button type="primary" class="anbtn" @click="fuwu('search')">新增联系人</button>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	export default {
		components: {
			uniDrawer
		},
		props: {
			activeId: {
				type: String // 指定传入的类型
			}
		},
		data() {
			return {
				drawWid: '100%',
				isShow:true,
				isMore: false,
				isSh: false,
				tableList: [],
				token: "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTM1NDYzODgsImlhdCI6MTYxMzUxMDM4OCwiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6NTIsIm5hbWUiOiJcdTc2ZDhcdTUzZTRcdTZkNGJcdThiZDU1MiIsImV0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam8xTWl3aWFYTnpJam9pWlhKd0lpd2lhR1ZoWkdWeWN5STZleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjlMQ0psZUhBaU9qRTJNVE0xTXprd05qUXNJbWxoZENJNk1UWXhNelV4TURJMk5Dd2lkWE5sY2w5dVlXMWxJam9pWEhVM05tUTRYSFUxTTJVMFhIVTJaRFJpWEhVNFltUTFOVElpZlEuU3dodFVIRlp6UE9KREV1X2RUT2xqV2pEUUhrdWJMVFNxZjh4OHVkWEtkTSIsImNsb3VkX2lkIjoyLCJ1bl9pZCI6MiwidW5fbmFtZSI6Ilx1NmM4OFx1OTYzM1x1NzZkOFx1NTNlNCIsImRlX2lkIjoxMywiZGVfbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsImRlcGFydHR5cGUiOjEwLCJwb3N0X25hbWUiOiJcdTYwM2JcdTc2ZDEiLCJsZXZlbCI6NzcsInN1cGVyX2lkIjoxNywia2EiOjAsImlwIjoiMjIzLjEwMS43MC4xNTEiLCJsYXN0dGltZSI6MTYxMzUxMDM4NiwicG9zdHMiOlt7ImlkIjowLCJkbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsIm5hbWUiOiJcdTYwM2JcdTc2ZDEifSx7ImlkIjoxLCJkbmFtZSI6Ilx1NTkyN1x1NWI5ZVx1NjViZFx1OTBlOCIsIm5hbWUiOiJcdTYwM2JcdTc2ZDEifV0sInBvd2VycyI6IjE3NDI4ODE3OTg2MTA5ODc0MTg4NTc3Mjc3MzY3OTkxNTYxOTk0ODgzOTkzOTcwMjc1NDA4OTU3NDY5ODE3NzQyOTY1ODc0MzU5Mjc3MTcwMDg2NzU0NTE4NTQ0OTg5OTcyODk5ODAzMTI0MDA0NDA5NDQ1NTY0ODA2NTU1MjYzNjAyNTEzMzIzNzQxOTk2ODc1MjA3ODI2NzgyNjg5MTQ5NzY4MDQ1MTA3NjIzNzMwMjU2MTc2MjY3MTM5NDQzNDg3NzQ1ODA4NTgzMDEzNzA0OTkzMTgxNjQxNzM2NDMwOTc0MjQyNjM3NzA0MDc3MTA2NTM2MDQ1MDE2NzQ4OTc2Mzg0NTExMzc0MTg4NzQ2ODU3MzM3MTAwNjM5NTk1MzU0NDYxNzMxODQzMjQzMjA4ODc4MDI2ODM2NDY1MjQyNjUxMDYyNDQyNTEwODE2NDU2OTY3MTI2MDY0NzE5NDEzMTY2NDk1NzIyMTQ0MzQ2MTUzNzEwNDU5MzUxNDAzNjcyOTQzMjk5MzQ2NDk4NzA2MDczNTkzMTU3MzgwNTU5NjMzMDM3MjI0MjI1ODI1NDM4MDc4ODU3MjA5MzU5MzIzNDQ3ODE5MTUxNjY5NzIwMjUwODcxNzQ3NjAxNjE0OTI1ODcxNDI5MjEyMDUxNTQzNjE5OTE1NjM0MTcyMjU4NjU5Nzk4Njg1MDA0NTAyMzM1MTQxNDMzMDY4Mzc2Mzc4NDM4NjQ2NDc1NDE3NzY3MTk2MDA5NTg5MTM1NTQyMzgxMjY0ODgwMTgwNDY3NjQ3Njc3NzYzNjQxMDcyNTkzMzgwMDU4Nzc1ODI5MDE3NDUwMTQzNTUzOTcyNDYwMDMyOTAwNzM3NTkxNjYzNzE2MDA4MDUzMzA5NjEzMTg3MjI0MDU5MTE0NTM1MzUyMzgwMDA5MzMyMTIyNjI5NjY5ODI1Mzg3MDg4Mzg1NzAwNjE5NDc3Nzk0NTY4MjcyMjk3NTAwNzExNTc3OTE5NDk3MDYyMDg2MTk2NjY5MTgwODg4OTA1NTc4ODk3OTA1NTIxNzQ3Mjc2MzUxNjEyMTUyNDgxOTc1NTU4ODE4NzY1NzcxNDk3MTUyNTQxNTUzNDg3ODU1Njg3MDAwNTE4NDg4NTg5MDY0MzE1MjU4MjAxMzkwMDc5NDE3NTg0ODA1NjQxNjc3NzY4MjExMDMxODQwNzgwMjI4NjgxMjk1NTYzMjU4NDg5MzcwMDUwNTU2In19.3Jr9JWOGhFW5kYTU-lmUsQJI2kM1wCYocqUi3js4vjU"
			}
		},
		// watch: {
		//     activeId: function(newVal, oldVal) {
		//      console.log('fdfd',newVal);
		//     },
		//   },
		mounted() {
			this.kehu();
			console.log(11111)
		},
		methods: {
			//更多
			handleMore() {
				this.isMore = !this.isMore;
				this.isShow=!this.isShow;
				this.isSh=!this.isSh;
			},
			//收回
			handleShou(){
				console.log('aaa');
				this.isMore=false;
				this.isSh=false;
				this.isShow=true;
			},
			//客户概况接口
			kehu() {
				uni.request({
				
					url: this.$burl + '/api/customer/info',
					header: {
						'Authorization': this.token
					},
					data: {
						id: this.activeId
					},
					success: (res) => {
						if (res.data.data.status == 200) {
							this.tableList = res.data.data.data;
						}
					},
					fail: (err) => {
						//console.log(err)
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

	.contentk {
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tit {
		width: 95%;
		color: #666666;
		font-size: 30upx;
		height: 70upx;
		line-height: 70upx;
		text-align: left;
	}

	.bottxt {
		width: 95%;

	}

	.divtableleft {
		width: 100%;
		line-height: 50upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		font-size: 24upx;
		border: 1px #e4e4e4 solid;
		border-bottom: none;
		background: #f2f2f2;
	}

	.divtableleft1 {
		width: 100%;
		line-height: 50upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		font-size: 24upx;
		border: 1px #e4e4e4 solid;
		border-top: none;
		border-bottom: none;
		background: #f2f2f2;
	}

	.divgd {
		color: #1890ff;
		width: 100%;
		font-size: 24upx;
		line-height: 50upx;
		text-align: right;
		height: 50upx;
	}

	.divtext {
		width: 20%;
		padding-left: 2%;
		display: flex;
		justify-content: flex-start;
		border-bottom: 1px solid #e4e4e4;
		font-size: 24upx;

	}

	.divright {
		width: 78%;
		border-bottom: 1px solid #e4e4e4;
		display: flex;
	}
	.anbtn{ width:95%; height: 70upx; line-height: 70upx;}
</style>
