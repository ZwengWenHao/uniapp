export default function ceptor() {
	uni.addInterceptor('request', {
		invoke(args) {
			if (!args.url.startsWith('http')) {
				args.url = 'https://multiples.cn-once.cn/api/'+args.url
			}
		},
		success(args) {

		},
		fail(err) {

		},
		complete(res) {

		}
	})
}