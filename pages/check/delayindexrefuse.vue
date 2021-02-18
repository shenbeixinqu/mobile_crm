<template>
	<view>
		<view>拒绝原因</view>
		<view class="uni-textarea">
			<textarea class="se-input" @blur="bindTextAreaBlur" auto-height />
		</view>
		<view>
			<button type="primary" class="btn" @click="back">返回</button>
			<button type="primary" class="btn" @click="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:"",
				reason:""
			}
		},
		onLoad(options) {
			this.id = options.id
			console.log("ops",options)
		},
		methods:{
			bindTextAreaBlur:function(e){
				this.reason = e.detail.value
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			submit(){
				uni.showModal({
					title:"提示信息",
					content:"您确定提交吗",
					success:res => {
						if(res.confirm){
							uni.request({
								url:this.$burl + "/api/customer/delay/deal",
								method:"POST",
								data:{
									id:this.id,
									status:"2",
									deal_reason:this.reason
								},
								header:{
									'Authorization': this.$token
								},
								succcess: res => {
									if(res.data.data.status === 200){
										uni.navigateBack({
											delta:1
										})
									}

								},
								fail: err => {
									console.log("err",err)
								}
							})
						} else if (res.cancel){
							
						}
					}
				})
			}
		}
	}
</script>

<style>
</style>
