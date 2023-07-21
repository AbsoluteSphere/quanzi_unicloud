//获取富文本内的图片url地址
export function getImgSrc(richtext, num = 3) {
	let imgList = [];
	richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
		imgList.push(capture);
	});
	imgList = imgList.slice(0, num)
	return imgList;
}

//向外导出省份
export function getProvince() {
	return new Promise((resolve, reject) => {
		let historyProvince = uni.getStorageSync("historyProvince");
		if (historyProvince) {
			if ((Date.now() - historyProvince.time) > 1000 * 60 * 60) {
				getIp().then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			} else {
				resolve(historyProvince.province);
			}
		} else {
			getIp().then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}
	})
}

//获取所在省市
function getIp() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: "https://restapi.amap.com/v3/ip?key=4a43fb1fc001e386a52215b6feea63f4",
			success: res => {
				let str = ""
				typeof(res.data.province) == "string" ? str = res.data.province: str = "火星"
				resolve(str)
				let obj = {
					province: str,
					time: Date.now()
				}
				uni.setStorageSync("historyProvince", obj);
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

// 获取昵称
export function giveName(item) {
	return item.user_id[0].nickname || item.user_id[0].username || item.user_id[0].mobile || "请设置名称"
}

// 获取默认头像
export function giveAvatar(item) {
	return item.user_id[0]?.avatar_file?.url ?? '../../static/images/user-default.jpg'
}

const db = uniCloud.database()
const utilsObj = uniCloud.importObject("utilsObj", {
	customUI: true // 取消自动展示的交互提示界面
})
// 点赞操作数据库的方法
export async function likeFun(artid) {
	// 发起网络请求 $cloudEnv_uid是jql语句内云端环境变量
	let count = await db.collection("quanzi_like")
		.where(`article_id=='${artid}' && user_id==$cloudEnv_uid`).count()
	// console.log(count);
	if (count.result.total) {
		db.collection("quanzi_like").where(`article_id=='${artid}'&&user_id==$cloudEnv_uid`)
			.remove()
		utilsObj.operation("quanzi_article", "like_count", artid, -1)
	} else {
		db.collection("quanzi_like").add({
			article_id: artid
		})
		// 使用定义的云对象将点赞数+1
		utilsObj.operation("quanzi_article", "like_count", artid, 1)
	}
}		