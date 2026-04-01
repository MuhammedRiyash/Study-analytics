import { useState, useEffect, useMemo } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area } from "recharts";

const TASKS = [
  {d:1,phase:"SEO Fundamentals",task:"Understand how search engines crawl, index & rank pages",cat:"SEO",lvl:"Beginner"},
  {d:2,phase:"SEO Fundamentals",task:"Learn keyword research basics — search intent & volume",cat:"SEO",lvl:"Beginner"},
  {d:3,phase:"SEO Fundamentals",task:"Hands-on: Use Google Keyword Planner & Ubersuggest",cat:"SEO",lvl:"Beginner"},
  {d:4,phase:"SEO Fundamentals",task:"Study long-tail vs short-tail keywords strategy",cat:"SEO",lvl:"Beginner"},
  {d:5,phase:"SEO Fundamentals",task:"Learn about SERP features — snippets, PAA, local pack",cat:"SEO",lvl:"Beginner"},
  {d:6,phase:"SEO Fundamentals",task:"Competitor keyword analysis with SEMrush / Ahrefs",cat:"SEO",lvl:"Beginner"},
  {d:7,phase:"SEO Fundamentals",task:"Create a keyword map for a sample project",cat:"SEO",lvl:"Beginner"},
  {d:8,phase:"SEO Fundamentals",task:"Quiz & review: SEO fundamentals checkpoint",cat:"SEO",lvl:"Beginner"},
  {d:9,phase:"On-Page SEO",task:"Title tags, meta descriptions & header hierarchy",cat:"SEO",lvl:"Beginner"},
  {d:10,phase:"On-Page SEO",task:"URL structure & internal linking best practices",cat:"SEO",lvl:"Beginner"},
  {d:11,phase:"On-Page SEO",task:"Image optimization — alt text, compression, WebP",cat:"SEO",lvl:"Beginner"},
  {d:12,phase:"On-Page SEO",task:"Content optimization for target keywords",cat:"SEO",lvl:"Intermediate"},
  {d:13,phase:"On-Page SEO",task:"Schema markup & structured data basics",cat:"SEO",lvl:"Intermediate"},
  {d:14,phase:"On-Page SEO",task:"Hands-on: Audit a live website for on-page issues",cat:"SEO",lvl:"Intermediate"},
  {d:15,phase:"On-Page SEO",task:"E-E-A-T principles & content quality signals",cat:"SEO",lvl:"Intermediate"},
  {d:16,phase:"On-Page SEO",task:"Mini-project: Optimize 5 pages of a sample site",cat:"SEO",lvl:"Intermediate"},
  {d:17,phase:"Technical SEO",task:"Site speed & Core Web Vitals optimization",cat:"SEO",lvl:"Intermediate"},
  {d:18,phase:"Technical SEO",task:"Mobile-first indexing & responsive design",cat:"SEO",lvl:"Intermediate"},
  {d:19,phase:"Technical SEO",task:"XML sitemaps & robots.txt configuration",cat:"SEO",lvl:"Intermediate"},
  {d:20,phase:"Technical SEO",task:"Canonical tags, redirects & duplicate content",cat:"SEO",lvl:"Intermediate"},
  {d:21,phase:"Technical SEO",task:"Crawl budget optimization & log file analysis",cat:"SEO",lvl:"Advanced"},
  {d:22,phase:"Technical SEO",task:"HTTPS, security headers & site architecture",cat:"SEO",lvl:"Intermediate"},
  {d:23,phase:"Technical SEO",task:"Hands-on: Full technical audit with Screaming Frog",cat:"SEO",lvl:"Advanced"},
  {d:24,phase:"Technical SEO",task:"Checkpoint: Technical SEO audit report",cat:"SEO",lvl:"Advanced"},
  {d:25,phase:"Off-Page SEO",task:"Backlink fundamentals — DA, PA, link types",cat:"SEO",lvl:"Intermediate"},
  {d:26,phase:"Off-Page SEO",task:"Guest posting & outreach strategy",cat:"SEO",lvl:"Intermediate"},
  {d:27,phase:"Off-Page SEO",task:"Broken link building & resource page tactics",cat:"SEO",lvl:"Advanced"},
  {d:28,phase:"Off-Page SEO",task:"Local SEO — Google Business Profile optimization",cat:"SEO",lvl:"Intermediate"},
  {d:29,phase:"Off-Page SEO",task:"Online reputation & review management",cat:"SEO",lvl:"Intermediate"},
  {d:30,phase:"Off-Page SEO",task:"Mini-project: Build 10 quality backlinks plan",cat:"SEO",lvl:"Advanced"},
  {d:31,phase:"PPC & Google Ads",task:"PPC fundamentals — CPC, CPM, CPA, Quality Score",cat:"PPC",lvl:"Beginner"},
  {d:32,phase:"PPC & Google Ads",task:"Google Ads account structure — campaigns, ad groups",cat:"PPC",lvl:"Beginner"},
  {d:33,phase:"PPC & Google Ads",task:"Keyword match types & negative keywords",cat:"PPC",lvl:"Beginner"},
  {d:34,phase:"PPC & Google Ads",task:"Writing high-CTR ad copy & responsive search ads",cat:"PPC",lvl:"Beginner"},
  {d:35,phase:"PPC & Google Ads",task:"Ad extensions — sitelinks, callouts, structured snippets",cat:"PPC",lvl:"Intermediate"},
  {d:36,phase:"PPC & Google Ads",task:"Bidding strategies — manual, enhanced, target CPA/ROAS",cat:"PPC",lvl:"Intermediate"},
  {d:37,phase:"PPC & Google Ads",task:"Landing page optimization for PPC campaigns",cat:"PPC",lvl:"Intermediate"},
  {d:38,phase:"PPC & Google Ads",task:"Google Ads conversion tracking setup",cat:"PPC",lvl:"Intermediate"},
  {d:39,phase:"PPC & Google Ads",task:"Remarketing & RLSA campaigns",cat:"PPC",lvl:"Intermediate"},
  {d:40,phase:"PPC & Google Ads",task:"Shopping Ads & Google Merchant Center",cat:"PPC",lvl:"Intermediate"},
  {d:41,phase:"PPC & Google Ads",task:"Performance Max campaigns deep dive",cat:"PPC",lvl:"Advanced"},
  {d:42,phase:"PPC & Google Ads",task:"A/B testing ads & ad rotation strategies",cat:"PPC",lvl:"Intermediate"},
  {d:43,phase:"PPC & Google Ads",task:"Budget allocation & campaign optimization",cat:"PPC",lvl:"Advanced"},
  {d:44,phase:"PPC & Google Ads",task:"Google Ads scripts & automation basics",cat:"PPC",lvl:"Advanced"},
  {d:45,phase:"PPC & Google Ads",task:"Project: Launch a mock Google Ads campaign",cat:"PPC",lvl:"Advanced"},
  {d:46,phase:"Social Media Ads",task:"Facebook/Meta Ads Manager setup & structure",cat:"Ads",lvl:"Beginner"},
  {d:47,phase:"Social Media Ads",task:"Facebook audience targeting — custom, lookalike, saved",cat:"Ads",lvl:"Intermediate"},
  {d:48,phase:"Social Media Ads",task:"Instagram Ads — formats, reels, stories, carousels",cat:"Ads",lvl:"Intermediate"},
  {d:49,phase:"Social Media Ads",task:"Facebook Pixel & Conversions API setup",cat:"Ads",lvl:"Intermediate"},
  {d:50,phase:"Social Media Ads",task:"LinkedIn Ads — B2B targeting & lead gen forms",cat:"Ads",lvl:"Intermediate"},
  {d:51,phase:"Social Media Ads",task:"Twitter/X Ads & YouTube Ads overview",cat:"Ads",lvl:"Intermediate"},
  {d:52,phase:"Social Media Ads",task:"TikTok Ads — creative best practices",cat:"Ads",lvl:"Intermediate"},
  {d:53,phase:"Social Media Ads",task:"Social media ad copywriting & creative design",cat:"Ads",lvl:"Intermediate"},
  {d:54,phase:"Social Media Ads",task:"Retargeting across social platforms",cat:"Ads",lvl:"Advanced"},
  {d:55,phase:"Social Media Ads",task:"Project: Create a multi-platform ad campaign plan",cat:"Ads",lvl:"Advanced"},
  {d:56,phase:"Display & Video Ads",task:"Google Display Network — targeting & placements",cat:"Ads",lvl:"Intermediate"},
  {d:57,phase:"Display & Video Ads",task:"Banner ad design principles & responsive ads",cat:"Ads",lvl:"Intermediate"},
  {d:58,phase:"Display & Video Ads",task:"YouTube Ads — TrueView, bumper, discovery formats",cat:"Ads",lvl:"Intermediate"},
  {d:59,phase:"Display & Video Ads",task:"Video ad scripting & production basics",cat:"Ads",lvl:"Intermediate"},
  {d:60,phase:"Display & Video Ads",task:"Programmatic advertising & DSP overview",cat:"Ads",lvl:"Advanced"},
  {d:61,phase:"Display & Video Ads",task:"Connected TV & OTT advertising trends",cat:"Ads",lvl:"Advanced"},
  {d:62,phase:"Display & Video Ads",task:"Checkpoint: Paid media strategy document",cat:"Ads",lvl:"Advanced"},
  {d:63,phase:"Content Marketing",task:"Content strategy framework & content pillars",cat:"Content",lvl:"Beginner"},
  {d:64,phase:"Content Marketing",task:"Blog writing for SEO — structure, length, readability",cat:"Content",lvl:"Beginner"},
  {d:65,phase:"Content Marketing",task:"Content calendar creation & planning tools",cat:"Content",lvl:"Beginner"},
  {d:66,phase:"Content Marketing",task:"Visual content — infographics, carousels, thumbnails",cat:"Content",lvl:"Intermediate"},
  {d:67,phase:"Content Marketing",task:"Video content strategy — YouTube, shorts, reels",cat:"Content",lvl:"Intermediate"},
  {d:68,phase:"Content Marketing",task:"Podcast & audio content marketing",cat:"Content",lvl:"Intermediate"},
  {d:69,phase:"Content Marketing",task:"Content distribution & amplification channels",cat:"Content",lvl:"Intermediate"},
  {d:70,phase:"Content Marketing",task:"Content repurposing — one piece, 10 formats",cat:"Content",lvl:"Intermediate"},
  {d:71,phase:"Content Marketing",task:"AI tools for content creation & scaling",cat:"Content",lvl:"Advanced"},
  {d:72,phase:"Content Marketing",task:"Project: Build a 30-day content calendar",cat:"Content",lvl:"Advanced"},
  {d:73,phase:"Email Marketing",task:"Email marketing fundamentals & platform setup",cat:"Email",lvl:"Beginner"},
  {d:74,phase:"Email Marketing",task:"List building strategies & lead magnets",cat:"Email",lvl:"Beginner"},
  {d:75,phase:"Email Marketing",task:"Email copywriting — subject lines, body, CTAs",cat:"Email",lvl:"Intermediate"},
  {d:76,phase:"Email Marketing",task:"Email design — templates, responsive layouts",cat:"Email",lvl:"Intermediate"},
  {d:77,phase:"Email Marketing",task:"Automation workflows — welcome, nurture, win-back",cat:"Email",lvl:"Intermediate"},
  {d:78,phase:"Email Marketing",task:"Segmentation & personalization strategies",cat:"Email",lvl:"Intermediate"},
  {d:79,phase:"Email Marketing",task:"Deliverability, spam filters & compliance",cat:"Email",lvl:"Intermediate"},
  {d:80,phase:"Email Marketing",task:"Project: Design a 5-email nurture sequence",cat:"Email",lvl:"Advanced"},
  {d:81,phase:"Analytics & Data",task:"Google Analytics 4 — setup & navigation",cat:"Analytics",lvl:"Beginner"},
  {d:82,phase:"Analytics & Data",task:"GA4 events, conversions & custom dimensions",cat:"Analytics",lvl:"Intermediate"},
  {d:83,phase:"Analytics & Data",task:"Google Tag Manager — tags, triggers, variables",cat:"Analytics",lvl:"Intermediate"},
  {d:84,phase:"Analytics & Data",task:"UTM parameters & campaign tracking",cat:"Analytics",lvl:"Intermediate"},
  {d:85,phase:"Analytics & Data",task:"Google Search Console deep dive",cat:"Analytics",lvl:"Intermediate"},
  {d:86,phase:"Analytics & Data",task:"Looker Studio dashboard creation",cat:"Analytics",lvl:"Intermediate"},
  {d:87,phase:"Analytics & Data",task:"Attribution models — first-click, last-click, data-driven",cat:"Analytics",lvl:"Advanced"},
  {d:88,phase:"Analytics & Data",task:"Project: Build a marketing performance dashboard",cat:"Analytics",lvl:"Advanced"},
  {d:89,phase:"CRO",task:"CRO fundamentals — funnels, heuristics, user behavior",cat:"CRO",lvl:"Intermediate"},
  {d:90,phase:"CRO",task:"Heatmaps, session recordings & user testing tools",cat:"CRO",lvl:"Intermediate"},
  {d:91,phase:"CRO",task:"A/B testing methodology & tools (Optimizely, VWO)",cat:"CRO",lvl:"Intermediate"},
  {d:92,phase:"CRO",task:"Landing page optimization — above the fold, trust signals",cat:"CRO",lvl:"Advanced"},
  {d:93,phase:"CRO",task:"Project: CRO audit & test plan for a live site",cat:"CRO",lvl:"Advanced"},
  {d:94,phase:"Advanced Strategy",task:"Omnichannel marketing strategy & customer journey",cat:"Strategy",lvl:"Advanced"},
  {d:95,phase:"Advanced Strategy",task:"Marketing automation — HubSpot, Marketo overview",cat:"Strategy",lvl:"Advanced"},
  {d:96,phase:"Advanced Strategy",task:"Budget planning & ROI calculation across channels",cat:"Strategy",lvl:"Advanced"},
  {d:97,phase:"Advanced Strategy",task:"AI & emerging trends in digital marketing 2025+",cat:"Strategy",lvl:"Advanced"},
  {d:98,phase:"Capstone",task:"Full digital marketing strategy for a brand",cat:"Strategy",lvl:"Advanced"},
  {d:99,phase:"Capstone",task:"Presentation & portfolio preparation",cat:"Strategy",lvl:"Advanced"},
  {d:100,phase:"Capstone",task:"Final review, certification prep & next steps",cat:"Strategy",lvl:"Advanced"},
];

const PC = {"SEO Fundamentals":"#059669","On-Page SEO":"#10b981","Technical SEO":"#34d399","Off-Page SEO":"#6ee7b7","PPC & Google Ads":"#2563eb","Social Media Ads":"#3b82f6","Display & Video Ads":"#60a5fa","Content Marketing":"#ea580c","Email Marketing":"#f97316","Analytics & Data":"#7c3aed","CRO":"#a855f7","Advanced Strategy":"#dc2626","Capstone":"#f87171"};
const CC = {"SEO":"#059669","PPC":"#2563eb","Ads":"#60a5fa","Content":"#ea580c","Email":"#f97316","Analytics":"#7c3aed","CRO":"#a855f7","Strategy":"#dc2626"};
const LC = {"Beginner":"#10b981","Intermediate":"#f59e0b","Advanced":"#ef4444"};
const PO = [...new Set(TASKS.map(t=>t.phase))];
const MOTIVATIONS = ["Every expert was once a beginner. Keep going!","The best time to start was yesterday. The next best is now.","Marketing mastery is built one day at a time.","You're investing in skills that pay dividends forever.","Small daily progress adds up to massive results.","Consistency beats intensity. Show up every day.","You're building a superpower — one task at a time."];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes scaleIn{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}
  @keyframes slideRight{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
  @keyframes confetti{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(-80px) rotate(720deg);opacity:0}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
  @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
  @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(59,130,246,.3)}50%{box-shadow:0 0 40px rgba(59,130,246,.6)}}
  .fade-up{animation:fadeUp .6s ease both}.scale-in{animation:scaleIn .5s ease both}.float-anim{animation:float 3s ease-in-out infinite}
  .task-row{transition:all .2s ease}.task-row:hover{transform:translateX(4px);box-shadow:0 4px 20px rgba(0,0,0,.08)!important}.task-row:active{transform:scale(.985)}
  .tab-btn{transition:all .25s ease;position:relative;overflow:hidden}.tab-btn:hover{transform:translateY(-2px)}
  .tab-btn::after{content:'';position:absolute;bottom:0;left:50%;width:0;height:3px;background:#3b82f6;transition:all .3s;transform:translateX(-50%);border-radius:3px}.tab-btn.active::after{width:80%}
  .pill{transition:all .2s ease}.pill:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,0,0,.1)}
  .chart-card{transition:all .3s ease}.chart-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.08)!important}
  .stat-card{transition:all .3s ease}.stat-card:hover{transform:translateY(-3px) scale(1.02)}
  .welcome-bg{background:linear-gradient(135deg,#0a0f1e 0%,#0f172a 30%,#1a1f3a 60%,#0f172a 100%);animation:gradientShift 8s ease infinite;background-size:200% 200%}
  .shimmer-text{background:linear-gradient(90deg,#fff 0%,#60a5fa 25%,#a78bfa 50%,#60a5fa 75%,#fff 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 3s linear infinite}
  .input-glow:focus{box-shadow:0 0 0 3px rgba(59,130,246,.3),0 0 30px rgba(59,130,246,.15);border-color:#3b82f6!important}
  .start-btn{background:linear-gradient(135deg,#3b82f6,#8b5cf6);transition:all .3s ease}.start-btn:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 8px 30px rgba(59,130,246,.4)}.start-btn:active{transform:scale(.98)}
  .grid-card{transition:all .3s ease;cursor:pointer}.grid-card:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(0,0,0,.1)!important}
  .progress-ring{transition:stroke-dashoffset 1s ease}.streak-badge{animation:pulse 2s ease infinite}
  .phase-row{transition:all .25s ease}.phase-row:hover{background:rgba(59,130,246,.04)!important;transform:scale(1.005)}
  ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}
`;

export default function App() {
  const [user, setUser] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [completed, setCompleted] = useState({});
  const [tab, setTab] = useState("dashboard");
  const [filterPhase, setFilterPhase] = useState("All");
  const [viewMode, setViewMode] = useState("list");
  const [loaded, setLoaded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [justCompleted, setJustCompleted] = useState(null);
  const [welcomeFade, setWelcomeFade] = useState(false);
  const [chartFilter, setChartFilter] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        const r1 = await window.storage.get("dm-tracker-v2");
        if (r1 && r1.value) { const d = JSON.parse(r1.value); setCompleted(d.completed || {}); setUser(d.user || null); }
      } catch {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    (async () => { try { await window.storage.set("dm-tracker-v2", JSON.stringify({ completed, user })); } catch {} })();
  }, [completed, user, loaded]);

  const toggle = (day) => {
    const wasDone = !!completed[day];
    setCompleted(prev => { const next = { ...prev }; if (next[day]) delete next[day]; else next[day] = Date.now(); return next; });
    if (!wasDone) { setJustCompleted(day); setShowConfetti(true); setTimeout(() => { setShowConfetti(false); setJustCompleted(null); }, 1200); }
  };

  const totalDone = Object.keys(completed).length;
  const pct = Math.round((totalDone / 100) * 100);
  const catData = useMemo(() => { const c = {}; TASKS.forEach(t => { if(!c[t.cat]) c[t.cat]={name:t.cat,total:0,done:0}; c[t.cat].total++; if(completed[t.d]) c[t.cat].done++; }); return Object.values(c); }, [completed]);
  const phaseData = useMemo(() => { const p = {}; TASKS.forEach(t => { if(!p[t.phase]) p[t.phase]={name:t.phase,total:0,done:0}; p[t.phase].total++; if(completed[t.d]) p[t.phase].done++; }); return PO.map(ph => p[ph]); }, [completed]);
  const lvlData = useMemo(() => { const l = {}; TASKS.forEach(t => { if(!l[t.lvl]) l[t.lvl]={name:t.lvl,total:0,done:0}; l[t.lvl].total++; if(completed[t.d]) l[t.lvl].done++; }); return ["Beginner","Intermediate","Advanced"].map(lv => l[lv]); }, [completed]);
  const cumulativeData = useMemo(() => { let cum = 0; return Array.from({length:100},(_,i) => { if(completed[i+1]) cum++; return {day:i+1,done:cum,target:i+1}; }); }, [completed]);
  const radarData = useMemo(() => catData.map(c => ({ subject: c.name, pct: c.total ? Math.round(c.done/c.total*100) : 0, full: 100 })), [catData]);
  const streak = useMemo(() => { let s = 0; for (let i = 100; i >= 1; i--) { if (completed[i]) s++; else if (s > 0) break; } return s; }, [completed]);
  const currentPhase = useMemo(() => { for (let i = 0; i < TASKS.length; i++) { if (!completed[TASKS[i].d]) return TASKS[i].phase; } return "Complete!"; }, [completed]);
  const nextTask = useMemo(() => TASKS.find(t => !completed[t.d]), [completed]);
  const motivation = useMemo(() => MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)], [tab]);
  const filteredTasks = filterPhase === "All" ? TASKS : TASKS.filter(t => t.phase === filterPhase);

  const handleRegister = () => { if (!nameInput.trim()) return; setWelcomeFade(true); setTimeout(() => setUser(nameInput.trim()), 800); };
  const getGreeting = () => { const h = new Date().getHours(); if (h < 12) return "Good Morning"; if (h < 17) return "Good Afternoon"; return "Good Evening"; };

  if (!loaded) return (<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",background:"#0a0f1e",fontFamily:"Outfit"}}><style>{css}</style><div className="float-anim" style={{textAlign:"center"}}><div style={{width:60,height:60,border:"4px solid rgba(59,130,246,.2)",borderTopColor:"#3b82f6",borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 20px"}}/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style><p style={{color:"#64748b",fontSize:14}}>Loading your journey...</p></div></div>);

  if (!user) return (
    <div className="welcome-bg" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Outfit",padding:20,opacity:welcomeFade?.3:1,transition:"opacity .8s ease"}}>
      <style>{css}</style>
      <div style={{position:"fixed",inset:0,overflow:"hidden",pointerEvents:"none"}}>{Array.from({length:20}).map((_,i) => (<div key={i} style={{position:"absolute",width:Math.random()*4+2,height:Math.random()*4+2,borderRadius:"50%",background:`rgba(${Math.random()>0.5?'96,165,250':'167,139,250'},${Math.random()*.3+.1})`,left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,animation:`float ${Math.random()*4+3}s ease-in-out infinite`,animationDelay:`${Math.random()*3}s`}}/>))}</div>
      <div className="scale-in" style={{maxWidth:520,width:"100%",textAlign:"center",position:"relative",zIndex:1}}>
        <div style={{marginBottom:32}}>
          <div style={{width:90,height:90,borderRadius:24,margin:"0 auto 24px",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,rgba(59,130,246,.15),rgba(139,92,246,.15))",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,.1)",fontSize:42,animation:"glow 3s ease infinite"}}>🚀</div>
          <h1 className="shimmer-text" style={{fontSize:42,fontWeight:900,fontFamily:"JetBrains Mono",letterSpacing:"-2px",lineHeight:1.1}}>100 DAYS</h1>
          <p style={{color:"#94a3b8",fontSize:16,marginTop:8,fontWeight:300,letterSpacing:"3px",textTransform:"uppercase"}}>Digital Marketing Mastery</p>
        </div>
        <div className="fade-up" style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:36,animationDelay:".2s"}}>{["SEO","PPC","Social Ads","Content","Email","Analytics","CRO","Strategy"].map((f,i) => (<span key={f} style={{padding:"6px 14px",borderRadius:20,fontSize:11,fontWeight:600,letterSpacing:".5px",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.08)",color:"#94a3b8"}}>{f}</span>))}</div>
        <div className="fade-up" style={{background:"rgba(255,255,255,.04)",backdropFilter:"blur(30px)",borderRadius:24,padding:"36px 32px",border:"1px solid rgba(255,255,255,.08)",animationDelay:".3s"}}>
          <p style={{color:"#e2e8f0",fontSize:18,fontWeight:600,marginBottom:4}}>What should we call you?</p>
          <p style={{color:"#64748b",fontSize:13,marginBottom:24}}>Your name will appear on your personal dashboard</p>
          <input className="input-glow" value={nameInput} onChange={e => setNameInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleRegister()} placeholder="Enter your name..." style={{width:"100%",padding:"16px 20px",borderRadius:14,border:"2px solid rgba(255,255,255,.1)",background:"rgba(0,0,0,.3)",color:"#fff",fontSize:16,fontFamily:"Outfit",fontWeight:500,outline:"none",transition:"all .3s ease"}}/>
          <button className="start-btn" onClick={handleRegister} style={{width:"100%",padding:"16px",borderRadius:14,border:"none",color:"#fff",fontSize:16,fontWeight:700,fontFamily:"Outfit",cursor:"pointer",marginTop:16,letterSpacing:".5px"}}>Begin My Journey →</button>
        </div>
        <p className="fade-up" style={{color:"#475569",fontSize:12,marginTop:24,animationDelay:".5s"}}>13 phases • 100 tasks • 8 categories • Track everything</p>
      </div>
    </div>
  );

  const ProgressRing = ({pct:p, size=120, stroke=10, color="#3b82f6"}) => { const r=(size-stroke)/2; const c=2*Math.PI*r; const off=c-(p/100)*c; return (<svg width={size} height={size} style={{transform:"rotate(-90deg)"}}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth={stroke}/><circle className="progress-ring" cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"/></svg>); };

  return (
    <div style={{fontFamily:"Outfit",background:"#f1f5f9",minHeight:"100vh"}}>
      <style>{css}</style>
      {showConfetti && <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9999}}>{Array.from({length:30}).map((_,i) => (<div key={i} style={{position:"absolute",left:`${Math.random()*100}%`,top:`${40+Math.random()*40}%`,width:8,height:8,borderRadius:Math.random()>.5?"50%":"2px",background:["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899"][i%6],animation:`confetti ${.8+Math.random()*.6}s ease forwards`,animationDelay:`${Math.random()*.3}s`}}/>))}</div>}

      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#0a0f1e,#1e293b)",padding:"28px 24px 24px"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:16}}>
            <div className="fade-up">
              <p style={{color:"#64748b",fontSize:12,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",marginBottom:4}}>{getGreeting()}</p>
              <h1 style={{color:"#fff",fontSize:30,fontWeight:900,fontFamily:"JetBrains Mono",letterSpacing:"-1px",margin:0}}>{user} <span style={{fontSize:20}}>👋</span></h1>
              <p style={{color:"#64748b",fontSize:13,marginTop:6,fontStyle:"italic",maxWidth:400}}>"{motivation}"</p>
            </div>
            <div className="fade-up" style={{display:"flex",alignItems:"center",gap:20,animationDelay:".1s"}}>
              <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}><ProgressRing pct={pct} size={80} stroke={7}/><div style={{position:"absolute",textAlign:"center"}}><div style={{color:"#fff",fontSize:20,fontWeight:900,fontFamily:"JetBrains Mono"}}>{pct}%</div></div></div>
              {streak > 0 && <div className="streak-badge" style={{background:"rgba(245,158,11,.15)",border:"1px solid rgba(245,158,11,.3)",borderRadius:14,padding:"10px 16px",textAlign:"center"}}><div style={{fontSize:22}}>🔥</div><div style={{color:"#f59e0b",fontSize:18,fontWeight:900,fontFamily:"JetBrains Mono"}}>{streak}</div><div style={{color:"#92400e",fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px"}}>Streak</div></div>}
            </div>
          </div>
          <div className="fade-up" style={{display:"flex",gap:10,marginTop:20,flexWrap:"wrap",animationDelay:".15s"}}>
            {[{l:"Done",v:totalDone,c:"#3b82f6",i:"✅"},{l:"Left",v:100-totalDone,c:"#f59e0b",i:"📋"},{l:"Phases",v:`${phaseData.filter(p=>p.done===p.total&&p.total>0).length}/13`,c:"#8b5cf6",i:"🎯"},{l:"Current",v:currentPhase,c:"#10b981",i:"📍",w:true}].map((s,i) => (
              <div key={i} className="stat-card" style={{background:"rgba(255,255,255,.05)",borderRadius:12,padding:"10px 16px",border:"1px solid rgba(255,255,255,.06)",flex:s.w?"1 1 auto":"0 0 auto",minWidth:s.w?200:90}}>
                <span style={{fontSize:13,marginRight:6}}>{s.i}</span><span style={{color:"#94a3b8",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px"}}>{s.l} </span><span style={{color:"#fff",fontSize:s.w?12:16,fontWeight:800,fontFamily:s.w?"Outfit":"JetBrains Mono"}}>{s.v}</span>
              </div>
            ))}
          </div>
          <div style={{marginTop:16,background:"rgba(255,255,255,.06)",borderRadius:20,height:8,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#3b82f6,#8b5cf6,#10b981)",borderRadius:20,transition:"width .8s cubic-bezier(.4,0,.2,1)"}}/></div>
        </div>
      </div>

      {/* NAV */}
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px"}}>
        <div style={{display:"flex",gap:2,padding:"12px 0",borderBottom:"2px solid #e2e8f0",overflowX:"auto"}}>
          {[{id:"dashboard",l:"Dashboard",i:"🏠"},{id:"checklist",l:"Checklist",i:"📋"},{id:"phases",l:"Phases",i:"🗂️"},{id:"analytics",l:"Analytics",i:"📊"}].map(t => (
            <button key={t.id} className={`tab-btn ${tab===t.id?"active":""}`} onClick={() => setTab(t.id)} style={{padding:"10px 20px",border:"none",cursor:"pointer",fontWeight:700,fontSize:13,fontFamily:"Outfit",borderRadius:"8px 8px 0 0",background:tab===t.id?"#fff":"transparent",color:tab===t.id?"#0f172a":"#94a3b8",boxShadow:tab===t.id?"0 -2px 10px rgba(0,0,0,.04)":"none",whiteSpace:"nowrap"}}>{t.i} {t.l}</button>
          ))}
        </div>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div style={{padding:"24px 0 60px"}}>
            {nextTask && <div className="fade-up grid-card" onClick={() => toggle(nextTask.d)} style={{background:"linear-gradient(135deg,#1e293b,#0f172a)",borderRadius:20,padding:"28px",marginBottom:24,border:"1px solid rgba(59,130,246,.2)",position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:0,right:0,width:200,height:200,background:"radial-gradient(circle,rgba(59,130,246,.1),transparent)",borderRadius:"50%"}}/><p style={{color:"#64748b",fontSize:11,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",marginBottom:8}}>⚡ Up Next — Day {nextTask.d}</p><h2 style={{color:"#fff",fontSize:20,fontWeight:800,marginBottom:10,lineHeight:1.3}}>{nextTask.task}</h2><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><span style={{padding:"4px 12px",borderRadius:8,fontSize:11,fontWeight:700,background:"rgba(59,130,246,.15)",color:"#60a5fa"}}>{nextTask.phase}</span><span style={{padding:"4px 12px",borderRadius:8,fontSize:11,fontWeight:700,background:"rgba(16,185,129,.15)",color:"#34d399"}}>{nextTask.cat}</span><span style={{padding:"4px 12px",borderRadius:8,fontSize:11,fontWeight:700,background:`${LC[nextTask.lvl]}22`,color:LC[nextTask.lvl]}}>{nextTask.lvl}</span></div><p style={{color:"#475569",fontSize:12,marginTop:14}}>Click this card to mark it complete →</p></div>}
            <h3 className="fade-up" style={{fontSize:18,fontWeight:800,color:"#0f172a",marginBottom:16,animationDelay:".1s"}}>Phase Overview</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
              {phaseData.map((p,i) => { const pp = p.total ? Math.round(p.done/p.total*100) : 0; return (
                <div key={i} className="fade-up grid-card" onClick={() => { setFilterPhase(p.name); setTab("checklist"); }} style={{background:"#fff",borderRadius:16,padding:"18px 20px",border:"1.5px solid #e2e8f0",borderLeft:`4px solid ${PC[p.name]||"#94a3b8"}`,animationDelay:`${i*.04}s`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><span style={{fontSize:13,fontWeight:700,color:"#1e293b"}}>{p.name}</span><span style={{fontSize:16,fontWeight:900,fontFamily:"JetBrains Mono",color:PC[p.name]}}>{pp}%</span></div>
                  <div style={{background:"#f1f5f9",borderRadius:10,height:6,overflow:"hidden"}}><div style={{height:"100%",width:`${pp}%`,background:PC[p.name],borderRadius:10,transition:"width .8s ease"}}/></div>
                  <p style={{color:"#94a3b8",fontSize:11,marginTop:8,fontWeight:600}}>{p.done}/{p.total} tasks</p>
                </div>); })}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:16,marginTop:24}}>
              <CCard t="Skill Radar" s="Your competency across all categories"><ResponsiveContainer width="100%" height={280}><RadarChart data={radarData}><PolarGrid stroke="#e2e8f0"/><PolarAngleAxis dataKey="subject" tick={{fontSize:10,fontWeight:600,fill:"#64748b"}}/><PolarRadiusAxis domain={[0,100]} tick={false} axisLine={false}/><Radar dataKey="pct" stroke="#3b82f6" fill="#3b82f6" fillOpacity={.2} strokeWidth={2}/></RadarChart></ResponsiveContainer></CCard>
              <CCard t="Category Split" s="Task distribution across categories"><ResponsiveContainer width="100%" height={280}><PieChart><Pie data={catData} dataKey="total" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={55} paddingAngle={3} label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} style={{fontSize:10,fontWeight:600}}>{catData.map((e,i)=><Cell key={i} fill={CC[e.name]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></CCard>
            </div>
          </div>
        )}

        {/* CHECKLIST */}
        {tab === "checklist" && (
          <div style={{padding:"20px 0 60px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,marginBottom:16}}>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",flex:1}}>{["All",...PO].map(p => (<button key={p} className="pill" onClick={() => setFilterPhase(p)} style={{padding:"6px 14px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:"Outfit",background:filterPhase===p?"#0f172a":"#e2e8f0",color:filterPhase===p?"#fff":"#475569"}}>{p==="All"?`All (${totalDone}/100)`:p}</button>))}</div>
              <div style={{display:"flex",gap:4}}>{["list","grid"].map(v => (<button key={v} onClick={() => setViewMode(v)} style={{padding:"6px 12px",borderRadius:8,border:"1.5px solid",cursor:"pointer",fontSize:16,borderColor:viewMode===v?"#3b82f6":"#e2e8f0",background:viewMode===v?"#eff6ff":"#fff",color:viewMode===v?"#3b82f6":"#94a3b8"}}>{v==="list"?"☰":"▦"}</button>))}</div>
            </div>
            {viewMode === "list" && <div style={{display:"flex",flexDirection:"column",gap:5}}>{filteredTasks.map((t,i) => { const done=!!completed[t.d]; return (
              <div key={t.d} className="task-row fade-up" onClick={() => toggle(t.d)} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",borderRadius:14,cursor:"pointer",background:done?"linear-gradient(90deg,#f0fdf4,#ecfdf5)":"#fff",border:done?"1.5px solid #86efac":"1.5px solid #e2e8f0",animationDelay:`${Math.min(i*.02,.5)}s`,transform:justCompleted===t.d?"scale(1.02)":"none"}}>
                <div style={{width:30,height:30,borderRadius:10,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,transition:"all .3s cubic-bezier(.4,0,.2,1)",background:done?"#22c55e":"#fff",border:done?"2px solid #22c55e":"2px solid #d1d5db",color:done?"#fff":"transparent",transform:done?"rotate(0) scale(1)":"rotate(-90deg) scale(.8)"}}>✓</div>
                <div style={{background:PC[t.phase]||"#64748b",color:"#fff",fontWeight:800,fontSize:11,borderRadius:8,padding:"4px 10px",minWidth:48,textAlign:"center",fontFamily:"JetBrains Mono",flexShrink:0}}>D{t.d}</div>
                <div style={{flex:1,minWidth:0}}><div style={{fontSize:13.5,fontWeight:600,color:done?"#16a34a":"#1e293b",textDecoration:done?"line-through":"none",lineHeight:1.3}}>{t.task}</div><div style={{display:"flex",gap:6,marginTop:5,flexWrap:"wrap"}}><span style={{fontSize:9,fontWeight:700,color:"#64748b",background:"#f1f5f9",padding:"2px 8px",borderRadius:4}}>{t.phase}</span><span style={{fontSize:9,fontWeight:700,color:CC[t.cat],background:`${CC[t.cat]}15`,padding:"2px 8px",borderRadius:4}}>{t.cat}</span><span style={{fontSize:9,fontWeight:700,color:LC[t.lvl],background:`${LC[t.lvl]}15`,padding:"2px 8px",borderRadius:4}}>{t.lvl}</span></div></div>
              </div>); })}</div>}
            {viewMode === "grid" && <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10}}>{filteredTasks.map((t,i) => { const done=!!completed[t.d]; return (
              <div key={t.d} className="fade-up grid-card" onClick={() => toggle(t.d)} style={{background:done?"linear-gradient(135deg,#f0fdf4,#dcfce7)":"#fff",borderRadius:16,padding:"16px",border:done?"1.5px solid #86efac":"1.5px solid #e2e8f0",textAlign:"center",animationDelay:`${Math.min(i*.015,.4)}s`,position:"relative",overflow:"hidden"}}>
                {done && <div style={{position:"absolute",top:8,right:8,width:22,height:22,borderRadius:"50%",background:"#22c55e",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:12,fontWeight:800}}>✓</div>}
                <div style={{width:44,height:44,borderRadius:12,margin:"0 auto 10px",display:"flex",alignItems:"center",justifyContent:"center",background:`${PC[t.phase]}18`,color:PC[t.phase],fontWeight:900,fontSize:16,fontFamily:"JetBrains Mono"}}>{t.d}</div>
                <p style={{fontSize:11,fontWeight:600,color:done?"#16a34a":"#334155",lineHeight:1.3,textDecoration:done?"line-through":"none"}}>{t.task}</p>
                <div style={{marginTop:8,display:"flex",gap:4,justifyContent:"center",flexWrap:"wrap"}}><span style={{fontSize:8,fontWeight:700,color:CC[t.cat],background:`${CC[t.cat]}12`,padding:"2px 6px",borderRadius:4}}>{t.cat}</span><span style={{fontSize:8,fontWeight:700,color:LC[t.lvl],background:`${LC[t.lvl]}12`,padding:"2px 6px",borderRadius:4}}>{t.lvl}</span></div>
              </div>); })}</div>}
          </div>
        )}

        {/* PHASES */}
        {tab === "phases" && (
          <div style={{padding:"24px 0 60px"}}>{PO.map((phase,pi) => { const tasks=TASKS.filter(t=>t.phase===phase); const done=tasks.filter(t=>completed[t.d]).length; const pp=Math.round(done/tasks.length*100); return (
            <div key={phase} className="fade-up" style={{marginBottom:16,animationDelay:`${pi*.05}s`}}>
              <div className="phase-row" style={{background:"#fff",borderRadius:16,padding:"20px 24px",border:"1.5px solid #e2e8f0",borderLeft:`5px solid ${PC[phase]}`,cursor:"pointer"}} onClick={() => { setFilterPhase(phase); setTab("checklist"); }}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><div><h3 style={{fontSize:16,fontWeight:800,color:"#0f172a",margin:0}}>{phase}</h3><p style={{color:"#94a3b8",fontSize:12,marginTop:2}}>{tasks.length} tasks • {done} completed</p></div><div style={{textAlign:"right"}}><div style={{fontSize:24,fontWeight:900,fontFamily:"JetBrains Mono",color:PC[phase]}}>{pp}%</div><div style={{fontSize:10,color:"#94a3b8",fontWeight:600}}>{pp===100?"COMPLETE ✓":"IN PROGRESS"}</div></div></div>
                <div style={{background:"#f1f5f9",borderRadius:10,height:8,overflow:"hidden"}}><div style={{height:"100%",width:`${pp}%`,background:`linear-gradient(90deg,${PC[phase]},${PC[phase]}aa)`,borderRadius:10,transition:"width 1s ease"}}/></div>
                <div style={{display:"flex",gap:3,marginTop:12,flexWrap:"wrap"}}>{tasks.map(t => (<div key={t.d} style={{width:18,height:18,borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,fontFamily:"JetBrains Mono",cursor:"pointer",transition:"all .2s",background:completed[t.d]?PC[phase]:"#f1f5f9",color:completed[t.d]?"#fff":"#94a3b8",border:completed[t.d]?"none":"1px solid #e2e8f0"}} onClick={e => { e.stopPropagation(); toggle(t.d); }}>{t.d}</div>))}</div>
              </div>
            </div>); })}</div>
        )}

        {/* ANALYTICS */}
        {tab === "analytics" && (
          <div style={{padding:"24px 0 60px"}}>
            {totalDone === 0 && <div className="scale-in" style={{textAlign:"center",padding:"48px 20px",background:"linear-gradient(135deg,#fffbeb,#fef3c7)",borderRadius:20,border:"1.5px solid #fde68a",marginBottom:24}}><div style={{fontSize:48}} className="float-anim">👆</div><p style={{color:"#92400e",fontWeight:800,fontSize:17,margin:"16px 0 6px"}}>Start checking off tasks!</p><p style={{color:"#b45309",fontSize:13}}>Head to the Checklist tab and click tasks to see your analytics come alive.</p></div>}
            <div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap"}}>{[{id:"all",l:"All Charts"},{id:"progress",l:"Progress"},{id:"category",l:"Categories"},{id:"difficulty",l:"Difficulty"}].map(f => (<button key={f.id} className="pill" onClick={() => setChartFilter(f.id)} style={{padding:"8px 16px",borderRadius:10,border:chartFilter===f.id?"none":"1.5px solid #e2e8f0",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"Outfit",background:chartFilter===f.id?"#0f172a":"#fff",color:chartFilter===f.id?"#fff":"#64748b"}}>{f.l}</button>))}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:16}}>
              {(chartFilter==="all"||chartFilter==="category") && <><CCard t="Tasks by Category" s="Distribution of all 100 tasks"><ResponsiveContainer width="100%" height={280}><PieChart><Pie data={catData} dataKey="total" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={50} paddingAngle={3} label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} style={{fontSize:10,fontWeight:600}}>{catData.map((e,i)=><Cell key={i} fill={CC[e.name]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></CCard>
              <CCard t="Completion by Category" s="Done tasks per category"><ResponsiveContainer width="100%" height={280}><PieChart><Pie data={catData.filter(c=>c.done>0)} dataKey="done" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={50} paddingAngle={3} label={({name,value})=>`${name}: ${value}`} style={{fontSize:10,fontWeight:600}}>{catData.filter(c=>c.done>0).map((e,i)=><Cell key={i} fill={CC[e.name]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></CCard>
              <CCard t="Category Completion %" s="Horizontal percentage bars" f><ResponsiveContainer width="100%" height={280}><BarChart data={catData.map(c=>({...c,pct:c.total?Math.round(c.done/c.total*100):0}))} layout="vertical" margin={{left:65}}><XAxis type="number" domain={[0,100]} tick={{fontSize:11}} unit="%"/><YAxis dataKey="name" type="category" tick={{fontSize:11,fontWeight:600}}/><Tooltip formatter={v=>`${v}%`}/><Bar dataKey="pct" name="% Complete" radius={[0,8,8,0]}>{catData.map((e,i)=><Cell key={i} fill={CC[e.name]}/>)}</Bar></BarChart></ResponsiveContainer></CCard></>}
              {(chartFilter==="all"||chartFilter==="progress") && <><CCard t="Phase Progress" s="Total vs Completed per phase" f><ResponsiveContainer width="100%" height={320}><BarChart data={phaseData} margin={{left:0,right:10,bottom:70}}><XAxis dataKey="name" tick={{fontSize:9,fontWeight:600}} angle={-40} textAnchor="end" interval={0}/><YAxis tick={{fontSize:11}}/><Tooltip/><Legend wrapperStyle={{fontSize:12}}/><Bar dataKey="total" name="Total" fill="#e2e8f0" radius={[6,6,0,0]}/><Bar dataKey="done" name="Done" fill="#3b82f6" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></CCard>
              <CCard t="Cumulative Progress vs Target" s="Track if you're on pace — 1 task/day" f><ResponsiveContainer width="100%" height={300}><AreaChart data={cumulativeData} margin={{left:0,right:10}}><XAxis dataKey="day" tick={{fontSize:10}}/><YAxis tick={{fontSize:11}}/><Tooltip/><Legend wrapperStyle={{fontSize:12}}/><Area type="monotone" dataKey="target" name="Target" stroke="#10b981" fill="#10b98115" strokeWidth={2} strokeDasharray="6 3" dot={false}/><Area type="monotone" dataKey="done" name="Your Progress" stroke="#3b82f6" fill="#3b82f620" strokeWidth={3} dot={false}/></AreaChart></ResponsiveContainer></CCard>
              <CCard t="Phase Completion Journey" s="% complete across each phase" f><ResponsiveContainer width="100%" height={300}><LineChart data={phaseData.map(p=>({...p,pct:p.total?Math.round(p.done/p.total*100):0}))} margin={{left:0,right:10,bottom:70}}><XAxis dataKey="name" tick={{fontSize:9,fontWeight:600}} angle={-40} textAnchor="end" interval={0}/><YAxis domain={[0,100]} tick={{fontSize:11}} unit="%"/><Tooltip formatter={v=>`${v}%`}/><Line type="monotone" dataKey="pct" name="% Complete" stroke="#f59e0b" strokeWidth={3} dot={{fill:"#f59e0b",r:5}}/></LineChart></ResponsiveContainer></CCard></>}
              {(chartFilter==="all"||chartFilter==="difficulty") && <><CCard t="Difficulty Breakdown" s="Total vs Completed per level"><ResponsiveContainer width="100%" height={280}><BarChart data={lvlData}><XAxis dataKey="name" tick={{fontSize:12,fontWeight:600}}/><YAxis tick={{fontSize:11}}/><Tooltip/><Legend wrapperStyle={{fontSize:12}}/><Bar dataKey="total" name="Total" fill="#e2e8f0" radius={[6,6,0,0]}/><Bar dataKey="done" name="Done" fill="#8b5cf6" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></CCard>
              <CCard t="Skill Radar Map" s="Your competency across all categories"><ResponsiveContainer width="100%" height={280}><RadarChart data={radarData}><PolarGrid stroke="#e2e8f0"/><PolarAngleAxis dataKey="subject" tick={{fontSize:10,fontWeight:600,fill:"#64748b"}}/><PolarRadiusAxis domain={[0,100]} tick={false} axisLine={false}/><Radar dataKey="pct" stroke="#3b82f6" fill="#3b82f6" fillOpacity={.2} strokeWidth={2}/></RadarChart></ResponsiveContainer></CCard></>}
            </div>
            <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:40}}>
              <button onClick={() => { if(confirm("Reset all progress?")) setCompleted({}); }} style={{padding:"10px 24px",background:"#fef2f2",color:"#dc2626",border:"1.5px solid #fecaca",borderRadius:12,cursor:"pointer",fontWeight:700,fontSize:12,fontFamily:"Outfit"}}>Reset Progress</button>
              <button onClick={() => { if(confirm("Log out? Progress is saved.")) setUser(null); }} style={{padding:"10px 24px",background:"#f8fafc",color:"#64748b",border:"1.5px solid #e2e8f0",borderRadius:12,cursor:"pointer",fontWeight:700,fontSize:12,fontFamily:"Outfit"}}>Change Name</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CCard({t, s, children, f}) {
  return (<div className="fade-up chart-card" style={{background:"#fff",borderRadius:20,padding:"22px 16px",border:"1.5px solid #e2e8f0",boxShadow:"0 1px 4px rgba(0,0,0,.03)",gridColumn:f?"1 / -1":"auto"}}><h3 style={{margin:"0 0 2px 8px",fontSize:15,fontWeight:800,color:"#0f172a"}}>{t}</h3>{s && <p style={{margin:"0 0 12px 8px",fontSize:11,color:"#94a3b8",fontWeight:500}}>{s}</p>}{children}</div>);
}
