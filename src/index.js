import { animateNavItems, animateNavButton } from "./animations";

import "./css/styles.css";
import "./css/newspaper.css";
//wait for the content until it's rendered
window.addEventListener("DOMContentLoaded", () => {
    animateNavItems();
    animateNavButton();
});
