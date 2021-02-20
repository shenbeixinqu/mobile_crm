<template>
<view class="contentk">
		<view class="contentk_top1">名额使用情况:</view>
		<view class="contentk_top">
			
			<view class="leftwz">申请人:</view><view class="rightwz">{{addname}}</view>
			<view class="leftwz">申请时间:</view><view class="rightwz">{{addtime}}</view>
			<view class="leftwz">客户名称:</view><view class="rightwz">{{name}}</view>
			<view class="leftwz">跟踪开始时间:</view><view class="rightwz">{{lastime_push}}</view>
			<view class="leftwz">到期时间:</view><view class="rightwz">{{endtime_push}}</view>
			<view class="leftwz">计划签单日期:</view><view class="rightwz">{{do_time}}</view>
			<view class="leftwz">延期天数:</view><view class="rightwz">{{delay_days}}天(自然日)</view>
			<view class="leftwz">延期原因:</view><view class="rightwz">{{reasons}}</view>	
		</view>
		<view class="contentk_bottom">
			<button type="primary" class="btn" @click="cancel">拒绝</button>
			<button type="primary" class="btn" @click="confirm">同意</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				_id:"",
				addname:"",
				addtime:"",
				name:"",
				lastime_push:"",
				endtime_push:"",
				do_time: "",
				delay_days:"",
				reasons:"",
				dataList:[],
				token:this.$token
			}
		},
		onLoad(options){
			const item = JSON.parse(decodeURIComponent(options.detail));
			this.addname = item.addname,
			this.addtime = item.addtime,
			this.lastime_push = item.lastime_push,
			this.name = item.name,
			this.endtime_push = item.endtime_push,
			this.do_time = item.do_time,
			this.delay_days = item.delay_days
			this.reasons = item.reasons,
			this._id = item._id
		},
		methods:{
			confirm(){
				uni.showModal({
					title: '提示信息',
					content: '您确定提交吗',
					success: res => {
						if(res.confirm){
							uni.request({
								url:this.$burl + "/api/customer/delay/deal",
								method:"POST",
								data:{
									id: this._id,
									status: "1",
									deal_reason: ""
								},
								header:{
									'Authorization': this.token
								},
								success: res => {
									if (res.data.data.status === 200){
										uni.navigateTo({
											url:"./cusdelay"
										})({
											delta:1
										})
									} else {
										uni.showModal({
											title:"提示",
											content:res.data.msg,
											showCancel:false,
											success:(res) => {
												if (res.confirm){
													uni.navigateTo({
														url:"./cusdelay"
													})
												}
											}
										})
									}
								},
								fail:err => {
									console.log("统一审核失败",err)
								}
							})
						}
					}
				})
			},
			cancel(){
				uni.navigateTo({
					url:"./delayindexrefuse?id=" + this._id
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
	.contentk_top1{width: 95%; font-weight: bold; font-size:30upx; line-height: 70upx;}
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
		width:30%;
		padding-left: 2%;
		display: flex;
		justify-content: flex-start;
	
		font-size: 24upx;
	}
	
	.rightwz {
		width:65%;
		display: flex;
	}
</style>
