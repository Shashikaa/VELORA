"use client";
import { useEffect, useRef, useState } from "react";
export default function OpeningFilm({src,poster,onFinish}:{src:string;poster?:string;onFinish:()=>void}) {
 const video=useRef<HTMLVideoElement>(null),[failed,setFailed]=useState(false);
 useEffect(()=>{void video.current?.play().catch(()=>setFailed(true));return()=>video.current?.pause();},[]);
 return <div className="opening-film" role="region" aria-label="Invitation opening film"><video ref={video} src={src} poster={poster} autoPlay muted playsInline preload="auto" onEnded={onFinish} onError={()=>setFailed(true)}/><button className="film-skip" onClick={onFinish}>{failed?'Continue to invitation':'Skip film'}</button>{failed&&<p className="film-fallback" role="status">The opening film could not play on this device. Your invitation is ready below.</p>}</div>;
}
