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
						<button form-type="submit" class="btn">提交</button>
						<button class="btn" @click="qx">取消</button>
					</view>
				</form>
			</view>
		</e-modal>
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
			<view class="leftwz" v-if="dataList.audit_status == '层审中'">审核记录:</view>
			<view v-for="(q,index) in cklogs" :key="index">
				<view>【{{ q.department }}】{{ q.realname }}于[{{ q.dt }}]，{{ q.result }}，{{ q.remark }}</view>
			</view>
		</view>
		<view class="contentk_bottom">
			<button type="primary" class="btn" @click="cancel">拒绝</button>
			<button type="primary" class="btn" @click="confirm">同意</button>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../utils/graceChecker.js")
	export default {
		data() {
			return {
				_id: "",
				dataList: [],
				cklogs: [],
				visible:false,
				reason:""
			}
		},
		onLoad(options) {
			this._id = options._id
			this.clueView(this._id)
		},
		methods: {
			clueView(_id) {
				uni.request({
					url: this.$burl + '/api/customer/audit/' + _id,
					header: {
						'Authorization': this.$token
					},
					success: res => {
						console.log("Res4",res)
						if (res.data.data.status == 200) {
							this.dataList = res.data.data.data;
							this.cklogs = res.data.data.data.cklogs
						} else {
							uni.showModal({
								title:"提示",
								content:res.data.msg
							})
						}
					},
					fail: res => {

					}
				})

			},
			confirm() {
				uni.showModal({
					title: '提示信息',
					content: '您确定提交吗',
					success: res => {
						if (res.confirm) {
							uni.request({
								url: this.$burl + "/api/customer/audit/check/" + this._id,
								method: 'POST',
								data: {
									act: 0,
								},
								header: {
									'Authorization': this.$token
								},
								success: res => {
									if (res.data.data.status == 200) {
										uni.navigateTo({
											url: "./track"
										})
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
						} else if (res.cancel) {

						}
					}
				});
			},
			cancel() {
				// uni.navigateTo({
				// 	url: "./trackindexrefuse?id=" + this._id
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
				var formData =  e.detail.value;
				var checkRes = graceChecker.check(formData,rule);
				if (checkRes){
					uni.request({
						url: this.$burl + "/api/customer/audit/check/" + this._id,
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
				} else {
					uni.showModal({
						title:graceChecker.error,
						icon: "none"
					})
				}
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
		width: 20%;
		padding-left: 2%;
		display: flex;
		justify-content: flex-start;

		font-size: 24upx;
	}

	.rightwz {
		width: 78%;

		display: flex;
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
