export interface Pagination {
  currentPage: number
  pageSize: number
  total: number
  pageSizes?: any[]
  layout?: String
}

export interface TableStateProps {
  loading: boolean
  tableData: any[]
  multipleSelection: any[]
  pagination: Pagination
  searchParam: {
    [key: string]: any
  }
  totalParam: {
    [key: string]: any
  }
  icon?: {
    [key: string]: any
  }
}

export interface TableOption {
  fetchDataApi: (...params: any) => Promise<any>
  dataCallBack?: (data: any) => any
  defaultParam?: {
    [key: string]: any
  }
  isPage?: boolean
  lazy?: boolean
}

/**
 * 设计思路(首先要知道这个hook要输出的产物是什么？)
 * 产物：1.获取表格数据的方法getTableData
 * 产物：2.查询条件变量searchParam
 * 产物：3.分页查询条件变量pagination
 * 产物：4.分页pageSize变更的方法handleSizeChange()
 * 产物：5.分页currentPage变更的方法handleCurrentChange()
 * 产物：6.查询方法search()
 * 产物：7.初始化参数的变量searchInitParam
 */
export const useTable = (config: TableOption) => {
  const { fetchDataApi, dataCallBack, defaultParam = {}, lazy = false, isPage = true } = config
  const state = reactive<TableStateProps>({
    loading: false,
    tableData: [],
    multipleSelection: [],
    pagination: {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [1, 10, 20, 50, 100, 200],
      layout: 'total, sizes, prev, pager, next, jumper'
    },
    searchParam: {},
    totalParam: {}
  })

  onMounted(() => {
    if (!lazy) {
      reset()
    }
  })

  watch([state.searchParam, state.pagination], () => {
    mergeParam()
  })

  /**
   * 合并后请求时需要的参数
   */
  const mergeParam = async () => {
    if (isPage) {
      Object.assign(
        state.totalParam,
        defaultParam,
        state.searchParam,
        state.pagination.currentPage,
        state.pagination.pageSize
      )
    } else {
      Object.assign(state.totalParam, defaultParam, state.searchParam)
    }
    // 过滤空字符串的参数，不加入到请求参数中
    const filteredEntries = Object.entries(state.totalParam).filter(([_key, value]) => value !== '')
    state.totalParam = Object.fromEntries(filteredEntries)
  }

  const fetchData = async () => {
    state.loading = true
    console.group('fetchData')
    try {
      console.log('fetchDataApi param', state.totalParam)

      // 请求数据
      let res = await fetchDataApi(state.totalParam)
      console.log('fetchDataApi res', res)

      // 数据回调函数
      if (dataCallBack) {
        res = await dataCallBack(res)
        console.log('dataCallBack res', res)
      }
      if (isPage) {
        state.tableData = res.data.records
        state.pagination.total = res.data
      } else {
        state.tableData = res.data
      }
      console.log('tableData', state.tableData)
    } catch (err) {
      console.error('fetchData error!', err)
    } finally {
      state.loading = false
    }
    console.groupEnd()
  }

  const search = () => {
    state.pagination.currentPage = 1
    fetchData()
  }

  const reset = () => {
    // 清空搜索参数
    Object.keys(state.searchParam).forEach((key) => {
      state.searchParam[key] = undefined
    })
    // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
    if (defaultParam) {
      Object.keys(defaultParam).forEach((key) => {
        state.searchParam[key] = defaultParam[key]
      })
    }
    console.log('reset searchParam', state.searchParam)
    search()
  }

  const handleSizeChange = (pageSize: number) => {
    state.pagination.currentPage = 1
    state.pagination.pageSize = pageSize
    fetchData()
  }
  const handleCurrentChange = (currentPage: number) => {
    state.pagination.currentPage = currentPage
    fetchData()
  }

  return {
    ...toRefs(state),
    fetchData,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange
  }
}
