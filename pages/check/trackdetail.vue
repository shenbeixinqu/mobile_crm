<template>
	<view class="contentk">
		<view class="contentk_top">
			<view class="leftwz">申请人：</view>
			<view class="rightwz">{{dataList.adder}}</view>
			<view class="leftwz">归属体系：</view>
			<view class="rightwz">{{dataList.user_tx}}</view>
			<view class="leftwz">客户名称：</view>
			<view class="rightwz">{{dataList.company}}</view>
			<view class="leftwz">申请时间：</view>
			<view class="rightwz">{{dataList.addtime}}</view>
			<view class="leftwz">申请理由：</view>
			<view class="rightwz"> {{dataList.remark}}</view>
			<view class="leftwz">审核记录：</view>
			<view  class="rightwz1" v-for="(q,index) in cklogs" :key="index">
				<view>【{{ q.department }}】{{ q.realname }}于[{{ q.dt }}]，{{ q.result }}，{{ q.remark }}</view>
			</view>
		</view>
		<view class="contentk_bottom"><button type="primary" class="btn2" @click="closeDetail">关闭</button></view>
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
			closeDetail(){
				uni.navigateTo({
					url:"./track"
				})
			},
			clueView(_id) {
				uni.request({
					url: this.$burl + '/api/customer/audit/' + _id,
					header: {
						'Authorization': "JWT " + getApp().globalData.token
					},
					success: res => {
						if (res.data.data.status == 200) {
							this.dataList = res.data.data.data;
							this.cklogs = res.data.data.data.cklogs
						} else {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
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
		flex-direction: column;
		align-items: center;
		font-size: 24upx;
		border-bottom: none;
		margin-bottom: 100upx;
	}
	
	.leftwz {
		width:95%;
	    color: #666666;
		display: flex;
		justify-content: flex-start;
		font-size:26upx;
		padding-top:10upx;
	}
	
	.rightwz {
		width:95%;
		padding-bottom: 10upx;
		height:60upx;
		display: flex;
		color: #000;
		font-size:34upx;
		border-bottom: 1px #e5e5e5 solid;
	}
	
	.rightwz1 {
		width:95%;
		padding-bottom: 10upx;
		
		display: flex;
		color: #000;
		font-size:34upx;
		border-bottom: 1px #e5e5e5 solid;
	}
	.btn1:after{border-radius: 0;}
	
	.contentk_bottom {
	width: 100%;
	left:0;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.btn2 {
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		background: #4873c1;
		border-radius: 0;
		bottom: 0;
		color: #fff;
	}
</style>
