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

				<view class="chou_tit">
					地区
				</view>
				<view>
					<view class="list-itemk" @tap="handleTap('picker3')">
						<!-- <text class="sub-title">省市区三级选择</text> -->
						<view class="item-content">
							<!-- <text class="item-title">绑定值:{{ JSON.stringify(value3) }}</text> -->
							<view class="item-value">
								<text class="item-label">{{ label3 }}</text>
								<text v-if="!label3" class="item-placeholder">请选择地区</text>
							</view>
						</view>
						<lb-picker ref="picker3" v-model="value3" mode="multiSelector" :list="list1" :level="3" :dataset="{ name: 'label3' }"
						 @change="handleChange" @confirm="handleConfirm" @cancel="handleCancel">
						</lb-picker>
					</view>
					<view class="grey-block"></view>
				</view>
				<view class="chou_tit">
					行业
				</view>
				<view>
					<view class="list-itemk" @tap="handleTap('picker4')">
						<!-- 	<text class="sub-title">绑定默认值</text> -->
						<view class="item-content">
							<!-- 	<text class="item-title">绑定值:{{ JSON.stringify(value4) }}</text> -->
							<view class="item-value">
								<text class="item-label">{{ label4 }}</text>
								<text v-if="!label4" class="item-placeholder">请选择行业</text>
							</view>
						</view>
						<lb-picker ref="picker4" v-model="value4" mode="multiSelector" :list="listhy" :level="3" :dataset="{ name: 'label4' }"
						 @change="handleChange" @confirm="handleConfirm" @cancel="handleCancel">
						</lb-picker>
					</view>
					<view class="grey-block"></view>
				</view>
				<view class="chou_tit">
					来源
				</view>
				<view class="uni-list-cell-db">
					<picker style="width: 100%;" v-model="source_flag" @change="sourceChange" :value="source_flag" :range="sourceArray" range-key="name">
						<view class="uni-input" v-if="sourceArray[source_flag]">{{sourceArray[source_flag].name}}</view>
						<view class="uni-input" v-else>请选择来源</view>

					</picker>

				</view>
				<view class="bottombtn">
					<button type="primary" class="btn btn1" @click="clox()">重置</button>
					<button type="primary" class="btn " @click="getList('search')">确定</button>
				</view>
			</view>

		</uni-drawer>


		<view class="topview">
			<view class="fh" @click="fhsy()"></view>
			<button type="primary" class="search-btn" @click="getList('search')"></button>
			<input class="se-input" name="nickname" placeholder="请输入客户名称" v-model="kword" /><button type="primary" size="small"
			 class="shai-btn" @click="drawer()">筛选</button></button> <button type="primary" size="small" class="shai-btn1"
			 @click="add()">新增</button></view>
		<!-- 数据列表 -->
		<view class="content">
			<z-paging ref="paging" @query="queryList" :list.sync="dataList" style="height: calc(100% - 80rpx);">
				<!-- 设置自定义emptyView组件，非必须。空数据时会自动展示空数据组件，不需要自己处理 -->
				<empty-view slot="empty"></empty-view>
				<!-- list数据，建议像下方这样在item外层套一个view，而非直接for循环item，因为slot插入有数量限制 -->
				<view>
					<view class="list-item" v-for="(item,index) in dataList" :key="index" @tap="goDetail(item)">
						<view class="list-text">
							<view class="list_tit">{{item.name}}</view>
							<view class="tag_k" v-for="(user, i) in item.tags.data" :key="i">
								{{user.t_tab}}

							</view>
						</view>
						<view class="list-item-top">
							<view class="list-dqk">
								<view class="list-dq1">联系人：</view>
								<view class="list-dq2">{{item.linkman.txt}}</view>
								<view class="list-dq1">电话：</view>
								<view class="list-dq2">{{item.phone}}
									<image class="tel-img" src="../../static/tel.png" mode="aspectFit" @tap.stop="call_phone(item)"></image>
								</view>
								<view class="list-dq1">到期时间：</view>
								<view class="list-dq2">跟踪还剩{{item.dt_link}}天 | 沟通还剩{{item.dt_track}}天</view><view class="list-dq1">审核状态：</view>
								<view class="list-dq2">审核状态：延期：{{item.delay_status|delayStatus}} | 跟进：{{item.audit_status|numToMean}}</view>


							</view>

						</view>
						<view class="list-item-bot">
							<span @tap.stop="pizhu(item)">填写批注</span> <span @tap.stop="chufang(item)">出访申请</span> <span>详情</span>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
	<foot-part @openLogin="openLogin"></foot-part>
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
				new_goods_show: 0,
				dataList: [],
				value1: [],
				label1: '',
				value2: [],
				label2: '',
				value3: [],
				label3: '',
				value4: [],
				label4: '',
				listhy: [],
				list1: [],
				list2: [],
				source_flag: '',
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
				ktags: '',
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
				token: this.$token
			}
		},
		onLoad(options) {
			this.getList();
			this.tage();
			this.locations();
			this.industrys();
		},
		//过滤器
		filters: {
			numToMean: function(value) {
				let audit = ''
				if (value === 0) {
					audit = '--'
					return audit
				} else if (value === 1) {
					audit = '体系审核通过'
					return audit
				} else if (value === 2) {
					audit = '体系审核拒绝'
					return audit
				} else if (value === 3) {
					audit = '总经办审核通过'
					return audit
				} else if (value === 4) {
					audit = '总经办审核通过'
					return audit
				}

				return audit
			},

			delayStatus: function(value) {
				let delay = ''
				if (value === "-1") {
					delay = '--'
					return delay
				} else if (value === "0") {
					delay = '待审核'
					return delay
				} else if (value === "1") {
					delay = '审核通过'
					return delay
				} else if (value === "2") {
					delay = '已拒绝'
					return delay
				}

				return delay
			},

		},


		methods: {
			queryList(pageNo, pageSize) {

				uni.request({
					url: this.$burl + '/api/customer/clue/my',
					header: {
						'Authorization': this.$token
					},
					data: {
						limit: pageSize,
						pn: pageNo,
					},
					success: (res) => {
						this.$refs.paging.addData(res.data.data.data);
					},
					fail: (err) => {
						//console.log(err)
					}
				})

			},
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
			//线索来源
			sourceChange(e) {
				console.log(e);
				this.source_flag = e.detail.value;
			},
			//抽屉打开
			drawer() {
				this.$refs.drawer.open();
			},
			//抽屉关闭
			clox() {
				// this.$refs.drawer.close();
				this.allChecked = false;
				this.checkedArr = [];
				this.value3 = [];
				this.value4 = [];
				this.label3 = '';
				this.label4 = '';
				this.source_flag = '';
			},

			//地址接口
			locations() {
				uni.request({
					url: this.$burl + '/api/locations_cascade',
					header: {
						'Authorization': this.$token
					},
					success: (res) => {
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
						'Authorization': this.$token
					},
					success: (res) => {

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
						'Authorization': this.$token
					},
					success: (res) => {
						let checklist = res.data.data.data;
						let arr = []
						let key;
						for (key in checklist) {
							this.checkboxData.push({
								'value': checklist[key].id,
								'label': checklist[key].tab
							})
						}

					},
					fail: (err) => {
						//console.log(err)
					}
				})
			},
			//undefined，null转空
			praseStrEmpty(str) {
				if (!str || str == "undefined" || str == "null") {
					return "";
				}
				return str;
			},

			//列表接口
			getList(type) {
				console.log(this.value3);
				let dq = this.value3.pop() + '';
				let hy = this.value4.pop() + '';
				uni.showLoading();
				uni.request({
					url: this.$burl + '/api/customer/clue/my',
					header: {
						'Authorization': this.$token
					},
					data: {
						kword: this.kword,
						ktags: this.checkedArr.join(','),
						kloc: this.praseStrEmpty(dq),
						kind: this.praseStrEmpty(hy),
						ksource: this.source_flag,
					},
					success: (res) => {
						uni.hideLoading();
						if (res.data.data.status == 200) {
							this.$refs.drawer.close();
							this.dataList = res.data.data.data;
							if (this.dataList.length == 0) {
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
				console.log()
				uni.navigateTo({
					url: '/pages/details/details?id=' + item._id
				})
			},
			// 跳转出访表单页面
			chufang(item) {
				console.log(item)
				let chufang = {
					id: item._id,
					name: item.name,
					address: item.address,
				}
				uni.navigateTo({
					url: "./visit?chufang=" + encodeURIComponent(JSON.stringify(chufang)),
				})
			},
			
			//新增
			add(){
				uni.navigateTo({
					url: '/pages/addclue/addclue'
				})
			},
			
			//跳转批注页面
			pizhu(item) {
				uni.navigateTo({
					url: './pizhu?id=' + item._id
				})
			},
			fhsy(){
				uni.navigateBack();
			}
		}
	}
</script>

<style scoped>
	page {
		height: 100%;
	}
/deep/.uni-input-input{ }
/deep/.uni-input-placeholder{font-size: 28upx;color: #ccc;background:#fafafa;}

	.contentk {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
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



	.list-item-top {
		font-size: 24upx;
		width: 100%;
		margin-top: 10upx;
	}


	.list-item-bot {
		width:98%;
		display: flex;
		margin-top: 15upx;
		justify-content:space-between;
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
		height: 70upx;
		line-height: 70upx;
		justify-content: flex-start;
	}

	.list_tit {
		display: flex;
		font-size: 32upx;
		color: #333333;
	}

	.hui {
		display: flex;
		color: #999999;
		font-size: 24upx;
		margin-left: 10upx;
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
		margin-left: 10upx;
	}

	.list-dq {
		width: 100%;
		text-align: left;
		padding-top: 1upx;
		padding-bottom: 1upx;
		display: flex;
		justify-items: flex-start;
	}



	.list-qd2 {
		margin-left: 10upx;
	}

	.se-input {
		width:55%;
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
		background: url(../../static/ss.png) no-repeat;
		background-size: 70%;
		background-position: center;
		position: absolute;
		left:410rpx;
		border: none;
	}
	.fh{ width:60upx;height:60upx;background: url(../../static/fh.png) no-repeat left center; background-size:80%;}

	.search-btn:after {
		border: none;
	}

	.shai-btn {
		width: 15%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28upx;
		color: #bfbcbc;
		background: url(../../static/shaixun.png) no-repeat #fff;
		background-size: 40%;
		background-position: 8upx 5upx;
		text-indent: 25px;
		padding-left: 0;
		padding-right: 0;
		border-radius: 0;
		margin-left: 15upx;
	}

	.shai-btn1 {
		width: 15%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28upx;
		color: #bfbcbc;
		background: url(../../static/addj.png) no-repeat #fff;
		background-size: 40%;
		background-position: 3upx 5upx;
		text-indent: 20px;
		padding-left: 0;
		padding-right: 0;

		border-radius: 0;
	}

	.shai-btn1:after {
		border: none;
	}

	.shai-btn:after {
		border: none;
	}

	.topview {
		width: 96%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
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

	.tel-img {
		width: 46upx;
		height: 46upx;
		margin-left: 10upx;
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


	.list-item {
		width: 90%;
		flex-direction: column;
		color: #666666;
		margin-bottom: 25upx;
		padding: 3% 4%;
		border: 1px #e4e4e4 solid;
		display: flex;
		border-radius: 5px;
		align-items: center;
		justify-content: center;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;


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

	.wk_n {
		width: 96%;
		margin: 0 auto;
		height: 100%;
		display: flex;
		flex-direction: column;

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

	.chou_tit {
		padding: 30upx 10upx;
		color: #666666;
	}

	.list-itemk {
		display: flex;
		background: #f6f6f6;
		height: 70upx;
		line-height: 70upx;
		border-radius: 5px;
		text-align: left;
		text-indent: 20upx;
		color: #666666;

	}

	.uni-input {
		color: #666666;
	}

	.bottombtn {
		width: 100%;
	left:0;
		position: fixed;
		bottom: 0;
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
		background: #d7e8fc;
		color: #316fd4;
	}

	/deep/uni-button:after {
		border: none
	}

	/deep/.uni-checkbox-input {
		background: #f4f4f4;
		border: none;
		width: 100%;
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
</style>
