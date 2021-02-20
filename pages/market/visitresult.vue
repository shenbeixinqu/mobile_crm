<template>
	<view class="contentk">
		<view class="contentk_top">
			<view class="leftwz">公司名称:</view>
			<view class="rightwz">{{comname}}</view>
			<view class="leftwz">出访后推广需求:</view>
			<view class="rightwz">
				<picker mode="selector" v-model="e_xqclass" :value="e_xqclass" :range="promoteArray" @change="promoteRequire" range-key="name">
					<view v-if="!e_xqclass" class="uni-input">请选择推广需求</view>
					<view v-else>{{promoteArray[e_xqclass].name}}</view>
				</picker>
			</view>
			<view class="leftwz">出访后网络意识:</view>
			<view class="rightwz">
				<picker mode="selector" v-model="e_wangluo" :value="e_wangluo" :range="netArray" @change="netRequire" range-key="name">
					<view v-if="!e_wangluo" class="uni-input">请选择网络意识</view>
					<view v-else>{{netArray[e_wangluo].name}}</view>
				</picker>
			</view>
			<view class="leftwz">出访结束日期:</view>
			<view class="rightwz">
				<picker mode="date" v-model="enddata" :value="enddata"  @change="enddataChange">
					<view>{{enddata}}</view>
				</picker>
			</view>
			<view class="leftwz">出访结束时间:</view>
			<view class="rightwz">
				<picker mode="time" v-model="endtime" :value="endtime"  @change="endtimeChange">
					<view>{{endtime}}</view>
				</picker>
			</view>
			<view class="leftwz">出访结果:</view>
			<view class="rightwz">
				<input  type="text" v-model="result" placeholder-class="placeholder" />
			</view>
		</view>
		<view class="contentk_bottom">
			<button type="primary" class="btn" @click="back">返回</button>
			<button type="primary" class="btn" @click="determine">确定</button>
		</view>
	</view>
</template>

<script>
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
	function getTime(){
		const time = new Date();
		let hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
		let minute = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
		return `${hour}:${minute}`
	}
	export default {
		data(){
			return {
				_id:"",
				comname: "",
				e_wangluo:"",
				e_wangluo_val:"",
				e_xqclass:"",
				e_xqclass_val:"",
				result:"",
				remark:"",
				enddata:getDate({
					format: true
						}),
				endtime:getTime(),
				promoteArray: [
					{name: "A1 需求意愿强，企业竞争力弱", value: 1},
					{name: "A2 需求意愿中，企业竞争力弱", value: 2},
					{name: "A3 需求意愿弱，企业竞争力弱", value: 3},
					{name: "B1 需求意愿强，企业竞争力强", value: 4},
					{name: "B2 需求意愿中，企业竞争力强", value: 5},
					{name: "B3 需求意愿弱，企业竞争力强", value: 6},
					{name: "C  客户群较窄（冷门、专业行业）", value: 7},
					
				],
				netArray: [
					{name: "网络意识较强", value: 1},
					{name: "有创新意识,网络意识较弱", value: 2},
					{name: "创新意识弱,网络意识较弱", value: 3}
				]
				
			}
		},
		onLoad(options){
			const info = JSON.parse(decodeURIComponent(options.info))
			this.comname = info.comname
			this._id = info._id
		},
		methods:{
			promoteRequire(e){
				this.e_xqclass = e.detail.value
				this.e_xqclass_val = this.promoteArray[this.e_xqclass].value
			},
			netRequire(e){
				this.e_wangluo = e.detail.value
				this.e_wangluo_val = this.netArray[this.e_wangluo].value
			},
			enddataChange(e){
				this.enddata = e.detail.value
			},
			endtimeChange(e){
				this.endtime = e.detail.value
			},
			back(){
				uni.navigateTo({
					url:'./mydetail?id='+ this._id
				})
			},
			determine(){
				uni.request({
					url:this.$burl + '/api/visits/apply/' + this._id,
					header:{
						'Authorization': this.$token
					},
					method:"PUT",
					data:{
						e_xqclass: this.e_xqclass_val,
						e_wangluo: this.e_wangluo_val,
						finishtime: this.enddata + " " + this.endtime + ":00",
						result: this.result
					},
					success: (res) => {
						if (res.data.data.status == 200){
							uni.navigateTo({
								url:"./my"
							})
						} else {
							uni.showModal({
								title:"提示",
								content:res.data.msg
							})
						}
					},
					fail: (err) => {
						console.log("Err",err)
					}
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
		border: 1px #e4e4e4 solid;
		border-radius: 10upx;
		height: 50rpx;
		line-height: 50rpx;
		text-indent: 1rem;
		
	}
	
	.se-input{
		width: 80%;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 22upx;
		border: 1px #e4e4e4 solid;
		border-radius: 10upx;
	}
	
	.uni-input {
		color: #666666;
	}
</style>
