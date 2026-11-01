"use client";
import { Children, type ReactNode, useState } from "react";
import type { WeddingTemplate, InvitationDetails } from "@/data/templates";
import { displayDate } from "@/data/templates";
import { MotifArt } from "../Motifs";
import { themeStyle } from "../theme";
import { Countdown, useMusic, words } from "../InvitationShared";
import { saveCalendar } from "@/lib/invitation";
import { SignatureReply } from "../signature/SignatureSections";

function DocumentFlow({layout,children}:{layout:string;children:ReactNode}) {
 const nodes=Children.toArray(children);
 const order:Record<string,number[]>={portrait:[0,1,2,4,6,3,5,7,8,9],editorial:[0,1,3,4,2,5,6,7,8,9],postcard:[0,1,4,2,7,3,5,6,8,9],album:[0,1,4,6,2,3,5,7,8,9],disco:[0,1,3,5,2,6,4,7,8,9],confetti:[0,1,2,5,3,6,4,7,8,9],heirloom:[0,1,2,3,5,7,4,6,8,9]};
 return <div className="celebration-document">{(order[layout]||nodes.map((_,i)=>i)).map(i=>nodes[i])}</div>;
}
export function CelebrationArtwork({template:t}:{template:WeddingTemplate}) {
 const kind=t.celebrationLayout;
 return <div className={`celebration-art bespoke-${kind}`} aria-hidden="true">
  {t.coverImage && <img className="bespoke-background" src={t.coverImage} alt=""/>}
  {kind==='arch' && <><div className="chapel-door left"/><div className="chapel-door right"/><svg className="chapel-window" viewBox="0 0 200 300"><path d="M10 290V110Q100-90 190 110V290ZM100 15V290M10 160H190M40 75L160 250M160 75L40 250" fill="none" stroke="currentColor" strokeWidth="2"/></svg></>}
  {kind==='ribbon' && !t.coverImage && <div className="silk-ribbon"><i/><b/><i/></div>}
  {kind==='heirloom' && <><span className="heirloom-sun">☀</span><img className="heirloom-landscape" src="/images/heritage-tuskers.webp" alt=""/><span className="heirloom-inscription">ශ්‍රී සුභ මංගලම්</span></>}
  {kind==='mandala' && <MotifArt motif="lotus" className="bespoke-lotus"/>}
  {kind==='botanical' && <><MotifArt motif="floral" className="bespoke-leaf leaf-left"/><MotifArt motif="palm" className="bespoke-leaf leaf-right"/></>}
  {kind==='temple' && <><div className="temple-canopy">{Array.from({length:12},(_,i)=><i key={i}/>)}</div><div className="temple-column left"/><div className="temple-column right"/><MotifArt motif="lotus" className="temple-lotus"/></>}
  {kind==='lantern' && <><div className="nikah-arch"/><div className="nikah-lantern l1">✧</div><div className="nikah-lantern l2">✧</div><span className="nikah-crescent">☾</span></>}
  {kind==='editorial' && <><span className="editorial-word">LOVE.</span><span className="editorial-number">VOL. 01 / THE WEDDING ISSUE</span><div className="editorial-rule"/></>}
  {kind==='disco' && <><div className="disco-ball"/><div className="party-stripe"/><span className="party-word">after<br/>the vows.</span></>}
  {kind==='postcard' && <><span className="postcard-stamp">CEYLON<br/>WITH LOVE</span><span className="postcard-caption">A JOURNEY TO OUR FOREVER</span></>}
  {kind==='album' && <><img className="album-photo one" src="/images/mandalaa-gallery-bridge.webp" alt=""/><img className="album-photo two" src="/images/mandalaa-couple-art.webp" alt=""/><span className="album-years">our next chapter</span></>}
  {kind==='confetti' && <><span className="birthday-number">21</span><div className="birthday-confetti">{Array.from({length:22},(_,i)=><i key={i} style={{left:`${(i*37)%100}%`,top:`${(i*23)%95}%`,transform:`rotate(${i*41}deg)`}}/>)}</div></>}
  {kind==='velvet' && <><div className="velvet-curtain left"/><div className="velvet-curtain right"/><span className="velvet-tassel">✦</span></>}
  {kind==='mehendi' && <><div className="henna-flowers">✿ ✿ ✿ ✿ ✿</div><svg className="henna-hands" viewBox="0 0 200 240" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 230L40 150 25 90Q22 80 30 80L55 130 42 40Q42 30 50 35L72 115 70 20Q72 8 79 20L91 112 100 35Q103 25 110 33L108 130 135 75Q145 65 145 80L126 160 125 230Z"/><circle cx="83" cy="158" r="24"/><circle cx="83" cy="158" r="14"/><path d="M83 130V186M55 158H110M40 210Q80 185 126 210M43 199Q80 175 128 199"/></svg></>}
 </div>;
}
export function CelebrationCard({template:t,bride,groom,hero=false}:{template:WeddingTemplate;bride?:string;groom?:string;hero?:boolean}) {
 return <div style={themeStyle(t)} className={`art-card celebration-card celebration-${t.celebrationLayout} edition-${(t.edition||0)%4} ${hero?'art-hero':''}`} data-celebration-layout={t.celebrationLayout}>
   <img className="celebration-photo" src={t.image} alt=""/><CelebrationArtwork template={t}/>
   <div className="celebration-card-type"><span>{t.occasion === 'Wedding' ? 'TOGETHER IS A BEAUTIFUL PLACE' : t.occasion?.toUpperCase()}</span><strong>{bride || t.couple[0]}{t.occasion !== "Birthday" && <><i>&</i>{groom || t.couple[1]}</>}</strong><small>YOU ARE LOVINGLY INVITED</small></div>
 </div>;
}
export default function CelebrationExperience({template:t,details:d,startOpen=false}:{template:WeddingTemplate;details:InvitationDetails;startOpen?:boolean}) {
 const [opened,setOpened]=useState(startOpen),[opening,setOpening]=useState(false),[active,setActive]=useState(0);
 const {playing,toggle}=useMusic(d.musicUrl,d.soundtrack);
 const w=words[d.language];
 const label=t.occasion || 'Wedding';
 const photos=label === 'Birthday' ? [d.photo || t.image] : [d.photo || t.image,'/images/kandyan-ride-1.webp','/images/destination-galle.webp'];
 const occasionIntro=d.language==='si' ? 'සෙනෙහසින් ඇරයුම් කරමු' : d.language==='ta' ? 'அன்புடன் அழைக்கிறோம்' : label === 'Wedding' ? 'THE CELEBRATION OF LOVE' : `LET’S CELEBRATE · ${label.toUpperCase()}`;
 const open=()=>{setOpening(true);setTimeout(()=>setOpened(true),matchMedia('(prefers-reduced-motion: reduce)').matches?0:850);};
 return <div className={`celebration-experience celebration-${t.celebrationLayout} edition-${(t.edition||0)%4} ${opened?'celebration-open':'celebration-closed'} ${opening?'is-revealing':''}`} style={themeStyle(t)} data-celebration-layout={t.celebrationLayout}>
  {!opened ? <div className={`celebration-cover reveal-${t.opening}`}>
    <img className="celebration-photo" src={d.photo||t.image} alt=""/><CelebrationArtwork template={t}/><div className="opening-panels"><i/><i/></div>
    <div className="celebration-cover-type"><p>{occasionIntro}</p><h1>{d.bride}{d.groom && <><i>&</i>{d.groom}</>}</h1><p>{displayDate(d.date)}</p><button onClick={open} disabled={opening}>{opening?'Opening…':w.open}</button></div>
  </div> : <DocumentFlow layout={t.celebrationLayout!}>
   <button className="celebration-audio" onClick={()=>void toggle()} aria-label={playing?'Pause invitation music':'Play invitation music'}>{playing?'♫ Pause':'♫ Music'}</button>
   <header className="celebration-hero"><img className="celebration-photo" src={d.photo||t.image} alt=""/><CelebrationArtwork template={t}/><div><p>{occasionIntro}</p><h1>{d.bride}{d.groom && <><i>&</i>{d.groom}</>}</h1><p>{displayDate(d.date)} · {d.time}</p><span>{d.venue}</span><a href="#celebration-welcome">Discover our celebration ↓</a></div></header>
   <section id="celebration-welcome" className="celebration-welcome"><span className="celebration-kicker">{w.together}</span><h2>{d.language==='si'?'ආදරණීය ඔබට':'Dear '+d.guest+','}</h2><p>{d.message}</p><div className="celebration-monogram">{d.bride[0]}<i>&</i>{d.groom[0]}</div></section>
   <section className="celebration-when"><span className="celebration-kicker">{label === 'Wedding' ? t.ceremony : label}</span><h2>{w.day}</h2><div className="celebration-date"><b>{new Date(d.date+'T12:00:00').getDate()}</b><span>{displayDate(d.date)}<br/>{d.time} · Sri Lanka time<br/>{d.venue}</span></div><Countdown date={d.date} time={d.time}/><button className="celebration-button" onClick={()=>saveCalendar(d,label)}>Save the date ↗</button></section>
   <section className="celebration-story"><div><span className="celebration-kicker">{label === 'Anniversary' ? 'STILL CHOOSING YOU' : 'OUR LITTLE STORY'}</span><h2>{label === 'Birthday' ? 'Another beautiful chapter.' : w.story}</h2><p>{d.story}</p></div><img src={d.photo||t.image} alt="Celebration artwork"/></section>
   <section className="celebration-agenda"><span className="celebration-kicker">A DAY TO KEEP CLOSE</span><h2>{label === 'Wedding'?'The day’s flow.':'The celebration.'}</h2>{[[d.time,t.ceremony],["Afterwards",label==='Anniversary'?'Memories, dinner & a toast':label==='Birthday'?'Cake, wishes & a little dancing':'Celebrate, dine & make memories']].map(([time,title],i)=><div key={i}><span>0{i+1}</span><p><b>{title}</b><small>{time} · {d.venue}</small></p></div>)}</section>
   <section className="celebration-gallery"><span className="celebration-kicker">A LITTLE GLIMPSE</span><h2>{w.gallery}</h2><img src={photos[active]} alt={`Celebration artwork ${active+1}`}/><div>{photos.map((_,i)=><button key={i} onClick={()=>setActive(i)} aria-label={`Show gallery image ${i+1}`} aria-pressed={active===i}>{String(i+1).padStart(2,'0')}</button>)}</div></section>
   <section className="celebration-venue"><span className="celebration-kicker">{w.venue}</span><h2>{d.venue}</h2><p>{displayDate(d.date)} · {d.time}</p><a className="celebration-button" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.venue)}`} target="_blank" rel="noopener noreferrer">Find your way here ↗</a></section>
   <SignatureReply template={t} details={d}/>
   <footer className="celebration-footer"><h2>{d.bride}{d.groom ? " & " + d.groom : ""}</h2><p>{w.blessing}</p><span>VELORA · BEAUTIFULLY PERSONAL</span></footer>
  </DocumentFlow>}
 </div>;
}
