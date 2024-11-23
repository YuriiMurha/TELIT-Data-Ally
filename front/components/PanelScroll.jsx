import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PanelScroll = () => {
  // let panels = gsap.utils.toArray(".panel");
  // console.log("Hello world ")
  // // let tops = panels.map(panel => ScrollTrigger.create({trigger: panel, start: "top top"}));

  // panels.forEach((panel, i) => {
  //   ScrollTrigger.create({
  //     trigger: panel,
  //     start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
  //     pin: true,
  //     pinSpacing: false,
  //     // markers: true,
  //   });
  // });


};