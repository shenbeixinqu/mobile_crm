<template>
	<view class="contentk">
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column">
					<view class="title">公司名称</view>
					<input class="uni-input1" v-model="comname" :disabled="true" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">出访后推广需求</view>
					<input type="text" v-model="e_xqclass" :value="e_xqclass" hidden="true">
					<picker mode="selector" :range="promoteArray" @change="promoteRequire" range-key="name">
						<view class="uni-input" v-if="!e_xqclass">请选择推广需求</view>
						<view class="uni-input" v-else>{{promoteArray[e_xqclass].name}}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">出访后网络意识</view>
					<input type="text" v-model="e_wangluo" :value="e_wangluo" hidden="true">
					<picker mode="selector" :range="netArray" @change="netRequire" range-key="name">
						<view v-if="!e_wangluo" class="uni-input">请选择网络意识</view>
						<view v-else class="uni-input">{{netArray[e_wangluo].name}}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">出访结束日期</view>
					<picker mode="date" v-model="enddata" :value="enddata"  @change="enddataChange">
						<view class="uni-input">{{enddata}}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">出访结束时间</view>
					<picker mode="time" v-model="endtime" :value="endtime"  @change="endtimeChange">
						<view class="uni-input">{{endtime}}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title"><text class="red">*</text>出访结果</view>
					<input  class="uni-input1"  type="text" name="visitResult" v-model="result"  :input="changeEmoji" placeholder-class="placeholder" />
				</view>
			<view class="contentk_bottom">
				<button type="primary" class="btn btn1" @click="back">返回</button>
				<button type="primary" class="btn" form-type="submit">确定</button>
			</view>
			</form>
		</view>
	</view>
</template>

<script>
	
	var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js")
	function getDate(type) {
			const date = new Date();
	
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
	
			if (type === 'start') {
				year = year - 10;
			} else if (type === 'end') {
				year = year + 10;
			}
			month = month > 9 ? month : '0' + month;;
			day = day > 9 ? day : '0' + day;
	
			return `${year}-${month}-${day}`;
		}
	function getTime(){
		const time = new Date();
		let hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
		let minute = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
		return `${hour}:${minute}`
	}
	export default {
		data(){
			return {
				_id:"",
				comname: "",
				e_wangluo:"",
				e_wangluo_val:"",
				e_xqclass:"",
				e_xqclass_val:"",
				result:"",
				remark:"",
				enddata:getDate({
					format: true
						}),
				endtime:getTime(),
				promoteArray: [
					{name: "A1 需求意愿强，企业竞争力弱", value: 1},
					{name: "A2 需求意愿中，企业竞争力弱", value: 2},
					{name: "A3 需求意愿弱，企业竞争力弱", value: 3},
					{name: "B1 需求意愿强，企业竞争力强", value: 4},
					{name: "B2 需求意愿中，企业竞争力强", value: 5},
					{name: "B3 需求意愿弱，企业竞争力强", value: 6},
					{name: "C  客户群较窄（冷门、专业行业）", value: 7},
					
				],
				netArray: [
					{name: "网络意识较强", value: 1},
					{name: "有创新意识,网络意识较弱", value: 2},
					{name: "创新意识弱,网络意识较弱", value: 3}
				]
				
			}
		},
		onLoad(options){
			const info = JSON.parse(decodeURIComponent(options.info))
			this.comname = info.comname
			this._id = info._id
		},
		methods:{
			promoteRequire(e){
				this.e_xqclass = e.detail.value
				this.e_xqclass_val = this.promoteArray[this.e_xqclass].value
			},
			netRequire(e){
				this.e_wangluo = e.detail.value
				this.e_wangluo_val = this.netArray[this.e_wangluo].value
			},
			enddataChange(e){
				this.enddata = e.detail.value
			},
			endtimeChange(e){
				this.endtime = e.detail.value
			},
			// 过滤表情
			changeEmoji(){
				// var patt=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g
				// 	this.result = this.result.replace(patt, function(char){
				// 	  if (char.length===2) {
				// 		return ''
				// 	  } else {
				// 		return char 
				// 	  } 
				// 	})
				console.log("thissssss", this.result)
				this.result = this.result.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, '');
			},
			//表单
			formSubmit: function(e){
				// 定义表单规则
				var rule = [
				{
					name: "visitResult",
					checkType:"null",
					checkRule:"",
					errorMsg: "请输入出访结果"
				}
				];
				// 进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.request({
						url:this.$burl + '/api/visits/apply/' + this._id,
						header:{
							'Authorization': "JWT " + getApp().globalData.token,
						},
						method:"PUT",
						data:{
							e_xqclass: this.e_xqclass_val,
							e_wangluo: this.e_wangluo_val,
							finishtime: this.enddata + " " + this.endtime + ":00",
							result: this.result
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
						},
						fail: (err) => {
						}
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
				
			},
			back(){
				uni.navigateTo({
					url:'./my'
				})
			},
			determine(){
				// uni.request({
				// 	url:this.$burl + '/api/visits/apply/' + this._id,
				// 	header:{
				// 		'Authorization': "JWT " + getApp().globalData.token
				// 	},
				// 	method:"PUT",
				// 	data:{
				// 		e_xqclass: this.e_xqclass_val,
				// 		e_wangluo: this.e_wangluo_val,
				// 		finishtime: this.enddata + " " + this.endtime + ":00",
				// 		result: this.result
				// 	},
				// 	success: (res) => {
				// 		if (res.data.data.status == 200){
				// 			uni.navigateTo({
				// 				url:"./my"
				// 			})
				// 		} else {
				// 			uni.showModal({
				// 				title:"提示",
				// 				content:res.data.msg
				// 			})
				// 		}
				// 	},
				// 	fail: (err) => {
				// 	}
				// })
			},
		}
		
	}
</script>

<style scoped>
	page {
		height: 100%;
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
	
	.red {
		color: #f00;
		padding-right: 10upx;
	}
	
	.rightwz {
		width:65%;
		display: flex;
		border: 1px #e4e4e4 solid;
		border-radius: 10upx;
		height: 50rpx;
		line-height: 50rpx;
		text-indent: 1rem;
		
	}
	
	.se-input{
		width: 80%;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 22upx;
		border: 1px #e4e4e4 solid;
		border-radius: 10upx;
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
	
	.uni-padding-wrap {
		width: 90%;
		padding-top: 20upx;
		padding-bottom: 20upx;
	}
</style>
