<template>
<view class="contentk">
	<!-- <view class="contentk_top1">名额使用情况:</view> -->
		<view class="contentk_top">
			<view class="leftwz">名额使用情况:</view><view class="rightwz">本年度申请延期客户{{ dataList.sq_cnt }}个，其中已处理通过{{dataList.tg_cnt}}个，还剩{{ dataList.ksq_cnt }}个可延期名额！</view>
			<view class="leftwz">申请人:</view><view class="rightwz">{{dataList.addname}}</view>
			<view class="leftwz">申请时间:</view><view class="rightwz">{{dataList.addtime}}</view>
			<view class="leftwz">客户名称:</view><view class="rightwz">{{dataList.name}}</view>
			<view class="leftwz">跟踪开始时间:</view><view class="rightwz">{{dataList.lastime_push}}</view>
			<view class="leftwz">到期时间:</view><view class="rightwz">{{dataList.endtime_push}}</view>
			<view class="leftwz">计划签单日期:</view><view class="rightwz">{{dataList.do_time}}</view>
			<view class="leftwz">延期天数:</view><view class="rightwz">{{dataList.delay_days}}天(自然日)</view>
			<view class="leftwz">延期原因:</view><view class="rightwz">{{dataList.reasons}}</view>	
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				_id:"",
				dataList:[],
				cTotal: 0,
			    cTotal_on: 0,
			    cTotal_num: 0
			}
		},
		onLoad(options){
			console.log("options",options)
			this._id = options._id
			this.delayDetail(this._id)
		},
		methods:{
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
						console.log("res",res)
						if (res.data.data.status == 200){
							this.dataList = res.data.data
							console.log("dataList",this.dataList)
						}
					},
					fail: err => {
						console.log("err",err)
					}
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
