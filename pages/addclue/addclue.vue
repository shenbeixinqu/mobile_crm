<template>
	<view class="content">
		<form @submit="formSubmit">
		<view class="row b-b">
			<text class="tit">客户名称:</text>
			<input class="input" type="text" v-model="clueForm.name" name="name" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<radio-group name="is_man" @change="radioChange">
				<label>客户性质:</label>
				<label>
					<radio value="公司" checked="checked" /><text>公司</text>
					<radio value="个人" /><text>个人</text>
				</label>
			</radio-group>
		</view>
		<view class="row b-b">
			<label class="tit">客户电话:</label>
			<input class="input" type="number" v-model="clueForm.phone" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<label class="tit">企业法人:</label>
			<input class="input" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<label class="tit">地区:</label>
			<input class="input" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<label class="tit">详细地址:</label>
			<input class="input" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<label class="tit">行业检索:</label>
			<input class="input" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<label class="tit">行业:</label>
			<input class="input" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<label class="tit">客户来源:</label>
			<view>
				<picker v-model="clueForm.source_flag" @change="sourceChange" :value="clueForm.source_flag" :range="sourceArray" range-key="name" >
					<view>{{sourceArray[clueForm.source_flag].name}}</view>
				</picker>
			</view>
			
		</view>
		<view class="row b-b">
			<label class="tit">添加到:</label>
			<picker v-model="clueForm.addto" @change="addtoChange" :value="clueForm.addto" :range="addtoArray" range-key="name">
				<view>{{addtoArray[clueForm.addto].name}}</view>
			</picker>
		</view>
		<view>
		<view class="row b-b">
			<radio-group name="radio" v-model="clueForm.radio" @change="zhizhaoChange">
				<label>有无执照:</label>
				<label>
					<radio value="1" checked="checked" /><text>有</text>
					<radio value="2" /><text>无</text>
				</label>
			</radio-group>
		</view>
		<view class="row b-b" v-if="clueForm.radio === '1'">
			<view class="addBox" ref="input">
					<view class="uploadtitle">点击上传文件</view>
			</view>
			 
			<view class="filesBox" v-if="fileList.length > 0">
				<view class="fileslist" v-for="item in fileList">
					<image src="/static/images/upfile.png" class="upfileico"></image>
						<text class="upname">{{item.fileOriginalName}}</text>
						<image src="/static/images/upclose.png" class="upclose" @click="delUpFile(item)"></image>
				</view>
			</view>
		</view>
		<view class="row b-b" v-else>
			<label class="tit">特殊说明:</label>
			<input class="input" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
		</view>
		</view>
		<view class="row b-b">
			<label class="tit">备注:</label>
			<input class="input" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
		</view>
		<view>
			<view @click="showMore">展开</view>
		</view>
		<view v-if="isMore">
			<view class="row b-b">
				<label class="tit">传真:</label>
				<input class="input" type="text" v-model="clueForm.fax" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<label class="tit">邮编:</label>
				<input class="input" type="text" v-model="clueForm.zipcode" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<label class="tit">邮箱:</label>
				<input class="input" type="text" v-model="clueForm.email" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<label class="tit">主营业务:</label>
				<input class="input" type="text" v-model="clueForm.business" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<label class="tit">人员规模:</label>
				<picker v-model="clueForm.employees" @change="employeesChange" :value="clueForm.employees" :range="employeesArray" range-key="name">
					<view>{{employeesArray[clueForm.employees].name}}</view>
				</picker>
			</view>
			<view class="row b-b">
				<label class="tit">成立日期:</label>
				<picker mode="date" v-model="clueForm.openingdate" :value="clueForm.openingdate" name="openingdate" @change="openingdateChange">
					<view class="uni-input">{{clueForm.openingdate}}</view>
				</picker>
			</view>
			<view class="row b-b">
				<label class="tit">注册资金:</label>
				<input class="input" type="number" v-model="clueForm.registered" placeholder-class="placeholder" />
			</view>
		</view>
		<view>
			<button class="add-btn" formType="submit">提交</button>
		</view>
		</form>
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
	 export default {
	        data() {
	            return {
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
	                    is_man: '',
						radio:"1",
	                    phone: '',
	                    legal: '',
						source_flag:0,
						addto:0,
						employees:0,
						openingdate: getDate({
							format: true
						}),
						registered:"",
	                },
	            }
	        },
	        onLoad(option) {},	
			mounted() {
				this.$nextTick(function(){
					var input = document.createElement('input')
					input.style.width="100%";
					input.type = 'file'//添加file类型
					input.multiple = 'multiple'// 可以选择多个
					// input.accept=".pdf" // 限制只能上传PDF文件，可以不限制，能上传任何类型
					input.style.height="100%";
					input.style.position="absolute";
					input.style.top="0";
					input.style.right="0";
					input.style.opacity="0";
					input.style.overflow="hidden"; //防止注意input 元素溢出
					input.id = 'file';
					var _this = this;
					setTimeout(() => {
						this.$refs.input.$el.appendChild(input); // 这里可能会报$el找不到错误，所以加了延时器，报错的原因是this.$refs.input没有找到为null，所以需要等页面结构加载完后再将其添加进去
						input.onchange = (event) => { // 点击上传选择文件
							var file = event.target.files;
							if (file.length > 0) {
								file.forEach(item => { // 因为后台限制，只能一个一个文件的上传，所以当选择多个文件后，需要遍历一个一个调用上传接口
									_this.uploadAPI(item); // 上传图片
								})
							}
						}
					}, 1000)
				})
				
			},

	        methods: {
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
						{name:"name",checkType:"notnull",errorMsg:"请输入客户名称"},
						{name:"phone",checkType:"phoneno",errorMsg: "请输入正确的手机号"},
						
					]
					// 进行表单检查
					var formData = e.detail.value;
					var checkRes = graceChecker.check(formData,rule);
					if (checkRes){
						console.log(成功)
					} else{
						uni.showToast({title:graceChecker.error})
				}
				
	        },
			
			  uploadAPI(path){
						  uni.showLoading({
							 title: '上传中'
						  })
						  var _this=this
						  var fData = new FormData();
						  fData.append("file",path);
						  fData.append("moduleName",'reports');
						  var xhr = new XMLHttpRequest();
						  console.log("xhr",xhr)
						  var surl = "http://localhost:8098" + '/api/unifile';
						  xhr.open("POST",surl,true); 
						  xhr.onload = function(e) {
							  // console.log("上传成功",e); //上传成功
						  };
						  xhr.onreadystatechange = () =>{
							  if(xhr.readyState == 4 && xhr.status == 200){    //上传后台成功
							      uni.hideLoading()
								  var res =JSON.parse(xhr.responseText)
								  _this.fileList.push(res.datas); // 上传成功后放进fileList数组用于展示
							
							  } else {
								  console.log("上传失败了")
								  uni.hideLoading()
							  }
						  }
			              
			              // 这里设置请求头，做的时候遇到一个问题，明明上传的是FormData，可是在请求中变成了request payload,后台需要的是FormData，解决方法，设置enctype为multipart/form-data，不要设置Content-Type，切记直接不设置Content-Type
						  xhr.setRequestHeader('enctype',"multipart/form-data");
						  xhr.setRequestHeader('Authorization',"asdasdadad");
						  xhr.send(fData)
					  },
					  
					  /**
					  * 列表删除文件
					  * 
					  */
					  delUpFile(data){
						  this.fileList = this.fileList.filter(item => item.id !== data.id)
					  }

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
</style>
