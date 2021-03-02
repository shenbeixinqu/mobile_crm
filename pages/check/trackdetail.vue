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
			<view class="leftwz">审核记录:</view>
			<view v-for="(q,index) in cklogs" :key="index">
				<view>【{{ q.department }}】{{ q.realname }}于[{{ q.dt }}]，{{ q.result }}，{{ q.remark }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				_id: "",
				dataList: [],
				cklogs: []
			}
		},
		onLoad(options){
			this._id = options._id
			this.clueView(this._id)
		},
		methods:{
			clueView(_id) {
				uni.request({
					url: this.$burl + '/api/customer/audit/' + _id,
					header: {
						'Authorization': this.$token
					},
					success: res => {
						if (res.data.data.status == 200) {
							this.dataList = res.data.data.data;
							this.cklogs = res.data.data.data.cklogs
						}
					},
					fail: res => {
			
					}
				})
			
			}
		}
	}
</script>

<style>
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
	
	.contentk_top {
		width: 95%;
		line-height: 60upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		font-size: 30upx;
		border-bottom: none;
	}
	.btn1:after{border-radius: 0;}
	.leftwz {
		width: 20%;
		padding-left: 2%;
		display: flex;
		justify-content: flex-start;
		font-size: 30upx;
	}
	
	.rightwz {
		width: 78%;
		display: flex;
	}
</style>
