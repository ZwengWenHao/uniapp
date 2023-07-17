export const getIdAndTypeByScene = async (scene: string) => {
	let tid = '';
	let time = '';
	const param = decodeURIComponent(scene).split('&');
	if (param[0]) {
		const mids = param[0].split('=');
		if (mids[1]) {
			tid = mids[1];
		} else {
			tid = mids[0];
		}
	}
	if (param[1]) {
		const types = param[1].split('=');
		if (types[1]) {
			time = types[1];
		}
	}
	return {
		tid,
		time,
	}
}

// 扫码获取设备id及类型
export const openScan = async (codeType: 'all' | 'wechat' | 'nav' = 'all') => {
	let id = '';
	let type = '';
	uni.showLoading({
		title: '正在识别'
	})
	try {
		const res = await uni.scanCode() as unknown as UniNamespace.ScanCodeSuccessRes;
		uni.hideLoading();
		if (res) {
			console.log(res);
			const reg = /\?scene\=.+/g;
			// 通过小程序码获取
			if (res.path) {
				if (codeType === 'nav') {
					uni.navigateTo({
						url: '/' + res.path
					})
				} else {
					const arr = res.path.match(reg);
					if (arr?.length) {
						const scene = arr[0].slice(7);
						const data = await getIdAndTypeByScene(scene);
						id = data.id;
						type = data.type;
					} else {
						uni.showToast({
							icon: 'none',
							title: '未能获取设备ID'
						})
					}
				}
			} else {
				// 需要返回普通二维码信息
				if (codeType === 'all') {
					// 普通二维码获取值之间返回
					if (res.result) {
						id = res.result;
					} else {
						uni.showToast({
							icon: 'none',
							title: '未获取到数据',
						})
					}
				} else {
					uni.showToast({
						icon: 'none',
						title: '非小程序二维码',
					})
				}
			}
		} else {
			uni.showToast({
				icon: 'none',
				title: '扫码失败'
			})
		}
	} catch (err) {
		uni.showToast({
			icon: 'none',
			title: '扫码失败'
		})
	}
	return {
		id,
		type,
	};
}

// 扫码直接跳转

export const getScanInfo = async () => {
	const res = await uni.scanCode()
	let info = {}
	uni.hideLoading();
	if (res?.result) {
		 info = await getSacn(res.result)
	} else {
		uni.showToast({
			icon: 'none',
			title: '未能获取设备ID'
		})
	}
	return info
}

export const getSacn = (url) => {
	let theRequest = {};
	if (url.indexOf("#") != -1) {
		const str = url.split("#")[1];
		const strs = str.split("&");
		for (let i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
		}
	} else if (url.indexOf("?") != -1) {
		const str = url.split("?")[1];
		const strs = str.split("&");
		for (let i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
		}
	}
	return theRequest
}