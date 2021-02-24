<template>
	<view class="contentk">
		<uni-drawer ref="drawer" mode="right" :width="drawWid">
			<view class="wk_n">
				<view class="chou_tit">
					出访状态
				</view>
				<view class="check_bj">
					<checkbox-group class="check_box_k2" @change="changeCheckboxzt">
						<view v-for="item in stagesArr" :key="item.value" class="check_box">
							<label class="lable-box">
								<checkbox :value="String(item.value)" :checked="checkedArrzt.includes(String(item.value))" :class="{'checked':checkedArrzt.includes(String(item.value))}"></checkbox>
								<text class="cketext">{{item.label}}</text>
							</label>
						</view>
					</checkbox-group>
					<checkbox-group class="check_box_k1" @change="allChoosezt">
						<label class="lable-box">
							<checkbox value="all" :class="{'checked':allCheckedzt}" :checked="allCheckedzt?true:false"></checkbox><text
							 class="cketext" style="color:rgb(64, 158, 255);">全选</text>
						</label>
					</checkbox-group>
				</view>
				<!-- <view class="chou_tit">
					一般纳税人
				</view>
				<view class="check_bj">
					<checkbox-group class="check_box_k2" @change="changeCheckboxztns">
						<view v-for="item in stagesArrns" :key="item.value" class="check_box">
							<label class="lable-box">
								<checkbox :value="String(item.value)" :checked="checkedArrztns.includes(String(item.value))" :class="{'checked':checkedArrztns.includes(String(item.value))}"></checkbox>
								<text class="cketext">{{item.label}}</text>
							</label>
						</view>
					</checkbox-group>
					<checkbox-group class="check_box_k1" @change="allChooseztns">
						<label class="lable-box">
							<checkbox value="all" :class="{'checked':allCheckedztns}" :checked="allCheckedztns?true:false"></checkbox><text
							 class="cketext" style="color:rgb(64, 158, 255);">全选</text>
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
				</view> -->
				
				<view class="bottombtn">
					<button type="primary" class="anbtn" @click="getList('search')">确定</button>
					<button type="primary" class="anbtn" @click="clox()">重置</button>
				</view>
			</view>
		</uni-drawer>
		<e-modal :visible.sync="visible">
			<view class="uni-padding-wrap">
				<form @submit="formSubmit">
					<view class="uni-form-item">
						<view class=title>取消原因</view>
						<input class="uni-input" v-model="reason" name="cancelReason" placeholder="请输入取消原因" >
					</view>
					<view class="uni-btn-v">
						<button form-type="submit" class="btn">提交</button>
						<button class="btn" @click="qx">取消</button>
					</view>
				</form>
			</view>
		</e-modal>
		
		<view class="topview">
			<button type="primary" class="search-btn" @click="getList('search')"></button>
			<input class="se-input" name="nickname" placeholder="请输入客户名称" v-model="kword">
			<button type="primary" size="small" class="shai-btn" @click="drawer()">筛选</button>
		</view>
		<view class="content">
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
								<view class="list-dq1">拜访人:{{item.human}}</view>
								<view class="list-dq1">电话:{{item.tel}}</view>
							</view>
						</view>
						<view class="list-item-top">
							<view class="list-dqk">
								<view class="list-dq1">洽谈业务:{{item.pClassname}}</view>
								<view class="list-dq1">出访时间:{{item.starttime}}</view>
							</view>
							<view class="list-dq">出访结果:{{item.result}}</view>
						</view>
						<view class="list-item-bot" v-if="item.status == '正常'">
							<span @click="openBox(item)" v-if="item.result === null">取消出访</span>
							<span @click="visitResult(item)" v-if="item.result === null">填写出访结果</span>
							<span @click="myDetail(item)">详情</span>
						</view>
						<view class="list-item-bot" v-else>
							<span @click="myDetail(item)">详情</span>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js")
	export default{
		data(){
			return{
				dataList:[],
				kword:"",
				visible:false,
				reason: "",
				id: "",
				token:"",
				// 抽屉需要用到的值
				drawWid: '100%',
				allCheckedzt: false, //是否全选
				stagesArr: [
					{
						'value': 1,
						'label': "正常"
					},
					{
						'value': 2,
						'label': "取消"
					}
				],
				checkboxData: [],
				checkedArrzt: [], //出访状态复选框选中的值
			}
		},
		onLoad(options){
			this.token = "JWT " + getApp().globalData.token
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
						// uni.showModal({
						// 	title:"提示",
						// 	content:res
						// }),
						this.$refs.paging.addData(res.data.data.data);
						console.log("cfsuc",res)
					},
					fail:(err) => {
						// uni.showModal({
						// 	title:"提示",
						// 	content:err
						// })
						console.log("cferr",err)
					}
				})
			},
			getList(type){
				// uni.showModal({
				// 	title:"this",
				// 	content:"走这里了" + this.token
				// });
				uni.request({
					url: this.$burl + '/api/visits/my',
					header:{
						'Authorization': this.$token
					},
					data: {
						kword:this.kword
					},
					success:(res) => {
						uni.showModal({
							title:"thissss",
							content:res
						})
						if (res.data.data.status === 200){
							this.$refs.drawer.close();
							this.dataList = res.data.data.data;
							setTimeout(function(){
								uni.hideLoading();
							}, 1000)
						}
					},
					fail: err => {
						// uni.showModal({
						// 	title:"thissss",
						// 	content:err
						// })
						console.log("列表错误结果", err)
					}
				})
				
			},
			qx(){
				this.visible = false
			},
			openBox(item){
				this.visible = true,
				this.id = item._id
			},
			// 抽屉的所有方法
			//抽屉打开
			drawer() {
				this.$refs.drawer.open();
			},
			//抽屉关闭
			clox() {
				console.log("抽屉关闭")
			},
			// 出访状态的多选改变
			changeCheckboxzt(e) {
				console.log("出访状态",e)
				this.checkedArrzt = e.detail.value;
				// 如果选择的数组中有值，并且长度等于列表的长度，就是全选
				if (this.checkedArrzt.length > 0 && this.checkedArrzt.length == this.stagesArr.length) {
					this.allCheckedzt = true;
				} else {
					this.allCheckedzt = false;
				}
			},
			// 全选事件
			allChoosezt(e) {
				console.log(e);
				let chooseItem = e.detail.value;
				// 全选
				if (chooseItem[0] == 'all') {
					this.allCheckedzt = true;
					for (let item of this.stagesArr) {
						let itemVal = String(item.value);
						if (!this.checkedArrzt.includes(itemVal)) {
							this.checkedArrzt.push(itemVal);
						}
					}
				} else {
					// 取消全选
					this.allCheckedzt = false;
					this.checkedArrzt = [];
				}
			},
			formSubmit: function(e){
				var rule = [{
					name:"cancelReason",
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
							'Authorization':this.$token
						},
						method:"DELETE",
						data:{
							remark: this.reason
						},
						success: (res) => {
							console.log("弹窗res",res)
							if (res.data.data.status == 200){
								uni.showModal({
									title: res.data.msg,
									icon:"none"
								})
								this.visible = false
							} else {
								uni.showModal({
									title:"提示",
									content:res.data.msg
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
	
	.anbtn {
		width: 45%;
	}
	
	.btn {
		color: #fff;
		width: 30%;
		height: 70upx;
		line-height: 70upx;
		font-size: 24upx;
		background: #4873c1;
	}
	
	.bottombtn {
		width: 80%;
		right: 10upx;
		bottom: 30upx;
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
		padding: 10px;
		color: 666666;
	}
	
	.lable-box {
		width: 100%;
		display: block;
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
		justify-content: space-between;
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
	
	.uni-btn-v {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding-top: 30upx;
		padding-bottom: 30upx;
	}
	
	.uni-form-item {
		display: flex;
		width: 100%;
		height: 100px;
		padding: 10rpx 0;
		flex-direction: column;
	}
	
	.uni-padding-wrap {
		width: 90%;
		padding-top: 20upx;
		padding-bottom: 20upx;
	}
	
</style>
