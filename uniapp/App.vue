<script>
	import { storeToRefs } from 'pinia';
	import { useCounterStore } from '@/stores';
	import { corsApi } from '@/http';
	export default {
		globalData: {
				statusHeight: 0,
				bottomHeight: 0,
				windowHeight: 0,
		},
		
		onLaunch: async function(e) {
			console.log(e);
			// 获取store仓库
			const counter = useCounterStore();
			const { updateUserInfo, changeRole, getOperator, getUserAuth } = counter;
			const { auth } = storeToRefs(counter);
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	
</style>
