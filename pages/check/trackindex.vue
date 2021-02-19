<template>
	<view class="contentk">
		<view class="contentk_top">
			<view class="leftwz">申请人: </view>
			<view class="rightwz">{{dataList.adder}}</view>
			<view class="leftwz">归属体系:</view>
			<view class="rightwz">{{dataList.user_tx}}</view>
			<view class="leftwz">客户名称:</view>
			<view class="rightwz">{{dataList.company}}</view>
			<view class="leftwz">申请时间:</view>
			<view class="rightwz">{{dataList.addtime}}</view>
			<view class="leftwz">申请理由:</view>
			<view class="rightwz"> {{dataList.remark}}</view>
		</view>
		<view class="contentk_bottom">
			<button type="primary" class="btn" @click="cancel">拒绝</button>
			<button type="primary" class="btn" @click="confirm">同意</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				_id: "",
				dataList: [],
				token: this.$token
			}
		},
		onLoad(options) {
			this._id = options._id
			this.clueView(this._id)
		},
		methods: {
			clueView(_id) {
				uni.request({
					url: this.$burl + '/api/customer/audit/' + _id,
					header: {
						'Authorization': this.token
					},
					success: res => {
						if (res.data.data.status == 200) {
							this.dataList = res.data.data.data;
							console.log("list", this.dataList)
						}
					},
					fail: res => {

					}
				})

			},
			confirm() {
				uni.showModal({
					title: '提示信息',
					content: '您确定提交吗',
					success: res => {
						if (res.confirm) {
							uni.request({
								url: this.$burl + "/api/customer/audit/check/" + this.id,
								method: 'POST',
								data: {
									act: 0,
								},
								header: {
									'Authorization': this.token
								},
								success: res => {
									if (res.data.data.status == 200) {
										uni.navigateTo({
											url: "track"
										})
									}
								},
								fail: err => {}
							})
						} else if (res.cancel) {

						}
					}
				});
			},
			cancel() {
				uni.navigateTo({
					url: "./trackindexrefuse?id=" + this._id
				})
			}
		}
	}
</script>

<style scoped>
	.btn {
		width: 30%;
		height:70upx;
		line-height: 70upx;
		font-size: 24upx;
		background: #4873c1;
	}

	page {
		height: 100%;
	}

	.contentk {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.contentk_bottom {
		width: 95%;
		margin-top: 40upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.contentk_top {
		width: 95%;

		line-height: 60upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		font-size: 24upx;

		border-bottom: none;

	}

	.leftwz {
		width: 20%;
		padding-left: 2%;
		display: flex;
		justify-content: flex-start;

		font-size: 24upx;
	}

	.rightwz {
		width: 78%;

		display: flex;
	}
</style>
