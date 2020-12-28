import { animateNavItems, animateNavButton, flashInItem, animateOnLoad, onScrollPositionAnimation, animateDecorations, animateBg } from "./newspaper/animations";
import "./css/styles.css";
import "./css/newspaper.scss";
import "./css/modern.scss";
import { contentLoaded } from "./loading";
import { startBG } from "./webgl/background";




//wait for the content until it's rendered
window.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("html");
    document.getElementById("newspaper-theme").addEventListener("click", () => {
        root.className = "newspaper";

    })
    document.getElementById("modern-theme").addEventListener("click", () => {
        root.className = "modern";
    })

    document.getElementsByClassName("swipe-down-arrow")[0].addEventListener("click", () => {
        window.scrollTo(0, window.innerHeight);
    })
    startBG();
});

export const BGLoaded = () => {
    contentLoaded();
    animateOnLoad();
    animateNavItems();
    animateNavButton();
    onScrollPositionAnimation();
    animateDecorations();
}