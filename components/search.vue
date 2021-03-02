<template>
	<view>
		<button type="primary" class="search-btn" @click="getList('search')"></button>
		<input class="se-input" name="nickname" placeholder="请输入客户名称" v-model="kword" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
