<template>
	<view class="detail">
		<view class="container">
			<!-- <unicloud-db 
			:where="`_id=='${artid}'`" v-slot:default="{data, loading, error, options}" :getone="true" 
			:collection="colList"> -->
			<!-- {{data}} -->
			<!-- <view v-if="error">{{error.message}}</view> -->
			<view v-if="loadState">
				<u-skeleton loading rows="7" title></u-skeleton>
			</view>
			<view v-else>
				<view class="title">{{detailObject.title}}</view>
				<view class="userinfo">
					<view class="avatar">
						<image :src="giveAvatar(detailObject)" mode="aspectFill"></image>
					</view>
					<view class="text">
						<view class="name">
							{{giveName(detailObject)}}
						</view>
						<view class="small">
							<uni-dateformat :date="detailObject.publish_date"
								format="yyyy年MM月dd日hh:mm  "></uni-dateformat> · 发布于 {{detailObject.province}}
						</view>
					</view>
				</view>
				<view class="content">
					<!-- <view v-html="data.content"></view> -->
					<!-- uview的富文本解析器 -->
					<u-parse :content="detailObject.content" :tagStyle="tagStyle" :selectable="true"></u-parse>
				</view>

				<view class="like">
					<view class="btn" :class="detailObject.isLike?'active':''" @click="clickLike">
						<text class="iconfont icon-good-fill"></text>
						<text v-if="detailObject.like_count">{{detailObject.like_count}}</text>
					</view>
					<view class="users">
						<template v-for="item in likeUserArr">
							<image v-if="item.user_id[0].avatar_file" :src="giveAvatar(item)" mode="aspectFill"></image>
						</template>
					</view>
					<view class="text"><text class="num">{{detailObject.view_count}}</text>人看过</view>
				</view>
			</view>
			<!-- </unicloud-db> -->

		</view>

		<view class="comment">
			<view v-if="!commentList.length && noComment">
				<u-empty mode="comment" icon="https://cdn.uviewui.com/uview/empty/comment.png">
				</u-empty>
			</view>
			<view class="content" v-if="commentList.length">
				<view class="item" v-for="item in commentList">
					<comment-item :item="item" @removeEnv="P_removeEnv"></comment-item>
				</view>
			</view>
			<comment-frame :commentObj="commentObj" @commentEnv="P_commentEnv"></comment-frame>
		</view>
	</view>
</template>

<script>
	import {
		giveName,
		giveAvatar,
		likeFun
	} from "../../utils/tools.js"
	import pagesJson from "@/pages.json"
	const db = uniCloud.database()
	const utilsObj = uniCloud.importObject("utilsObj", {
		customUI: true // 取消自动展示的交互提示界面
	})
	// 引入uni-starter模板项目的store
	import {
		store
	} from '@/uni_modules/uni-id-pages/common/store.js'
	export default {
		data() {
			return {
				artid: "",
				loadState: true,
				tagStyle: {
					p: "line-height:1.7em; font-size:16px; text-indent:2em; padding-bottom:10rpx;", //设置行高1.7倍,text-indent:2em段落空格
					img: "margin:10rpx 0;",
				},
				detailObject: {},
				likeUserArr: [], // 点过赞的用户
				commentObj: {
					article_id: "",
					comment_type: 0
				},
				commentList: [],
				noComment: false
			};
		},
		onLoad(e) {
			// 进入详情页首先判断是否有id
			if (!e.id) {
				this.errFun()
				return
			}
			// console.log(e);
			this.artid = e.id
			this.commentObj.article_id = e.id
			this.getData()
			this.readUpdate()
			this.getLikeUser()
			this.getComment()
		},
		methods: {
			giveName,
			giveAvatar,
			// 获取数据库数据
			getData() {
				let artTemp = db.collection("quanzi_article").where(`_id=='${this.artid}'`).getTemp()
				let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp()
				let likeTemp = db.collection("quanzi_like").where(`article_id=='${this.artid}'&&user_id==$cloudEnv_uid`)
					.getTemp()
				let tempArr = [artTemp, userTemp]
				if (store.hasLogin) tempArr.push(likeTemp)
				db.collection(...tempArr).get({
					getOne: true
				}).then(res => {
					// console.log(res);
					if (!res.result.data) {
						this.errFun()
						return
					}
					this.loadState = false
					let isLike = false
					// 根据是否有_id.quanzi_like判断是否点赞
					if (store.hasLogin) isLike = res.result.data._id.quanzi_like.length ? true : false
					// 给联表查询返回值加一个是否点赞的属性
					res.result.data.isLike = isLike
					this.detailObject = res.result.data
					uni.setNavigationBarTitle({
						title: this.detailObject.title
					})
				}).catch(err => {
					this.errFun()
				})
			},
			// 错误处理，没有获取id时
			errFun() {
				uni.showToast({
					title: "参数有误",
					icon: 'error'
				})
				setTimeout(() => {
					uni.navigateTo({
						url: "/pages/index/index"
					})
				}, 1000)
			},
			// 修改阅读量
			readUpdate() {
				utilsObj.operation("quanzi_article", "view_count", this.artid, 1).then(res => {
					// console.log(res);
				})
			},
			// 点赞操作
			clickLike() {
				if (!store.hasLogin) {
					uni.showModal({
						title: "是否前往登录",
						success: res => {
							if (res.confirm) {
								uni.navigateTo({
									url: "/" + pagesJson.uniIdRouter.loginPage
								})
							}
						}
					})
					return
				}
				// 防抖，防止连续点击
				let time = Date.now()
				if (time - this.likeTime < 2000) {
					uni.showToast({
						title: "操作太频繁，请稍后...",
						icon: 'none'
					})
					return
				}
				this.likeTime = time
				// 放在网络请求前立即就能变化
				this.detailObject.isLike ? this.detailObject.like_count-- : this.detailObject.like_count++
				this.detailObject.isLike = !this.detailObject.isLike
				// 调用点赞方法
				likeFun(this.artid)
			},
			// 获取点赞的用户
			getLikeUser() {
				let likeTemp = db.collection("quanzi_like").where(`article_id == '${this.artid}'`).getTemp()
				let userTemp = db.collection("uni-id-users").field("_id,avatar_file").getTemp()
				db.collection(likeTemp, userTemp).orderBy("publish_date desc").list(5).get().then(res => {
					// console.log(res);
					// 翻转数组，以防先出的被压住
					res.result.data = res.result.data.reverse()
					this.likeUserArr = res.result.data
				})
			},
			// 获取评论列表
			async getComment() {
				let commentTemp = db.collection("quanzi_comment")
					.where(`article_id=='${this.artid}' && comment_type==0`)
					.orderBy("comment_date desc").limit(5).getTemp()
				let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp()
				let res = await db.collection(commentTemp, userTemp).get()
				// console.log(res);
				let idArr = res.result.data.map(item => {
					return item._id
				})
				let replyArr = await db.collection("quanzi_comment").where({
					reply_comment_id: db.command.in(idArr)
				}).groupBy('reply_comment_id')
				.groupField('count(*) as totalReply').get()
				res.result.data.forEach(item=>{
					let index = replyArr.result.data.findIndex(find=>{
						return find.reply_comment_id == item._id
					})
					if(index>-1){
						item.totalReply = replyArr.result.data[index].totalReply
					}
				})
				if (res.result.data.length == 0) this.noComment = true
				this.commentList = res.result.data

			},
			// 评论成功后的回调
			P_commentEnv(e) {
				// console.log(e);
				this.commentList.unshift({
					...this.commentObj,
					...e,
					user_id: [store.userInfo]
				})
			},
			// 删除评论的回调
			P_removeEnv(e) {
				// console.log(e);
				let index = this.commentList.findIndex(item => {
					return item._id == e.id
				})
				this.commentList.splice(index, 1)
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		background: #f8f8f8;
		min-height: calc(100vh - var(--window-top));

		.container {
			padding: 30rpx;
			background: #fff;

			.title {
				font-size: 46rpx;
				color: #333;
				line-height: 1.4em;
				font-weight: 600;
			}

			.userinfo {
				padding: 20rpx 0 50rpx;
				display: flex;
				align-items: center;

				.avatar {
					width: 60rpx;
					height: 60rpx;
					padding-right: 15rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.text {
					font-size: 28rpx;
					color: #555;

					.small {
						font-size: 20rpx;
						color: #999;
					}
				}
			}

			.content {}

			.like {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 80rpx 50rpx 50rpx;

				.btn {
					width: 260rpx;
					height: 120rpx;
					background: #e4e4e4;
					border-radius: 100rpx;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					font-size: 28rpx;

					.iconfont {
						font-size: 50rpx;
					}

					&.active {
						background: #0199FE;
					}
				}

				.text {
					font-size: 26rpx;
					color: #666;

					.num {
						color: #0199FE
					}

					.spot {
						padding: 0 10rpx;
					}
				}

				.users {
					display: flex;
					justify-content: center;
					padding: 30rpx 0;

					image {
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						border: 3px solid #fff;
						margin-left: -20rpx;
					}
				}
			}

		}

		.comment {
			padding: 30rpx;
			padding-bottom: 120rpx;
		}
	}
</style>