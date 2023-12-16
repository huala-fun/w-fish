"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [tips, setTips] = useState<string[]>([]);

  const triggerMuyuHit = () => {
    setCounter((prevCounter) => {
      const res = prevCounter + 1;
      localStorage.setItem("counter", String(res));
      return res;
    });
    setTips((prevTips) => [...prevTips, "功德+1"]);
    setIsAnimating(true);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setTips((tips) => {
        tips.splice(0, 1);
        return tips;
      });
    }, 500);

    return () => {
      clearInterval(t);
    };
  }, []);

  useEffect(() => {
    setHasMounted(true);
    const count = parseInt(localStorage.getItem("counter") || "0");
    setCounter(count);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === " " || event.code === "Space") {
        event.preventDefault(); // 防止任何默认行为，比如滚动
        triggerMuyuHit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    // 移除监听器
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsAnimating(false);
    }, 100);
    return () => {
      clearTimeout(t);
    };
  }, [isAnimating]);

  if (!hasMounted) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-0  select-none ">
      <div className="flex">赛博木鱼</div>
      <div className="flex justify-center items-center flex-col">
        <div className="text-[96px] animate__animated animate__swing">{counter}</div>
        <span className=" mt-[-2rem]">功德</span>
      </div>
      <div>
        <div className="flex justify-center items-center flex-col">
          {tips.map((tip, index) => (
            <div className="animate__animated  animate__fadeOutUp" key={index}>
              {tip}
            </div>
          ))}
        </div>

        <Image
          onClick={triggerMuyuHit}
          src={"/muyu.svg"}
          alt="电子木鱼"
          width={200}
          height={200}
          className={cn("cursor-pointer", isAnimating && "w-f-c-i-size")}
        />
      </div>
      <footer>
        <Badge variant="outline">按下空格</Badge> /
        <Badge variant="outline">点击木鱼</Badge> 积攒功德
      </footer>
    </main>
  );
}
