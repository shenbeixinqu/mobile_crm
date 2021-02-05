<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">客户名称:</text>
			<input class="input" type="text" v-model="clueForm.name" placeholder-class="placeholder" />
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
		<view class="row b-b">
			<label class="tit">有无执照:</label>
			<input class="input" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<label class="tit">特殊说明:</label>
			<input class="input" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
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
				<input class="input" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<label class="tit">邮编:</label>
				<input class="input" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<label class="tit">邮箱:</label>
				<input class="input" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<label class="tit">主营业务:</label>
				<input class="input" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<label class="tit">人员规模:</label>
				<input class="input" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<label class="tit">成立日期:</label>
				<input class="input" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<label class="tit">注册资金:</label>
				<input class="input" type="text" v-model="clueForm.legal" placeholder-class="placeholder" />
			</view>
		</view>
		

		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	 export default {
	        data() {
	            return {
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
					clueForm: {
	                    name: '',
	                    is_man: '',
	                    phone: '',
	                    legal: '',
						source_flag:0,
						addto:0,
	                },
	            }
	        },
	        onLoad(option) {},
	        methods: {
	            //提交
	            confirm() {
	                let data = this.addressData;
	                console.log(JSON.stringify(data))
	            },
				showMore(){
					this.isMore = !this.isMore
				},
				radioChange(evt) {
					this.is_man = evt.detail.value
				},
				sourceChange(e){
					this.clueForm.source_flag = e.detail.value;
				},
				addtoChange(e){
					this.clueForm.addto = e.detail.value;
				}
				
	        }
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
</style>
