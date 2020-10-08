import anime from 'animejs/lib/anime.es';


export const animateNavItems = () => {
  let navbarItems = [...document.getElementsByClassName("navbar-menu__item--link")];

  navbarItems.forEach((item, index) => {
    // on hover
    const targetedPathSelector = `.navbar-menu__item:nth-of-type(${index + 1}) path`;
    const pathLength = document.querySelector(targetedPathSelector).getTotalLength();
    item.addEventListener("mouseover", () => {
      anime({
          targets: [targetedPathSelector],
          strokeDashoffset: 0,
          strokeDashArray: pathLength,
          duration: 500,
          easing: "easeInOutQuad"
        });
      }
    );

    //on hover off
    item.addEventListener("mouseout", () => {
      anime({
        targets: [targetedPathSelector],
        strokeDashoffset: pathLength,
        duration: 500,
        easing: "easeInOutSine"
        });
      }
    );
  });

}
