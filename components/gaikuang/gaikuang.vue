<template>
	<view class="contentk">
		<uni-drawer ref="drawer" mode="right" :width="drawWid">
			<view class="wk_n">
				<view class="chou_tit">客户名称：{{ tableList.name}}</view>
				<view class="list-item">
					<view class="list-itemleft">
						<view>资质类型：营业执照</view>
						<view>上传时间：营业执照</view>
					</view>
					<view class="list-img">
						<image style="width: 100%; height:300upx; background-color: #eeeeee;" mode="aspectFit"></image>
					</view>
				</view>
				<button type="primary" class="anbtn" @click="clox()">返回</button>
			</view>

		</uni-drawer>


		<view class="tit">客户的基本资料</view>
		<view class="bottxt">
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
				<view class="divright lanse" @click="drawer()"><a>请点击了解</a></view>
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
			<view class="divgd" @click="handleShou" v-if="isSh">收回>></view>
		</view>
		<view class="tit">联系人 <view class="txtright"></view>
		</view>
		<view class="contactus">
			<view class="contactus_top">
				<view>姓名</view>
				<view>电话号码</view>
				<view>职务</view>
			</view>
			<view class="contactus_bottom" v-for="item in linkmans" :key="item.value">
				<view>{{item.realname}}</view>
				<view  @tap.stop="call_phone(item)">{{item.phone}}<image class="tel-img" src="../../static/tel.png" mode="aspectFit"></image>
				</view>
				<view>{{item.duty}}</view>
			</view>
		</view>

	</view>
</template>
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
				isShow: true,
				isMore: false,
				isSh: false,
				tableList: [],
				tableDatazi: [],
				linkmans: [],
				token: "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTM2NDU4ODEsImlhdCI6MTYxMzYwOTg4MSwiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6NTIsIm5hbWUiOiJcdTc2ZDhcdTUzZTRcdTZkNGJcdThiZDU1MiIsImV0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam8xTWl3aWFYTnpJam9pWlhKd0lpd2lhR1ZoWkdWeWN5STZleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjlMQ0psZUhBaU9qRTJNVE0yTXpnMU5UVXNJbWxoZENJNk1UWXhNell3T1RjMU5Td2lkWE5sY2w5dVlXMWxJam9pWEhVM05tUTRYSFUxTTJVMFhIVTJaRFJpWEhVNFltUTFOVElpZlEuWnZnWUZLbDhVMjNuUElwLUtKOVNLd3ZVQ25vMURkTVRKUUdnclRGbTZBayIsImNsb3VkX2lkIjoyLCJ1bl9pZCI6MiwidW5fbmFtZSI6Ilx1NmM4OFx1OTYzM1x1NzZkOFx1NTNlNCIsImRlX2lkIjoxMywiZGVfbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsImRlcGFydHR5cGUiOjEwLCJwb3N0X25hbWUiOiJcdTYwM2JcdTc2ZDEiLCJsZXZlbCI6NzcsInN1cGVyX2lkIjoxNywia2EiOjAsImlwIjoiMTcyLjE4LjMuMTI5IiwibGFzdHRpbWUiOjE2MTM2MDk4NzksInBvc3RzIjpbeyJpZCI6MCwiZG5hbWUiOiJcdTU5MjdcdTVlMDJcdTU3M2FcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn0seyJpZCI6MSwiZG5hbWUiOiJcdTU5MjdcdTViOWVcdTY1YmRcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn1dLCJwb3dlcnMiOiIxNzQyODgxNzk4NjEwOTg3NDE4ODU3NzI3NzM2Nzk5MTU2MTk5NDg4Mzk5Mzk3MDI3NTQwODk1NzQ2OTgxNzc0Mjk2NTg3NDM1OTI3NzE3MDA4Njc1NDUxODU0NDk4OTk3Mjg5OTgwMzEyNDAwNDQwOTQ0NTU2NDgwNjU1NTI2MzYwMjUxMzMyMzc0MTk5Njg3NTIwNzgyNjc4MjY4OTE0OTc2ODA0NTEwNzYyMzczMDI1NjE3NjI2NzEzOTQ0MzQ4Nzc0NTgwODU4MzAxMzcwNDk5MzE4MTY0MTczNjQzMDk3NDI0MjYzNzcwNDA3NzEwNjUzNjA0NTAxNjc0ODk3NjM4NDUxMTM3NDE4ODc0Njg1NzMzNzEwMDYzOTU5NTM1NDQ2MTczMTg0MzI0MzIwODg3ODAyNjgzNjQ2NTI0MjY1MTA2MjQ0MjUxMDgxNjQ1Njk2NzEyNjA2NDcxOTQxMzE2NjQ5NTcyMjE0NDM0NjE1MzcxMDQ1OTM1MTQwMzY3Mjk0MzI5OTM0NjQ5ODcwNjA3MzU5MzE1NzM4MDU1OTYzMzAzNzIyNDIyNTgyNTQzODA3ODg1NzIwOTM1OTMyMzQ0NzgxOTE1MTY2OTcyMDI1MDg3MTc0NzYwMTYxNDkyNTg3MTQyOTIxMjA1MTU0MzYxOTkxNTYzNDE3MjI1ODY1OTc5ODY4NTAwNDUwMjMzNTE0MTQzMzA2ODM3NjM3ODQzODY0NjQ3NTQxNzc2NzE5NjAwOTU4OTEzNTU0MjM4MTI2NDg4MDE4MDQ2NzY0NzY3Nzc2MzY0MTA3MjU5MzM4MDA1ODc3NTgyOTAxNzQ1MDE0MzU1Mzk3MjQ2MDAzMjkwMDczNzU5MTY2MzcxNjAwODA1MzMwOTYxMzE4NzIyNDA1OTExNDUzNTM1MjM4MDAwOTMzMjEyMjYyOTY2OTgyNTM4NzA4ODM4NTcwMDYxOTQ3Nzc5NDU2ODI3MjI5NzUwMDcxMTU3NzkxOTQ5NzA2MjA4NjE5NjY2OTE4MDg4ODkwNTU3ODg5NzkwNTUyMTc0NzI3NjM1MTYxMjE1MjQ4MTk3NTU1ODgxODc2NTc3MTQ5NzE1MjU0MTU1MzQ4Nzg1NTY4NzAwMDUxODQ4ODU4OTA2NDMxNTI1ODIwMTM5MDA3OTQxNzU4NDgwNTY0MTY3Nzc2ODIxMTAzMTg0MDc4MDIyODY4MTI5NTU2MzI1ODQ4OTM3MDA1MDU1NiJ9fQ.106AgSKn5Snz3scY5aFl54KSJl5Dlya-OOdg00rJShc"
			}
		},
		// watch: {
		//     activeId: function(newVal, oldVal) {
		//      console.log('fdfd',newVal);
		//     },
		//   },
		mounted() {
			this.kehu();
			this.zizhi();
			console.log(11111)
		},
		methods: {

			//抽屉打开
			drawer() {
				this.$refs.drawer.open();
			},
			//抽屉关闭
			clox() {
				this.$refs.drawer.close();
			},
			//更多
			handleMore() {
				this.isMore = !this.isMore;
				this.isShow = !this.isShow;
				this.isSh = !this.isSh;
			},
			//收回
			handleShou() {
				
				this.isMore = false;
				this.isSh = false;
				this.isShow = true;
			},
			//拨打电话
			call_phone(item) {
				uni.makePhoneCall({
					phoneNumber: item.phone,
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
						this.call_phone(); //重复调用一次
					}
				});
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
							console.log('概况', res)
							this.tableList = res.data.data.data;
							this.linkmans = res.data.data.data.linkmans;
							console.log('联系人', this.linkmans)
						}
					},
					fail: (err) => {
						//console.log(err)
					}
				})
			},

			//资质
			zizhi() {
				uni.request({
					url: this.$burl + '/api/customers_quals',
					header: {
						'Authorization': this.token
					},
					data: {
						id: this.activeId
					},
					success: (res) => {
						if (res.data.data.status == 200) {
							console.log('资质', res)
							this.tableDatazi = res.data.data.data;
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
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.txtright {
		width: 60upx;
		height: 60upx;
		background-image: url(../../static/zj.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100%;
	}
	.tel-img {
		width: 46upx;
		height: 46upx;
		margin-left: 10upx;
	}

	.bottxt {
		width: 95%;
	}

	.contactus {
		width: 95%;
		border-bottom: none;
	}

	.contactus_top {
		line-height: 60upx;
		height: 60upx;
		flex-direction: row;
		display: flex;
		font-size: 24upx;
	}

	.contactus_top view {
		width: 30%;
		background: #f2f2f2;
		text-align: center;
		border: 1px #e4e4e4 solid;
		border-bottom: none;
		margin-left: -1px;

	}

	.contactus_top view:nth-child(2) {
		width: 40%;
	}

	.contactus_bottom {
		line-height:60upx;
		height: 60upx;
		flex-direction: row;
		display: flex;
		font-size: 24upx;
	}

	.contactus_bottom view {
		width: 30%;
		background: #f2f2f2;
		text-align: center;
		border: 1px #e4e4e4 solid;
		margin-left: -1px;
		margin-top: -1px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.contactus_bottom view:nth-child(2) {
		width: 40%;
	}

	.divtableleft {
		width: 100%;
		line-height: 60upx;
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
		line-height: 60upx;
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
		color: #4873c1;
		width: 100%;
		font-size: 24upx;
		line-height:80upx;
		text-align: right;
		height: 80upx;
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

	.anbtn {
		width: 95%;
		height: 70upx;
		line-height: 70upx;
	}

	.lanse {
		color: #4873c1;
	}

	.lanse a {
		color: #4873c1;
	}

	.wk_n {
		width: 96%;
		margin: 0 auto;
		height: 100%;
		display: flex;
		flex-direction: column;

	}

	.chou_tit {
		padding: 10px 10px 10px 30px;
		color: 666666;
		font-size: 28upx;
		background: url(../../static/bj.png) no-repeat left center;
		background-size: 50upx;
		height: 50upx;
		line-height: 50upx;
	}

	.anbtn {
		background: #4873c1;
		width: 30%;
	}

	.list-item {
		font-size: 28upx;
		color: #666666;
		margin-bottom: 25upx;
		padding: 3%;
		overflow: hidden;
		border: 1px #e4e4e4 solid;
		display: flex;
		border-radius: 5px;
		position: relative;
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
		flex-direction: row;
	}

	.list-itemleft {
		width: 60%;
		justify-content: center;
		display: flex;
		flex-direction: column;
	}

	.list-img {

		width: 35%;
		display: flex;
	}
</style>
