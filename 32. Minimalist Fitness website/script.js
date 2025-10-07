const burger = document.querySelector("nav svg");

function openMenu() {
    gsap.to(".links", { x: "0%" });
    gsap.to(".line", { stroke: "black" });
    gsap.fromTo(
        ".links a",
        { opacity: 0, y: 0 },
        { opacity: 1, y: 20, delay: 0.25, stagger: 0.25 }
    );
    gsap.set("body", { overflow: "hidden", overflowX: "hidden" });
    burger.classList.add("active");
}

function closeMenu() {
    gsap.to(".links", { x: "100%" });
    gsap.to(".line", { stroke: "white" });
    gsap.set("body", { overflow: "auto", overflowX: "hidden" });
    burger.classList.remove("active");
}

burger.addEventListener("click", () => {
    if (burger.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Close the mobile menu when a nav link is clicked so the anchor target is reachable
document.querySelectorAll(".links a").forEach((link) => {
    link.addEventListener("click", () => {
        // allow the default anchor navigation to happen, then close the menu
        // small timeout ensures the browser begins scrolling before the overlay hides
        setTimeout(() => closeMenu(), 50);
    });
});

// If the "Explore classes" button is used, scroll to #classes and close menu if open
const exploreBtn = document.querySelector(".cta-sec");
if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
        const target = document.querySelector("#classes");
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        } else {
            // fallback to hash change
            location.hash = "classes";
        }
            if (burger.classList.contains("active")) closeMenu();
        });
    }

const videos = gsap.utils.toArray(".video");
gsap.set(videos, { opacity: 0 });

videos.forEach((video) => {
    ScrollTrigger.create({
        trigger: video,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
            gsap.to(video, { opacity: 1 });
            video.play();
        },
        onEnterBack: () => video.play(),
        onLeave: () => video.pause(),
        onLeaveBack: () => video.pause(),
    });
});
