<template>
	<view class="content">
		<view class="tit">客户订单</view>
	
		<z-paging ref="paging" @query="queryList" :list.sync="tableList" style="height: calc(100% - 80rpx);">
			<!-- 设置自定义emptyView组件，非必须。空数据时会自动展示空数据组件，不需要自己处理 -->
			<empty-view slot="empty"></empty-view>
			<!-- list数据，建议像下方这样在item外层套一个view，而非直接for循环item，因为slot插入有数量限制 -->
			<view>
		<view class="bottxt" v-for="(item,index) in tableList" :key="index">
			<view class="bottxt_top">
				<view class="bottxt_top_y"></view>
				<view class="bottxt_top_jiantou">{{item.addtime}}</view>
			</view>
			<view class="bottxt_mid">
				<view class="bottxt_mid_right">
					<view>订单产品：<text class="txt2">{{item.depict}}</text></view>
					<view>订单类型：<text class="txt2">{{item.nature}}</text></view>
					<view>下单人：{{item.ad_name}}</view>
				</view>
			</view>
		</view>
		</view>
			</z-paging>
		</view>
		
		
	</view>
</template>

<script>

	export default {
	
		
		props: {
			activeId: {
				type: String // 指定传入的类型
			}
		},
		data() {
			return {
				drawWid: '100%',
				tableList:[],
				id:"",
			}
		},
	
		mounted() {
			this.fuwu();
		},
		methods: {
			queryList(pageNo, pageSize) {
				uni.request({
					url: this.$burl + '/api/customer/getOrders',
					header: {
						'Authorization': this.$token
					},
					data: {
						limit: pageSize,
						pg: pageNo,
						id: this.activeId
					},
					success: (res) => {
						console.log("成功res", res)
						this.$refs.paging.addData(res.data.data.data.data);
					},
					fail: (err) => {
						//console.log(err)
					}
				})

			},
			//抽屉打开
			drawer() {
				this.$refs.drawer.open();
			},
			//抽屉关闭
			clox() {
				this.$refs.drawer.close();
			},
			//客户概况接口
			fuwu(type) {
				uni.showLoading();
				uni.request({
					url: this.$burl + '/api/customer/getOrders',
					header: {
						'Authorization': this.$token
					},
					data: {
						id: this.activeId,
					},
					success: (res) => {
						if (res.data.data.status == 200) {
							uni.hideLoading();
							this.tableList = res.data.data.data.data;
							console.log('我是啥啊',this.tableList);
							
						}
					},
					fail: (err) => {
						//console.log(err)
					}
				})
			},
		}
	}
</script>

<style>
	page {
		height: 100%;
	}
	
	.content {
		height: 100%;
		/* 父节点建议开启flex布局 */
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.tit {
		width: 95%;
		color: #666666;
		font-size: 30upx;
		height: 70upx;
		line-height: 70upx;
		text-align: left;
	}

	.uni-list-cell-db {
		display: flex;
		background: #f6f6f6;
		height: 70upx;
		line-height: 70upx;
		border-radius: 5px;
		text-indent: 20upx;
		text-align: left;
	}

	.tit {
		width: 95%;
		color: #666666;
		font-size: 30upx;
		height: 70upx;
		line-height: 70upx;
		text-align: left;
		position: relative;
	}

	.bottxt {
		width: 96%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: url(../../static/xx.jpg) repeat-y 8upx;
	}

	.bottxt_top {
		width: 100%;
		display: flex;
		height: 70upx;
		line-height: 70upx;
		align-items: center;
		justify-items: center;
	}

	.bottxt_mid {
		width: 95%;
		align-items: center;
		justify-items: center;



		padding-left: 5%;
	}

	.bottxt_mid_right {
		width: 95%;
		font-size: 28upx;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		padding: 2%;
		color: #666;
	}

	.txt1 {
		color: #000;
	}

	.txt2 {
		color: #4873c1;
	}

	.bottxt_top_y {
		width: 20upx;
		height: 20upx;
		background: #e4e7ed;
		border-radius: 50%;
	}

	.bottxt_top_jiantou {
		line-height: 50upx;
		color: #909399;
		font-size: 24upx;
		margin-left: 10upx;

	}

	.shai-btn {
		width: 50upx;
		height: 50upx;
		background: url(../../static/shaixun.png) no-repeat;
		background-size: 70%;
		background-position: center;
		position: absolute;
		right: 0;
		top: 10upx;
	}

	.shai-btn:after {
		border: none;
	}

	.uni-picker-tips {
		font-size: 12px;
		color: #666;
		margin-bottom: 15px;
		padding: 0 15px;
		/* text-align: right; */
	}

	.chou_tit {
		padding: 10px;
		color: 666666;
	}

	.check_bj {
		width: 100%;
		display: flex;
		justify-content: center;

		line-height: 70upx;
		margin-bottom: 10upx;

	}

	.check_box_k {
		width: 90%;
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;

	}

	.bottombtn {
		width: 80%;
		right: 10upx;
		position: absolute;
		bottom: 30upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.anbtn {
		width: 45%;
	}

	.check_box {
		margin-bottom: 10upx;
		width: 220rpx;
		height: 70upx;
		line-height: 70upx;
		display: flex;
		margin-right: 5upx;
		color: rgb(64, 158, 255);
		position: relative;
	}

	.cketext {
		width: 220rpx;
		position: absolute;
		text-align: center;
		z-index: 1;
	}

	/deep/.uni-checkbox-input {
		background: #f4f4f4;
		border: none;
		width: 200rpx;
		position: absolute;
		height: 70upx;
		line-height: 70upx;
	}

	/deep/.uni-checkbox-input-checked {
		background-color: #ecf5ff;
	}

	/deep/.uni-checkbox-input-checked:before {
		display: none;
	}

	/deep/uni-picker {
		width: 100%;
	}
</style>
