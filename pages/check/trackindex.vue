<template>
	<view>
		<view>
			<view>申请人: {{dataList.adder}}</view>
			<view>归属体系:{{dataList.user_tx}}</view>
			<view>客户名称:{{dataList.company}}</view>
			<view>申请时间:{{dataList.addtime}}</view>
			<view>申请理由:{{dataList.remark}}</view>
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
			return {
				_id:"",
				dataList:[],
				token:this.$token
			}
		},
		onLoad(options){
			this._id = options._id
			this.clueView(this._id)
		},
		methods:{
			clueView(_id){
				uni.request({
					url:this.$burl + '/api/customer/audit/' + _id,
					header:{
						'Authorization': this.token
					},
					success: res => {
						if(res.data.data.status == 200){
							this.dataList = res.data.data.data;
							console.log("list",this.dataList)
						}
					},
					fail: res => {
						
					}
				})
				
			},
			confirm(){
				uni.showModal({
					title: '提示信息',
					content: '您确定提交吗',
					success: res => {
						if (res.confirm) {
							uni.request({
								url:this.$burl + "/api/customer/audit/check/" + this.id,
								method:'POST',
								data:{
									act:0,
								},
								header:{
									'Authorization': this.token
								},
								success: res => {
									if(res.data.data.status == 200){
										uni.navigateTo({
											url:"track"
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
			},
			cancel(){
				uni.navigateTo({
					url:"./trackindexrefuse?id=" + this._id
				})
			}
		}
	}
</script>

<style>
	.btn {
		width: 40%;
	}
</style>
