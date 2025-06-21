document.addEventListener('DOMContentLoaded', function () {
  // 初始检查背景图片
  checkBackgroundImage();

  if (window.Pjax) {
    new Pjax({
      elements: 'a',
      selectors: ['title', '.content'],
      cacheBust: false
    });

    document.addEventListener('pjax:send', function () {
      document.body.classList.add('pjax-leave-active');
    });

    document.addEventListener('pjax:complete', function () {
      document.body.classList.remove('pjax-leave-active');
      document.body.classList.add('pjax-enter-active');
      setTimeout(function () {
        document.body.classList.remove('pjax-enter-active');
      }, 500);

      // 在 Pjax 完成后检查背景图片
      checkBackgroundImage();
    });
  }

});

function checkBackgroundImage() {
  var fullPageElement = document.querySelector('.full_page, .post-bg');

  if (fullPageElement) {
    // console.log('Full-page element detected.');

    var style = window.getComputedStyle(fullPageElement);
    var backgroundImage = style.backgroundImage;
    // console.log('Background image:', backgroundImage);

    // 提取 URL，去除前5个字符和后2个字符
    var imageUrl = backgroundImage.slice(5, -2);
    // console.log('Background image URL:', imageUrl);

    if (imageUrl && imageUrl !== 'none') {
      var img = new Image();
      img.crossOrigin = "anonymous"; // 如果有跨域问题，尝试添加这行

      img.onload = function() {
        // console.log('Background image loaded.');
        document.body.style.visibility = 'visible';
        document.body.style.overflow = 'auto';
      };

      img.onerror = function() {
        // console.error('Failed to load background image.');
        document.body.style.visibility = 'visible';
        document.body.style.overflow = 'auto';
      };

      // 确保图片路径是正确的
      img.src = imageUrl;
    } else {
      // console.log('No background image found.');
      document.body.style.visibility = 'visible';
      document.body.style.overflow = 'auto';
    }
  } else {
    // console.log('No full-page element detected.');
    document.body.style.visibility = 'visible';
    document.body.style.overflow = 'auto';
  }
}

function updateTheme() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
}

// 初始设置
updateTheme();

// 监听系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);




// 将导航的搜索功能移动到最后去
document.addEventListener('DOMContentLoaded', function() {
  // 检查屏幕宽度是否大于某个值（例如768px，通常认为是平板/手机与桌面设备的分界点）
  if (window.matchMedia("(min-width: 768px)").matches) {
    var searchButton = document.getElementById('search-button');
    var menusItems = document.querySelectorAll('.menus_items');

    if (searchButton && menusItems.length > 0) {
      // 获取 menusItems 的克隆节点
      var menusItemsClone = menusItems[0].cloneNode(true);

      // 将克隆节点插入到 searchButton 之前
      searchButton.parentNode.insertBefore(menusItemsClone, searchButton);

      // 删除所有的 menusItems 元素
      menusItems.forEach(function(item) {
        item.parentNode.removeChild(item);
      });
    }
  }
});


