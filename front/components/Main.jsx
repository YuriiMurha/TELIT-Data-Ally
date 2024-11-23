"use client";
import React, { useEffect, useRef, Suspense } from 'react';
import '@styles/Fonts.css';
import '@styles/globals.css';
import '@styles/home_button.css';

import Clef from '@models/Clef';
import { Canvas } from '@react-three/fiber';
import '@styles/Light_style.css'
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { BsFillPersonLinesFill, BsHouseAdd } from 'react-icons/bs'

import SplitType from 'split-type';
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Main = () => {
    const refs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

    useEffect(() => {
        const createAnimation = (ref, timeline, params) => {
            const typeSplit = new SplitType(ref.current, {
                types: params.types,
                tagName: 'span'
            });

            const elements = typeSplit[params.types];
            gsap.set(elements, { y: '100%', opacity: 0 });

            timeline.to(elements, {
                y: params.y,
                opacity: 1,
                duration: params.duration,
                ease: params.ease,
                stagger: params.stagger,
            });

            return typeSplit;
        };

        const getAnimationParams = () => {
            if (window.innerWidth <= 768) {
                return [
                    { duration: 0, ease: 'power4.out', stagger: 0.5, types: 'words', y: '0%', start: "top 0%", end: "top 0%" },
                    { duration: 0, ease: 'power4.out', stagger: 0.4, types: 'words', y: '0%', start: "top 20%", end: "top 0%" },
                    { duration: 0, ease: 'power4.out', stagger: 0.4, types: 'words', y: '0%', start: "top -10%", end: "top -50%" },
                    { duration: 0.4, ease: 'expo.out', stagger: 0, types: 'lines', y: '0%', start: "top 20%", end: "top 0%" },
                    { duration: 0.1, ease: 'expo.out', stagger: 0, types: 'lines', y: '0%', start: "top 60%", end: "top 50%" },
                    { duration: 0.1, ease: 'expo.out', stagger: 0, types: 'lines', y: '0%', start: "top 60%", end: "top 50%" }
                ];
            } else {
                return [
                    { duration: 0.5, ease: 'power4.out', stagger: 0.4, types: 'words', y: '0%', start: "top 10%", end: "top 10%" },
                    { duration: 0.8, ease: 'power4.out', stagger: 0.3, types: 'words', y: '0%', start: "top 35%", end: "top -10%" },
                    { duration: 0.08, ease: 'expo.out', stagger: 0.3, types: 'lines', y: '0%', start: "top 0%", end: "top -50%" },
                    { duration: 0.2, ease: 'expo.out', stagger: 0, types: 'lines', y: '0%', start: "top 50%", end: "top 40%" },
                    { duration: 0.1, ease: 'expo.out', stagger: 0, types: 'lines', y: '0%', start: "top 70%", end: "top 60%" },
                    { duration: 0.1, ease: 'expo.out', stagger: 0, types: 'lines', y: '0%', start: "top 70%", end: "top 60%" }
                ];
            }
        };

        const tl = gsap.timeline({ delay: 1.6 });
        const animationParams = getAnimationParams();

        const splitTypes = refs.map((ref, index) => createAnimation(ref, tl, animationParams[index]));

        refs.forEach((ref, index) => {
            let params = animationParams[index];
            ScrollTrigger.create({
                trigger: ref.current,
                start: params.start,
                end: params.end,
                // markers: 'true',
                onUpdate: (self) => {
                    gsap.to(ref.current, { opacity: 1 - self.progress, ease: 'power1.out', duration: 0.35 });
                }
            });
        });

        return () => {
            splitTypes.forEach(typeSplit => typeSplit.revert());
        };
    }, []);

    return (
        <div id="Home">
            <div className=' gradient-background w-full h-auto mx-auto p-2  justify-center items-center mb-5'>
                <div className="flex flex-col  justify-between py-16 items-center h-full w-full md:text-center xs:text-left" style={{ userSelect: 'none' }} >

                    <div className=' frosted-glass-small flex md:flex-row flex-col gap-0 md:gap-32 justify-between mt-24 px-28 py-5 rounded-xl  border-2 border-pink-400'>
                        <div className="text-[#ffffff]   flex flex-col justify-center font-viola text-start xs:text-8xl">
                            <div className='flex felx-row gap-5'>
                                <div className='text-[6vw] text-[#FA4AA5]'>Telekom</div>
                                <div className='text-[6vw] text-[#2f2f2f]'>Smart</div>
                            </div>
                            <div className='text-[5vw] pt-5 text-[#2f2f2f]'> <span className='text-[#2f2f2f]'>AI </span>   <span className='text-[#FA4AA5]'>Dashboard</span> </div>
                        </div>

                        <div className='relative' style={{ overflow: 'visible' }}>
                            <Suspense fallback={null}>

                                <div style={{ position: 'relative', width: '280px', height: '280px' }}>
                                    <Canvas
                                        ref={refs[2]}
                                        className="absolute top-0 left-0 overflow-visible"
                                        style={{ width: '100%', height: '100%' }}
                                        camera={{
                                            position: [0, 0, 6],
                                            fov: 60,
                                            rotation: [(3 * Math.PI) / 180, 0, 0],
                                        }}
                                    >
                                        {/* Источники света */}
                                        <ambientLight color="#FFFFFF" intensity={8} />
                                        <ambientLight color="#FFFFFF" intensity={0.1} />
                                        <pointLight position={[0, 1, 2]} color="#FFFFFF" intensity={5} penumbra={0} />
                                        <pointLight position={[0, 4, 2]} color="#FFFFFF" intensity={5} penumbra={0} />

                                        {/* Объект */}
                                        <Clef position={[0, 0.5, -4]} scale={[-4, 4, 4]} />
                                    </Canvas>

                                    <div className='text-[#FA4AA5] font-mono text-sm uppercase'
                                        style={{
                                            position: 'absolute',
                                            bottom: '-5px',
                                            right: '0px',
                                        }}
                                    >
                                        Click model
                                    </div>
                                </div>

                            </Suspense>

                        </div>

                    </div>



                    <div className="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
                        <div className="flex gap-10 flex-col lg:flex-row ">

                            <div className="grid gap-5 row-gap-5 sm:grid-cols-2">
                                <div className="max-w-md flex flex-col frosted-glass-full rounded-2xl p-5 text-left border border-pink-400 ">
                                    <div className="flex items-center justify-center w-11 h-11 mb-4 rounded-full bg-[#FA4AA5]">
                                        <svg
                                            className="w-12 h-12 text-white"
                                            stroke="currentColor"
                                            viewBox="0 0 52 52"
                                        >
                                            <polygon
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill="none"
                                                points="29 13 14 29 25 29 23 39 38 23 27 23"
                                            />
                                        </svg>
                                    </div>
                                    <h6 className="mb-4 font-bold leading-5 text-xl  text-[#2f2f2f]">
                                        AI-Powered Solutions
                                    </h6>
                                    <p className="text-sm  text-[#2f2f2f]">
                                        Smarter decisions and seamless communication with innovative AI
                                    </p>
                                </div>
                                <div className="max-w-md flex flex-col frosted-glass-full rounded-2xl p-5 text-left border border-pink-400 ">
                                    <div className="flex items-center justify-center w-11 h-11 mb-4 rounded-full bg-[#FA4AA5]">
                                        <svg className='w-12 h-12 p-2 text-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 16V20M6 4V8M7 18H3M8 6H4M13 4L14.7528 8.44437C14.9407 8.92083 15.0347 9.15906 15.1786 9.35994C15.3061 9.538 15.462 9.69391 15.6401 9.82143C15.8409 9.9653 16.0792 10.0593 16.5556 10.2472L21 12L16.5556 13.7528C16.0792 13.9407 15.8409 14.0347 15.6401 14.1786C15.462 14.3061 15.3061 14.462 15.1786 14.6401C15.0347 14.8409 14.9407 15.0792 14.7528 15.5556L13 20L11.2472 15.5556C11.0593 15.0792 10.9653 14.8409 10.8214 14.6401C10.6939 14.462 10.538 14.3061 10.3599 14.1786C10.1591 14.0347 9.92083 13.9407 9.44437 13.7528L5 12L9.44437 10.2472C9.92083 10.0593 10.1591 9.9653 10.3599 9.82143C10.538 9.69391 10.6939 9.538 10.8214 9.35994C10.9653 9.15906 11.0593 8.92083 11.2472 8.44437L13 4Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    </div>
                                    <h6 className="mb-4 font-bold leading-5 text-xl  text-[#2f2f2f]">
                                        Transforming Telecom
                                    </h6>
                                    <p className="text-sm text-[#2f2f2f]">
                                        Redefining networks and customer engagement with AI-powered efficiency</p>
                                </div>
                            </div>

                            <div id="bottone1" className="max-w-xl  mx-auto bg-[#FA4AA5] text-white  rounded-2xl pt-10 px-7 pb-0 text-left">
                                <h5 className=" text-3xl font-extrabold  leading-none">
                                    AI-Driven Innovation
                                </h5>
                                <div className='flex flex-row gap-3 justify-start items-center'>
                                    <p className=" text-white">
                                        Harnessing artificial intelligence to deliver smarter, faster, and more reliable solutions for modern telecom challenges.
                                    </p>
                                    <svg width="84px" height="84px" className='w-28 h-28' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.7 8.46002C17.7 8.26111 17.621 8.07034 17.4803 7.92969C17.3397 7.78904 17.1489 7.71002 16.95 7.71002C16.7511 7.71002 16.5603 7.78904 16.4197 7.92969C16.279 8.07034 16.2 8.26111 16.2 8.46002V15.14L7.57999 6.52002C7.43781 6.38754 7.24977 6.31541 7.05546 6.31884C6.86116 6.32227 6.67578 6.40098 6.53837 6.5384C6.40095 6.67581 6.32224 6.86119 6.31881 7.0555C6.31538 7.2498 6.38751 7.43784 6.51999 7.58002L15.14 16.2H8.45999C8.26107 16.2 8.07031 16.279 7.92966 16.4197C7.789 16.5603 7.70999 16.7511 7.70999 16.95C7.70999 17.1489 7.789 17.3397 7.92966 17.4803C8.07031 17.621 8.26107 17.7 8.45999 17.7H17C17.0997 17.6995 17.1983 17.6791 17.29 17.64C17.4085 17.5787 17.5088 17.4873 17.5807 17.375C17.6527 17.2626 17.6938 17.1333 17.7 17V8.46002Z" fill="#ffffff"></path> </g></svg>

                                </div>

                            </div>

                        </div>
                    </div>


                </div>
            </div>

        </div>
    )

}

export default Main