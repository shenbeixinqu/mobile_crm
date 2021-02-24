<template>
	<view class="contentk">
		<view class="uni-padding-wrap">
			<form @submit="formSubmit">
			<view class="uni-form-item ">
				<view class="title"><text class="red">*</text>客户名称:</view>
				<input class="uni-input1"  v-model="clueForm.name" name="name" placeholder-class="placeholder" />
			</view>
			<view class="uni-form-item">
				<radio-group name="is_man" @change="radioChange">
					<view class="title"><text class="red">*</text>客户性质:</view>
					<label>
						<radio value="公司" checked="checked" /><text>公司</text>
						<radio value="个人" /><text>个人</text>
					</label>
				</radio-group>
			</view>
			<view class="uni-form-item">
				<view class="title"><text class="red">*</text>客户电话:</view>
				<input class="uni-input1" type="number" v-model="clueForm.phone" name="phone" placeholder-class="placeholder" />
			</view>
			<view class="uni-form-item">
				<view class="title">企业法人:</view>
				<input class="uni-input1" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
			</view>
			<view class="uni-form-item">
				<view class="title"><text class="red">*</text>地区:</view>
				<input type="text" name="address" :value="label3" hidden="true"/>
				<view>
					<view class="list-itemk" @tap="handleTap('picker3')">
						<!-- <text class="sub-title">省市区三级选择</text> -->
						<view class="item-content">
							<view class="item-value">
								<text class="item-label">{{ label3 }}</text>
								<text v-if="!label3" class="item-placeholder">请选择地区</text>
							</view>
						</view>
						<lb-picker ref="picker3"  v-model="clueForm.dz" mode="multiSelector" :list="list1" :level="3" :dataset="{ name: 'label3' }"
						 @change="handleChange" @confirm="handleConfirm" @cancel="handleCancel" name="address">
						</lb-picker>
					</view>
				</view>
				
			</view>
			<view class="uni-form-item">
				<view class="title">详细地址:</view>
				<input class="uni-input1" type="text" v-model="clueForm.address" placeholder-class="placeholder" />
			</view>
			<view class="uni-form-item">
				<view class="title"><text class="red">*</text>行业:</view>
				<input type="text" name="industy" :value="label4" hidden="true"/>	
				<view>
					<view class="list-itemk" @tap="handleTap('picker4')">
						<view class="item-content">
							<view class="item-value">
								<text class="item-label">{{label4}}</text>
								<text v-if="!label4" class="item-placeholder">请选择行业</text>
							</view>
						</view>
						<lb-picker ref="picker4" v-model="clueForm.select" mode="multiSelector" :list="listhy" :level="3" :dataset="{ name: 'label4' }"
						@change="handleChange" @confirm="handleConfirm" @cancel="handleCancel">
						</lb-picker>
					</view>
				</view>
			</view>
			<view class="uni-form-item">
				<view class="title"><text class="red">*</text>客户来源:</view>
				<input type="text" name="source" v-model="clueForm.source_flag" :value="clueForm.source_flag"  hidden="true"/>
				<view>
					<picker  @change="sourceChange"  :range="sourceArray" range-key="name" >
						<view>{{sourceArray[clueForm.source_flag].name}}</view>
					</picker>
				</view>
				
			</view>
			<view class="uni-form-item">
				<view class="title"><text class="red">*</text>添加到:</view>
				<input type="text" name="addto" v-model="clueForm.addto" :value="clueForm.addto" hidden="true"/>
				<picker  @change="addtoChange" :range="addtoArray" range-key="name">
					<view>{{addtoArray[clueForm.addto].name}}</view>
				</picker>
			</view>
			<view>
			<view class="uni-form-item">
				<radio-group name="radio" v-model="clueForm.radio" @change="zhizhaoChange">
					<view class="title"><text class="red">*</text>有无执照:</view>
					<label>
						<radio value="1" checked="checked" /><text>有</text>
						<radio value="2" /><text>无</text>
					</label>
				</radio-group>
			</view>
			<view class="row b-b" v-if="clueForm.radio === '1'">
				<!-- <view class="addBox" ref="input">
					<view class="uploadtitle">点击上传文件</view>
				</view> -->
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
				 
			</view>
			<view class="uni-form-item" v-else>
				<label class="title">特殊说明:</label>
				<input class="uni-input1" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
			</view>
			</view>
			<view class="uni-form-item">
				<label class="title">备注:</label>
				<input class="uni-input1" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
			</view>
			<view>
				<view @click="showMore">展开</view>
			</view>
			<view v-if="isMore">
				<view class="uni-form-item">
					<label class="title">传真:</label>
					<input class="uni-input1" type="text" v-model="clueForm.fax" placeholder-class="placeholder" />
				</view>
				<view class="uni-form-item">
					<label class="title">邮编:</label>
					<input class="uni-input1" type="text" v-model="clueForm.zipcode" placeholder-class="placeholder" />
				</view>
				<view class="uni-form-item">
					<label class="title">邮箱:</label>
					<input class="uni-input1" type="text" v-model="clueForm.email" placeholder-class="placeholder" />
				</view>
				<view class="uni-form-item">
					<label class="title">主营业务:</label>
					<input class="uni-input1" type="text" v-model="clueForm.business" placeholder-class="placeholder" />
				</view>
				<view class="uni-form-item">
					<label class="title">人员规模:</label>
					<picker v-model="clueForm.employees" @change="employeesChange" :value="clueForm.employees" :range="employeesArray" range-key="name">
						<view>{{employeesArray[clueForm.employees].name}}</view>
					</picker>
				</view>
				<view class="uni-form-item">
					<label class="title">成立日期:</label>
					<picker mode="date" v-model="clueForm.openingdate" :value="clueForm.openingdate" name="openingdate" @change="openingdateChange">
						<view class="uni-input1">{{clueForm.openingdate}}</view>
					</picker>
				</view>
				<view class="uni-form-item">
					<label class="title">注册资金:</label>
					<input class="uni-input1" type="number" v-model="clueForm.registered" placeholder-class="placeholder" />
				</view>
			</view>
			<view>
				<button class="add-btn" formType="submit" @click="addClue">提交</button>
			</view>
			</form>
		</view>
	</view>
</template>

<script>
	 import {add} from '../../app/add.js'
	 var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js")
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
					label3: '',
					label4: '',
					listhy: [],
					list1: [],
					
					imageList: [], //保存图片路径集合
					imageLength: 3, //限制图片张数
					sourceTypeIndex: 2, //添加方式限制
					sizeTypeIndex: 2, //图片尺寸限制
					files1:"",
									
					fileList:[],
					isMore:false,
	                sourceArray:[
						 {name:"个人查找（公共资源)",value:"1"},
						 {name:"个人查找（个人社交）",value:"2"},
						 {name:"老客户转介绍",value:"3"},
						 {name:"CSC网单",value:"4"},
						 {name:"百度SCC",value:"5"},
						 {name:"市场渠道",value:"6"},
						 {name:"市场专用",value:"7"},
						 {name:"蜂巢活动",value:"8"},
						 {name:"百度团购",value:"9"},
						 {name:"郊县专用",value:"10"},
						 {name:"工商线索",value:"11"},
						 {name:"捕鱼",value:"12"},
						 {name:"保护",value:"13"},
						 {name:"特殊",value:"14"},
						 {name:"分销系统",value:"15"},
					],
					addtoArray:[
						{name:"公共线索库",value:"10"},
						{name:"普通跟进(占用跟踪数量)",value:"20"},
						{name:"签单跟进(占用跟踪数量)",value:"25"},
						{name:"进快速录入(搜索营销)",value:"35"},
					],
					employeesArray:[
						{name:"10人以下",value:"10人以下"},
						{name:"10-49人",value:"10-49人"},
						{name:"50-99人",value:"50-99人"},
						{name:"100-499人",value:"100-499人"},
						{name:"500-999人",value:"500-999人"},
						{name:"1000人以上",value:"1000人以上"},
					],
					clueForm: {
	                    name: '',
	                    is_man: '公司',
	                    phone: '',
	                    legal: '',
						dz:[],
						address:'',
						select:[],
						source_flag:0,
						addto:0,
						radio:"1",
						employees:0,
						openingdate: getDate({
							format: true
						}),
						registered:"",
	                },
	            }
	        },
	        onLoad(option) {
				this.locations();
				this.industrys();
			},	
	        methods: {
				//线索提交
				addClue(){
					let clueDetail = {
						name: this.clueForm.name,
						is_man: this.clueForm.is_man,
						phone: this.clueForm.phone,
						legal: this.clueForm.legal,
						location_id: (this.clueForm.dz[2]).toString(),
						location_depict:(this.clueForm.dz[1]).toString(),
						location_lead:(this.clueForm.dz[0]).toString(),
						// dz: (this.clueForm.dz).pop() + '',
						address: this.clueForm.address,
						industry_id:(this.clueForm.select[2]).toString(),
						industry_depict:(this.clueForm.select[1]).toString(),
						industry_lead:this.label4,
						source_flag: this.clueForm.source_flag,
						addto:this.clueForm.addto,
						radio:this.clueForm.radio,
					};
					uni.request({
						url:"http://172.18.3.161:8098" + '/api/customer',
						header:{
							'Authorization': this.$token
						},
						method:"POST",
						data:{
							name: this.clueForm.name,
							is_man: this.clueForm.is_man,
							phone: this.clueForm.phone,
							// location_id: (this.clueForm.dz[2]).toString(),
							// location_depict:(this.clueForm.dz[1]).toString(),
							// location_lead:(this.clueForm.dz[0]).toString(),
							// industry_id:(this.clueForm.select[2]).toString(),
							// industry_depict:(this.clueForm.select[1]).toString(),
							// industry_lead:this.label4,
							// source_flag: this.clueForm.source_flag,
							// addto:this.clueForm.addto,
							
						},
						success: (res) => {
							if (res.data.data.status == 200 ){
								console.log("添加成功")
							} else {
								console.log("添加失败",res.data.msg)
							}
						},
						fail: (err) => {
							console.log("错误",err)
						}
					})
				},
				//选择图片
				chooseImage: async function() {
						uni.chooseImage({
							sourceType: sourceType[this.sourceTypeIndex],
							// #ifdef MP-WEIXIN
							sizeType: sizeType[this.sizeTypeIndex],
							// #endif
							count: this.imageLength - this.imageList.length,
							success: (res) => {
								console.log("上传文件的数据", res)
								// console.log("blob", res.tempFilePaths[0])
								this.imageList = this.imageList.concat(res.tempFilePaths);
								const reader = new FileReader()
								// var aaa = reader.readAsBinaryString(res.tempFilePaths[0])
								// console.log("aaa", aaa)
								reader.readAsDataURL(res.tempFilePaths)
								reader.onload = function(){
									console.log(reader.result)
								}
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
				showMore(){
					this.isMore = !this.isMore
				},
				radioChange(evt) {
					this.clueForm.is_man = evt.detail.value
				},
				zhizhaoChange(evt){
					this.clueForm.radio = evt.detail.value
				},
				sourceChange(e){
					this.clueForm.source_flag = e.detail.value;
				},
				addtoChange(e){
					this.clueForm.addto = e.detail.value;
				},
				employeesChange(e){
					this.clueForm.employees = e.detail.value;
				},
				openingdateChange(e){
					console.log(e)
					this.clueForm.openingdate = e.detail.value;
				},
				// submitForm(){
				// 	const formData = new FormData();
				// 	// formData.append("source_flag", "123")
				// 	formData.source_flag = this.clueForm.source_flag
				// 	console.log("formdata",formData)
				// }
				formSubmit(e){
					// 定义表单规则
					var rule = [
						{name:"name",checkType:"null",errorMsg:"请输入客户名称"},
						{name:"phone",checkType:"null",errorMsg:"请输入客户电话"},
						{name:"address",checkType:"null",errorMsg:"请选择地区"},
						{name:"industy",checkType:"null",errorMsg:"请选择行业"},
						{name:"source",checkType:"null",errorMsg:"请选择客户来源"},
						{name:"addto",checkType:"null",errorMsg:"请选择添加到"}
						
						
						// {name:"phone",checkType:"phoneno",errorMsg: "请输入正确的手机号"},
						
					]
					// 进行表单检查
					var formData = e.detail.value;
					var checkRes = graceChecker.check(formData,rule);
					if (checkRes){
						console.log("成功")
						uni.request({
							url:"http://172.18.3.161:8098" + '/api/customer',
							header:{
								'Authorization': this.$token
							},
							method:"POST",
							data:{
								name: this.clueForm.name,
								is_man: this.clueForm.is_man,
								phone: this.clueForm.phone,
								files1: this.files1
								
							},
							success: (res) => {
								if (res.data.data.status == 200 ){
									console.log("添加成功")
								} else {
									console.log("添加失败",res.data.msg)
								}
							},
							fail: (err) => {
								console.log("错误",err)
							}
						})
					} else{
						uni.showModal({
							title:graceChecker.error,
							icon:"none"
						})
				}
				
	        },
			// uploadAPI(path){
			// 			  uni.showLoading({
			// 				 title: '上传中'
			// 			  })
			// 			  var _this=this
			// 			  var fData = new FormData();
			// 			  fData.append("file",path);
			// 			  fData.append("moduleName",'reports');
			// 			  var xhr = new XMLHttpRequest();
			// 			  console.log("xhr",xhr)
			// 			  var surl = "http://localhost:8098" + '/api/unifile';
			// 			  xhr.open("POST",surl,true); 
			// 			  xhr.onload = function(e) {
			// 				  // console.log("上传成功",e); //上传成功
			// 			  };
			// 			  xhr.onreadystatechange = () =>{
			// 				  if(xhr.readyState == 4 && xhr.status == 200){    //上传后台成功
			// 				      uni.hideLoading()
			// 					  var res =JSON.parse(xhr.responseText)
			// 					  _this.fileList.push(res.datas); // 上传成功后放进fileList数组用于展示
							
			// 				  } else {
			// 					  console.log("上传失败了")
			// 					  uni.hideLoading()
			// 				  }
			// 			  }
			              
			//               // 这里设置请求头，做的时候遇到一个问题，明明上传的是FormData，可是在请求中变成了request payload,后台需要的是FormData，解决方法，设置enctype为multipart/form-data，不要设置Content-Type，切记直接不设置Content-Type
			// 			  xhr.setRequestHeader('enctype',"multipart/form-data");
			// 			  xhr.setRequestHeader('Authorization',"asdasdadad");
			// 			  xhr.send(fData)
			// 		  },
					  
					  /**
					  * 列表删除文件
					  * 
					  */
					  delUpFile(data){
						  this.fileList = this.fileList.filter(item => item.id !== data.id)
					  },
					  
					  //三级联动
					  handleTap(picker) {
					  	this.$refs[picker].show()
					  },
					  handleChange(e) {
					  },
					  handleConfirm(e) {
					  	// 如果存在多个picker，可以在picker上设置dataset属性，confirm中获取，就能区分是哪个picker了
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
	    },
	}
</script>

<style>
	 page {
	        padding-top: 16upx;
	    }
	
	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;

		}

		.input {
			flex: 1;
			font-size: 30upx;

		}

		.icon-shouhuodizhi {
			font-size: 36upx;

		}
	}

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
	
	.contentk {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
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
	
	.red {
		color: #f00;
		padding-right: 10upx;
	}
	
	.uni-form-item {
		display: flex;
		width: 100%;
		padding: 10rpx 0;
		flex-direction: column;
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
	
	.uni-padding-wrap {
		width: 90%;
		padding-top: 20upx;
		padding-bottom: 20upx;
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
