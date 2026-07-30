import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], [data-cursor='interactive']";
const LINK_SELECTOR = "a[href]";
const MAGNIFY_SELECTOR = "[data-cursor='magnify']";

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateEnabled = () => {
      setIsEnabled(mediaQuery.matches);
    };

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      document.body.classList.remove("custom-cursor-enabled");
      return;
    }

    document.body.classList.add("custom-cursor-enabled");

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
    };
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled || !outerRef.current || !innerRef.current || !iconRef.current) {
      return;
    }

    const outer = outerRef.current;
    const inner = innerRef.current;
    const icon = iconRef.current;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let rafId = 0;

    const setHoverState = (target: EventTarget | null, isDown = false) => {
      if (!(target instanceof Element)) {
        outer.classList.remove("is-hover", "is-down");
        inner.classList.remove("is-hover");
        icon.classList.remove("is-hover");
        return;
      }

      const isInteractive = Boolean(target.closest(INTERACTIVE_SELECTOR));
      const linkElement = target.closest<HTMLAnchorElement>(LINK_SELECTOR);
      const magnifyElement = target.closest(MAGNIFY_SELECTOR);
      const href = linkElement?.getAttribute("href")?.trim() ?? "";
      const isLink = Boolean(linkElement && href.length > 0);
      const isMagnifyTarget = Boolean(magnifyElement) || isLink;

      outer.classList.toggle("is-hover", isInteractive);
      inner.classList.toggle("is-hover", isInteractive);
      icon.classList.toggle("is-hover", isMagnifyTarget);
      outer.classList.toggle("is-down", isDown);
    };

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      setHoverState(event.target);
    };

    const onMouseDown = (event: MouseEvent) => {
      setHoverState(event.target, true);
    };

    const onMouseUp = (event: MouseEvent) => {
      setHoverState(event.target, false);
    };

    const onLeave = () => {
      outer.classList.remove("is-visible");
      inner.classList.remove("is-visible");
      icon.classList.remove("is-visible");
    };

    const onEnter = () => {
      outer.classList.add("is-visible");
      inner.classList.add("is-visible");
      icon.classList.add("is-visible");
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;

      outer.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      inner.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      icon.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);

    outer.classList.add("is-visible");
    inner.classList.add("is-visible");
    icon.classList.add("is-visible");
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <div ref={outerRef} className="custom-cursor-outer" aria-hidden />
      <div ref={innerRef} className="custom-cursor-inner" aria-hidden />
      <div ref={iconRef} className="custom-cursor-icon" aria-hidden />
    </>
  );
}
