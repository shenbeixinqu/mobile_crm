<template>
	<view class="tabs">
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
				<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
			</view>
		</scroll-view>

		<swiper :current="tabIndex" class="swiper-box" style="flex:1;min-height:100vh;" :duration="300" @change="ontabchange">
			<swiper-item class="swiper-item">
				<gaikuang :active-id="activeId"></gaikuang>
			</swiper-item>
			<swiper-item class="swiper-item">
				<fuwu :active-id="activeId"></fuwu>
			</swiper-item>
			<swiper-item class="swiper-item">
				<pizhu :active-id="activeId"></pizhu>
			</swiper-item>
			<swiper-item class="swiper-item">
				4

			</swiper-item>

		</swiper>
	</view>
</template>
<script>
	import gaikuang from "@/components/gaikuang/gaikuang.vue"
	import fuwu from"@/components/fuwu/fuwu.vue"
	import pizhu from"@/components/pizhu/pizhu.vue"
	// 缓存每页最多
	const MAX_CACHE_DATA = 100;
	// 缓存页签数量
	const MAX_CACHE_PAGE = 3;



	export default {
		components: {
			gaikuang,
			fuwu,
		},
		data() {
			return {
				activeId: "",
				newsList: [],
				cacheTab: [],
				tabIndex: 0,
				tabBars: [{
					name: '客户概况',
					id: 'khgk'
				}, {
					name: '服务人员',
					id: 'fwry'
				}, {
					name: '销售批注',
					id: 'xspz'
				}, {
					name: '客户订单',
					id: 'khdd'
				}],
				scrollInto: "",
				showTips: false,
				navigateFlag: false,
				pulling: false,
			}
		},
		onLoad: function(option) {
			console.log(option)
			this.activeId = option.id

		},
		methods: {
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.switchTab(index);
			},
			ontabchange(e) {
				let index = e.target.current || e.detail.current;
				this.switchTab(index);
			},
			switchTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
				this.scrollInto = this.tabBars[index].id;

				// 释放 tabId
				if (this.cacheTab.length > MAX_CACHE_PAGE) {
					let cacheIndex = this.cacheTab[0];
					this.clearTabData(cacheIndex);
					this.cacheTab.splice(0, 1);
					//console.log("remove cache index:: " + cacheIndex);
				}
			},
			newGuid() {
				let s4 = function() {
					return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
				}
				return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toUpperCase();
			}
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	.tabs {
		width: 100%;
		background: #007AFF;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #ffffff;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
	}

	.scroll-h {
		width: 100%;
		height: 80rpx;
		flex-direction: row;
		white-space: nowrap;
	}

	.uni-tab-item {
		width: 25%;
		display: inline-block;
		background: #f2f2f2;
		flex-wrap: nowrap;
		text-align: center;

	}

	.uni-tab-item-title {
		color: #555;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}

	.uni-tab-item-title-active {
		color: #007AFF;
		height: 74rpx;
		line-height: 80rpx;
		display: block;
		border-bottom: 4rpx #007AFF solid;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		flex: 1;
		flex-direction: row;
	}

	.scroll-v {
		flex: 1;
		/* #ifndef MP-ALIPAY */
		flex-direction: column;
		/* #endif */
		width: 750rpx;
		width: 100%;
	}

	.update-tips {
		position: absolute;
		left: 0;
		top: 41px;
		right: 0;
		padding-top: 5px;
		padding-bottom: 5px;
		background-color: #FDDD9B;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.top_tit {
		width: 100%;
		line-height: 80upx;
	}
</style>
