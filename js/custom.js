document.addEventListener('DOMContentLoaded', function () {
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
    });
  }
});