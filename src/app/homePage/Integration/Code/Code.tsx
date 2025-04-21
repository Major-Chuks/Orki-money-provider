import React from "react";
import { Highlight, themes } from "prism-react-renderer";
import classes from "./Code.module.css";

const codeBlock = `const Widget = () => {
  return (
    <>
      {/* Button opening a new link to Orki */}
      <a
        href="https://buy.orki.com?apiKey=pk_prod_01HETEQF46GSK6BS5JWKDF31BT&mode=buy"
        target="_blank"
        className="button"
      >
        Buy Crypto
      </a>

      {/* Embedding an iFrame */}
      <iframe
        src="https://buy.orki.com?apiKey=pk_prod_01HETEQF46GSK6BS5JWKDF31BT&mode=buy"
        title="Orki Widget"
        height="630px"
        width="420px"
        allow="accelerometer; autoplay; camera; gyroscope; payment; microphone"
      />
    </>
  );
};`;

const Code = () => (
  <Highlight theme={themes.oneDark} code={codeBlock} language="tsx">
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={`${className} ${classes.container}`} style={style}>
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

export default Code;
