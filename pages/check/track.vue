<template>
	<view class="contentk">
		<view class="topview">
			<button type="primary" class="search-btn" @click="getList('search')"></button>
			<input class="se-input" name="nickname" placeholder="请输入客户名称" v-model="kword" /><button type="primary" size="small"
			 class="shai-btn" @click="drawer()">筛选</button>
	    </view>
		<view class="content">
			<z-paging ref="paging" @query="queryList" :list.sync="dataList" style="height: calc(100% - 80rpx);">
				<!-- 设置自定义emptyView组件，非必须。空数据时会自动展示空数据组件，不需要自己处理 -->
				<empty-view slot="empty"></empty-view>
				<!-- list数据，建议像下方这样在item外层套一个view，而非直接for循环item，因为slot插入有数量限制 -->
				<view>
					<view class="list-item" v-for="(item,index) in dataList" :key="index">
						<view class="list-text">
							<view class="list_tit">{{item.company}}</view>
							<view class="list_track">{{item.audit}}</view>
						</view>
						<view class="list-item-top">
							<view class="list-dqk">
								<view class="list-dq1">申请人: {{item.adder}}</view>
								<view class="list-dq1">申请时间: {{item.addtime | dateToYmd}}</view>
							</view>
							<view class="list-dqk">
								<view class="list-dq1">审核体系: {{item.user_tx}}</view>
								<view class="list-dq1">审核原因: {{item.remark}}</view>
							</view>
							<view >
								<span @click="clueReview(item)">审核</span>
							</view>
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
			return {
				dataList:[],
				kword:"",
				showxs:false,
				ktype:0,
				token: "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTI3ODA4NDAsImlhdCI6MTYxMjc0NDg0MCwiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6NTIsIm5hbWUiOiJcdTc2ZDhcdTUzZTRcdTZkNGJcdThiZDU1MiIsImV0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam8xTWl3aWFYTnpJam9pWlhKd0lpd2lhR1ZoWkdWeWN5STZleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjlMQ0psZUhBaU9qRTJNVEkzTnpNMU16Z3NJbWxoZENJNk1UWXhNamMwTkRjek9Dd2lkWE5sY2w5dVlXMWxJam9pWEhVM05tUTRYSFUxTTJVMFhIVTJaRFJpWEhVNFltUTFOVElpZlEuX3E4YTBSVTB6S0lmTEgxNEZuZkw1TlB0Q3pTQUhBMDI4SzRGMmhrS3ZSTSIsImNsb3VkX2lkIjoyLCJ1bl9pZCI6MiwidW5fbmFtZSI6Ilx1NmM4OFx1OTYzM1x1NzZkOFx1NTNlNCIsImRlX2lkIjoxMywiZGVfbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsImRlcGFydHR5cGUiOjEwLCJwb3N0X25hbWUiOiJcdTYwM2JcdTc2ZDEiLCJsZXZlbCI6NzcsInN1cGVyX2lkIjoxNywia2EiOjAsImlwIjoiMTcyLjE4LjMuMTYxIiwibGFzdHRpbWUiOjE2MTI3NDQ4MzgsInBvc3RzIjpbeyJpZCI6MCwiZG5hbWUiOiJcdTU5MjdcdTVlMDJcdTU3M2FcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn0seyJpZCI6MSwiZG5hbWUiOiJcdTU5MjdcdTViOWVcdTY1YmRcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn1dLCJwb3dlcnMiOiIxNzQyODgxNzk4NjEwOTg3NDE4ODU3NzI3NzM2Nzk5MTU2MTk5NDg4Mzk5Mzk3MDI3NTQwODk1NzQ2OTgxNzc0Mjk2NTg3NDM1OTI3NzE3MDA4Njc1NDUxODU0NDk4OTk3Mjg5OTgwMzEyNDAwNDQwOTQ0NTU2NDgwNjU1NTI2MzYwMjUxMzMyMzc0MTk5Njg3NTIwNzgyNjc4MjY4OTE0OTc2ODA0NTEwNzYyMzczMDI1NjE3NjI2NzEzOTQ0MzQ4Nzc0NTgwODU4MzAxMzcwNDk5MzE4MTY0MTczNjQzMDk3NDI0MjYzNzcwNDA3NzEwNjUzNjA0NTAxNjc0ODk3NjM4NDUxMTM3NDE4ODc0Njg1NzMzNzEwMDYzOTU5NTM1NDQ2MTczMTg0MzI0MzIwODg3ODAyNjgzNjQ2NTI0MjY1MTA2MjQ0MjUxMDgxNjQ1Njk2NzEyNjA2NDcxOTQxMzE2NjQ5NTcyMjE0NDM0NjE1MzcxMDQ1OTM1MTQwMzY3Mjk0MzI5OTM0NjQ5ODcwNjA3MzU5MzE1NzM4MDU1OTYzMzAzNzIyNDIyNTgyNTQzODA3ODg1NzIwOTM1OTMyMzQ0NzgxOTE1MTY2OTcyMDI1MDg3MTc0NzYwMTYxNDkyNTg3MTQyOTIxMjA1MTU0MzYxOTkxNTYzNDE3MjI1ODY1OTc5ODY4NTAwNDUwMjMzNTE0MTQzMzA2ODM3NjM3ODQzODY0NjQ3NTQxNzc2NzE5NjAwOTU4OTEzNTU0MjM4MTI2NDg4MDE4MDQ2NzY0NzY3Nzc2MzY0MTA3MjU5MzM4MDA1ODc3NTgyOTAxNzQ1MDE0MzU1Mzk3MjQ2MDAzMjkwMDczNzU5MTY2MzcxNjAwODA1MzMwOTYxMzE4NzIyNDA1OTExNDUzNTM1MjM4MDAwOTMzMjEyMjYyOTY2OTgyNTM4NzA4ODM4NTcwMDYxOTQ3Nzc5NDU2ODI3MjI5NzUwMDcxMTU3NzkxOTQ5NzA2MjA4NjE5NjY2OTE4MDg4ODkwNTU3ODg5NzkwNTUyMTc0NzI3NjM1MTYxMjE1MjQ4MTk3NTU1ODgxODc2NTc3MTQ5NzE1MjU0MTU1MzQ4Nzg1NTY4NzAwMDUxODQ4ODU4OTA2NDMxNTI1ODIwMTM5MDA3OTQxNzU4NDgwNTY0MTY3Nzc2ODIxMTAzMTg0MDc4MDIyODY4MTI5NTU2MzI1ODQ4OTM3MDA1MDU1NiJ9fQ.RJruG14_7ureFQOUset0vNPy7m-IPuGL7Ef5tt0WCaQ"
			}
		},
		onLoad(options){
			this.getList();
		},
		filters:{
			dateToYmd(value){
				return value.split(" ")[0]
			}
		},
		methods:{
			queryList(pageNo, pageSize){
				uni.request({
					url: this.$burl + '/api/customer/audit',
					header: {
						'Authorization': this.token
					},
					data: {
						limit: pageSize,
						pn: pageNo,
					},
					success: (res) => {
						this.$refs.paging.addData(res.data.data.data);
					},
					fail: (err) => {
					}
				})
			},
			getList(type){
				uni.showLoading();
				uni.request({
					url:this.$burl + '/api/customer/audit',
					header:{
						'Authorization': this.token
					},
					data: {
						ktype: '0',
						kword: this.kword
					},
					success:(res) => {
						uni.hideLoading();
						console.log("res",res)
						if (res.statusCode == 200){
							this.dataList = res.data.data.data;
							console.log("datalist",this.dataList)
							if(this.dataList.length == 0){
								this.showx = true;
								uni.hideLoading()
							} else {
								this.showx = false
							}
							setTimeout(function(){
								uni.hideLoading();
							},1000)
						}
					},
					fail: err => {
						
					}
				})
			},
			clueReview(item){
				uni.navigateTo({
					url:'./trackindex?cid=' + item.cid
				})
			}
			
			
		}
		
	}
</script>

<style>
	page{
		height: 100%
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
	
	.contentk {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	
		align-items: center;
		margin-top: 50upx;
	}
	
	.content {
		width: 96%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
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
	
	.list-xq {
		width: 100%;
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
		background: url(../../static/ss.png) no-repeat #007AFF;
		background-size: 70%;
		background-position: center;
		position: absolute;
		left: 425rpx;
	}
	
	.shai-btn {
		width: 15%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 22upx;
		color: #fff;
	}
	
	.topview {
		width: 96%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
</style>
