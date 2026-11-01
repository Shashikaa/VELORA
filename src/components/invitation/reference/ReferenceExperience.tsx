"use client";
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { InvitationDetails, WeddingTemplate } from "@/data/templates";
import { displayDate } from "@/data/templates";
import { Countdown, useMusic, words } from "../InvitationShared";
import { SignatureReply } from "../signature/SignatureSections";
import OpeningFilm from "../couture/OpeningFilm";
import { saveCalendar } from "@/lib/invitation";

const asset=(kind:string,part:string)=>`/images/reference-${kind}-${part}.webp`;
function Panel({children,id,className=""}:{children:ReactNode;id?:string;className?:string}) {
 const reduce=useReducedMotion();
 return <motion.section id={id} className={`reference-panel ${className}`} initial={reduce?false:{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:.8}}>{children}</motion.section>;
}
export function ReferenceCard({template:t,bride,groom,hero=false}:{template:WeddingTemplate;bride?:string;groom?:string;hero?:boolean}) {
 const royal=t.referenceExperience==='royal';
 return <div className={`art-card reference-thumb ${royal?'ref-royal':'ref-garden'} ${hero?'art-hero':''}`} data-reference-thumbnail={t.referenceExperience}>
  <img src={asset(royal?'royal':'garden','cover')} alt=""/>
  {royal?<div className="reference-tap">TAP TO<br/>OPEN THE INVITATION</div>:<div className="reference-thumb-names"><span>WE’RE GETTING MARRIED</span><strong>{bride||t.couple[0]}<i>&</i>{groom||t.couple[1]}</strong><small>JOIN OUR CELEBRATION</small><b>VIEW INVITATION</b></div>}
 </div>;
}
export default function ReferenceExperience({template:t,details:d,startOpen=false}:{template:WeddingTemplate;details:InvitationDetails;startOpen?:boolean}) {
 const royal=t.referenceExperience==='royal', kind=royal?'royal':'garden';
 const [stage,setStage]=useState(startOpen?'open':'closed'),[photo,setPhoto]=useState<number|null>(null),[seat,setSeat]=useState(''),[seatResult,setSeatResult]=useState(''),[wishSent,setWishSent]=useState(false),[wishes,setWishes]=useState<{name:string;note:string}[]>([]);
 const {playing,toggle}=useMusic(d.musicUrl,d.soundtrack), reduce=useReducedMotion();
 const openingTimer=useRef<ReturnType<typeof setTimeout>|null>(null), lightbox=useRef<HTMLDivElement>(null);
 const photos=[d.photo||asset('garden','cover'),'/images/mandalaa-gallery-bridge.webp','/images/kandyan-ride-1.webp','/images/destination-galle.webp','/images/mandalaa-couple-art.webp','/images/heritage-tuskers.webp'];
 useEffect(()=>()=>{if(openingTimer.current)clearTimeout(openingTimer.current);},[]);
 useEffect(()=>{try{setWishes(JSON.parse(localStorage.getItem(`velora-wishes-${t.id}`)||'[]'));}catch{}},[t.id]);
 useEffect(()=>{if(photo===null)return;const last=document.activeElement as HTMLElement|null;lightbox.current?.focus();return()=>last?.focus();},[photo]);
 const open=()=>{if(t.openingVideo&&!reduce){setStage('film');return;}if(reduce){setStage('open');return;}setStage('opening');openingTimer.current=setTimeout(()=>setStage('open'),royal?3800:1100);};
 const finish=()=>{if(openingTimer.current)clearTimeout(openingTimer.current);setStage('open');};
 const names=<>{d.bride}<i>&</i>{d.groom}</>;
 const googleDate=new Date(d.date+'T'+d.time+':00+05:30');
 const stamp=(date:Date)=>date.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
 const gcal=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(d.bride+' & '+d.groom)}&dates=${stamp(googleDate)}/${stamp(new Date(googleDate.getTime()+14400000))}&location=${encodeURIComponent(d.venue)}`;
 const times=[-30,0,30,120,210,225,360].map(offset=>{const minutes=Number(d.time.slice(0,2))*60+Number(d.time.slice(3))+offset;return `${String(Math.floor((minutes+1440)%1440/60)).padStart(2,'0')}:${String((minutes+1440)%60).padStart(2,'0')}`;});
 return <div className={`reference-experience ref-${kind} stage-${stage}`} style={{'--reference-cover':`url(${asset(kind,'cover')})`,'--reference-paper':`url(${asset(kind,'paper')})`} as CSSProperties} data-reference-experience={kind} lang={d.language}>
 {stage!=='open'?<div className="reference-opening">
   {stage==='film'&&<OpeningFilm src={t.openingVideo!} poster={asset(kind,'cover')} onFinish={finish}/>}
   <img className="reference-cover-image" src={asset(kind,'cover')} alt={royal?'Ivory and blue embossed envelope with a heart seal':'A Kandyan bride and groom beneath jasmine garlands'}/>
   <div className="reference-sparkles" aria-hidden="true">{Array.from({length:24},(_,i)=><i key={i} style={{left:`${(i*37)%100}%`,top:`${(i*23)%100}%`,animationDelay:`${i*.17}s`}}/>)}</div>
   {royal?<button className="royal-open-button" onClick={open} disabled={stage!=='closed'} aria-label={words[d.language].open}><span className="royal-heart">♡</span><b>TAP TO<br/>OPEN THE INVITATION</b></button>:<div className="garden-cover-type"><p>WE’RE GETTING MARRIED</p><h1>{names}</h1><p>JOIN US TO CELEBRATE<br/>OUR SPECIAL DAY</p><button onClick={open} disabled={stage!=='closed'} aria-label={words[d.language].open}>VIEW INVITATION</button></div>}
   {stage==='opening'&&royal&&<div className="reference-letter"><span>YOU ARE CORDIALLY INVITED</span><h2>{d.bride} & {d.groom}</h2><p>{d.message}</p><small>{displayDate(d.date)}</small></div>}
   {stage==='opening'&&<button className="reference-skip" onClick={finish}>Skip opening</button>}
 </div>:<div className="reference-document">
  <button className="reference-music" onClick={()=>void toggle()} aria-label={playing?'Pause invitation music':'Play invitation music'}>{playing?'♫':'♪'}</button>
  <div className="reference-petals" aria-hidden="true">{Array.from({length:16},(_,i)=><i key={i} style={{left:`${i*7}%`,animationDelay:`${-i*1.3}s`,animationDuration:`${9+i%5}s`}}>{royal?'♥':'•'}</i>)}</div>
  <Panel className="reference-hero" id="reference-home">
   {royal&&<img className="reference-arch-photo" src={d.photo||asset('garden','cover')} alt="Wedding portrait illustration"/>}
   <p className="reference-eyebrow">WE’RE GETTING MARRIED</p><h1>{names}</h1><div className="reference-divider">♥</div><p className="reference-date">{displayDate(d.date)}</p><p className="reference-place">⌖ {d.venue}</p><p className="reference-hero-quote">A new chapter, written together.</p><a href="#reference-family" className="reference-down" aria-label="Scroll to our families">⌄</a>
  </Panel>
  <Panel id="reference-family" className="reference-family"><h2>Together with our families</h2><p>Dear {d.guest},</p><p>{d.message}</p><div className="reference-portrait-pair"><img src={d.photo||asset('garden','cover')} alt="First partner portrait illustration"/><img src={d.photo||asset('garden','cover')} alt="Second partner portrait illustration"/></div><p className="reference-muted">With the love and blessings of</p><p>{d.familyFirst||'our families'}</p><h3>{d.bride}</h3><div className="reference-amp">&</div><p>{d.familySecond||'our loved ones'}</p><h3>{d.groom}</h3><p>It would mean the world to celebrate with you.</p></Panel>
  <Panel className="reference-when"><h2>When & where</h2><div className="reference-when-card"><b>{new Date(d.date+'T12:00:00').getDate()}</b><p>{new Intl.DateTimeFormat('en-GB',{month:'long',year:'numeric'}).format(new Date(d.date+'T12:00:00'))}</p><dl><dt>Date</dt><dd>{displayDate(d.date)}</dd><dt>Time</dt><dd>{d.time} · Sri Lanka</dd><dt>Venue</dt><dd>{d.venue}</dd></dl></div></Panel>
  <Panel className="reference-countdown"><h2>Counting down to the day</h2><Countdown date={d.date} time={d.time}/></Panel>
  <Panel className="reference-calendar"><h2>Save the date</h2><span>{new Intl.DateTimeFormat('en-GB',{weekday:'long'}).format(new Date(d.date+'T12:00:00'))}</span><b>{new Date(d.date+'T12:00:00').getDate()}</b><p>{displayDate(d.date).replace(/^\d+ /,'')}</p><div><a href={gcal} target="_blank" rel="noopener noreferrer">Google Calendar ↗</a><button onClick={()=>saveCalendar(d)}>Apple / Outlook</button></div></Panel>
  <Panel className="reference-story"><h2>Our story</h2><p>{d.story}</p><ol>{['The first hello','A little adventure','The beautiful yes','Growing together','Our forever begins'].map((title,i)=><li key={title}><img src={photos[i%photos.length]} alt={`Illustration for ${title}`}/><div><span>0{i+1}</span><h3>{title}</h3><p>{['Every story starts with a moment.','Making memories, side by side.','The start of our next chapter.','Choosing each other, every day.','And you are part of this story.'][i]}</p></div></li>)}</ol></Panel>
  <Panel className="reference-agenda"><h2>Agenda</h2><ol>{['Guest arrival & welcome',t.ceremony,'Group photographs','Wedding reception','First dance','Music & celebration','The send-off'].map((name,i)=><li key={i}><time>{times[i]}</time><span>◇</span><p>{name}</p></li>)}</ol></Panel>
  <Panel className="reference-gallery"><h2>Our moments</h2><div>{photos.map((src,i)=><button key={i} onClick={()=>setPhoto(i)} aria-label={`Open celebration photo ${i+1}`}><img src={src} alt={`Celebration artwork ${i+1}`}/></button>)}</div><p className="reference-note">Sample artwork · add your portrait in the studio.</p></Panel>
  <Panel className="reference-attire"><h2>Attire</h2><p>Celebrate in elegant formal or traditional attire.</p><p className="reference-muted">Colour inspiration</p><div>{(royal?['#183c58','#fffaf0','#b99a62','#c1c9cf']:['#858b47','#ede3c9','#b59a58','#dcb2a4']).map(color=><span key={color} style={{background:color}}/>)}</div></Panel>
  <Panel className="reference-location"><h2>Location</h2><div className="reference-map-art"><span>⌖</span><b>{d.venue}</b></div><a className="reference-button" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.venue)}`} target="_blank" rel="noopener noreferrer">Get directions ↗</a></Panel>
  <Panel className="reference-seating"><span className="reference-eyebrow">ADMIT ONE</span><h2>Find your seat</h2><form onSubmit={e=>{e.preventDefault();const entry=(t.demoSeats||[]).find(x=>x.name.toLowerCase()===seat.trim().toLowerCase());setSeatResult(entry?`Welcome, ${entry.name}. Your table is ${entry.table}.`:'No demo seating match. Please check with your host.');}}><label>Your full name<input value={seat} onChange={e=>setSeat(e.target.value)} required placeholder="Try Demo Guest" maxLength={100}/></label><button type="submit">Search</button></form><p role="status">{seatResult||'Your table number will appear here.'}</p><p className="reference-note">Demo seating list · editable in the template configuration.</p></Panel>
  <div className="reference-reply"><SignatureReply template={t} details={d}/></div>
  <Panel className="reference-contact"><h2>Get in touch</h2>{[[d.bride,d.contactFirst],[d.groom,d.contactSecond]].map(([name,number],i)=><div key={i}><h3>{name}</h3>{number&&/^\+?[0-9 ()-]{6,25}$/.test(number)?<a href={`tel:${number.replace(/[^+0-9]/g,'')}`}>{number} · Call</a>:<p className="reference-note">Add a contact in the studio.</p>}</div>)}</Panel>
  <Panel className="reference-wishes"><p className="reference-eyebrow">WITH LOVE</p><h2>Leave a wish</h2><form onSubmit={e=>{e.preventDefault();const data=new FormData(e.currentTarget),entry={name:String(data.get('name')).trim(),note:String(data.get('note')).trim()};if(!entry.name||!entry.note)return;const next=[entry,...wishes].slice(0,30);setWishes(next);try{localStorage.setItem(`velora-wishes-${t.id}`,JSON.stringify(next));}catch{}setWishSent(true);e.currentTarget.reset();}}><label>Your name<input name="name" required maxLength={100}/></label><label>Your wish<textarea name="note" required rows={3} maxLength={500}/></label><button type="submit">Send wishes</button></form>{wishSent&&<p role="status">Your wish was saved in this browser.</p>}<p className="reference-note">Local demonstration · wishes are not sent to the couple.</p>{wishes.slice(0,4).map((wish,i)=><blockquote key={i}><p>{wish.note}</p><cite>{wish.name}</cite></blockquote>)}</Panel>
  <footer className="reference-footer"><span>YOURS TRULY</span><h2>{d.bride} & {d.groom}</h2><p>{displayDate(d.date)}</p><small>VELORA · BEAUTIFULLY PERSONAL</small></footer>
 </div>}
 {photo!==null&&<div className="reference-lightbox" role="dialog" aria-modal="true" aria-label="Celebration photo" tabIndex={-1} ref={lightbox} onClick={()=>setPhoto(null)} onKeyDown={e=>{if(e.key==='Escape'){e.stopPropagation();setPhoto(null);}if(e.key==='Tab'){e.preventDefault();lightbox.current?.querySelector<HTMLButtonElement>('button')?.focus();}}}><button onClick={()=>setPhoto(null)}>Close photo ×</button><img src={photos[photo]} alt={`Celebration artwork ${photo+1}`}/></div>}
 </div>;
}
