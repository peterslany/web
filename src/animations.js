import anime from "animejs/lib/anime.es";

export const animateNavItems = () => {
    let navbarItems = [...document.getElementsByClassName("navbar-menu__item--link")];

    navbarItems.forEach((item, index) => {
        // on hover
        console.log("ANIM");
        const targetedPathSelector = `.navbar-menu__item:nth-of-type(${index + 1}) path`;
        const pathLength = document.querySelector(targetedPathSelector).getTotalLength();
        item.addEventListener("mouseover", () => {
            console.log("HOVER");
            anime({
                targets: [targetedPathSelector],
                strokeDashoffset: 0,
                strokeDashArray: pathLength,
                duration: 500,
                easing: "easeInOutQuad",
            });
        });

        //on hover off
        item.addEventListener("mouseout", () => {
            anime({
                targets: [targetedPathSelector],
                strokeDashoffset: pathLength,
                duration: 500,
                easing: "easeInOutSine",
            });
        });
    });
};

export const animateNavButton = () => {
    const button = document.querySelector("#toggleMenu");
    button.addEventListener("click", () => {
        console.log("BAM");
        if (!button.dataset.menuopen) {
            anime({
                targets: [".navbar-menu-wrapper"],
                maxHeight: 240,
                duration: 500,
                easing: "easeOutQuad",
            });
            button.dataset.menuopen = true;
        } else {
            anime({
                targets: [".navbar-menu-wrapper"],
                maxHeight: 0,
                duration: 500,
                easing: "easeOutSine",
            });
            button.dataset.menuopen = "";
        }
    });
};
