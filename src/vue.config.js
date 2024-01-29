/**
 * @description vue应用 全局配置
 * @see {@link https://vue3js.cn/docs/zh/api/application-config.html#errorhandler}
 * @author 勇敢的小谢 2021/7/15
 **/

function useVueGlobalConfig(vueInstance) {
  vueInstance.errorHandler = () => {}

  vueInstance.errorHandler = () => {}

  vueInstance.globalProperties = {}

  vueInstance.performance = true
}

export default useVueGlobalConfig
