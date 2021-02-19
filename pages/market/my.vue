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
						
					},
					success:(res) => {
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
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
	
	.contentk {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 50upx;
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
