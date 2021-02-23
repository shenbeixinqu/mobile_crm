<template>
	<view class="contentk">
		<e-modal :visible.sync="visible">
			<view class="uni-padding-wrap">
				<form @submit="formSubmit">
					<view class="uni-form-item">
						<view class=title>取消原因</view>
						<input class="uni-input" v-model="reason" name="cancelReason" placeholder="请输入取消原因" >
					</view>
					<view class="uni-btn-v">
						<button form-type="submit" class="btn">提交</button>
						<button class="btn" @click="qx">取消</button>
					</view>
				</form>
			</view>
		</e-modal>
		
		<view class="topview">
			<button type="primary" class="search-btn" @click="getList('search')"></button>
			<input class="se-input" name="nickname" placeholder="请输入客户名称" v-model="kword">
			<!-- <view>1+{{token}}+1</view> -->
		</view>
		<view class="content">
			<z-paging ref="paging" @query="queryList" :list.sync='dataList' style="height: calc(100% - 80rpx);">
				<empty-view slot="empty"></empty-view>
				<view>
					<view class="list-item" v-for="(item,index) in dataList" :key="index">
						<view class="list-text">
							<view class="list_tit">{{item.comname}}</view>
							<view class="list_track">{{item.status}}</view>
						</view>
						<view class="list-item-top">
							<view class="list-dqk">
								<view class="list-dq1">拜访人:{{item.human}}</view>
								<view class="list-dq1">电话:{{item.tel}}</view>
							</view>
						</view>
						<view class="list-item-top">
							<view class="list-dqk">
								<view class="list-dq1">洽谈业务:{{item.pClassname}}</view>
								<view class="list-dq1">出访时间:{{item.starttime}}</view>
							</view>
							<view class="list-dq">出访结果:{{item.result}}</view>
						</view>
						<view class="list-item-bot" v-if="item.status == '正常'">
							<span @click="openBox(item)" v-if="item.result === null">取消出访</span>
							<span @click="visitResult(item)" v-if="item.result === null">填写出访结果</span>
							<span @click="myDetail(item)">详情</span>
						</view>
						<view class="list-item-bot" v-else>
							<span @click="myDetail(item)">详情</span>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js")
	export default{
		data(){
			return{
				dataList:[],
				kword:"",
				visible:false,
				reason: "",
				id: "",
				token:"",
			}
		},
		onLoad(options){
			this.token = "JWT " + getApp().globalData.token
			this.getList();
		},
		methods:{
			queryList(pageNo,pageSize){
				uni.request({
					url: this.$burl + '/api/visits/my',
					header:{
						'Authorization': this.$token
					},
					data: {
						limit: pageSize,
						pn:pageNo,
						// kdtype: 0
					},
					success:(res) => {
						// uni.showModal({
						// 	title:"提示",
						// 	content:res
						// }),
						this.$refs.paging.addData(res.data.data.data);
						console.log("cfsuc",res)
					},
					fail:(err) => {
						// uni.showModal({
						// 	title:"提示",
						// 	content:err
						// })
						console.log("cferr",err)
					}
				})
			},
			getList(type){
				// uni.showModal({
				// 	title:"this",
				// 	content:"走这里了" + this.token
				// });
				uni.request({
					url: this.$burl + '/api/visits/my',
					header:{
						'Authorization': this.$token
					},
					data: {
						kword:this.kword
					},
					success:(res) => {
						uni.showModal({
							title:"thissss",
							content:res
						})
						if (res.data.data.status === 200){
							this.dataList = res.data.data.data;
							setTimeout(function(){
								uni.hideLoading();
							}, 1000)
						}
					},
					fail: err => {
						// uni.showModal({
						// 	title:"thissss",
						// 	content:err
						// })
						console.log("列表错误结果", err)
					}
				})
				
			},
			qx(){
				this.visible = false
			},
			openBox(item){
				this.visible = true,
				this.id = item._id
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
						url:this.$burl + '/api/visits/' + this.id,
						header: {
							'Authorization':this.$token
						},
						method:"DELETE",
						data:{
							remark: this.reason
						},
						success: (res) => {
							console.log("弹窗res",res)
							if (res.data.data.status == 200){
								uni.showModal({
									title: res.data.msg,
									icon:"none"
								})
								this.visible = false
							} else {
								uni.showModal({
									title:"提示",
									content:res.data.msg
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
			visitResult(item){
				let visitInfo = {
					comname: item.comname,
					_id: item._id
				}
				uni.navigateTo({
					url:"./visitresult?info=" + encodeURIComponent(JSON.stringify(visitInfo))
				})
			},
			myDetail(item){
				uni.navigateTo({
					url:"./mydetail?id="+item._id
				})
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
	
	.btn {
		color: #fff;
		width: 30%;
		height: 70upx;
		line-height: 70upx;
		font-size: 24upx;
		background: #4873c1;
	}
	
	.content {
		width: 96%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.contentk {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 50upx;
	}
	
	.list-dq1 {
		display: flex;
		width: 50%;
		text-align: left;
		padding-top: 1upx;
		padding-bottom: 1upx;
	}
	
	.list-dqk {
		flex-direction: row;
		width: 100%;
		text-align: left;
		padding-top: 1upx;
		padding-bottom: 1upx;
		display: flex;
	}
	
	.list-item {
		flex-direction: column;
		color: #666666;
		margin-bottom: 25upx;
		padding: 3%;
		overflow: hidden;
		border: 1px #e4e4e4 solid;
		display: flex;
		border-radius: 5px;
		align-items: center;
		justify-content: center;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;
	}
	
	.list-item-bot {
		width: 100%;
		display: flex;
		margin-top: 15upx;
		justify-content: space-between;
		color: #4873c1;
		font-size: 28upx;
	}
	
	.list-item-top {
		font-size: 24upx;
		width: 100%;
		margin-top: 10upx;
	}
	
	.list-text {
		width: 100%;
		text-align: left;
		font-size: 30upx;
		display: flex;
		align-items: center;
		height: 70upx;
		line-height: 70upx;
		justify-content: space-between;
	}
	
	.list_tit {
		display: flex;
	}
	
	.se-input {
		width: 65%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 22upx;
		text-indent: 1rem;
		border: 1px #e4e4e4 solid;
		border-radius: 10upx;
	}
	
	.search-btn {
		z-index: 500;
		height: 60rpx;
		width: 60rpx;
		background: url(../../static/ss.png) no-repeat #4873c1;
		background-size: 70%;
		background-position: center;
		position: absolute;
		left: 425rpx;
	}
	
	.topview {
		width: 96%;
		display: flex;
		justify-content: space-between;
		align-items: center;
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
