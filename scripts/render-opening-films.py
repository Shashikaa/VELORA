"""Optional asset authoring: Pillow + FFmpeg. No service or API required at runtime."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageOps,ImageChops,ImageFilter
import math,subprocess,random,sys
ROOT=Path(__file__).resolve().parents[1]; W,H,FPS,SECONDS=480,852,24,7
OUT=ROOT/'public/videos';OUT.mkdir(exist_ok=True)
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf',22)
small=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf',14)
def load(name):return ImageOps.fit(Image.open(ROOT/'public/images'/name).convert('RGB'),(W,H))
def ease(x):x=max(0,min(1,x));return x*x*(3-2*x)
def text(draw,y,words,fill,font=font):
 for line in words.split('\n'):
  box=draw.textbbox((0,0),line,font=font);draw.text(((W-(box[2]-box[0]))/2,y),line,font=font,fill=fill);y+=39
random.seed(4);specks=[(random.randrange(W),random.randrange(H),random.random()*6.28) for _ in range(45)]
for kind in (sys.argv[1:] or ['royal','pearl','lotus']):
 cover=load('reference-royal-cover.webp' if kind=='royal' else 'couture-pearl-cover.webp') if kind!='lotus' else Image.new('RGB',(W,H),'#f7f0dd')
 paper=load('reference-royal-paper.webp' if kind=='royal' else 'couture-pearl-paper.webp') if kind!='lotus' else cover.copy()
 couple=Image.open(ROOT/'public/images/mandalaa-couple-art.webp').convert('RGB')
 process=subprocess.Popen(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','pipe:0','-an','-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart','-threads','2',str(OUT/f'{kind}-opening.mp4')],stdin=subprocess.PIPE)
 for frame in range(FPS*SECONDS):
  t=frame/FPS; image=Image.new('RGB',(W,H),'#f4ecd8')
  if kind!='lotus':
   zoom=1+.025*math.sin(min(t,2)/2*math.pi/2);size=(int(W*zoom),int(H*zoom));bg=cover.resize(size,Image.Resampling.LANCZOS);bg=ImageOps.fit(bg,(W,H));image=bg.copy()
   if t<2.5:
    glow=Image.new('RGBA',(W,H));gd=ImageDraw.Draw(glow);alpha=int((.5+.5*math.sin(t*4))*60);cy=int(H*(.625 if kind=='royal' else .55));gd.ellipse((W/2-60,cy-60,W/2+60,cy+60),fill=(255,225,145,alpha));glow=glow.filter(ImageFilter.GaussianBlur(20));image=Image.alpha_composite(image.convert('RGBA'),glow).convert('RGB')
   if kind=='pearl' and .4<t<2.2:
    mask=Image.new('L',(W,H));md=ImageDraw.Draw(mask);cy=int(H*.58);radius=53;md.ellipse((W//2-radius,cy-radius,W//2+radius,cy+radius),fill=int(220*ease((t-.4)/1.1)));mask=mask.filter(ImageFilter.GaussianBlur(5));gold=ImageOps.colorize(ImageOps.grayscale(image),'#72531c','#fff0b5');image=Image.composite(gold,image,mask)
   if t>1.7:
    phase=ease((t-1.7)/2);image=paper.copy();shift=int(phase*W*.8);left=bg.crop((0,0,W//2,H));right=bg.crop((W//2,0,W,H));image.paste(left,(-shift,0));image.paste(right,(W//2+shift,0))
   if t>2.5:
    rise=ease((t-2.5)/2);card=ImageOps.fit(paper,(W-58,H-105));draw=ImageDraw.Draw(card);draw.rectangle((14,14,card.width-15,card.height-15),outline='#b69c63',width=1)
    # Text is deliberately generic so personalised names are never baked into the film.
    lines=['A new chapter begins','With love,','you are invited','to celebrate with us']
    for i,line in enumerate(lines):
     b=draw.textbbox((0,0),line,font=font);draw.text(((card.width-b[2])/2,230+i*48),line,font=font,fill='#9c854f' if kind=='pearl' else '#355b74')
    image.paste(card,(29,int(H-(H-52)*rise)))
  else:
   image=paper.copy();draw=ImageDraw.Draw(image)
   cx,cy=W//2,-35;rotation=t*.045
   for radius in [70,83,105,125,150,162,185]:draw.ellipse((cx-radius,cy-radius,cx+radius,cy+radius),outline='#c5a452',width=1)
   for n in range(32):
    a=n*math.tau/32+rotation;pts=[]
    for rr,da in [(82,0),(120,-.075),(172,0),(120,.075),(82,0)]:pts.append((cx+math.sin(a+da)*rr,cy+math.cos(a+da)*rr))
    draw.line(pts,fill='#bd9f52',width=1)
   scale=.78+.1*ease(t/5);cw=int(W*scale);ch=int(couple.height*cw/couple.width);art=couple.resize((cw,ch),Image.Resampling.LANCZOS);ivory=Image.new('RGB',art.size,'#fbf5e6');art=ImageChops.multiply(art,ivory);image.paste(art,((W-cw)//2,int(H*.37+35*(1-ease(t/4)))))
   draw=ImageDraw.Draw(image);text(draw,220,'A beautiful beginning', '#b99a52');text(draw,H-150,'With the blessings\nof our families','#9f8853',small)
  draw=ImageDraw.Draw(image)
  for x,y,phase in specks:
   yy=int((y+t*(12 if kind=='lotus' else 7))%H);xx=int(x+7*math.sin(t+phase));alpha=.5+.5*math.sin(t*2+phase)
   if alpha>.35:draw.ellipse((xx,yy,xx+2,yy+2),fill=(255,242,190) if kind=='royal' else (212,181,101))
  process.stdin.write(image.tobytes())
 process.stdin.close()
 if process.wait()!=0:raise RuntimeError('FFmpeg failed')
 print(kind,'film ready',flush=True)
