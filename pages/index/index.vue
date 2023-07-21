<template>
	<view class="home">
		<view class="topnav">
			<u-tabs :list="navlist" @click="clickNav" :activeStyle="{
				color: '#333',
				fontWeight: 'bold',
				transform: 'scale(1.08)'
			}" :inactiveStyle="{
				color: '#888',
				transform: 'scale(1)'
			}"></u-tabs>
		</view>
		<view class="loadingState" v-show="this.loadState">
			<u-skeleton avatar rows="5" title loading></u-skeleton>
		</view>
		<view class="content">
			<view class="item" v-for="item in dataList">
				<blog-item @delEvent="P_delEvent" 
				:item="item" 
				:isLike.sync="item.isLike"
				:like_count.sync="item.like_count"></blog-item>
			</view>
		</view>
		<view class="">
			<uni-load-more :status="uniLoad"></uni-load-more>
		</view>
		<view class="edit" @click="goEdit">
			<text class="iconfont icon-a-21-xiugai"></text>
		</view>
	</view>
</template>

<script>
	// 引入uni-starter模板项目的store
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	const db = uniCloud.database()
	const dbCmd = db.command
	export default {
		data() {
			return {
				navlist: [{
						name: "最新",
						type: "publish_date"
					},
					{
						name: "热门",
						type: "view_count"
					}
				],
				navActive: 0, //默认选中的nav导航数组下标
				loadState: true, //骨架屏状态	
				dataList: [], //文章数组
				uniLoad:"more",
				noMore:''
			}
		},
		onLoad() {
			this.getData()
		},
		// 触底
		onReachBottom() {
			this.uniLoad = 'loading'
			if(this.noMore) return this.uniLoad='noMore'
			this.getData()
		},
		methods: {
			clickNav(e) {
				// console.log(e);
				this.loadState = true
				this.dataList = [] //点击时清空数组，避免骨架屏下面还有内容
				this.uniLoad = 'more'
				this.navActive = e.index
				this.getData()
			},
			// 跳转至编辑页面
			goEdit() {
				uni.navigateTo({
					url: "/pages/edit/edit"
				})
			},
			// 获取数据
			getData() {
				let artTemp = db.collection("quanzi_article").where(`delState != true`).field(
					"title,user_id,description,picurls,comment_count,like_count,view_count,publish_date").getTemp()
				let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp()
				db.collection(artTemp, userTemp).orderBy(this.navlist[this.navActive].type, "desc")
				.skip(this.dataList.length).limit(5).get()
					.then(async res => {
						// console.log(res);
						// 存放所有展示的文章id
						let idArr = []
						// 触底前的老数据
						let oldArr= this.dataList
						if(res.result.data.length==0){
							this.noMore = true
						}
						// res.result.data是文章数据
						let resDataArr = [...oldArr,...res.result.data]
						// 判断是否登录,登录了才进入点赞高亮逻辑
						if (store.hasLogin) {
							// 获取有被点赞的文章的id
							resDataArr.forEach(item => {
								// resDataArr._id是文章id
								idArr.push(item._id)
							})
							// 当前用户点赞的文章数据
							let likeRes = await db.collection("quanzi_like").where({
								article_id: dbCmd.in(idArr),
								// 筛选点赞的用户id为当前id
								user_id: uniCloud.getCurrentUserInfo().uid
							}).get()
							// 找到点赞的文章在所有文章数组里的下标
							likeRes.result.data.forEach(item => {
								let findIndex = resDataArr.findIndex(find => {
									return item.article_id == find._id
								})
								// console.log(findIndex);
								// 给点赞的项加一个属性判断是否点赞
								resDataArr[findIndex].isLike = true
							})
						}
						// console.log(likeRes);
						this.dataList = resDataArr
						this.loadState = false
					})
			},
			// 清空数组
			P_delEvent() {
				this.dataList = []
				this.getData()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		.topnav {
			margin-bottom: 30rpx;
		}

		.loadingState {
			padding: 30rpx;
		}

		.content {
			.item {
				padding: 30rpx;
			}
		}

		.edit {
			width: 120rpx;
			height: 120rpx;
			background: #0199FE;
			border-radius: 50%;
			color: #fff;
			position: fixed;
			z-index: 100;
			bottom: 150rpx;
			right: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0 0 20rpx rgba(1, 153, 254, 0.8);

			.iconfont {
				font-size: 50rpx;
			}
		}
	}
</style>