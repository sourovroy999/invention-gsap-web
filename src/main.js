import gsap from 'gsap'
import './style.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// gsap.set('#first-video', {
//   height:'300px',
//   width:'300px'
// })

gsap.set('#first-video', {
  transformPerspective:500,
  rotateX:10,
  transformOrigin:'center center'

  // scaleX:0.3,
  // scaleY:0.5,

  // rotateY:4,
})



gsap.to('#first-video', {
  // paused:true,
  // scaleX:1,
  // scaleY:1,
    // start:'top top',
    rotateX:0,
    rotateY:0,
    ease:'power1.inOut',

    height:'100vh',
    width:'100vw',
    // height:'100%',
    // width:'100%',
    // rotateY:0,

  // maxHeight:'100vh',
  // maxWidth:'100vw',
  borderRadius:0,
  // height:'800px',
  // width:'1600px',
  scrollTrigger:{
    trigger:'#hero',
    
    pin:true,
    scrub:true,
    invalidateOnRefresh:true,
  //   fastScrollEnd: true, // Prevents "skipping" to the end
  // refreshPriority: 1   // Ensures this trigger refreshes before others

  
  

  }
})

// gsap.set('#test-red',{
//   transformPerspective:800,

//   rotateX:30,
// })

// gsap.to('#test-red', {
//   rotateX:0,
//   borderRadius:0,
//   // scale:5,
//     // start:'top top',

//     ease:'power1.out',

//   height:'100%',
//   width:'100%',
//   // height:'800px',
//   // width:'1600px',
//   scrollTrigger:{
//     trigger:'#test-hero',
//     pin:true,
//     scrub:true,
  
    
//     // pinSpacing:false,
  

//   }
// })



const videoCard = document.querySelector('#first-video');
const heroSection = document.querySelector('#hero');

heroSection.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  const { left, top, width, height } = videoCard.getBoundingClientRect();

  // Calculate center of the card
  const centerX = left + width / 2;
  const centerY = top + height / 2;

  // Calculate mouse distance from center (-1 to 1)
  const percentX = (clientX - centerX) / (width / 2);
  const percentY = (clientY - centerY) / (height / 2);

  // Set max tilt angle (e.g., 15 degrees)
  const maxRotation = 3;

  gsap.to(videoCard, {
    rotateY: percentX * maxRotation,
    rotateX: -percentY * maxRotation, // Negative because moving mouse up should tilt card back
    ease: 'power2.out',
    duration: 0.5,
    overwrite: 'auto' // Important: prevents conflict with ScrollTrigger
  });
});

// Reset tilt when mouse leaves
heroSection.addEventListener('mouseleave', () => {
  gsap.to(videoCard, {
    rotateX: 0,
    rotateY: 0,
    ease: 'power2.out',
    duration: 0.5
  });
});






gsap.to('.panel:not(:last-child)', {
  yPercent:-100,
  ease:'none',
  stagger:0.5,

  scrollTrigger:{
    trigger:'#pinning-container',
    start:'top top',
    end:'+=200%',
    scrub:true,
    pin:true,
  }

})

gsap.set('#panel',{
  zIndex: (i, target, targets)=> targets.length-i
});

