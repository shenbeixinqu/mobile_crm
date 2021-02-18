<template>
	<view class="contentk">
		<view class="topview">
			<button type="primary" class="search-btn" @click="getList('search')"></button>
			<input class="se-input" name="nickname" placeholder="请输入客户名称" v-model="kword" />
			
				<picker class="zt" v-model="flag" @change="flagChange" :value="flag" :range="flagArray" range-key="name">
					<view v-if="flagArray[flag]">{{flagArray[flag].name}}</view>
					<view v-else>请选择状态</view>
				</picker>
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
				flagArray:[
					{name:"待审核",value:"1"},
					{name:"审核通过", value:"2"},
					{name:"审核拒绝", value:"9"}
				],
				kword:"",
				ktype:0,
				flag:"",
				flag_val:"",
				token:"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTM1NDYzODgsImlhdCI6MTYxMzUxMDM4OCwiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6NTIsIm5hbWUiOiJcdTc2ZDhcdTUzZTRcdTZkNGJcdThiZDU1MiIsImV0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam8xTWl3aWFYTnpJam9pWlhKd0lpd2lhR1ZoWkdWeWN5STZleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjlMQ0psZUhBaU9qRTJNVE0xTXprd05qUXNJbWxoZENJNk1UWXhNelV4TURJMk5Dd2lkWE5sY2w5dVlXMWxJam9pWEhVM05tUTRYSFUxTTJVMFhIVTJaRFJpWEhVNFltUTFOVElpZlEuU3dodFVIRlp6UE9KREV1X2RUT2xqV2pEUUhrdWJMVFNxZjh4OHVkWEtkTSIsImNsb3VkX2lkIjoyLCJ1bl9pZCI6MiwidW5fbmFtZSI6Ilx1NmM4OFx1OTYzM1x1NzZkOFx1NTNlNCIsImRlX2lkIjoxMywiZGVfbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsImRlcGFydHR5cGUiOjEwLCJwb3N0X25hbWUiOiJcdTYwM2JcdTc2ZDEiLCJsZXZlbCI6NzcsInN1cGVyX2lkIjoxNywia2EiOjAsImlwIjoiMjIzLjEwMS43MC4xNTEiLCJsYXN0dGltZSI6MTYxMzUxMDM4NiwicG9zdHMiOlt7ImlkIjowLCJkbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsIm5hbWUiOiJcdTYwM2JcdTc2ZDEifSx7ImlkIjoxLCJkbmFtZSI6Ilx1NTkyN1x1NWI5ZVx1NjViZFx1OTBlOCIsIm5hbWUiOiJcdTYwM2JcdTc2ZDEifV0sInBvd2VycyI6IjE3NDI4ODE3OTg2MTA5ODc0MTg4NTc3Mjc3MzY3OTkxNTYxOTk0ODgzOTkzOTcwMjc1NDA4OTU3NDY5ODE3NzQyOTY1ODc0MzU5Mjc3MTcwMDg2NzU0NTE4NTQ0OTg5OTcyODk5ODAzMTI0MDA0NDA5NDQ1NTY0ODA2NTU1MjYzNjAyNTEzMzIzNzQxOTk2ODc1MjA3ODI2NzgyNjg5MTQ5NzY4MDQ1MTA3NjIzNzMwMjU2MTc2MjY3MTM5NDQzNDg3NzQ1ODA4NTgzMDEzNzA0OTkzMTgxNjQxNzM2NDMwOTc0MjQyNjM3NzA0MDc3MTA2NTM2MDQ1MDE2NzQ4OTc2Mzg0NTExMzc0MTg4NzQ2ODU3MzM3MTAwNjM5NTk1MzU0NDYxNzMxODQzMjQzMjA4ODc4MDI2ODM2NDY1MjQyNjUxMDYyNDQyNTEwODE2NDU2OTY3MTI2MDY0NzE5NDEzMTY2NDk1NzIyMTQ0MzQ2MTUzNzEwNDU5MzUxNDAzNjcyOTQzMjk5MzQ2NDk4NzA2MDczNTkzMTU3MzgwNTU5NjMzMDM3MjI0MjI1ODI1NDM4MDc4ODU3MjA5MzU5MzIzNDQ3ODE5MTUxNjY5NzIwMjUwODcxNzQ3NjAxNjE0OTI1ODcxNDI5MjEyMDUxNTQzNjE5OTE1NjM0MTcyMjU4NjU5Nzk4Njg1MDA0NTAyMzM1MTQxNDMzMDY4Mzc2Mzc4NDM4NjQ2NDc1NDE3NzY3MTk2MDA5NTg5MTM1NTQyMzgxMjY0ODgwMTgwNDY3NjQ3Njc3NzYzNjQxMDcyNTkzMzgwMDU4Nzc1ODI5MDE3NDUwMTQzNTUzOTcyNDYwMDMyOTAwNzM3NTkxNjYzNzE2MDA4MDUzMzA5NjEzMTg3MjI0MDU5MTE0NTM1MzUyMzgwMDA5MzMyMTIyNjI5NjY5ODI1Mzg3MDg4Mzg1NzAwNjE5NDc3Nzk0NTY4MjcyMjk3NTAwNzExNTc3OTE5NDk3MDYyMDg2MTk2NjY5MTgwODg4OTA1NTc4ODk3OTA1NTIxNzQ3Mjc2MzUxNjEyMTUyNDgxOTc1NTU4ODE4NzY1NzcxNDk3MTUyNTQxNTUzNDg3ODU1Njg3MDAwNTE4NDg4NTg5MDY0MzE1MjU4MjAxMzkwMDc5NDE3NTg0ODA1NjQxNjc3NzY4MjExMDMxODQwNzgwMjI4NjgxMjk1NTYzMjU4NDg5MzcwMDUwNTU2In19.3Jr9JWOGhFW5kYTU-lmUsQJI2kM1wCYocqUi3js4vjU"
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
						kword: this.kword,
						kcstatus:this.flag_val
					},
					success:(res) => {
						uni.hideLoading();
						if (res.statusCode == 200){
							this.dataList = res.data.data.data;
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
			flagChange(e){
				this.flag = e.detail.value
				this.flag_val = this.flagArray[this.flag].value
			},
			
			clueReview(item){
				uni.navigateTo({
					url:'./trackindex?_id=' + item._id
				})
			},
			
			
			
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
	.zt{ height: 60rpx;line-height: 60rpx;width:30%;color: grey; 
		font-size: 22upx;border: 1px #e4e4e4 solid; border-radius:5px;text-indent:0.5rem; background-image: url(../../static/jta.png) ; background-repeat: no-repeat; background-size:15%; background-position:   95% center ;}
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
