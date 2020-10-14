/*
 * 生成区间内随机正整数（闭区间）
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number} 区间内随机正整数
 */
export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 随机字符
 * @param {number} [8] length 字符长度
 * @returns {string} 指定长度的随机字符串
 */
export function randomStr(length = 8) {
  const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = 0; i < length; i++) {
    const index = parseInt(Math.random() * CHARS.length)
    result += CHARS[index]
  }
  return result
}

/**
 * 保留小数点后几位，非四舍五入
 * @param {(number|string)} number 数字
 * @param {number} length 位数，默认为2
 * @returns {string} 截取后的数字
 */
export function decimal(number = 0, digit = 2) {
  number = number.toString()
  return number.substring(0, number.lastIndexOf('.') + (digit > 0 ? digit + 1 : 0))
}

/**
 * 判断是否有更新
 * @param {string} mVersion 当前版本
 * @param {string} sVersion 服务器版本
 * @returns {boolean} 返回 true 为有新版本，否则为 false
 */
export function checkVersion(mVersion, sVersion) {
  let m = mVersion.split('.')
  let s = sVersion.split('.')

  const mLen = m.length
  const sLen = s.length

  const len = Math.max(mLen, sLen)

  // 位差补零
  const fill = Array(Math.abs(mLen - sLen)).fill('0')
  if (mLen < len) m.push(...fill)
  if (sLen < len) s.push(...fill)

  let position = 0
  let diff = 0

  // 依次比较版本号每一位大小，当对比得出结果后跳出循环
  while (position < len) {
    // 每位比较（服务器版本 - 当前版本）
    diff = s[position] - m[position]
    if (diff !== 0) break
    position++
  }

  return diff > 0
}

/**
 * 富文本转文本
 * @param {string} html 富文本
 * @returns {string} 文本
 */
export function html2text(html) {
  return html.replace(/\s*/g, '').replace(/<[^>]*>/g, '')
}

/**
 * 对象深合并
 * @param  {...any}  对象
 * @returns {object} 合并后的对象
 */
export function merge(...arg) {
  let result = {}
  for (let i = 0; i < arg.length; i++) {
    for (const k in arg[i]) {
      if (arg[i].hasOwnProperty(k)) {
        const val = arg[i][k]
        if (typeof result[k] === 'object' && typeof val === 'object') {
          result[k] = merge(result[k], val)
        } else {
          result[k] = val
        }
      }
    }
  }
  return result
}

/**
 * 对象深拷贝
 * @param {object} obj 对象
 * @returns 拷贝后的对象
 */
export function clone(obj) {
  // 原始类型直接返回
  if (typeof obj !== 'object' && typeof obj !== 'function') return obj
  let result = toString.call(obj) === '[object Array]' ? [] : {}
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      result[i] = typeof obj[i] === 'object' ? clone(obj[i]) : obj[i]
    }
  }
  return result
}

/**
 * 遍历对象或数组
 * @param {Object|Array} obj 要迭代的对象
 * @param {Function} fn 为每个项调用的回调
 */
export function forEach(obj, fn) {
  if (obj === null || typeof obj === 'undefined') return
  if (typeof obj !== 'object') obj = [obj]

  if (toString.call(obj) === '[object Array]') {
    for (let i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj)
    }
  } else {
    for (const k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        fn.call(null, obj[k], k, obj)
      }
    }
  }
}
