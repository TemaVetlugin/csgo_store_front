import { useEffect, useRef } from "react";
import { useAnimation, useInView } from "framer-motion";
import { Motion } from "./motion";
import { MOTION_CONFIG } from "@/lib/utils/motion";

export const AnimatedText = ({
  text,
  as: Wrapper = "p",
  className,
  once,
  repeatDelay,
  animation = MOTION_CONFIG.ANIMATE_TEXT_DEFAULT_ANIMATION,
}) => {
  const controls = useAnimation();
  const textArray = Array.isArray(text) ? text : [text];
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });

  useEffect(() => {
    let timeout;

    const show = () => {
      controls.start("show");

      if (repeatDelay) {
        timeout = setTimeout(async () => {
          await controls.start("hidden");
          controls.start("show");
        }, repeatDelay);
      }
    };

    if (isInView) {
      show();
    } else {
      controls.start("hidden");
    }

    return () => clearTimeout(timeout);
  }, [controls, isInView, repeatDelay]);

  return (
    <Wrapper className={className}>
      <span className="sr-only">{textArray.join(" ")}</span>

      <Motion
        ref={ref}
        as="span"
        initial="hidden"
        animate={controls}
        variants={{
          show: { transition: { staggerChildren: 0.1 } },
        }}
        aria-hidden
      >
        {textArray.map((line, lineIndex) => (
          <span className="block" key={`${line}_${lineIndex}`}>
            {line.split(" ").map((word, wordIndex) => (
              <span className="inline-block" key={`${word}_${wordIndex}`}>
                {word.split("").map((char, charIndex) => (
                  <Motion
                    key={`${char}_${charIndex}`}
                    className="inline-block"
                    as="span"
                    variants={animation}
                  >
                    {char}
                  </Motion>
                ))}
                <span className="mr-1 inline-block" />
              </span>
            ))}
          </span>
        ))}
      </Motion>
    </Wrapper>
  );
};
