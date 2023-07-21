<template>
	<view>
		<view class="comment-item" @click="goReply">
			<view class="avatar">
				<u-avatar :src="giveAvatar(item)" size="26"></u-avatar>
			</view>

			<view class="wrap">
				<view class="username">
					{{giveName(item)}}
					<text v-if="!closeBtn" @click.stop="delComment" class="iconfont icon-a-43-guanbi"></text>
				</view>
				<view class="comment-content">{{item.comment_content}}</view>
				<view class="info">
					<view class="reply-btn" v-if="!childState">{{item.totalReply}}回复 </view>
					<view>
						<uni-dateformat :date="item.comment_date" :threshold="[60000,3600000*24*30]">
						</uni-dateformat>
					</view>
					<view>{{item.province}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		giveName,
		giveAvatar,
		likeFun
	} from "../../utils/tools.js"
	// 引入云对象
	const db = uniCloud.database()
	const utilsObj = uniCloud.importObject("utilsObj", {
		customUI: true // 取消自动展示的交互提示界面
	})
	export default {
		name: "comment-item",
		data() {
			return {

			};
		},
		props: {
			item: {
				type: Object,
				default: () => {
					return {}
				}
			},
			// 判断是否是子集,是否在评论详情页
			childState:{
				type:Boolean,
				default:false
			},
			// 在评论详情页隐藏关闭按钮
			closeBtn:{
				type:Boolean,
				default:false
			}
		},
		methods: {
			giveName,
			giveAvatar,
			// 刪除评论方法
			removeComment() {
				db.collection("quanzi_comment").doc(this.item._id).remove()
					.then(res => {
						// console.log(res);
						uni.showToast({
							title: "删除成功",
							icon: "success"
						})
						this.$emit("removeEnv", {
							id: this.item._id
						})
						if(this.item.comment_count>0){
							utilsObj.operation("quanzi_article","comment_count",this.item.article_id,-1)
						}
					})
			},
			// 删除评论
			delComment() {
				let uid = uniCloud.getCurrentUserInfo().uid
				if (uid == this.item.user_id[0]._id || 
				this.uniIDHasRole('admin') || 
				this.uniIDHasRole('master')) {
					uni.showModal({
						title: "是否确认删除",
						success: res => {
							this.removeComment()
						}
					})
					return
				}
				uni.showToast({
					title:"权限不够",
					icon:"error"
				})
			},
			// 跳转至回复页面
			goReply(){
				if(this.childState) return;
				uni.setStorageSync("replyItem",this.item)
				uni.navigateTo({
					url:"/pages/reply/reply"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-item {
		display: flex;

		.wrap {
			flex: 1;
			padding-left: 20rpx;
			padding-bottom: 20rpx;

			.username {
				font-size: 26rpx;
				color: #666;
				padding: 10rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.iconfont {
					font-size: 20rpx;
					padding: 10rpx;
					color: #999;
				}
			}

			.comment-content {
				font-size: 34rpx;
				color: #111;
				line-height: 1.8em;
			}

			.info {
				font-size: 26rpx;
				color: #666;
				display: flex;
				padding: 10rpx 0;
				align-items: center;

				view {
					margin-right: 25rpx;
				}

				.reply-btn {
					padding: 6rpx 18rpx;
					background: #e4e4e4;
					border-radius: 30rpx;
				}
			}
		}
	}
</style>