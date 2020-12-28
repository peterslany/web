import anime from "animejs";

anime({
    targets: [".loader span"],
    opacity:[0, 1],
    translateY: [-40, 0],
    loop: true,
    delay: anime.stagger(500),
    duration: 500
})

export const contentLoaded = () => {
    const loader = document.querySelector(".loader");
    loader.style.opacity = 0;
    document.body.style.overflow = "initial";
    setTimeout(() => loader.style.display = "none", 300)
}