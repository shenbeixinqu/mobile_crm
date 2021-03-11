<template>
	<view class="contentk">
		<e-modal :visible.sync="visible">
			<view class="uni-padding-wrap">
				<form @submit="formSubmit">
					<view class="uni-form-item">
						<view class=title>取消原因</view>
						
						
							<textarea class="uni-input" @blur="bindTextAreaBlur" name="cancelReason" placeholder="请输入拒绝原因" />
					</view>
					<view class="uni-btn-v">
						<button class="btn btn1" @click="qx">取消</button>
						<button form-type="submit" class="btn">提交</button>
						
					</view>
				</form>
			</view>
		</e-modal>
		<!-- 	<view class="biaoti">{{dataList.comname}}</view> -->
		<view class="contentk_top" style="margin-bottom: 150upx;">
		<view class="leftwz">客户名称:</view><view class="rightwz">{{dataList.comname}}</view>
			<view class="leftwz">洽谈业务:</view><view class="rightwz">{{dataList.pClassname}}</view>
			<view class="leftwz">出访类型:</view><view class="rightwz">{{dataList.v_type}}</view>
			<view class="leftwz">出访区域:</view><view class="rightwz">{{dataList.v_area}}</view>
			<view class="leftwz">出访目的:</view><view class="rightwz cu">{{dataList.goal}}</view>
			<view class="leftwz">拜访人:</view><view class="rightwz">{{dataList.human}}</view>
			<view class="leftwz">拜访人电话:</view><view class="rightwz">{{dataList.tel}}</view>
			<view class="leftwz">拜访人职务:</view><view class="rightwz">{{dataList.position | visitToPost}}</view>
			<view class="leftwz">客户地址:</view><view class="rightwz cu">{{dataList.address}}</view>
			<view class="leftwz ">出访结果:</view><view class="rightwz">{{dataList.result}}</view>
			<view class="leftwz">出访前推广需求:</view><view class="rightwz">{{dataList.s_xqclass | tuiguangToMean}}</view>
			<view class="leftwz">出访后推广需求:</view><view class="rightwz">{{dataList.e_xqclass | tuiguangToMean}}</view>
			<view class="leftwz">出访前网络意识:</view><view class="rightwz">{{dataList.s_wangluo | yishiToMean}}</view>
			<view class="leftwz">出访后网络意识:</view><view class="rightwz">{{dataList.e_wangluo | yishiToMean}}</view>
			<view class="leftwz">出访时间:</view><view class="rightwz">{{dataList.starttime}}</view>
			<view class="leftwz">出访结束时间:</view><view class="rightwz cu">{{dataList.finishtime}}</view>
			<view class="leftwz ">是否违规:</view><view class="rightwz">{{dataList.isvalid}}</view>
			<view class="leftwz">是否无效出访:</view><view class="rightwz">{{dataList.wuxiao}}</view>
			<view class="leftwz">取消原因:</view><view class="rightwz">{{dataList.cancel_reason}}</view>
		</view>
		<view class="contentk_bottom" v-if="btn_show">
			<button type="primary" class="btn2" @click="closeDetail">关闭</button>
		</view>
		<view class="contentk_bottom" v-else>
			<button type="primary" @click="back"class="btn4" >返回</button>
			<button type="primary" @click="openBox"class="btn3" >取消出访</button>
			<button type="primary" class="btn" @click="visitResult">填写出访结果</button>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../utils/graceChecker.js")
	export default {
		data(){
			return {
				_id: "",
				dataList: [],
				visible:false,
				reason:"",
				btn_show:false
			}
		},
		onLoad(options){
			this._id = options.id
			this.myDetail(this._id)
		},
		filters:{
			visitToPost: function(value) {
			        let names = ''
			        if (value){
			          if(value === '1'){
			          names = "老板/总经理"
			          } else if (value === '2') {
			            names = "部门经理/主管"
			          } else if (value === '9') {
			            names = "职员"
			          } else if (value === "0") {
			            names = "其他"
			          }
			        }
			        return names
			},
			tuiguangToMean: function(value){
			        let demand = ""
			        if(value){
			          if(value === 'A1'){
			            demand = "A1 需求意愿强，企业竞争力弱"
			          } else if (value ==='A2'){
			            demand = "A2 需求意愿中，企业竞争力弱"
			          } else if (value === 'A3'){
			            demand = "A3 需求意愿弱，企业竞争力弱"
			          } else if (value ==='B1'){
			            demand = "B1 需求意愿强，企业竞争力强"
			          } else if (value === 'B2'){
			            demand = "B2 需求意愿中，企业竞争力强"
			          } else if (value ==='B3'){
			            demand = "B3 需求意愿弱，企业竞争力强"
			          } else if (value === 'C'){
			            demand = "C  客户群较窄（冷门、专业行业）"
			          }
			        }
			        return demand
		    },
			yishiToMean: function(value) {
			        let names = ''
			        if(value){
			          if (value === '1') {
			            names = '网络意识较强'
			          } else if (value === '2') {
			            names = '有创新意识,网络意识较弱'
			          } else if (value === '3'){
			            names = '创新意识弱,网络意识较弱'
			          }
			        }
			        return names
		    },
		},
		methods:{
			bindTextAreaBlur: function(e){
				this.reason = e.detail.value
			},
			myDetail(_id){
				uni.request({
					url: this.$burl + '/api/visits/' + _id,
					header:{
						
						'Authorization': "JWT " + getApp().globalData.token
					},
					success: (res) => {
						if (res.data.data.status == 200 ){
							this.dataList = res.data.data.data
							if (this.dataList.result || this.dataList.cancel_reason){
								this.btn_show = true
							}
						} else {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					},
					fail: err => {
						
					}
				})
			},
			visitResult(){
				let visitInfo = {
					comname: this.dataList.comname,
					_id: this.dataList._id
				}
				uni.navigateTo({
					url:"./visitresult?info=" + encodeURIComponent(JSON.stringify(visitInfo))
				})
			},
			closeDetail(){
				uni.navigateTo({
					url:"./my"
				})
			},
			openBox(){
				this.visible = true
			},
			qx(){
				this.visible = false
			},
			back(){
				uni.navigateTo({
					url:"./my"
				})
			},
			formSubmit: function(e){
				var rule = [{
					name:"cancelReason",
					checkType: "null",
					checkRule: "",
					errorMsg: "取消原因不能为空"
				}];
				// 进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.request({
						url:this.$burl + '/api/visits/' + this._id,
						header: {
							
							'Authorization': "JWT " + getApp().globalData.token
						},
						method:"DELETE",
						data:{
							remark: this.reason
						},
						success: (res) => {
							if (res.data.data.status == 200){
								uni.navigateTo({
									url:"./my"
								})
							} else {
								uni.showToast({
									title:res.data.msg,
									icon:"none"
								})
							}
						}
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					})
				}
			},
		}
		
	}
</script>

<style scoped>
	
	page {
		
	}
	
	.biaoti{ font-size:38upx; color:#333333; width: 100%; line-height:90upx; text-indent: 39upx;}
	.btn2 {
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		background: #4873c1;
		border-radius: 0;
		bottom: 0;
		color: #fff;
	}
	
	.btn3 {
		height:100upx;
		line-height: 100upx;
		font-size: 28upx;
		background: #4873c1;
		border-radius: 0;
		background: #d7e8fc;
		width: 25%;
		color: #316fd4;
	}
	
	.btn3:after{
		border-radius:0;
			border: none;
	}
	
	.btn4 {
		height:100upx;
		line-height: 100upx;
		font-size: 28upx;
		background:url(../../static/a.gif) no-repeat center right #d7e8fc;
		border-radius: 0;
		width: 25%;
		color: #333;
	}
	
	.btn4:after{
		border-radius:0;
		border: none;
	}
	
	.uni-input {
		height:100rpx;
		width:90%;
		margin-top: 20upx;
		line-height: 30upx;
		padding: 15rpx 5%;
		line-height: 50rpx;
		font-size: 28rpx;
		background: #FFF;
		flex: 1;
		border: 1px #ddd solid;
		border-radius: 10upx;
		color: grey;
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
.btn1:after{border-radius: 0;}
	.contentk {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.contentk {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.contentk_bottom {
	width: 100%;
	left:0;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.contentk_top {
		width: 95%;
		line-height: 60upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 24upx;
		border-bottom: none;
	}
	
	.leftwz {
		width:95%;
	    color: #666666;
		display: flex;
		justify-content: flex-start;
		font-size:26upx;
		padding-top:10upx;
	}
	
	.rightwz {
		width:95%;
		padding-bottom: 10upx;
		height:60upx;
		display: flex;
		color: #000;
		font-size:34upx;
		border-bottom: 1px #e5e5e5 solid;
	}
	.cu{border-bottom: 29upx #f7f8fa solid;}
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
