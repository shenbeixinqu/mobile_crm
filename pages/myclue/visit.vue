<template>
	<view class="contentk">
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">公司名称</view>
					<input class="uni-input1" v-model="name" name="name" placeholder="请输入姓名" :disabled="true" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title"><text class="red">*</text>出访类型</view>
					<picker v-model="v_typevalue" name="v_type" @change="sourceChange" :value="v_typevalue" :range="sourceArray"
					 range-key="name">
						<view class="uni-input" v-if="sourceArray[v_typevalue]">{{sourceArray[v_typevalue].name}}</view>
						<view class="uni-input" v-else>请选出访类型</view>

					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title"><text class="red">*</text>出访目的</view>
					<input class="uni-input" v-model="goal" name="goal" placeholder="请填写出访目的" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title"><text class="red">*</text>客户推广需求</view>
					<picker v-model="s_xqclassvalue" name="s_xqclass" @change="tuiguangChange" :value="s_xqclassvalue" :range="tgxqArray"
					 range-key="name">
						<view class="uni-input" v-if="tgxqArray[s_xqclassvalue]">{{tgxqArray[s_xqclassvalue].name}}</view>
						<view class="uni-input" v-else>请选出访类型</view>

					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title"><text class="red">*</text>客户网络意识</view>
					<picker v-model="s_wangluovalue" name="s_wangluo" @change="kehuChange" :value="s_wangluovalue" :range="wlArray"
					 range-key="name">
						<view class="uni-input" v-if="wlArray[s_wangluovalue]">{{wlArray[s_wangluovalue

						].name}}</view>
						<view class="uni-input" v-else>请选出访类型</view>

					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title"><text class="red">*</text>出访区域</view>

					<picker v-model="v_area" name="v_area" @change="cfChange" :value="v_area" :range="cfArray" range-key="name">
						<view class="uni-input" v-if="cfArray[v_area]">{{cfArray[v_area].name}}</view>
						<view class="uni-input" v-else>请选出访类型</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title"><text class="red">*</text>出访时间</view>
					<picker mode="date" :value="date" name="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input" v-if="date==''" style="color:#666;">请选择开始日期</view>
						<view class="uni-input" v-else>{{date}}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title"><text class="red">*</text>洽谈业务</view>

					<picker v-model="p_classvalue" name="p_class" @change="qtChange" :value="p_classvalue" :range="qtArray" range-key="name">
						<view class="uni-input" v-if="qtArray[p_classvalue]">{{qtArray[p_classvalue].name}}</view>
						<view class="uni-input" v-else>请选洽谈业务</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title"><text class="red">*</text>拜访人</view>
					<input class="uni-input" v-model="human" name="human" placeholder="请填写拜访人" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title"><text class="red">*</text>联系电话</view>
					<input class="uni-input" v-model="tel" name="tel" placeholder="请填写联系电话" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title"><text class="red">*</text>职务</view>
					<picker v-model="positionvalue" name="position" @change="zwChange" :value="positionvalue" :range="zwArray" range-key="name">
						<view class="uni-input" v-if="zwArray[positionvalue]">{{zwArray[positionvalue].name}}</view>
						<view class="uni-input" v-else>请选择职务</view>

					</picker>
				</view>

				<view class="uni-form-item uni-column">
					<view class="title">客户地址</view>
					<input class="uni-input1" v-model="address" name="address" placeholder="请输入客户地址" :disabled="true" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">陪访人</view>
					<view>
						<view class="uni-input" @tap="handleTap('picker3')">
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
				</view>

				<view class="uni-form-item uni-column">
					<view class="title">需陪访原因</view>
					<picker v-model="p_typevalue" name="p_type" @change="pfChange" :value="p_typevalue" :range="pfArray" range-key="name">
						<view class="uni-input" v-if="pfArray[p_typevalue]">{{pfArray[p_typevalue].name}}</view>
						<view class="uni-input" v-else>请选需陪访原因</view>
					</picker>
				</view>



				<view class="uni-btn-v">
					<button form-type="submit" class="btn">提交</button>
					<button class="btn" @click="qx">返回</button>
				</view>
			</form>
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
	var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js")
	export default {
		data() {
			return {
				date: '',
				v_type: '',
				v_typevalue: '',
				goal: '',
				startDate: getDate('start'),
				endDate: getDate('end'),
				name: '',
				gphone: '',
				source_flag: '',
				p_class: '',
				p_classvalue: '',
				p_type: '',
				p_typevalue: '',
				v_area: '',
				v_areavalue: '',
				s_wangluo: '',
				s_wangluovalue: '',
				s_xqclass: '',
				s_xqclassvalue: '',
				pro_class: '',
				address: '',
				position: '',
				positionvalue: '',
				human: '',
				tel: '',
				sourceArray: [{
						name: "正常拜访",
						value: "1"
					},
					{
						name: "陌拜",
						value: "2"
					},
				],
				tgxqArray: [{
						name: "A1 需求意愿强，企业竞争力弱",
						value: "1"
					},
					{
						name: "A2 需求意愿中，企业竞争力弱",
						value: "2"
					},
					{
						name: "A3 需求意愿弱，企业竞争力弱",
						value: "3"
					},
					{
						name: "B1 需求意愿强，企业竞争力强",
						value: "4"
					},
					{
						name: "B2 需求意愿中，企业竞争力强",
						value: "5"
					},
					{
						name: "B3 需求意愿弱，企业竞争力强",
						value: "6"
					},
					{
						name: "C  客户群较窄（冷门、专业行业）",
						value: "7"
					},
				],
				wlArray: [{
						name: "网络意识较强",
						value: "1"
					},
					{
						name: "有创新意识，网络意识较弱",
						value: "2"
					},
					{
						name: "创新意识弱，网络意识较弱",
						value: "3"
					},
				],
				cfArray: [{
					name: "市区出访",
					value: "1"
				}, {
					name: "郊区出访",
					value: "2"
				}, ],
				pfArray: [{
					name: "新人引带",
					value: "1"
				}, {
					name: "签单协助",
					value: "2"
				}, ],
				qtArray: [],
				zwArray: [{
						name: "老板/总经理",
						value: "1"
					},
					{
						name: "部门经理/主管",
						value: "2"
					},
					{
						name: "职员",
						value: "3"
					},
					{
						name: "其他",
						value: "4"
					},
				],
				activeId: '',
				value3: [],
				label3: '',
				list1: [],
			}

		},
		onLoad: function(option) {
			const item = JSON.parse(decodeURIComponent(option.chufang));
		    console.log('dddd',item)
			this.id = item.id;
			this.name = item.name;
			this.address = item.address;
		},
		mounted() {
			this.qiatan();
			this.locations();
		},
		methods: {
			//地址接口
			locations() {
				uni.request({
					url: this.$burl + '/api/getDepUsersCascade',
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
			//undefined，null转空
			praseStrEmpty(str) {
				if (!str || str == "undefined" || str == "null") {
					return "";
				}
				return str;
			},
			//表单
			formSubmit: function(e) {
				let dq = this.value3.pop() + '';
				//定义表单规则
				var rule = [{
						name: "v_type",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择出访类型"
					}, {
						name: "goal",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入出访目的"
					},
					{
						name: "s_xqclass",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择客户推广需求"
					},
					{
						name: "s_wangluo",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择客户网络意识"
					},
					{
						name: "date",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "日期不能为空"
					},
					{
						name: "p_class",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择洽淡业务"
					},
					{
						name: "human",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择拜访人"
					},
					{
						name: "tel",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: "请输入正确手机号"
					},
					{
						name: "position",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "职务不能为空"
					}

				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
					uni.request({
						url: this.$burl + '/api/visits/apply',
						header: {
							'Authorization': this.$token
						},
						method: "POST",
						data: {
							id: this.id,
							stage:20,
							v_type: this.v_typevalue,
							goal: this.goal,
							s_xqclass: this.s_xqclassvalue,
							s_wangluo: this.s_wangluovalue,
							v_area: this.v_areavalue,
							starttime: this.date,
							p_class: this.p_classvalue,
							human: this.human,
							tel: this.tel,
							position: this.positionvalue,
							address: this.address,
							ad_id_p: this.praseStrEmpty(dq),
							p_type: this.p_typevalue,
						},
						success: (res) => {
							if (res.data.data.status == 200) {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								});
							
								
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								});
							
							}




						},
						fail: (err) => {
							//console.log(err)
						}
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			//日期
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			//sourceChange出访类型
			sourceChange: function(e) {
				this.v_type = e.detail.value
				this.v_typevalue = this.sourceArray[this.v_type].value;
			},
			//客户推广需求
			tuiguangChange: function(e) {
				this.s_xqclass = e.detail.value
				this.s_xqclassvalue = this.tgxqArray[this.s_xqclass].value;
				console.log('客户推广需求', this.s_xqclassvalue)
			},
			//客户网络意识
			kehuChange: function(e) {
				this.s_wangluo = e.detail.value
				this.s_wangluovalue = this.wlArray[this.s_wangluo].value;
			},
			//出访区域
			cfChange: function(e) {
				this.v_area = e.detail.value
				this.v_areavalue = this.cfArray[this.v_area].value;

			},
			//出访时间

			//洽谈业务
			qtChange: function(e) {
				this.p_class = e.detail.value
				this.p_classvalue = this.qtArray[this.p_class].value;
			},
			//职务
			zwChange: function(e) {
				this.position = e.detail.value
				this.positionvalue = this.zwArray[this.position].value;
			},
			//需陪访原因
			pfChange: function(e) {
				this.p_type = e.detail.value
				this.p_typevalue = this.pfArray[this.p_type].value;
			},
			// 返回列表页
			qx() {
				uni.navigateTo({
					url: './myclue'
				})
			},
			//出访洽谈业务
			qiatan() {
				uni.request({
					url: this.$burl + '/api/getchoices',
					header: {
						'Authorization': this.$token
					},
					data: {
						kt: 'pro_class'
					},
					success: (res) => {
					
						let checklist = res.data.data.pro_class;
						let arr = []
						let key;
						for (key in checklist) {
							this.qtArray.push({
								'name': checklist[key],
								'value': key,
							})
						}
						
					},
					fail: (err) => {
						//console.log(err)
					}
				})
			},
		},
	}
</script>

<style>
	.red {
		color: #f00;
		padding-right: 10upx;
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
		color: #fff;
		width: 30%;
		height: 70upx;
		line-height: 70upx;
		font-size: 24upx;
		background: #4873c1;
	}

	.contentk {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* 表单 */
	.uni-padding-wrap {
		width: 90%;
		padding-top: 20upx;
		padding-bottom: 20upx;

	}

	.uni-form-item {
		display: flex;
		width: 100%;
		padding: 10rpx 0;
		flex-direction: column;
	}

	.uni-form-item .title {
		padding: 10rpx 0;
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
		background: #FFF;
		flex: 1;
		border: 1px #ddd solid;
		border-radius: 10upx;
		color: grey;
	}

	.uni-input1 {
		background-color: #f5f7fa;
		border-color: #e4e7ed;
		color: #606266;
		height: 50rpx;
		padding: 15rpx 25rpx;
		line-height: 50rpx;
		font-size: 28rpx;

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
		background: #FFFFFF;
	}

	.uni-form-item .with-fun .uni-icon {
		width: 40px;
		height: 80rpx;
		line-height: 80rpx;
		flex-shrink: 0;
	}
</style>
