/*
 * 生成区间内随机正整数（闭区间）
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number} 区间内随机正整数
 */
export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 保留小数点后几位，非四舍五入
 * @param {(number|string)} number 数字
 * @param {number} length 位数，默认为2
 * @param {boolean} fill 是否根据位数补零，默认为false
 * @returns {string} 截取后的数字
 */
export function decimal(number = 0, digit = 2, fill = false) {
  // const reg = new RegExp(`([0-9]+\.[0-9]{${digit}})[0-9]*`);
  // const num = String(number).replace(reg, '$1').split('.');
  // const after = fill ? (num[1] || '').padEnd(digit, '0') : num[1];
  // return num[0] + (after ? '.' + after : '');
  const d = digit + 1;
  const n = number.toFixed(d);
  return n.substring(0, n.lastIndexOf('.') + d);
}

/**
 * 判断是否有更新
 * @param {string} mVersion 当前版本
 * @param {string} sVersion 服务器版本
 * @returns {boolean} 返回 true 为有新版本，否则为 false
 */
export function checkVersion(mVersion, sVersion) {
  let m = mVersion.split('.');
  let s = sVersion.split('.');

  const mLen = m.length;
  const sLen = s.length;

  const maxLen = Math.max(mLen, sLen);
  const fill = Array(Math.abs(mLen - sLen)).fill('0');

  if (mLen < maxLen) m.push(...fill);
  if (sLen < maxLen) s.push(...fill);

  for (let i = 0; i < maxLen; i++) {
    if (Number(s[i]) > Number(m[i])) return true;
  }

  return false;
}

/**
 * 富文本转文本
 * @param {*} html 富文本
 * @returns {string} 文本
 */
export function html2text(html) {
  return html.replace(/\s*/g, '').replace(/<[^>]*>/g, '');
}

/**
 * 节流函数
 * @param {function} fn 处理的函数 若函数返回 true 则禁止执行
 * @returns {function} 返回闭包生成的节流函数
 */
export function throttle(fn) {
  let b = false; // 禁止点击状态
  return async () => {
    if (b) return; // 如果是禁止不向下执行
    b = true; // 把状态改为禁止
    b = await fn(); // 执行函数并返回的状态修改禁止点击状态
  };
}

/**
 * 对象深合并
 * @param  {...any}  对象
 * @returns {object} 合并后的对象
 */
export function merge(...arg) {
  let result = {};
  for (let i = 0; i < arg.length; i++) {
    for (let key in arg[i]) {
      if (arg[i].hasOwnProperty(key)) {
        const val = arg[i][key];
        if (typeof result[key] === 'object' && typeof val === 'object') {
          result[key] = merge(result[key], val);
        } else {
          result[key] = val;
        }
      }
    }
  }
  return result;
}

/**
 * 对象深拷贝
 * @param {object} obj 对象
 * @returns 拷贝后的对象
 */
export function clone(obj) {
  // 原始类型直接返回
  if (typeof obj !== 'object' && typeof obj !== 'function') return obj;
  let result = toString.call(obj) === '[object Array]' ? [] : {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      result[i] = typeof obj[i] === 'object' ? clone(obj[i]) : obj[i];
    }
  }
  return result;
}
