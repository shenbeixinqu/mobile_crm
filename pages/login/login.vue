<template>
	<view class="springboard">	
		<view class="">
		code:{{res}}
		</view>
		<view class="">
			用户信息 {{userInfo}}
		</view>
		<view>
			loading: {{loading}}
		</view>
		<view>
			全局变量{{token}}
		</view>
		<view>
			code:{{code}}
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			src:'',
			result:'',
			option:'',
			res:'',
			userInfo:'',
			token:'',
			openid:'',
			index:0,
			loading: true,
			code:""
		};
	},
	methods:{
		getpower() {
			
			let url =
				"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wwe6a967e2bfd97adf&redirect_uri=http%3A%2F%2Fevwng2.natappfree.cc&response_type=code&scope=snsapi_userinfo#wechat_redirect"		
			window.location.href = url
		},
		sendCode(code){
			uni.showModal({
				title:"code",
				content:code
			})
			
			uni.request({
				url: 'HTTP://172.18.3.161:8098/api/wxlogin',
				method:'POST',
				data: {
					code: code
				},
				success: (userInfo) => {
					this.userInfo = userInfo.data
					// var token = "asdqwerqweasdafazxasafqwqrasdafgasdafa";
					var token = userInfo.data.token
					getApp().globalData.token = token
					this.token = getApp().globalData.token
					if (this.token){
						uni.navigateTo({
							url:"../index/index"
						})
					}
					// uni.navigateTo({
					// 	// url:'/pages/index/index'
					// 	url:'/pages/mine/my_index'
					// });

					// if (token){
					// 	this.token = token;
					// 	console.log("token",this.token)
					// 	this.$store
					// 		.dispatch("user/storeToken",this.token)
					// 		.then(() => {
					// 		    uni.navigateTo({
					// 				url:'/pages/index/index'
					// 			});
					// 			this.$store.dispatch("user/getInfo")
					// 		})
					// 		.catch(() => {
					// 			uni.navigateTo({
					// 				url:'/pages/mine/my_index'
					// 			});
					// 		})
						
					// }
				}
			});
		},
	},
	onLoad(option) {
			// option.code = "ajsganjgkangaaskgagain"
			this.option = option
			this.code = option.code
			if (option.code == null) {
				this.getpower()
			} else {
				this.res =  option.code
				this.sendCode(option.code)
			}
		},
	created() {
		this.loading = true
	}
		
	}
</script>

<style scoped>
	.springboard{
		height: 99vh;
		position: relative;
		text-align: center;
		background-size: cover;
		// background-image: url('http://zons.oss-cn-shenzhen.aliyuncs.com/upload/20200703/20200703/1593768723d3eb9a9233e52948740d7eb8c3062d14.jpg');
		// background-image: url('http://zons.oss-cn-shenzhen.aliyuncs.com/upload/20200703/20200703/1593768995d3eb9a9233e52948740d7eb8c3062d14.jpg');
	}
	.LoginBtn{
		width: 50%;
		border: 1px solid  #409eff;
		padding:20rpx  ;
		display: inline-block;
		background-color: #409eff ;
		color: #fff;
		border-radius: 10rpx;
	}
</style>