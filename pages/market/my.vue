<template>
	<view class="contentk">
		<view class="topview">
			<button type="primary" class="search-btn" @click="getList('search')"></button>
			<input class="se-input" name="nickname" placeholder="请输入客户名称" v-model="kword">
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
							<span v-if="item.result === null">取消出访</span><span @click="visitResult(item)" v-if="item.result === null">填写出访结果</span><span @click="myDetail(item)">详情</span>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				dataList:[],
				kword:""
			}
		},
		onLoad(options){
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
						this.$refs.paging.addData(res.data.data.data);
						console.log("cfsuc",res)
					},
					fail:(err) => {
						console.log("cferr",err)
					}
				})
			},
			getList(type){
				uni.showLoading();
				uni.request({
					url: this.$burl + '/api/visits/my',
					header:{
						'Authorization': this.$token
					},
					data: {
						kword:this.kword
					},
					success:(res) => {
						console.log("myres",res)
						uni.hideLoading();
						if (res.data.data.status === 200){
							this.dataList = res.data.data.data;
							setTimeout(function(){
								uni.hideLoading();
							}, 1000)
						}
					},
					fail: err => {
						console.log("列表错误结果", err)
					}
				})
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
</style>
