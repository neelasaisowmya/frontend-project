import React, { useEffect, useRef } from "react";

// Simple confetti burst using canvas
const ConfettiEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width = 320;
    const H = canvas.height = 80;
    let confetti = [];
    const colors = ["#2874f0","#06b6d4","#a78bfa","#facc15","#22c55e","#f59e42"];
    for (let i = 0; i < 32; i++) {
      confetti.push({
        x: Math.random() * W,
        y: Math.random() * H/2,
        r: 6 + Math.random() * 6,
        d: 2 + Math.random() * 2,
        color: colors[Math.floor(Math.random()*colors.length)],
        tilt: Math.random() * 10 - 5
      });
    }
    let angle = 0;
    let animationFrame;
    function draw() {
      ctx.clearRect(0,0,W,H);
      angle += 0.02;
      for (let i = 0; i < confetti.length; i++) {
        let c = confetti[i];
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI*2, false);
        ctx.fillStyle = c.color;
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
        c.y += Math.cos(angle + i) + c.d;
        c.x += Math.sin(angle) * 2;
        c.tilt += Math.sin(angle) * 0.5;
        if (c.y > H) {
          c.y = -10;
          c.x = Math.random() * W;
        }
      }
      animationFrame = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={80}
      style={{position:"absolute",left:0,top:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:2}}
      aria-hidden
    />
  );
};

export default ConfettiEffect;
