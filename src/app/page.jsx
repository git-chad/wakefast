"use client";
import Image from "next/image";
import logo from "/public/wakefast-logo.png";
import image1 from "/public/image1-2x.jpg";
import image2 from "/public/image2-2x.jpg";
import image3 from "/public/image3-2x.jpg";
import drawing11 from "/public/drawing1-1.png";
import drawing12 from "/public/drawing1-2.png";
import drawing13 from "/public/drawing1-3.png";
import drawing21 from "/public/drawing2-1.png";
import drawing22 from "/public/drawing2-2.png";
import drawing23 from "/public/drawing2-3.png";
import drawing31 from "/public/drawing3-1.png";
import drawing32 from "/public/drawing3-2.png";
import drawing33 from "/public/drawing3-3.png";
import underline1 from "/public/underline1.png";
import underline2 from "/public/underline2.png";
import underline3 from "/public/underline3.png";

import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const mainTag = document.querySelector("main");
    const bodyTag = document.querySelector("body");
    const figcaps = document.querySelectorAll("figcaption");
    const cursor = document.querySelector("div.cursor");
    const cursorOuter = document.querySelector("div.cursor-outer");

    mainTag.style.position = "fixed";
    mainTag.style.top = "0px";
    mainTag.style.left = "0px";
    mainTag.style.width = "100%";

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.25) {
            entry.target.classList.add("in-view");
            console.log("enters screen");
          }
        });
      },
      {
        threshold: [0, 0.25, 1],
      }
    );

    figcaps.forEach((caption) => {
      obs.observe(caption);
    });

    let currentScroll = 0;
    let aimScroll = 0;

    const changeScroll = () => {
      bodyTag.style.height = mainTag.offsetHeight + "px";
      mainTag.style.top = -1 * currentScroll + "px";

      currentScroll = currentScroll + (aimScroll - currentScroll) * 0.04;

      figcaps.forEach((cap) => {
        //box general info
        const box = cap.getBoundingClientRect();
        //boxes midpoint
        const midY = box.y + box.height / 2;
        //pages midpoint
        const midScreen = window.innerHeight / 2;
        //comparing both
        const diff = midY - midScreen;
        const imgs = cap.querySelectorAll("img");
        // by using the index, i can set a different speed of
        // movement for each img part
        imgs.forEach((img, index) => {
          const speed = 0.1 + 0.05 * index;
          img.style.top = diff * speed + "px";
        });
      });

      requestAnimationFrame(changeScroll);
    };

    window.addEventListener("scroll", () => {
      aimScroll = window.scrollY;
    });

    changeScroll();

    let cursorCurrentX = 0;
    let cursorCurrentY = 0;
    let cursorOuterCurrentX = 0;
    let cursorOuterCurrentY = 0;
    let cursorAimX = 0;
    let cursorAimY = 0;

    const changeCursor = () => {
      cursorCurrentX = cursorCurrentX + (cursorAimX - cursorCurrentX) * 0.09;
      cursorCurrentY = cursorCurrentY + (cursorAimY - cursorCurrentY) * 0.09;

      cursor.style.left = cursorCurrentX + "px";
      cursor.style.top = cursorCurrentY + "px";

      cursorOuterCurrentX =
        cursorOuterCurrentX + (cursorAimX - cursorOuterCurrentX) * 0.12;
      cursorOuterCurrentY =
        cursorOuterCurrentY + (cursorAimY - cursorOuterCurrentY) * 0.12;

      cursorOuter.style.left = cursorOuterCurrentX + "px";
      cursorOuter.style.top = cursorOuterCurrentY + "px";

      requestAnimationFrame(changeCursor);
    };

    document.addEventListener("mousemove", (event) => {
      cursorAimX = event.pageX;
      cursorAimY = event.pageY;
    });

    changeCursor();
  }, []);

  return (
    <main className="text-2xl leading-[1.25]">
      <header className="bg-[#f2dd00] flex flex-row justify-between items-center p-12">
        <a className="w-[250px]">
          <Image src={logo} alt="Wakefast logo" />
        </a>
        <nav className="space-x-10 flex">
          <a href="#">
            Order
            <Image src={underline1} />
          </a>
          <a href="#">
            About
            <Image src={underline2} />
          </a>
          <a href="#">
            Contact
            <Image src={underline3} />
          </a>
        </nav>
      </header>

      <section className="bg-[#f2dd00] rounded-b-[50%]">
        <figure className="max-w-[700px] mx-auto">
          <Image src={image1} className="rounded-3xl" />
          <figcaption className="drawing">
            <Image src={drawing11} />
            <Image src={drawing12} />
            <Image src={drawing13} />
          </figcaption>
        </figure>
      </section>

      <section>
        <h2 className="text-[96px] mx-auto text-center max-w-[10em]">
          We're there when you get up. Real fast!
        </h2>
      </section>

      <section className="middle-pic bg-[#f09291] rounded-e-full">
        <figure className="max-w-[700px] mx-auto">
          <Image src={image2} className="rounded-3xl" />
          <figcaption className="drawing">
            <Image src={drawing21} />
            <Image src={drawing22} />
            <Image src={drawing23} />
          </figcaption>
        </figure>
      </section>

      <section>
        <h2 className="text-[96px] mx-auto text-center max-w-[10em]">
          Order by 9pm to get next-morning delivery.
        </h2>
      </section>

      <section className="bg-[#bee3f8] rounded-s-full">
        <figure className="max-w-[700px] mx-auto">
          <Image src={image3} className="rounded-3xl" />
          <figcaption className="drawing">
            <Image src={drawing31} />
            <Image src={drawing32} />
            <Image src={drawing33} />
          </figcaption>
        </figure>
      </section>
      <div className="cursor pointer-events-none"></div>
      <div className="cursor-outer pointer-events-none"></div>
    </main>
  );
}
