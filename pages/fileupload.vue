<template>
	<view class="body-view">
		<view class="info-table">
			<view class="info-table-row">
				<view class="table-row-left">技能名称</view>
				<view class="table-row-right">
					<input type="text" />
				</view>
			</view>
			<view class="info-table-row">
				<view class="table-row-left">熟练程度</view>
				<view class="table-row-right">
					<image src="../../static/imgs/system/leftjt.svg"></image>
				</view>
			</view>
		</view>
		<view class="uploads">
		<!-- 图片上传 -->
		<view class='upload-image-view'>
			<!-- 标题已经省略 -->
			<!-- <view class='title'>上传xxxx图片</view> -->
			<block v-for="(image,index) in imageList" :key="index">
				<view class='image-view'>
					<image :src="image" :data-src="image" @tap="previewImage"></image>
					<view class='del-btn' :data-index="index" @tap='deleteImage'>
						<view class='baicha'></view>
					</view>
				</view>
			</block>
			<view class='add-view' v-if="imageList.length < imageLength" @tap="chooseImage">
 
				<!-- 相机 -->
				<!-- <view class="xiangji">
							<view class="tixing"></view>
							<view class='changfx'>
								<view class='yuan1'>
									<view class='yuan2'></view>
								</view>
							</view>
						</view> -->
 
				<!-- 十字架 -->
				<view class="cross">
					<view class="transverse-line"></view>
					<view class="vertical-line"></view>
				</view>
 
			</view>
			<view class='info'>上传证书/证件，不超过{{imageLength}}张。(非必填)</view>
		</view>
		<!-- 图片上传 -->
		</view>
		<view class="table-btn-view">
			<button class="save-btn">保存</button>
		</view>
	</view>
</template>
 
<script>
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
			}
		},
		onUnload() {
 
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
				}
		}
	}
</script>
 
<style>
	@import "../../static/css/upload-imgs.css";
 
	page {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		background-color: #FFFFFF;
	}
 
	.body-view {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
	}
 
	.info-table {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		background-color: #FFFFFF;
	}
 
	.info-table .info-table-row {
		height: 120upx;
		width: 92%;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1upx solid rgba(204, 204, 204, 1);
	}
 
	.info-table .info-table-row .table-row-left {
		height: 40upx;
		font-size: 28upx;
		font-weight: 400;
		color: rgba(28, 28, 28, 1);
		line-height: 40upx;
	}
 
	.info-table .info-table-row .table-row-right {
		display: flex;
		align-items: center;
		justify-content: center;
	}
 
	.info-table .info-table-row .table-row-right image {
		width: 13upx;
		height: 24upx;
	}
 
	.info-table .info-table-row .table-row-right input {
		width: 560upx;
		height: 40upx;
		font-size: 28upx;
		font-weight: 400;
		color: rgba(28, 28, 28, 1);
		line-height: 40upx;
	}
 
	.table-btn-view {
		position: fixed;
		bottom: 27upx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
 
	.table-btn-view .save-btn {
		width: 92%;
		height: 90upx;
		background: rgba(0, 170, 255, 1);
		border-radius: 10upx;
		color: #FFFFFF;
	}
	
	.uploads{
		width: 92%;
	}
</style>