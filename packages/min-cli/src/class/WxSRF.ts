import { Depend, Request, WxFile } from '../class'
import util, { config, log, LogType } from '../util'

/**
 * 静态资源文件 StaticResourcesFile
 *
 * @export
 * @class WxSRF
 * @implements {WxFile.Core}
 */
export class WxSRF implements WxFile.Core {

  /**
   * Creates an instance of WxSRF.
   * @param {Request} request
   * @memberof WxSRF
   */
  constructor (public request: Request) {

  }

  /**
   * 保存文件
   *
   * @memberof WxSRF
   */
  save () {
    if (this.request.isJson) {
      let content = util.readFile(this.request.src)
      // src => *.json = {}
      // dest => *.json.js = module.exports = {}
      log.msg(LogType.BUILD, this.request.srcRelative)
      log.msg(LogType.WRITE, `${this.request.destRelative}.js`)
      util.writeFile(this.request.dest + config.ext.js, `module.exports = ${content}`)
    } else {
      log.msg(LogType.COPY, `${this.request.srcRelative} To ${this.request.destRelative}`)
      util.copyFile(this.request.src, this.request.dest)
    }
  }

  /**
   * 移除文件
   *
   * @memberof WxSRF
   */
  remove () {
    log.msg(LogType.DELETE, this.request.destRelative)
    util.unlink(this.request.dest)
  }

  /**
   * 获取依赖列表
   *
   * @returns {Depend[]}
   * @memberof WxSRF
   */
  getDepends (): Depend[] {
    return []
  }

  /**
   * 更新依赖列表
   *
   * @param {Request.Core[]} useRequests 可用的请求列表
   * @memberof WxSRF
   */
  updateDepends (useRequests: Request.Core[]): void {
    //
  }

  /**
   * 获取内部依赖，例如 less 预编译语言的代码里 import 了外部文件
   *
   * @returns {string[]}
   * @memberof WxSFC
   */
  getInternalDepends (): string[] {
    return []
  }
}