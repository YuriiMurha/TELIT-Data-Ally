"use client";
import React, { useEffect, Suspense } from 'react';
import CustomCursor from '@components/Cursors';
import NavbarMenu from '@components/NavbarMenu';
import Main from "@components/Main";
import Section from "@components/Section_1";

import Template from '@components/template';
import '@styles/globals.css';
import { PanelScroll } from '@components/PanelScroll';

const Home = ({ children }) => {
    useEffect(() => {
        PanelScroll();
    }, []);

    return (
        // <Template>

        <div id="wrapper">
            <NavbarMenu />

            <div className="hidden md:flex">
                <CustomCursor />
            </div>


            <div className="circle"></div>

            <main className='app'>
                <div className="panel blue">
                    <Suspense fallback={null}>
                        <Main />
                    </Suspense>

                </div>
{/* 
                <div className="panel fiol">
                    <Section/>
                </div> */}

            </main>


        </div>
        // </Template>
    );
}

export default Home;