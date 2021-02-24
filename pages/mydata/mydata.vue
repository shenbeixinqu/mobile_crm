<template>
	<view class="contentk"> 
		<view class="contentk_top">
			<view class="leftwz">姓名：</view>
			<view class="rightwz">{{infolist.name}}</view>
			<view class="leftwz">性别：</view>
			<view class="rightwz">
				 <span v-if="infolist.gender === 1" >男</span>
				 <span v-else >女</span>
			</view>
			<view class="leftwz">出生日期：</view>
			<view class="rightwz">{{ infolist.birthday }}</view>
			<view class="leftwz">职务：</view>
			<view class="rightwz">{{ infolist.post_name }}</view>
			<view class="leftwz">工号：</view>
			<view class="rightwz">{{ infolist.id }}</view>
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
			myInfo(){
				uni.request({
					url:this.$burl + "/api/user/info",
					header:{
						'Authorization': this.$token
					},
					success: (res) => {
						console.log("res",res)
						if(res.data.rc == 0){
							this.infolist = res.data.data
							console.log("infolist", this.infolist)
						} else {
							uni.showModal({
								title:"提示",
								conten:res.data.msg
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
		height: 100%;
	}
	
	.contentk {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.rightwzimg{ width:200upx; height:300upx;position: absolute; right:30upx; top:30upx;}
	.rightwzimg img{ width: 100%; display: block;}
	.contentk_top {
		width:90%;
		line-height: 60upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		font-size: 28upx;
		border-bottom: none;
		padding-top:20upx;
	}
	
	.leftwz {
		width:25%;
		padding-left: 2%;
		display: flex;
		justify-content: flex-start;
		font-size: 28upx;
	}
	
	.rightwz {
		width:65%;
		display: flex;
	}
</style>
