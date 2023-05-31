import nprogress from "nprogress"

// 显示全屏 loading
export function showFullLoading() {
   nprogress.start()
}

// 隐藏全屏 loading
export function hideFullLoading() {
   nprogress.done()
}