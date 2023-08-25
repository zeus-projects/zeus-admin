import { ElMessage } from 'element-plus'
import request from '@/config/axios'
import { snakeCase } from 'lodash-es'

/**
 * lazy: 是否延迟获取表格数据，默认为 false
 * queryForm: 查询条件表单对象，类型为 any
 * pagination: 分页属性对象
 * descs: 排序时使用的字段名数组，如 ['id','name']，默认为空数组
 * ascs: 排序方向数组，如 ['asc', 'desc']，默认为空数组
 * getDataApi:  数据列表查询接口 api 方法，接收任意数量参数，返回 Promise
 * loading: loading标志，默认为 false
 * props: props 属性对象，类型为 any
 * dataList: 数据列表数组
 * selectedRows: 多选结果数组
 */
export interface TableProp {
  lazy?: boolean
  queryForm?: any
  pagination?: Pagination
  descs?: string[]
  ascs?: string[]
  getDataApi?: (...arg: any) => Promise<any>
  loading?: Boolean
  props?: any
  dataList?: any[]
  selectedRows?: any[]
}

/**
 * enable: 是否启用分页
 * current: 当前页码，默认为1
 * size: 每页显示条数，默认为10
 * total: 总条数，默认为0
 * pageSizes: 每页显示条数选择器的选项数组，默认为[10,20,30,40]
 * layout: 分页组件布局方式，可选值有 total,sizes,prev,jump,next，默认为'total,sizes,prev,jump,next'
 */
export interface Pagination {
  enable?: boolean
  current?: number
  size?: number
  total?: number
  pageSizes?: any[]
  layout?: String
}

export function useTable(options?: TableProp) {
  // 默认配置
  const defaultOptions: TableProp = {
    lazy: false,
    queryForm: {},
    pagination: {
      enable: true,
      current: 1,
      size: 10,
      total: 0,
      pageSizes: [1, 10, 20, 50, 100, 200],
      layout: 'total, sizes, prev, pager, next, jumper'
    } as Pagination,
    descs: [],
    ascs: [],
    loading: false,
    dataList: [],
    selectedRows: [],
    props: {
      item: 'records',
      totalCount: 'total'
    }
  }

  /**
   * 合并默认属性配置和自定义属性配置
   * @param defaultOptions 默认属性配置对象
   * @param customOptions 自定义属性配置对象
   * @returns 合并后的属性配置对象
   */
  const mergeDefaultOptions = (defaultOptions: any, customOptions: any): TableProp => {
    for (const key in defaultOptions) {
      if (!Object.getOwnPropertyDescriptor(customOptions, key)) {
        customOptions[key] = defaultOptions[key]
      }
    }
    return customOptions
  }

  const state = mergeDefaultOptions(defaultOptions, options)

  /**
   * 发起分页查询，并设置表格数据和分页信息
   */
  const query = async () => {
    if (state.getDataApi) {
      try {
        state.loading = true
        // 请求数据
        const res = await state.getDataApi({
          ...state.queryForm,
          current: state.pagination?.current,
          size: state.pagination?.size,
          descs: state.descs,
          ascs: state.ascs
        })
        if (state.pagination!.enable) {
          state.dataList = res.data[state.props.item]
          state.pagination!.total = res.data[state.props.totalCount]
        } else {
          state.dataList = res.data
          state.pagination!.total = 0
        }
      } catch (err: any) {
        ElMessage.error(err.msg || err.data.msg)
      } finally {
        state.loading = false
      }
    }
  }

  onMounted(() => {
    if (!state.lazy) {
      query()
    }
  })

  /**
   * 分页大小改变事件处理函数
   * @param newSize 新的分页大小
   */
  const handlePageSizeChange = (newSize: number) => {
    state.pagination!.size = newSize
    query()
  }

  /**
   * 当前页码改变事件处理函数
   * @param newPage 新的页码
   */
  const handlePageCurrentChange = (newPage: number) => {
    state.pagination!.current = newPage
    query()
  }

  /**
   * 排序触发事件
   * @param column 排序属性
   */
  const handleSortChange = (column: any) => {
    const prop = snakeCase(column.prop)
    if (column.order === 'desc') {
      state.descs?.push(prop)
      if (state.ascs!.indexOf(prop) >= 0) {
        state.ascs?.splice(state.ascs.indexOf(prop), 1)
      }
    } else if (column.order === 'asc') {
      state.ascs?.push(prop)
      if (state.descs!.indexOf(prop) >= 0) {
        state.descs?.splice(state.descs.indexOf(prop), 1)
      }
    } else {
      if (state.ascs!.indexOf(prop) >= 0) {
        state.ascs?.splice(state.ascs.indexOf(prop), 1)
      }
      if (state.descs!.indexOf(prop) >= 0) {
        state.descs?.splice(state.descs.indexOf(prop), 1)
      }
    }
    query()
  }

  /**
   * 获取数据列表，并可选择是否刷新当前页码
   * 刷新后不跳转第一页，则入参 getDataList(false)
   * @param refresh 是否刷新当前页码
   */
  const getDataList = (refresh?: any) => {
    if (refresh !== false) {
      state.pagination!.current = 1
    }
    query()
  }

  /**
   * 下载文件
   * @param url 文件下载地址
   * @param query 请求参数（可能包含token）
   * @param fileName 文件名
   * @returns 返回一个Promise对象，用于异步处理结果
   */
  const downBlobFile = (url: string, query: any, fileName: string) => {
    return request
      .get({
        url: url,
        responseType: 'blob',
        params: query
      })
      .then((response) => {
        handleBlobFile(response, fileName)
      })
  }

  /**
   * blob 文件刘处理
   * @param response 响应结果
   * @returns
   */
  function handleBlobFile(response: any, fileName: string) {
    // 处理返回的文件流
    const blob = response
    if (blob && blob.size === 0) {
      ElMessage.error('内容为空，无法下载')
      return
    }
    const link = document.createElement('a')
    // 兼容一下 入参不是 File Blob 类型情况
    const binaryData = [] as any
    binaryData.push(response)
    link.href = window.URL.createObjectURL(new Blob(binaryData))
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    window.setTimeout(function () {
      // @ts-ignore
      URL.revokeObjectURL(blob)
      document.body.removeChild(link)
    }, 0)
  }

  return {
    getDataList,
    handlePageSizeChange,
    handlePageCurrentChange,
    handleSortChange,
    downBlobFile
  }
}
