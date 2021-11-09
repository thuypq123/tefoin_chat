let tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: '#Home',
    start:"0%",
    end: "100%",
    scrub: 2,
  },
});

let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: '#Home',
    start:"0%",
    end: "100%",
    scrub: 2,
  },
});

tl1.fromTo(".Produce_Demo", {left: -500}, {left: 0});
tl2.fromTo(".Main_produce_info", {right: -500}, {right: 0});

let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: '#Home',
    start:"0%",
    end: "100%",
    scrub: 1,
  },
});

tl3.fromTo(".Main_Info", {opacity: 1}, {opacity: 0});

const formEmail = document.querySelector('.form-email');
formEmail.addEventListener('submit', (e) => {
  formEmail.value = '';
});