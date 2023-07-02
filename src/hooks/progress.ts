import nprogress from "nprogress"

/**
 * 进度条工具
 */
export const useProgress = {
   showFullLoading() {
      nprogress.configure({ showSpinner: false });
      nprogress.start()
   },
   hideFullLoading() {
      nprogress.done()
   }
}

// 显示全屏 loading
export function showFullLoading() {
   nprogress.configure({ showSpinner: false });
   nprogress.start()
}

// 隐藏全屏 loading
export function hideFullLoading() {
   nprogress.done()
}