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
	export default {
	    data() {
	        return {
				remark:"",
				id:"",
			}
	    },
		onLoad(options){
			this.id = options.id
			console.log("url",this.$burl)
			console.log("id",this.id)
		},
	    methods: {
	        bindTextAreaBlur: function (e) {
				this.remark = e.detail.value
	        },
			back(){
				uni.navigateTo({
					url:"./track"
				})
			},
			submit(){
				uni.showModal({
					title: '提示信息',
					content: '您确定提交吗',
					success: res => {
						if (res.confirm) {
							uni.request({
								url: this.$burl + "/api/customer/audit/check/" + this.id,
								method:'POST',
								data:{
									act:1,
									ckremark:this.remark
								},
								header:{
									'Authorization': this.$token
								},
								success: res => {
									if(res.data.data.status == 200){
										uni.navigateTo({
											url:"./track"
										})
									}
								},
								fail: err => {
								}
							})
						} else if (res.cancel) {
							
						}
					}
				});
			}
	    }
	}
</script>

<style>
	.btn {
		width: 40%;
	}
	.se-input {
		width: 90%;
		height: 180rpx;
		line-height: 60rpx;
		font-size: 22upx;
		text-indent: 1rem;
		border: 1px #e4e4e4 solid;
		border-radius: 10upx;
	}
</style>
