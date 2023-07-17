// 打开地图
export function openMap(latitude:number | string, longitude:number | string) {
	latitude = Number(latitude);
	longitude = Number(longitude);
	if (!isNaN(latitude) && !isNaN(longitude)) {
		uni.openLocation({
			latitude: latitude,
			longitude: longitude,
			success: function () {
				console.log('success');
			}
		});
	} else {
		uni.showToast({
			icon: 'none',
			title: '未能获取正确的经纬度'
		})
	}
}