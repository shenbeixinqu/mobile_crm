<template>
	<view class="contentk"> 

		<view class="contentk_top" style="margin-bottom:200upx;">
			<view class="leftwz">姓名：</view>
			<view class="rightwz">{{infolist.name}}</view>
			<view class="leftwz">性别：</view>
			<view class="rightwz">
				 <span v-if="infolist.gender === 1" >男</span>
				 <span v-if="infolist.gender === 0" >女</span>
			</view>
			<view class="leftwz">出生日期：</view>
			<view class="rightwz">{{ infolist.birthday }}</view>
			<view class="leftwz">职务：</view>
			<view class="rightwz">{{ infolist.post_name }}</view>
			<view class="leftwz">工号：</view>
			<view class="rightwz">{{ infolist.account }}</view>
			<view class="leftwz">机构：</view>
			<view class="rightwz">{{ infolist.un_name }}</view>
			<view class="leftwz">部门：</view>
			<view class="rightwz">{{ infolist.de_name }}</view>
			<view class="leftwz">上级：</view>
			<view class="rightwz">{{ infolist.super }}</view>
			<view class="leftwz">入职时间：</view>
			<view class="rightwz">{{ infolist.entrytime }}</view>
			<view class="rightwzimg">
				<img :src="infolist.photo" alt="" />
			</view>
		</view>
			<foot-part @openLogin="openLogin"></foot-part> 
	</view>
</template>

<script>
	export default {
		data(){
			return {
				infolist: [],
			}
		},
		onLoad(){
			this.myInfo()
		},
		methods:{
			fanhui(){
				uni.navigateBack();
			},
			
			myInfo(){
				uni.request({
					url:this.$burl + "/api/user/info",
					header:{
						// 'Authorization': "JWT " + getApp().globalData.token
						'Authorization': "JWT " + getApp().globalData.token
					},
					success: (res) => {
						if(res.data.rc == 0){
							this.infolist = res.data.data
						} else {
							uni.showModal({
								title:"提示",
								conten:res.data.msg,
								showCancel:false
							})
						}
					},
					fail: (err) => {
						uni.showModal({
							title:"提示",
							content:err
						})
					}
				})
			}
		}
	}
</script>

<style>
	page {
		
	}
	
	.contentk {
		width: 100%;
	
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.rightwzimg{ width:200upx; height:300upx;position: absolute; right:30upx; top:30upx; border:#fff solid 10upx;}
	.rightwzimg img{ width: 100%; display: block;}
	.contentk_top {
		width: 95%;
		line-height: 60upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 24upx;
		border-bottom: none;
		margin-bottom: 100upx;
	}
	
	.leftwz {
		width:95%;
	    color: #666666;
		display: flex;
		justify-content: flex-start;
		font-size:26upx;
		padding-top:10upx;
	}
	
	.rightwz {
		width:95%;
		padding-bottom: 10upx;
		height:60upx;
		display: flex;
		color: #000;
		font-size:34upx;
		border-bottom: 1px #e5e5e5 solid;
	}
	
</style>
