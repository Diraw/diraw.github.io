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

  // 切换主题的示例代码
  const toggleThemeButton = document.getElementById('toggle-theme');
  toggleThemeButton.addEventListener('click', function () {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
  });
});

function checkBackgroundImage() {
  document.body.style.visibility = 'hidden';
  document.body.style.overflow = 'hidden';
  var fullPageElement = document.querySelector('.full_page, .post-bg');

  if (fullPageElement) {
    console.log('Full-page element detected.');

    var style = window.getComputedStyle(fullPageElement);
    var backgroundImage = style.backgroundImage;
    console.log('Background image:', backgroundImage);

    // 提取 URL，去除前5个字符和后2个字符
    var imageUrl = backgroundImage.slice(5, -2);
    console.log('Background image URL:', imageUrl);

    if (imageUrl && imageUrl !== 'none') {
      var img = new Image();
      img.crossOrigin = "anonymous"; // 如果有跨域问题，尝试添加这行

      img.onload = function() {
        console.log('Background image loaded.');
        document.body.style.visibility = 'visible';
        document.body.style.overflow = 'auto';
      };

      img.onerror = function() {
        console.error('Failed to load background image.');
        document.body.style.visibility = 'visible';
        document.body.style.overflow = 'auto';
      };

      // 确保图片路径是正确的
      img.src = imageUrl;
    } else {
      console.log('No background image found.');
      document.body.style.visibility = 'visible';
      document.body.style.overflow = 'auto';
    }
  } else {
    console.log('No full-page element detected.');
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