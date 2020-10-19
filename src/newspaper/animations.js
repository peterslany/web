import anime from "animejs/lib/anime.es";
import { navbarShapes } from "../assets/svg/navbarShapes";

const addHandwritingShapes = () => {
    let navbarItems = [...document.getElementsByClassName("navbar-menu__item")];
    navbarItems.forEach((item, index) => {
        item.innerHTML += navbarShapes[index];
    });
};

export const animateNavItems = () => {
    addHandwritingShapes();
    let navbarItems = [...document.getElementsByClassName("navbar-menu__item--link")];
    navbarItems.forEach((item, index) => {
        // on hover
        const targetedPathSelector = `#navbarShape${index + 1} path`;
        const pathLength = document.querySelector(targetedPathSelector).getTotalLength();
        item.addEventListener("mouseover", () => {
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

const fadeInItem = (target, stagger = false) => {
    anime({
        targets: [target],
        opacity: [0, 1],
        duration: 500,
        easing: "easeInQuad",
        ...(stagger ? { delay: anime.stagger(500) } : {}),
    });
};

const moveInFromUpwards = (target, stagger = false) => {
    anime({
        targets: [target],
        translateY: [-60, 0],
        opacity: [{ value: 0, duration: 0 }, { value: 0, duration: 500 }, 1],
        ...(stagger ? { delay: anime.stagger(300) } : {}),
        easing: "easeOutQuad",
    });
};

const animateSectionText = (target) => {
    const textInDuration = 600;

    anime
        .timeline()
        .add({
            targets: [`${target} .heading`],
            clipPath: ["circle(0%)", "circle(100%)"],
            duration: 500,
            easing: "linear",
        })
        .add({
            targets: [`${target} .heading h1`],
            translateY: [220, 0],
            duration: textInDuration,
            easing: "easeOutQuad",
        })
        .add(
            {
                targets: [`${target} .paragraph > *`],
                translateY: [-200, 0],
                opacity: [0, 1],
                duration: textInDuration,
                easing: "easeInOutQuad",
            },
            `-=${textInDuration / 2}`
        );
};

export const animateOnLoad = () => {
    fadeInItem("#home-image");
    moveInFromUpwards(".navbar-menu__item", true);
    //animateSectionText(".first-content");
};

const animateOnElementInViewport = (element, animation) => {
    let height = 0;
    window.addEventListener("scroll", () => {
        if (
            window.pageYOffset + window.innerHeight >= element.offsetTop &&
            height < element.offsetTop
        ) {
            animation();
        }
        height = window.pageYOffset + window.innerHeight;
    });
};

export const onScrollPositionAnimation = () => {
    const animateSectionContent = (textBlock, image) => {
        animateSectionText(textBlock);
        fadeInItem(image);
    };
    const sectionsSelectors = ["#about__hello", "#about__what", "#work__react-sample"];

    sectionsSelectors.forEach((sectionSelector) => {
        animateOnElementInViewport(document.querySelector(sectionSelector), () =>
            animateSectionContent(
                `${sectionSelector} .section-content__text-block`,
                `${sectionSelector} img`
            )
        );
    });
};

export const animateDecorations = () => {
    anime({
        targets: [".decoration-arrow"],
        rotateZ: [40, 45],
        duration: 500,
        background: "red",
        loop:true,
        direction: "alternate",
        easing: "linear"
    });
    let iframeEl = document.querySelector("#work__react-portfolio")
    const iframeAnimation = anime({
        targets:["#work__react-portfolio"],
        update: (anim) => {
            iframeEl.style.filter = `brightness(${anim.progress / 7 + 100}%) hue-rotate(${anim.progress % 180}deg)`
        },
        loop: true,
        direction: "alternate", 
        duration: 500
    })
    iframeEl.addEventListener("mouseover", () => {iframeAnimation.pause();iframeAnimation.seek(0)})
    iframeEl.addEventListener("mouseleave",() => iframeAnimation.play())
}


