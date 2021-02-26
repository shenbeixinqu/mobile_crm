<template>
	<view class="springboard">
		<view class="logo"></view>
		<view class="logowz">客户关系管理系统平台</view>
			<button class="LoginBtn" @click="add">授权登录</button>
		<!-- <view class="">
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
		<view>
			全部信息: {{role}}
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
				result: '',
				option: '',
				res: '',
				userInfo: '',
				token: '',
				openid: '',
				index: 0,
				loading: true,
				code: "",
				role: []
			};
		},
	methods:{
		add(){
			uni.navigateTo({
				url:"../index/index"
			})
		},
			getpower() {
				
				let url =
					"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wwe6a967e2bfd97adf&redirect_uri=http%3A%2F%2Frcwxge.natappfree.cc&response_type=code&scope=snsapi_userinfo#wechat_redirect"		
				window.location.href = url
			},
			sendCode(code){
				uni.request({
					// url: 'HTTP://172.18.3.161:8098/api/wxlogin',
					url: this.$burl + '/api/wxlogin',
					method:'POST',
					data: {
						code: code
					},
					success: (userInfo) => {
						this.role = userInfo.data.roles
						getApp().globalData.token = userInfo.data.token
						getApp().globalData.roles = this.role
						this.token = getApp().globalData.token
					
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
					// this.sendCode(option.code)
				}
			},
		created() {
			this.loading = true
		}
			
		}
	</script>

<style scoped>
	.logo {
		width: 150upx;
		height: 150upx;
		background: url(../../static/CRM.png) no-repeat;
		background-size: 150upx 150upx;
		margin-top:258upx;
	}
    .logowz{ width: 100%; text-align: center; color: #1891ff; font-size: 40upx; font-weight: bold;margin-top:80upx;}
	.springboard {
		height: 99vh;
		position: relative;
		display: flex;
		align-items: center;
		flex-direction: column;

	}

	.LoginBtn {
		width:40%;
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		background: #1891ff;
		border-radius: 10upx;
		margin-top:200upx;
		color: #fff;
	}
</style>
