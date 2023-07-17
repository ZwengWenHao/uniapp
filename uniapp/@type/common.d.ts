declare var wx: any;

interface Detail {
	value: string
	label: string
	type: 'text' | 'phone' | 'copy'
}

interface reqResult {
	code: number
	data: any
	msg: string
	time: string | number
}

interface DataCamType {
	text: number | string
	value: number | string
	children?: DataCamType[]
}

interface DetailType {
	value: number
	markerId?: number
}

interface EventHandle {
	detail: DetailType
}

interface DeviceData {
	address?: string
	alias_name?: string
	company_name?: string
	imei?: string
	image?: string
	port?: any
	[propName: string]: any;
}

interface AuthData {
	is_installer?: number
	total?: string
	[propName: string]: any;
}

interface SelectTree {
	value: string | number
	text: string
	type: number
	children: SelectTree[]
}

interface Opeartor {
	company_name: string
	id: number
	type: number
}

interface GoodsItem {
	description: string
	diagram_image: string[]
	goods_id?: number
	id: number
	name: string
	sale_price: string
	sale_score: string
	sale_stock: number
	source_price: string
	source_score: string
	source_stock: number
	thumbnail_image: string
	tagN?: string[]
	status?: number
	checked?: boolean
	quantity?: number
	mall_id?: number
	old_quantity?: number
}

interface AddressItem {
	address: string
	cityName: string
	city_id: string
	contact_mobile: string
	contact_name: string
	districtName: string
	district_id: string
	id: number
	is_default: number
	provinceName: string
	province_id: string
	streetName: string
	street_id: number
	check: boolean
}

interface MenuProps {
	icon: string
	selectIcon: string
	text: string
	onlyIcon?: boolean
	isMiddle?: boolean
}