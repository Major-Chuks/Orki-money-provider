import React, { useEffect, useRef } from "react";

interface GlowingDotGridProps {
  rows?: number;
  cols?: number;
  width?: number;
  height?: number;
  dotSize?: number;
  dotColor?: string;
  strokeColor?: string;
  glowMinSpeed?: number;
  glowMaxSpeed?: number;
  bgColor?: string;
  borderRadius?: number;
}

const GlowingDotGrid: React.FC<GlowingDotGridProps> = ({
  rows = 12,
  cols = 12,
  width = 360,
  height = 360,
  dotSize = 6,
  dotColor = "#5B29EC",
  strokeColor = "#E2E0F1",
  glowMinSpeed = 1,
  glowMaxSpeed = 3,
  bgColor = "transparent",
  borderRadius = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const spacingX = width / (cols - 1);
  const spacingY = height / (rows - 1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1;

    // Horizontal lines (skip top and bottom rows)
    for (let y = 1; y < rows - 1; y++) {
      for (let x = 0; x < cols - 1; x++) {
        const startX = x * spacingX;
        const endX = (x + 1) * spacingX;
        const posY = y * spacingY;

        ctx.beginPath();
        ctx.moveTo(startX, posY);
        ctx.lineTo(endX, posY);
        ctx.stroke();
      }
    }

    // Vertical lines (skip left and right columns)
    for (let x = 1; x < cols - 1; x++) {
      for (let y = 0; y < rows - 1; y++) {
        const posX = x * spacingX;
        const startY = y * spacingY;
        const endY = (y + 1) * spacingY;

        ctx.beginPath();
        ctx.moveTo(posX, startY);
        ctx.lineTo(posX, endY);
        ctx.stroke();
      }
    }
  }, [rows, cols, width, height, strokeColor]);

  const dots: JSX.Element[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // Skip dots on the border
      const isEdge = x === 0 || x === cols - 1 || y === 0 || y === rows - 1;
      if (isEdge) continue;

      const delay = (Math.random() * 4).toFixed(2);
      const duration = (
        Math.random() * (glowMaxSpeed - glowMinSpeed) +
        glowMinSpeed
      ).toFixed(2);

      dots.push(
        <div
          key={`dot-${x}-${y}`}
          className="glow-dot"
          style={{
            left: `${x * spacingX}px`,
            top: `${y * spacingY}px`,
            width: dotSize,
            height: dotSize,
            backgroundColor: dotColor,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        />
      );
    }
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        width,
        height,
        position: "relative",
        overflow: "hidden",
        borderRadius: `${borderRadius}px`,
      }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      />
      {dots}
      <style>{`
        .glow-dot {
          position: absolute;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.7;
          animation-name: glow;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 0 rgba(91, 75, 255, 0);
            opacity: 0;
          }
          50% {
            box-shadow: 0 0 2px currentColor;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default GlowingDotGrid;

// import React, { useEffect, useRef } from "react";

// interface GlowingDotGridProps {
//   rows?: number;
//   cols?: number;
//   width?: number;
//   height?: number;
//   dotSize?: number;
//   dotColor?: string;
//   strokeColor?: string;
//   glowMinSpeed?: number;
//   glowMaxSpeed?: number;
//   bgColor?: string;
//   borderRadius?: number;
// }

// const GlowingDotGrid: React.FC<GlowingDotGridProps> = ({
//   rows = 12,
//   cols = 12,
//   width = 360,
//   height = 360,
//   dotSize = 6,
//   dotColor = "#5B29EC",
//   strokeColor = "#E2E0F1",
//   glowMinSpeed = 1,
//   glowMaxSpeed = 3,
//   bgColor = "#ede9fe",
//   borderRadius = 0,
// }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const spacingX = width / (cols - 1);
//   const spacingY = height / (rows - 1);

//   // ✏️ Draw internal grid lines (excluding outermost lines)
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.strokeStyle = `${strokeColor}`;
//     ctx.lineWidth = 1;

//     for (let x = 1; x < cols - 1; x++) {
//       const posX = x * spacingX;
//       ctx.beginPath();
//       ctx.moveTo(posX, 0);
//       ctx.lineTo(posX, canvas.height);
//       ctx.stroke();
//     }

//     for (let y = 1; y < rows - 1; y++) {
//       const posY = y * spacingY;
//       ctx.beginPath();
//       ctx.moveTo(0, posY);
//       ctx.lineTo(canvas.width, posY);
//       ctx.stroke();
//     }
//   }, [rows, cols, width, height, strokeColor]);

//   // 💡 Render dots only inside inner grid (no border dots)
//   const dots: JSX.Element[] = [];
//   for (let y = 1; y < rows - 1; y++) {
//     for (let x = 1; x < cols - 1; x++) {
//       const delay = (Math.random() * 4).toFixed(2);
//       const duration = (
//         Math.random() * (glowMaxSpeed - glowMinSpeed) +
//         glowMinSpeed
//       ).toFixed(2);

//       dots.push(
//         <div
//           key={`dot-${x}-${y}`}
//           className="glow-dot"
//           style={{
//             left: `${x * spacingX}px`,
//             top: `${y * spacingY}px`,
//             width: dotSize,
//             height: dotSize,
//             backgroundColor: dotColor,
//             animationDelay: `${delay}s`,
//             animationDuration: `${duration}s`,
//           }}
//         />
//       );
//     }
//   }

//   return (
//     <div
//       style={{
//         backgroundColor: bgColor,
//         width,
//         height,
//         position: "relative",
//         overflow: "hidden",
//         borderRadius: `${borderRadius}px`,
//       }}
//     >
//       <canvas
//         ref={canvasRef}
//         width={width}
//         height={height}
//         style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
//       />
//       {dots}
//       <style>{`
//         .glow-dot {
//           position: absolute;
//           border-radius: 50%;
//           transform: translate(-50%, -50%);
//           opacity: 0.7;
//           animation-name: glow;
//           animation-iteration-count: infinite;
//           animation-timing-function: ease-in-out;
//         }

//         @keyframes glow {
//           0%, 100% {
//             box-shadow: 0 0 0 rgba(91, 75, 255, 0);
//             opacity: 0.6;
//           }
//           50% {
//             box-shadow: 0 0 12px currentColor;
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default GlowingDotGrid;

// import React, { useEffect, useRef } from "react";

// interface GlowingDotGridProps {
//   rows?: number;
//   cols?: number;
//   width?: number;
//   height?: number;
//   dotSize?: number;
//   dotColor?: string;
//   strokeColor?: string;
//   glowMinSpeed?: number;
//   glowMaxSpeed?: number;
//   bgColor?: string;
//   borderRadius?: number;
// }

// const GlowingDotGrid: React.FC<GlowingDotGridProps> = ({
//   rows = 12,
//   cols = 12,
//   width = 360,
//   height = 360,
//   dotSize = 6,
//   dotColor = "#5B29EC",
//   strokeColor = "#E2E0F1",
//   glowMinSpeed = 1,
//   glowMaxSpeed = 3,
//   bgColor = "#ede9fe",
//   borderRadius = 0,
// }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     const spacingX = canvas.width / (cols - 1);
//     const spacingY = canvas.height / (rows - 1);

//     ctx.strokeStyle = `${strokeColor}`;
//     ctx.lineWidth = 1;

//     for (let x = 0; x < cols; x++) {
//       ctx.beginPath();
//       ctx.moveTo(x * spacingX, 0);
//       ctx.lineTo(x * spacingX, canvas.height);
//       ctx.stroke();
//     }

//     for (let y = 0; y < rows; y++) {
//       ctx.beginPath();
//       ctx.moveTo(0, y * spacingY);
//       ctx.lineTo(canvas.width, y * spacingY);
//       ctx.stroke();
//     }
//   }, [rows, cols, width, height, strokeColor, dotColor]);

//   const spacingX = width / (cols - 1);
//   const spacingY = height / (rows - 1);

//   const dots: JSX.Element[] = [];
//   for (let y = 0; y < rows; y++) {
//     for (let x = 0; x < cols; x++) {
//       const delay = (Math.random() * 4).toFixed(2);
//       const duration = (
//         Math.random() * (glowMaxSpeed - glowMinSpeed) +
//         glowMinSpeed
//       ).toFixed(2);

//       dots.push(
//         <div
//           key={`dot-${x}-${y}`}
//           className="glow-dot"
//           style={{
//             left: `${x * spacingX}px`,
//             top: `${y * spacingY}px`,
//             width: dotSize,
//             height: dotSize,
//             backgroundColor: dotColor,
//             animationDelay: `${delay}s`,
//             animationDuration: `${duration}s`,
//             // boxShadow: `0 0 0 ${dotColor}00`,
//           }}
//         />
//       );
//     }
//   }

//   return (
//     <div
//       style={{
//         backgroundColor: bgColor,
//         width,
//         height,
//         position: "relative",
//         overflow: "hidden",
//         borderRadius: `${borderRadius}px`,
//       }}
//     >
//       <canvas
//         ref={canvasRef}
//         width={width}
//         height={height}
//         style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
//       />
//       {dots}
//       <style>{`
//         .glow-dot {
//           position: absolute;
//           border-radius: 50%;
//           transform: translate(-50%, -50%);
//           opacity: 0.7;
//           animation-name: glow;
//           animation-iteration-count: infinite;
//           animation-timing-function: ease-in-out;
//         }

//         @keyframes glow {
//           0%, 100% {
//             box-shadow: 0 0 0 rgba(91, 75, 255, 0);
//             opacity: 0.6;
//           }
//           50% {
//             box-shadow: 0 0 12px currentColor;
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default GlowingDotGrid;
