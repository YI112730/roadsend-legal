(function () {
  var KEY = 'roadsend-legal-lang';
  var supported = { en: 1, ja: 1, 'zh-Hant': 1 };

  function detect() {
    var saved = localStorage.getItem(KEY);
    if (saved && supported[saved]) return saved;
    var nav = (navigator.language || 'en').toLowerCase();
    if (nav.indexOf('ja') === 0) return 'ja';
    if (nav.indexOf('zh-tw') === 0 || nav.indexOf('zh-hk') === 0 || nav.indexOf('zh-hant') === 0) {
      return 'zh-Hant';
    }
    return 'en';
  }

  function apply(lang) {
    if (!supported[lang]) lang = 'en';
    document.documentElement.lang = lang === 'zh-Hant' ? 'zh-Hant' : lang;
    document.querySelectorAll('[data-i18n-lang]').forEach(function (el) {
      el.hidden = el.getAttribute('data-i18n-lang') !== lang;
    });
    document.querySelectorAll('.lang-bar button').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    localStorage.setItem(KEY, lang);
  }

  function bind() {
    document.querySelectorAll('.lang-bar button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        apply(btn.getAttribute('data-lang'));
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    bind();
    apply(detect());
  });
})();
