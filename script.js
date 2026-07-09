/* ======================================================
   NEXBRIDGE FRAMEWORK
====================================================== */

const App = {

    init() {

this.cache();

this.header();

this.reveal();

this.counter();

this.smoothScroll();

this.activeMenu();

this.backTop();

this.mobileMenu();

this.solutionNavigator();

this.ripple();

this.preloader();

this.accessibility();

this.keyboard();

this.scrollProgress();

this.closeMenu();

this.highlightSection();

this.parallax();

this.autoDelay();

this.copyEmail();

this.externalLinks();

this.currentYear();

    },

    cache() {

        this.headerEl = document.querySelector(".header");

        this.revealItems = document.querySelectorAll(".fade,.fade-up,.fade-left,.fade-right,.zoom");

        this.counterItems = document.querySelectorAll("[data-target]");

        this.backBtn = document.querySelector(".back-top");

    }

};

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});
App.header=function(){

window.addEventListener("scroll",()=>{

if(window.scrollY>40){

this.headerEl.classList.add("scrolled");

}else{

this.headerEl.classList.remove("scrolled");

}

});

}
App.reveal=function(){

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{

threshold:.15

});

this.revealItems.forEach(item=>{

observer.observe(item);

});

}
App.counter=function(){

this.counterItems.forEach(counter=>{

let target=+counter.dataset.target;

let value=0;

const speed=target/80;

const update=()=>{

value+=speed;

if(value<target){

counter.innerText=Math.floor(value);

requestAnimationFrame(update);

}else{

counter.innerText=target+"+";

}

}

update();

});

}
App.smoothScroll=function(){

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",(e)=>{

const id=link.getAttribute("href");

const target=document.querySelector(id);

if(!target)return;

e.preventDefault();

target.scrollIntoView({

behavior:"smooth"

});

});

});

}
App.activeMenu = function () {

    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-menu a");

    if (!sections.length || !links.length) return;

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;
            const bottom = top + section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < bottom) {
                current = section.id;
            }

        });

        links.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

};
App.backTop=function(){

if(!this.backBtn)return;

window.addEventListener("scroll",()=>{

this.backBtn.classList.toggle(

"show",

window.scrollY>500

);

});

this.backBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

}

}
App.mobileMenu=function(){

const button=document.querySelector(".menu-toggle");

const menu=document.querySelector(".nav-menu");

if(!button || !menu) return;

button.onclick=()=>{

menu.classList.toggle("active");

}

}
App.solutionNavigator = function(){

    const chips = document.querySelectorAll(".solution-chip");

    chips.forEach(chip=>{

        chip.addEventListener("click",()=>{

            chips.forEach(c=>c.classList.remove("active"));

            chip.classList.add("active");

            const target = document.getElementById(chip.dataset.target);

            if(target){

                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        });

    });

}
App.ripple = function () {

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("click", e => {

            const circle = document.createElement("span");

            const d = Math.max(button.clientWidth, button.clientHeight);

            circle.className = "ripple";

            circle.style.width = d + "px";
            circle.style.height = d + "px";

            circle.style.left = (e.offsetX - d / 2) + "px";
            circle.style.top = (e.offsetY - d / 2) + "px";

            button.appendChild(circle);

            setTimeout(() => circle.remove(), 600);

        });

    });

};
App.preloader = function () {

    const loader = document.querySelector(".preloader");

    if (!loader) return;

    window.addEventListener("load", () => {

        loader.classList.add("hide");

    });

};
App.accessibility = function () {

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {

        document.documentElement.classList.add("reduce-motion");

    }

};
App.keyboard = function () {

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            document.querySelector(".nav-menu")
                ?.classList.remove("active");

        }

    });

};
App.scrollProgress=function(){

const progress=document.querySelector(".scroll-progress");

if(!progress) return;

window.addEventListener("scroll",()=>{

const scrollTop=window.scrollY;

const height=document.documentElement.scrollHeight-window.innerHeight;

const percent=(scrollTop/height)*100;

progress.style.width=percent+"%";

});

};
App.currentYear=function(){

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}

};
App.closeMenu=function(){

const links=document.querySelectorAll(".nav-menu a");

const menu=document.querySelector(".nav-menu");

links.forEach(link=>{

link.addEventListener("click",()=>{

menu?.classList.remove("active");

});

});

};
App.highlightSection=function(){

const chips=document.querySelectorAll(".solution-chip");

chips.forEach(chip=>{

chip.addEventListener("click",()=>{

const target=document.getElementById(chip.dataset.target);

if(!target) return;

target.classList.add("focus");

setTimeout(()=>{

target.classList.remove("focus");

},1200);

});

});

};
App.parallax = function () {

    const heroImage = document.querySelector(".hero-image");

    if (!heroImage) return;

    window.addEventListener("scroll", () => {

        heroImage.style.transform =
            `translateY(${window.scrollY * 0.15}px)`;

    });

};
App.autoDelay=function(){

const items=document.querySelectorAll(".grid .card");

items.forEach((item,index)=>{

item.style.transitionDelay=(index*.08)+"s";

});

};
App.copyEmail=function(){

const email=document.querySelector(".copy-email");

if(!email) return;

email.onclick=()=>{

navigator.clipboard.writeText(email.innerText);

alert("Email copied.");

}

}
App.externalLinks=function(){

document.querySelectorAll("a").forEach(link=>{

if(link.hostname!==location.hostname){

link.target="_blank";

link.rel="noopener";

}

});

}