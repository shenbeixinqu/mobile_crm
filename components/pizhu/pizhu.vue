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
								<text class="cketext">{{item.label}}</text>
							</label>
						</view>
					</checkbox-group>
					<checkbox-group class="check_box_k1" @change="allChoose">
						<label class="lable-box">
							<checkbox value="all" :class="{'checked':allChecked}" :checked="allChecked?true:false"></checkbox><text class="cketext"
							 style="color:rgb(64, 158, 255);">全选</text>
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


				<view class="bottombtn">
					<button type="primary" class="anbtn" @click="fuwu('search')">确定</button>
					<button type="primary" class="anbtn" @click="clox()">重置</button>
				</view>
			</view>

		</uni-drawer>

		<view class="tit">销售批注 <button type="primary" size="small" class="shai-btn" @click="drawer()"> </button></view>
		<view class="bottxt" v-for="item in tableList" :key="item.addtime">
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
				startDate: getDate('start'),
				endDate: getDate('end'),
				jdate: '',
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
		// watch: {
		//     activeId: function(newVal, oldVal) {
		//      console.log('fdfd',newVal);
		//     },
		//   },
		mounted() {
			this.fuwu();
		
		},
		methods: {

			//抽屉打开
			drawer() {
				this.$refs.drawer.open();
			},
			//抽屉关闭
			clox() {
				this.$refs.drawer.close();
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
							this.tableList = res.data.data.data;
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
		flex-direction: column;
		line-height: 70upx;
		margin-bottom: 10upx;
		align-items: center;

	}

	.check_box_k {
		width:100%;
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		
		justify-content: center;
	}
	.check_box_k1 {
		width:96.5%;
		padding-left:3.5%;
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
	
		justify-content:flex-start;
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
