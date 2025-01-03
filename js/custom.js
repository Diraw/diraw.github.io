document.addEventListener('DOMContentLoaded', function () {
  if (window.Pjax) {
    const isFirstVisit = !sessionStorage.getItem('firstVisit');

    if (isFirstVisit) {
      document.body.classList.add('pjax-enter-active');
      setTimeout(function () {
        document.body.classList.remove('pjax-enter-active');
      }, 1000); // 与 CSS transition 时间一致
      sessionStorage.setItem('firstVisit', 'true');
    }

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
    });
  }
});