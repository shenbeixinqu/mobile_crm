<template>
	<view class="contentk">
		<e-modal :visible.sync="visible">
			<view class="uni-padding-wrap uni-common-mt">
				<form @submit="formSubmit" @reset="formReset">
					<view class="uni-form-item uni-column">
						<view class="title">姓名</view>
						<input class="uni-input" v-model="gname" name="nickname" placeholder="请输入姓名" />
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">电话号码</view>
						<input class="uni-input" v-model="gphone" name="nphone"
							placeholder="格式参考：024-12345678或13612345678" />
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">职务</view>
						<input type="text" name="nzw" v-model="source_flag" :value="source_flag" hidden="true" />
						<picker @change="sourceChange" :range="sourceArray" range-key="name">
							<view class="uni-input" v-if="sourceArray[source_flag]">{{
                sourceArray[source_flag].name
              }}</view>
							<view class="uni-input" v-else>请选择职务</view>
						</picker>
					</view>

					<view class="uni-btn-v">
						<button class="btn btn1" @click="qx">取消</button>
						<button form-type="submit" class="btn">提交</button>
					</view>
				</form>
			</view>
		</e-modal>

		<uni-drawer ref="drawer" mode="right" :width="drawWid">
			<scroll-view scroll-y class="wk_n">
				<view class="chou_tit">客户名称：{{ tableList.name }}</view>
				<view class="list-item" v-for="item in tableDatazi" :key="item.id">
					<view class="list-itemleft">
						<view>资质类型：{{ item.qualstype }}</view>
						<view>上传时间：{{ item.addtime }}</view>
					</view>
					<view class="list-img">
						<image style="width: 100%; height: 300upx; background-color: #eeeeee"
							@click="clickImg(item.scan)" :src="imgurl + item.scan" mode="aspectFit"></image>
					</view>
				</view>
				<button type="primary" class="anbtn" @click="clox()">返回</button>
			</scroll-view>
		</uni-drawer>

		<scroll-view scroll-y class="classbox">
			<view class="tit">基本资料</view>
			<view class="bottxt">
				<view class="divtableleft">
					<view class="divtext">客户名称：</view>
					<view class="divright">{{ tableList.name }}</view>
					<view class="divtext">客户地区：</view>
					<view class="divright">{{ tableList.loc_lead }}</view>
					<view class="divtext">详细地址：</view>
					<view class="divright">{{ tableList.address }}</view>
					<view class="divtext">企业法人：</view>
					<view class="divright">{{ tableList.legal }}</view>
					<view class="divtext">客户电话：</view>
					<view class="divright">{{ tableList.phone }}</view>
					<view class="divtext">客户来源：</view>
					<view class="divright">{{ tableList.source_flag }}</view>
					<view class="divtext">客户资质：</view>
					<view class="divright lanse" @click="drawer()"><a>请点击了解</a></view>
				</view>
				<view class="divtableleft1" v-if="isMore">
					<view class="divtext">传真：</view>
					<view class="divright">{{ tableList.fax }}</view>
					<view class="divtext">办公邮箱：</view>
					<view class="divright">{{ tableList.mail }}</view>
					<view class="divtext"> 邮编：</view>
					<view class="divright">{{ tableList.zipcode }}</view>
					<view class="divtext">人员规模：</view>
					<view class="divright">{{ tableList.employees }}</view>
					<view class="divtext">成立日期：</view>
					<view class="divright">{{ tableList.openingdate }}</view>
					<view class="divtext">注册资金：</view>
					<view class="divright">{{ tableList.registered }}</view>
					<view class="divtext">主营业务：</view>
					<view class="divright">{{ tableList.business }}</view>
				</view>
				<view class="divgd" @click="handleMore" v-if="isShow">了解更多客户信息>></view>
				<view class="divgd" @click="handleShou" v-if="isSh">收回>></view>
			</view>
			<view class="tit">联系人 <view class="txtright" @click="openlxr"></view>
			</view>
			<view class="contactus">
				<view class="contactus_top">
					<view>姓名</view>
					<view>电话号码</view>
					<view>职务</view>
				</view>
				<view class="contactus_bottom" v-for="item in linkmans" :key="item.value">
					<view>{{ item.realname }}</view>
					<view @tap.stop="call_phone(item)">{{ item.phone }}
						<image class="tel-img" src="../../static/tel.png" mode="aspectFit"></image>
					</view>
					<view>{{ item.duty }}</view>
				</view>
			</view>

			<view style="height: 100upx"></view>
		</scroll-view>

		<foot-part @openLogin="openLogin"></foot-part>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue";
	var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js");
	export default {

		components: {
			uniDrawer,
		},
		props: {
			activeId: {
				type: String, // 指定传入的类型
			}
		},
		data() {
			return {
				value: "",
				visible: false,
				gname: "",
				gphone: "",
				drawWid: "100%",
				isShow: true,
				isMore: false,
				isSh: false,
				tableList: [],
				tableDatazi: [],
				linkmans: [],
				nzw: "",
				source_flag: "",
				source_flagvalue: "",
				sourceArray: [{
						name: "老板/总经理",
						value: "1",
					},
					{
						name: "部门经理/主管",
						value: "2",
					},
					{
						name: "职员",
						value: "9",
					},
					{
						name: "其他",
						value: "0",
					},
				],
			};
		},

		mounted() {
			


			this.imgurl = this.$imgurl;
			this.showToast();
			this.kehu();
			this.zizhi();
		},

		methods: {
			//职务
			sourceChange(e) {
				this.source_flag = e.detail.value;
				this.source_flagvalue = this.sourceArray[this.source_flag].value;
			},

			qx() {
				this.visible = false;
			},
			openlxr() {
				this.visible = true;
			},
			handleCancel() {},
			//表单
			formSubmit: function(e) {
				//定义表单规则
				var rule = [{
						name: "nickname",
						checkType: "string",
						checkRule: "1,10",
						errorMsg: "请输入姓名",
					},
					{
						name: "nphone",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: "请输入正确联系方式",
					},
					{
						name: "nzw",
						checkType: "null",
						checkRule: "",
						errorMsg: "职务不能为空",
					},
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none",
					});
					uni.request({
						url: this.$burl + "/api/customer/" + this.activeId + "/linkman",
						header: {
								'Authorization': "JWT " + getApp().globalData.token,
						},
						method: "POST",
						data: {
							realname: this.gname,
							phone: this.gphone,
							identity: this.source_flagvalue,
						},
						success: (res) => {
							if (res.data.data.status == 200) {
								uni.showToast({
									title: res.data.msg,
									icon: "none",
								});
								this.kehu();
								this.visible = false;
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none",
								});
								this.visible = false;
							}
						},
						fail: (err) => {
							uni.showModal({
								title: "提示",
								content: res.data.msg,
								showCancel: false,
							});
						},
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none",
					});
				}
			},
			formReset: function(e) {},

			//抽屉打开
			drawer() {
				this.$refs.drawer.open();
			},
			
			
			//抽屉关闭
			clox() {
				this.$refs.drawer.close();
			},
			
			
			//更多
			handleMore() {
				this.isMore = !this.isMore;
				this.isShow = !this.isShow;
				this.isSh = !this.isSh;
			},
			//收回
			handleShou() {
				this.isMore = false;
				this.isSh = false;
				this.isShow = true;
			},
			//拨打电话
			call_phone(item) {
				uni.makePhoneCall({
					phoneNumber: item.phone,
					success: (res) => {},
					// 失败回调
					fail: (res) => {
						this.call_phone(); //重复调用一次
					},
				});
			},
			//客户概况接口
			kehu() {
				uni.request({
					url: this.$burl + "/api/customer/info",
					header: {
						Authorization: this.$token
					},
					data: {
						id: this.activeId,
					},
					success: (res) => {
						uni.hideLoading();
						if (res.data.data.status == 200) {
							this.tableList = res.data.data.data;
							this.linkmans = res.data.data.data.linkmans;
						}
					},
					fail: (err) => {
						uni.showModal({
							title: "提示",
							content: res.data.msg,
							showCancel: false,
						});
					},
				});
			},

			//资质
			zizhi() {
				uni.request({
					url: this.$burl + "/api/customers_quals/" + this.activeId,
					header: {
						Authorization: this.$token
					},
					data: {},
					success: (res) => {
						uni.hideLoading();
						if (res.data.data.status == 200) {
							this.tableDatazi = res.data.data.data;
						}
					},
					fail: (err) => {
						uni.showModal({
							title: "提示",
							content: res.data.msg,
							showCancel: false,
						});
					},
				});
			},
			// 点击资质放大
			clickImg(logurl) {
				let imgsArray = [];
				imgsArray[0] = this.imgurl + logurl;
				uni.previewImage({
					current: 0,
					urls: imgsArray,
				});
			},
			//表单提交

			showToast(title) {
				uni.showToast({
					title: title,
					icon: "none",
				});
			},
		},
	};
</script>

<style scoped>
	page {
		height: 100%;
	}

	.classbox {
		width: 95%;
		height: 100%;
		overflow: hidden;
	}

	.uni-btn-v {
		width: 90%;
		margin: 30upx auto 30upx auto;
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
		color: #fff;
	}

	.btn1 {
		background: #d7e8fc;
		color: #316fd4;
	}

	.btn1:after {
		border-radius: 0;
	}

	.contentk {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tit {
		width: 98%;
		color: #666666;
		font-size: 30upx;
		height: 80upx;
		line-height: 80upx;
		text-align: left;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.txtright {
		width: 60upx;
		height: 60upx;
		background-image: url(../../static/zj.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100%;
	}

	.tel-img {
		width: 46upx;
		height: 46upx;
		margin-left: 10upx;
	}

	.bottxt {}

	.contactus {
		width: 98%;
		border-bottom: none;
		margin-bottom: 150upx;
	}

	.contactus_top {
		line-height: 80upx;
		height: 80upx;
		flex-direction: row;
		display: flex;
		font-size: 24upx;
	}

	.contactus_top view {
		width: 30%;
		background: #f2f2f2;
		text-align: center;
		border: 1px #e4e4e4 solid;
		border-bottom: none;
		margin-left: -1px;
		font-size: 30upx;
	}

	.contactus_top view:nth-child(2) {
		width: 40%;
	}

	.contactus_bottom {
		line-height: 80upx;
		height: 80upx;
		flex-direction: row;
		display: flex;
		font-size: 30upx;
	}

	.contactus_bottom view {
		width: 30%;
		background: #f2f2f2;
		text-align: center;
		border: 1px #e4e4e4 solid;
		margin-left: -1px;
		margin-top: -1px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.contactus_bottom view:nth-child(2) {
		width: 40%;
	}

	.divtableleft {
		width: 100%;
		line-height: 80upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		font-size: 24upx;
		border: 1px #e4e4e4 solid;
		border-bottom: none;
		background: #f2f2f2;
	}

	.divtableleft1 {
		width: 100%;
		line-height: 80upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		font-size: 24upx;
		border: 1px #e4e4e4 solid;
		border-top: none;
		border-bottom: none;
		background: #f2f2f2;
	}

	.divgd {
		color: #4873c1;
		width: 100%;
		font-size: 30upx;
		line-height: 80upx;
		text-align: right;
		height: 80upx;
	}

	.divtext {
		width: 30%;
		padding-left: 2%;
		display: flex;
		justify-content: flex-start;
		border-bottom: 1px solid #e4e4e4;
		font-size: 30upx;
	}

	.divright {
		width: 68%;
		border-bottom: 1px solid #e4e4e4;
		display: flex;
		font-size: 30upx;
	}

	.anbtn {
		width: 95%;
		height: 70upx;
		line-height: 70upx;
	}

	.lanse {
		color: #4873c1;
	}

	.lanse a {
		color: #4873c1;
	}

	.wk_n {
		width: 96%;
		margin: 0 auto;
		height: 100%;
		overflow: hidden;
		margin-bottom: 100upx;
		display: flex;
		flex-direction: column;
	}

	.chou_tit {
		padding: 10px 10px 10px 30px;
		color: 666666;
		font-size: 28upx;
		background: url(../../static/bj.png) no-repeat left center;
		background-size: 50upx;
		height: 50upx;
		line-height: 50upx;
	}

	.anbtn {
		background: #4873c1;
		width: 30%;
	}

	.list-item {
		font-size: 28upx;
		color: #666666;
		margin-bottom: 25upx;
		padding: 3%;
		border: 1px #e4e4e4 solid;
		display: flex;
		border-radius: 5px;
		position: relative;
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
		flex-direction: row;
		height: 300upx;
	}

	.list-itemleft {
		width: 60%;
		justify-content: center;
		display: flex;
		flex-direction: column;
	}

	.list-img {
		width: 35%;
		display: flex;
	}

	/* 表单 */
	.uni-padding-wrap {
		width: 100%;
		padding-top: 20upx;
		padding-bottom: 20upx;
	}

	.uni-form-item {
		display: flex;
		width: 90%;
		margin: 0 auto;
		padding: 10rpx 0;
		flex-direction: column;
	}

	.uni-form-item .title {
		padding: 10rpx 25rpx;
	}

	.uni-label {
		width: 210rpx;
		word-wrap: break-word;
		word-break: break-all;
		text-indent: 20rpx;
	}

	.uni-input {
		height: 50rpx;
		padding: 15rpx 25rpx;
		line-height: 50rpx;
		font-size: 28rpx;
		background: #fff;
		flex: 1;
		border: 1px #ddd solid;
		border-radius: 10upx;
		color: grey;
	}

	radio-group,
	checkbox-group {
		width: 100%;
	}

	radio-group label,
	checkbox-group label {
		padding-right: 20rpx;
	}

	.uni-form-item .with-fun {
		display: flex;
		flex-wrap: nowrap;
		background: #ffffff;
	}

	.uni-form-item .with-fun .uni-icon {
		width: 40px;
		height: 80rpx;
		line-height: 80rpx;
		flex-shrink: 0;
	}

	/deep/.e-modal-container {
		height: 690upx !important;
		position: relative;
		align-items: flex-start !important;
	}
</style>
