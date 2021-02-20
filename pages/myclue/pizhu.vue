<template>
	<view class="contentk">
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title"><text class="red">*</text>请填写批注</view>
					<textarea class="uni-input" @blur="bindTextAreaBlur" name="remark" placeholder="请填写批注" :vlaue="remark" />

					</view>



				<view class="uni-btn-v">
					<button form-type="submit" class="btn">提交</button>
					<button class="btn" @click="qx">返回</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js")
	export default {
		data() {
			return {
remark:'',
id:''
			}

		},
		onLoad: function(option) {		
			this.id = option.id;		
		},
		mounted() {
			
		},
		methods: {
			// 返回列表页
			qx() {
				uni.navigateTo({
					url: './myclue'
				})
			},
             bindTextAreaBlur: function (e) {
             this.remark=e.detail.value
			  console.log('this.remark',this.remark)
			 },

			//表单
			formSubmit: function(e) {
				//定义表单规则
				var rule = [{
					name: "remark",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "请输入批注内容",
				}];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
					uni.request({
						url: this.$burl + '/api/customer/newremark',
						header: {
							'Authorization': this.$token
						},
						method: "POST",
						data: {
							id: this.id,
							ltype: 8,
							event: 1,
							remark: this.remark,

						},
						success: (res) => {
							if (res.data.data.status == 200) {
								uni.navigateTo({
									url: './myclue'
								})
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								});
								
							
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								});
							
							}




						},
						fail: (err) => {
							//console.log(err)
						}
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			//日期

			//出访洽谈业务

		},
	}
</script>

<style>
	.red {
		color: #f00;
		padding-right: 10upx;
	}

	.uni-btn-v {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding-top: 30upx;
		padding-bottom: 30upx;
	}

	.btn {
		color: #fff;
		width: 30%;
		height: 70upx;
		line-height: 70upx;
		font-size: 24upx;
		background: #4873c1;
	}

	.contentk {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* 表单 */
	.uni-padding-wrap {
		width: 90%;
		padding-top: 20upx;
		padding-bottom: 20upx;

	}

	.uni-form-item {
		display: flex;
		width: 100%;
		padding: 10rpx 0;
		flex-direction: column;
	}

	.uni-form-item .title {
		padding: 10rpx 0;
	}

	.uni-label {
		width: 210rpx;
		word-wrap: break-word;
		word-break: break-all;
		text-indent: 20rpx;
	}

	.uni-input {
		height:300rpx;
		margin-top: 20upx;
		line-height: 30upx;
		padding: 15rpx 25rpx;
		line-height: 50rpx;
		font-size: 28rpx;
		background: #FFF;
		flex: 1;
		border: 1px #ddd solid;
		border-radius: 10upx;
		color: grey;
	}

	.uni-input1 {
		background-color: #f5f7fa;
		border-color: #e4e7ed;
		color: #606266;
		height: 50rpx;
		padding: 15rpx 25rpx;
		line-height: 50rpx;
		font-size: 28rpx;

		flex: 1;
		border: 1px #ddd solid;
		border-radius: 10upx;
		color: grey;
	}

	radio-group,
	checkbox-group {
		width: 100%;
	}

	radio-group label,
	checkbox-group label {
		padding-right: 20rpx;
	}

	.uni-form-item .with-fun {
		display: flex;
		flex-wrap: nowrap;
		background: #FFFFFF;
	}

	.uni-form-item .with-fun .uni-icon {
		width: 40px;
		height: 80rpx;
		line-height: 80rpx;
		flex-shrink: 0;
	}
</style>
