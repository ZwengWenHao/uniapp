import { corsApi } from "@/http";

export async function subscribe() {
	const res = await corsApi('user/snTicket', 'POST', {
		template_id: 'fxOciI9XLC5C9Vcn-JI_Xc2nLnkKTeJ0Dq_d7-562k0',
	});
	if (res) {
		// 订阅模板
		const temps = ['fxOciI9XLC5C9Vcn-JI_Xc2nLnkKTeJ0Dq_d7-562k0'];
		// console.log('微信授权');
		// #ifdef MP-WEIXIN
		console.log(res);
		wx.requestSubscribeDeviceMessage({
			tmplIds: temps,
			sn: '4DUlZ3MunkzrhjAYQwPC0w',
			snTicket: res,
			modelId: '4DUlZ3MunkzrhjAYQwPC0w',
			success: async(subRes:any) => {
				console.log(subRes);
				const postRes = await corsApi('user/setSubscribe', 'POST', {
					template_id: temps.join(',')
				});
				if (postRes) {
					uni.showToast({
						title: '订阅成功',
					})
				}
			},
			fail: (err:any) => {
				console.log(err)
			}
		})
	}
}