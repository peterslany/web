import { animateNavItems, animateNavButton, flashInItem, animateOnLoad, onScrollPositionAnimation, animateDecorations, animateBg } from "./newspaper/animations";
import "./css/styles.css";
import "./css/newspaper.scss";
import "./css/modern.scss";




//wait for the content until it's rendered
window.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("html");
    document.getElementById("newspaper-theme").addEventListener("click", () => {
        console.log("NEWS")
        root.className = "newspaper"

    })
    document.getElementById("modern-theme").addEventListener("click", () => {
        root.className = "modern"
    })
    animateNavItems();
    animateNavButton();
    animateOnLoad();
    onScrollPositionAnimation();
    animateDecorations();
});
