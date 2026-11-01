(function ($) {
  'use strict';

  const $header = $('.site-header');
  const $backTop = $('.back-top');

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  function updateScrollUI() {
    const scrolled = window.scrollY > 12;
    $header.toggleClass('scrolled', scrolled);
    $backTop.toggleClass('show', window.scrollY > 420);
  }

  updateScrollUI();
  $(window).on('scroll', updateScrollUI);

  // Smoothly scroll only to in-page anchors; normal page navigation remains native.
  $('a[href^="#"]').on('click', function (event) {
    const target = $(this).attr('href');
    if (!target || target === '#') return;
    const $destination = $(target);
    if (!$destination.length) return;
    event.preventDefault();
    $('html, body').animate({ scrollTop: $destination.offset().top - 82 }, 400);
    const openMenu = document.querySelector('.navbar-collapse.show');
    if (openMenu && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(openMenu).hide();
  });

  $backTop.on('click', () => $('html, body').animate({ scrollTop: 0 }, 400));

  // Canonical URLs are generated from the live deployment origin. Replace this
  // with a fixed canonical base once the production domain has been confirmed.
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical && window.location.protocol !== 'file:') {
    canonical.href = new URL(window.location.pathname, window.location.origin).href;
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = canonical.href;
    document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
      script.textContent = script.textContent.replaceAll('https://YOUR-DOMAIN-HERE', window.location.origin);
    });
  }

  // Service cards pass their context into the enquiry form.
  const params = new URLSearchParams(window.location.search);
  const serviceField = document.querySelector('#service');
  if (serviceField && params.has('service')) {
    const requested = params.get('service');
    if ([...serviceField.options].some((option) => option.value === requested)) serviceField.value = requested;
  }

  // Email-client integration: this site does not claim to store or send form data.
  $('#contact-form').on('submit', function (event) {
    event.preventDefault();
    const form = this;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    const formData = new FormData(form);
    const subject = encodeURIComponent(`Website enquiry: ${formData.get('service') || 'General enquiry'}`);
    const body = encodeURIComponent(
      `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nPhone: ${formData.get('phone') || 'Not provided'}\nService: ${formData.get('service') || 'General enquiry'}\n\n${formData.get('message')}`
    );
    const status = document.querySelector('#form-status');
    status.textContent = 'Opening your email app with the enquiry details. Please send the message there.';
    status.className = 'alert alert-info mt-3';
    window.location.href = `mailto:rahulchamalwar@gmail.com?subject=${subject}&body=${body}`;
  });

  // Lightweight accessible lightbox for the illustrative gallery artwork.
  const $lightbox = $('.lightbox');
  const $lightboxImage = $lightbox.find('img');
  const $lightboxCaption = $lightbox.find('.lightbox-caption');

  function closeLightbox() {
    $lightbox.removeClass('open').attr('aria-hidden', 'true');
    $('body').css('overflow', '');
  }

  $('.gallery-tile').on('click', function () {
    const src = $(this).data('image');
    const caption = $(this).data('caption');
    if (!src) return;
    $lightboxImage.attr({ src, alt: caption });
    $lightboxCaption.text(caption);
    $lightbox.addClass('open').attr('aria-hidden', 'false');
    $('body').css('overflow', 'hidden');
    $lightbox.find('.lightbox-close').trigger('focus');
  });

  $lightbox.on('click', function (event) {
    if (event.target === this || $(event.target).hasClass('lightbox-close')) closeLightbox();
  });
  $(document).on('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });

  // No analytics or advertising cookies are installed. This stores only the
  // visitor's dismissal of the privacy notice in local storage.
  const notice = document.querySelector('.privacy-notice');
  if (notice) {
    try {
      if (localStorage.getItem('openlab-privacy-notice') === 'dismissed') notice.hidden = true;
      notice.querySelector('[data-dismiss-notice]')?.addEventListener('click', () => {
        notice.hidden = true;
        localStorage.setItem('openlab-privacy-notice', 'dismissed');
      });
    } catch (_) { /* If storage is disabled, the notice remains available. */ }
  }
})(jQuery);
