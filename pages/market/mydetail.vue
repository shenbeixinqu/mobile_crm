<template>
	<view class="contentk">
		<view class="contentk_top">
			<view class="leftwz">公司名称:</view><view class="rightwz">{{dataList.comname}}</view>
			<view class="leftwz">洽谈业务:</view><view class="rightwz">{{dataList.pClassname}}</view>
			<view class="leftwz">出访类型:</view><view class="rightwz">{{dataList.v_type}}</view>
			<view class="leftwz">出访区域:</view><view class="rightwz">{{dataList.v_area}}</view>
			<view class="leftwz">出访目的:</view><view class="rightwz">{{dataList.goal}}</view>
			<view class="leftwz">拜访人:</view><view class="rightwz">{{dataList.human}}</view>
			<view class="leftwz">拜访人电话:</view><view class="rightwz">{{dataList.tel}}</view>
			<view class="leftwz">拜访人职务:</view><view class="rightwz">{{dataList.position | visitToPost}}</view>
			<view class="leftwz">客户地址:</view><view class="rightwz">{{dataList.address}}</view>
			<view class="leftwz">出访结果:</view><view class="rightwz">{{dataList.result}}</view>
			<view class="leftwz">出访前推广需求:</view><view class="rightwz">{{dataList.s_xqclass | tuiguangToMean}}</view>
			<view class="leftwz">出访后推广需求:</view><view class="rightwz">{{dataList.e_xqclass | tuiguangToMean}}</view>
			<view class="leftwz">出访前网络意识:</view><view class="rightwz">{{dataList.s_wangluo | yishiToMean}}</view>
			<view class="leftwz">出访后网络意识:</view><view class="rightwz">{{dataList.e_wangluo | yishiToMean}}</view>
			<view class="leftwz">出访时间:</view><view class="rightwz">{{dataList.starttime}}</view>
			<view class="leftwz">出访结束时间:</view><view class="rightwz">{{dataList.finishtime}}</view>
			<view class="leftwz">是否违规:</view><view class="rightwz">{{dataList.isvalid}}</view>
			<view class="leftwz">是否无效出访:</view><view class="rightwz">{{dataList.wuxiao}}</view>
		</view>
		<view class="contentk_bottom" v-if="!dataList.result">
			<button type="primary" class="btn" >取消出访</button>
			<button type="primary" class="btn" @click="visitResult">填写出访结果</button>
		</view>
		<view class="contentk_bottom" v-else>
			<button type="primary" class="btn" @click="closeDetail">关闭</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				_id: "",
				dataList: []
			}
		},
		onLoad(options){
			this._id = options.id
			this.myDetail(this._id)
		},
		filters:{
			visitToPost: function(value) {
			        let names = ''
			        if (value){
			          if(value === '1'){
			          names = "老板/总经理"
			          } else if (value === '2') {
			            names = "部门经理/主管"
			          } else if (value === '9') {
			            names = "职员"
			          } else if (value === "0") {
			            names = "其他"
			          }
			        }
			        return names
			},
			tuiguangToMean: function(value){
			        let demand = ""
			        if(value){
			          if(value === 'A1'){
			            demand = "A1 需求意愿强，企业竞争力弱"
			          } else if (value ==='A2'){
			            demand = "A2 需求意愿中，企业竞争力弱"
			          } else if (value === 'A3'){
			            demand = "A3 需求意愿弱，企业竞争力弱"
			          } else if (value ==='B1'){
			            demand = "B1 需求意愿强，企业竞争力强"
			          } else if (value === 'B2'){
			            demand = "B2 需求意愿中，企业竞争力强"
			          } else if (value ==='B3'){
			            demand = "B3 需求意愿弱，企业竞争力强"
			          } else if (value === 'C'){
			            demand = "C  客户群较窄（冷门、专业行业）"
			          }
			        }
			        return demand
		    },
			yishiToMean: function(value) {
			        let names = ''
			        if(value){
			          if (value === '1') {
			            names = '网络意识较强'
			          } else if (value === '2') {
			            names = '有创新意识,网络意识较弱'
			          } else if (value === '3'){
			            names = '创新意识弱,网络意识较弱'
			          }
			        }
			        return names
		    },
		},
		methods:{
			myDetail(_id){
				uni.request({
					url: this.$burl + '/api/visits/' + _id,
					header:{
						'Authorization': this.$token
					},
					success: (res) => {
						console.log("我的出访",res)
						if (res.data.data.status == 200 ){
							this.dataList = res.data.data.data
							console.log("datalist",this.dataList)
						}
					},
					fail: err => {
						console.log("err",err)
					}
				})
			},
			visitResult(){
				let visitInfo = {
					comname: this.dataList.comname,
					_id: this.dataList._id
				}
				uni.navigateTo({
					url:"./visitresult?info=" + encodeURIComponent(JSON.stringify(visitInfo))
				})
			},
			closeDetail(){
				uni.navigateTo({
					url:"./my"
				})
			}
		}
		
	}
</script>

<style scoped>
	
	page {
		height: 100%;
	}
	
	.btn {
		width: 30%;
		height:70upx;
		line-height: 70upx;
		font-size: 24upx;
		background: #4873c1;
	}
	
	.contentk {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.contentk_bottom {
		width: 95%;
		margin-top: 40upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.contentk_top {
		width: 95%;
	
		line-height: 60upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		font-size: 24upx;
		border-bottom: none;
	}
	
	.leftwz {
		width:30%;
		padding-left: 2%;
		display: flex;
		justify-content: flex-start;
		font-size: 24upx;
	}
	
	.rightwz {
		width:65%;
		display: flex;
	}
</style>
