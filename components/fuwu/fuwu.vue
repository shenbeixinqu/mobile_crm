<template>
	<view class="contentk"  >
		<view class="tit">服务人员</view>


	<scroll-view scroll-y  style="width: 100%; margin-bottom: 100upx; height:80%; margin: 0 auto;">
		<view class="contentk_top" v-for="item in tableList" :key="item.value">
			<view class="leftwz">姓名:</view>
			<view class="rightwz">{{item.user_name}}</view>
			<view class="leftwz">职能:</view>
			<view class="rightwz">{{item.post}}</view>
			<view class="leftwz">部门:</view>
			<view class="rightwz">{{item.de_name}}</view>

			<view class="leftwz">分机号码:</view>
			<view class="rightwz" style=" border-bottom: 0;">{{item.officeins}}</view>

		</view>
</scroll-view>
	
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
			}
		},
		mounted() {
			this.fuwu();
		},
		methods: {

			//客户概况接口
			fuwu() {
				uni.request({
					url: this.$burl + '/api/customer/assistant',
					header: {
						'Authorization': "JWT " + getApp().globalData.token
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

	.contentk_top {
		margin: 0 auto;
		width: 95%;
		line-height: 60upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 24upx;
		border-bottom: 10px #e5e5e5 solid;
	}

	.leftwz {
		width: 95%;
		color: #666666;
		display: flex;
		justify-content: flex-start;
		font-size: 26upx;
		padding-top: 10upx;
	}

	.rightwz {
		width: 95%;
		padding-bottom: 10upx;
		height: 60upx;
		display: flex;
		color: #000;
		font-size: 34upx;
		border-bottom: 1px #e5e5e5 solid;
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
		line-height: 80upx;

		align-items: center;
		justify-content: center;
	}

	.fuwutable_top view {
		width: 24%;
		font-size: 30upx;
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
		line-height: 80upx;
		height: 80upx;
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
