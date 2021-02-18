<template>
	<view class="contentk">
		<view class="topview">
			<button type="primary" class="search-btn" @click="getList('search')"></button>
			<input class="se-input" name="nickname" placeholder="请输入客户名称" v-model="kword" />
		
				<picker class="zt" v-model="flag" @change="flagChange" :value="flag" :range="flagArray" range-key="name">
					<view v-if="flagArray[flag]">{{flagArray[flag].name}}</view>
					<view v-else>请选择状态</view>
				</picker>
			
		</view>
		<view class="content">
			<z-paging ref="paging" @query="queryList" :list.sync="dataList" style="height: calc(100% - 80rpx);">
				<empty-view slot="empty"></empty-view>
				<view>
					<view class="list-item" v-for="(item,index) in dataList" :key="index">
						<view class="list-text">
							<view class="list_tit">{{item.name}}</view>
							<view class="list_track">{{item.check_status}}</view>
						</view>
						<view class="list-item-top">
							<view class="list-dqk">
								<view class="list-dq1">申请人: {{item.addname}}</view>
								<view class="list-dq1">线索到期时间: {{item.endtime_push | dataToYmd}}</view>
							</view>
							<view class="list-dqk">
								<view class="list-dq1">申请延长时间: {{item.delay_days}}天</view>
								<view class="list-dq1">预计签单时间: {{item.do_time | dataToYmd}}</view>
							</view>
							<view class="list-dqk">
								<view class="list-dq1">申请原因: {{item.reasons}}</view>
							</view>
							<view>
								<span @click="delayReview(item)">审核</span>
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
		data() {
			return {
				dataList: [],
				flagArray: [{
						name: "待审核",
						value: "1"
					},
					{
						name: "通过",
						value: "2"
					},
					{
						name: "拒绝",
						value: "3"
					}
				],
				kword: "",
				flag: "",
				token:this.$token
			}
		},
		onLoad(options) {
			this.getList()
		},
		filters: {
			dataToYmd(value) {
				return value.split(" ")[0]
			}
		},
		methods: {
			queryList(pageNo, pageSize) {
				uni.request({
					url: this.$burl + "/api/customer/delay/list",
					header: {
						'Authorization': this.token
					},
					data: {
						limit: pageSize,
						pn: pageNo,
					},
					success: (res) => {
						console.log("res", res)
						this.$refs.paging.addData(res.data.data.query);
					},
					fail: (err) => {

					}
				})
			},
			getList(type) {
				uni.showLoading();
				uni.request({
					url: this.$burl + "/api/customer/delay/list",
					header: {
						'Authorization': this.token
					},
					data: {
						keyword: this.kword,
						kstatus: this.flag
					},
					success: (res) => {
						uni.hideLoading();
						if (res.data.data.status === 200) {
							this.dataList = res.data.data.query;
							if (this.dataList.length == 0) {
								uni.hideLoading()
							} else {

							}
							setTimeout(function() {
								uni.hideLoading();
							}, 1000)
						}
					},
					fail: (err) => {

					}
				})
			},
			flagChange(e) {
				this.flag = e.detail.value
			},
			delayReview(item) {
				console.log("item",item)
				let detail = {
					_id: item.cid,
					addname: item.addname,
					addtime: item.addtime,
					name: item.name,
					lastime_push: item.lastime_push,
					endtime_push: item.endtime_push,
					do_time: item.do_time,
					delay_days: item.delay_days,
					reasons: item.reasons
				}
				uni.navigateTo({
					url: "./delayindex?detail=" + encodeURIComponent(JSON.stringify(detail)) ,
				})
			}

		}
	}
</script>

<style>
	page {
		height: 100%;
	}

	.list-dq1 {
		display: flex;
		width: 50%;
		text-align: left;
		padding-top: 1upx;
		padding-bottom: 1upx;
	}

	.list-dqk {
		flex-direction: row;
		width: 100%;
		text-align: left;
		padding-top: 1upx;
		padding-bottom: 1upx;
		display: flex;
	}

	.zt {
		height: 60rpx;
		line-height: 60rpx;
		width: 30%;
		color: grey;
		font-size: 22upx;
		border: 1px #e4e4e4 solid;
		border-radius: 5px;
		text-indent: 0.5rem;
		background-image: url(../../static/jta.png);
		background-repeat: no-repeat;
		background-size: 15%;
		background-position: 95% center;
	}

	.contentk {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		align-items: center;
		margin-top: 50upx;
	}

	.content {
		width: 96%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.list-item {
		flex-direction: column;
		color: #666666;
		margin-bottom: 25upx;
		padding: 3%;
		overflow: hidden;
		border: 1px #e4e4e4 solid;
		display: flex;
		border-radius: 5px;
		align-items: center;
		justify-content: center;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;
	}

	.list-item-top {
		font-size: 24upx;
		width: 100%;
		margin-top: 10upx;
	}


	.list-text {
		width: 100%;
		text-align: left;
		font-size: 30upx;
		display: flex;
		align-items: center;
		height: 70upx;
		line-height: 70upx;
		justify-content: space-between;
	}

	.list_tit {
		display: flex;
	}

	.list-xq {
		width: 100%;
	}

	.se-input {
		width: 65%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 22upx;
		text-indent: 1rem;
		border: 1px #e4e4e4 solid;
		border-radius: 10upx;
	}

	.search-btn {
		z-index: 500;
		height: 60rpx;
		width: 60rpx;
		background: url(../../static/ss.png) no-repeat #4873c1;
		background-size: 70%;
		background-position: center;
		position: absolute;
		left: 425rpx;
	}

	.shai-btn {
		width: 15%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 22upx;
		color: #fff;
	}

	.topview {
		width: 96%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
