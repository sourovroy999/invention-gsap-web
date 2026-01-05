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



// gsap.to('#first-video', {
//   // paused:true,
//   // scaleX:1,
//   // scaleY:1,
//     // start:'top top',
//     rotateX:0,
//     rotateY:0,
//     ease:'power1.inOut',

//     height:'100vh',
//     width:'100vw',
//     // height:'100%',
//     // width:'100%',
//     // rotateY:0,

//   // maxHeight:'100vh',
//   // maxWidth:'100vw',
//   borderRadius:0,
//   // height:'800px',
//   // width:'1600px',
//   scrollTrigger:{
//     trigger:'#hero',
    
//     pin:true,
//     scrub:true,
//     invalidateOnRefresh:true,
//   //   fastScrollEnd: true, // Prevents "skipping" to the end
//   // refreshPriority: 1   // Ensures this trigger refreshes before others

  
  

//   }
// })

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

// 1. Capture the ScrollTrigger instance
const scrollTween = gsap.to('#first-video', {
  rotateX: 0,
  rotateY: 0,
  height: '100vh',
  width: '100vw',
  borderRadius: 0,
  ease: 'none', // 'none' is often better for scrubbed animations
  scrollTrigger: {
    trigger: '#hero',
    pin: true,
    scrub: true,
    invalidateOnRefresh: true,
  }
});

// 2. Mouse move handler
const hero = document.querySelector('#hero');
const videoCard = document.querySelector('#first-video');

hero.addEventListener("mousemove", (e) => {
  // Check if we are past 90% of the scroll animation
  const progress = scrollTween.scrollTrigger.progress;
  
  if (progress > 0.9) {
    // If nearly full screen, force-level the card
    gsap.to(videoCard, { rotateX: 0, rotateY: 0, duration: 0.5 });
  } else {
    // Calculate tilt
    const { width, height, left, top } = hero.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    
    // Range from -1 to 1
    const xPos = (mouseX / width) - 0.5;
    const yPos = (mouseY / height) - 0.5;

    // Apply the tilt with a slight duration for smoothness
    // We add the scroll-based rotateX (10 * (1 - progress)) so it blends
    const baseRotateX = 10 * (1 - progress); 
    
    gsap.to(videoCard, {
      rotateY: xPos * 8, // Subtle horizontal tilt
      rotateX: (yPos * -8) + baseRotateX, // Combine mouse tilt with scroll tilt
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto" // Prevents animation conflicts
    });
  }
});

// 3. Reset when mouse leaves
hero.addEventListener("mouseleave", () => {
  const progress = scrollTween.scrollTrigger.progress;
  gsap.to(videoCard, { 
    rotateX: 10 * (1 - progress), 
    rotateY: 0, 
    duration: 1 
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

