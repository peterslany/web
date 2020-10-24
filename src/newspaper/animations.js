import anime from "animejs/lib/anime.es";
import { navbarShapes } from "../assets/svg/navbarShapes";
import { debounce } from "lodash";
import { startBG } from "../webgl/background";

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
        if (!button.dataset.menuopen) {
            moveInFromUpwards(".navbar-menu__item", true);
            anime({
                targets: [".navbar-menu-wrapper"],
                maxHeight: 240,
                duration: 1500,
                easing: "easeOutQuad",
            });
            button.dataset.menuopen = true;
            document.querySelector(".first-content").style.height = "50%"
        } else {
            anime({
                targets: [".navbar-menu-wrapper"],
                maxHeight: 0,
                duration: 500,
                easing: "easeOutSine",
            });
            button.dataset.menuopen = "";
            document.querySelector(".first-content").style.height = "90%"
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
    startBG();
    fadeInItem("#home-image");
    moveInFromUpwards(".navbar-menu__item", true);
    animateFirstText();
    animateBgOnScroll();

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
        targets:[".swipe-down-arrow"],
        opacity: [{value: 0, duration: 0},{value: 1, duration: 1000}, {value:0, duration: 800},{value: 0, duration: 300}],
        translateY: [0, 70],
        duration: 2000,
        loop: true,
        round: 3,
        easing: "easeInOutExpo"
    })
    anime({
        targets: [".decoration-arrow"],
        rotateZ: [40, 45],
        duration: 500,
        background: "red",
        loop:true,
        direction: "alternate",
        easing: "linear"
    });
    let iframeEl = document.querySelector("#work__react-portfolio");
    const iframeAnimation = anime({
        targets:[],
        update: (anim) => {
            iframeEl.style.filter = `brightness(${anim.progress / 7 + 100}%) hue-rotate(${anim.progress % 180}deg)`
        },
        loop: true,
        direction: "alternate", 
        duration: 500
    });
    iframeEl.addEventListener("mouseover", () => {iframeAnimation.pause();iframeAnimation.seek(0)});
    iframeEl.addEventListener("mouseleave",() => iframeAnimation.play());
}

const animateBgOnScroll = () => {
    
    document.addEventListener("scroll", () => {
        const height = document.body.offsetHeight - window.innerHeight;
        const position = window.pageYOffset;
        bg.style.filter = `hue-rotate(${position / height * 360}deg)`
        bg.style.opacity = 0.9 - (position / height * 0.6)
    });
}

const animateFirstText = () => {
    anime({
        targets: [".first-text span"],
        opacity: [0, 1],
        duration: 500,
        color: ["red", "blue"],
        easing: "linear"
    })
    const firstTextSpans =  document.querySelectorAll(".first-text span");
    const perspectives = [-1.2, 3, -1.5, 2, 3, 2.3]
   firstTextSpans.forEach((text, index) => {

        const color = Math.random()*-90+45;
        text.style.backgroundImage = window.innerWidth > 620 
            ? `linear-gradient(hsl(${color}, 65%, 55%), hsl(${color}, 15%, 15%))`
            : `linear-gradient(hsl(${color}, 10%, 55%), hsl(${color}, 0%, 15%))`
        text.style.zIndex = perspectives[index] > 0 ? perspectives[index] * 10 : 1;
        text.style.fontSize = `${Math.abs(perspectives[index]) * (window.innerWidth > 620 ? 3 : 2)}rem`;

        const firstContent = document.querySelector(".front-full-size");
        firstContent.addEventListener("mousemove", (event) => {
            const offsetX = window.innerWidth / 2 - event.clientX;
            const offsetY = window.innerHeight / 2 - event.clientY;
            const q = 0.051 * perspectives[index];
            const qZ = Math.abs(offsetX * offsetY) * q * 0.001;
            text.style.transform = `
                                    translate(${(offsetX ) * q}px, ${(offsetY) * q}px) 
                                    rotate(${qZ * (perspectives[index] * (offsetX * offsetY) < 1? 1: -1)}deg)`
        })
    });
}