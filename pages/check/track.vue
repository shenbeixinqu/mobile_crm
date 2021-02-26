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
								<view class="list-dq1">申请人：</view>
								<view class="list-dq2">{{item.adder}}</view>
								
							
								<view class="list-dq1">申请时间:</view>
								<view class="list-dq2"> {{item.addtime | dateToYmd}}</view>
								<view class="list-dq1">审核体系:</view>
								<view class="list-dq2"> {{item.user_tx}}</view>
								<view class="list-dq1">审核原因:</view>
								<view class="list-dq2"> {{item.remark}}</view>
							</view>
							
							<view class="list-item-bot">
								<span @click="clueReview(item)" v-if="item.audit=='待审核' || item.audit =='层审中'">审核</span>
								<span @click="clueDetail(item)" v-if="item.audit == '审核通过'|| item.audit =='审核拒绝' ">详情</span>
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
					{name:"全部", value:""},
					{name:"待审核",value:"1"},
					{name:"审核通过",value:"2"},
					{name:"层审中",value:"3"},
					{name:"审核拒绝", value:"9"}
				],
				kword:"",
				ktype:0,
				flag:"",
				flag_val:"",
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
						'Authorization': this.$token
					},
					data: {
						limit: pageSize,
						pn: pageNo,
						kcstatus:this.flag_val
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
						'Authorization': this.$token
					},
					data: {
						ktype: '0',
						kword: this.kword,
						kcstatus:this.flag_val
					},
					success:(res) => {
						console.log("res",res)
						uni.hideLoading();
						if (res.data.data.status == 200){
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
				this.getList()
			},
			
			clueReview(item){
				uni.navigateTo({
					url:'./trackindex?_id=' + item._id
				})
			},
			clueDetail(item){
				uni.navigateTo({
					url:'./trackdetail?_id=' + item._id
				})
			}
			
		}
		
	}
</script>

<style>
	page{
		height: 100%
	}
	
	.list-dqk {
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
		text-align: left;
		padding-top: 5upx;
		padding-bottom: 5upx;
		display: flex;
	}

	.list-dq1 {
		display: flex;
		width: 25%;
		padding-top: 5upx;
		padding-bottom: 5upx;
		font-size: 28upx;
	}

	.list-dq2 {
		display: flex;
		width: 75%;
		font-size: 28upx;
		text-align: left;
		padding-top: 1upx;
		padding-bottom: 1upx;
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
	
	.list-item-bot {
		width: 100%;
		display: flex;
		margin-top: 15upx;
		justify-content: flex-end;
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
		background: url(../../static/ss.png) no-repeat;
		background-size: 70%;
		background-position: center;
		position: absolute;
		left: 425rpx;
		border: none;
	}
	
	.search-btn:after {
		border: none;
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
