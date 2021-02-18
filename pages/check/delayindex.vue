<template>
	<view>
		<view>
			<view>名额使用情况:</view>
			<view>申请人:{{addname}}</view>
			<view>申请时间:{{addtime}}</view>
			<view>客户名称:{{name}}</view>
			<view>跟踪开始时间:{{lastime_push}}</view>
			<view>到期时间:{{endtime_push}}</view>
			<view>计划签单日期:{{do_time}}</view>
			<view>延期天数:{{delay_days}}天(自然日)</view>
			<view>延期原因:{{reasons}}</view>	
		</view>
		<view>
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
										uni.navigateBack({
											delta:1
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

<style>
</style>
