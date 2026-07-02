import {words} from "../constants/index.js";
import Button from "../component/Button.jsx";
import {useGSAP} from "@gsap/react";
import  gsap from "gsap";
import AnimatedCounter from "../component/AnimatedCounter.jsx";

const Hero = () => {
    useGSAP(() => {
        gsap.fromTo('.hero-text h1',
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                stagger: 0.16,
                duration: 0.9,
                ease: 'power2.out'
            },
        )

        gsap.fromTo('.hero-copy',
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power2.out' }
        )
    })


  return (

    <section id='hero' className='hero-bg'>
        <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-40"
        >
            <source src="/images/screen.mp4" type="video/mp4" />
        </video>

        <div className='hero-layout'>
            {/* Left: Hero content */}
            <header className="flex flex-col justify-center h-full md:w-1/2 w-full md:px-20 px-5">
                <div className="flex flex-col gap-7 justify-center h-full">
                    <div className='hero-text'>
                        <h1>
                            Bringing
                            <span className='slide'>
                                <span className='wrapper'>
                                    {words.map((word)=>(
                                        <span key={word.text} className='flex items-center md:gap-3 gap-1 pb-2'>
                                            <img
                                            src={word.imgPath}
                                            alt={word.text}
                                            className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                                            />
                                            <span>{word.text}</span>
                                        </span>
                                        ))}
                                </span>

                            </span>


                        </h1>
                        <h1>Exceptional Skill</h1>
                    </div>
                    <div className="hero-copy flex flex-col gap-5">
                        <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
                            Hello, it's me Yishak. Welcome to my portfolio.
                        </p>

                        <div>
                            <Button
                                className="w-40 md:h-12 h-10"
                                id="button"
                                text="See my work"
                            />
                        </div>
                    </div>

                </div>
            </header>
        </div>

        <AnimatedCounter />
    </section>
  )
}

export default Hero