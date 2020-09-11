function routeQuery(url, query) {
  const _query =
    query && Object.keys(query).length
      ? '?query=' + encodeURIComponent(JSON.stringify(query))
      : '';
  return url + _query;
}

function router(url, query, options = {}) {
  if (!url) return;
  uni.navigateTo({
    ...options,
    url: routeQuery(url, query)
  });
}

router.back = function (delta = 1, options = {}) {
  // if (getCurrentPages().length < 2) {
  //   return uni.switchTab({ url: '/pages/home/index' });
  // }
  uni.navigateBack({
    ...options,
    delta: delta > 0 ? delta : 1
  });
};

router.redirect = function (url, query, options = {}) {
  if (!url) return;
  uni.redirectTo({
    ...options,
    url: routeQuery(url, query)
  });
};

router.reLaunch = function (url, query, options = {}) {
  if (!url) return;
  uni.reLaunch({
    ...options,
    url: routeQuery(url, query)
  });
};

router.switchTab = function (url, options = {}) {
  if (!url) return;
  uni.switchTab({
    ...options,
    url
  });
};

router.query = function (option) {
  if (!option) {
    const pages = getCurrentPages();
    option = pages[pages.length - 1].options;
  }

  try {
    return JSON.parse(decodeURIComponent(option.query) || '{}');
  } catch (error) {
    return JSON.parse(option.query || '{}');
  }
};

export default router;