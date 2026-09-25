"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/posts";

// Highlights the section being read: the last heading scrolled past the top
// quarter of the viewport. At the bottom of the page the last heading wins,
// since a short final section can never reach that line.
export default function TocLinks({
  headings,
  linkClass,
  activeClass,
}: {
  headings: Heading[];
  linkClass: string;
  activeClass: string;
}) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.25;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = headings[0]?.id;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= line) current = h.id;
      }
      setActive(atBottom ? headings[headings.length - 1]?.id : current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [headings]);

  return (
    <>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={`${linkClass} ${h.id === active ? activeClass : ""}`}
          aria-current={h.id === active ? "location" : undefined}
        >
          {h.text}
        </a>
      ))}
    </>
  );
}
