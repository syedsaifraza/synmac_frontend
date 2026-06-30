

import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
}

export default function WrapArrow({ text }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const words = text.split("");

    let current = "";
    let breakIndex = text.length;

    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.style.whiteSpace = "pre-wrap";
    span.style.width = `${element.clientWidth}px`;
    span.style.font = getComputedStyle(element).font;

    document.body.appendChild(span);

    let firstLineHeight = 0;

    for (let i = 0; i < words.length; i++) {
      span.textContent = current + words[i];

      if (!firstLineHeight) {
        firstLineHeight = span.offsetHeight;
      }

      if (span.offsetHeight > firstLineHeight) {
        breakIndex = i;
        break;
      }

      current += words[i];
    }

    document.body.removeChild(span);

    setOutput(
      text.slice(0, breakIndex) +
        " ->\n" +
        text.slice(breakIndex)
    );
  }, [text]);

  return (
    <div
      ref={ref}
      style={{
        width: 200,
        whiteSpace: "pre-wrap",
        lineHeight: "24px",
      }}
    >
      {output}
    </div>
  );
}