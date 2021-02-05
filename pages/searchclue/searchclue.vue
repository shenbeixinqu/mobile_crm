<template>
	<view class="content">
		<uni-drawer ref="drawer" mode="right" :width="drawWid">
			<view style="padding:30rpx;">
				标签
			</view>
			<view class="check_bj">
				<checkbox-group class="check_box_k" @change="changeCheckbox">
					<view v-for="item in checkboxData" :key="item.value" class="check_box">
						<label>
							<checkbox :value="String(item.value)" :checked="checkedArr.includes(String(item.value))" :class="{'checked':checkedArr.includes(String(item.value))}"></checkbox>
							<text class="cketext">{{item.label}}</text>
						</label>
					</view>
				</checkbox-group>
			</view>
			<view class="check_bj">
				<checkbox-group class="check_box_k" @change="allChoose">
					<label>
						<checkbox value="all" :class="{'checked':allChecked}" :checked="allChecked?true:false"></checkbox> 全选
					</label>
				</checkbox-group>
			</view>
			<view style="padding:30rpx;">
				地区
			</view>
			<view>
				<view class="list-item" @tap="handleTap('picker3')">
					<text class="sub-title">省市区三级选择</text>
					<view class="item-content">
						<text class="item-title">绑定值:{{ JSON.stringify(value3) }}</text>
						<view class="item-value">
							<text class="item-label">{{ label3 }}</text>
							<text v-if="!label3" class="item-placeholder">点我打开选择器</text>
						</view>
					</view>
					<lb-picker ref="picker3" v-model="value3" mode="multiSelector" :list="list1" :level="3" :dataset="{ name: 'label3' }"
					 @change="handleChange" @confirm="handleConfirm" @cancel="handleCancel">
					</lb-picker>
				</view>
				<view class="grey-block"></view>
			</view>
			<view style="padding:30rpx;">
				行业
			</view>
			<view>
				<view class="list-item" @tap="handleTap('picker4')">
					<text class="sub-title">绑定默认值</text>
					<view class="item-content">
						<text class="item-title">绑定值:{{ JSON.stringify(value4) }}</text>
						<view class="item-value">
							<text class="item-label">{{ label4 }}</text>
							<text v-if="!label4" class="item-placeholder">点我打开选择器</text>
						</view>
					</view>
					<lb-picker ref="picker4" v-model="value4" mode="multiSelector" :list="listhy" :level="3" :dataset="{ name: 'label4' }"
					 @change="handleChange" @confirm="handleConfirm" @cancel="handleCancel">
					</lb-picker>
				</view>
				<view class="grey-block"></view>
			</view>
			<view style="padding:30rpx;">
				来源
			</view>
			<view>
				<picker v-model="source_flag" @change="sourceChange" :value="source_flag" :range="sourceArray" range-key="name">
					<view>{{sourceArray[source_flag].name}}</view>
				</picker>
			</view>
		</uni-drawer>
		<view class="topview">
			<button class="search-btn"></button>
			<input class="se-input" name="nickname" placeholder="请输入客户名称" v-model="kword" /><button type="primary" size="small"
			 class="shai-btn" @click="drawer()">筛选</button></button> <button type="primary" size="small" class="shai-btn" @click="add()">新增</button></view>
		<!-- 数据列表 -->
		<scroll-view scroll-y @scrolltolower="getNextData" class="right-part">
			<view v-if="showxs" class="nodata-part" style="padding-top:100upx;">
				<image class="nodata-img" src="https://shop.pangu.mobi/static/mobile/nodata.jpg" mode="aspectFit"></image>
				<view class="nodata-text">暂无内容</view>
			</view>
			<view v-else class="list-item" v-for="(item,index) in list" :key="index">
				<view class="list-text" @tap="goDetail(item)">
					<view class="list_tit">{{item.name}}</view>
					<view class="tag_k" v-for="(user, i) in item.tags.data" :key="i">
						{{user.t_tab}}

					</view>
				</view>
				<view class="list-item-top">
					<view class="list-dqk">
						<view class="list-dq1" @tap="goDetail(item)">联系人：{{item.linkman.txt}}</view>
						<view class="list-dq1" @tap="goDetail(item)">电话：{{item.phone}}</view>
						<image class="tel-img" src="../../static/tel.png" mode="aspectFit" @tap="call_phone(item)"></image>
					</view>
					<view class="list-dq" @tap="goDetail(item)">到期时间：跟踪{{item.dt_link}} | 跟踪{{item.dt_track}}</view>
					<view class="list-dq" @tap="goDetail(item)">审核状态：延期{{item.delay_status}} | 跟进{{item.audit_status}}</view>
				</view>
				<view class="list-item-bot">
					<span @tap="pizhu(item)">填写批注</span> <span @tap="chufang(item)">申请出访</span> <span @tap="xiangqing(item)">详情</span>
				</view>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	export default {
		components: {
			uniDrawer
		},
		data() {
			return {
				value1: [],
				label1: '',
				value2: [],
				label2: '',
				value3: ['2', '22', '223'],
				label3: '',
				value4: [],
				label4: '',
				listhy: [],
				list1: [],
				list2: [],
					source_flag:0,
				isChecked: false,
				checkboxData: [],
				checkedArr: [], //复选框选中的值
				allChecked: false, //是否全选
				kword: '',
				isAll: false,
				nowPage: 1,
				drawWid: '100%',
				list: [],
				from: 'pro_list',
				showxs: false,
				checkAllTag: false,
				tagsArr: [],
				// 全选全不选
				ktags: [],
				usrid: 2,
				sourceArray: [{
						name: "个人查找（公共资源)",
						value: "1"
					},
					{
						name: "个人查找（个人社交）",
						value: "2"
					},
					{
						name: "老客户转介绍",
						value: "3"
					},
					{
						name: "CSC网单",
						value: "4"
					},
					{
						name: "百度SCC",
						value: "5"
					},
					{
						name: "市场渠道",
						value: "6"
					},
					{
						name: "市场专用",
						value: "7"
					},
					{
						name: "蜂巢活动",
						value: "8"
					},
					{
						name: "百度团购",
						value: "9"
					},
					{
						name: "郊县专用",
						value: "10"
					},
					{
						name: "工商线索",
						value: "11"
					},
					{
						name: "捕鱼",
						value: "12"
					},
					{
						name: "保护",
						value: "13"
					},
					{
						name: "特殊",
						value: "14"
					},
					{
						name: "分销系统",
						value: "15"
					},
				],
				token: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTI1MjE4NzksImlhdCI6MTYxMjQ4NTg3OSwiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6NTIsIm5hbWUiOiJcdTc2ZDhcdTUzZTRcdTZkNGJcdThiZDU1MiIsImNsb3VkX2lkIjoyLCJ1bl9pZCI6MiwidW5fbmFtZSI6Ilx1NmM4OFx1OTYzM1x1NzZkOFx1NTNlNCIsImRlX2lkIjoxMywiZGVfbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsImRlcGFydHR5cGUiOjEwLCJwb3N0X25hbWUiOiJcdTYwM2JcdTc2ZDEiLCJsZXZlbCI6NzcsInN1cGVyX2lkIjoxNywia2EiOjAsImlwIjoiMTcyLjE4LjMuMTI5IiwibGFzdHRpbWUiOjE2MTI0ODU4MzYsInBvc3RzIjpbeyJpZCI6MCwiZG5hbWUiOiJcdTU5MjdcdTVlMDJcdTU3M2FcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIiwiZmxhZyI6MX0seyJpZCI6MSwiZG5hbWUiOiJcdTU5MjdcdTViOWVcdTY1YmRcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIiwiZmxhZyI6MH1dLCJwb3dlcnMiOiIxNzQyODgxNzk4NjEwOTg3NDE4ODU3NzI3NzM2Nzk5MTU2MTk5NDg4Mzk5Mzk3MDI3NTQwODk1NzQ2OTgxNzc0Mjk2NTg3NDM1OTI3NzE3MDA4Njc1NDUxODU0NDk4OTk3Mjg5OTgwMzEyNDAwNDQwOTQ0NTU2NDgwNjU1NTI2MzYwMjUxMzMyMzc0MTk5Njg3NTIwNzgyNjc4MjY4OTE0OTc2ODA0NTEwNzYyMzczMDI1NjE3NjI2NzEzOTQ0MzQ4Nzc0NTgwODU4MzAxMzcwNDk5MzE4MTY0MTczNjQzMDk3NDI0MjYzNzcwNDA3NzEwNjUzNjA0NTAxNjc0ODk3NjM4NDUxMTM3NDE4ODc0Njg1NzMzNzEwMDYzOTU5NTM1NDQ2MTczMTg0MzI0MzIwODg3ODAyNjgzNjQ2NTI0MjY1MTA2MjQ0MjUxMDgxNjQ1Njk2NzEyNjA2NDcxOTQxMzE2NjQ5NTcyMjE0NDM0NjE1MzcxMDQ1OTM1MTQwMzY3Mjk0MzI5OTM0NjQ5ODcwNjA3MzU5MzE1NzM4MDU1OTYzMzAzNzIyNDIyNTgyNTQzODA3ODg1NzIwOTM1OTMyMzQ0NzgxOTE1MTY2OTcyMDI1MDg3MTc0NzYwMTYxNDkyNTg3MTQyOTIxMjA1MTU0MzYxOTkxNTYzNDE3MjI1ODY1OTc5ODY4NTAwNDUwMjMzNTE0MTQzMzA2ODM3NjM3ODQzODY0NjQ3NTQxNzc2NzE5NjAwOTU4OTEzNTU0MjM4MTI2NDg4MDE4MDQ2NzY0NzY3Nzc2MzY0MTA3MjU5MzM4MDA1ODc3NTgyOTAxNzQ1MDE0MzU1Mzk3MjQ2MDAzMjkwMDczNzU5MTY2MzcxNjAwODA1MzMwOTYxMzE4NzIyNDA1OTExNDUzNTM1MjM4MDAwOTMzMjEyMjYyOTY2OTgyNTM4NzA4ODM4NTcwMDYxOTQ3Nzc5NDU2ODI3MjI5NzUwMDcxMTU3NzkxOTQ5NzA2MjA4NjE5NjY2OTE4MDg4ODkwNTU3ODg5NzkwNTUyMTc0NzI3NjM1MTYxMjE1MjQ4MTk3NTU1ODgxODc2NTc3MTQ5NzE1MjU0MTU1MzQ4Nzg1NTY4NzAwMDUxODQ4ODU4OTA2NDMxNTI1ODIwMTM5MDA3OTQxNzU4NDgwNTY0MTY3Nzc2ODIxMTAzMTg0MDc4MDIyODY4MTI5NTU2MzI1ODQ4OTM3MDA1MDU1NiJ9fQ.seS5rD1Tl4rdjq3Y2bZX8uPHemF8eDfJhZOSKg-o6LU'

			}
		},
		onLoad(options) {
			this.getList();
			this.tage();
			this.locations();
			this.industrys();
		},
		methods: {
			//三级联动
			handleTap(picker) {
				this.$refs[picker].show()
			},
			handleChange(e) {
				console.log('change::', e)
			},
			handleConfirm(e) {
				// 如果存在多个picker，可以在picker上设置dataset属性，confirm中获取，就能区分是哪个picker了
				console.log('confirm::', e)
				if (e) {
					const name = e.dataset.name
					const label = e.item.map(m => m.label).join('-')
					if (name && label) {
						this[name] = label
					}
				}
			},
			handleCancel(e) {
				console.log('cancel::', e)
			},
			checkboxChange(e) {
				let values = e.detail.value;
				if (values[0] == 1) {
					this.isChecked = true;
				} else {
					this.isChecked = false;
				}
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

			//抽屉
			drawer() {
				this.$refs.drawer.open();
			},
			//线索来源
			sourceChange(e) {
				this.source_flag = e.detail.value;
			},
			//地址接口
			locations() {
				uni.request({
					url: this.$burl + '/api/locations_cascade',
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						console.log("我地址接口", res.data.data);
						this.list1 = res.data.data.options;
					},
					fail: (err) => {
						//console.log(err)
					}
				})
			},
			//行业接口
			industrys() {
				uni.request({
					url: this.$burl + '/api/industrys_cascade',
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						console.log("我是行业接口", res.data.data);
						this.listhy = res.data.data.options;
					},
					fail: (err) => {
						//console.log(err)
					}
				})
			},
			//标签接口
			tage() {
				uni.request({
					url: this.$burl + '/api/get_tags/' + this.usrid,
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						let checklist = res.data.data.data;
						console.log('checklist', checklist)
						let arr = []
						let key;
						for (key in checklist) {
							console.log(key);
							this.checkboxData.push({
								'value': checklist[key].id,
								'label': checklist[key].tab
							})
						}
						console.log(this.checkboxData);
					},
					fail: (err) => {
						//console.log(err)
					}
				})
			},


			//列表接口
			getList() {
				uni.showLoading();
				uni.request({
					url: this.$burl + '/api/customer/clue/my',
					header: {
						'Authorization': this.token
					},
					data: {
						// user_id: uni.getStorageSync('user_id'),
						// type: '1'
					},

					success: (res) => {
						uni.hideLoading();
						if (res.statusCode == 200) {
							this.list = res.data.data.data;
							if (this.list.length == 0) {
								this.showxs = true;
								uni.hideLoading();
							} else {
								this.showxs = false;
							}
							setTimeout(function() {
								uni.hideLoading();
							}, 1000)
						}
					},
					fail: (err) => {
						//console.log(err)
					}
				})
			},


			// changeTab(v) {
			// 	this.selectTab = v.id;
			// 	this.dataList = [];
			// 	this.isAll = false;
			// 	this.nowPage = 1;
			// 	this.getProData();
			// },
			getNextData() {
				if (this.isAll) {
					this.showToast('已加载全部');
				} else {
					this.nowPage++;
					// this.getProData();
				}
			},
			//拨打电话
			call_phone(item) {
				uni.makePhoneCall({
					phoneNumber: item.phone,
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
						this.call_phone(); //重复调用一次
					}
				});
			},
			// 跳转详情页
			goDetail(item) {
				uni.navigateTo({
					url: './pro_detail?id=' + item.id + '&path=' + this.from
				});
			},
		}
	}
</script>

<style scoped>
	page,
	.content {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}


	.type-part {
		overflow-x: hidden;
		overflow-y: auto;
	}

	.left-span {
		width: 5upx;
		height: 40upx;
		position: absolute;
		left: 5upx;
	}

	.span-active {
		background-color: #f54018;
	}

	.right-part {

		display: flex;
		height: 100%;
		width: 96%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}

	.list-item {
		color: #666666;
		margin-top: 25upx;
		padding: 3%;
		overflow: hidden;
		border: 1px #e4e4e4 solid;
		display: flex;
		border-radius: 5px;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}

	.list-item-top {
		font-size: 24upx;
		width: 100%;
		margin-top: 10upx;
	}

	.list-item-bot {
		width: 100%;
		display: flex;
		margin-top: 15upx;
		justify-content: space-between;
		color: #4873c1;
		font-size: 28upx;
	}

	.list-item-bot span {}

	.list-img {
		width: 260upx;
		height: 196upx;
		border-radius: 10upx;
		font-size: 24upx;
	}

	.list-text {
		width: 100%;
		text-align: left;
		font-size: 30upx;
		display: flex;
		align-items: center;
		line-height: 50upx;
		height: 50upx;
		justify-content: flex-start;
	}

	.list_tit {
		display: flex;
	}

	.tag_k {
		display: flex;
		background-color: #ecf5ff;
		font-size: 20rpx;
		margin-left: 5rpx;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		width: 40rpx;
		justify-content: center;
		color: #409eff;
	}

	.list-dq {
		width: 100%;
		text-align: left;
		padding-top: 1upx;
		padding-bottom: 1upx;
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
		height: 60rpx;
		width: 60rpx;
		background: url(../../static/ss.png) no-repeat #007aff;
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
		margin-top: 50rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}


	.list-dqk {
		flex-direction: row;
		width: 100%;
		text-align: left;
		padding-top: 1upx;
		padding-bottom: 1upx;
		display: flex;
	}

	.list-dq1 {
		display: flex;
		width: 50%;
		text-align: left;
		padding-top: 1upx;
		padding-bottom: 1upx;
	}

	.tel-img {
		width: 46upx;
		height: 46upx;
	}

	.check_bj {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.check_box_k {
		width: 90%;
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap
	}

	.check_box {
		margin-bottom: 10upx;
		background: rgb(236, 245, 255);
		width: 200rpx;
		height: 50rpx;
		display: flex;
		margin-right: 10upx;
		color: rgb(64, 158, 255);
	}

	.cketext {}

	.list-item {
		padding: 10px 15px;
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
	}

	.sub-title {
		color: $uni-text-color-grey;
		font-size: 12px;
	}

	.item-title {
		font-size: 16px;
	}

	.item-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.item-left {
		font-size: 16px;
		text-align: left;
	}

	.item-value {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
	}

	.item-label {
		font-size: 16px;
	}

	.item-placeholder {
		color: $uni-text-color-grey;
		font-size: 16px;
	}

	.tips {
		color: $uni-color-error;
		font-size: 12px;
		padding-left: 16px;
		padding-right: 16px;
	}

	.radio-group {
		padding-bottom: 10px;
		padding-left: 16px;
		padding-right: 16px;
	}

	.flex-row-center {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.grey-block {
		height: 10px;
		background-color: $uni-bg-color-grey;
	}
</style>
