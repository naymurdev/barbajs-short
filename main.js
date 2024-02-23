import { gsap } from "gsap";
import barba from "@barba/core";

const animationLeave = (container) => {
  const tl = gsap.timeline({
    onComplete: pageTransition(),
  });

  const heading = container.querySelector("h1");
  const img = container.querySelectorAll("img");

  tl.to(img, {
    y: 200,
    opacity: 0,
  }).to(
    heading,
    {
      y: 20,
      opacity: 0,
    },
    "-=.5"
  );
};

const pageTransition = () => {
  const tl = gsap.timeline({ delay: 0.6 });
  tl.to(".transition li", {
    scaleY: 1,
    transformOrigin: "bottom left",
    stagger: 0.1,
  });
  tl.to(".transition li", {
    scaleY: 0,
    transformOrigin: "top left",
    stagger: 0.1,
  });
  return tl;
};

const animationEnter = (container) => {
  const tl = gsap.timeline();
  const heading = container.querySelector("h1");
  const img = container.querySelectorAll("img");

  tl.from(img, {
    y: 200,
    opacity: 0,
  }).from(heading, {
    y: 20,
    opacity: 0,
  });
  return tl;
};

barba.init({
  sync: true,
  transitions: [
    {
      async once({ next }) {
        animationEnter(next.container);
      },
      async leave({ current }) {
        const done = this.async();
        animationLeave(current.container);
        await delay(2300);
        done();
      },
      async enter({ next }) {
        animationEnter(next.container);
      },
    },
  ],
});

function delay(n) {
  n = n || 4000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}
