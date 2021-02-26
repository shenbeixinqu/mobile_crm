<template>
<view class="contentk">
		<e-modal :visible.sync="visible">
			<view class="uni-padding-wrap">
				<form @submit="formSubmit">
					<view class="uni-form-item">
						<view class="title">拒绝原因</view>
						<input class="uni-input" v-model="reason" name="refuseReason" placeholder="请输入拒绝原因" >
					</view>
					<view class="uni-btn-v">
						 
					</view>
				</form>
			</view>
		</e-modal>
		<view class="contentk_top">
			<view class="leftwz">申请人:</view><view class="rightwz">{{dataList.addname}}</view>
			<view class="leftwz">申请时间:</view><view class="rightwz">{{dataList.addtime}}</view>
			<view class="leftwz">客户名称:</view><view class="rightwz">{{dataList.name}}</view>
			<view class="leftwz">跟踪开始时间:</view><view class="rightwz">{{dataList.lastime_push}}</view>
			<view class="leftwz">到期时间:</view><view class="rightwz">{{dataList.endtime_push}}</view>
			<view class="leftwz">计划签单日期:</view><view class="rightwz">{{dataList.do_time}}</view>
			<view class="leftwz">延期天数:</view><view class="rightwz">{{dataList.delay_days}}天(自然日)</view>
			<view class="leftwz">延期原因:</view><view class="rightwz">{{dataList.reasons}}</view>	
			<view class="leftwz">名额使用情况:</view><view class="rightwz">本年度申请延期客户{{ dataList.sq_cnt }}个，其中已处理通过{{dataList.tg_cnt}}个，还剩{{ dataList.ksq_cnt }}个可延期名额！</view>
		</view>
		<view class="bottombtn">
			<button type="primary" class="btn btn1" @click="cancel">拒绝</button>
			<button type="primary" class="btn "@click="confirm">同意</button>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../utils/graceChecker.js")
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
				reasons:"", // 延期原因
				reason:"", // 拒绝原因
				dataList:[],
				visible:false,
				token:this.$token
			}
		},
		onLoad(options){
			this._id = options.id 
			this.delayDetail(this._id)
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
									deal_reason: this.reason
								},
								header:{
									'Authorization': this.token
								},
								success: res => {
									if (res.data.data.status === 200){
										uni.navigateTo({
											url:"./cusdelay"
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
				// uni.navigateTo({
				// 	url:"./delayindexrefuse?id=" + this._id
				// })
				this.visible = true
				
			},
			qx(){
				this.visible = false
			},
			formSubmit:function(e){
				var rule = [{
					name:"refuseReason",
					checkType:"null",
					checkRule:"",
					errorMsg:"拒绝原因不能为空"
				}];
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes){
					uni.request({
						url:this.$burl + "/api/customer/delay/deal",
						method:"POST",
						data:{
							id:this._id,
							status:"2",
							deal_reason:this.reason
						},
						header:{
							'Authorization': this.$token
						},
						success: res => {
							console.log("res",res)
							if(res.data.data.status === 200){
								this.visible = false
								uni.navigateTo({
									url:"./cusdelay"
								})
							} else {
								console.log("已经处理过了")
								uni.showModal({
									title:"提示",
									content:res.data.msg
								})
							}
					
						},
						fail: err => {
							uni.showModal({
								title:"提示",
								content:err
							})
						}
					})
				} else {
					uni.showModal({
						title:graceChecker.error,
						icon:"none"
					})
				}
				
			},
			delayDetail(_id){
				uni.request({
					url: this.$burl + "/api/customer/delay/deal",
					header: {
						'Authorization': this.$token
					},
					data:{
						id:_id,
						act:"info"
					},
					success: (res) => {
						if (res.data.data.status == 200){
							this.dataList = res.data.data
							console.log("dataList",this.dataList)
						} else {
							uni.showModal({
								title:"提示",
								content:res.data.msg
							})
						}
					},
					fail: err => {
						uni.showModal({
							title:"提示",
							content:err
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.bottombtn {
		width: 100%;
		
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.btn {
		width: 50%;
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		background: #4873c1;
		border-radius: 0;
		bottom: 0;
		color: #fff;
	}

	.btn1 {
		background: #d7e8fc;
		color: #316fd4;
	}
	.uni-input {
		height:300rpx;
		width: 93%;
		margin-top: 20upx;
		line-height:10upx;
		padding: 15rpx 25rpx;
		line-height: 50rpx;
		font-size: 28rpx;
		background: #FFF;
		flex: 1;
		border: 1px #ddd solid;
		border-radius: 10upx;
		color: grey;
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
		width:1%;
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
		font-size: 28upx;
	}
	
	.rightwz {
		width:65%;
		display: flex;
			font-size: 28upx;
	}
	
	.uni-btn-v {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding-top: 30upx;
		padding-bottom: 30upx;
	}
	
	.uni-form-item {
		display: flex;
		width: 100%;
		height: 100px;
		padding: 10rpx 0;
		flex-direction: column;
	}
	
	.uni-padding-wrap {
		width: 90%;
		padding-top: 20upx;
		padding-bottom: 20upx;
	}
</style>
