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
  // scale:1.5,

  // rotateY:10,
})




gsap.to('#first-video', {
  // scale:5,
    // start:'top top',
    rotateX:0,
    ease:'power1.inOut',

    // rotateY:0,

  height:'100%',
  width:'100%',
  borderRadius:0,
  // height:'800px',
  // width:'1600px',
  scrollTrigger:{
    trigger:'#hero',
    pin:true,
    scrub:true,
  
  

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






