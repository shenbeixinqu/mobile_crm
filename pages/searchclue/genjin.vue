<template>
	<view class="contentk">
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">客户名称</view>
					<input class="uni-input1" v-model="name" :disabled="true" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">客户来源</view>
					<input class="uni-input1" v-model="source" :disabled="true" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">客户行业</view>
					<input class="uni-input1" v-model="ind_lead" :disabled="true" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">客户电话</view>
					<input class="uni-input1" v-model="phoneTxt" :disabled="true" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">详细地址</view>
					<input class="uni-input1" v-model="address" :disabled="true" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">主营业务</view>
					<input class="uni-input1" v-model="business" :disabled="true" />
				</view>
				<view class="uni-form-item uni-column" v-if="classall===0">
					<view class="title">可跟进业务:</view>
					<checkbox-group @change="checkboxChange" class="unilablek">
						<label class="unilable" v-for="item in this.optionsgj" :key="item">
							<view class="unick">
								<checkbox :value="item" />
							</view>
							<view class="uniwz">{{baidupro[item]}}</view>
						</label>
					</checkbox-group>
				</view>
				<block v-if="stage === '待清洗' || stage === '线索黑名单'">
					<view class="uni-form-item uni-column">
						<view class="title">核实电话</view>
						<input class="uni-input" v-model="phone" name="nphone" placeholder="请输入核实电话" />
					</view>

					<view class="uni-form-item uni-column">
						<view class="title"><text class="red">*</text>申请理由</view>
						<textarea class="uni-inputk" @blur="bindTextAreaBlur" name="remark" placeholder="请填跟进理由" :vlaue="remark" />
						</view>
	     
		 </block>
		 <block v-else>
				<view class="uni-form-item uni-column" >
					<view class="title"><text class="red">*</text>跟进理由</view>
					<textarea class="uni-inputk" @blur="bindTextAreaBlur" name="remark" placeholder="请填跟进理由" :vlaue="remark" />
					</view>
					</block>
					
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
				phone:"",
				name: '',
				activeId: "",
				address:'',
				source:'',
				phoneTxt:'',
				business:'',
				ind_lead:'',
				stage:'',
				remark:'',
				optionsgj: [],
				baidupro:'',
				classall:0,
				classid:'',
				
			}

		},
	
		onLoad: function(option) {
			const item = JSON.parse(decodeURIComponent(option.genjin));
		    this.activeId=Number(item.id); 
			console.log('this.activeId',this.activeId)
			this.ind_lead = item.ind_lead;
			this.stage=item.stage;
			this.genjin();
			this.getchoices();
		},

		methods: {
			checkboxChange: function (e) {
				this.classid=(e.detail.value).toString();
			},
			// 返回列表页
			qx() {
				uni.navigateTo({
					url: './customers'
				})
			},
			bindTextAreaBlur: function(e) {
				this.remark = e.detail.value
				console.log('this.remark', this.remark)
			},
			//百度产品
			getchoices(){
				uni.request({
					url: this.$burl + '/api/getchoices',
					header: {
						'Authorization': this.$token
					},
					data:{
						kt:'pro_class'
					},
					success: (res) => {
						if (res.data.data.status == 200){
							this.baidupro=res.data.data.pro_class	
						}
					},
					fail: (err) => {
						//console.log(err)
					}
				})
			},
			
            genjin(){
				uni.request({
					url: this.$burl + '/api/customer/track',
					header: {
						'Authorization': this.$token
					},
					data:{
						id:this.activeId
					},
					success: (res) => {
						console.log(res);
						if (res.data.data.status == 200){
							this.name=res.data.data.data.name;
							this.address=res.data.data.data.address;
							this.source=res.data.data.data.source;
							this.phoneTxt=res.data.data.data.phone;
							this.business=res.data.data.data.business;
							this.classall=res.data.data.data.classall;
							console.log('this.classall',this.classall)
							this.optionsgj=res.data.data.data.classids;
							for(let i in this.optionsgj){
							 this.optionsgj[i]=this.optionsgj[i].toString();
							}
						}
						else{
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
			},
			//表单
			formSubmit: function(e) {
				//定义表单规则
				var rule = [
				{
					name: "nphone",
					checkType: "phoneno",
					checkRule: "",
					errorMsg: "请输入正确手机号"
				},{
					name: "remark",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "请输入跟进理由",
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
							classid:this.classid,
						},
						success: (res) => {
							if (res.data.data.status == 200) {
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

<style scoped>
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

	.uni-input {
	
		height: 50rpx;
		padding: 15rpx 25rpx;
		line-height: 50rpx;
		font-size: 28rpx;
		background: #FFF;
		flex: 1;
		border: 1px #ddd solid;
		border-radius: 10upx;
		color: grey;
	}

	/* 表单 */
	.uni-padding-wrap {
		width: 90%;
		padding-top: 20upx;
		padding-bottom: 20upx;

	}

	.uni-form-item {
		display: flex;
		width:100%;
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

	.uni-inputk {
		height: 200rpx;
		margin-top: 20upx;
		padding: 15rpx 30rpx;
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
	.unilablek{width: 100%; display: flex;flex-direction:row; flex-wrap: wrap;}
	.unilable{ width:45%; display: flex; margin-bottom: 10upx;}
	.unick{display: flex;}
	.uniwz{display: flex;}
</style>
