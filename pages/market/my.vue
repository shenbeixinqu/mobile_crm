<template>
	<view class="contentk">
		<uni-drawer ref="drawer" mode="right" :width="drawWid">
			<view class="wk_n">
				<view class="chou_tit">
					出访状态
				</view>
				<view class="uni-list-cell-db">
					<picker style="width: 100%;" mode="selector" v-model="cfstage" :value="cfstage" :range="stagesArr" @change="stageRequire"
					 range-key="name">
						<view class="uni-input" v-if="stagesArr[cfstage]" >{{stagesArr[cfstage].name}}</view>
						<view class="uni-input" v-else style="color: #ddd;">请选择出访状态</view>
					</picker>
				</view>
				<view class="chou_tit">
					出访结果
				</view>
				<view class="uni-list-cell-db">
					<picker style="width: 100%;" mode="selector" v-model="cfresult" :value="cfresult" :range="resultArr" @change="resultRequire"
					 range-key="name">
						<view class="uni-input" v-if="resultArr[cfresult]" >{{resultArr[cfresult].name}}</view>
						<view class="uni-input" v-else style="color: #ddd;">请选择出访结果</view>
					</picker>
				</view>
				<view class="chou_tit">
					洽谈业务
				</view>
				<view class="uni-list-cell-db">
					<picker style="width: 100%;" mode="selector" v-model="e_xqclass" :value="e_xqclass" :range="proArray" @change="proRequire"
					 range-key="name">
						<view class="uni-input" v-if="proArray[e_xqclass]" >{{proArray[e_xqclass].name}}</view>
						<view class="uni-input" v-else style="color: #ddd;">请选择洽谈业务</view>
					</picker>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="chou_tit">
							开始日期
						</view>
						<view class="uni-list-cell-db">
							<picker style="width: 100%; display:block;" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
								<view class="uni-input" v-if="date==''" style="color:#ddd;">请选择开始日期</view>
								<view class="uni-input" v-else >{{date}}</view>
							</picker>
						</view>
						<view class="chou_tit">
							结束日期
						</view>
						<view class="uni-list-cell-db">
							<picker style="width: 100%;" mode="date" :value="jdate" :start="jstartDate" :end="jendDate" @change="jbindDateChange">
								<view class="uni-input" v-if="jdate==''" style="color:#ddd;">请选择结束日期</view>
								<view class="uni-input" v-else >{{jdate}}</view>
							</picker>
						</view>
					</view>
				</view>

				<view class="bottombtn">
					<button type="primary" class="btn2" @click="guangbi()">取消</button>
					<button type="primary" class="btn1" @click="clox()">重置</button>
					<button type="primary" class="btn " @click="getList('search')">确定</button>
				</view>
			</view>
		</uni-drawer>
		<e-modal :visible.sync="visible">
			<view class="uni-padding-wrap">
				<form @submit="formSubmit">
					<view class="uni-form-item">
						<view class=title>取消原因</view>

						<textarea class="uni-inputa" @blur="bindTextAreaBlur" name="refuseReason" placeholder="请输入取消原因" />
						</view>
					<view class="uni-btn-v">
						<button class="btn btn1" @click="qx">取消</button>
						<button form-type="submit" class="btn ">提交</button>
						
					</view>
				</form>
			</view>
		</e-modal>
		
		<view class="topview">
			<button type="primary" class="search-btn" @click="getList('search')"></button>
			<input class="se-input" name="nickname" placeholder="请输入客户名称" v-model="kword" @confirm="doSearch('search')">
			<button type="primary" size="small" class="shai-btn" @click="drawer()">筛选</button>
		</view>
		<view class="content">
					<view v-if="showxs" style="width: 100%; display: flex; color: #ddd; text-align: center; height: 100%; align-items: center; justify-content: center;">----暂无数据----</view>
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
								
								<view class="list-dq1">拜访人：</view>
								<view class="list-dq2">{{item.human}}</view>
								<view class="list-dq1">电话：</view>
								<view class="list-dq2">{{item.tel}}</view>
								<view class="list-dq1">洽谈业务：</view>
								<view class="list-dq2">{{item.pClassname}}</view>
								<view class="list-dq1">出访时间：</view>
								<view class="list-dq2">{{item.starttime}}</view>
									<view class="list-dq1">出访结果:</view>
								<view class="list-dq2">{{item.result}}</view>
								
							</view>
						</view>
					
						<view class="list-item-bot" v-if="item.status == '正常'">
							<span @click="openBox(item)" v-if="item.result === null">取消出访</span>
							<span @click="visitResult(item)" v-if="item.result === null" style="text-align:center;">填写出访结果</span>
							<span @click="myDetail(item)" style="text-align: right;">详情</span>
						</view>
						<view class="list-item-bot" v-else >
							<span  @click="myDetail(item)" style="text-align: right;">详情</span>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
		<foot-part @openLogin="openLogin"></foot-part>
	</view>
</template>

<script>
	var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js")
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	
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
	
	export default{
		data(){
			return{
				dataList:[],
				kword:"",
				visible:false,
				reason: "",
				id: "",
				// 抽屉需要用到的值
				date: '',
				startDate: getDate('start'),
				endDate: getDate('end'),
				jdate: '',
				jstartDate: getDate('start'),
				jendDate: getDate('end'),
				drawWid: '100%',
				stagesArr: [
					{
						'value': 0,
						'name': "全部"
					},
					{
						'value': 1,
						'name': "正常"
					},
					{
						'value': 2,
						'name': "取消"
					}
				],
				resultArr: [
					{
						'value': 0,
						'name': "全部"
					},
					{
						'value': 1,
						'name': "未填写"
					},
					{
						'value': 2,
						'name': "已填写"
					}
				],
				e_xqclass:"", //产品类型
				e_xqclass_val:"",
				cfstage:"", // 出访状态
				cfstage_val:"",
				cfresult:"",// 出访结果
				cfresult_val:"",
				proArray:[],
				checkboxData: [],
				checkedArrzt: "", //出访状态复选框选中的值
				showxs: false,
			}
		},
		onLoad(options){
			// this.getList();
			this.dataDict();
			this.doSearch();
		},
		onShow() {
			this.getList('search');
		},
		methods:{
			queryList(pageNo,pageSize){
				uni.request({
					url: this.$burl + '/api/visits/my',
					header:{
						'Authorization': "JWT " + getApp().globalData.token
					},
					data: {
						limit: pageSize,
						pn:pageNo,
						kword:this.kword,
						kstatus: this.cfstage_val,
						ksdt: this.date,
						kedt: this.jdate,
						kpc_id: this.e_xqclass_val,
						kresult: this.cfresult_val
					},
					success: (res) => {
						if (res.data.data == '') {
							this.showxs = true;
						} else {
							this.$refs.paging.addData(res.data.data.data);
						}
					},
					fail: (err) => {
						uni.showModal({
							title: "提示",
							content: res.data.msg
						})
					}
				})
			},
			//搜索
			doSearch(type) {
				uni.showLoading();
				uni.request({
						url: this.$burl + '/api/visits/my',
					header: {
						'Authorization': "JWT " + getApp().globalData.token
					},
					data: {
						kword: this.kword,
					},
					success: (res) => {
						uni.hideLoading();
						if (res.data.data.status == 200) {
							this.dataList = res.data.data.data;
						}
						else{
								uni.showModal({
									title:"提示",
									content:res.data.msg,
									 showCancel:false,
								})
							}
						},
						fail: (err) => {
							uni.showModal({
								title:"提示",
								content:res.data.msg,
								
							})
						}
				})
			},
			getList(type){
				if (this.date && this.jdate && this.jdate < this.date){
					uni.showModal({
						title:"提示",
						content:"结束日期小于开始日期",
						showCancel:false
					})
				} else {
					uni.showLoading();
					uni.request({
						url: this.$burl + '/api/visits/my',
						header:{
							'Authorization': "JWT " + getApp().globalData.token
						},
						data: {
							kword:this.kword,
							kstatus: this.cfstage_val,
							ksdt: this.date,
							kedt: this.jdate,
							kpc_id: this.e_xqclass_val,
							kresult: this.cfresult_val
						},
						success:(res) => {
						uni.hideLoading();
							if (res.data.data.status === 200){
								this.$refs.drawer.close();
								this.dataList = res.data.data.data;
								
							} 	else{
								uni.showModal({
									title:"提示",
									content:res.data.msg,
									 showCancel:false,
								})
							}
						},
						fail: (err) => {
							uni.showModal({
								title:"提示",
								content:res.data.msg,
								
							})
						}
					})
				}
			},
			qx(){
				this.visible = false
			},
			openBox(item){
				this.visible = true,
				this.id = item._id
			},
			bindTextAreaBlur: function(e){
				this.reason = e.detail.value
			},
			// 抽屉的所有方法
			//抽屉打开
			drawer() {
				this.$refs.drawer.open();
			},
			guangbi(){
				this.$refs.drawer.close();
				this.e_xqclass = "",
				this.cfresult = "",
				this.cfstage = "",
				this.date = "",
				this.jdate = ""
				},
			//抽屉关闭
			clox() {
				this.e_xqclass = "",
				this.cfresult = "",
				this.cfstage = "",
				this.date = "",
				this.jdate = ""
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			jbindDateChange: function(e) {
				this.jdate = e.detail.value
			},
			dataDict(){
				uni.request({
					url:this.$burl + "/api/getchoices",
					header:{
						'Authorization': "JWT " + getApp().globalData.token
					},
					data:{
						kt:"pro_class"
					},
					success: (res) => {
						if (res.data.data.status == 200){
							var obj = res.data.data.pro_class;
							var arr = [];
							for(var key in obj){ 
							    var item = {}; 
							    item["name"] = obj[key];
								item["value"] = key;
							    arr.push(item); 
							}
							this.proArray = arr
							// this.proArray = res.data.data.pro_class
						} else {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					}
				})
			},
			proRequire(e){
				this.e_xqclass = e.detail.value
				this.e_xqclass_val = this.proArray[this.e_xqclass].value
			},
			stageRequire(e){
				this.cfstage = e.detail.value
				this.cfstage_val = this.stagesArr[this.cfstage].value
			},
			resultRequire(e){
				this.cfresult = e.detail.value
				this.cfresult_val = this.resultArr[this.cfresult].value
			},
			formSubmit: function(e){
				var rule = [{
					name:"refuseReason",
					checkType: "null",
					checkRule: "",
					errorMsg: "取消原因不能为空"
				}];
				// 进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.request({
						url:this.$burl + '/api/visits/' + this.id,
						header: {
							'Authorization': "JWT " + getApp().globalData.token
						},
						method:"DELETE",
						data:{
							remark: this.reason
						},
						success: (res) => {
							if (res.data.data.status == 200){
								this.visible = false
								this.getList('search')
							} else {
								uni.showModal({
									title:"提示",
									content:res.data.msg,
									showCancel:false
								})
							}
						}
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					})
				}
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
/deep/.uni-input-input{ font-size: 28upx;}
/deep/.uni-input-placeholder{font-size: 28upx;color: #ccc;background:#fafafa;}
	.anbtn {
		width: 45%;
	}
	.uni-input {
		color: #666666;
	}
	.wk_n {
		width: 96%;
		margin: 0 auto;
		height: 100%;
		display: flex;
		flex-direction: column;
	
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


	.uni-inputa {
	height:100rpx;
	width: 93%;
	margin-top: 20upx;
	line-height:10upx;
	padding: 15rpx 25rpx;
	line-height: 50rpx;
	font-size: 28rpx;
	background: #FFF;
	flex: 1;
	border: 1px #ddd solid;
	border-radius: 10upx;
	color: grey;
	}

	.btn {
		width: 50%;
		height:100upx;
		line-height: 100upx;
		font-size: 28upx;
		background: #4873c1;
		border-radius: 0;
		bottom: 0;
	}

	.btn1 {
		height:100upx;
		line-height: 100upx;
		font-size: 28upx;
		background: #4873c1;
		border-radius: 0;
		background: #d7e8fc;
		width: 25%;
		color: #316fd4;
	}
	.btn2 {
		height:100upx;
		line-height: 100upx;
		font-size: 28upx;
		background:url(../../static/a.gif) no-repeat center right #d7e8fc;
		border-radius: 0;
		width: 25%;
		color: #333;
	}

	.btn1:after{
		border-radius:0;
			border: none;
	}
	
	
	.btn2:after{
		border-radius:0;
		border: none;
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

	.check_bj {
		width: 100%;
		display: flex;
		justify-content: center;
		line-height: 70upx;
		margin-bottom: 10upx;
	}
	
	.check_box {
		margin-bottom: 10upx;
		width: 200rpx;
		height: 70upx;
		line-height: 70upx;
		display: flex;
		margin-right: 10upx;
		color: rgb(64, 158, 255);
		position: relative;
	}
	
	.check_box_k1 {
		width: 30%;
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
	.check_box_k2 {
		width: 60%;
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
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
	
	.chou_tit {
		padding: 30upx 10upx;
		color: #666666;
	}
	.item-placeholder {
		color: $uni-text-color-grey;
		font-size: 16px;
	}
	
	.lable-box {
		width: 100%;
		display: block;
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
		justify-content:flex-end;
		color: #4873c1;
		font-size: 28upx;
	}
	
    .list-item-bot span{ width: 33.333%; float: left;}
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
		font-size: 32upx;
		color: #333333;
	}
	.se-input {
		width:76%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 22upx;
		text-indent: 1rem;
		border: 1px #e4e4e4 solid;
		border-radius: 10upx;
		float: left;
	}
	
		.list_track{ color:#666666!important;}
	.search-btn {
		z-index: 500;
		height: 60rpx;
		width: 60rpx;
		background: url(../../static/ss.png) no-repeat;
		background-size: 70%;
		background-position: center;
		position: absolute;
		left:495rpx;
		border: none;
	}
	
	.search-btn:after {
		border: none;
	}
	
	.shai-btn {
		width: 15%;
		float: right;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28upx;
		color: #888;
		margin-right:20upx;
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
	
	.topview {
		width: 96%;
	
		
		align-items: center;
	}
	
	.uni-btn-v {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding-top: 30upx;
		padding-bottom: 30upx;
	}
	.btn {
			width: 50%;
			height: 100upx;
			line-height: 100upx;
			font-size: 28upx;
			background: #4873c1;
			border-radius: 0;
			bottom: 0;
			color: #fff;
		}
	
		.btn1 {
			background: #d7e8fc;
			color: #316fd4;
			border-radius: 0;
		}
	.btn1:after{border-radius: 0;}
	.uni-form-item {
		display: flex;
		width: 100%;
		height: 100px;
		padding: 10rpx 0;
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
	
	.uni-padding-wrap {
		width: 90%;
		padding-top: 20upx;
		padding-bottom: 20upx;
	}
	
	
</style>
