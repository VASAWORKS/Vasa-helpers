export const isInViewport = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();

  return (
    rect.top + 200 >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /* or $(window).width() */
  );
};
