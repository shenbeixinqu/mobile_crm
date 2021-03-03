<template>
	<view class="contentk">
		<view class="tit">服务人员</view>
		<view class="fuwutable">
			<view class="fuwutable_top">
				<view>职能</view>
				<view>姓名</view>
				<view>部门</view>
				<view>分机号码</view>
			</view>
			<view class="fuwutable_bot" v-for="item in tableList" :key="item.value">

				<view>{{item.de_name}}</view>
				<view>{{item.user_name}}</view>
				<view>{{item.post}}</view>
				<view>{{item.officeins}}</view>

			</view>
		</view>
		<foot-part @openLogin="openLogin"></foot-part>
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
				isShow: true,
				isMore: false,
				isSh: false,
				tableList: [],
				token: "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTM2NDU4ODEsImlhdCI6MTYxMzYwOTg4MSwiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6NTIsIm5hbWUiOiJcdTc2ZDhcdTUzZTRcdTZkNGJcdThiZDU1MiIsImV0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam8xTWl3aWFYTnpJam9pWlhKd0lpd2lhR1ZoWkdWeWN5STZleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjlMQ0psZUhBaU9qRTJNVE0yTXpnMU5UVXNJbWxoZENJNk1UWXhNell3T1RjMU5Td2lkWE5sY2w5dVlXMWxJam9pWEhVM05tUTRYSFUxTTJVMFhIVTJaRFJpWEhVNFltUTFOVElpZlEuWnZnWUZLbDhVMjNuUElwLUtKOVNLd3ZVQ25vMURkTVRKUUdnclRGbTZBayIsImNsb3VkX2lkIjoyLCJ1bl9pZCI6MiwidW5fbmFtZSI6Ilx1NmM4OFx1OTYzM1x1NzZkOFx1NTNlNCIsImRlX2lkIjoxMywiZGVfbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsImRlcGFydHR5cGUiOjEwLCJwb3N0X25hbWUiOiJcdTYwM2JcdTc2ZDEiLCJsZXZlbCI6NzcsInN1cGVyX2lkIjoxNywia2EiOjAsImlwIjoiMTcyLjE4LjMuMTI5IiwibGFzdHRpbWUiOjE2MTM2MDk4NzksInBvc3RzIjpbeyJpZCI6MCwiZG5hbWUiOiJcdTU5MjdcdTVlMDJcdTU3M2FcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn0seyJpZCI6MSwiZG5hbWUiOiJcdTU5MjdcdTViOWVcdTY1YmRcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn1dLCJwb3dlcnMiOiIxNzQyODgxNzk4NjEwOTg3NDE4ODU3NzI3NzM2Nzk5MTU2MTk5NDg4Mzk5Mzk3MDI3NTQwODk1NzQ2OTgxNzc0Mjk2NTg3NDM1OTI3NzE3MDA4Njc1NDUxODU0NDk4OTk3Mjg5OTgwMzEyNDAwNDQwOTQ0NTU2NDgwNjU1NTI2MzYwMjUxMzMyMzc0MTk5Njg3NTIwNzgyNjc4MjY4OTE0OTc2ODA0NTEwNzYyMzczMDI1NjE3NjI2NzEzOTQ0MzQ4Nzc0NTgwODU4MzAxMzcwNDk5MzE4MTY0MTczNjQzMDk3NDI0MjYzNzcwNDA3NzEwNjUzNjA0NTAxNjc0ODk3NjM4NDUxMTM3NDE4ODc0Njg1NzMzNzEwMDYzOTU5NTM1NDQ2MTczMTg0MzI0MzIwODg3ODAyNjgzNjQ2NTI0MjY1MTA2MjQ0MjUxMDgxNjQ1Njk2NzEyNjA2NDcxOTQxMzE2NjQ5NTcyMjE0NDM0NjE1MzcxMDQ1OTM1MTQwMzY3Mjk0MzI5OTM0NjQ5ODcwNjA3MzU5MzE1NzM4MDU1OTYzMzAzNzIyNDIyNTgyNTQzODA3ODg1NzIwOTM1OTMyMzQ0NzgxOTE1MTY2OTcyMDI1MDg3MTc0NzYwMTYxNDkyNTg3MTQyOTIxMjA1MTU0MzYxOTkxNTYzNDE3MjI1ODY1OTc5ODY4NTAwNDUwMjMzNTE0MTQzMzA2ODM3NjM3ODQzODY0NjQ3NTQxNzc2NzE5NjAwOTU4OTEzNTU0MjM4MTI2NDg4MDE4MDQ2NzY0NzY3Nzc2MzY0MTA3MjU5MzM4MDA1ODc3NTgyOTAxNzQ1MDE0MzU1Mzk3MjQ2MDAzMjkwMDczNzU5MTY2MzcxNjAwODA1MzMwOTYxMzE4NzIyNDA1OTExNDUzNTM1MjM4MDAwOTMzMjEyMjYyOTY2OTgyNTM4NzA4ODM4NTcwMDYxOTQ3Nzc5NDU2ODI3MjI5NzUwMDcxMTU3NzkxOTQ5NzA2MjA4NjE5NjY2OTE4MDg4ODkwNTU3ODg5NzkwNTUyMTc0NzI3NjM1MTYxMjE1MjQ4MTk3NTU1ODgxODc2NTc3MTQ5NzE1MjU0MTU1MzQ4Nzg1NTY4NzAwMDUxODQ4ODU4OTA2NDMxNTI1ODIwMTM5MDA3OTQxNzU4NDgwNTY0MTY3Nzc2ODIxMTAzMTg0MDc4MDIyODY4MTI5NTU2MzI1ODQ4OTM3MDA1MDU1NiJ9fQ.106AgSKn5Snz3scY5aFl54KSJl5Dlya-OOdg00rJShc"
			}
		},
		// watch: {
		//     activeId: function(newVal, oldVal) {
		//      console.log('fdfd',newVal);
		//     },
		//   },
		mounted() {
			this.fuwu();
			console.log(11111)
		},
		methods: {

			//客户概况接口
			fuwu() {
				uni.request({
					url: this.$burl + '/api/customer/assistant',
					header: {
					'Authorization': this.$token
					},
					data: {
						id: this.activeId
					},
					success: (res) => {
						console.log(res);
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

	.fuwutable {
		width: 95%;

		display: flex;
		flex-wrap: wrap;
		font-size: 24upx;

		border-bottom: none;

	}

	.fuwutable_top {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		line-height: 70upx;
		align-items: center;
		justify-content: center;
	}

	.fuwutable_top view {
		width: 24%;
		font-size: 24upx;
		display: flex;
		align-items: center;
		border: 1px #e4e4e4 solid;
		margin-top: -1px;
		margin-left: -1px;
		justify-content: center;
		background: #f2f2f2;
	}

	.fuwutable_bot {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		line-height: 70upx;
		align-items: center;
		justify-content: center;
	}

	.fuwutable_bot view {
		line-height: 70upx;
		height: 70upx;
		width: 24%;
		font-size: 24upx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: -1px;
		margin-left: -1px;
		border: 1px #e4e4e4 solid;
		background: #f2f2f2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

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
</style>
