<template>
<view class="contentk">
	<!-- <view class="contentk_top1">名额使用情况:</view> -->
		<view class="contentk_top" style="margin-bottom:150upx;">
			<view class="leftwz">名额使用情况:</view><view class="rightwz1">本年度申请延期客户{{ dataList.sq_cnt }}个，其中已处理通过{{dataList.tg_cnt}}个，还剩{{ dataList.ksq_cnt }}个可延期名额！</view>
			<view class="leftwz">申请人:</view><view class="rightwz">{{dataList.addname}}</view>
			<view class="leftwz">申请时间:</view><view class="rightwz">{{dataList.addtime}}</view>
			<view class="leftwz">客户名称:</view><view class="rightwz">{{dataList.name}}</view>
			<view class="leftwz">跟踪开始时间:</view><view class="rightwz">{{dataList.lastime_push}}</view>
			<view class="leftwz">跟踪到期时间:</view><view class="rightwz">{{dataList.endtime_push}}</view>
			<view class="leftwz">延期天数:</view><view class="rightwz">{{dataList.delay_days}}天(自然日)</view>
			<view class="leftwz">延期后到期日:</view><view class="rightwz">{{dataList.endtime_push|addDays(dataList.delay_days)}}</view>
			<view class="leftwz">计划签单日期:</view><view class="rightwz">{{dataList.do_time}}</view>
			<view class="leftwz">延期原因:</view><view class="rightwz">{{dataList.reasons}}</view>	
		</view>
		<view class="contentk_bottom"><button type="primary" class="btn2" @click="closeDetail">关闭</button></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				_id:"",
				dataList:[],
				cTotal: 0,
			    cTotal_on: 0,
			    cTotal_num: 0
			}
		},
		onLoad(options){
			this._id = options._id
			this.delayDetail(this._id)
		},
		filters:{
			addDays(datetime, day){
				if (datetime === '') {
				    return datetime
				  }
				  const newdate = new Date(datetime)
				  newdate.setDate(newdate.getDate() + day)
				  const opt = {
				    'Y+': newdate.getFullYear().toString(), // 年
				    'm+': (newdate.getMonth() + 1).toString(), // 月
				    'd+': newdate.getDate().toString(), // 日
				    'H+': newdate.getHours().toString(), // 时
				    'M+': newdate.getMinutes().toString(), // 分
				    'S+': newdate.getSeconds().toString() // 秒
				    // 有其他格式化字符需求可以继续添加，必须转化成字符串
				  }
				  let ret
				  let fmt = 'YYYY-mm-dd HH:MM:SS'
				  for (const k in opt) {
				    ret = new RegExp('(' + k + ')').exec(fmt)
				    if (ret) {
				      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
				    }
				  }
				  return fmt
			}
		},
		methods:{
			
			closeDetail(){
				uni.navigateTo({
					url:"./cusdelay"
				})
			},
			delayDetail(_id){
				uni.request({
					url: this.$burl + "/api/customer/delay/deal",
					header: {
						'Authorization': "JWT " + getApp().globalData.token
					},
					data:{
						id:_id,
						act:"info"
					},
					success: (res) => {
						if (res.data.data.status == 200){
							this.dataList = res.data.data
						} else {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					},
					fail: err => {
					}
				})
			}
		}
	}
</script>

<style scoped>
	.btn {
		width: 30%;
		height:70upx;
		line-height: 70upx;
		font-size: 24upx;
		background: #4873c1;
	}
	.btn2 {
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		background: #4873c1;
		border-radius: 0;
		bottom: 0;
		color: #fff;
	}
	page {
		
	}
	
	.contentk {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.contentk_bottom {
	width: 100%;
	left:0;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.contentk_top1{width: 95%; font-weight: bold; font-size:30upx; line-height: 70upx;}
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
	.rightwz1 {
		width:95%;
		padding-bottom: 10upx;
		
		display: flex;
		color: #000;
		font-size:34upx;
		border-bottom: 1px #e5e5e5 solid;
	}
</style>
