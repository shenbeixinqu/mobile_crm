<template>
	<view class="contentk">
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">客户名称</view>
					<input class="uni-input1" v-model="name" :disabled="true" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">客户来源</view>
					<input class="uni-input1" v-model="source" :disabled="true" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">客户行业</view>
					<input class="uni-input1" v-model="ind_lead" :disabled="true" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">客户电话</view>
					<input class="uni-input1" v-model="phoneTxt" :disabled="true" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">详细地址</view>
					<input class="uni-input1" v-model="address" :disabled="true" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">主营业务</view>
					<input class="uni-input1" v-model="business" :disabled="true" />
				</view>
				<view class="uni-form-item uni-column" v-if="classall===0">
					<view class="title">可跟进业务:</view>
					<checkbox-group @change="checkboxChange" class="unilablek">
						<label class="unilable" v-for="item in this.optionsgj" :key="item">
							<view class="unick">
								<checkbox :value="item" />
							</view>
							<view class="uniwz">{{baidupro[item]}}</view>
						</label>
					</checkbox-group>
				</view>
				<view v-show="stage === '待清洗' || stage === '线索黑名单'">
					<view class="uni-form-item uni-column">
						<view class="title">核实电话</view>
						<input class="uni-input" name="nphone"  @blur="bindp" placeholder="请输入核实电话" :value="stage === '待清洗' || stage === '线索黑名单'?'':'18302464786'" />


					</view>

					<view class="uni-form-item uni-column">
						<view class="title"><text class="red">*</text>申请理由</view>
						<textarea class="uni-inputk" @blur="bindTextAreaBlur" name="remark" placeholder="请填申请理由" :value="stage === '待清洗' || stage === '线索黑名单'?'申请理由':remark" />
						</view>
						<!-- 上传 -->
						<view class="uploads">
							<view class="upload-image-view">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="image-view">
										<image :src="image" :data-src="image" @tap="previewImage"></image>
										<view class="del-btn" :data-index="index" @tap="deleteImage">
											<view class="baicha"></view>
										</view>
									</view>
								</block>
								<view class="add-view" v-if="imageList.length < imageLength" @tap="chooseImage">
									<view class="cross">
										<view class="transverse-line"></view>
										<view class="vertical-line"></view>
									</view>
								</view>
							</view>
						</view>
						<!-- 上传结束 -->
	     
		 </view>
		<view v-show="!(stage === '待清洗' || stage === '线索黑名单')">
			
			<view class="uni-form-item uni-column" >
				<view class="title"><text class="red">*</text>跟进理由</view>
				<textarea class="uni-inputk" @blur="bindTextAreaBlur" name="remark"  placeholder="请填跟进理由" :value="stage === '待清洗' || stage === '线索黑名单'?'申请理由':remark" />
				</view>
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
	const axios = require('axios');
	var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js")
	var sourceType = [
			['camera'], //拍照
			['album'], //相册
			['camera', 'album'] //拍照或相册
		]
		var sizeType = [
			['compressed'], //压缩
			['original'], //原图
			['compressed', 'original'] //压缩或原图
		]
	export default {
		data() {
			return {
				
				imageList: [], //保存图片路径集合
				imageLength: 3, //限制图片张数
				sourceTypeIndex: 2, //添加方式限制
				sizeTypeIndex: 2, //图片尺寸限制
				
				phone:"",
				name: '',
				activeId: "",
				address:'',
				source:'',
				phoneTxt:'',
				business:'',
				ind_lead:'',
				stage:'',
				remark:'',
				optionsgj: [],
				baidupro:'',
				classall:0,
				classid:'',
				files:'',
				
				
			}

		},
	
		onLoad: function(option) {
			const item = JSON.parse(decodeURIComponent(option.genjin));
		    this.activeId=Number(item.id); 
			this.ind_lead = item.ind_lead;
			this.stage=item.stage;
			
			this.genjin();
			this.getchoices();
		},

		methods: {
			
			//选择图片
			chooseImage: async function() {
					uni.chooseImage({
						sourceType: sourceType[this.sourceTypeIndex],
						// #ifdef MP-WEIXIN
						sizeType: sizeType[this.sizeTypeIndex],
						// #endif
						count: this.imageLength - this.imageList.length,
						success: (res) => {
							this.imageList = this.imageList.concat(res.tempFilePaths);
							this.files=res.tempFiles[0];
						}
					})
				},
			//预览图片
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			//删除图片
			deleteImage: function(e) {
				var index = e.target.dataset.index;
				var that = this;
				var images = that.imageList;
				images.splice(index, 1);
				that.imageList = images;
			},
			//产品多选
			checkboxChange: function (e) {
				this.classid=(e.detail.value).toString();
			},
			// 返回列表页
			qx() {
				uni.navigateTo({
					url: './searchclue'
				})
			},
			bindTextAreaBlur: function(e) {
				this.remark = e.detail.value
			},
			bindp: function(e) {
				this.phone = e.detail.value
			},
			//百度产品
			getchoices(){
				uni.request({
					url: this.$burl + '/api/getchoices',
					header: {
						'Authorization': this.$token
					},
					data:{
						kt:'pro_class'
					},
					success: (res) => {
						if (res.data.data.status == 200){
							this.baidupro=res.data.data.pro_class	
						}
					},
					fail: (err) => {
						
					}
				})
			},
			
            genjin(){
				uni.request({
					url: this.$burl + '/api/customer/track',
					header: {
						'Authorization': this.$token
					},
					data:{
						id:this.activeId
					},
					success: (res) => {
					
						if (res.data.data.status == 200){
							this.name=res.data.data.data.name;
							this.address=res.data.data.data.address;
							this.source=res.data.data.data.source;
							this.phoneTxt=res.data.data.data.phone;
							this.business=res.data.data.data.business;
							this.classall=res.data.data.data.classall;
							this.optionsgj=res.data.data.data.classids;
							for(let i in this.optionsgj){
							 this.optionsgj[i]=this.optionsgj[i].toString();
							}
						}
						else{
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
						}	
					},
					fail: (err) => {
						
					}
				})
			},
			
			
			//表单
			formSubmit: function(e) {
				var rule = [
				{
					name: "nphone",
					checkType: "phoneno",
					checkRule: "",
					errorMsg: "请输入正确手机号"
				},{
					name: "remark",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "请输入跟进理由",
				}];
		
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				
				if (checkRes) {
					
				const formDatas = new FormData();
				if(this.stage === '待清洗' || this.stage === '线索黑名单'){
				formDatas.append("files",this.files);
				formDatas.append("id",this.activeId);
				formDatas.append("remark", this.remark);
				formDatas.append("classid", this.classid);
				formDatas.append("phone",this.phone);}
				else{
					formDatas.append("id",this.activeId);
					formDatas.append("remark", this.remark);
				}
				
				axios({
					method: 'post',
					url: this.$burl +'/api/customer/track',
					headers: {
						'Authorization': this.$token
					},
					data: formDatas,
				})
				  .then(function (res) {
				  	if (res.data.data.status == 200) {
						
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						success() {
							uni.navigateBack({
								delta:1
							})
						}
					});
					}
				  })
				  .catch(function (error) {
				    
				  });
				
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			formReset: function(e) {
				
			},
			
			

		},
	}
</script>

<style scoped>
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

	/* 表单 */
	.uni-padding-wrap {
		width: 90%;
		padding-top: 20upx;
		padding-bottom: 20upx;

	}

	.uni-form-item {
		display: flex;
		width:100%;
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

	.uni-inputk {
		height: 200rpx;
		margin-top: 20upx;
		padding: 15rpx 30rpx;
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
	.unilablek{width: 100%; display: flex;flex-direction:row; flex-wrap: wrap;}
	.unilable{ width:45%; display: flex; margin-bottom: 10upx;}
	.unick{display: flex;}
	.uniwz{display: flex;}
/* 	
	上传图片样式 */
	
	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		background-color: rgb(28, 42, 134);
		color: #fff;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(28, 42, 134, 0.4);
	}
	
	
	.addBox{
			width: 100%;
			height: 140rpx;
			text-align: center;
	        background: url(../../static/upload.png) no-repeat center center;		
			position: relative;
			border: 1px dashed #1890FF;
			margin: 0 auto;
			border-radius: 8px;
			background-color: #FAFAFA;
		}
		
	.uploadtitle{
		position: absolute;
		bottom: 12rpx;
		left: 0;
		right: 0;
	}
	
	.filesBox{
		margin-top: 28rpx;
	}
	
	.fileslist{
		margin-top: 8px;
	}
	
	.upfileico{
		width: 52rpx;
		height: 52rpx;
		display: inline-block;
		vertical-align: top;
	}
	
	.upname{
		font-size: 26rpx;
		color: #333333;
		width: 80%;
		display: inline-block;
	}
	
	.upclose{
		width: 40rpx;
		height: 40rpx;
		display: inline-block;
		float: right;
		position: relative;
		top: 3px;
	}
	
	.upload-image-view {
		width: 100%;
		margin: 20upx 0 20upx 0;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	 
	.upload-image-view .title {
		width: 100%;
		font-family: PingFang-SC-Regular;
		font-size: 24upx;
		color: #4a4a4a;
		margin-bottom: 15upx;
		line-height: 100%;
	}
	 
	.upload-image-view .info {
		width: 100%;
		font-family: PingFang-SC-Regular;
		font-size: 24upx;
		color: #ff4259;
		height: 24upx;
		margin-top: 15upx;
		line-height: 24upx;
	}
	 
	.upload-image-view .image-view {
		height: 130upx;
		width: 130upx;
		position: relative;
		margin: 15upx 15upx 15upx 0upx;
		border-radius: 8upx;
	}
	 
	.upload-image-view .image-view image {
		height: 100%;
		width: 100%;
		border-radius: 8upx;
	}
	 
	.upload-image-view .image-view .del-btn {
		background-color: #f67371;
		border-radius: 50%;
		width: 25upx;
		height: 25upx;
		position: absolute;
		top: -12upx;
		right: -12upx;
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	 
	.upload-image-view .image-view .del-btn .baicha {
		display: inline-block;
		width: 20upx;
		height: 5upx;
		background: #fff;
		line-height: 0;
		font-size: 0;
		vertical-align: middle;
		-webkit-transform: rotate(45deg);
	}
	 
	.upload-image-view .image-view .del-btn .baicha:after {
		content: '/';
		display: block;
		width: 20upx;
		height: 5upx;
		background: #fff;
		-webkit-transform: rotate(-90deg);
	}
	 
	.upload-image-view .add-view {
		height: 115upx;
		width: 115upx;
		margin: 15upx 15upx 15upx 0upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.00);
		border: 3upx dashed #979797;
		border-radius: 8upx;
	}
	 
	/* 相机 */
	 
	.upload-image-view .add-view .xiangji {
		height: 40upx;
		width: 48upx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	 
	.upload-image-view .add-view .xiangji .tixing {
		width: 10upx;
		height: 7upx;
		background-color: #fff;
		border-right: 10upx solid #fff;
		border-bottom: 7upx solid #b2b2b2;
		border-left: 10upx solid #fff;
	}
	 
	.upload-image-view .add-view .xiangji .changfx {
		height: 32upx;
		width: 48upx;
		border-radius: 5%;
		background-color: #b2b2b2;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	 
	.upload-image-view .add-view .xiangji .changfx .yuan1 {
		height: 20upx;
		width: 20upx;
		border-radius: 50%;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	 
	.upload-image-view .add-view .xiangji .changfx .yuan2 {
		height: 10upx;
		width: 10upx;
		border-radius: 50%;
		background-color: #b2b2b2;
	}
	 
	/* 第二套图片上传样式（内部图标 十字架）*/
	 
	/* 十字架 */
	.upload-image-view .add-view .cross {
		height: 48upx;
		width: 48upx;
		display: flex;
		flex-wrap: wrap;
		position: relative;
	}
	 
	.upload-image-view .add-view .cross .transverse-line {
		height: 100%;
		width: 48%;
		position: absolute;
		border-right: 3upx solid #5A5A5A;
		top: 0;
		left: 0;
	}
	 
	.upload-image-view .add-view .cross .vertical-line {
		height: 48%;
		width: 100%;
		position: absolute;
		border-bottom: 3upx solid #5A5A5A;
		top: 0;
		left: 0;
	}
</style>
