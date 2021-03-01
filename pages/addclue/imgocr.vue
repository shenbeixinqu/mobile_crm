<template>
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
					<!-- <view class="transverse-line"></view>-->
					<view class="vertical-line">名片扫描</view> 
				</view>
			</view>
		</view>
		<view class="table-btn-view">
			<button class="btn" @click="imgOcr">开始识别</button>
		</view>
			<foot-part @openLogin="openLogin"></foot-part>
	</view>
</template>

<script>
		const axios = require('axios');
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
			data(){
				return {
					imageList:[],
					imageLength: 2, //限制图片张数
					sourceTypeIndex: 2, //添加方式限制
					sizeTypeIndex: 2, //图片尺寸限制
					
					files:"",
					orgInfo:""
				}
			},
			methods:{
				imgOcr(){
					console.log("axios",this.files)
					const formDatas = new FormData();
					formDatas.append("imgfile",this.files);
					axios({
						method:'post',
						url:"http://172.18.3.161:8098" + '/api/baidu/ocr_bc',
						headers:{
							'Authorization': this.$token
						},
						data: formDatas
					})
					.then(function(res){
						if (res.data.data.status == 200){
						    const info = res.data.data.data
							let detail = {
								addr: info.ADDR,
								company: info.COMPANY,
								email: info.EMAIL,
								fax: info.FAX,
								mobile: info.MOBILE,
								name: info.NAME,
								pc: info.PC,
								tel: info.TEL,
								title: info.TITLE
							}
							uni.navigateTo({
								url: "./addclue?detail=" + encodeURIComponent(JSON.stringify(detail)) ,
							})
							console.log("名片", detail)
							
						} else {
							uni.showModal({
								title:"提示",
								content:res.data.msg
							})
						}
					})
					.catch(function(error){
						console.log("error",error)
					})
					// console.log("发送时的文件", this.files)
					// const formDatas = new FormData();
					// formDatas.append("imgfile",this.files)
					// uni.request({
					// 	url: "http://172.18.3.161:8098" + '/api/baidu/ocr_bc',
					// 	method:"POST",
					// 	header:{
					// 		'Authorization': this.$token,
					// 		"content-type": "multipart/form-data"
					// 	},
					// 	data: formDatas,
					// 	success: (res) =>{
					// 		console.log("图片上传res",res)
					// 	},
					// 	fail: (err) => {
					// 		console.log("失败err", err)
					// 	}
					// })
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
								this.imageList = this.imageList.concat(res.tempFilePaths);
								this.files = res.tempFiles[0];
								console.log("files", this.files)
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
			}
		}
</script>

<style>
	
	.btn {
		width:30%;
		height:80upx;
		line-height:80upx;
		font-size: 28upx;
		background: #4873c1;
		border-radius:5px;
		bottom: 0;
		color: #fff;
	}
	
	
	
	.upload-image-view {
		width: 100%;
		margin: 20upx 0 20upx 0;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
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
	
		background: url(../../static/p.png) no-repeat center 30%;
		background-size: 60%;
		height: 300upx;
		width: 300upx;
		margin:200upx 15upx 15upx 0upx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2upx solid #ccc;
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
		
		width: 300upx;
		position: absolute;
		
		top:100upx;
		left:50%;
		margin-left:-60upx;
	    color: #4873c1;
		font-weight: bold;
}
</style>
