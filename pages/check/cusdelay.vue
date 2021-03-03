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
								<view class="list-dq1">申请人：</view>
								<view class="list-dq2">{{item.addname}}</view>
								<view class="list-dq1">线索到期时间:</view>
								<view class="list-dq2">{{item.endtime_push | dataToYmd}}</view>
								<view class="list-dq1">申请延长时间:</view>
								<view class="list-dq2">{{item.delay_days}}天</view>
								<view class="list-dq1">预计签单时间:</view>
								<view class="list-dq2"> {{item.do_time | dataToYmd}}</view>
								<view class="list-dq1">申请原因:</view>
								<view class="list-dq2"> {{item.reasons}}</view>
							</view>
							
							
							
							<view class="list-item-bot">
								<span v-if="item.check_status=='待审核'" @click="delayReview(item)">审核</span>
								<span v-else @click="delayDetail(item)">查看</span>
							</view>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
			<foot-part @openLogin="openLogin"></foot-part>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
				flagArray: [
					{
						name:"全部",
						value: ""
					},
					{
						name: "待审核",
						value: "0"
					},
					{
						name: "通过",
						value: "1"
					},
					{
						name: "拒绝",
						value: "2"
					}
				],
				kword: "",
				flag: "",
				flag_val:"",
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
						'Authorization': this.$token
					},
					data: {
						limit: pageSize,
						pn: pageNo,
						keyword: this.kword,
						kstatus: this.flag_val
					},
					success: (res) => {
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
						'Authorization': this.$token
					},
					data: {
						keyword: this.kword,
						kstatus: this.flag_val
					},
					success: (res) => {
						uni.hideLoading();
						if (res.data.data.status === 200) {
							this.dataList = res.data.data.query;
							console.log("dataList",this.dataList)
							setTimeout(function() {
								uni.hideLoading();
							}, 1000)
						} else {
							uni.showModal({
								title:"提示",
								content:res.data.msg
							})
						}
					},
					fail: (err) => {
						uni.showModal({
							title:"提示",
							content:err
						})
					}
				})
			},
			flagChange(e) {
				this.flag = e.detail.value,
				this.flag_val = this.flagArray[this.flag].value,
				this.getList()
			},
			delayReview(item) {
				uni.navigateTo({
					url: "./delayindex?id=" + item._id
				})
			},
			delayDetail(item) {
				uni.navigateTo({
					url: "./delaydetail?_id=" + item._id ,
				})
			}

		}
	}
</script>

<style>
	page {
		height: 100%;
	}

/deep/.uni-input-input{ font-size: 28upx;}
/deep/.uni-input-placeholder{font-size: 28upx;color: #ccc;background:#fafafa;}

	.list-dqk {
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
		text-align: left;
		padding-top: 5upx;
		padding-bottom: 5upx;
		display: flex;
	}

	.list-dq1 {
		display: flex;
		width: 35%;
		padding-top: 5upx;
		padding-bottom: 5upx;
		font-size: 28upx;
	}

	.list-dq2 {
		display: flex;
		width:65%;
		font-size: 28upx;
		text-align: left;
		padding-top: 1upx;
		padding-bottom: 1upx;
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
	
	.list-item-bot {
		width: 100%;
		display: flex;
		margin-top: 15upx;
		justify-content: flex-end;
		color: #4873c1;
		font-size: 28upx;
	}

	.list-item-top {
		font-size: 24upx;
		width: 100%;
		margin-top: 10upx;
	}


	.list-text {
		width: 100%;
		text-align: left;
		font-size: 32upx;
		display: flex;
		align-items: center;
		height: 70upx;
		line-height: 70upx;
		justify-content: space-between;
		color: #333333;
	}
	.list_track{ color:#666666;}

	.list_tit {
		display: flex;
		color: #333;
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
		background: url(../../static/ss.png) no-repeat;
		background-size: 70%;
		background-position: center;
		position: absolute;
		left: 425rpx;
		border: none;
	}

	.search-btn:after {
		border: none;
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
