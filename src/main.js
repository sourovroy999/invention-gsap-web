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


// const slideTl=gsap.timeline({
//   defaults:{
//     delay:4,
//     duration:0.8,
//     // repeat:-1,
//   }
// },


// )

// slideTl.to('#slide3', {xPercent:-100})
//        .to('#slide2', {xPercent:-100})
// slideTl.to('#slide2', {xPercent:0})
//        .to('#slide3', {xPercent:0})

// const slides = document.querySelectorAll(".carousel-slide");
//         const progressBar = document.querySelector("#main-progress-bar");
//         const cursor = document.querySelector("#custom-cursor");
//         const cursorText = document.querySelector("#cursor-text");
        
//         let currentIndex = 0;
//         let isAnimating = false;
//         const SLIDE_WAIT = 4;
//         const TRANSITION = 1.2;
//         const segment = 100 / slides.length;

//         // 1. Initial State
//         gsap.set(slides, { xPercent: 100 });
//         gsap.set(slides[0], { xPercent: 0 });

//         // 2. Optimized Magnetic Cursor Logic
//         const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
//         const mouse = { x: pos.x, y: pos.y };
        
//         const xSet = gsap.quickSetter(cursor, "x", "px");
//         const ySet = gsap.quickSetter(cursor, "y", "px");

//         window.addEventListener("mousemove", e => {
//             mouse.x = e.clientX;
//             mouse.y = e.clientY;
//             cursorText.innerText = mouse.x > window.innerWidth / 2 ? "Next" : "Prev";
//         });

//         // Ticker for smooth "magnetic" lag
//         gsap.ticker.add(() => {
//             const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio()); // Smoothing factor
//             pos.x += (mouse.x - pos.x) * dt;
//             pos.y += (mouse.y - pos.y) * dt;
//             xSet(pos.x - 48);
//             ySet(pos.y - 48);
//         });

//         // 3. Unified Slide Logic
//         function move(index, dir) {
//             if (isAnimating) return;
//             isAnimating = true;
//             gsap.killTweensOf(progressBar);

//             const tl = gsap.timeline({ onComplete: () => { isAnimating = false; currentIndex = index; autoFill(); } });
            
//             gsap.set(slides[index], { xPercent: dir === "next" ? 100 : -100 });
            
//             tl.to(slides[currentIndex], { xPercent: dir === "next" ? -100 : 100, duration: TRANSITION, ease: "expo.inOut" }, 0)
//               .to(slides[index], { xPercent: 0, duration: TRANSITION, ease: "expo.inOut" }, 0)
//               .to(progressBar, { width: `${index * segment}%`, duration: TRANSITION, ease: "expo.inOut" }, 0);
//         }

//         function autoFill() {
//             gsap.to(progressBar, {
//                 width: `${(currentIndex + 1) * segment}%`,
//                 duration: SLIDE_WAIT,
//                 ease: "none",
//                 onComplete: () => {
//                     const next = (currentIndex + 1) % slides.length;
//                     if (next === 0) gsap.set(progressBar, { width: 0 });
//                     move(next, "next");
//                 }
//             });
//         }

//         // 4. Interactions
//         document.querySelector("#carousel-area").addEventListener("click", () => {
//             const isRight = mouse.x > window.innerWidth / 2;
//             const next = isRight ? (currentIndex + 1) % slides.length : (currentIndex - 1 + slides.length) % slides.length;
//             move(next, isRight ? "next" : "prev");
//         });

//         document.body.addEventListener("mouseenter", () => gsap.to(cursor, { scale: 1 }));
//         document.body.addEventListener("mouseleave", () => gsap.to(cursor, { scale: 0 }));

//         autoFill();


const slides = document.querySelectorAll(".carousel-slide");
        const progressBar = document.querySelector("#main-progress-bar");
        const cursor = document.querySelector("#custom-cursor");
        const cursorDot = document.querySelector("#cursor-dot");
        const cursorText = document.querySelector("#cursor-text");
        
        let currentIndex = 0;
        let isAnimating = false;
        const SLIDE_WAIT = 4; 
        const TRANSITION = 1.2;
        const segment = 100 / slides.length;

        // 1. Setup Slides
        gsap.set(slides, { xPercent: 100 });
        gsap.set(slides[0], { xPercent: 0 });

        // 2. Magnetic Logic
        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const mouse = { x: pos.x, y: pos.y };
        
        const xSet = gsap.quickSetter(cursor, "x", "px");
        const ySet = gsap.quickSetter(cursor, "y", "px");
        const xDotSet = gsap.quickSetter(cursorDot, "x", "px");
        const yDotSet = gsap.quickSetter(cursorDot, "y", "px");

        window.addEventListener("mousemove", e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            
            // Text logic
            cursorText.innerText = mouse.x > window.innerWidth / 2 ? "Next" : "Prev";
            
            // Move Dot instantly
            xDotSet(mouse.x);
            yDotSet(mouse.y);
        });

        // The Magnetic Ticker
        gsap.ticker.add(() => {
            const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio()); 
            pos.x += (mouse.x - pos.x) * dt;
            pos.y += (mouse.y - pos.y) * dt;
            
            xSet(pos.x - 50); // Offset by half of width (100px / 2)
            ySet(pos.y - 50);
        });

        // 3. Carousel Logic
        function move(index, dir) {
            if (isAnimating) return;
            isAnimating = true;

            gsap.killTweensOf(progressBar);

            const tl = gsap.timeline({ 
                onComplete: () => { 
                    isAnimating = false; 
                    currentIndex = index; 
                    autoFill(); 
                } 
            });
            
            gsap.set(slides[index], { xPercent: dir === "next" ? 100 : -100 });
            
            tl.to(slides[currentIndex], { xPercent: dir === "next" ? -100 : 100, duration: TRANSITION, ease: "expo.inOut" }, 0)
              .to(slides[index], { xPercent: 0, duration: TRANSITION, ease: "expo.inOut" }, 0)
              .to(progressBar, { width: `${index * segment}%`, duration: TRANSITION, ease: "expo.inOut" }, 0);
        }

        function autoFill() {
            gsap.to(progressBar, {
                width: `${(currentIndex + 1) * segment}%`,
                duration: SLIDE_WAIT,
                ease: "none",
                onComplete: () => {
                    const next = (currentIndex + 1) % slides.length;
                    if (next === 0) gsap.set(progressBar, { width: 0 });
                    move(next, "next");
                }
            });
        }

        // 4. Interaction
        document.querySelector("#carousel-area").addEventListener("click", () => {
            const isRight = mouse.x > window.innerWidth / 2;
            const next = isRight ? (currentIndex + 1) % slides.length : (currentIndex - 1 + slides.length) % slides.length;
            move(next, isRight ? "next" : "prev");
        });

        document.body.addEventListener("mouseenter", () => gsap.to([cursor, cursorDot], { scale: 1, duration: 0.3 }));
        document.body.addEventListener("mouseleave", () => gsap.to([cursor, cursorDot], { scale: 0, duration: 0.3 }));

        autoFill();