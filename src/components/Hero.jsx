import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const lettersRef = useRef([]);
  const statsRef = useRef([]);
  const imageRef = useRef(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
 const ctx = gsap.context(() => {
    // Headline animation
    gsap.from(lettersRef.current, {
      opacity: 0,
      y: 80,
      stagger: 0.04,
      duration: 1,
      ease: "power4.out",
    });

    // Stats animation
    gsap.from(statsRef.current, {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      delay: 0.5,
    });

     const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top top",
      end: "+=150%",
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    },
  });

  tl.to(imageRef.current, {
    x: window.innerWidth * 1.5,
    ease: "none",
  });

    }, sectionRef);

     return () => ctx.revert();
  }, []);

  const text = "WELCOME ITZFIZZ";

  return (
    <section ref={sectionRef} className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden relative bg-black">

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl tracking-[0.2em] flex flex-wrap justify-center font-semibold">
         {text.split("").map((char, i) => (
    <span
      key={i}
      ref={(el) => (lettersRef.current[i] = el)}
      className="inline-block"
    >
            {char}
          </span>
        ))}
      </h1>

      {/* Stats */}
      <div className="flex gap-10 mt-10">
        {["90% Growth", "120% ROI", "80% Retention"].map((item, i) => (
          <div key={i} ref={(el) => {
  if (el && !lettersRef.current.includes(el)) {
    lettersRef.current.push(el);
  }
}}>
            <h2 className="text-3xl font-bold">{item.split(" ")[0]}</h2>
            <p className="text-sm opacity-70">{item.split(" ")[1]}</p>
          </div>
        ))}
      </div>

      {/*Glow*/}
      <div className="absolute w-[400px] h-[400px] bg-blue-500 blur-3xl opacity-20 rounded-full bottom-0"></div>

      {/*Image */}
      <img
       ref={imageRef}
       src="/car.png"
       className="absolute bottom-10 left-[-50px] w-96"
      />

    </section>
  );
}