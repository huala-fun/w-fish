"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const hasMounted = useRef(false);
  const triggerMuyuHit = () => {
    setCounter((prevCounter) => {
      const res = prevCounter + 1;
      localStorage.setItem("counter", String(res));
      return res;
    });
    setIsAnimating(true);
  };

  useEffect(() => {
    console.log(localStorage.getItem("counter"));
    setCounter(()=>{
      hasMounted.current = true;
     return  parseInt(localStorage.getItem("counter") || "0")
    });
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


  if(!hasMounted.current){
    return null
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-center items-center flex-col">
        <div className="text-[96px]">{counter}</div>
        <span className=" mt-[-2rem]">功德</span>
      </div>
      <Image
        onClick={triggerMuyuHit}
        src={"/muyu.svg"}
        alt="电子木鱼"
        width={200}
        height={200}
        className={cn("cursor-pointer", isAnimating && "w-f-c-i-size")}></Image>

      <footer>
        <Badge variant="outline">按下空格</Badge> /
        <Badge variant="outline">点击木鱼</Badge> 积攒功德
      </footer>
    </main>
  );
}
