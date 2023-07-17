export interface reqResult {
	code: number
	data: any
	msg: string
	time: string | number
}
export interface HttpConfig {
	showLoading?: boolean
	loadingText?: string
	backAll?: boolean
	withToken?: boolean
} 

// 封装请求promise化
export async function corsApi(url:string, methodType: 'POST' | 'GET' = 'POST', data:any = undefined, userConfig: HttpConfig = {}) {
	// 初始配置项
	const config = {
		showLoading: true,
		loadingText: '加载中',
		backAll: false,
		withToken: true,
		// 用户配置覆盖初始配置
		...userConfig,
	}
	// console.log(config);
	if (config.showLoading) {
		uni.showLoading({
			title: config.loadingText,
			mask: true,
		})
	}
	const token = uni.getStorageSync('token');
	let headers: any = undefined;
	if (token && config.withToken) {
		headers = {
			"token" : token
		}
	}
  try {
		const res = await uni.request(
			{
				url: url,
				method: methodType,
				data: data,
				header: headers,
			}
		) as unknown as UniNamespace.RequestSuccessCallbackResult;
		// 此处的 res 参数，与使用默认方式调用时 success 回调中的 res 参数一致
		console.log(res);
		if (config.showLoading) {
			uni.hideLoading();
		}
		if (res.statusCode >= 200 && res.statusCode < 300) {
			const result = res.data as unknown as reqResult;
			if (config.backAll) {
				return result;
			} else {
				if (result.code === 1) {
					return result.data || result.msg || true;
				} else {
					uni.showToast({
						icon:"none",
						title: result.msg,
						duration: 2500,
					})
					return false;
				}
			}
		} else {
			if (res.statusCode === 401) {
				uni.showToast({
					icon:"none",
					title: `请重新登录`,
					duration: 1500,
					mask: true,
				});
				// setTimeout(() => {
				// 	uni.clearStorageSync();
				// 	uni.navigateTo({
				// 		url: '/pages/login/login'
				// 	})
				// }, 1500)
			} else {
				uni.showToast({
					icon:"none",
					title: `网络错误，错误码：${res.statusCode}`,
					duration: 2500,
				})
			}
			return false;
		}
	} catch (err) {
		// 此处的 err 参数，与使用默认方式调用时 fail 回调中的 err 参数一致
		uni.hideLoading();
		uni.showToast({
			icon:"none",
			title: '网络错误' + JSON.stringify(err),
			duration: 2500,
		})
	}
}
