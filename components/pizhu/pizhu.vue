<template>
	<view class="contentk">
		
		<uni-drawer ref="drawer" mode="right" :width="drawWid">
			<view class="wk_n">
				<view class="chou_tit">
					标签
				</view>
				<view class="check_bj">
					<checkbox-group class="check_box_k" @change="changeCheckbox">
						<view v-for="item in checkboxData" :key="item.value" class="check_box">
							<label class="lable-box">
								<checkbox :value="String(item.value)" :checked="checkedArr.includes(String(item.value))" :class="{'checked':checkedArr.includes(String(item.value))}"></checkbox>
								<text :class="{'cketext':checkedArr.includes(String(item.value))} ">{{item.label}}</text>
							</label>
						</view>
					</checkbox-group>
					<checkbox-group class="check_box" @change="allChoose">
						<label class="lable-box">
							<checkbox value="all" :class="{'checked':allChecked}" :checked="allChecked?true:false"></checkbox><text :class="{'cketext':allChecked}"
							 style="color:#888;">全选</text>
						</label>
					</checkbox-group>
				</view>
				


				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="chou_tit">
							开始日期
						</view>

						<view class="uni-list-cell-db">
							<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
								<view class="uni-input" v-if="date==''" style="color:#666;">请选择开始日期</view>
								<view class="uni-input" v-else>{{date}}</view>
							</picker>
						</view>

						<view class="chou_tit">
							结束日期
						</view>
						<view class="uni-list-cell-db">
							<picker mode="date" :value="jdate" :start="jstartDate" :end="jendDate" @change="jbindDateChange">
								<view class="uni-input" v-if="jdate==''" style="color:#666;">请选择结束日期</view>
								<view class="uni-input" v-else>{{jdate}}</view>
							</picker>
						</view>
					</view>
				</view>


				
			</view>
<view class="bottombtn">
					<button type="primary" class="btn2" @click="guangbi()">取消</button>
					<button type="primary" class="btn1" @click="clox()">重置</button>
					<button type="primary" class="btn " @click="fuwu('search')">确定</button>
				</view>
		</uni-drawer>

		<view class="tit">销售批注 <button style="float: right;" type="primary" size="small"
			 class="shai-btn" @click="drawer()">筛选</button></view>

	<z-paging ref="paging" @query="queryList" :list.sync="tableList" style="height: calc(100% - 80rpx);">
			<!-- 设置自定义emptyView组件，非必须。空数据时会自动展示空数据组件，不需要自己处理 -->
			<empty-view slot="empty"></empty-view>
			<!-- list数据，建议像下方这样在item外层套一个view，而非直接for循环item，因为slot插入有数量限制 -->
			<view style="flex-direction: column;
		justify-content: center;
		align-items: center; display: flex; margin-bottom: 200upx;">

		<view class="bottxt" v-for="(item,index) in tableList" :key="index">
			<view class="bottxt_top">
				<view class="bottxt_top_y"></view>
				<view class="bottxt_top_jiantou">{{item.addtime}}</view>
			</view>
			<view class="bottxt_mid">
				<view class="bottxt_mid_right">
					<view><text class="txt1">{{item.do_name}}</text>添加一条<text class="txt2">{{item.event}}</text>记录</view>
					<view>{{item.remark}}</view>
				</view>
			</view>
		</view>
		
		
		</view>
			</z-paging>
				<foot-part @openLogin="openLogin"></foot-part>
		</view>
		
	</view>
</template>

<script>
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
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	export default {
		components: {
			uniDrawer
		},
		props: {
			activeId: {
				type: String // 指定传入的类型
			}
		},
		data() {
			return {
				date: '',
				jdate: '',
				startDate: getDate('start'),
				endDate: getDate('end'),

				jstartDate: getDate('start'),
				jendDate: getDate('end'),
				isChecked: false,
				checkboxData: [{
						value: '1',
						label: '销售批注'
					},
					{
						value: '2',
						label: '审核批注'
					},
					{
						value: '3',
						label: '清洗批注'
					},
					{
						value: '4',
						label: '放弃批注'
					},
					{
						value: '5',
						label: '产品批注'
					},
					{
						value: '6',
						label: '帮助批注'
					},
				],
				checkedArr: [], //复选框选中的值
				allChecked: false, //是否全选
				source_flag: '',
				drawWid: '100%',
				isShow: true,
				isMore: false,
				isSh: false,
				tableList: [],

			}
		},
		
		mounted() {
			this.fuwu();

		},
		methods: {
			queryList(pageNo, pageSize) {
				uni.request({
					url: this.$burl + '/api/customer/remark',
					header: {
						'Authorization': "JWT " + getApp().globalData.token
					},
					data: {
						limit: pageSize,
						pn: pageNo,
						id: this.activeId
					},
					success: (res) => {
						this.tableList=res.data.data.data
						this.$refs.paging.addData(this.tableList);
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
			guangbi() {
				this.$refs.drawer.close();
				this.allChecked = false;
				this.checkedArr = [];
				this.date = '';
				this.jdate = '';
			},
			clox() {
				this.allChecked = false;
				this.checkedArr = [];
				this.date = '';
				this.jdate = '';
			},
			//开始日期
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			//结束日期
			jbindDateChange: function(e) {
				this.jdate = e.detail.value
			},
			// 多选复选框改变事件
			changeCheckbox(e) {
				this.checkedArr = e.detail.value;
				// 如果选择的数组中有值，并且长度等于列表的长度，就是全选
				if (this.checkedArr.length > 0 && this.checkedArr.length == this.checkboxData.length) {
					this.allChecked = true;
				} else {
					this.allChecked = false;
				}
			},
			// 全选事件
			allChoose(e) {
				let chooseItem = e.detail.value;
				// 全选
				if (chooseItem[0] == 'all') {
					this.allChecked = true;
					for (let item of this.checkboxData) {
						let itemVal = String(item.value);
						if (!this.checkedArr.includes(itemVal)) {
							this.checkedArr.push(itemVal);
						}
					}

				} else {
					// 取消全选
					this.allChecked = false;
					this.checkedArr = [];
				}
			},
			//客户概况接口
			fuwu(type) {
				uni.showLoading();
				uni.request({
					url: this.$burl + '/api/customer/remark',
					header: {
						'Authorization': this.$token
					},
					data: {
						id: this.activeId,
						ltypes: this.checkedArr.join(','),
						sTime: this.date,
						eTime: this.jdate,
					},
					success: (res) => {
						if (res.data.data.status == 200) {
							uni.hideLoading();
							this.$refs.drawer.close();
							this.tableList= res.data.data.data;
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
	page {}


	.contentk {
		width: 100%;
		
		display: flex;
		flex-direction: column;
		align-items: center;

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

	.wk_n {
		width: 96%;
		margin: 0 auto;
		height: 100%;
		display: flex;
		flex-direction: column;

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
		font-size:30upx;
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
	.lable-box {
		width: 100%;
		display: block;
	}

	.lable-box text {
		width: 100%;
		position: absolute;
		text-align: center;
		z-index: 1;
		color: #888888;
	}


	.cketext {
		width: 100%;
		position: absolute;
		text-align: center;
		z-index: 1;
		color: #4873c1 !important;
	}

	.shai-btn {
		width: 15%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28upx;
	color: #888;
		background: url(../../static/shaixun.png) no-repeat #fff;
		background-size: 40%;
		background-position: 8upx 5upx;
		text-indent: 25px;
		padding-left: 0;
		padding-right: 0;
		border-radius: 0;
		margin-left: 15upx;
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
		margin-left: 5upx;
		justify-content: center;
		line-height: 70upx;
		flex-direction: column;
	}



	.check_box_k {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.check_box {
		margin-bottom: 10upx;
		width: 32%;
		height: 70upx;
		line-height: 70upx;
		display: flex;
		margin-right: 1%;
		position: relative;
	}


	.bottombtn {
		width: 100%;
		left: 0;
		position: fixed;
		bottom:0upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.btn {
		width: 50%;
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		background: #4873c1;
		border-radius: 0;
		bottom: 0;
	}

	.btn1 {
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		background: #4873c1;
		border-radius: 0;
		background: #d7e8fc;
		width: 25%;
		color: #316fd4;
	}

	.btn2 {
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		background: url(../../static/a.gif) no-repeat center right #d7e8fc;
		border-radius: 0;
		width: 25%;
		color: #333;
	}

	.anbtn {
		width: 45%;
	}



	/deep/.uni-checkbox-input {
		background: #f4f4f4;
		border: none;
		width: 220rpx;
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

	.chou_tit {
		padding: 10px;
		color: 666666;
	}
</style>
