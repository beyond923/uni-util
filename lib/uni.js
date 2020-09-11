import Vue from 'vue';

/**
 * 显示消息提示框
 * @param {string|object} title 提示的内容，长度与 icon 取值有关 或 配置选项（当为 object 时后面的参数不生效）
 * @param {object} options 配置选项
 * @param {string} options.image 自定义图标的本地路径
 * @param {boolean} options.mask 是否显示透明蒙层，防止触摸穿透，默认为 false
 * @param {number} options.duration 提示的延迟时间，单位毫秒，默认为 1500
 * @param {string} options.position 纯文本轻提示显示位置，填写有效值后只有 title 属性生效，可选值有 top center bottom
 * @param {function} options.success 接口调用成功的回调函数
 * @param {function} options.fail 接口调用失败的回调函数
 * @param {function} options.complete 接口调用结束的回调函数（调用成功、失败都会执行）
 * @property {function} success 显示成功消息提示框
 * @property {function} loading 显示加载消息提示框
 */
export function toast(title, options = {}) {
  uni.showToast(
    typeof title === 'object'
      ? title
      : {
          icon: 'none',
          ...options,
          title
        }
  );
}

['success', 'loading'].forEach(icon => {
  toast[icon] = function (title, options = {}) {
    toast(
      typeof title === 'object'
        ? {
            ...title,
            icon
          }
        : {
            ...options,
            title,
            icon
          }
    );
  };
});

/**
 * 显示加载提示框
 * @param {string} title 提示的内容，默认为"加载中"
 * @param {boolean} mask 是否显示透明蒙层，防止触摸穿透，默认为 true
 * @param {object} options 配置选项
 * @param {function} options.success 接口调用成功的回调函数
 * @param {function} options.fail 接口调用失败的回调函数
 * @param {function} options.complete 接口调用结束的回调函数（调用成功、失败都会执行）
 */
export function loading(title = '加载中', mask = true, options = {}) {
  uni.showLoading({
    ...options,
    title,
    mask
  });
}

/**
 * 显示模态弹窗
 * @param {string|object} content 提示的内容（当为 object 时后面的参数不生效）
 * @param {string|object} title 标题或配置选项（当为 object 时后面的参数不生效）
 * @param {object} options 配置选项
 * @param {string} options.title 提示的标题，默认为"提示"
 * @param {boolean} options.showCancel 是否显示取消按钮，默认为 true
 * @param {string} options.cancelText 取消按钮的文字，默认为"取消"，最多 4 个字符
 * @param {string} options.cancelColor 取消按钮的文字颜色，默认为"#000000"
 * @param {string} options.confirmText 确定按钮的文字，默认为"确定"，最多 4 个字符
 * @param {string} options.confirmColor 确定按钮的文字颜色，H5平台默认为"#007aff"，微信小程序平台默认为"#3CC51F"，百度小程序平台默认为"#3c76ff"
 * @returns {promise} 返回 Promise 对象，resolve 为 true 点击了确定按钮，为 false 则点击了取消按钮，reject 为 modal 打开失败
 */
export function modal(content = '', title = '提示', options = {}) {
  return new Promise((resolve, reject) => {
    let _options = {};
    if (typeof content === 'object') {
      _options = content;
    } else if (typeof title === 'object') {
      _options = {
        ...title,
        content
      };
    } else {
      _options = {
        ...options,
        title,
        content
      };
    }

    uni.showModal({
      ..._options,
      success: res => {
        if (res.confirm) resolve(true);
        else if (res.cancel) resolve(false);
      },
      fail: reject
    });
  });
}

/**
 * 截屏
 * @param {boolean} save 是否直接保存，默认为 true
 * @returns {promise} 返回 Promise 对象，resolve 为文件路径，reject 则截屏/保存失败
 */
export function capture(save = true) {
  // #ifdef APP-PLUS
  return new Promise((resolve, reject) => {
    Vue.nextTick(() => {
      const currentWebview = getPage().$getAppWebview();
      const bitmap = new plus.nativeObj.Bitmap('webview');
      // 将webview内容绘制到Bitmap对象中
      currentWebview.draw(
        bitmap,
        () => {
          bitmap.save(
            `_doc/${Date.now()}.jpg`,
            {},
            res => {
              if (!save) return resolve(res.target);
              uni.saveImageToPhotosAlbum({
                filePath: res.target,
                success: () => {
                  resolve(res.target);
                },
                fail: err => reject(err),
                complete: () => {
                  bitmap.clear();
                }
              });
            },
            err => reject(err)
          );
        },
        err => reject(err)
      );
    });
  });
  // #endif
}

/**
 * 获取节点布局信息
 * @param {string} selector 节点
 * @param {boolean} all 是否匹配所有节点，默认为 false
 * @param {promise} 返回 Promise 对象，resolve 为对应的节点信息
 */
export function getRect(selector, all = false) {
  return new Promise(resolve => {
    Vue.nextTick(() => {
      uni
        .createSelectorQuery()
        [all ? 'selectAll' : 'select'](selector)
        .boundingClientRect(rect => resolve(rect))
        .exec();
    });
  });
}

/**
 * 获取获取页面栈的实例
 * @param {number} delta 倒数第几个页面
 * @returns {VueComponent} 页面实例
 */
export function getPage(delta = 1) {
  const pages = getCurrentPages();
  return pages[pages.length - delta];
}
