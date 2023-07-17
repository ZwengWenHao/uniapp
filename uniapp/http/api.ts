// 统一管理一些只在一个页面中使用或者数据不需要与其他页面共享的api，不需要存储到store里
import { ref, computed } from "vue";
import { corsApi } from "@/http";
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores';

const counter = useCounterStore();
const { user, selectOperator } = storeToRefs(counter);
const { getUserInfo } = counter;
const token = uni.getStorageSync('token');

// 修改个人资料
interface UserData {
	nickname?: string
	avatar?: string
}
export const updateInfo = async (data: UserData) => {
	const res = await corsApi('user/profile', 'POST', data);
	if (res) {
		console.log(res);
		// 修改成功后需要更新用户信息
		await getUserInfo();
		uni.showToast({
			title: '修改成功'
		})
		return true;
	} else {
		return false;
	}
}

// 更新Email
interface EmailData {
	email: string
}
export const updateEmail = async (data: EmailData) => {
	const res = corsApi('user/changeemailNoCheck', 'POST', data);
	if (res) {
		console.log(res);
		await getUserInfo();
		uni.showToast({
			title: '修改成功'
		})
		return true;
	} else {
		return false;
	}
}

// 选择图片并上传
interface UploadData {
	fullurl: string
	hash: string
	url: string
}
export const chooseImg = async () => {
	// 存储服务器返回的数据
	let imgUrl: UploadData | '' = '';
	// 选择图片
	try {
		const file = await uni.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
		}) as unknown as UniNamespace.ChooseImageSuccessCallbackResult;
		console.log(file);
		if (file) {
			// 判断大小
			if ((file.tempFiles as File[])[0].size > 4194308) {
				uni.showToast({
					icon: 'none',
					title: '无法上传，文件不能超过4M',
				});
			} else {
				// 成功后自动上传
				uni.showLoading({
					title: '正在上传',
					mask: true,
				});
				try {
					const upload = await uni.uploadFile({
						// 线上
						// url: 'https://children.multiples.cn-once.cn/api/common/upload',
						// 测试
						url: 'https://multiples.cn-once.cn/api/common/upload',
						filePath: file.tempFilePaths[0],
						name: 'file',
						header: { "token": token }
					}) as unknown as UniNamespace.UploadFileSuccessCallbackResult;
					console.log(upload);
					if (upload) {
						console.log(JSON.parse(upload.data));
						// 服务器返回信息
						const res = JSON.parse(upload.data);
						if (res.code === 1) {
							uni.showToast({
								title: '上传成功',
							})
							imgUrl = res.data;
						} else {
							uni.showToast({
								icon: 'none',
								title: res.msg,
							})
						}
					}
				} catch (e) {
					uni.showToast({
						icon: 'none',
						title: JSON.stringify(e),
					})
				}
			}
		}
	} catch (e: any) {
		uni.showToast({
			icon: 'none',
			title: JSON.stringify(e),
		})
	}
	return imgUrl;
}

interface AddDevice {
	tid: string
	alias_name: string
	maintenance_id: number
	device_leader: number
	image: string
	install_lng: number
	install_lat: number
	address: string
	install_quarter: number
}

// 安装人员添加设备
export const addDevice = async (data: AddDevice) => {
	const res = await corsApi('device/deviceInstall', 'POST', data)
	if (res) {
		uni.showToast({
			title: '添加成功'
		})
	}
}

// 拨打电话
export const callPhone = (phone: string) => {
	uni.makePhoneCall({
		phoneNumber: phone,
		fail: () => {
			uni.showToast({
				icon: 'none',
				title: '拨打电话失败'
			})
		}
	})
}

// 获取商品
export const getShop = async (text: string = '', page: number = 1) => {
	const res = await corsApi('mall/goods', 'POST', {
		search: text,
		page: page,
	})
	if (res) {
		// console.log(res);
		return res;
	} else {
		return false;
	}
}

// 添加购物车
export const addCartApi = async (id: number, quantity: number) => {
	const res = await corsApi('mall/cartAdd', 'POST', {
		mall_id: id,
		quantity: quantity,
	}, {
		loadingText: '正在提交',
		backAll: true,
	});
	if (res) {
		console.log(res);
		return res;
	} else {
		return false;
	}
}