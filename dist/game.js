(()=>{function pd(r){let t=r>>>0;return function(){t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var vn=class{constructor(t){this.next=pd(t)}float(t=0,e=1){return t+(e-t)*this.next()}int(t,e){return Math.floor(this.float(t,e+1))}pick(t){return t[Math.floor(this.next()*t.length)]}chance(t){return this.next()<t}shuffle(t){for(let e=t.length-1;e>0;e--){let n=Math.floor(this.next()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}},cs=class{constructor(t){let e=pd(t);this.perm=new Uint16Array(512),this.vals=new Float32Array(256);let n=[];for(let i=0;i<256;i++)n.push(i),this.vals[i]=e()*2-1;for(let i=255;i>0;i--){let s=Math.floor(e()*(i+1));[n[i],n[s]]=[n[s],n[i]]}for(let i=0;i<512;i++)this.perm[i]=n[i&255]}lattice(t,e){return this.vals[this.perm[this.perm[t&255]+e&511]]}get(t,e){let n=Math.floor(t),i=Math.floor(e),s=t-n,a=e-i,o=s*s*s*(s*(s*6-15)+10),l=a*a*a*(a*(a*6-15)+10),c=this.lattice(n,i),h=this.lattice(n+1,i),u=this.lattice(n,i+1),d=this.lattice(n+1,i+1),f=c+(h-c)*o,p=u+(d-u)*o;return f+(p-f)*l}fbm(t,e,n=4,i=2,s=.5){let a=1,o=1,l=0,c=0;for(let h=0;h<n;h++)l+=a*this.get(t*o+h*17.3,e*o-h*9.1),c+=a,a*=s,o*=i;return l/c}ridged(t,e,n=5){let i=.5,s=1,a=0,o=1,l=0;for(let c=0;c<n;c++){let h=1-Math.abs(this.get(t*s+c*31.7,e*s+c*11.3));h*=h,a+=h*i*o,l+=i,o=h,i*=.5,s*=2.05}return a/l}};var $t=(r,t,e)=>r<t?t:r>e?e:r,_e=(r,t,e)=>r+(t-r)*e,Fe=(r,t,e)=>{let n=$t((e-r)/(t-r),0,1);return n*n*(3-2*n)};function yc(r,t,e,n,i,s){let a=i-e,o=s-n,l=a*a+o*o,c=l>0?((r-e)*a+(t-n)*o)/l:0;return c=$t(c,0,1),Math.hypot(r-(e+c*a),t-(n+c*o))}function wa(r,t,e){let n=1/0;for(let i=0;i<e.length-1;i++){let s=yc(r,t,e[i][0],e[i][1],e[i+1][0],e[i+1][1]);s<n&&(n=s)}return n}function lr(r,t=2,e=!1){let n=r;for(let i=0;i<t;i++){let s=[],a=n.length;if(a<3)return n;e||s.push(n[0]);let o=e?a:a-1;for(let l=0;l<o;l++){let c=n[l],h=n[(l+1)%a];s.push([c[0]*.75+h[0]*.25,c[1]*.75+h[1]*.25]),s.push([c[0]*.25+h[0]*.75,c[1]*.25+h[1]*.75])}e||s.push(n[a-1]),n=s}return n}function cr(r,t){if(r.length<2)return r.slice();let e=[r[0]],n=0;for(let a=0;a<r.length-1;a++){let[o,l]=r[a],[c,h]=r[a+1],u=Math.hypot(c-o,h-l),d=t-n;for(;d<u;){let f=d/u;e.push([o+(c-o)*f,l+(h-l)*f]),d+=t}n=u-(d-t)}let i=r[r.length-1],s=e[e.length-1];return Math.hypot(i[0]-s[0],i[1]-s[1])>t*.3?e.push(i):e[e.length-1]=i,e}function Rn(r){return Math.round(r).toLocaleString("en-US")}function Oi(r){return Math.round($t(r,0,1)*100)+"%"}var Bi=class{constructor(){this.items=[],this.prios=[]}get size(){return this.items.length}push(t,e){let n=this.items,i=this.prios;n.push(t),i.push(e);let s=n.length-1;for(;s>0;){let a=s-1>>1;if(i[a]<=i[s])break;[n[a],n[s]]=[n[s],n[a]],[i[a],i[s]]=[i[s],i[a]],s=a}}pop(){let t=this.items,e=this.prios,n=t[0],i=t.pop(),s=e.pop();if(t.length>0){t[0]=i,e[0]=s;let a=0,o=t.length;for(;;){let l=2*a+1,c=l+1,h=a;if(l<o&&e[l]<e[h]&&(h=l),c<o&&e[c]<e[h]&&(h=c),h===a)break;[t[h],t[a]]=[t[a],t[h]],[e[h],e[a]]=[e[a],e[h]],a=h}}return n}};var Jt={W:3200,H:2e3,MARGIN:360,CELL:74,HM_STEP:10,WATER:-3},V=0,ot=1,Ce=[{id:V,name:"Leaf Alliance",short:"Leaf",adj:"Leaf",color:"#4cc46b",dark:"#1f6e38",tint:[64,186,98],css:"leaf"},{id:ot,name:"Stone Dominion",short:"Stone",adj:"Stone",color:"#e0503f",dark:"#7c2018",tint:[206,52,58],css:"stone"}];var gd=412,xd=1,Vn={plains:{name:"Open Fields",move:1,defense:1},forest:{name:"Forest",move:.68,defense:1.25},mountain:{name:"Mountains",move:.42,defense:1.6},lake:{name:"Lake",move:0,defense:1}},gi={capital:{name:"Capital",defense:1.55,heal:16,morale:.025},city:{name:"City",defense:1.35,heal:12,morale:.02},fort:{name:"Fort",defense:1.85,heal:10,morale:.02},village:{name:"Village",defense:1.15,heal:4,morale:.008},bridge:{name:"Bridgehead",defense:1.1,heal:0,morale:0}},Gn={infantry:{name:"Infantry",atk:1,def:1,speed:1,max:1e3,symbol:"inf"},assault:{name:"Assault",atk:1.35,def:.88,speed:1.05,max:900,symbol:"assault"},scout:{name:"Scout",atk:.55,def:.6,speed:1.8,max:450,symbol:"scout"},medical:{name:"Medical",atk:.12,def:.4,speed:1,max:350,symbol:"medical"},heavy:{name:"Heavy Weapons",atk:1.6,def:1.25,speed:.72,max:650,symbol:"heavy"}},md=[{name:"Green",min:0,mult:.85,stars:0},{name:"Regular",min:10,mult:1,stars:1},{name:"Veteran",min:30,mult:1.15,stars:2},{name:"Elite",min:60,mult:1.3,stars:3}];function hr(r){let t=md[0];for(let e of md)r>=e.min&&(t=e);return t}var Ea={Aggressive:{desc:"+20% attack power",icon:"\u{1F5E1}"},Defensive:{desc:"+25% power when defending",icon:"\u{1F6E1}"},Strategist:{desc:"+12% per extra battalion of the same army in a battle",icon:"\u265F"},Reckless:{desc:"+15% attack, ignores bad odds, +15% casualties",icon:"\u{1F525}"}},yd={easy:{label:"Recruit",enemyStrength:.75,aiThink:3.6,aiAggro:.55,enemyReinf:.6},normal:{label:"Officer",enemyStrength:.88,aiThink:2.6,aiAggro:.78,enemyReinf:.85},hard:{label:"General",enemyStrength:1.1,aiThink:1.6,aiAggro:1.2,enemyReinf:1.3}};function Ta(r){return 1620-120*Math.sin(r/310)-60*Math.sin(r/97+2)}var vc=[{key:"sennai",name:"Sennai",type:"capital",x:330,y:1010,side:V},{key:"mirel",name:"Mirel",type:"city",x:640,y:1690,side:V},{key:"halden",name:"Halden",type:"city",x:760,y:330,side:V},{key:"osk",name:"Osk",type:"city",x:1230,y:960,side:V},{key:"arden",name:"Fort Arden",type:"fort",x:1290,y:1490,side:V},{key:"tamsk",name:"Fort Tamsk",type:"fort",x:1180,y:560,side:V},{key:"kharzad",name:"Kharzad",type:"capital",x:2890,y:990,side:ot},{key:"vorsk",name:"Vorsk",type:"city",x:2560,y:300,side:ot},{key:"drav",name:"Drav",type:"city",x:2e3,y:1130,side:ot},{key:"ketzen",name:"Ketzen",type:"city",x:2420,y:1700,side:ot},{key:"kazan",name:"Fort Kazan",type:"fort",x:1955,y:545,side:ot},{key:"brask",name:"Fort Brask",type:"fort",x:2620,y:1240,side:ot}],vd=[{key:"eastbridge",name:"Eastern Bridge",river:"tarn",x:2330,y:1180,side:ot,bank:"east"},{key:"westbridge",name:"Western Bridge",river:"sela",x:880,y:760,side:V,bank:"west"}],sn={[V]:["kharzad","kazan","vorsk","eastbridge"],[ot]:["sennai","arden","mirel","westbridge"]},hs={[V]:"sennai",[ot]:"kharzad"},_d=[{key:"sela",name:"Sela",guide:r=>870+80*Math.sin(r/250+.4)+30*Math.sin(r/90)},{key:"tarn",name:"Tarn",guide:r=>2340+100*Math.sin(r/290+1.1)+35*Math.sin(r/85+2)}],Md=[{pts:[[1430,-60],[1600,170],[1760,360],[1880,470]],width:150,height:230},{pts:[[2035,625],[2200,760],[2360,850],[2470,900]],width:150,height:210},{pts:[[2520,1460],[2720,1620],[2960,1800],[3150,1900]],width:170,height:200},{pts:[[380,260],[560,420],[640,560]],width:120,height:110},{pts:[[1480,1780],[1640,1900],[1760,2060]],width:120,height:130},{pts:[[3050,180],[3150,420]],width:140,height:160}],Aa=[{x:1020,y:1260,r:85},{x:2700,y:640,r:80}],bd=["Aldwick","Brem","Corva","Dunmere","Eskel","Farrow","Gelt","Hask","Ivel","Jorn","Kell","Lusk","Marrow","Nidd","Orly","Pell","Quarry","Rook","Sarn","Tull","Ubb","Vesk","Wold","Yarrow","Zell","Ashby","Birch","Cobb","Dray","Elm","Fenn","Grit"],Sd=["Ren","Hayato","Mika","Sora","Kenji","Yuna","Daisuke","Akira","Nori","Haru","Emi","Taro","Kaito","Rin","Shin","Aoi","Jiro","Kota","Mei","Yori","Bram","Dorn","Hesk","Ivo","Juska","Korr","Lev","Mazur","Orsk","Petr","Radim","Stav","Tomas","Vadek","Zora","Grigor"],wd=[{id:"kakashi",side:V,name:"Kakashi",trait:"Strategist"},{id:"mori",side:V,name:"Hana Mori",trait:"Defensive"},{id:"ono",side:V,name:"Daichi Ono",trait:"Aggressive"},{id:"kenta",side:V,name:"Ryo Kenta",trait:"Reckless"},{id:"vask",side:ot,name:"Garon Vask",trait:"Aggressive"},{id:"teshk",side:ot,name:"Mura Teshk",trait:"Defensive"},{id:"durn",side:ot,name:"Kesh Durn",trait:"Reckless"},{id:"ostrav",side:ot,name:"Ilya Ostrav",trait:"Strategist"}],Ed=[{id:"l1",side:V,name:"1st Army",general:"kakashi"},{id:"l2",side:V,name:"2nd Army",general:"mori"},{id:"l3",side:V,name:"3rd Army",general:"ono"},{id:"s1",side:ot,name:"Northern Army",general:"vask"},{id:"s2",side:ot,name:"Central Army",general:"teshk"},{id:"s3",side:ot,name:"Southern Army",general:"durn"},{id:"s4",side:ot,name:"Capital Guard",general:"ostrav"}],Td=[{side:V,army:"l1",name:"1st Infantry Battalion",short:"1st Inf",type:"infantry",y:300,depth:110,xp:14},{side:V,army:"l1",name:"2nd Infantry Battalion",short:"2nd Inf",type:"infantry",y:560,depth:110,xp:12},{side:V,army:"l1",name:"3rd Assault Battalion",short:"3rd Aslt",type:"assault",y:430,depth:230,xp:34},{side:V,army:"l1",name:"1st Scout Battalion",short:"1st Sct",type:"scout",y:730,depth:150,xp:12},{side:V,army:"l2",name:"3rd Leaf Battalion",short:"3rd Leaf",type:"infantry",y:900,depth:110,xp:36,soldiers:850,morale:.78,captain:"Ren"},{side:V,army:"l2",name:"4th Infantry Battalion",short:"4th Inf",type:"infantry",y:1110,depth:110,xp:4},{side:V,army:"l2",name:"5th Infantry Battalion",short:"5th Inf",type:"infantry",y:1310,depth:120,xp:12},{side:V,army:"l2",name:"Medical Battalion",short:"Medical",type:"medical",y:1060,depth:300,xp:10},{side:V,army:"l2",name:"7th Infantry Battalion",short:"7th Inf",type:"infantry",at:"sennai",xp:2},{side:V,army:"l3",name:"1st Assault Battalion",short:"1st Aslt",type:"assault",y:1500,depth:130,xp:16,soldiers:742,morale:.64,org:.71},{side:V,army:"l3",name:"Heavy Weapons Battalion",short:"Hvy Wpns",type:"heavy",y:1640,depth:230,xp:14},{side:V,army:"l3",name:"6th Infantry Battalion",short:"6th Inf",type:"infantry",y:1760,depth:110,xp:6},{side:V,army:"l3",name:"2nd Scout Battalion",short:"2nd Sct",type:"scout",y:1910,depth:140,xp:12},{side:ot,army:"s1",name:"14th Stone Battalion",short:"14th",type:"infantry",y:290,depth:110,xp:14},{side:ot,army:"s1",name:"9th Stone Battalion",short:"9th",type:"infantry",y:540,depth:110,xp:12},{side:ot,army:"s1",name:"21st Stone Assault Battalion",short:"21st Aslt",type:"assault",y:420,depth:240,xp:20},{side:ot,army:"s1",name:"3rd Stone Scout Battalion",short:"3rd Sct",type:"scout",y:720,depth:140,xp:10},{side:ot,army:"s1",name:"17th Stone Battalion",short:"17th",type:"infantry",at:"kazan",xp:22},{side:ot,army:"s2",name:"11th Stone Battalion",short:"11th",type:"infantry",y:880,depth:110,xp:12},{side:ot,army:"s2",name:"12th Stone Battalion",short:"12th",type:"infantry",y:1090,depth:110,xp:8},{side:ot,army:"s2",name:"6th Stone Heavy Battalion",short:"6th Hvy",type:"heavy",y:1e3,depth:250,xp:14},{side:ot,army:"s2",name:"15th Stone Battalion",short:"15th",type:"infantry",y:1290,depth:120,xp:10},{side:ot,army:"s2",name:"18th Stone Battalion",short:"18th",type:"infantry",at:"drav",xp:6},{side:ot,army:"s3",name:"22nd Stone Assault Battalion",short:"22nd Aslt",type:"assault",y:1480,depth:120,xp:18},{side:ot,army:"s3",name:"16th Stone Battalion",short:"16th",type:"infantry",y:1660,depth:110,xp:10},{side:ot,army:"s3",name:"7th Stone Heavy Battalion",short:"7th Hvy",type:"heavy",y:1590,depth:260,xp:12},{side:ot,army:"s3",name:"4th Stone Scout Battalion",short:"4th Sct",type:"scout",y:1880,depth:130,xp:8},{side:ot,army:"s4",name:"1st Stone Guard Battalion",short:"1st Guard",type:"infantry",at:"kharzad",xp:40},{side:ot,army:"s4",name:"19th Stone Battalion",short:"19th",type:"infantry",at:"vorsk",xp:6}],Ad={[V]:[["8th Infantry Battalion","8th Inf","infantry"],["2nd Assault Battalion","2nd Aslt","assault"],["9th Infantry Battalion","9th Inf","infantry"],["2nd Heavy Weapons Battalion","2nd Hvy","heavy"],["10th Infantry Battalion","10th Inf","infantry"],["3rd Scout Battalion","3rd Sct","scout"],["11th Infantry Battalion","11th Inf","infantry"],["4th Assault Battalion","4th Aslt","assault"]],[ot]:[["23rd Stone Battalion","23rd","infantry"],["24th Stone Assault Battalion","24th Aslt","assault"],["25th Stone Battalion","25th","infantry"],["8th Stone Heavy Battalion","8th Hvy","heavy"],["26th Stone Battalion","26th","infantry"],["27th Stone Assault Battalion","27th Aslt","assault"],["28th Stone Battalion","28th","infantry"],["5th Stone Scout Battalion","5th Sct","scout"],["29th Stone Battalion","29th","infantry"],["30th Stone Battalion","30th","infantry"]]};var{W:ei,H:hn,MARGIN:_n,CELL:ki,HM_STEP:_c}=Jt;function Rd(r,t){return r<t?r*16384+t:t*16384+r}function dp(r,t,e,n,i,s){let a=[],o=[],l=r.length;for(let c=0;c<l;c++){let h=r[c],u=r[(c+1)%l],d=t[c],f=e*h[0]+n*h[1]-i,p=e*u[0]+n*u[1]-i;if(f<=0){if(a.push(h),o.push(d),p>0){let y=f/(f-p);a.push([h[0]+(u[0]-h[0])*y,h[1]+(u[1]-h[1])*y]),o.push(s)}}else if(p<=0){let y=f/(f-p);a.push([h[0]+(u[0]-h[0])*y,h[1]+(u[1]-h[1])*y]),o.push(d)}}return[a,o]}var Ra=class{constructor(t=7){this.seed=t,this.rng=new vn(t),this.noise=new cs(t*13+1),this.noise2=new cs(t*29+7),this.noise3=new cs(t*41+3),this.cells=[],this.edges=new Map,this.locations=[],this.locByKey={},this.rivers=[],this.roads=[],this.bridges=[]}generate(){return this.buildCells(),this.buildVertexGraph(),this.classifyTerrain(),this.placeLocations(),this.buildRivers(),this.buildRoads(),this.placeBridgeObjectives(),this.placeVillages(),this.buildHeightmap(),this.finalizeCells(),this}buildCells(){let t=this.rng,e=ki*.866,n=Math.ceil(hn/e),i=Math.ceil(ei/ki)+1,s=[];for(let h=0;h<n;h++)for(let u=0;u<i;u++){let d=(u+(h%2?0:.5))*ki+t.float(-.27,.27)*ki,f=(h+.5)*e+t.float(-.27,.27)*ki;d=$t(d,4,ei-4),f=$t(f,4,hn-4),s.push([d,f])}let a=ki,o=Math.ceil(ei/a)+1,l=Math.ceil(hn/a)+1,c=Array.from({length:o*l},()=>[]);s.forEach((h,u)=>c[Math.floor(h[1]/a)*o+Math.floor(h[0]/a)].push(u)),this.bucketSize=a,this.bucketW=o,this.bucketH=l,this.buckets=c;for(let h=0;h<s.length;h++){let[u,d]=s[h],f=Math.floor(u/a),p=Math.floor(d/a),y=[];for(let _=p-2;_<=p+2;_++)if(!(_<0||_>=l)){for(let S=f-2;S<=f+2;S++)if(!(S<0||S>=o))for(let v of c[_*o+S])v!==h&&y.push(v)}y.sort((_,S)=>{let v=(s[_][0]-u)**2+(s[_][1]-d)**2,A=(s[S][0]-u)**2+(s[S][1]-d)**2;return v-A});let g=[[0,0],[ei,0],[ei,hn],[0,hn]],m=[-1,-1,-1,-1];for(let _ of y){let[S,v]=s[_],A=S-u,x=v-d,T=(S*S+v*v-u*u-d*d)/2;[g,m]=dp(g,m,A,x,T,_)}let b=[],E=[];for(let _=0;_<g.length;_++){let S=g[_],v=g[(_+1)%g.length];Math.hypot(S[0]-v[0],S[1]-v[1])<.05||(b.push(S),E.push(m[_]))}this.cells.push({id:h,x:u,y:d,poly:b,polyNbr:E,nbrs:[],terrain:"plains",h:0,owner:V,loc:null,road:!1,forestDensity:0})}for(let h of this.cells){let u=h.poly.length;for(let d=0;d<u;d++){let f=h.polyNbr[d];if(f<0)continue;let p=h.poly[d],y=h.poly[(d+1)%u],g=Math.hypot(p[0]-y[0],p[1]-y[1]);if(g<.5)continue;let m=Rd(h.id,f);this.edges.has(m)||this.edges.set(m,{a:Math.min(h.id,f),b:Math.max(h.id,f),mx:(p[0]+y[0])/2,my:(p[1]+y[1])/2,len:g,river:null,road:!1,bridge:null})}}for(let h of this.edges.values())this.cells[h.a].nbrs.push(h.b),this.cells[h.b].nbrs.push(h.a)}edge(t,e){return this.edges.get(Rd(t,e))}buildVertexGraph(){let t=[],e=new Map,n=(a,o)=>{let l=Math.round(a),c=Math.round(o);for(let d=-1;d<=1;d++)for(let f=-1;f<=1;f++){let p=e.get((l+f)*1e5+(c+d));if(p)for(let y of p){let g=t[y];if(Math.abs(g[0]-a)<.6&&Math.abs(g[1]-o)<.6)return y}}let h=t.length;t.push([a,o]);let u=l*1e5+c;return e.has(u)||e.set(u,[]),e.get(u).push(h),h},i=new Map,s=[];for(let a of this.cells){a.vids=a.poly.map(l=>n(l[0],l[1]));let o=a.vids.length;for(let l=0;l<o;l++){let c=a.vids[l],h=a.vids[(l+1)%o];if(c===h)continue;let u=c<h?c*1e6+h:h*1e6+c,d=i.get(u);d||(d={u:Math.min(c,h),v:Math.max(c,h),cells:[]},i.set(u,d),(s[c]||(s[c]=[])).push(h),(s[h]||(s[h]=[])).push(c)),d.cells.includes(a.id)||d.cells.push(a.id)}}this.verts=t,this.vEdges=i,this.vAdj=s}vEdge(t,e){return this.vEdges.get(t<e?t*1e6+e:e*1e6+t)}baseHeight(t,e){let n=this.noise,i=7+9*n.fbm(t/640,e/640,4);i+=16*Math.max(0,this.noise2.fbm(t/330+5,e/330-3,3)-.05);for(let o of Md){let l=wa(t,e,o.pts);if(l>=o.width)continue;let c=1-Fe(0,o.width,l),h=.5+.55*n.ridged(t/210+3.3,e/210-1.7,5);i+=o.height*Math.pow(c,1.35)*h}let s=Math.min(t,ei-t,e,hn-e),a=Fe(-150,6,s+18*this.noise3.fbm(t/140,e/140,3));return i=_e(-46,i,a),i}classifyTerrain(){for(let t of this.cells){let e=!1;for(let a of Aa)Math.hypot(t.x-a.x,t.y-a.y)<a.r&&(e=!0);if(e){t.terrain="lake";continue}let n=this.baseHeight(t.x,t.y);for(let a of t.poly)n+=this.baseHeight(_e(t.x,a[0],.6),_e(t.y,a[1],.6));let i=n/(t.poly.length+1);if(t.baseH=i,i>62){t.terrain="mountain";continue}let s=this.noise3.fbm(t.x/420+11,t.y/420+4,4)+(i>30?.12:0);s>.17&&(t.terrain="forest",t.forestDensity=$t((s-.17)*3.2+.45,.45,1))}}nearestCell(t,e){let n=this.bucketSize,i=Math.floor(t/n),s=Math.floor(e/n),a=-1,o=1/0;for(let l=1;l<=4&&a<0;l++)for(let c=s-l;c<=s+l;c++)if(!(c<0||c>=this.bucketH)){for(let h=i-l;h<=i+l;h++)if(!(h<0||h>=this.bucketW))for(let u of this.buckets[c*this.bucketW+h]){let d=this.cells[u],f=(d.x-t)**2+(d.y-e)**2;f<o&&(o=f,a=u)}}return a}cellAt(t,e){return t<0||e<0||t>ei||e>hn?-1:this.nearestCell(t,e)}addLocation(t,e){let n=this.cells[e],i={id:this.locations.length,key:t.key,name:t.name,type:t.type,cell:e,x:n.x,y:n.y,side:t.side};return this.locations.push(i),this.locByKey[t.key]=i,n.loc=i.id,t.type!=="bridge"&&t.type!=="village"&&(n.terrain="plains"),t.type==="village"&&n.terrain==="mountain"&&(n.terrain="plains"),i}placeLocations(){for(let t of vc){let e=-1,n=1/0;for(let i of this.cells){if(i.terrain==="lake"||i.loc!==null)continue;let s=Math.hypot(i.x-t.x,i.y-t.y);s<n&&(n=s,e=i.id)}this.addLocation(t,e)}}buildRivers(){let t=this.verts,e=n=>this.cells[n].terrain==="lake";for(let n of _d){let i=-1,s=1/0;t.forEach((d,f)=>{if(d[1]>1)return;let p=Math.abs(d[0]-n.guide(0));p<s&&(s=p,i=f)});let a=new Float64Array(t.length).fill(1/0),o=new Int32Array(t.length).fill(-1),l=new Bi;a[i]=0,l.push(i,0);let c=-1;for(;l.size;){let d=l.pop();if(t[d][1]>=hn-1){c=d;break}for(let f of this.vAdj[d]||[]){let p=this.vEdge(d,f),[y,g]=t[d],[m,b]=t[f],E=Math.hypot(m-y,b-g),_=(y+m)/2,S=(g+b)/2,v=(_-n.guide(S))/55,A=E*(1+v*v);b<g&&(A*=3),p.cells.length<2&&S>2&&S<hn-2&&(A*=40),p.cells.some(e)&&(A*=20),p.cells.some(T=>this.cells[T].loc!==null)&&(A*=1.5);let x=a[d]+A;x<a[f]&&(a[f]=x,o[f]=d,l.push(f,x+(hn-b)*.9))}}let h=[];for(let d=c;d>=0;d=o[d])h.push(d);h.reverse();for(let d=0;d<h.length-1;d++){let f=this.vEdge(h[d],h[d+1]);if(f&&f.cells.length===2){let p=this.edge(f.cells[0],f.cells[1]);p&&(p.river=n.key)}}let u=h.map(d=>[t[d][0],t[d][1]]);u[0]=[u[0][0],-60],u[u.length-1]=[u[u.length-1][0],hn+60],this.rivers.push({key:n.key,name:n.name,raw:u,pts:lr(u,3)})}}cellPath(t,e,n){let i=this.cells.length,s=new Float64Array(i).fill(1/0),a=new Int32Array(i).fill(-1),o=new Bi;s[t]=0,o.push(t,0);let l=this.cells[e];for(;o.size;){let h=o.pop();if(h===e)break;let u=this.cells[h];for(let d of u.nbrs){let f=n(h,d);if(!isFinite(f))continue;let p=s[h]+f;if(p<s[d]){s[d]=p,a[d]=h;let y=this.cells[d];o.push(d,p+Math.hypot(y.x-l.x,y.y-l.y)*.3)}}}if(!isFinite(s[e]))return null;let c=[];for(let h=e;h>=0;h=a[h])c.push(h);return c.reverse()}roadCost(t,e){let n=this.cells[e],i=this.cells[t];if(n.terrain==="lake")return 1/0;let s=this.edge(t,e),a=n.terrain==="mountain"?5:n.terrain==="forest"?1.5:1,o=Math.hypot(n.x-i.x,n.y-i.y)*a;return s.road?o*=.3:s.river&&(o+=300),o}addRoad(t,e){let n=[];for(let i=0;i<t.length;i++){let s=this.cells[t[i]];if(s.road=!0,i>0){let a=this.edge(t[i-1],t[i]);if(a.road=!0,a.river&&!a.bridge){let o=this.cells[a.a],l=this.cells[a.b];a.bridge={id:this.bridges.length,a:a.a,b:a.b,x:a.mx,y:a.my,angle:Math.atan2(l.y-o.y,l.x-o.x),river:a.river,destroyedUntil:-1},this.bridges.push(a.bridge)}n.push([a.mx,a.my])}n.push([s.x,s.y])}this.roads.push({path:t,pts:lr(n,2),major:e})}buildRoads(){let t=[["sennai","osk"],["sennai","halden"],["sennai","mirel"],["osk","tamsk"],["tamsk","halden"],["osk","arden"],["arden","mirel"],["osk","drav"],["tamsk","kazan"],["kazan","vorsk"],["kazan","drav"],["drav","kharzad"],["drav","ketzen"],["kharzad","vorsk"],["kharzad","brask"],["brask","ketzen"],["arden","ketzen"],["halden","kazan"]];for(let[e,n]of t){let i=this.locByKey[e],s=this.locByKey[n],a=this.cellPath(i.cell,s.cell,(o,l)=>this.roadCost(o,l));a&&this.addRoad(a,!0)}}placeBridgeObjectives(){for(let t of vd){let e=null,n=1/0;for(let l of this.bridges){if(l.river!==t.river)continue;let c=Math.hypot(l.x-t.x,l.y-t.y);c<n&&(n=c,e=l)}if(!e){for(let h of this.edges.values()){if(h.river!==t.river)continue;let u=Math.hypot(h.mx-t.x,h.my-t.y);u<n&&(n=u,e=h)}let l=this.cells[e.a],c=this.cells[e.b];e.bridge={id:this.bridges.length,a:e.a,b:e.b,x:e.mx,y:e.my,angle:Math.atan2(c.y-l.y,c.x-l.x),river:t.river,destroyedUntil:-1},e.road=!0,this.bridges.push(e.bridge),e=e.bridge}let i=this.cells[e.a],s=this.cells[e.b],a=t.bank==="east"?i.x>s.x?i:s:i.x<s.x?i:s;a.loc!==null&&(a=a===i?s:i),e.objective=t.key;let o=this.addLocation({...t,type:"bridge"},a.id);o.bridge=e.id,a.terrain=a.terrain==="mountain"?"plains":a.terrain}}placeVillages(){let t=this.rng,e=t.shuffle(bd.slice()),n=this.cells.filter(s=>s.terrain!=="lake"&&s.terrain!=="mountain"&&s.loc===null&&s.x>60&&s.x<ei-60&&s.y>60&&s.y<hn-60);t.shuffle(n);let i=0;for(let s of n){if(i>=24)break;if(this.locations.some(h=>Math.hypot(h.x-s.x,h.y-s.y)<(h.type==="village"?250:210)))continue;let o=this.addLocation({key:"v"+i,name:e[i%e.length],type:"village",side:null},s.id),l=null,c=1/0;for(let h of this.locations){if(h.type==="village"||h.type==="bridge")continue;let u=Math.hypot(h.x-s.x,h.y-s.y);u<c&&(c=u,l=h)}if(l&&c<520){let h=this.cellPath(s.id,l.cell,(u,d)=>this.roadCost(u,d));if(h){let u=h.length;for(let d=1;d<h.length;d++)if(this.cells[h[d]].road){u=d+1;break}this.addRoad(h.slice(0,u),!1)}}o.village=!0,i++}}buildHeightmap(){let t=_c,e=Math.round((ei+2*_n)/t)+1,n=Math.round((hn+2*_n)/t)+1,i=new Float32Array(e*n),s=this.locations.filter(a=>a.type!=="bridge").map(a=>{let o=this.cells[a.cell],l=a.type==="capital"?78:a.type==="city"?62:a.type==="fort"?56:36;return{x:o.x,y:o.y,r:l,h:Math.max(4,Math.min(this.baseHeight(o.x,o.y),40))}});for(let a=0;a<n;a++){let o=-_n+a*t;for(let l=0;l<e;l++){let c=-_n+l*t,h=this.baseHeight(c,o);for(let u of s){let d=Math.hypot(c-u.x,o-u.y);d<u.r*1.6&&(h=_e(u.h,h,Fe(u.r*.55,u.r*1.6,d)))}for(let u of Aa){let d=Math.hypot(c-u.x,o-u.y)+14*this.noise3.get(c/40,o/40);d<u.r+45&&(h=_e(-16,h,Fe(u.r*.72,u.r+45,d)))}i[a*e+l]=h}}for(let a of this.rivers){let o=a.pts;for(let l=0;l<o.length-1;l++){let[c,h]=o[l],[u,d]=o[l+1],f=Math.min(c,u)-40,p=Math.max(c,u)+40,y=Math.min(h,d)-40,g=Math.max(h,d)+40,m=Math.max(0,Math.floor((f+_n)/t)),b=Math.min(e-1,Math.ceil((p+_n)/t)),E=Math.max(0,Math.floor((y+_n)/t)),_=Math.min(n-1,Math.ceil((g+_n)/t));for(let S=E;S<=_;S++)for(let v=m;v<=b;v++){let A=-_n+v*t,x=-_n+S*t,T=yc(A,x,c,h,u,d);if(T>24)continue;let R=S*e+v,P=_e(-10,i[R],Fe(5,21,T));P<i[R]&&(i[R]=P)}}}this.hm=i,this.hmW=e,this.hmH=n}heightAt(t,e){let n=(t+_n)/_c,i=(e+_n)/_c,s=$t(Math.floor(n),0,this.hmW-2),a=$t(Math.floor(i),0,this.hmH-2),o=$t(n-s,0,1),l=$t(i-a,0,1),c=this.hmW,h=this.hm[a*c+s],u=this.hm[a*c+s+1],d=this.hm[(a+1)*c+s],f=this.hm[(a+1)*c+s+1];return o+l<=1?h+(u-h)*o+(d-h)*l:f+(d-f)*(1-o)+(u-f)*(1-l)}finalizeCells(){for(let e of this.cells)e.h=this.heightAt(e.x,e.y),e.terrain!=="lake"&&e.loc===null&&e.h<Jt.WATER+2.5&&Aa.some(n=>Math.hypot(e.x-n.x,e.y-n.y)<n.r+70)&&(e.terrain="lake"),e.terrain==="lake"?e.owner=-1:e.owner=e.x<Ta(e.y)?V:ot,e.passable=e.terrain!=="lake";for(let e of this.locations)e.side!==null&&e.side!==void 0&&(this.cells[e.cell].owner=e.side),e.owner=this.cells[e.cell].owner;let t=ki*1.45;for(let e of this.cells){let n=new Set([e.id]);for(let i of e.nbrs){n.add(i);for(let s of this.cells[i].nbrs)n.add(s)}e.near=[...n].filter(i=>Math.hypot(this.cells[i].x-e.x,this.cells[i].y-e.y)<=t)}}terrainName(t){let e=this.cells[t];if(e.loc!==null){let n=this.locations[e.loc];if(n.type!=="village"&&n.type!=="bridge")return n.name}return Vn[e.terrain].name}placeName(t,e){let n=null,i=1/0;for(let s of this.locations){let a=Math.hypot(s.x-t,s.y-e);a<i&&(i=a,n=s)}return n?(i<60?"at ":"near ")+n.name:"at the front"}};var ur=34,Cd=[[0,0],[30,16],[-30,16],[0,-30],[30,-16],[-30,-16],[0,32]],Ld=1;function Dd(){Ld=1}function Nd(r,t){let e=Gn[t.type],n=t.max||e.max,i=t.side===V?1:r.diff.enemyStrength,s=r.map.cells[t.cell];return{id:Ld++,side:t.side,name:t.name,short:t.short,type:t.type,army:t.army||null,captain:t.captain||r.rng.pick(r.captainPool),max:Math.round(n*i),soldiers:Math.round((t.soldiers||n)*i),morale:t.morale??r.rng.float(.74,.9),org:t.org??r.rng.float(.82,1),xp:t.xp??8,x:s.x,y:s.y,cell:t.cell,heading:t.side===V?0:Math.PI,path:[],dest:null,restSlot:0,order:{type:"idle"},stance:"normal",entrench:0,battle:null,role:null,routed:!1,surrounded:!1,shakenUntil:-1,alive:!0,moving:!1,speedNow:0,lastRepath:0,warnedMorale:!1,stats:{won:0,lost:0,captured:0},task:null,born:r.time}}function Ud(r){return hr(r.xp)}function Mn(r){return r.soldiers/r.max}function Mc(r,t){return t.alive?t.routed?"Routed \u2014 regrouping":t.battle?t.role==="att"?"Attacking":"Under attack!":t.order.type==="retreat"?"Retreating":t.order.type==="reinforce"&&t.moving?"Moving to reinforce":t.order.type==="attack"&&t.moving?"Advancing to attack":t.moving?"Moving":t.stance==="defend"?t.entrench>.6?"Dug in":"Digging in":t.surrounded?"Surrounded!":t.org<.5?"Recovering":"Ready":"Destroyed"}function Fd(r,t,e,n){let i=r.map,s=i.cells[n],a=i.cells[e],o=(Vn[s.terrain].move+Vn[a.terrain].move)/2,l=i.edge(e,n);return l&&l.road&&a.road&&s.road&&(o=Math.max(o,1)*1.7),o}function Ca(r,t){return!t||!t.river?!1:!(t.bridge&&t.bridge.destroyedUntil<r.time)}function xi(r,t,e,n="move"){let i=r.map,s=t.cell;if(s===e)return[];let a=i.cells;if(!a[e].passable)return null;let o=a.length,l=new Float64Array(o).fill(1/0),c=new Int32Array(o).fill(-1),h=new Bi;l[s]=0,h.push(s,0);let u=a[e],d=Gn[t.type].speed,f=r.occupancy(),p=1-t.side;for(;h.size;){let g=h.pop();if(g===e)break;let m=a[g];for(let b of m.nbrs){let E=a[b];if(!E.passable)continue;let _=i.edge(g,b),v=Math.hypot(E.x-m.x,E.y-m.y)/(Fd(r,t,g,b)*d);if(Ca(r,_)&&(v+=150),f[p][b]>0){if(n==="retreat")continue;b!==e&&(v+=n==="attack"?160:260)}n==="retreat"&&E.owner===p&&(v*=4);let x=l[g]+v;x<l[b]&&(l[b]=x,c[b]=g,h.push(b,x+Math.hypot(E.x-u.x,E.y-u.y)/(1.7*d)))}}if(!isFinite(l[e]))return null;let y=[];for(let g=e;g!==s&&g>=0;g=c[g])y.push(g);return y.reverse()}function up(r,t){let e=r.map,n=0,i=t.x,s=t.y;for(let a of t.path){let o=e.cells[a];n+=Math.hypot(o.x-i,o.y-s),i=o.x,s=o.y}return n}function bc(r,t){let e=ur*Gn[t.type].speed*.85;return up(r,t)/e}function Id(r,t){let e=r.map.cells[t.cell],n=Cd[t.restSlot%Cd.length];return[e.x+n[0],e.y+n[1]]}function Bd(r,t){let e=new Set;for(let i of r.units)i!==t&&i.alive&&i.cell===t.cell&&!i.moving&&e.add(i.restSlot);let n=0;for(;e.has(n);)n++;t.restSlot=n}function rn(r,t,e){t.path=e||[],t.moving=t.path.length>0,t.entrench=0,t.moving&&(t.stance="normal"),t.moving||Bd(r,t)}function Pd(r,t,e){let n=r.map,i=n.cells[t.cell],s=n.edge(t.cell,e);return s?[_e(i.x,s.mx,.62),_e(i.y,s.my,.62)]:[i.x,i.y]}function dr(r,t,e,n){let i=t-r.x,s=e-r.y,a=Math.hypot(i,s);if(a<1e-6)return!0;let l=Math.atan2(s,i)-r.heading;for(;l>Math.PI;)l-=Math.PI*2;for(;l<-Math.PI;)l+=Math.PI*2;return r.heading+=l*Math.min(1,n*.08),a<=n?(r.x=t,r.y=e,!0):(r.x+=i/a*n,r.y+=s/a*n,!1)}function fp(r,t,e,n){let i=ur*Gn[t.type].speed*Fd(r,t,e,n);return r.weather.type==="rain"&&(i*=.72),r.weather.type==="fog"&&(i*=.9),t.org<.3&&(i*=.85),t.routed&&(i*=1.1),i}function Od(r,t,e){let n=r.map;if(t.battle){if(t.speedNow=0,t.role==="att"){let[u,d]=Pd(r,t,t.battle.cell);dr(t,u,d,ur*.6*e);let f=n.cells[t.battle.cell];t.heading=Math.atan2(f.y-t.y,f.x-t.x)}else{let[u,d]=Id(r,t);dr(t,u,d,ur*.4*e);let f=t.battle.attackers[0];f&&(t.heading=Math.atan2(f.y-t.y,f.x-t.x))}return}if(!t.path.length){t.moving=!1,t.speedNow=0;let[u,d]=Id(r,t);dr(t,u,d,ur*.5*e);return}t.moving=!0;let i=t.path[0],s=n.edge(t.cell,i);if(!s){rn(r,t,[]);return}let a=fp(r,t,t.cell,i),o=Math.hypot(s.mx-t.x,s.my-t.y);Ca(r,s)&&o<26&&(a*=.3),t.speedNow=a;let l=a*e,c=r.enemiesInCell(t.side,i);if(c.length&&!t.routed&&r.aiSides.has(t.side)&&!r.combat.battleAt(i)){let u=t.order.type==="move"?1.2:t.task?.kind==="offensive"?.55:.75;if(!r.ai.goodOdds(t,i,u)){rn(r,t,[]),t.order={type:"idle"},t.task&&t.task.kind!=="garrison"&&(t.task.until=r.time);return}}if(c.length&&!t.routed&&t.order.type==="reinforce"){let u=r.unitById.get(t.order.unit);if(!u||!u.alive||!u.battle||u.battle.cell!==i){rn(r,t,[]),r.orders.refresh(t);return}}if(c.length&&!t.routed){let[u,d]=Pd(r,t,i);(dr(t,u,d,l)||Math.hypot(u-t.x,d-t.y)<6)&&r.combat.startAttack(t,i);return}if(c.length&&t.routed){r.orders.retreat(t,!0);return}dr(t,s.mx,s.my,l)&&(r.enterCell(t,i),t.path.shift(),t.path.length||Bd(r,t))}function kd(r,t,e){if(t.battle)return;let n=r.map,i=n.cells[t.cell],s=i.loc!==null?n.locations[i.loc]:null,a=s&&i.owner===t.side&&!t.surrounded,o=r.collapsing[t.side]?t.side===V?.85:.5:1;if(t.surrounded)t.morale=Math.max(0,t.morale-.007*e),t.org=Math.min(.6,t.org+.01*e);else{let l=(t.moving?.03:.07)*(t.morale<.3?.6:1);t.org=Math.min(1,t.org+l*e);let c=.006;a&&(c+=r.locMorale(s)),t.morale=Math.min(1,t.morale+c*e*o),a&&(t.soldiers=Math.min(t.max,t.soldiers+r.locHeal(s)*e))}if(!t.moving){let l=t.stance==="defend"?1:.45;t.entrench<l&&(t.entrench=Math.min(l,t.entrench+(t.stance==="defend"?.1:.05)*e))}if(t.routed&&!t.moving&&t.org>.3&&t.morale>.18&&(t.routed=!1,t.order={type:"idle"},r.emit("feed",{kind:t.side===V?"info":"good",text:`${t.name} has regrouped`,unit:t})),t.routed&&!t.moving&&!t.path.length&&r.time-(t.routedAt||0)>30&&(t.routed=!1,t.order={type:"idle"}),t.type==="medical"&&!t.moving)for(let l of r.units)!l.alive||l.side!==t.side||l===t||Math.hypot(l.x-t.x,l.y-t.y)>Jt.CELL*1.8||(l.soldiers=Math.min(l.max,l.soldiers+6*e),l.morale=Math.min(1,l.morale+.01*e),l.org=Math.min(1,l.org+.02*e))}function zd(r){r.morale=$t(r.morale,0,1),r.org=$t(r.org,0,1),r.soldiers=$t(r.soldiers,0,r.max)}var Ia=class{constructor(t){this.game=t}canCommand(t){return t.alive&&!t.routed}leaveBattle(t){t.battle&&(t.role==="def"?(t.org=Math.max(0,t.org-.08),t.soldiers*=.98):t.org=Math.max(0,t.org-.03),this.game.combat.removeUnit(t,"withdraw"))}move(t,e,n="move"){if(!this.canCommand(t))return!1;if(e===t.cell&&!t.battle)return rn(this.game,t,[]),t.order={type:"idle"},!0;let i=xi(this.game,t,e,n);return i?(this.leaveBattle(t),t.order={type:"move",cell:e},rn(this.game,t,i),!0):!1}attack(t,e){if(!this.canCommand(t))return!1;let n=this.game,i=e.unit?e.unit.cell:e.cell;if(i===t.cell)return!1;if(t.battle&&t.role==="att"&&t.battle.cell===i)return!0;let s=xi(n,t,i,"attack");return s?(this.leaveBattle(t),t.order={type:"attack",unit:e.unit?e.unit.id:null,cell:i},rn(n,t,s),!0):!1}defend(t){return this.canCommand(t)?(t.battle&&t.role==="att"&&this.leaveBattle(t),rn(this.game,t,[]),t.stance="defend",t.order={type:"defend"},!0):!1}safeCell(t){let e=this.game,n=e.map,i=e.units.filter(h=>h.alive&&h.side!==t.side&&!h.routed),s=new Map([[t.cell,0]]),a=[t.cell],o=null,l=1/0,c=e.supplied[t.side];for(;a.length;){let h=a.shift(),u=s.get(h),d=n.cells[h],f=1/0;for(let p of i)f=Math.min(f,Math.hypot(p.x-d.x,p.y-d.y));if(h!==t.cell&&d.owner===t.side){let p=d.loc!==null?n.locations[d.loc]:null,y=p&&p.type!=="village"&&p.type!=="bridge",g=u*.55-Math.min(f,520)/75+(y?-2.5:0)+(c&&!c[h]?6:0);f<150&&(g+=8),g<l&&(l=g,o=h)}if(!(u>=14))for(let p of d.nbrs){let y=n.cells[p];s.has(p)||!y.passable||y.owner===t.side&&(e.enemiesInCell(t.side,p).length||(s.set(p,u+1),a.push(p)))}}return o}retreat(t,e=!1){let n=this.game;if(!t.alive||!e&&t.routed)return!1;let i=this.safeCell(t),s=i!==null?xi(n,t,i,"retreat"):null;return t.battle&&(e?n.combat.removeUnit(t,"rout"):this.leaveBattle(t)),s?(t.order={type:"retreat",cell:i},t.stance="normal",rn(n,t,s),!0):e?(n.destroyUnit(t,t.surrounded?"surrender":"destroyed"),!1):(rn(n,t,[]),t.order={type:"idle"},!1)}reinforceTarget(t){return t.battle?{cell:t.battle.cell,mode:t.role==="def"?"move":"attack"}:{cell:t.cell,mode:"move"}}reinforce(t,e){if(!this.canCommand(t)||!e||!e.alive||e===t||e.side!==t.side)return!1;let n=this.game,{cell:i,mode:s}=this.reinforceTarget(e);if(t.battle&&t.battle===e.battle&&t.role===e.role)return!0;let a=[];return i!==t.cell&&(a=xi(n,t,i,s),!a)?!1:(this.leaveBattle(t),t.order={type:"reinforce",unit:e.id,cell:i},rn(n,t,a),t.side===V&&e.battle&&n.emit("feed",{kind:"info",icon:"\u2192",text:`${t.short} \u2192 ${e.short}: reinforcements on the way`,unit:t}),!0)}refresh(t){let e=this.game,n=t.order;if(!(!t.alive||t.routed))if(n.type==="attack"&&n.unit){let i=e.unitById.get(n.unit);if(!i||!i.alive||i.routed){t.order=t.path.length?{type:"move",cell:n.cell}:{type:"idle"};return}if(!t.battle&&i.cell!==n.cell){let s=xi(e,t,i.cell,"attack");s&&(n.cell=i.cell,rn(e,t,s))}}else if(n.type==="reinforce"){let i=e.unitById.get(n.unit);if(!i||!i.alive){t.order={type:"idle"};return}if(t.battle)return;let s=this.reinforceTarget(i);if(s.cell!==n.cell||!t.path.length&&s.cell!==t.cell)if(s.cell===t.cell)rn(e,t,[]);else{let a=xi(e,t,s.cell,s.mode);a&&(n.cell=s.cell,rn(e,t,a))}else!t.path.length&&!i.battle&&i.cell===t.cell&&(t.order={type:"idle"})}else(n.type==="move"||n.type==="attack"||n.type==="retreat")&&!t.path.length&&!t.battle&&(t.order={type:"idle"})}};var pp=1,Pa=class{constructor(t){this.game=t,this.battles=[]}battleAt(t){return this.battles.find(e=>e.cell===t&&!e.over)||null}general(t){let e=this.game.armies[t.army];if(!e||!e.general)return null;let n=this.game.generals[e.general];return!n||n.woundedUntil>this.game.time?null:n}terrainDefense(t){let e=this.game.map,n=e.cells[t],i=Vn[n.terrain].defense;return n.loc!==null&&(i=Math.max(i,gi[e.locations[n.loc].type].defense)),i}crossingMult(t,e){let n=this.game.map.edge(t.cell,e.cell);return!n||!n.river?1:Ca(this.game,n)?.68:.85}power(t,e,n){let i=this.game,s=Gn[t.type],a=t.soldiers*(e==="att"?s.atk:s.def)*Ud(t).mult;a*=.3+.7*t.org,a*=.45+.55*t.morale;let o=this.general(t);if(o&&(o.trait==="Aggressive"&&e==="att"&&(a*=1.2),o.trait==="Defensive"&&e==="def"&&(a*=1.25),o.trait==="Reckless"&&e==="att"&&(a*=1.15),o.trait==="Strategist")){let c=(e==="att"?n.attackers:n.defenders).filter(h=>h!==t&&h.army===t.army).length;a*=1+.12*Math.min(3,c)}return t.surrounded&&(a*=.75),t.shakenUntil>i.time&&(a*=.85),i.collapsing[t.side]&&(a*=t.side===ot?.88:.96),e==="att"?(t.order.type==="attack"&&(a*=1.08),a*=this.crossingMult(t,n),i.weather.type==="rain"&&(a*=.88),i.weather.type==="fog"&&(a*=.92)):(a*=1+.4*t.entrench,t.stance==="defend"&&(a*=1.1)),t.surprisedUntil>i.time&&(a*=.7),a}sidePower(t,e){let n=e==="att"?t.attackers:t.defenders,i=0;for(let s of n)i+=this.power(s,e,t);return e==="def"&&(i*=this.terrainDefense(t.cell)*1.1),i}startAttack(t,e){let n=this.game,i=this.battleAt(e);if(t.battle&&t.battle!==i&&this.removeUnit(t,"switch"),i){if(i.defenders.length&&i.defenders[0].side===t.side)return;i.attackers.includes(t)||(i.attackers.push(t),t.battle=i,t.role="att",t.moving=!1,i.attackers.length>1&&(n.emit("feed",{kind:t.side===V?"good":"bad",icon:"\u2192",text:`Reinforcements arriving! ${t.short} joins the battle ${i.place}`,battle:i}),n.emit("float",{x:i.x,y:i.y,text:"REINFORCEMENTS!",side:t.side})));return}let s=n.unitsInCell(e).filter(l=>l.side!==t.side&&!l.routed);if(!s.length)return;let a=n.map.placeName(n.map.cells[e].x,n.map.cells[e].y);i={id:pp++,cell:e,x:n.map.cells[e].x,y:n.map.cells[e].y,attackers:[t],defenders:[],attSide:t.side,start:n.time,hours:0,place:a,adv:.5,swingSeed:Math.random()*100,nextRoll:n.time+2.5,log:[],over:!1,attStart:0,defStart:0,attLost:0,defLost:0},this.battles.push(i),t.battle=i,t.role="att",t.moving=!1;for(let l of s)l.battle&&(this.removeUnit(l,"flanked"),l.org=Math.max(0,l.org-.05),n.emit("feed",{kind:l.side===V?"bad":"good",icon:"\u26A0",text:`${l.short} attacked from the flank!`,unit:l})),i.defenders.push(l),l.battle=i,l.role="def";i.attStart=t.soldiers,i.defStart=s.reduce((l,c)=>l+c.soldiers,0),n.emit("battleStart",i);let o=s[0];o.side===V?n.emit("feed",{kind:"bad",icon:"\u2694",text:`${o.short} is under attack ${a}!`,battle:i,alert:!0}):n.emit("feed",{kind:"info",icon:"\u2694",text:`${t.short} attacks ${o.short} ${a}`,battle:i})}addDefender(t,e){t.defenders.includes(e)||(e.battle&&this.removeUnit(e,"switch"),t.defenders.push(e),e.battle=t,e.role="def",this.game.emit("feed",{kind:e.side===V?"good":"bad",icon:"\u2192",text:`Reinforcements arriving! ${e.short} joins the defense ${t.place}`,battle:t}),this.game.emit("float",{x:t.x,y:t.y,text:"REINFORCEMENTS!",side:e.side}))}removeUnit(t,e){let n=t.battle;n&&(n.attackers=n.attackers.filter(i=>i!==t),n.defenders=n.defenders.filter(i=>i!==t),t.battle=null,t.role=null,(e==="withdraw"||e==="rout")&&(n.lastLeft=t))}log(t,e){t.log.unshift({t:this.game.time,text:e}),t.log.length>6&&t.log.pop()}update(t){let e=this.game;for(let n of this.battles){if(n.over)continue;if(n.attackers=n.attackers.filter(x=>x.alive&&x.battle===n),n.defenders=n.defenders.filter(x=>x.alive&&x.battle===n),!n.attackers.length||!n.defenders.length){this.finish(n);continue}n.hours+=t;let i=this.sidePower(n,"att"),s=this.sidePower(n,"def"),a=.16*Math.sin(n.hours*.55+n.swingSeed)+.08*Math.sin(n.hours*1.7+n.swingSeed*2),o=i*(1+a),l=s*(1-a),c=$t(o/Math.max(1,l),.2,5);n.adv+=(o/(o+l)-n.adv)*Math.min(1,t*.8),n.ratio=c;let h=n.attackers.some(x=>x.type==="medical"),u=n.defenders.some(x=>x.type==="medical"),d=n.attackers.some(x=>x.type==="heavy"),f=n.defenders.some(x=>x.type==="heavy"),p=()=>.75+Math.random()*.5,y=.024*Math.pow(c,.85)*(d?1.12:1)*(u?.9:1),g=.025*Math.pow(1/c,.85)*(f?1.1:1)*(h?.9:1),m=.0068*Math.pow(c,.75)*(u?.78:1),b=.0075*Math.pow(1/c,.75)*(h?.78:1),E=.011*Math.pow(c,.85),_=.011*Math.pow(1/c,.85),S=(x,T,R,P)=>{let N=this.general(x),B=1,L=1;N&&N.trait==="Reckless"&&(B=1.15,L=.6);let O=x.soldiers;return x.org-=T*t*p(),x.soldiers-=x.soldiers*R*t*p()*B,x.morale-=P*t*p()*L*(x.org<.3?1.5:1),x.xp+=.5*t,zd(x),O-x.soldiers},v=0,A=0;for(let x of n.attackers)v+=S(x,g,b,_);for(let x of n.defenders)A+=S(x,y,m,E);n.attLost+=v,n.defLost+=A,n.pendingA=(n.pendingA||0)+v,n.pendingD=(n.pendingD||0)+A,(n.pendingA>25||n.pendingD>25)&&(e.emit("casualties",{b:n,a:Math.round(n.pendingA),d:Math.round(n.pendingD)}),n.pendingA=0,n.pendingD=0);for(let x of[...n.attackers,...n.defenders])x.morale<.35&&!x.warnedMorale&&(x.warnedMorale=!0,e.emit("feed",{kind:x.side===V?"bad":"good",icon:"\u26A0",text:`${x.short} is losing morale!`,battle:n}),this.log(n,`${x.short} is wavering`)),x.morale>.5&&(x.warnedMorale=!1);e.time>=n.nextRoll&&(n.nextRoll=e.time+2+Math.random()*2.5,this.rollBattleEvent(n,c));for(let x of[...n.attackers,...n.defenders])x.soldiers<Math.max(25,x.max*.06)?e.destroyUnit(x,"destroyed"):(x.org<=.03||x.morale<=.03)&&this.breakUnit(x,n);n.attackers=n.attackers.filter(x=>x.alive&&x.battle===n),n.defenders=n.defenders.filter(x=>x.alive&&x.battle===n),(!n.attackers.length||!n.defenders.length)&&this.finish(n)}this.battles=this.battles.filter(n=>!n.over||e.time-n.endTime<4)}rollBattleEvent(t,e){let n=this.game,i=Math.random(),s=t.attackers[Math.floor(Math.random()*t.attackers.length)],a=t.defenders[Math.floor(Math.random()*t.defenders.length)];if(!(!s||!a)){if(t.adv>.6&&i<.32){for(let l of t.defenders)l.org=Math.max(0,l.org-.08),l.morale=Math.max(0,l.morale-.03);let o=`${s.short} breaks through!`;this.log(t,o),n.emit("feed",{kind:s.side===V?"good":"bad",icon:"\u2694",text:o,battle:t}),n.emit("float",{x:t.x,y:t.y,text:"BREAKTHROUGH!",side:s.side}),n.emit("burst",{x:t.x,y:t.y,n:3})}else if(t.adv<.4&&i<.3){for(let l of t.attackers)l.org=Math.max(0,l.org-.06);let o=`${a.short} holds the line!`;this.log(t,o),n.emit("feed",{kind:a.side===V?"good":"bad",icon:"\u{1F6E1}",text:o,battle:t}),n.emit("float",{x:t.x,y:t.y,text:"HOLDING!",side:a.side})}else if(i<.06){let o=Math.random()<.5?s:a;o.morale=Math.max(0,o.morale-.12),o.org=Math.max(0,o.org-.05);let l=o.side===ot,c=l?`Enemy commander wounded! (${o.short})`:`Captain ${o.captain} of ${o.short} wounded!`;this.log(t,c),n.emit("feed",{kind:l?"good":"bad",icon:"\u2605",text:c,battle:t}),n.emit("float",{x:t.x,y:t.y,text:"COMMANDER WOUNDED",side:1-o.side})}else if(i<.45){let o=[`${s.short} presses the assault`,`Heavy fighting ${t.place}`,`${a.short} counterattacks`,"Casualties mounting on both sides",`${s.short} gains ground`];this.log(t,o[Math.floor(Math.random()*o.length)])}}}breakUnit(t,e){let n=this.game;t.morale=Math.max(0,t.morale-.05),t.routed=!0,t.routedAt=n.time,t.stats.lost++;let i=t.side===V;n.emit("feed",{kind:i?"bad":"good",icon:"\u26A0",text:`${t.short} forced to retreat!`,battle:e,unit:t}),n.emit("float",{x:t.x,y:t.y,text:"RETREATING",side:1-t.side}),this.log(e,`${t.short} breaks and retreats`),n.orders.retreat(t,!0)}finish(t){let e=this.game;if(t.over)return;t.over=!0,t.endTime=e.time;let n=t.attackers.length>0&&t.defenders.length===0;t.winner=n?t.attSide:1-t.attSide;let i=n?t.attackers:t.defenders;for(let a of i)a.morale=Math.min(1,a.morale+.07),a.xp+=3,a.stats.won++;for(let a of[...t.attackers,...t.defenders])a.battle=null,a.role=null;let s=t.winner===V;if(n){if(!(e.enemiesInCell(t.attSide,t.cell).length>0)){let l=[...t.attackers].sort((c,h)=>h.org*h.soldiers-c.org*c.soldiers)[0];l&&!l.path.length&&(l.path=[t.cell]),l&&l.path[0]!==t.cell&&e.map.edge(l.cell,t.cell)&&l.path.unshift(t.cell),l&&(l.moving=!0)}let o=s?`Enemy position ${t.place} captured!`:`Our position ${t.place} has fallen!`;e.emit("feed",{kind:s?"good":"bad",icon:"\u2694",text:o,battle:t}),e.emit("float",{x:t.x,y:t.y,text:s?"POSITION TAKEN!":"POSITION LOST",side:t.winner})}else{let a=s?`Enemy attack repulsed ${t.place}!`:`Our attack ${t.place} was repulsed`;e.emit("feed",{kind:s?"good":"bad",icon:"\u{1F6E1}",text:a,battle:t}),e.emit("float",{x:t.x,y:t.y,text:s?"ATTACK REPULSED!":"ATTACK FAILED",side:t.winner})}e.stats.battles++,s&&e.stats.battlesWon++,e.emit("battleEnd",t)}summary(t){let e=this.game,n=(o,l)=>o.reduce((c,h)=>c+l(h),0),i=(o,l)=>o.length?n(o,l)/o.length:0,s=e.units.filter(o=>{if(!o.alive||o.battle||o.order.type!=="reinforce")return!1;let l=e.unitById.get(o.order.unit);return l&&l.battle===t}),a=e.units.filter(o=>o.alive&&!o.battle&&o.order.type==="attack"&&o.order.cell===t.cell&&o.side===t.attSide);return{attSoldiers:n(t.attackers,o=>o.soldiers),defSoldiers:n(t.defenders,o=>o.soldiers),attMorale:i(t.attackers,o=>o.morale),defMorale:i(t.defenders,o=>o.morale),attOrg:i(t.attackers,o=>o.org),defOrg:i(t.defenders,o=>o.org),terrain:this.terrainDefense(t.cell),incoming:[...new Set([...s,...a])]}}};var mp=Jt.CELL*1.3,La=class{constructor(t){this.game=t;let e=t.map.cells.length;this.control=[new Uint8Array(e),new Uint8Array(e)],this.version=0,this.frontCache=null,this.frontVersion=-1}setOwner(t,e,n){let i=this.game,s=i.map.cells[t];if(s.owner===e||!s.passable)return!1;if(s.owner=e,this.version++,i.emit("captured",{cell:t,side:e}),s.loc!==null){let a=i.map.locations[s.loc];a.owner=e,n&&n.stats.captured++,i.onLocationCaptured(a,e,n)}return!0}updateZoc(){let t=this.game,e=t.map,[n,i]=this.control;n.fill(0),i.fill(0);let s=t.occupancy();for(let o of t.units){if(!o.alive||o.routed||o.order.type==="retreat")continue;let l=this.control[o.side];for(let c of e.cells[o.cell].near){let h=e.cells[c];Math.hypot(h.x-o.x,h.y-o.y)<=mp&&(l[c]=1)}}let a=[];for(let o of e.cells){if(!o.passable)continue;let l=o.owner,c=1-l;if(s[l][o.id]>0||s[c][o.id]>0||t.combat.battleAt(o.id))continue;let h=o.loc!==null?e.locations[o.loc]:null,u=h&&h.type!=="village";if(!u&&this.control[c][o.id]&&!this.control[l][o.id]){a.push([o.id,c]);continue}if(!this.control[l][o.id]){let d=0,f=0;for(let y of o.nbrs){let g=e.cells[y];g.passable&&(g.owner===l?d++:g.owner===c&&f++)}(u?d===0&&f>=1&&!this.isObjective(h):d<=1&&f>=4)&&a.push([o.id,c])}}for(let[o,l]of a)this.setOwner(o,l,null)}isObjective(t){let e=this.game.objectives;return e[V].includes(t.key)||e[ot].includes(t.key)}updateSupply(){let t=this.game,e=t.map,n=e.cells.length;for(let i of[V,ot]){let s=new Uint8Array(n),a=[];for(let l of e.cells){if(l.owner!==i)continue;let c=l.loc!==null?e.locations[l.loc]:null;(c&&(c.type==="capital"||c.type==="city"||c.type==="fort")||(i===V?l.x<70:l.x>Jt.W-70))&&(s[l.id]=1,a.push(l.id))}let o=0;for(;o<a.length;){let l=a[o++];for(let c of e.cells[l].nbrs)s[c]||e.cells[c].owner!==i||(s[c]=1,a.push(c))}t.supplied[i]=s}for(let i of t.units){if(!i.alive)continue;let s=i.surrounded;if(i.surrounded=!t.supplied[i.side][i.cell],i.surrounded&&!s){let a=i.side===V;t.emit("feed",{kind:a?"bad":"good",icon:"\u26A0",text:a?`${i.short} is surrounded!`:`Enemy ${i.short} is surrounded!`,unit:i,alert:a}),t.emit("float",{x:i.x,y:i.y,text:"SURROUNDED!",side:1-i.side})}}}controlShare(){let t=0,e=0;for(let n of this.game.map.cells)n.owner===V?t++:n.owner===ot&&e++;return t/Math.max(1,t+e)}frontLines(){if(this.frontVersion===this.version&&this.frontCache)return this.frontCache;let t=this.game.map,e=[];for(let l of t.cells){if(l.owner!==V)continue;let c=l.poly.length;for(let h=0;h<c;h++){let u=l.polyNbr[h];u<0||t.cells[u].owner===ot&&e.push([l.vids[h],l.vids[(h+1)%c]])}}let n=new Map;e.forEach((l,c)=>{for(let h of l)n.has(h)||n.set(h,[]),n.get(h).push(c)});let i=new Uint8Array(e.length),s=[],a=(l,c)=>{let h=[c],u=c,d=l;for(;;){i[d]=1;let f=e[d],p=f[0]===u?f[1]:f[0];h.push(p),u=p;let y=(n.get(u)||[]).filter(g=>!i[g]);if(!y.length)break;d=y[0]}return h};for(let[l,c]of n){if(c.length!==1)continue;let h=c[0];i[h]||s.push(a(h,l))}for(let l=0;l<e.length;l++)i[l]||s.push(a(l,e[l][0]));let o=t.verts;return this.frontCache=s.map(l=>{let c=l.map(u=>[o[u][0],o[u][1]]),h=l.length>3&&l[0]===l[l.length-1];return{pts:lr(h?c.slice(0,-1):c,2,h),closed:h}}).filter(l=>l.pts.length>1),this.frontVersion=this.version,this.frontCache}};var Da=class{constructor(t,e=ot){this.game=t,this.side=e,this.nextThink=2,this.nextOffensive=20+Math.random()*10,this.offensive=null,this.lostCells=[],t.on("siege",({cell:n,side:i})=>{i!==this.side&&this.lostCells.push({cell:n,t:t.time})}),t.on("captured",({cell:n,side:i})=>{if(i===this.side)return;let s=t.map.cells[n];s.loc!==null&&t.map.locations[s.loc].type!=="village"&&this.lostCells.push({cell:n,t:t.time})})}myUnits(){return this.game.units.filter(t=>t.alive&&t.side===this.side)}enemyUnits(){return this.game.units.filter(t=>t.alive&&t.side!==this.side)}power(t){return t.soldiers*(.3+.7*t.org)*(.45+.55*t.morale)}goodOdds(t,e,n=1.2){let i=this.game,a=i.enemiesInCell(t.side,e).reduce((l,c)=>l+this.power(c)*(1+.4*c.entrench),0)*i.combat.terrainDefense(e),o=this.power(t);for(let l of i.units)l===t||!l.alive||l.side!==t.side||l.routed||l.battle&&l.battle.cell===e&&(o+=this.power(l));return o*this.aggression(t)>a*n}aggression(t){let e=this.game.combat.general(t),n=this.game.diff.aiAggro;return e?.trait==="Aggressive"&&(n*=1.25),e?.trait==="Reckless"&&(n*=1.5),e?.trait==="Defensive"&&(n*=.8),this.game.collapsing[this.side]&&(n*=.7),n}free(t){return!t.battle&&!t.routed&&(!t.task||t.task.kind==="hold"||this.game.time>t.task.until)}assign(t,e,n){t.task={...e,until:this.game.time+n}}frontCells(){let t=this.game.map;return t.cells.filter(e=>e.owner===this.side&&e.passable&&e.nbrs.some(n=>t.cells[n].owner===1-this.side))}update(){let t=this.game;if(t.time<this.nextThink)return;this.nextThink=t.time+t.diff.aiThink*(.8+Math.random()*.4);let e=this.myUnits(),n=this.enemyUnits(),i=t.orders,s=t.map,a=(l,c)=>Math.hypot(l.x-c.x,l.y-c.y);for(let l of e){if(l.battle||l.routed)continue;(Mn(l)<.35||l.morale<.25||l.org<.2)&&l.task?.kind!=="recover"&&i.retreat(l)&&this.assign(l,{kind:"recover"},30),l.task?.kind==="recover"&&Mn(l)>.6&&l.morale>.5&&l.org>.7&&(l.task=null)}let o=s.locByKey[hs[this.side]];if(o.owner===this.side){let l=e.filter(u=>u.task?.kind==="garrison"&&u.task.cell===o.cell),h=n.filter(u=>a(u,o)<420).length?2:1;if(l.length<h){let u=e.filter(d=>this.free(d)&&d.task?.kind!=="recover"&&d.type!=="scout").sort((d,f)=>a(d,o)-a(f,o))[0];u&&i.move(u,o.cell)&&this.assign(u,{kind:"garrison",cell:o.cell},1e9)}for(let u of l)!u.battle&&u.cell!==o.cell&&!u.path.length?i.move(u,o.cell):!u.moving&&!u.battle&&u.stance!=="defend"&&u.cell===o.cell&&i.defend(u)}for(let l of t.combat.battles){if(l.over)continue;let c=l.attSide===this.side,h=c?l.attackers:l.defenders;if(!h.length)continue;let u=c?l.adv:1-l.adv,d=e.filter(f=>f.task?.kind==="reinforce"&&f.task.battle===l.id);if(u<.55&&d.length<2){let f=e.filter(p=>this.free(p)&&p.task?.kind!=="recover"&&p.task?.kind!=="garrison"&&p.type!=="medical"&&Mn(p)>.45).filter(p=>a(p,l)<Jt.CELL*7).sort((p,y)=>a(p,l)-a(y,l))[0];f&&i.reinforce(f,h[0])&&this.assign(f,{kind:"reinforce",battle:l.id},20)}for(let f of h)f.org<.1&&u<.3&&this.game.combat.general(f)?.trait!=="Reckless"&&Math.random()<.5&&i.retreat(f)&&this.assign(f,{kind:"recover"},24)}this.lostCells=this.lostCells.filter(l=>t.time-l.t<40&&(s.cells[l.cell].owner!==this.side||t.sieges.has(l.cell)));for(let l of this.lostCells){let c=s.cells[l.cell],h=e.filter(y=>y.task?.kind==="counter"&&y.task.cell===l.cell).length;if(h>=2)continue;let u=t.unitsInCell(l.cell).filter(y=>y.side!==this.side),d=u.reduce((y,g)=>y+this.power(g),0),f=e.filter(y=>this.free(y)&&y.task?.kind!=="recover"&&y.task?.kind!=="garrison"&&y.type!=="medical"&&Mn(y)>.5).filter(y=>a(y,c)<Jt.CELL*9).sort((y,g)=>a(y,c)-a(g,c)).slice(0,2-h),p=f.reduce((y,g)=>y+this.power(g),0);if(f.length&&p*this.aggression(f[0])>d*.8){for(let y of f)i.attack(y,{cell:l.cell})&&this.assign(y,{kind:"counter",cell:l.cell},24);u.length&&t.emit("feed",{kind:"bad",icon:"\u26A0",text:`Enemy counterattack ${t.map.placeName(c.x,c.y)}!`,cell:l.cell,alert:!0})}}for(let l of n){if(l.routed)continue;let c=this.power(l)*(l.battle?.7:1)*t.combat.terrainDefense(l.cell);if(!(Mn(l)<.55||l.morale<.4||l.surrounded||l.type==="medical"||l.type==="scout")||e.filter(f=>f.task?.kind==="hunt"&&f.task.target===l.id).length)continue;let d=e.filter(f=>this.free(f)&&!["recover","garrison","reinforce"].includes(f.task?.kind)&&f.type!=="medical"&&Mn(f)>.55).filter(f=>a(f,l)<Jt.CELL*6).sort((f,p)=>a(f,l)-a(p,l))[0];d&&this.power(d)*this.aggression(d)>c*1.3&&i.attack(d,{unit:l})&&this.assign(d,{kind:"hunt",target:l.id},18)}this.updateOffensive(e,n),this.holdLine(e,n)}updateOffensive(t,e){let n=this.game,i=n.map,s=n.orders;if(this.offensive){let d=this.offensive;if(d.units=d.units.filter(f=>f.alive&&f.task?.kind==="offensive"),n.time>d.until||!d.units.length||i.cells[d.target.cell].owner===this.side){for(let f of d.units)f.task=null;this.offensive=null}else for(let f of d.units)!f.battle&&!f.path.length&&!f.routed&&s.attack(f,{cell:d.target.cell});return}if(n.time<this.nextOffensive||n.collapsing[this.side])return;this.nextOffensive=n.time+(34+Math.random()*24)/n.diff.aiAggro;let a=n.objectives[this.side],o=i.locations.filter(d=>d.owner===1-this.side&&d.type!=="village"),l=null,c=-1/0,h=this.frontCells();for(let d of o){let f=1/0;for(let m of h)f=Math.min(f,Math.hypot(m.x-d.x,m.y-d.y));let y=e.filter(m=>Math.hypot(m.x-d.x,m.y-d.y)<Jt.CELL*3.5).reduce((m,b)=>m+this.power(b),0),g=(a.includes(d.key)?700:300)-f*1.4-y*.5+Math.random()*200;g>c&&(c=g,l=d)}if(!l)return;let u=t.filter(d=>this.free(d)&&!["recover","garrison"].includes(d.task?.kind)&&d.type!=="medical"&&Mn(d)>.6&&d.org>.6).sort((d,f)=>Math.hypot(d.x-l.x,d.y-l.y)-Math.hypot(f.x-l.x,f.y-l.y)).slice(0,3);if(!(u.length<2)){this.offensive={target:l,units:u,until:n.time+60};for(let d of u)n.orders.attack(d,{cell:l.cell})&&this.assign(d,{kind:"offensive"},60);n.emit("feed",{kind:"bad",icon:"\u26A0",text:`Enemy breakthrough attempt toward ${l.name}!`,cell:l.cell,alert:!0}),n.emit("banner",{text:"ENEMY OFFENSIVE",sub:`Stone forces are pushing toward ${l.name}`,kind:"bad"})}}holdLine(t,e){let n=this.game,i=n.map,s=n.orders,a=t.filter(u=>!u.battle&&!u.routed&&(!u.task||u.task.kind==="hold"||n.time>u.task.until)&&u.task?.kind!=="garrison"&&u.task?.kind!=="recover");if(!a.length)return;let o=this.frontCells();if(!o.length)return;let l=a.length,c=Jt.H/l,h=a.slice().sort((u,d)=>u.y-d.y);for(let u=0;u<l;u++){let d=h[u];if(d.type==="medical"){let v=t.filter(A=>A.battle).sort((A,x)=>A.org-x.org)[0];if(v&&!d.path.length){let A=this.behind(v.cell,2);A!==null&&A!==d.cell&&s.move(d,A)}d.task={kind:"hold",until:n.time+10};continue}let f=u*c,p=f+c,y=o.filter(v=>v.y>=f-20&&v.y<p+20),g=y.length?y:o,m=(f+p)/2,b=null,E=1/0;for(let v of g){let A=n.combat.terrainDefense(v.id),x=Math.abs(v.y-m)-A*60+Math.hypot(v.x-d.x,v.y-d.y)*.15;x<E&&(E=x,b=v)}if(!b)continue;let _=e.filter(v=>!v.routed&&Math.hypot(v.x-d.x,v.y-d.y)<Jt.CELL*2.2),S=_.sort((v,A)=>this.power(v)-this.power(A))[0];if(S){let v=this.power(d)*this.aggression(d)/(this.power(S)*n.combat.terrainDefense(S.cell));if((v>1.4||v>.95&&Math.random()<.1*this.aggression(d))&&s.attack(d,{unit:S})){this.assign(d,{kind:"probe",target:S.id},14);continue}}if(!_.length&&Math.random()<.3*this.aggression(d)){let v=i.cells[d.cell].nbrs.map(A=>i.cells[A]).filter(A=>A.passable&&A.owner!==this.side&&!n.enemiesInCell(this.side,A.id).length);if(v.length){let A=v[Math.floor(Math.random()*v.length)];if(s.move(d,A.id)){this.assign(d,{kind:"probe"},8);continue}}}d.cell!==b.id&&(!d.path.length||d.order.cell!==b.id)?Math.hypot(b.x-d.x,b.y-d.y)>Jt.CELL*.8&&s.move(d,b.id):!d.moving&&d.stance!=="defend"&&s.defend(d),d.task={kind:"hold",until:n.time+8}}}behind(t,e){let n=this.game.map,i=t;for(let s=0;s<e;s++){let a=n.cells[i],o=null,l=-1/0;for(let c of a.nbrs){let h=n.cells[c];if(!h.passable||h.owner!==this.side)continue;let u=this.side===ot?h.x-a.x:a.x-h.x;u>l&&(l=u,o=c)}if(o===null)break;i=o}return i}};var Na=class{constructor(t){this.game=t,this.next=16+Math.random()*8,this.barrages=[],this.nextReinf={[V]:54,[ot]:54/t.diff.enemyReinf},this.reinfIdx={[V]:0,[ot]:0}}update(t){let e=this.game,n=e.weather;n.type!=="clear"&&e.time>n.until&&(e.emit("feed",{kind:"info",icon:"\u2600",text:"The weather clears"}),e.weather={type:"clear",until:1/0}),this.updateBarrages();for(let o of[V,ot])e.time>=this.nextReinf[o]&&(this.nextReinf[o]=e.time+(o===V?62:62/e.diff.enemyReinf)*(.85+Math.random()*.3),this.spawnReinforcement(o));if(e.time<this.next)return;this.next=e.time+24+Math.random()*22;let i=[["rain",n.type==="clear"?1:0],["fog",n.type==="clear"?.9:0],["artillery",1.5],["topup",1],["general",.6],["bridge",.7],["surprise",1*e.diff.aiAggro],["collapse",e.combat.battles.some(o=>!o.over)?.8:0],["breakthrough",.6*e.diff.aiAggro]],s=i.reduce((o,l)=>o+l[1],0),a=Math.random()*s;for(let[o,l]of i)if(a-=l,a<=0){this.fire(o);break}}fire(t){let e=this.game;switch(t){case"rain":e.weather={type:"rain",until:e.time+10+Math.random()*10},e.emit("banner",{text:"HEAVY RAIN",sub:"Movement slowed, attacks weakened",kind:"info"}),e.emit("feed",{kind:"info",icon:"\u{1F327}",text:"Heavy rain: movement \u221228%, attacks \u221212%"});break;case"fog":e.weather={type:"fog",until:e.time+8+Math.random()*8},e.emit("banner",{text:"FOG ROLLS IN",sub:"Enemy positions hard to see",kind:"info"}),e.emit("feed",{kind:"info",icon:"\u{1F32B}",text:"Fog: distant enemy battalions are hidden"});break;case"artillery":this.artillery();break;case"topup":this.topUp(Math.random()<.5?V:ot);break;case"general":this.woundGeneral();break;case"bridge":this.blowBridge();break;case"surprise":this.surpriseAttack();break;case"collapse":this.moraleCollapse();break;case"breakthrough":e.ai.nextOffensive=e.time;break;default:break}}frontDistance(t,e){let n=this.game.territory.frontLines(),i=1/0;for(let s of n)for(let a=0;a<s.pts.length;a+=3){let o=s.pts[a];i=Math.min(i,Math.hypot(o[0]-t,o[1]-e))}return i}artillery(){let t=this.game,e=Math.random()<.5?V:ot,n=t.units.filter(a=>a.alive&&a.side!==e&&!a.routed&&this.frontDistance(a.x,a.y)<Jt.CELL*3);if(!n.length)return;let i=n[Math.floor(Math.random()*n.length)];this.barrages.push({side:e,target:i,shells:9+Math.floor(Math.random()*6),next:t.time});let s=e===V;t.emit("feed",{kind:s?"good":"bad",icon:"\u{1F4A5}",text:s?`Our artillery pounds ${i.short}!`:`Artillery barrage hits ${i.short}!`,unit:i,alert:!s}),t.emit("float",{x:i.x,y:i.y,text:"ARTILLERY BARRAGE",side:e})}updateBarrages(){let t=this.game;for(let e of this.barrages){if(t.time<e.next)continue;e.next=t.time+.18+Math.random()*.25,e.shells--;let n=e.target,i=n.x+(Math.random()-.5)*80,s=n.y+(Math.random()-.5)*80;t.emit("shell",{x:i,y:s}),n.alive&&Math.hypot(n.x-i,n.y-s)<46&&(n.soldiers=Math.max(1,n.soldiers-(8+Math.random()*14)*(1-n.entrench*.5)),n.org=Math.max(0,n.org-.035),n.morale=Math.max(0,n.morale-.012))}this.barrages=this.barrages.filter(e=>e.shells>0)}spawnReinforcement(t){let e=this.game,n=e.units.filter(p=>p.alive&&p.side===t).length,i=t===V?18:22,s=Ad[t];if(n>=i||this.reinfIdx[t]>=s.length){this.topUp(t);return}let a=e.map,o=a.locByKey[hs[t]];if(o.owner!==t&&(o=a.locations.find(p=>p.owner===t&&(p.type==="city"||p.type==="fort")),!o))return;let[l,c,h]=s[this.reinfIdx[t]++],u=Object.values(e.armies).find(p=>p.side===t),d=e.addUnit({side:t,name:l,short:c,type:h,cell:o.cell,army:u.id,xp:2});d.morale=.85;let f=t===V;e.emit("feed",{kind:f?"good":"bad",icon:"\u2192",text:f?`Reinforcements arrive: ${l} at ${o.name}`:`Enemy reinforcements spotted at ${o.name}`,unit:d}),f&&e.emit("banner",{text:"REINFORCEMENTS ARRIVE",sub:`${l} is ready at ${o.name}`,kind:"good"})}topUp(t){let e=this.game,n=e.units.filter(s=>s.alive&&s.side===t&&!s.battle).sort((s,a)=>Mn(s)-Mn(a)).slice(0,3);if(!n.length)return;for(let s of n)s.soldiers=Math.min(s.max,s.soldiers+s.max*.22),s.morale=Math.min(1,s.morale+.08);let i=t===V;e.emit("feed",{kind:i?"good":"bad",icon:"\u2192",text:i?`Replacements arrive for ${n.map(s=>s.short).join(", ")}`:"Enemy battalions receive fresh replacements"})}woundGeneral(){let t=this.game,e=Object.values(t.armies).filter(a=>a.general&&t.generals[a.general].woundedUntil<t.time);if(!e.length)return;let n=e[Math.floor(Math.random()*e.length)],i=t.generals[n.general];i.woundedUntil=t.time+30+Math.random()*20;for(let a of t.units)a.alive&&a.army===n.id&&(a.morale=Math.max(0,a.morale-.08));let s=n.side===V;t.emit("feed",{kind:s?"bad":"good",icon:"\u2605",text:s?`General ${i.name} wounded! ${n.name} loses the ${i.trait} bonus`:`Enemy General ${i.name} wounded! ${n.name} in disarray`}),t.emit("banner",{text:s?"GENERAL WOUNDED":"ENEMY GENERAL WOUNDED",sub:`${i.name} (${n.name}) is out of action`,kind:s?"bad":"good"})}blowBridge(){let t=this.game,e=t.map.bridges.filter(s=>s.destroyedUntil<t.time&&this.frontDistance(s.x,s.y)<Jt.CELL*5);if(!e.length)return;let n=e[Math.floor(Math.random()*e.length)];n.destroyedUntil=t.time+40+Math.random()*20;let i=t.map.placeName(n.x,n.y);t.emit("bridge",{bridge:n,destroyed:!0}),t.emit("explosion",{x:n.x,y:n.y,big:!0}),t.emit("feed",{kind:"info",icon:"\u{1F4A5}",text:`Bridge ${i} destroyed! Crossing is slow and costly`,x:n.x,y:n.y}),t.emit("banner",{text:"BRIDGE DESTROYED",sub:`The crossing ${i} is down`,kind:"info"})}surpriseAttack(){let t=this.game,e=t.units.filter(n=>n.alive&&n.side===ot&&!n.battle&&!n.routed&&Mn(n)>.6&&n.task?.kind!=="garrison");for(let n of e.sort(()=>Math.random()-.5)){let i=t.units.find(s=>s.alive&&s.side===V&&!s.battle&&!s.routed&&Math.hypot(s.x-n.x,s.y-n.y)<Jt.CELL*2.6);if(i&&t.orders.attack(n,{unit:i})){n.task={kind:"hunt",target:i.id,until:t.time+16},i.surprisedUntil=t.time+5,i.org=Math.max(0,i.org-.12),t.emit("feed",{kind:"bad",icon:"\u26A0",text:`Surprise attack! ${n.short} ambushes ${i.short}!`,unit:i,alert:!0}),t.emit("float",{x:i.x,y:i.y,text:"AMBUSH!",side:ot});return}}}moraleCollapse(){let t=this.game,e=t.units.filter(s=>s.alive&&s.battle&&!s.routed);if(!e.length)return;let n=e.sort((s,a)=>s.morale-a.morale)[0];n.morale=Math.max(0,n.morale-.25);let i=n.side===V;t.emit("feed",{kind:i?"bad":"good",icon:"\u26A0",text:`Morale collapse in ${n.short}!`,unit:n,alert:i}),t.emit("float",{x:n.x,y:n.y,text:"MORALE COLLAPSE",side:1-n.side})}};var Hd={capital:20,city:8,fort:12,bridge:6},fr=class{constructor(t,e="normal"){this.map=t,this.difficulty=e,this.diff=yd[e],this.rng=new vn(Date.now()&65535),this.captainPool=this.rng.shuffle(Sd.slice()),this.time=0,this.speed=1,this.paused=!1,this.listeners={},this.units=[],this.unitById=new Map,this.weather={type:"clear",until:1/0},this.supplied=[new Uint8Array(t.cells.length),new Uint8Array(t.cells.length)],this.collapsing=[!1,!1],this.objectives=sn,this.aiSides=new Set([ot]),this.over=null,this.stats={battles:0,battlesWon:0,enemyDestroyed:0,unitsLost:0,placesTaken:0,placesLost:0},this.acc={zoc:0,supply:0,hour:0},this.sieges=new Map,this.occ=[new Int16Array(t.cells.length),new Int16Array(t.cells.length)],this.occDirty=!0,this.generals={};for(let n of wd)this.generals[n.id]={...n,woundedUntil:-1};this.armies={};for(let n of Ed)this.armies[n.id]={...n};this.combat=new Pa(this),this.orders=new Ia(this),this.territory=new La(this),Dd(),this.placeStartingUnits(),this.ai=new Da(this,ot),this.events=new Na(this),this.territory.updateSupply(),this.startShare=this.territory.controlShare()}on(t,e){var n;((n=this.listeners)[t]||(n[t]=[])).push(e)}emit(t,e){for(let n of this.listeners[t]||[])n(e)}placeStartingUnits(){let t=this.map,e=new Set;for(let n of Td){let i;if(n.at)i=t.locByKey[n.at].cell;else{let o=Ta(n.y),l=n.side===V?o-n.depth:o+n.depth;i=t.nearestCell(l,n.y)}let s=o=>{let l=t.cells[o];return l.passable&&l.owner===n.side&&!e.has(o)};if(!s(i)){let o=t.cells[i],l=i,c=1/0;for(let h of t.cells){if(!s(h.id))continue;let u=Math.hypot(h.x-o.x,h.y-o.y);u<c&&(c=u,l=h.id)}i=l}e.add(i);let a=this.addUnit({...n,cell:i});a.entrench=.45}}addUnit(t){!t.captain&&this.captainPool.length&&(t={...t,captain:this.captainPool.pop()});let e=Nd(this,t);return this.units.push(e),this.unitById.set(e.id,e),this.occDirty=!0,this.emit("unitAdded",e),e}occupancy(){if(this.occDirty){this.occ[0].fill(0),this.occ[1].fill(0);for(let t of this.units)t.alive&&!t.routed&&this.occ[t.side][t.cell]++;this.occDirty=!1}return this.occ}unitsInCell(t){return this.units.filter(e=>e.alive&&e.cell===t)}enemiesInCell(t,e){return this.occupancy()[1-t][e]===0?[]:this.units.filter(n=>n.alive&&n.side!==t&&n.cell===e&&!n.routed)}locHeal(t){return gi[t.type].heal}locMorale(t){return gi[t.type].morale}general(t){let e=this.armies[t.army];return e&&e.general?this.generals[e.general]:null}isVisible(t){if(t.side===V||this.weather.type!=="fog"||t.battle)return!0;for(let e of this.units){if(!e.alive||e.side!==V)continue;let n=e.type==="scout"?430:250;if(Math.hypot(e.x-t.x,e.y-t.y)<n)return!0}return!1}dateString(){let t=this.time+6,e=Math.floor(t/24)+1,n=Math.floor(t%24);return{year:gd,day:e,hour:String(n).padStart(2,"0")+":00"}}enterCell(t,e){t.cell=e,this.occDirty=!0;let n=this.map.cells[e];if(t.routed)return;for(let s of this.units)s.alive&&s.routed&&s.side!==t.side&&s.cell===e&&(s.soldiers*=.88,s.org=Math.max(0,s.org-.1));if(n.owner!==t.side){let s=n.loc!==null?this.map.locations[n.loc]:null;s&&Hd[s.type]?this.startSiege(e,s,t):this.territory.setOwner(e,t.side,t)}let i=this.combat.battleAt(e);i&&i.defenders.length&&i.defenders[0].side===t.side&&this.combat.addDefender(i,t)}startSiege(t,e,n){if(this.sieges.has(t))return;let i=Hd[e.type];this.sieges.set(t,{cell:t,loc:e,side:n.side,progress:0,need:i,start:this.time});let s=n.side===V,a=this.objectives[V].includes(e.key)||this.objectives[ot].includes(e.key);this.emit("siege",{cell:t,loc:e,side:n.side}),this.emit("feed",{kind:s?"good":"bad",icon:s?"\u2691":"\u26A0",text:s?`${n.short} is taking ${e.name} \u2014 hold it for ${i}h`:`${e.name} is under siege! It falls in ${i}h unless we drive them out`,cell:t,alert:!s}),!s&&(a||e.type==="capital")&&this.emit("banner",{text:`${e.name.toUpperCase()} UNDER SIEGE`,sub:`Send battalions to drive the enemy out \u2014 ${i}h left`,kind:"bad"})}updateSieges(t){for(let[e,n]of this.sieges){let i=this.units.filter(a=>a.alive&&!a.routed&&a.side===n.side&&a.cell===e),s=this.map.cells[e].owner;if(!i.length||s===n.side){this.sieges.delete(e),s!==n.side&&this.emit("feed",{kind:n.side===V?"bad":"good",icon:n.side===V?"\u26A0":"\u{1F6E1}",text:n.side===V?`Our siege of ${n.loc.name} was broken`:`The siege of ${n.loc.name} is lifted!`,cell:e});continue}i.some(a=>a.battle&&a.role==="def")||(n.progress+=t*(1+.25*(i.length-1)),n.progress>=n.need&&(this.sieges.delete(e),this.territory.setOwner(e,n.side,i[0])))}}destroyUnit(t,e){if(!t.alive)return;this.combat.removeUnit(t,"destroyed"),t.alive=!1,t.path=[],t.moving=!1,this.occDirty=!0;let n=t.side===V;n?this.stats.unitsLost++:this.stats.enemyDestroyed++;let i=e==="surrender"?"surrounded and forced to surrender":"destroyed";this.emit("feed",{kind:n?"bad":"good",icon:n?"\u2620":"\u2605",text:`${t.name} ${i}!`,x:t.x,y:t.y,alert:n}),this.emit("float",{x:t.x,y:t.y,text:e==="surrender"?"SURRENDERED":"DESTROYED",side:1-t.side}),this.emit("unitDestroyed",t)}onLocationCaptured(t,e,n){let i=e===V,s=t.type!=="village";s&&(i?this.stats.placesTaken++:this.stats.placesLost++);let a=this.objectives[V].includes(t.key)||this.objectives[ot].includes(t.key);if(s)for(let o of this.units)!o.alive||o.side===e||Math.hypot(o.x-t.x,o.y-t.y)<Jt.CELL*3&&(o.shakenUntil=this.time+24,o.morale=Math.max(0,o.morale-.06));(s||a)&&(this.emit("feed",{kind:i?"good":"bad",icon:i?"\u2691":"\u26A0",text:i?`${t.name} captured${n?" by "+n.short:""}!`:`${t.name} has fallen to the enemy!`,cell:t.cell,alert:!i}),this.emit("banner",{text:`${t.name.toUpperCase()} ${i?"CAPTURED":"LOST"}`,sub:i?a?"Objective secured \u2014 nearby enemy battalions are shaken":"The front advances":a?"A key objective has fallen!":"The enemy pushes forward",kind:i?"good":"bad"})),this.emit("locationCaptured",{loc:t,side:e}),this.checkObjectives()}objectivesHeld(t){return this.objectives[t].filter(e=>this.map.locByKey[e].owner===t).length}checkObjectives(){if(this.over)return;for(let n of[V,ot]){let i=1-n,a=this.objectivesHeld(n)>=2;if(a&&!this.collapsing[i]){this.collapsing[i]=!0;let o=i===V?.04:.1;for(let c of this.units)c.alive&&c.side===i&&(c.morale=Math.max(0,c.morale-o));let l=i===V;this.emit("banner",{text:l?"OUR FRONT IS COLLAPSING":"ENEMY FRONT COLLAPSING",sub:l?"Retake our objectives before the army breaks!":"Press the attack \u2014 victory is within reach",kind:l?"bad":"good",big:!0})}else!a&&this.collapsing[i]&&(this.collapsing[i]=!1,this.emit("feed",{kind:"info",icon:"\u2691",text:`The ${Ce[i].short} front stabilizes`}))}let t=n=>this.map.locByKey[hs[n]].owner!==n,e=n=>this.units.filter(i=>i.alive&&i.side===n).length<=1;t(ot)||this.objectivesHeld(V)===this.objectives[V].length||e(ot)?this.end(V,t(ot)?"Kharzad has fallen. The Stone Dominion surrenders.":e(ot)?"The Stone army has been destroyed.":"Every objective is in Leaf hands. The enemy sues for peace."):(t(V)||this.objectivesHeld(ot)===this.objectives[ot].length||e(V))&&this.end(ot,t(V)?"Sennai has fallen.":e(V)?"Our army has been destroyed.":"The enemy holds all of our key positions.")}end(t,e){this.over||(this.over={winner:t,reason:e,time:this.time},this.emit("gameOver",this.over))}update(t){if(this.paused||this.over)return;let e=Math.min(t,.1)*xd*this.speed;for(;e>1e-6;){let n=Math.min(e,.2);if(this.step(n),e-=n,this.over)break}}step(t){this.time+=t,this.occDirty=!0;for(let e of this.units)e.alive&&Od(this,e,t);this.combat.update(t),this.updateSieges(t);for(let e of this.units)e.alive&&kd(this,e,t);if(this.acc.zoc+=t,this.acc.supply+=t,this.acc.hour+=t,this.acc.zoc>=.5&&(this.acc.zoc=0,this.territory.updateZoc()),this.acc.supply>=2&&(this.acc.supply=0,this.territory.updateSupply()),this.acc.hour>=1){this.acc.hour=0;for(let e of this.units)e.alive&&this.orders.refresh(e);this.checkObjectives()}this.ai.update(),this.events.update(t)}};var Au=0,hh=1,Ru=2;var Qi=1,Cu=2,qs=3,Ii=0,$e=1,Ye=2,wn=0,Pi=1,on=2,dh=3,uh=4,Iu=5;var ts=100,Pu=101,Lu=102,Du=103,Nu=104,Uu=200,Fu=201,Bu=202,Ou=203,fh=204,ph=205,ku=206,zu=207,Hu=208,Vu=209,Gu=210,Wu=211,Xu=212,qu=213,$u=214,fo=0,po=1,mo=2,Is=3,go=4,xo=5,yo=6,vo=7,mh=0,Yu=1,Zu=2,Fn=0,ia=1,sa=2,ra=3,es=4,aa=5,oa=6,la=7;var gh=300,Li=301,ns=302,tl=303,el=304,ca=306,qi=1e3,qn=1001,_o=1002,We=1003,Ju=1004;var ha=1005;var De=1006,nl=1007;var jn=1008;var ln=1009,xh=1010,yh=1011,$s=1012,il=1013,Bn=1014,En=1015,ke=1016,sl=1017,rl=1018,Ys=1020,vh=35902,_h=35899,Mh=1021,bh=1022,cn=1023,$n=1026,Di=1027,al=1028,ol=1029,Ni=1030,ll=1031;var cl=1033,da=33776,ua=33777,fa=33778,pa=33779,hl=35840,dl=35841,ul=35842,fl=35843,pl=36196,ml=37492,gl=37496,xl=37488,yl=37489,ma=37490,vl=37491,_l=37808,Ml=37809,bl=37810,Sl=37811,wl=37812,El=37813,Tl=37814,Al=37815,Rl=37816,Cl=37817,Il=37818,Pl=37819,Ll=37820,Dl=37821,Nl=36492,Ul=36494,Fl=36495,Bl=36283,Ol=36284,ga=36285,kl=36286;var Ar=2300,Mo=2301,ho=2302,Kc=2303,jc=2400,Qc=2401,th=2402;var Ku=3200;var zl=0,ju=1,On="",Ge="srgb",Rr="srgb-linear",Cr="linear",pe="srgb";var uo=7680;var Qu=519,tf=512,ef=513,nf=514,Hl=515,sf=516,rf=517,Vl=518,af=519,Sh=35044,di=35048;var wh="300 es",Dn=2e3,Ps=2001;function gp(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function xp(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Ir(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function of(){let r=Ir("canvas");return r.style.display="block",r}var Vd={},Ls=null;function Pr(...r){let t="THREE."+r.shift();Ls?Ls("log",t,...r):console.log(t,...r)}function lf(r){let t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=r[1];e&&e.isStackTrace?r[0]+=" "+e.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Ot(...r){r=lf(r);let t="THREE."+r.shift();if(Ls)Ls("warn",t,...r);else{let e=r[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...r)}}function Vt(...r){r=lf(r);let t="THREE."+r.shift();if(Ls)Ls("error",t,...r);else{let e=r[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...r)}}function Xi(...r){let t=r.join(" ");t in Vd||(Vd[t]=!0,Ot(...r))}function cf(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}var hf={[fo]:po,[mo]:yo,[go]:vo,[Is]:xo,[po]:fo,[yo]:mo,[vo]:go,[xo]:Is},Yn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,t);t.target=null}}},Je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Sc=Math.PI/180,bo=180/Math.PI;function ci(){let r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Je[r&255]+Je[r>>8&255]+Je[r>>16&255]+Je[r>>24&255]+"-"+Je[t&255]+Je[t>>8&255]+"-"+Je[t>>16&15|64]+Je[t>>24&255]+"-"+Je[e&63|128]+Je[e>>8&255]+"-"+Je[e>>16&255]+Je[e>>24&255]+Je[n&255]+Je[n>>8&255]+Je[n>>16&255]+Je[n>>24&255]).toLowerCase()}function se(r,t,e){return Math.max(t,Math.min(e,r))}function yp(r,t){return(r%t+t)%t}function wc(r,t,e){return(1-e)*r+e*t}function Xn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function be(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Ih=class Ih{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*i+t.x,this.y=s*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ih.prototype.isVector2=!0;var rt=Ih,Xe=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],f=s[a+1],p=s[a+2],y=s[a+3];if(u!==y||l!==d||c!==f||h!==p){let g=l*d+c*f+h*p+u*y;g<0&&(d=-d,f=-f,p=-p,y=-y,g=-g);let m=1-o;if(g<.9995){let b=Math.acos(g),E=Math.sin(b);m=Math.sin(m*b)/E,o=Math.sin(o*b)/E,l=l*m+d*o,c=c*m+f*o,h=h*m+p*o,u=u*m+y*o}else{l=l*m+d*o,c=c*m+f*o,h=h*m+p*o,u=u*m+y*o;let b=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=b,c*=b,h*=b,u*=b}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[a],d=s[a+1],f=s[a+2],p=s[a+3];return t[e]=o*p+h*u+l*f-c*d,t[e+1]=l*p+h*d+c*u-o*f,t[e+2]=c*p+h*f+o*d-l*u,t[e+3]=h*p-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(s/2),d=l(n/2),f=l(i/2),p=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:Ot("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(se(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,s=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+s*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+s*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Ph=class Ph{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Gd.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Gd.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-s*i),u=2*(s*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=i+l*u+s*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this.z=se(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this.z=se(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ec.copy(this).projectOnVector(t),this.sub(Ec)}reflect(t){return this.sub(Ec.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ph.prototype.isVector3=!0;var I=Ph,Ec=new I,Gd=new Xe,Lh=class Lh{constructor(t,e,n,i,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,l,c)}set(t,e,n,i,s,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],y=i[0],g=i[3],m=i[6],b=i[1],E=i[4],_=i[7],S=i[2],v=i[5],A=i[8];return s[0]=a*y+o*b+l*S,s[3]=a*g+o*E+l*v,s[6]=a*m+o*_+l*A,s[1]=c*y+h*b+u*S,s[4]=c*g+h*E+u*v,s[7]=c*m+h*_+u*A,s[2]=d*y+f*b+p*S,s[5]=d*g+f*E+p*v,s[8]=d*m+f*_+p*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*s,f=c*s-a*l,p=e*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/p;return t[0]=u*y,t[1]=(i*c-h*n)*y,t[2]=(o*n-i*a)*y,t[3]=d*y,t[4]=(h*e-i*l)*y,t[5]=(i*s-o*e)*y,t[6]=f*y,t[7]=(n*l-c*e)*y,t[8]=(a*e-n*s)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Xi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Tc.makeScale(t,e)),this}rotate(t){return Xi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Tc.makeRotation(-t)),this}translate(t,e){return Xi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Tc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Lh.prototype.isMatrix3=!0;var Xt=Lh,Tc=new Xt,Wd=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xd=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function vp(){let r={enabled:!0,workingColorSpace:Rr,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===pe&&(i.r=hi(i.r),i.g=hi(i.g),i.b=hi(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===pe&&(i.r=Cs(i.r),i.g=Cs(i.g),i.b=Cs(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===On?Cr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Xi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Xi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Rr]:{primaries:t,whitePoint:n,transfer:Cr,toXYZ:Wd,fromXYZ:Xd,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ge},outputColorSpaceConfig:{drawingBufferColorSpace:Ge}},[Ge]:{primaries:t,whitePoint:n,transfer:pe,toXYZ:Wd,fromXYZ:Xd,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ge}}}),r}var ee=vp();function hi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Cs(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var ds,So=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ds===void 0&&(ds=Ir("canvas")),ds.width=t.width,ds.height=t.height;let i=ds.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=ds}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ir("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=hi(s[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(hi(e[n]/255)*255):e[n]=hi(e[n]);return{data:e,width:t.width,height:t.height}}else return Ot("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},_p=0,Ds=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:_p++}),this.uuid=ci(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Ac(i[a].image)):s.push(Ac(i[a]))}else s=Ac(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function Ac(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?So.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Ot("Texture: Unable to serialize Texture."),{})}var Mp=0,Rc=new I,nn=class r extends Yn{constructor(t=r.DEFAULT_IMAGE,e=r.DEFAULT_MAPPING,n=qn,i=qn,s=De,a=jn,o=cn,l=ln,c=r.DEFAULT_ANISOTROPY,h=On){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Mp++}),this.uuid=ci(),this.name="",this.source=new Ds(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Rc).x}get height(){return this.source.getSize(Rc).y}get depth(){return this.source.getSize(Rc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Ot(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Ot(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==gh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case qi:t.x=t.x-Math.floor(t.x);break;case qn:t.x=t.x<0?0:1;break;case _o:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case qi:t.y=t.y-Math.floor(t.y);break;case qn:t.y=t.y<0?0:1;break;case _o:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};nn.DEFAULT_IMAGE=null;nn.DEFAULT_MAPPING=gh;nn.DEFAULT_ANISOTROPY=1;var Dh=class Dh{constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],y=l[2],g=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(c+1)/2,_=(f+1)/2,S=(m+1)/2,v=(h+d)/4,A=(u+y)/4,x=(p+g)/4;return E>_&&E>S?E<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(E),i=v/n,s=A/n):_>S?_<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(_),n=v/i,s=x/i):S<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(S),n=A/s,i=x/s),this.set(n,i,s,e),this}let b=Math.sqrt((g-p)*(g-p)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(g-p)/b,this.y=(u-y)/b,this.z=(d-h)/b,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this.z=se(this.z,t.z,e.z),this.w=se(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this.z=se(this.z,t,e),this.w=se(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Dh.prototype.isVector4=!0;var Te=Dh,wo=class extends Yn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:De,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Te(0,0,t,e),this.scissorTest=!1,this.viewport=new Te(0,0,t,e),this.textures=[];let i={width:t,height:e,depth:n.depth},s=new nn(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:De,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new Ds(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Pe=class extends wo{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Lr=class extends nn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=We,this.minFilter=We,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Eo=class extends nn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=We,this.minFilter=We,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Qo=class Qo{constructor(t,e,n,i,s,a,o,l,c,h,u,d,f,p,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,l,c,h,u,d,f,p,y,g)}set(t,e,n,i,s,a,o,l,c,h,u,d,f,p,y,g){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=y,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qo().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/us.setFromMatrixColumn(t,0).length(),s=1/us.setFromMatrixColumn(t,1).length(),a=1/us.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){let d=a*h,f=a*u,p=o*h,y=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+p*c,e[5]=d-y*c,e[9]=-o*l,e[2]=y-d*c,e[6]=p+f*c,e[10]=a*l}else if(t.order==="YXZ"){let d=l*h,f=l*u,p=c*h,y=c*u;e[0]=d+y*o,e[4]=p*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-p,e[6]=y+d*o,e[10]=a*l}else if(t.order==="ZXY"){let d=l*h,f=l*u,p=c*h,y=c*u;e[0]=d-y*o,e[4]=-a*u,e[8]=p+f*o,e[1]=f+p*o,e[5]=a*h,e[9]=y-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let d=a*h,f=a*u,p=o*h,y=o*u;e[0]=l*h,e[4]=p*c-f,e[8]=d*c+y,e[1]=l*u,e[5]=y*c+d,e[9]=f*c-p,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let d=a*l,f=a*c,p=o*l,y=o*c;e[0]=l*h,e[4]=y-d*u,e[8]=p*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+p,e[10]=d-y*u}else if(t.order==="XZY"){let d=a*l,f=a*c,p=o*l,y=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+y,e[5]=a*h,e[9]=f*u-p,e[2]=p*u-f,e[6]=o*h,e[10]=y*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(bp,t,Sp)}lookAt(t,e,n){let i=this.elements;return dn.subVectors(t,e),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),yi.crossVectors(n,dn),yi.lengthSq()===0&&(Math.abs(n.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),yi.crossVectors(n,dn)),yi.normalize(),Ua.crossVectors(dn,yi),i[0]=yi.x,i[4]=Ua.x,i[8]=dn.x,i[1]=yi.y,i[5]=Ua.y,i[9]=dn.y,i[2]=yi.z,i[6]=Ua.z,i[10]=dn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],y=n[6],g=n[10],m=n[14],b=n[3],E=n[7],_=n[11],S=n[15],v=i[0],A=i[4],x=i[8],T=i[12],R=i[1],P=i[5],N=i[9],B=i[13],L=i[2],O=i[6],q=i[10],z=i[14],j=i[3],H=i[7],Z=i[11],Y=i[15];return s[0]=a*v+o*R+l*L+c*j,s[4]=a*A+o*P+l*O+c*H,s[8]=a*x+o*N+l*q+c*Z,s[12]=a*T+o*B+l*z+c*Y,s[1]=h*v+u*R+d*L+f*j,s[5]=h*A+u*P+d*O+f*H,s[9]=h*x+u*N+d*q+f*Z,s[13]=h*T+u*B+d*z+f*Y,s[2]=p*v+y*R+g*L+m*j,s[6]=p*A+y*P+g*O+m*H,s[10]=p*x+y*N+g*q+m*Z,s[14]=p*T+y*B+g*z+m*Y,s[3]=b*v+E*R+_*L+S*j,s[7]=b*A+E*P+_*O+S*H,s[11]=b*x+E*N+_*q+S*Z,s[15]=b*T+E*B+_*z+S*Y,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],p=t[3],y=t[7],g=t[11],m=t[15],b=l*f-c*d,E=o*f-c*u,_=o*d-l*u,S=a*f-c*h,v=a*d-l*h,A=a*u-o*h;return e*(y*b-g*E+m*_)-n*(p*b-g*S+m*v)+i*(p*E-y*S+m*A)-s*(p*_-y*v+g*A)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(s*h-o*l)+i*(s*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],p=t[12],y=t[13],g=t[14],m=t[15],b=e*o-n*a,E=e*l-i*a,_=e*c-s*a,S=n*l-i*o,v=n*c-s*o,A=i*c-s*l,x=h*y-u*p,T=h*g-d*p,R=h*m-f*p,P=u*g-d*y,N=u*m-f*y,B=d*m-f*g,L=b*B-E*N+_*P+S*R-v*T+A*x;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/L;return t[0]=(o*B-l*N+c*P)*O,t[1]=(i*N-n*B-s*P)*O,t[2]=(y*A-g*v+m*S)*O,t[3]=(d*v-u*A-f*S)*O,t[4]=(l*R-a*B-c*T)*O,t[5]=(e*B-i*R+s*T)*O,t[6]=(g*_-p*A-m*E)*O,t[7]=(h*A-d*_+f*E)*O,t[8]=(a*N-o*R+c*x)*O,t[9]=(n*R-e*N-s*x)*O,t[10]=(p*v-y*_+m*b)*O,t[11]=(u*_-h*v-f*b)*O,t[12]=(o*T-a*P-l*x)*O,t[13]=(e*P-n*T+i*x)*O,t[14]=(y*E-p*S-g*b)*O,t[15]=(h*S-u*E+d*b)*O,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,a){return this.set(1,n,s,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,h=a+a,u=o+o,d=s*c,f=s*h,p=s*u,y=a*h,g=a*u,m=o*u,b=l*c,E=l*h,_=l*u,S=n.x,v=n.y,A=n.z;return i[0]=(1-(y+m))*S,i[1]=(f+_)*S,i[2]=(p-E)*S,i[3]=0,i[4]=(f-_)*v,i[5]=(1-(d+m))*v,i[6]=(g+b)*v,i[7]=0,i[8]=(p+E)*A,i[9]=(g-b)*A,i[10]=(1-(d+y))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),e.identity(),this;let a=us.set(i[0],i[1],i[2]).length(),o=us.set(i[4],i[5],i[6]).length(),l=us.set(i[8],i[9],i[10]).length();s<0&&(a=-a),Cn.copy(this);let c=1/a,h=1/o,u=1/l;return Cn.elements[0]*=c,Cn.elements[1]*=c,Cn.elements[2]*=c,Cn.elements[4]*=h,Cn.elements[5]*=h,Cn.elements[6]*=h,Cn.elements[8]*=u,Cn.elements[9]*=u,Cn.elements[10]*=u,e.setFromRotationMatrix(Cn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,i,s,a,o=Dn,l=!1){let c=this.elements,h=2*s/(e-t),u=2*s/(n-i),d=(e+t)/(e-t),f=(n+i)/(n-i),p,y;if(l)p=s/(a-s),y=a*s/(a-s);else if(o===Dn)p=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===Ps)p=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,s,a,o=Dn,l=!1){let c=this.elements,h=2/(e-t),u=2/(n-i),d=-(e+t)/(e-t),f=-(n+i)/(n-i),p,y;if(l)p=1/(a-s),y=a/(a-s);else if(o===Dn)p=-2/(a-s),y=-(a+s)/(a-s);else if(o===Ps)p=-1/(a-s),y=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Qo.prototype.isMatrix4=!0;var re=Qo,us=new I,Cn=new re,bp=new I(0,0,0),Sp=new I(1,1,1),yi=new I,Ua=new I,dn=new I,qd=new re,$d=new Xe,an=class r{constructor(t=0,e=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(se(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-se(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(se(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-se(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(se(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-se(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ot("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return qd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qd,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return $d.setFromEuler(this),this.setFromQuaternion($d,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};an.DEFAULT_ORDER="XYZ";var Ns=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},wp=0,Yd=new I,fs=new Xe,ni=new re,Fa=new I,pr=new I,Ep=new I,Tp=new Xe,Zd=new I(1,0,0),Jd=new I(0,1,0),Kd=new I(0,0,1),jd={type:"added"},Ap={type:"removed"},ps={type:"childadded",child:null},Cc={type:"childremoved",child:null},Be=class r extends Yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wp++}),this.uuid=ci(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let t=new I,e=new an,n=new Xe,i=new I(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new re},normalMatrix:{value:new Xt}}),this.matrix=new re,this.matrixWorld=new re,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ns,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.multiply(fs),this}rotateOnWorldAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.premultiply(fs),this}rotateX(t){return this.rotateOnAxis(Zd,t)}rotateY(t){return this.rotateOnAxis(Jd,t)}rotateZ(t){return this.rotateOnAxis(Kd,t)}translateOnAxis(t,e){return Yd.copy(t).applyQuaternion(this.quaternion),this.position.add(Yd.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zd,t)}translateY(t){return this.translateOnAxis(Jd,t)}translateZ(t){return this.translateOnAxis(Kd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ni.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Fa.copy(t):Fa.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),pr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ni.lookAt(pr,Fa,this.up):ni.lookAt(Fa,pr,this.up),this.quaternion.setFromRotationMatrix(ni),i&&(ni.extractRotation(i.matrixWorld),fs.setFromRotationMatrix(ni),this.quaternion.premultiply(fs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Vt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(jd),ps.child=t,this.dispatchEvent(ps),ps.child=null):Vt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ap),Cc.child=t,this.dispatchEvent(Cc),Cc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ni.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ni.multiply(t.parent.matrixWorld)),t.applyMatrix4(ni),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(jd),ps.child=t,this.dispatchEvent(ps),ps.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pr,t,Ep),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pr,Tp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,s=this.matrix.elements;s[12]+=e-s[0]*e-s[4]*n-s[8]*i,s[13]+=n-s[1]*e-s[5]*n-s[9]*i,s[14]+=i-s[2]*e-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));i.material=o}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(s(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),p=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Be.DEFAULT_UP=new I(0,1,0);Be.DEFAULT_MATRIX_AUTO_UPDATE=!0;Be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var li=class extends Be{constructor(){super(),this.isGroup=!0,this.type="Group"}},Rp={type:"move"},Us=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new li,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new li,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new li,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let y of t.hand.values()){let g=e.getJointPose(y,n),m=this._getHandJoint(c,y);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Rp)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new li;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},df={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vi={h:0,s:0,l:0},Ba={h:0,s:0,l:0};function Ic(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}var Rt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ge){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=ee.workingColorSpace){if(t=yp(t,1),e=se(e,0,1),n=se(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=Ic(a,s,t+1/3),this.g=Ic(a,s,t),this.b=Ic(a,s,t-1/3)}return ee.colorSpaceToWorking(this,i),this}setStyle(t,e=Ge){function n(s){s!==void 0&&parseFloat(s)<1&&Ot("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:Ot("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);Ot("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ge){let n=df[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ot("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=hi(t.r),this.g=hi(t.g),this.b=hi(t.b),this}copyLinearToSRGB(t){return this.r=Cs(t.r),this.g=Cs(t.g),this.b=Cs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ge){return ee.workingToColorSpace(Ke.copy(this),t),Math.round(se(Ke.r*255,0,255))*65536+Math.round(se(Ke.g*255,0,255))*256+Math.round(se(Ke.b*255,0,255))}getHexString(t=Ge){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.workingToColorSpace(Ke.copy(this),e);let n=Ke.r,i=Ke.g,s=Ke.b,a=Math.max(n,i,s),o=Math.min(n,i,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ee.workingColorSpace){return ee.workingToColorSpace(Ke.copy(this),e),t.r=Ke.r,t.g=Ke.g,t.b=Ke.b,t}getStyle(t=Ge){ee.workingToColorSpace(Ke.copy(this),t);let e=Ke.r,n=Ke.g,i=Ke.b;return t!==Ge?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(vi),this.setHSL(vi.h+t,vi.s+e,vi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(vi),t.getHSL(Ba);let n=wc(vi.h,Ba.h,e),i=wc(vi.s,Ba.s,e),s=wc(vi.l,Ba.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ke=new Rt;Rt.NAMES=df;var Dr=class r{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Rt(t),this.near=e,this.far=n}clone(){return new r(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Nr=class extends Be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new an,this.environmentIntensity=1,this.environmentRotation=new an,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},In=new I,ii=new I,Pc=new I,si=new I,ms=new I,gs=new I,Qd=new I,Lc=new I,Dc=new I,Nc=new I,Uc=new Te,Fc=new Te,Bc=new Te,oi=class r{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),In.subVectors(t,e),i.cross(In);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){In.subVectors(i,e),ii.subVectors(n,e),Pc.subVectors(t,e);let a=In.dot(In),o=In.dot(ii),l=In.dot(Pc),c=ii.dot(ii),h=ii.dot(Pc),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,p=(a*h-o*l)*d;return s.set(1-f-p,p,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,si)===null?!1:si.x>=0&&si.y>=0&&si.x+si.y<=1}static getInterpolation(t,e,n,i,s,a,o,l){return this.getBarycoord(t,e,n,i,si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,si.x),l.addScaledVector(a,si.y),l.addScaledVector(o,si.z),l)}static getInterpolatedAttribute(t,e,n,i,s,a){return Uc.setScalar(0),Fc.setScalar(0),Bc.setScalar(0),Uc.fromBufferAttribute(t,e),Fc.fromBufferAttribute(t,n),Bc.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Uc,s.x),a.addScaledVector(Fc,s.y),a.addScaledVector(Bc,s.z),a}static isFrontFacing(t,e,n,i){return In.subVectors(n,e),ii.subVectors(t,e),In.cross(ii).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return In.subVectors(this.c,this.b),ii.subVectors(this.a,this.b),In.cross(ii).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return r.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return r.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return r.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return r.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return r.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,a,o;ms.subVectors(i,n),gs.subVectors(s,n),Lc.subVectors(t,n);let l=ms.dot(Lc),c=gs.dot(Lc);if(l<=0&&c<=0)return e.copy(n);Dc.subVectors(t,i);let h=ms.dot(Dc),u=gs.dot(Dc);if(h>=0&&u<=h)return e.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(ms,a);Nc.subVectors(t,s);let f=ms.dot(Nc),p=gs.dot(Nc);if(p>=0&&f<=p)return e.copy(s);let y=f*c-l*p;if(y<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(n).addScaledVector(gs,o);let g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return Qd.subVectors(s,i),o=(u-h)/(u-h+(f-p)),e.copy(i).addScaledVector(Qd,o);let m=1/(g+y+d);return a=y*m,o=d*m,e.copy(n).addScaledVector(ms,a).addScaledVector(gs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Zn=class{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Pn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Pn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Pn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Pn):Pn.fromBufferAttribute(s,a),Pn.applyMatrix4(t.matrixWorld),this.expandByPoint(Pn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Oa.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Oa.copy(n.boundingBox)),Oa.applyMatrix4(t.matrixWorld),this.union(Oa)}let i=t.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Pn),Pn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(mr),ka.subVectors(this.max,mr),xs.subVectors(t.a,mr),ys.subVectors(t.b,mr),vs.subVectors(t.c,mr),_i.subVectors(ys,xs),Mi.subVectors(vs,ys),zi.subVectors(xs,vs);let e=[0,-_i.z,_i.y,0,-Mi.z,Mi.y,0,-zi.z,zi.y,_i.z,0,-_i.x,Mi.z,0,-Mi.x,zi.z,0,-zi.x,-_i.y,_i.x,0,-Mi.y,Mi.x,0,-zi.y,zi.x,0];return!Oc(e,xs,ys,vs,ka)||(e=[1,0,0,0,1,0,0,0,1],!Oc(e,xs,ys,vs,ka))?!1:(za.crossVectors(_i,Mi),e=[za.x,za.y,za.z],Oc(e,xs,ys,vs,ka))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Pn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Pn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ri),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},ri=[new I,new I,new I,new I,new I,new I,new I,new I],Pn=new I,Oa=new Zn,xs=new I,ys=new I,vs=new I,_i=new I,Mi=new I,zi=new I,mr=new I,ka=new I,za=new I,Hi=new I;function Oc(r,t,e,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Hi.fromArray(r,s);let o=i.x*Math.abs(Hi.x)+i.y*Math.abs(Hi.y)+i.z*Math.abs(Hi.z),l=t.dot(Hi),c=e.dot(Hi),h=n.dot(Hi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Ue=new I,Ha=new rt,Cp=0,ve=class extends Yn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Cp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Sh,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ha.fromBufferAttribute(this,e),Ha.applyMatrix3(t),this.setXY(e,Ha.x,Ha.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix3(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Xn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=be(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Xn(e,this.array)),e}setX(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Xn(e,this.array)),e}setY(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Xn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Xn(e,this.array)),e}setW(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=be(e,this.array),n=be(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=be(e,this.array),n=be(n,this.array),i=be(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=be(e,this.array),n=be(n,this.array),i=be(i,this.array),s=be(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Ur=class extends ve{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Fr=class extends ve{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ae=class extends ve{constructor(t,e,n){super(new Float32Array(t),e,n)}},Ip=new Zn,gr=new I,kc=new I,Jn=class{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Ip.setFromPoints(t).getCenter(n);let i=0;for(let s=0,a=t.length;s<a;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gr.subVectors(t,this.center);let e=gr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(gr,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(kc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gr.copy(t.center).add(kc)),this.expandByPoint(gr.copy(t.center).sub(kc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Pp=0,bn=new re,zc=new Be,_s=new I,un=new Zn,xr=new Zn,Ve=new I,ce=class r extends Yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pp++}),this.uuid=ci(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(gp(t)?Fr:Ur)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Xt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return bn.makeRotationFromQuaternion(t),this.applyMatrix4(bn),this}rotateX(t){return bn.makeRotationX(t),this.applyMatrix4(bn),this}rotateY(t){return bn.makeRotationY(t),this.applyMatrix4(bn),this}rotateZ(t){return bn.makeRotationZ(t),this.applyMatrix4(bn),this}translate(t,e,n){return bn.makeTranslation(t,e,n),this.applyMatrix4(bn),this}scale(t,e,n){return bn.makeScale(t,e,n),this.applyMatrix4(bn),this}lookAt(t){return zc.lookAt(t),zc.updateMatrix(),this.applyMatrix4(zc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_s).negate(),this.translate(_s.x,_s.y,_s.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,s=t.length;i<s;i++){let a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ae(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&Ot("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];un.setFromBufferAttribute(s),this.morphTargetsRelative?(Ve.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Ve),Ve.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Ve)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){let n=this.boundingSphere.center;if(un.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){let o=e[s];xr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ve.addVectors(un.min,xr.min),un.expandByPoint(Ve),Ve.addVectors(un.max,xr.max),un.expandByPoint(Ve)):(un.expandByPoint(xr.min),un.expandByPoint(xr.max))}un.getCenter(n);let i=0;for(let s=0,a=t.count;s<a;s++)Ve.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Ve));if(e)for(let s=0,a=e.length;s<a;s++){let o=e[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ve.fromBufferAttribute(o,c),l&&(_s.fromBufferAttribute(t,c),Ve.add(_s)),i=Math.max(i,n.distanceToSquared(Ve))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,s=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new ve(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let x=0;x<n.count;x++)o[x]=new I,l[x]=new I;let c=new I,h=new I,u=new I,d=new rt,f=new rt,p=new rt,y=new I,g=new I;function m(x,T,R){c.fromBufferAttribute(n,x),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,R),d.fromBufferAttribute(s,x),f.fromBufferAttribute(s,T),p.fromBufferAttribute(s,R),h.sub(c),u.sub(c),f.sub(d),p.sub(d);let P=1/(f.x*p.y-p.x*f.y);isFinite(P)&&(y.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(P),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(P),o[x].add(y),o[T].add(y),o[R].add(y),l[x].add(g),l[T].add(g),l[R].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let x=0,T=b.length;x<T;++x){let R=b[x],P=R.start,N=R.count;for(let B=P,L=P+N;B<L;B+=3)m(t.getX(B+0),t.getX(B+1),t.getX(B+2))}let E=new I,_=new I,S=new I,v=new I;function A(x){S.fromBufferAttribute(i,x),v.copy(S);let T=o[x];E.copy(T),E.sub(S.multiplyScalar(S.dot(T))).normalize(),_.crossVectors(v,T);let P=_.dot(l[x])<0?-1:1;a.setXYZW(x,E.x,E.y,E.z,P)}for(let x=0,T=b.length;x<T;++x){let R=b[x],P=R.start,N=R.count;for(let B=P,L=P+N;B<L;B+=3)A(t.getX(B+0)),A(t.getX(B+1)),A(t.getX(B+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new ve(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new I,s=new I,a=new I,o=new I,l=new I,c=new I,h=new I,u=new I;if(t)for(let d=0,f=t.count;d<f;d+=3){let p=t.getX(d+0),y=t.getX(d+1),g=t.getX(d+2);i.fromBufferAttribute(e,p),s.fromBufferAttribute(e,y),a.fromBufferAttribute(e,g),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ve.fromBufferAttribute(t,e),Ve.normalize(),t.setXYZ(e,Ve.x,Ve.y,Ve.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,p=0;for(let y=0,g=l.length;y<g;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*h;for(let m=0;m<h;m++)d[p++]=c[f++]}return new ve(d,h,u)}if(this.index===null)return Ot("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new r,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=t(l,n);e.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let s=t.morphAttributes;for(let c in s){let h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Br=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Sh,this.updateRanges=[],this.version=0,this.uuid=ci()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ci()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ci()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}},en=new I,Fs=class r{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)en.fromBufferAttribute(this,e),en.applyMatrix4(t),this.setXYZ(e,en.x,en.y,en.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)en.fromBufferAttribute(this,e),en.applyNormalMatrix(t),this.setXYZ(e,en.x,en.y,en.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)en.fromBufferAttribute(this,e),en.transformDirection(t),this.setXYZ(e,en.x,en.y,en.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Xn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=be(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=be(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=be(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=be(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=be(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Xn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Xn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Xn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Xn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=be(e,this.array),n=be(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=be(e,this.array),n=be(n,this.array),i=be(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=be(e,this.array),n=be(n,this.array),i=be(i,this.array),s=be(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){Pr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new ve(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new r(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Pr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Hc=new I,Lp=new I,Dp=new Xt,Ln=class{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Hc.subVectors(n,e).cross(Lp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let i=t.delta(Hc),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Dp.getNormalMatrix(t),i=this.coplanarPoint(Hc).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Np=0,Nn=class extends Yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=ci(),this.name="",this.type="Material",this.blending=Pi,this.side=Ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fh,this.blendDst=ph,this.blendEquation=ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Rt(0,0,0),this.blendAlpha=0,this.depthFunc=Is,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=uo,this.stencilZFail=uo,this.stencilZPass=uo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Ot(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Ot(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(e){let s=i(t.textures),a=i(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Rt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Ln().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new rt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new rt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Bs=class extends Nn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Rt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Ms,yr=new I,bs=new I,Ss=new I,ws=new rt,vr=new rt,uf=new re,Va=new I,_r=new I,Ga=new I,tu=new rt,Vc=new rt,eu=new rt,Or=class extends Be{constructor(t=new Bs){if(super(),this.isSprite=!0,this.type="Sprite",Ms===void 0){Ms=new ce;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Br(e,5);Ms.setIndex([0,1,2,0,2,3]),Ms.setAttribute("position",new Fs(n,3,0,!1)),Ms.setAttribute("uv",new Fs(n,2,3,!1))}this.geometry=Ms,this.material=t,this.center=new rt(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Vt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),bs.setFromMatrixScale(this.matrixWorld),uf.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ss.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&bs.multiplyScalar(-Ss.z);let n=this.material.rotation,i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));let a=this.center;Wa(Va.set(-.5,-.5,0),Ss,a,bs,i,s),Wa(_r.set(.5,-.5,0),Ss,a,bs,i,s),Wa(Ga.set(.5,.5,0),Ss,a,bs,i,s),tu.set(0,0),Vc.set(1,0),eu.set(1,1);let o=t.ray.intersectTriangle(Va,_r,Ga,!1,yr);if(o===null&&(Wa(_r.set(-.5,.5,0),Ss,a,bs,i,s),Vc.set(0,1),o=t.ray.intersectTriangle(Va,Ga,_r,!1,yr),o===null))return;let l=t.ray.origin.distanceTo(yr);l<t.near||l>t.far||e.push({distance:l,point:yr.clone(),uv:oi.getInterpolation(yr,Va,_r,Ga,tu,Vc,eu,new rt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Wa(r,t,e,n,i,s){ws.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?(vr.x=s*ws.x-i*ws.y,vr.y=i*ws.x+s*ws.y):vr.copy(ws),r.copy(t),r.x+=vr.x,r.y+=vr.y,r.applyMatrix4(uf)}var ai=new I,Gc=new I,Xa=new I,qa=new I,$i=class{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ai)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ai.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ai.copy(this.origin).addScaledVector(this.direction,e),ai.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Gc.copy(t).add(e).multiplyScalar(.5),Xa.copy(e).sub(t).normalize(),qa.copy(this.origin).sub(Gc);let s=t.distanceTo(e)*.5,a=-this.direction.dot(Xa),o=qa.dot(this.direction),l=-qa.dot(Xa),c=qa.lengthSq(),h=Math.abs(1-a*a),u,d,f,p;if(h>0)if(u=a*l-o,d=a*o-l,p=s*h,u>=0)if(d>=-p)if(d<=p){let y=1/h;u*=y,d*=y,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Gc).addScaledVector(Xa,d),f}intersectSphere(t,e){if(t.radius<0)return null;ai.subVectors(t.center,this.origin);let n=ai.dot(this.direction),i=ai.dot(ai)-n*n,s=t.radius*t.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(s=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,ai)!==null}intersectTriangle(t,e,n,i,s){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,u=t.x-a.x,d=t.y-a.y,f=t.z-a.z,p=e.x-a.x,y=e.y-a.y,g=e.z-a.z,m=n.x-a.x,b=n.y-a.y,E=n.z-a.z,_=Math.abs(l),S=Math.abs(c),v=Math.abs(h),A,x,T,R,P,N,B,L,O,q,z,j;if(_>=S&&_>=v?(T=l,N=u,O=p,j=m,l>=0?(A=c,x=h,R=d,P=f,B=y,L=g,q=b,z=E):(A=h,x=c,R=f,P=d,B=g,L=y,q=E,z=b)):S>=v?(T=c,N=d,O=y,j=b,c>=0?(A=h,x=l,R=f,P=u,B=g,L=p,q=E,z=m):(A=l,x=h,R=u,P=f,B=p,L=g,q=m,z=E)):(T=h,N=f,O=g,j=E,h>=0?(A=l,x=c,R=u,P=d,B=p,L=y,q=m,z=b):(A=c,x=l,R=d,P=u,B=y,L=p,q=b,z=m)),T===0)return null;let H=A/T,Z=x/T,Y=1/T,Et=R-H*N,Mt=P-Z*N,jt=B-H*O,Gt=L-Z*O,Yt=q-H*j,J=z-Z*j,et=Yt*Gt-J*jt,pt=Et*J-Mt*Yt,Bt=jt*Mt-Gt*Et;if(i){if(et<0||pt<0||Bt<0)return null}else if((et<0||pt<0||Bt<0)&&(et>0||pt>0||Bt>0))return null;let St=et+pt+Bt;if(St===0)return null;let kt=Y*(et*N+pt*O+Bt*j);return(St>0?kt<0:kt>0)?null:this.at(kt/St,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Sn=class extends Nn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=mh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},nu=new re,Vi=new $i,$a=new Jn,iu=new I,Ya=new I,Za=new I,Ja=new I,Wc=new I,Ka=new I,su=new I,ja=new I,oe=class extends Be{constructor(t=new ce,e=new Sn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(s&&o){Ka.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],u=s[l];h!==0&&(Wc.fromBufferAttribute(u,t),a?Ka.addScaledVector(Wc,h):Ka.addScaledVector(Wc.sub(e),h))}e.add(Ka)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$a.copy(n.boundingSphere),$a.applyMatrix4(s),Vi.copy(t.ray).recast(t.near),!($a.containsPoint(Vi.origin)===!1&&(Vi.intersectSphere($a,iu)===null||Vi.origin.distanceToSquared(iu)>(t.far-t.near)**2))&&(nu.copy(s).invert(),Vi.copy(t.ray).applyMatrix4(nu),!(n.boundingBox!==null&&Vi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Vi)))}_computeIntersections(t,e,n){let i,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,y=d.length;p<y;p++){let g=d[p],m=a[g.materialIndex],b=Math.max(g.start,f.start),E=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let _=b,S=E;_<S;_+=3){let v=o.getX(_),A=o.getX(_+1),x=o.getX(_+2);i=Qa(this,m,t,n,c,h,u,v,A,x),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{let p=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let g=p,m=y;g<m;g+=3){let b=o.getX(g),E=o.getX(g+1),_=o.getX(g+2);i=Qa(this,a,t,n,c,h,u,b,E,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,y=d.length;p<y;p++){let g=d[p],m=a[g.materialIndex],b=Math.max(g.start,f.start),E=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let _=b,S=E;_<S;_+=3){let v=_,A=_+1,x=_+2;i=Qa(this,m,t,n,c,h,u,v,A,x),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{let p=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let g=p,m=y;g<m;g+=3){let b=g,E=g+1,_=g+2;i=Qa(this,a,t,n,c,h,u,b,E,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}};function Up(r,t,e,n,i,s,a,o){let l;if(t.side===$e?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,t.side===Ii,o),l===null)return null;ja.copy(o),ja.applyMatrix4(r.matrixWorld);let c=e.ray.origin.distanceTo(ja);return c<e.near||c>e.far?null:{distance:c,point:ja.clone(),object:r}}function Qa(r,t,e,n,i,s,a,o,l,c){r.getVertexPosition(o,Ya),r.getVertexPosition(l,Za),r.getVertexPosition(c,Ja);let h=Up(r,t,e,n,Ya,Za,Ja,su);if(h){let u=new I;oi.getBarycoord(su,Ya,Za,Ja,u),i&&(h.uv=oi.getInterpolatedAttribute(i,o,l,c,u,new rt)),s&&(h.uv1=oi.getInterpolatedAttribute(s,o,l,c,u,new rt)),a&&(h.normal=oi.getInterpolatedAttribute(a,o,l,c,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new I,materialIndex:0};oi.getNormal(Ya,Za,Ja,d.normal),h.face=d,h.barycoord=u}return h}var Yi=class extends nn{constructor(t=null,e=1,n=1,i,s,a,o,l,c=We,h=We,u,d){super(null,a,o,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Os=class extends ve{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Es=new re,ru=new re,to=[],au=new Zn,Fp=new re,Mr=new oe,br=new Jn,fn=class extends oe{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Os(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Fp)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Zn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Es),au.copy(t.boundingBox).applyMatrix4(Es),this.boundingBox.union(au)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Jn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Es),br.copy(t.boundingSphere).applyMatrix4(Es),this.boundingSphere.union(br)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=t*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(Mr.geometry=this.geometry,Mr.material=this.material,Mr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),br.copy(this.boundingSphere),br.applyMatrix4(n),t.ray.intersectsSphere(br)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Es),ru.multiplyMatrices(n,Es),Mr.matrixWorld=ru,Mr.raycast(t,to);for(let a=0,o=to.length;a<o;a++){let l=to[a];l.instanceId=s,l.object=this,e.push(l)}to.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Os(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Yi(new Float32Array(i*this.count),i,this.count,al,En));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Gi=new Jn,Bp=new rt(.5,.5),eo=new I,ks=class{constructor(t=new Ln,e=new Ln,n=new Ln,i=new Ln,s=new Ln,a=new Ln){this.planes=[t,e,n,i,s,a]}set(t,e,n,i,s,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Dn,n=!1){let i=this.planes,s=t.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],u=s[5],d=s[6],f=s[7],p=s[8],y=s[9],g=s[10],m=s[11],b=s[12],E=s[13],_=s[14],S=s[15];if(i[0].setComponents(c-a,f-h,m-p,S-b).normalize(),i[1].setComponents(c+a,f+h,m+p,S+b).normalize(),i[2].setComponents(c+o,f+u,m+y,S+E).normalize(),i[3].setComponents(c-o,f-u,m-y,S-E).normalize(),n)i[4].setComponents(l,d,g,_).normalize(),i[5].setComponents(c-l,f-d,m-g,S-_).normalize();else if(i[4].setComponents(c-l,f-d,m-g,S-_).normalize(),e===Dn)i[5].setComponents(c+l,f+d,m+g,S+_).normalize();else if(e===Ps)i[5].setComponents(l,d,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Gi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Gi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Gi)}intersectsSprite(t){Gi.center.set(0,0,0);let e=Bp.distanceTo(t.center);return Gi.radius=.7071067811865476+e,Gi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Gi)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(eo.x=i.normal.x>0?t.max.x:t.min.x,eo.y=i.normal.y>0?t.max.y:t.min.y,eo.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(eo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Zi=class extends Nn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Rt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},To=new I,Ao=new I,ou=new re,Sr=new $i,no=new Jn,Xc=new I,lu=new I,Ro=class extends Be{constructor(t=new ce,e=new Zi){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)To.fromBufferAttribute(e,i-1),Ao.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=To.distanceTo(Ao);t.setAttribute("lineDistance",new ae(n,1))}else Ot("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),no.copy(n.boundingSphere),no.applyMatrix4(i),no.radius+=s,t.ray.intersectsSphere(no)===!1)return;ou.copy(i).invert(),Sr.copy(t.ray).applyMatrix4(ou);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let y=f,g=p-1;y<g;y+=c){let m=h.getX(y),b=h.getX(y+1),E=io(this,t,Sr,l,m,b,y);E&&e.push(E)}if(this.isLineLoop){let y=h.getX(p-1),g=h.getX(f),m=io(this,t,Sr,l,y,g,p-1);m&&e.push(m)}}else{let f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let y=f,g=p-1;y<g;y+=c){let m=io(this,t,Sr,l,y,y+1,y);m&&e.push(m)}if(this.isLineLoop){let y=io(this,t,Sr,l,p-1,f,p-1);y&&e.push(y)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function io(r,t,e,n,i,s,a){let o=r.geometry.attributes.position;if(To.fromBufferAttribute(o,i),Ao.fromBufferAttribute(o,s),e.distanceSqToSegment(To,Ao,Xc,lu)>n)return;Xc.applyMatrix4(r.matrixWorld);let c=t.ray.origin.distanceTo(Xc);if(!(c<t.near||c>t.far))return{distance:c,point:lu.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}var cu=new I,hu=new I,zs=class extends Ro{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)cu.fromBufferAttribute(e,i),hu.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+cu.distanceTo(hu);t.setAttribute("lineDistance",new ae(n,1))}else Ot("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Co=class extends Nn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},du=new re,eh=new $i,so=new Jn,ro=new I,kr=class extends Be{constructor(t=new ce,e=new Co){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),so.copy(n.boundingSphere),so.applyMatrix4(i),so.radius+=s,t.ray.intersectsSphere(so)===!1)return;du.copy(i).invert(),eh.copy(t.ray).applyMatrix4(du);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=d,y=f;p<y;p++){let g=c.getX(p);ro.fromBufferAttribute(u,g),uu(ro,g,l,i,t,e,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let p=d,y=f;p<y;p++)ro.fromBufferAttribute(u,p),uu(ro,p,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function uu(r,t,e,n,i,s,a){let o=eh.distanceSqToPoint(r);if(o<e){let l=new I;eh.closestPointToPoint(r,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var zr=class extends nn{constructor(t=[],e=Li,n,i,s,a,o,l,c,h){super(t,e,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Kn=class extends nn{constructor(t,e,n,i,s,a,o,l,c){super(t,e,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Si=class extends nn{constructor(t,e,n=Bn,i,s,a,o=We,l=We,c,h=$n,u=1){if(h!==$n&&h!==Di)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ds(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Io=class extends Si{constructor(t,e=Bn,n=Li,i,s,a=We,o=We,l,c=$n){let h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,i,s,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Hr=class extends nn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},me=class r extends ce{constructor(t=1,e=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;p("z","y","x",-1,-1,n,e,t,a,s,0),p("z","y","x",1,-1,n,e,-t,a,s,1),p("x","z","y",1,1,t,n,e,i,a,2),p("x","z","y",1,-1,t,n,-e,i,a,3),p("x","y","z",1,-1,t,e,n,i,s,4),p("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new ae(c,3)),this.setAttribute("normal",new ae(h,3)),this.setAttribute("uv",new ae(u,2));function p(y,g,m,b,E,_,S,v,A,x,T){let R=_/A,P=S/x,N=_/2,B=S/2,L=v/2,O=A+1,q=x+1,z=0,j=0,H=new I;for(let Z=0;Z<q;Z++){let Y=Z*P-B;for(let Et=0;Et<O;Et++){let Mt=Et*R-N;H[y]=Mt*b,H[g]=Y*E,H[m]=L,c.push(H.x,H.y,H.z),H[y]=0,H[g]=0,H[m]=v>0?1:-1,h.push(H.x,H.y,H.z),u.push(Et/A),u.push(1-Z/x),z+=1}}for(let Z=0;Z<x;Z++)for(let Y=0;Y<A;Y++){let Et=d+Y+O*Z,Mt=d+Y+O*(Z+1),jt=d+(Y+1)+O*(Z+1),Gt=d+(Y+1)+O*Z;l.push(Et,Mt,Gt),l.push(Mt,jt,Gt),j+=6}o.addGroup(f,j,T),f+=j,d+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Oe=class r extends ce{constructor(t=1,e=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],f=[],p=0,y=[],g=n/2,m=0;b(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new ae(u,3)),this.setAttribute("normal",new ae(d,3)),this.setAttribute("uv",new ae(f,2));function b(){let _=new I,S=new I,v=0,A=(e-t)/n;for(let x=0;x<=s;x++){let T=[],R=x/s,P=R*(e-t)+t;for(let N=0;N<=i;N++){let B=N/i,L=B*l+o,O=Math.sin(L),q=Math.cos(L);S.x=P*O,S.y=-R*n+g,S.z=P*q,u.push(S.x,S.y,S.z),_.set(O,A,q).normalize(),d.push(_.x,_.y,_.z),f.push(B,1-R),T.push(p++)}y.push(T)}for(let x=0;x<i;x++)for(let T=0;T<s;T++){let R=y[T][x],P=y[T+1][x],N=y[T+1][x+1],B=y[T][x+1];(t>0||T!==0)&&(h.push(R,P,B),v+=3),(e>0||T!==s-1)&&(h.push(P,N,B),v+=3)}c.addGroup(m,v,0),m+=v}function E(_){let S=p,v=new rt,A=new I,x=0,T=_===!0?t:e,R=_===!0?1:-1;for(let N=1;N<=i;N++)u.push(0,g*R,0),d.push(0,R,0),f.push(.5,.5),p++;let P=p;for(let N=0;N<=i;N++){let L=N/i*l+o,O=Math.cos(L),q=Math.sin(L);A.x=T*q,A.y=g*R,A.z=T*O,u.push(A.x,A.y,A.z),d.push(0,R,0),v.x=O*.5+.5,v.y=q*.5*R+.5,f.push(v.x,v.y),p++}for(let N=0;N<i;N++){let B=S+N,L=P+N;_===!0?h.push(L,L+1,B):h.push(L+1,L,B),x+=3}c.addGroup(m,x,_===!0?1:2),m+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},wi=class r extends Oe{constructor(t=1,e=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new r(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Po=class r extends ce{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let s=[],a=[];o(i),c(n),h(),this.setAttribute("position",new ae(s,3)),this.setAttribute("normal",new ae(s.slice(),3)),this.setAttribute("uv",new ae(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(b){let E=new I,_=new I,S=new I;for(let v=0;v<e.length;v+=3)f(e[v+0],E),f(e[v+1],_),f(e[v+2],S),l(E,_,S,b)}function l(b,E,_,S){let v=S+1,A=[];for(let x=0;x<=v;x++){A[x]=[];let T=b.clone().lerp(_,x/v),R=E.clone().lerp(_,x/v),P=v-x;for(let N=0;N<=P;N++)N===0&&x===v?A[x][N]=T:A[x][N]=T.clone().lerp(R,N/P)}for(let x=0;x<v;x++)for(let T=0;T<2*(v-x)-1;T++){let R=Math.floor(T/2);T%2===0?(d(A[x][R+1]),d(A[x+1][R]),d(A[x][R])):(d(A[x][R+1]),d(A[x+1][R+1]),d(A[x+1][R]))}}function c(b){let E=new I;for(let _=0;_<s.length;_+=3)E.x=s[_+0],E.y=s[_+1],E.z=s[_+2],E.normalize().multiplyScalar(b),s[_+0]=E.x,s[_+1]=E.y,s[_+2]=E.z}function h(){let b=new I;for(let E=0;E<s.length;E+=3){b.x=s[E+0],b.y=s[E+1],b.z=s[E+2];let _=g(b)/2/Math.PI+.5,S=m(b)/Math.PI+.5;a.push(_,1-S)}p(),u()}function u(){for(let b=0;b<a.length;b+=6){let E=a[b+0],_=a[b+2],S=a[b+4],v=Math.max(E,_,S),A=Math.min(E,_,S);v>.9&&A<.1&&(E<.2&&(a[b+0]+=1),_<.2&&(a[b+2]+=1),S<.2&&(a[b+4]+=1))}}function d(b){s.push(b.x,b.y,b.z)}function f(b,E){let _=b*3;E.x=t[_+0],E.y=t[_+1],E.z=t[_+2]}function p(){let b=new I,E=new I,_=new I,S=new I,v=new rt,A=new rt,x=new rt;for(let T=0,R=0;T<s.length;T+=9,R+=6){b.set(s[T+0],s[T+1],s[T+2]),E.set(s[T+3],s[T+4],s[T+5]),_.set(s[T+6],s[T+7],s[T+8]),v.set(a[R+0],a[R+1]),A.set(a[R+2],a[R+3]),x.set(a[R+4],a[R+5]),S.copy(b).add(E).add(_).divideScalar(3);let P=g(S);y(v,R+0,b,P),y(A,R+2,E,P),y(x,R+4,_,P)}}function y(b,E,_,S){S<0&&b.x===1&&(a[E]=b.x-1),_.x===0&&_.z===0&&(a[E]=S/2/Math.PI+.5)}function g(b){return Math.atan2(b.z,-b.x)}function m(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.vertices,t.indices,t.radius,t.detail)}};var pn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ot("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),s=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),i=0,s=n.length,a;e?a=e:a=t*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);let h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),l=e||(a.isVector2?new rt:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new I,i=[],s=[],a=[],o=new I,l=new re;for(let f=0;f<=t;f++){let p=f/t;i[f]=this.getTangentAt(p,new I)}s[0]=new I,a[0]=new I;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(se(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos(se(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(o.crossVectors(s[0],s[t]))>0&&(f=-f);for(let p=1;p<=t;p++)s[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),a[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Hs=class extends pn{constructor(t=0,e=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new rt){let n=e,i=Math.PI*2,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);let o=this.aStartAngle+t*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Lo=class extends Hs{constructor(t,e,n,i,s,a){super(t,e,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Eh(){let r=0,t=0,e=0,n=0;function i(s,a,o,l){r=s,t=o,e=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,u){let d=(a-s)/c-(o-s)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(s){let a=s*s,o=a*s;return r+t*s+e*a+n*o}}}var fu=new I,pu=new I,qc=new Eh,$c=new Eh,Yc=new Eh,Do=class extends pn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new I){let n=e,i=this.points,s=i.length,a=(s-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%s]:(pu.subVectors(i[0],i[1]).add(i[0]),c=pu);let u=i[o%s],d=i[(o+1)%s];if(this.closed||o+2<s?h=i[(o+2)%s]:(fu.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=fu),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(u),f),y=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);y<1e-4&&(y=1),p<1e-4&&(p=y),g<1e-4&&(g=y),qc.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,p,y,g),$c.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,p,y,g),Yc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,p,y,g)}else this.curveType==="catmullrom"&&(qc.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),$c.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Yc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(qc.calc(l),$c.calc(l),Yc.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new I().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function mu(r,t,e,n,i){let s=(n-t)*.5,a=(i-e)*.5,o=r*r,l=r*o;return(2*e-2*n+s+a)*l+(-3*e+3*n-2*s-a)*o+s*r+e}function Op(r,t){let e=1-r;return e*e*t}function kp(r,t){return 2*(1-r)*r*t}function zp(r,t){return r*r*t}function Er(r,t,e,n){return Op(r,t)+kp(r,e)+zp(r,n)}function Hp(r,t){let e=1-r;return e*e*e*t}function Vp(r,t){let e=1-r;return 3*e*e*r*t}function Gp(r,t){return 3*(1-r)*r*r*t}function Wp(r,t){return r*r*r*t}function Tr(r,t,e,n,i){return Hp(r,t)+Vp(r,e)+Gp(r,n)+Wp(r,i)}var Vr=class extends pn{constructor(t=new rt,e=new rt,n=new rt,i=new rt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new rt){let n=e,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Tr(t,i.x,s.x,a.x,o.x),Tr(t,i.y,s.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},No=class extends pn{constructor(t=new I,e=new I,n=new I,i=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new I){let n=e,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Tr(t,i.x,s.x,a.x,o.x),Tr(t,i.y,s.y,a.y,o.y),Tr(t,i.z,s.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Gr=class extends pn{constructor(t=new rt,e=new rt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new rt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new rt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Uo=class extends pn{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wr=class extends pn{constructor(t=new rt,e=new rt,n=new rt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new rt){let n=e,i=this.v0,s=this.v1,a=this.v2;return n.set(Er(t,i.x,s.x,a.x),Er(t,i.y,s.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Fo=class extends pn{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){let n=e,i=this.v0,s=this.v1,a=this.v2;return n.set(Er(t,i.x,s.x,a.x),Er(t,i.y,s.y,a.y),Er(t,i.z,s.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Xr=class extends pn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new rt){let n=e,i=this.points,s=(i.length-1)*t,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(mu(o,l.x,c.x,h.x,u.x),mu(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new rt().fromArray(i))}return this}},nh=Object.freeze({__proto__:null,ArcCurve:Lo,CatmullRomCurve3:Do,CubicBezierCurve:Vr,CubicBezierCurve3:No,EllipseCurve:Hs,LineCurve:Gr,LineCurve3:Uo,QuadraticBezierCurve:Wr,QuadraticBezierCurve3:Fo,SplineCurve:Xr}),Bo=class extends pn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new nh[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}s++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new nh[i.type]().fromJSON(i))}return this}},Ji=class extends Bo{constructor(t){super(),this.type="Path",this.currentPoint=new rt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Gr(this.currentPoint.clone(),new rt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let s=new Wr(this.currentPoint.clone(),new rt(t,e),new rt(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,a){let o=new Vr(this.currentPoint.clone(),new rt(t,e),new rt(n,i),new rt(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Xr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,s,a),this}absarc(t,e,n,i,s,a){return this.absellipse(t,e,n,n,i,s,a),this}ellipse(t,e,n,i,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,s,a,o,l),this}absellipse(t,e,n,i,s,a,o,l){let c=new Hs(t,e,n,i,s,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Vs=class extends Ji{constructor(t){super(t),this.uuid=ci(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new Ji().fromJSON(i))}return this}};function Xp(r,t,e=2){let n=t&&t.length,i=n?t[0]*e:r.length,s=ff(r,0,i,e,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=Jp(r,t,s,e)),r.length>80*e){o=r[0],l=r[1];let h=o,u=l;for(let d=e;d<i;d+=e){let f=r[d],p=r[d+1];f<o&&(o=f),p<l&&(l=p),f>h&&(h=f),p>u&&(u=p)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return qr(s,a,e,o,l,c,0),a}function ff(r,t,e,n,i){let s;if(i===om(r,t,e,n)>0)for(let a=t;a<e;a+=n)s=gu(a/n|0,r[a],r[a+1],s);else for(let a=e-n;a>=t;a-=n)s=gu(a/n|0,r[a],r[a+1],s);return s&&Gs(s,s.next)&&(Yr(s),s=s.next),s}function Ki(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(Gs(e,e.next)||Ie(e.prev,e,e.next)===0)){if(Yr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function qr(r,t,e,n,i,s,a){if(!r)return;!a&&s&&em(r,n,i,s);let o=r;for(;r.prev!==r.next;){let l=r.prev,c=r.next;if(s?$p(r,n,i,s):qp(r)){t.push(l.i,r.i,c.i),Yr(r),r=c.next,o=c.next;continue}if(r=c,r===o){a?a===1?(r=Yp(Ki(r),t),qr(r,t,e,n,i,s,2)):a===2&&Zp(r,t,e,n,i,s):qr(Ki(r),t,e,n,i,s,1);break}}}function qp(r){let t=r.prev,e=r,n=r.next;if(Ie(t,e,n)>=0)return!1;let i=t.x,s=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(i,s,a),u=Math.min(o,l,c),d=Math.max(i,s,a),f=Math.max(o,l,c),p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&wr(i,o,s,l,a,c,p.x,p.y)&&Ie(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function $p(r,t,e,n){let i=r.prev,s=r,a=r.next;if(Ie(i,s,a)>=0)return!1;let o=i.x,l=s.x,c=a.x,h=i.y,u=s.y,d=a.y,f=Math.min(o,l,c),p=Math.min(h,u,d),y=Math.max(o,l,c),g=Math.max(h,u,d),m=ih(f,p,t,e,n),b=ih(y,g,t,e,n),E=r.prevZ,_=r.nextZ;for(;E&&E.z>=m&&_&&_.z<=b;){if(E.x>=f&&E.x<=y&&E.y>=p&&E.y<=g&&E!==i&&E!==a&&wr(o,h,l,u,c,d,E.x,E.y)&&Ie(E.prev,E,E.next)>=0||(E=E.prevZ,_.x>=f&&_.x<=y&&_.y>=p&&_.y<=g&&_!==i&&_!==a&&wr(o,h,l,u,c,d,_.x,_.y)&&Ie(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;E&&E.z>=m;){if(E.x>=f&&E.x<=y&&E.y>=p&&E.y<=g&&E!==i&&E!==a&&wr(o,h,l,u,c,d,E.x,E.y)&&Ie(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;_&&_.z<=b;){if(_.x>=f&&_.x<=y&&_.y>=p&&_.y<=g&&_!==i&&_!==a&&wr(o,h,l,u,c,d,_.x,_.y)&&Ie(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Yp(r,t){let e=r;do{let n=e.prev,i=e.next.next;!Gs(n,i)&&mf(n,e,e.next,i)&&$r(n,i)&&$r(i,n)&&(t.push(n.i,e.i,i.i),Yr(e),Yr(e.next),e=r=i),e=e.next}while(e!==r);return Ki(e)}function Zp(r,t,e,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&sm(a,o)){let l=gf(a,o);a=Ki(a,a.next),l=Ki(l,l.next),qr(a,t,e,n,i,s,0),qr(l,t,e,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function Jp(r,t,e,n){let i=[];for(let s=0,a=t.length;s<a;s++){let o=t[s]*n,l=s<a-1?t[s+1]*n:r.length,c=ff(r,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(im(c))}i.sort(Kp);for(let s=0;s<i.length;s++)e=jp(i[s],e);return e}function Kp(r,t){let e=r.x-t.x;if(e===0&&(e=r.y-t.y,e===0)){let n=(r.next.y-r.y)/(r.next.x-r.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function jp(r,t){let e=Qp(r,t);if(!e)return t;let n=gf(e,r);return Ki(n,n.next),Ki(e,e.next)}function Qp(r,t){let e=t,n=r.x,i=r.y,s=-1/0,a;if(Gs(r,e))return e;do{if(Gs(r,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){let u=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>s&&(s=u,a=e.x<e.next.x?e:e.next,u===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&pf(i<c?n:s,i,l,c,i<c?s:n,i,e.x,e.y)){let u=Math.abs(i-e.y)/(n-e.x);$r(e,r)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&tm(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function tm(r,t){return Ie(r.prev,r,t.prev)<0&&Ie(t.next,r,r.next)<0}function em(r,t,e,n){let i=r;do i.z===0&&(i.z=ih(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,nm(i)}function nm(r){let t,e=1;do{let n=r,i;r=null;let s=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=a}s.nextZ=null,e*=2}while(t>1);return r}function ih(r,t,e,n,i){return r=(r-e)*i|0,t=(t-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function im(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function pf(r,t,e,n,i,s,a,o){return(i-a)*(t-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(s-o)>=(i-a)*(n-o)}function wr(r,t,e,n,i,s,a,o){return!(r===a&&t===o)&&pf(r,t,e,n,i,s,a,o)}function sm(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!rm(r,t)&&($r(r,t)&&$r(t,r)&&am(r,t)&&(Ie(r.prev,r,t.prev)||Ie(r,t.prev,t))||Gs(r,t)&&Ie(r.prev,r,r.next)>0&&Ie(t.prev,t,t.next)>0)}function Ie(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function Gs(r,t){return r.x===t.x&&r.y===t.y}function mf(r,t,e,n){let i=oo(Ie(r,t,e)),s=oo(Ie(r,t,n)),a=oo(Ie(e,n,r)),o=oo(Ie(e,n,t));return!!(i!==s&&a!==o||i===0&&ao(r,e,t)||s===0&&ao(r,n,t)||a===0&&ao(e,r,n)||o===0&&ao(e,t,n))}function ao(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function oo(r){return r>0?1:r<0?-1:0}function rm(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&mf(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function $r(r,t){return Ie(r.prev,r,r.next)<0?Ie(r,t,r.next)>=0&&Ie(r,r.prev,t)>=0:Ie(r,t,r.prev)<0||Ie(r,r.next,t)<0}function am(r,t){let e=r,n=!1,i=(r.x+t.x)/2,s=(r.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&i<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function gf(r,t){let e=sh(r.i,r.x,r.y),n=sh(t.i,t.x,t.y),i=r.next,s=t.prev;return r.next=t,t.prev=r,e.next=i,i.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function gu(r,t,e,n){let i=sh(r,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Yr(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function sh(r,t,e){return{i:r,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function om(r,t,e,n){let i=0;for(let s=t,a=e-n;s<e;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}var rh=class{static triangulate(t,e,n=2){return Xp(t,e,n)}},Wi=class r{static area(t){let e=t.length,n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*.5}static isClockWise(t){return r.area(t)<0}static triangulateShape(t,e){let n=[],i=[],s=[];xu(t),yu(n,t);let a=t.length;e.forEach(xu);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,yu(n,e[l]);let o=rh.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function xu(r){let t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function yu(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}var Zr=class r extends ce{constructor(t=new Vs([new rt(.5,.5),new rt(-.5,.5),new rt(-.5,-.5),new rt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,i=[],s=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new ae(i,3)),this.setAttribute("uv",new ae(s,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:f-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:lm,E,_=!1,S,v,A,x;if(m){E=m.getSpacedPoints(h),_=!0,d=!1;let it=m.isCatmullRomCurve3?m.closed:!1;S=m.computeFrenetFrames(h,it),v=new I,A=new I,x=new I}d||(g=0,f=0,p=0,y=0);let T=o.extractPoints(c),R=T.shape,P=T.holes;if(!Wi.isClockWise(R)){R=R.reverse();for(let it=0,at=P.length;it<at;it++){let lt=P[it];Wi.isClockWise(lt)&&(P[it]=lt.reverse())}}function B(it){let lt=10000000000000001e-36,ct=it[0];for(let ut=1;ut<=it.length;ut++){let zt=ut%it.length,Ft=it[zt],Wt=Ft.x-ct.x,qt=Ft.y-ct.y,D=Wt*Wt+qt*qt,ge=Math.max(Math.abs(Ft.x),Math.abs(Ft.y),Math.abs(ct.x),Math.abs(ct.y)),ne=lt*ge*ge;if(D<=ne){it.splice(zt,1),ut--;continue}ct=Ft}}B(R),P.forEach(B);let L=P.length,O=R;for(let it=0;it<L;it++){let at=P[it];R=R.concat(at)}function q(it,at,lt){return at||Vt("ExtrudeGeometry: vec does not exist"),it.clone().addScaledVector(at,lt)}let z=R.length;function j(it,at,lt){let ct,ut,zt,Ft=it.x-at.x,Wt=it.y-at.y,qt=lt.x-it.x,D=lt.y-it.y,ge=Ft*Ft+Wt*Wt,ne=Ft*D-Wt*qt;if(Math.abs(ne)>Number.EPSILON){let C=Math.sqrt(ge),M=Math.sqrt(qt*qt+D*D),k=at.x-Wt/C,X=at.y+Ft/C,K=lt.x-D/M,ht=lt.y+qt/M,dt=((K-k)*D-(ht-X)*qt)/(Ft*D-Wt*qt);ct=k+Ft*dt-it.x,ut=X+Wt*dt-it.y;let Q=ct*ct+ut*ut;if(Q<=2)return new rt(ct,ut);zt=Math.sqrt(Q/2)}else{let C=!1;Ft>Number.EPSILON?qt>Number.EPSILON&&(C=!0):Ft<-Number.EPSILON?qt<-Number.EPSILON&&(C=!0):Math.sign(Wt)===Math.sign(D)&&(C=!0),C?(ct=-Wt,ut=Ft,zt=Math.sqrt(ge)):(ct=Ft,ut=Wt,zt=Math.sqrt(ge/2))}return new rt(ct/zt,ut/zt)}let H=[];for(let it=0,at=O.length,lt=at-1,ct=it+1;it<at;it++,lt++,ct++)lt===at&&(lt=0),ct===at&&(ct=0),H[it]=j(O[it],O[lt],O[ct]);let Z=[],Y,Et=H.concat();for(let it=0,at=L;it<at;it++){let lt=P[it];Y=[];for(let ct=0,ut=lt.length,zt=ut-1,Ft=ct+1;ct<ut;ct++,zt++,Ft++)zt===ut&&(zt=0),Ft===ut&&(Ft=0),Y[ct]=j(lt[ct],lt[zt],lt[Ft]);Z.push(Y),Et=Et.concat(Y)}let Mt;if(g===0)Mt=Wi.triangulateShape(O,P);else{let it=[],at=[];for(let lt=0;lt<g;lt++){let ct=lt/g,ut=f*Math.cos(ct*Math.PI/2),zt=p*Math.sin(ct*Math.PI/2)+y;for(let Ft=0,Wt=O.length;Ft<Wt;Ft++){let qt=q(O[Ft],H[Ft],zt);pt(qt.x,qt.y,-ut),ct===0&&it.push(qt)}for(let Ft=0,Wt=L;Ft<Wt;Ft++){let qt=P[Ft];Y=Z[Ft];let D=[];for(let ge=0,ne=qt.length;ge<ne;ge++){let C=q(qt[ge],Y[ge],zt);pt(C.x,C.y,-ut),ct===0&&D.push(C)}ct===0&&at.push(D)}}Mt=Wi.triangulateShape(it,at)}let jt=Mt.length,Gt=p+y;for(let it=0;it<z;it++){let at=d?q(R[it],Et[it],Gt):R[it];_?(A.copy(S.normals[0]).multiplyScalar(at.x),v.copy(S.binormals[0]).multiplyScalar(at.y),x.copy(E[0]).add(A).add(v),pt(x.x,x.y,x.z)):pt(at.x,at.y,0)}for(let it=1;it<=h;it++)for(let at=0;at<z;at++){let lt=d?q(R[at],Et[at],Gt):R[at];_?(A.copy(S.normals[it]).multiplyScalar(lt.x),v.copy(S.binormals[it]).multiplyScalar(lt.y),x.copy(E[it]).add(A).add(v),pt(x.x,x.y,x.z)):pt(lt.x,lt.y,u/h*it)}for(let it=g-1;it>=0;it--){let at=it/g,lt=f*Math.cos(at*Math.PI/2),ct=p*Math.sin(at*Math.PI/2)+y;for(let ut=0,zt=O.length;ut<zt;ut++){let Ft=q(O[ut],H[ut],ct);pt(Ft.x,Ft.y,u+lt)}for(let ut=0,zt=P.length;ut<zt;ut++){let Ft=P[ut];Y=Z[ut];for(let Wt=0,qt=Ft.length;Wt<qt;Wt++){let D=q(Ft[Wt],Y[Wt],ct);_?pt(D.x,D.y+E[h-1].y,E[h-1].x+lt):pt(D.x,D.y,u+lt)}}}Yt(),J();function Yt(){let it=i.length/3;if(d){let at=0,lt=z*at;for(let ct=0;ct<jt;ct++){let ut=Mt[ct];Bt(ut[2]+lt,ut[1]+lt,ut[0]+lt)}at=h+g*2,lt=z*at;for(let ct=0;ct<jt;ct++){let ut=Mt[ct];Bt(ut[0]+lt,ut[1]+lt,ut[2]+lt)}}else{for(let at=0;at<jt;at++){let lt=Mt[at];Bt(lt[2],lt[1],lt[0])}for(let at=0;at<jt;at++){let lt=Mt[at];Bt(lt[0]+z*h,lt[1]+z*h,lt[2]+z*h)}}n.addGroup(it,i.length/3-it,0)}function J(){let it=i.length/3,at=0;et(O,at),at+=O.length;for(let lt=0,ct=P.length;lt<ct;lt++){let ut=P[lt];et(ut,at),at+=ut.length}n.addGroup(it,i.length/3-it,1)}function et(it,at){let lt=it.length;for(;--lt>=0;){let ct=lt,ut=lt-1;ut<0&&(ut=it.length-1);for(let zt=0,Ft=h+g*2;zt<Ft;zt++){let Wt=z*zt,qt=z*(zt+1),D=at+ct+Wt,ge=at+ut+Wt,ne=at+ut+qt,C=at+ct+qt;St(D,ge,ne,C)}}}function pt(it,at,lt){l.push(it),l.push(at),l.push(lt)}function Bt(it,at,lt){kt(it),kt(at),kt(lt);let ct=i.length/3,ut=b.generateTopUV(n,i,ct-3,ct-2,ct-1);de(ut[0]),de(ut[1]),de(ut[2])}function St(it,at,lt,ct){kt(it),kt(at),kt(ct),kt(at),kt(lt),kt(ct);let ut=i.length/3,zt=b.generateSideWallUV(n,i,ut-6,ut-3,ut-2,ut-1);de(zt[0]),de(zt[1]),de(zt[3]),de(zt[1]),de(zt[2]),de(zt[3])}function kt(it){i.push(l[it*3+0]),i.push(l[it*3+1]),i.push(l[it*3+2])}function de(it){s.push(it.x),s.push(it.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return cm(e,n,t)}static fromJSON(t,e){let n=[];for(let s=0,a=t.shapes.length;s<a;s++){let o=e[t.shapes[s]];n.push(o)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new nh[i.type]().fromJSON(i)),new r(n,t.options)}},lm={generateTopUV:function(r,t,e,n,i){let s=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new rt(s,a),new rt(o,l),new rt(c,h)]},generateSideWallUV:function(r,t,e,n,i,s){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],p=t[i*3+2],y=t[s*3],g=t[s*3+1],m=t[s*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new rt(a,1-l),new rt(c,1-u),new rt(d,1-p),new rt(y,1-m)]:[new rt(o,1-l),new rt(h,1-u),new rt(f,1-p),new rt(g,1-m)]}};function cm(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){let s=r[n];e.shapes.push(s.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Ws=class r extends Po{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new r(t.radius,t.detail)}};var Un=class r extends ce{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,d=e/l,f=[],p=[],y=[],g=[];for(let m=0;m<h;m++){let b=m*d-a;for(let E=0;E<c;E++){let _=E*u-s;p.push(_,-b,0),y.push(0,0,1),g.push(E/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let b=0;b<o;b++){let E=b+c*m,_=b+c*(m+1),S=b+1+c*(m+1),v=b+1+c*m;f.push(E,_,v),f.push(_,S,v)}this.setIndex(f),this.setAttribute("position",new ae(p,3)),this.setAttribute("normal",new ae(y,3)),this.setAttribute("uv",new ae(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.widthSegments,t.heightSegments)}},ji=class r extends ce{constructor(t=.5,e=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],l=[],c=[],h=[],u=t,d=(e-t)/i,f=new I,p=new rt;for(let y=0;y<=i;y++){for(let g=0;g<=n;g++){let m=s+g/n*a;f.x=u*Math.cos(m),f.y=u*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/e+1)/2,p.y=(f.y/e+1)/2,h.push(p.x,p.y)}u+=d}for(let y=0;y<i;y++){let g=y*(n+1);for(let m=0;m<n;m++){let b=m+g,E=b,_=b+n+1,S=b+n+2,v=b+1;o.push(E,_,v),o.push(_,S,v)}}this.setIndex(o),this.setAttribute("position",new ae(l,3)),this.setAttribute("normal",new ae(c,3)),this.setAttribute("uv",new ae(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var Ei=class r extends ce{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new I,d=new I,f=[],p=[],y=[],g=[];for(let m=0;m<=n;m++){let b=[],E=m/n,_=a+E*o,S=t*Math.cos(_),v=Math.sqrt(t*t-S*S),A=0;m===0&&a===0?A=.5/e:m===n&&l===Math.PI&&(A=-.5/e);for(let x=0;x<=e;x++){let T=x/e,R=i+T*s;u.x=-v*Math.cos(R),u.y=S,u.z=v*Math.sin(R),p.push(u.x,u.y,u.z),d.copy(u).normalize(),y.push(d.x,d.y,d.z),g.push(T+A,1-E),b.push(c++)}h.push(b)}for(let m=0;m<n;m++)for(let b=0;b<e;b++){let E=h[m][b+1],_=h[m][b],S=h[m+1][b],v=h[m+1][b+1];(m!==0||a>0)&&f.push(E,_,v),(m!==n-1||l<Math.PI)&&f.push(_,S,v)}this.setIndex(f),this.setAttribute("position",new ae(p,3)),this.setAttribute("normal",new ae(y,3)),this.setAttribute("uv",new ae(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function is(r){let t={};for(let e in r){t[e]={};for(let n in r[e]){let i=r[e][n];if(vu(i))i.isRenderTargetTexture?(Ot("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(vu(i[0])){let s=[];for(let a=0,o=i.length;a<o;a++)s[a]=i[a].clone();t[e][n]=s}else t[e][n]=i.slice();else t[e][n]=i}}return t}function Qe(r){let t={};for(let e=0;e<r.length;e++){let n=is(r[e]);for(let i in n)t[i]=n[i]}return t}function vu(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function hm(r){let t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Th(r){let t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}var gn={clone:is,merge:Qe},dm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,um=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,fe=class extends Nn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dm,this.fragmentShader=um,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=is(t.uniforms),this.uniformsGroups=hm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new Rt().setHex(i.value);break;case"v2":this.uniforms[n].value=new rt().fromArray(i.value);break;case"v3":this.uniforms[n].value=new I().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Te().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Xt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new re().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Xs=class extends fe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},qe=class extends Nn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Rt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zl,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Oo=class extends Nn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ku,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ko=class extends Nn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Ts(r,t){return!r||r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function Zc(r){return r!==void 0&&r.inTangents!==void 0&&r.outTangents!==void 0}var Ti=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];n:{t:{let a;e:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=e[++n],t<i)break t}a=e.length;break e}if(!(t>=s)){let o=e[1];t<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=e[--n-1],t>=s)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let a=0;a!==i;++a)e[a]=n[s+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},zo=class extends Ti{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:jc,endingEnd:jc}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,a=t+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Qc:s=t,o=2*e-n;break;case th:s=i.length-2,o=e+i[s]-i[s+1];break;default:s=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Qc:a=t,l=2*n-e;break;case th:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-e)/(i-e),y=p*p,g=y*p,m=-d*g+2*d*y-d*p,b=(1+d)*g+(-1.5-2*d)*y+(-.5+d)*p+1,E=(-1-f)*g+(1.5+f)*y+.5*p,_=f*g-f*y;for(let S=0;S!==o;++S)s[S]=m*a[h+S]+b*a[c+S]+E*a[l+S]+_*a[u+S];return s}},Ho=class extends Ti{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*u+a[l+d]*h;return s}},Vo=class extends Ti{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Go=class extends Ti{interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(n-e)/(i-e),y=1-p;for(let g=0;g!==o;++g)s[g]=a[c+g]*y+a[l+g]*p;return s}let d=o*2,f=t-1;for(let p=0;p!==o;++p){let y=a[c+p],g=a[l+p],m=f*d+p*2,b=u[m],E=u[m+1],_=t*d+p*2,S=h[_],v=h[_+1],A=pm(n,e,b,S,i);s[p]=xf(A,y,E,v,g)}return s}};function xf(r,t,e,n,i){let s=1-r;return s*s*s*t+3*s*s*r*e+3*s*r*r*n+r*r*r*i}function fm(r,t,e,n,i){let s=1-r;return 3*s*s*(e-t)+6*s*r*(n-e)+3*r*r*(i-n)}function pm(r,t,e,n,i){let s=(r-t)/(i-t);for(let a=0;a<8;a++){let o=xf(s,t,e,n,i)-r;if(Math.abs(o)<1e-10)break;let l=fm(s,t,e,n,i);if(Math.abs(l)<1e-10)break;s=Math.max(0,Math.min(1,s-o/l))}return s}var mn=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ts(e,this.TimeBufferType),this.values=Ts(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ts(t.times,Array),values:Ts(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),Zc(t.settings)&&(n.settings={inTangents:Ts(t.settings.inTangents,Array),outTangents:Ts(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Vo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ho(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new zo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Go(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Ar:e=this.InterpolantFactoryMethodDiscrete;break;case Mo:e=this.InterpolantFactoryMethodLinear;break;case ho:e=this.InterpolantFactoryMethodSmooth;break;case Kc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ot("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ar;case this.InterpolantFactoryMethodLinear:return Mo;case this.InterpolantFactoryMethodSmooth:return ho;case this.InterpolantFactoryMethodBezier:return Kc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;Zc(this.settings)&&(_u(this.settings.inTangents,t),_u(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<t;)++s;for(;a!==-1&&n[a]>e;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Vt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(Vt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Vt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Vt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&xp(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){Vt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ho,s=t.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{let u=o*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){let y=e[u+p];if(y!==e[d+p]||y!==e[f+p]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let u=o*n,d=a*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++a}}if(s>0){t[a]=t[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,Zc(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function _u(r,t){for(let e=0,n=r.length;e!==n;e+=2)r[e]*=t}mn.prototype.ValueTypeName="";mn.prototype.TimeBufferType=Float32Array;mn.prototype.ValueBufferType=Float32Array;mn.prototype.DefaultInterpolation=Mo;var Ai=class extends mn{constructor(t,e,n){super(t,e,n)}};Ai.prototype.ValueTypeName="bool";Ai.prototype.ValueBufferType=Array;Ai.prototype.DefaultInterpolation=Ar;Ai.prototype.InterpolantFactoryMethodLinear=void 0;Ai.prototype.InterpolantFactoryMethodSmooth=void 0;var Wo=class extends mn{constructor(t,e,n,i){super(t,e,n,i)}};Wo.prototype.ValueTypeName="color";var Xo=class extends mn{constructor(t,e,n,i){super(t,e,n,i)}};Xo.prototype.ValueTypeName="number";var qo=class extends Ti{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e),c=t*o;for(let h=c+o;c!==h;c+=4)Xe.slerpFlat(s,0,a,c-o,a,c,l);return s}},Jr=class extends mn{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new qo(this.times,this.values,this.getValueSize(),t)}};Jr.prototype.ValueTypeName="quaternion";Jr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ri=class extends mn{constructor(t,e,n){super(t,e,n)}};Ri.prototype.ValueTypeName="string";Ri.prototype.ValueBufferType=Array;Ri.prototype.DefaultInterpolation=Ar;Ri.prototype.InterpolantFactoryMethodLinear=void 0;Ri.prototype.InterpolantFactoryMethodSmooth=void 0;var $o=class extends mn{constructor(t,e,n,i){super(t,e,n,i)}};$o.prototype.ValueTypeName="vector";var Yo=class{constructor(t,e,n){let i=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},yf=new Yo,Zo=class{constructor(t){this.manager=t!==void 0?t:yf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Zo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Kr=class extends Be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Rt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},jr=class extends Kr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Rt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Jc=new re,Mu=new I,bu=new I,Jo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new rt(512,512),this.mapType=ln,this.map=null,this.mapPass=null,this.matrix=new re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ks,this._frameExtents=new rt(1,1),this._viewportCount=1,this._viewports=[new Te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Mu.setFromMatrixPosition(t.matrixWorld),e.position.copy(Mu),bu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(bu),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,i){Jc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Jc,t.coordinateSystem,t.reversedDepth);let s=this._frameExtents,a=i?i.z/s.x:1,o=i?i.w/s.y:1,l=i?i.x/s.x:0,c=i?i.y/s.y:0;t.coordinateSystem===Ps||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Jc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},lo=new I,co=new Xe,Wn=new I,Qr=class extends Be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new re,this.projectionMatrix=new re,this.projectionMatrixInverse=new re,this.coordinateSystem=Dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(lo,co,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lo,co,Wn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(lo,co,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lo,co,Wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},bi=new I,Su=new rt,wu=new rt,je=class extends Qr{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=bo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Sc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return bo*2*Math.atan(Math.tan(Sc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(bi.x,bi.y).multiplyScalar(-t/bi.z),bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(bi.x,bi.y).multiplyScalar(-t/bi.z)}getViewSize(t,e){return this.getViewBounds(t,Su,wu),e.subVectors(wu,Su)}setViewOffset(t,e,n,i,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Sc*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Ci=class extends Qr{constructor(t=-1,e=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ah=class extends Jo{constructor(){super(new Ci(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ta=class extends Kr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Be.DEFAULT_UP),this.updateMatrix(),this.target=new Be,this.shadow=new ah}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var As=-90,Rs=1,Ko=class extends Be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new je(As,Rs,t,e);i.layers=this.layers,this.add(i);let s=new je(As,Rs,t,e);s.layers=this.layers,this.add(s);let a=new je(As,Rs,t,e);a.layers=this.layers,this.add(a);let o=new je(As,Rs,t,e);o.layers=this.layers,this.add(o);let l=new je(As,Rs,t,e);l.layers=this.layers,this.add(l);let c=new je(As,Rs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,s,a,o,l]=e;for(let c of e)this.remove(c);if(t===Dn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ps)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,s),t.setRenderTarget(n,1,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},jo=class extends je{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},ea=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=mm.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function mm(){this._document.hidden===!1&&this.reset()}var Ah="\\[\\]\\.:\\/",gm=new RegExp("["+Ah+"]","g"),Rh="[^"+Ah+"]",xm="[^"+Ah.replace("\\.","")+"]",ym=/((?:WC+[\/:])*)/.source.replace("WC",Rh),vm=/(WCOD+)?/.source.replace("WCOD",xm),_m=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Rh),Mm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Rh),bm=new RegExp("^"+ym+vm+_m+Mm+"$"),Sm=["material","materials","bones","map"],oh=class{constructor(t,e,n){let i=n||Re.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Re=class r{constructor(t,e,n){this.path=e,this.parsedPath=n||r.parseTrackName(e),this.node=r.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new r.Composite(t,e,n):new r(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(gm,"")}static parseTrackName(t){let e=bm.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Sm.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(t||(t=r.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ot("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Vt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Vt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Vt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Vt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Vt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[i];if(a===void 0){let c=e.nodeName;Vt("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Re.Composite=oh;Re.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Re.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Re.prototype.GetterByBindingType=[Re.prototype._getValue_direct,Re.prototype._getValue_array,Re.prototype._getValue_arrayElement,Re.prototype._getValue_toArray];Re.prototype.SetterByBindingTypeAndVersioning=[[Re.prototype._setValue_direct,Re.prototype._setValue_direct_setNeedsUpdate,Re.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_array,Re.prototype._setValue_array_setNeedsUpdate,Re.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_arrayElement,Re.prototype._setValue_arrayElement_setNeedsUpdate,Re.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_fromArray,Re.prototype._setValue_fromArray_setNeedsUpdate,Re.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var h_=new Float32Array(1);var Eu=new re,na=class{constructor(t,e,n=0,i=1/0){this.ray=new $i(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Ns,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Vt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Eu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Eu),this}intersectObject(t,e=!0,n=[]){return lh(t,this,n,e),n.sort(Tu),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)lh(t[i],this,n,e);return n.sort(Tu),n}};function Tu(r,t){return r.distance-t.distance}function lh(r,t,e,n){let i=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){let s=r.children;for(let a=0,o=s.length;a<o;a++)lh(s[a],t,e,!0)}}var Nh=class Nh{constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let s=this.elements;return s[0]=t,s[2]=e,s[1]=n,s[3]=i,this}};Nh.prototype.isMatrix2=!0;var ch=Nh;function Ch(r,t,e,n){let i=wm(n);switch(e){case Mh:return r*t;case al:return r*t/i.components*i.byteLength;case ol:return r*t/i.components*i.byteLength;case Ni:return r*t*2/i.components*i.byteLength;case ll:return r*t*2/i.components*i.byteLength;case bh:return r*t*3/i.components*i.byteLength;case cn:return r*t*4/i.components*i.byteLength;case cl:return r*t*4/i.components*i.byteLength;case da:case ua:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case fa:case pa:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case dl:case fl:return Math.max(r,16)*Math.max(t,8)/4;case hl:case ul:return Math.max(r,8)*Math.max(t,8)/2;case pl:case ml:case xl:case yl:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case gl:case ma:case vl:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case _l:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ml:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case bl:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Sl:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case wl:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case El:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Tl:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Al:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Rl:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Cl:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Il:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Pl:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Ll:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Dl:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Nl:case Ul:case Fl:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Bl:case Ol:return Math.ceil(r/4)*Math.ceil(t/4)*8;case ga:case kl:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function wm(r){switch(r){case ln:case xh:return{byteLength:1,components:1};case $s:case yh:case ke:return{byteLength:2,components:1};case sl:case rl:return{byteLength:2,components:4};case Bn:case il:case En:return{byteLength:4,components:1};case vh:case _h:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ot("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function zf(){let r=null,t=!1,e=null,n=null;function i(s,a){n=r.requestAnimationFrame(i),e(s,a)}return{start:function(){t!==!0&&e!==null&&r!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Cm(r){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=r.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){let h=l.array,u=l.updateRanges;if(r.bindBuffer(c,o),u.length===0)r.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){let p=u[d],y=u[f];y.start<=p.start+p.count+1?p.count=Math.max(p.count,y.start+y.count-p.start):(++d,u[d]=y)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){let y=u[f];r.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(r.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var Im=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Lm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Um=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Bm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Om=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,km=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Wm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Xm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,qm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$m=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ym=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Jm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Km=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,jm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Qm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,tg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,eg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,ng=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ig=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ag="gl_FragColor = linearToOutputTexel( gl_FragColor );",og=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,cg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,hg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,dg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ug=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,yg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_g=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,bg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Sg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Eg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ag=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Rg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Cg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ig=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Pg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lg=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Dg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ng=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ug=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Bg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Og=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,zg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$g=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Zg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Jg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Qg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,t0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,e0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,n0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,i0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,s0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,r0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,a0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,o0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,l0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,c0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,h0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,d0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,u0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,f0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,p0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,m0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,g0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,x0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,y0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,v0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,_0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,M0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,b0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,S0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,w0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,E0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,T0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,A0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,R0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,C0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,I0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,P0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,D0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,U0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,F0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,B0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,O0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,k0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,H0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,G0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,W0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,X0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,q0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Y0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Z0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,K0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,j0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Q0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ex=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ix=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,rx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ax=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ox=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,te={alphahash_fragment:Im,alphahash_pars_fragment:Pm,alphamap_fragment:Lm,alphamap_pars_fragment:Dm,alphatest_fragment:Nm,alphatest_pars_fragment:Um,aomap_fragment:Fm,aomap_pars_fragment:Bm,batching_pars_vertex:Om,batching_vertex:km,begin_vertex:zm,beginnormal_vertex:Hm,bsdfs:Vm,iridescence_fragment:Gm,bumpmap_pars_fragment:Wm,clipping_planes_fragment:Xm,clipping_planes_pars_fragment:qm,clipping_planes_pars_vertex:$m,clipping_planes_vertex:Ym,color_fragment:Zm,color_pars_fragment:Jm,color_pars_vertex:Km,color_vertex:jm,common:Qm,cube_uv_reflection_fragment:tg,defaultnormal_vertex:eg,displacementmap_pars_vertex:ng,displacementmap_vertex:ig,emissivemap_fragment:sg,emissivemap_pars_fragment:rg,colorspace_fragment:ag,colorspace_pars_fragment:og,envmap_fragment:lg,envmap_common_pars_fragment:cg,envmap_pars_fragment:hg,envmap_pars_vertex:dg,envmap_physical_pars_fragment:bg,envmap_vertex:ug,fog_vertex:fg,fog_pars_vertex:pg,fog_fragment:mg,fog_pars_fragment:gg,gradientmap_pars_fragment:xg,lightmap_pars_fragment:yg,lights_lambert_fragment:vg,lights_lambert_pars_fragment:_g,lights_pars_begin:Mg,lights_toon_fragment:Sg,lights_toon_pars_fragment:wg,lights_phong_fragment:Eg,lights_phong_pars_fragment:Tg,lights_physical_fragment:Ag,lights_physical_pars_fragment:Rg,lights_fragment_begin:Cg,lights_fragment_maps:Ig,lights_fragment_end:Pg,lightprobes_pars_fragment:Lg,logdepthbuf_fragment:Dg,logdepthbuf_pars_fragment:Ng,logdepthbuf_pars_vertex:Ug,logdepthbuf_vertex:Fg,map_fragment:Bg,map_pars_fragment:Og,map_particle_fragment:kg,map_particle_pars_fragment:zg,metalnessmap_fragment:Hg,metalnessmap_pars_fragment:Vg,morphinstance_vertex:Gg,morphcolor_vertex:Wg,morphnormal_vertex:Xg,morphtarget_pars_vertex:qg,morphtarget_vertex:$g,normal_fragment_begin:Yg,normal_fragment_maps:Zg,normal_pars_fragment:Jg,normal_pars_vertex:Kg,normal_vertex:jg,normalmap_pars_fragment:Qg,clearcoat_normal_fragment_begin:t0,clearcoat_normal_fragment_maps:e0,clearcoat_pars_fragment:n0,iridescence_pars_fragment:i0,opaque_fragment:s0,packing:r0,premultiplied_alpha_fragment:a0,project_vertex:o0,dithering_fragment:l0,dithering_pars_fragment:c0,roughnessmap_fragment:h0,roughnessmap_pars_fragment:d0,shadowmap_pars_fragment:u0,shadowmap_pars_vertex:f0,shadowmap_vertex:p0,shadowmask_pars_fragment:m0,skinbase_vertex:g0,skinning_pars_vertex:x0,skinning_vertex:y0,skinnormal_vertex:v0,specularmap_fragment:_0,specularmap_pars_fragment:M0,tonemapping_fragment:b0,tonemapping_pars_fragment:S0,transmission_fragment:w0,transmission_pars_fragment:E0,uv_pars_fragment:T0,uv_pars_vertex:A0,uv_vertex:R0,worldpos_vertex:C0,background_vert:I0,background_frag:P0,backgroundCube_vert:L0,backgroundCube_frag:D0,cube_vert:N0,cube_frag:U0,depth_vert:F0,depth_frag:B0,distance_vert:O0,distance_frag:k0,equirect_vert:z0,equirect_frag:H0,linedashed_vert:V0,linedashed_frag:G0,meshbasic_vert:W0,meshbasic_frag:X0,meshlambert_vert:q0,meshlambert_frag:$0,meshmatcap_vert:Y0,meshmatcap_frag:Z0,meshnormal_vert:J0,meshnormal_frag:K0,meshphong_vert:j0,meshphong_frag:Q0,meshphysical_vert:tx,meshphysical_frag:ex,meshtoon_vert:nx,meshtoon_frag:ix,points_vert:sx,points_frag:rx,shadow_vert:ax,shadow_frag:ox,sprite_vert:lx,sprite_frag:cx},ft={common:{diffuse:{value:new Rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new Rt(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},ti={basic:{uniforms:Qe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:Qe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Rt(0)},envMapIntensity:{value:1}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:Qe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Rt(0)},specular:{value:new Rt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:Qe([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new Rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:Qe([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new Rt(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:Qe([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:Qe([ft.points,ft.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:Qe([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:Qe([ft.common,ft.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:Qe([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:Qe([ft.sprite,ft.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distance:{uniforms:Qe([ft.common,ft.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distance_vert,fragmentShader:te.distance_frag},shadow:{uniforms:Qe([ft.lights,ft.fog,{color:{value:new Rt(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};ti.physical={uniforms:Qe([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new Rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new Rt(0)},specularColor:{value:new Rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};var Gl={r:0,b:0,g:0},hx=new re,Hf=new Xt;Hf.set(-1,0,0,0,1,0,0,0,1);function dx(r,t,e,n,i,s){let a=new Rt(0),o=i===!0?0:1,l,c,h=null,u=0,d=null;function f(b){let E=b.isScene===!0?b.background:null;if(E&&E.isTexture){let _=b.backgroundBlurriness>0;E=t.get(E,_)}return E}function p(b){let E=!1,_=f(b);_===null?g(a,o):_&&_.isColor&&(g(_,1),E=!0);let S=r.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,s):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,s),(r.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function y(b,E){let _=f(E);_&&(_.isCubeTexture||_.mapping===ca)?(c===void 0&&(c=new oe(new me(1,1,1),new fe({name:"BackgroundCubeMaterial",uniforms:is(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,v,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(hx.makeRotationFromEuler(E.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Hf),c.material.toneMapped=ee.getTransfer(_.colorSpace)!==pe,(h!==_||u!==_.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,h=_,u=_.version,d=r.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new oe(new Un(2,2),new fe({name:"BackgroundMaterial",uniforms:is(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:Ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=ee.getTransfer(_.colorSpace)!==pe,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||u!==_.version||d!==r.toneMapping)&&(l.material.needsUpdate=!0,h=_,u=_.version,d=r.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function g(b,E){b.getRGB(Gl,Th(r)),e.buffers.color.setClear(Gl.r,Gl.g,Gl.b,E,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,E=1){a.set(b),o=E,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,g(a,o)},render:p,addToRenderList:y,dispose:m}}function ux(r,t){let e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null),s=i,a=!1;function o(P,N,B,L,O){let q=!1,z=u(P,L,B,N);s!==z&&(s=z,c(s.object)),q=f(P,L,B,O),q&&p(P,L,B,O),O!==null&&t.update(O,r.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,_(P,N,B,L),O!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function l(){return r.createVertexArray()}function c(P){return r.bindVertexArray(P)}function h(P){return r.deleteVertexArray(P)}function u(P,N,B,L){let O=L.wireframe===!0,q=n[N.id];q===void 0&&(q={},n[N.id]=q);let z=P.isInstancedMesh===!0?P.id:0,j=q[z];j===void 0&&(j={},q[z]=j);let H=j[B.id];H===void 0&&(H={},j[B.id]=H);let Z=H[O];return Z===void 0&&(Z=d(l()),H[O]=Z),Z}function d(P){let N=[],B=[],L=[];for(let O=0;O<e;O++)N[O]=0,B[O]=0,L[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:B,attributeDivisors:L,object:P,attributes:{},index:null}}function f(P,N,B,L){let O=s.attributes,q=N.attributes,z=0,j=B.getAttributes();for(let H in j)if(j[H].location>=0){let Y=O[H],Et=q[H];if(Et===void 0&&(H==="instanceMatrix"&&P.instanceMatrix&&(Et=P.instanceMatrix),H==="instanceColor"&&P.instanceColor&&(Et=P.instanceColor)),Y===void 0||Y.attribute!==Et||Et&&Y.data!==Et.data)return!0;z++}return s.attributesNum!==z||s.index!==L}function p(P,N,B,L){let O={},q=N.attributes,z=0,j=B.getAttributes();for(let H in j)if(j[H].location>=0){let Y=q[H];Y===void 0&&(H==="instanceMatrix"&&P.instanceMatrix&&(Y=P.instanceMatrix),H==="instanceColor"&&P.instanceColor&&(Y=P.instanceColor));let Et={};Et.attribute=Y,Y&&Y.data&&(Et.data=Y.data),O[H]=Et,z++}s.attributes=O,s.attributesNum=z,s.index=L}function y(){let P=s.newAttributes;for(let N=0,B=P.length;N<B;N++)P[N]=0}function g(P){m(P,0)}function m(P,N){let B=s.newAttributes,L=s.enabledAttributes,O=s.attributeDivisors;B[P]=1,L[P]===0&&(r.enableVertexAttribArray(P),L[P]=1),O[P]!==N&&(r.vertexAttribDivisor(P,N),O[P]=N)}function b(){let P=s.newAttributes,N=s.enabledAttributes;for(let B=0,L=N.length;B<L;B++)N[B]!==P[B]&&(r.disableVertexAttribArray(B),N[B]=0)}function E(P,N,B,L,O,q,z){z===!0?r.vertexAttribIPointer(P,N,B,O,q):r.vertexAttribPointer(P,N,B,L,O,q)}function _(P,N,B,L){y();let O=L.attributes,q=B.getAttributes(),z=N.defaultAttributeValues;for(let j in q){let H=q[j];if(H.location>=0){let Z=O[j];if(Z===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(Z=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(Z=P.instanceColor)),Z!==void 0){let Y=Z.normalized,Et=Z.itemSize,Mt=t.get(Z);if(Mt===void 0)continue;let jt=Mt.buffer,Gt=Mt.type,Yt=Mt.bytesPerElement,J=Gt===r.INT||Gt===r.UNSIGNED_INT||Z.gpuType===il;if(Z.isInterleavedBufferAttribute){let et=Z.data,pt=et.stride,Bt=Z.offset;if(et.isInstancedInterleavedBuffer){for(let St=0;St<H.locationSize;St++)m(H.location+St,et.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let St=0;St<H.locationSize;St++)g(H.location+St);r.bindBuffer(r.ARRAY_BUFFER,jt);for(let St=0;St<H.locationSize;St++)E(H.location+St,Et/H.locationSize,Gt,Y,pt*Yt,(Bt+Et/H.locationSize*St)*Yt,J)}else{if(Z.isInstancedBufferAttribute){for(let et=0;et<H.locationSize;et++)m(H.location+et,Z.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let et=0;et<H.locationSize;et++)g(H.location+et);r.bindBuffer(r.ARRAY_BUFFER,jt);for(let et=0;et<H.locationSize;et++)E(H.location+et,Et/H.locationSize,Gt,Y,Et*Yt,Et/H.locationSize*et*Yt,J)}}else if(z!==void 0){let Y=z[j];if(Y!==void 0)switch(Y.length){case 2:r.vertexAttrib2fv(H.location,Y);break;case 3:r.vertexAttrib3fv(H.location,Y);break;case 4:r.vertexAttrib4fv(H.location,Y);break;default:r.vertexAttrib1fv(H.location,Y)}}}}b()}function S(){T();for(let P in n){let N=n[P];for(let B in N){let L=N[B];for(let O in L){let q=L[O];for(let z in q)h(q[z].object),delete q[z];delete L[O]}}delete n[P]}}function v(P){if(n[P.id]===void 0)return;let N=n[P.id];for(let B in N){let L=N[B];for(let O in L){let q=L[O];for(let z in q)h(q[z].object),delete q[z];delete L[O]}}delete n[P.id]}function A(P){for(let N in n){let B=n[N];for(let L in B){let O=B[L];if(O[P.id]===void 0)continue;let q=O[P.id];for(let z in q)h(q[z].object),delete q[z];delete O[P.id]}}}function x(P){for(let N in n){let B=n[N],L=P.isInstancedMesh===!0?P.id:0,O=B[L];if(O!==void 0){for(let q in O){let z=O[q];for(let j in z)h(z[j].object),delete z[j];delete O[q]}delete B[L],Object.keys(B).length===0&&delete n[N]}}}function T(){R(),a=!0,s!==i&&(s=i,c(s.object))}function R(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:T,resetDefaultState:R,dispose:S,releaseStatesOfGeometry:v,releaseStatesOfObject:x,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:g,disableUnusedAttributes:b}}function fx(r,t,e){let n;function i(l){n=l}function s(l,c){r.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(r.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];e.update(d,n,1)}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function px(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(A){return!(A!==cn&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let x=A===ke&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==ln&&A!==En&&!x&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Ot("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&d===!1&&Ot("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),b=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),E=r.getParameter(r.MAX_VARYING_VECTORS),_=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),S=r.getParameter(r.MAX_SAMPLES),v=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:y,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:b,maxVaryings:E,maxFragmentUniforms:_,maxSamples:S,samples:v}}function mx(r){let t=this,e=null,n=0,i=!1,s=!1,a=new Ln,o=new Xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let p=u.clippingPlanes,y=u.clipIntersection,g=u.clipShadows,m=r.get(u);if(!i||p===null||p.length===0||s&&!g)s?h(null):c();else{let b=s?0:n,E=b*4,_=m.clippingState||null;l.value=_,_=h(p,d,E,f);for(let S=0;S!==E;++S)_[S]=e[S];m.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,p){let y=u!==null?u.length:0,g=null;if(y!==0){if(g=l.value,p!==!0||g===null){let m=f+y*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(g===null||g.length<m)&&(g=new Float32Array(m));for(let E=0,_=f;E!==y;++E,_+=4)a.copy(u[E]).applyMatrix4(b,o),a.normal.toArray(g,_),g[_+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,g}}var Js=4,gx=6,xx=20,yx=256,xa=new Ci,vf=new Rt,Uh=null,Fh=0,Bh=0,Oh=!1,vx=new I,ss=new I,Xl=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,i=100,s={}){let{size:a=256,position:o=vx}=s;Uh=this._renderer.getRenderTarget(),Fh=this._renderer.getActiveCubeFace(),Bh=this._renderer.getActiveMipmapLevel(),Oh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Uh,Fh,Bh),this._renderer.xr.enabled=Oh,t.scissorTest=!1,Zs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Li||t.mapping===ns?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Uh=this._renderer.getRenderTarget(),Fh=this._renderer.getActiveCubeFace(),Bh=this._renderer.getActiveMipmapLevel(),Oh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:De,minFilter:De,generateMipmaps:!1,type:ke,format:cn,colorSpace:Rr,depthBuffer:!1},i=_f(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_f(t,e,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=_x(s)),this._blurMaterial=bx(s,t,e),this._ggxMaterial=Mx(s,t,e)}return i}_compileMaterial(t){let e=new oe(new ce,t);this._renderer.compile(e,xa)}_sceneToCubeUV(t,e,n,i,s){let l=new je(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(vf),u.toneMapping=Fn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new oe(new me,new Sn({name:"PMREM.Background",side:$e,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,g=y.material,m=!1,b=t.background;b?b.isColor&&(g.color.copy(b),t.background=null,m=!0):(g.color.copy(vf),m=!0);for(let E=0;E<6;E++){let _=E%3;_===0?(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[E],s.y,s.z)):_===1?(l.up.set(0,0,c[E]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[E],s.z)):(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[E]));let S=this._cubeSize;Zs(i,_*S,E>2?S:0,S,S),u.setRenderTarget(i),m&&u.render(y,l),u.render(t,l)}u.toneMapping=f,u.autoClear=d,t.background=b}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Li||t.mapping===ns;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=bf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mf());let s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=t;let l=this._cubeSize;Zs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,xa)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=n}_applyGGXFilter(t,e,n){let i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=c*1.25,f=u*d,{_lodMax:p}=this,y=this._sizeLods[n],g=3*y*(n>p-Js?n-p+Js:0),m=4*(this._cubeSize-y);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=p-e,Zs(s,g,m,3*y,2*y),i.setRenderTarget(s),i.render(o,xa),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-n,Zs(t,g,m,3*y,2*y),i.setRenderTarget(t),i.render(o,xa)}_blur(t,e,n,i){let s=this._pingPongRenderTarget,a=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(t,s,e,n,a),this._blurPass(s,t,n,n,a)}_blurPass(t,e,n,i,s){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[i];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[i],u=3*h*(i>this._lodMax-Js?i-this._lodMax+Js:0),d=4*(this._cubeSize-h);Zs(e,u,d,3*h,2*h),a.setRenderTarget(e),a.render(l,xa)}};function _x(r){let t=[],e=[],n=r,i=r-Js+1+gx;for(let s=0;s<i;s++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,d=6,f=3,p=new Float32Array(f*d*u),y=new Float32Array(f*d*u);for(let m=0;m<u;m++){let b=m%3*2/3-1,E=m>2?0:-1,_=[b,E,0,b+2/3,E,0,b+2/3,E+1,0,b,E,0,b+2/3,E+1,0,b,E+1,0];p.set(_,f*d*m);for(let S=0;S<d;S++){let v=h[S*2]*2-1,A=h[S*2+1]*2-1;m===0?ss.set(1,A,v):m===1?ss.set(-v,1,-A):m===2?ss.set(-v,A,1):m===3?ss.set(-1,A,-v):m===4?ss.set(-v,-1,A):ss.set(v,A,-1),ss.toArray(y,(m*d+S)*f)}}let g=new ce;g.setAttribute("position",new ve(p,f)),g.setAttribute("outputDirection",new ve(y,f)),e.push(new oe(g,null)),n>Js&&n--}return{lodMeshes:e,sizeLods:t}}function _f(r,t,e){let n=new Pe(r,t,e);return n.texture.mapping=ca,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zs(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Mx(r,t,e){return new fe({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:yx,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Yl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function bx(r,t,e){return new fe({name:"SphericalGaussianBlur",defines:{SAMPLES:xx,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Yl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Mf(){return new fe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function bf(){return new fe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Yl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var ql=class extends Pe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new zr(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new me(5,5,5),s=new fe({name:"CubemapFromEquirect",uniforms:is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$e,blending:wn});s.uniforms.tEquirect.value=e;let a=new oe(i,s),o=e.minFilter;return e.minFilter===jn&&(e.minFilter=De),new Ko(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(s)}};function Sx(r){let t=new WeakMap,e=new WeakMap,n=null;function i(d,f=!1){return d==null?null:f?a(d):s(d)}function s(d){if(d&&d.isTexture){let f=d.mapping;if(f===tl||f===el)if(t.has(d)){let p=t.get(d).texture;return o(p,d.mapping)}else{let p=d.image;if(p&&p.height>0){let y=new ql(p.height);return y.fromEquirectangularTexture(r,d),t.set(d,y),d.addEventListener("dispose",c),o(y.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let f=d.mapping,p=f===tl||f===el,y=f===Li||f===ns;if(p||y){let g=e.get(d),m=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new Xl(r)),g=p?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),g.texture;if(g!==void 0)return g.texture;{let b=d.image;return p&&b&&b.height>0||y&&b&&l(b)?(n===null&&(n=new Xl(r)),g=p?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function o(d,f){return f===tl?d.mapping=Li:f===el&&(d.mapping=ns),d}function l(d){let f=0,p=6;for(let y=0;y<p;y++)d[y]!==void 0&&f++;return f===p}function c(d){let f=d.target;f.removeEventListener("dispose",c);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function wx(r){let t={};function e(n){if(t[n]!==void 0)return t[n];let i=r.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&Xi("WebGLRenderer: "+n+" extension not supported."),i}}}function Ex(r,t,e,n){let i={},s=new WeakMap;function a(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let p in d.attributes)t.remove(d.attributes[p]);d.removeEventListener("dispose",a),delete i[d.id];let f=s.get(d);f&&(t.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)t.update(d[f],r.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,p=u.attributes.position,y=0;if(p===void 0)return;if(f!==null){let b=f.array;y=f.version;for(let E=0,_=b.length;E<_;E+=3){let S=b[E+0],v=b[E+1],A=b[E+2];d.push(S,v,v,A,A,S)}}else{let b=p.array;y=p.version;for(let E=0,_=b.length/3-1;E<_;E+=3){let S=E+0,v=E+1,A=E+2;d.push(S,v,v,A,A,S)}}let g=new(p.count>=65535?Fr:Ur)(d,1);g.version=y;let m=s.get(u);m&&t.remove(m),s.set(u,g)}function h(u){let d=s.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Tx(r,t,e){let n;function i(u){n=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function l(u,d){r.drawElements(n,d,s,u*a),e.update(d,n,1)}function c(u,d,f){f!==0&&(r.drawElementsInstanced(n,d,s,u*a,f),e.update(d,n,f))}function h(u,d,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,u,0,f);let y=0;for(let g=0;g<f;g++)y+=d[g];e.update(y,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Ax(r){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case r.TRIANGLES:e.triangles+=o*(s/3);break;case r.LINES:e.lines+=o*(s/2);break;case r.LINE_STRIP:e.lines+=o*(s-1);break;case r.LINE_LOOP:e.lines+=o*s;break;case r.POINTS:e.points+=o*s;break;default:Vt("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Rx(r,t,e){let n=new WeakMap,i=new Te;function s(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==u){let T=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",T)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],E=0;f===!0&&(E=1),p===!0&&(E=2),y===!0&&(E=3);let _=o.attributes.position.count*E,S=1;_>t.maxTextureSize&&(S=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let v=new Float32Array(_*S*4*u),A=new Lr(v,_,S,u);A.type=En,A.needsUpdate=!0;let x=E*4;for(let R=0;R<u;R++){let P=g[R],N=m[R],B=b[R],L=_*S*4*R;for(let O=0;O<P.count;O++){let q=O*x;f===!0&&(i.fromBufferAttribute(P,O),v[L+q+0]=i.x,v[L+q+1]=i.y,v[L+q+2]=i.z,v[L+q+3]=0),p===!0&&(i.fromBufferAttribute(N,O),v[L+q+4]=i.x,v[L+q+5]=i.y,v[L+q+6]=i.z,v[L+q+7]=0),y===!0&&(i.fromBufferAttribute(B,O),v[L+q+8]=i.x,v[L+q+9]=i.y,v[L+q+10]=i.z,v[L+q+11]=B.itemSize===4?i.w:1)}}d={count:u,texture:A,size:new rt(_,S)},n.set(o,d),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,e);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",p),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function Cx(r,t,e,n,i){let s=new WeakMap;function a(c){let h=i.render.frame,u=c.geometry,d=t.get(c,u);if(s.get(d)!==h&&(t.update(d),s.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(e.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,r.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return d}function o(){s=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var Ix={[ia]:"LINEAR_TONE_MAPPING",[sa]:"REINHARD_TONE_MAPPING",[ra]:"CINEON_TONE_MAPPING",[es]:"ACES_FILMIC_TONE_MAPPING",[oa]:"AGX_TONE_MAPPING",[la]:"NEUTRAL_TONE_MAPPING",[aa]:"CUSTOM_TONE_MAPPING"};function Px(r,t,e,n,i,s){let a=new Pe(t,e,{type:r,depthBuffer:i,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new ce;c.setAttribute("position",new ae([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ae([0,2,0,0,2,0],2));let h=new Xs({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new oe(c,h),d=new Ci(-1,1,1,-1,0,1),f=null,p=null,y=!1,g,m=null,b=[],E=!1;this.setSize=function(_,S){a.setSize(_,S),o!==null&&o.setSize(_,S),l!==null&&l.setSize(_,S);for(let v=0;v<b.length;v++){let A=b[v];A.setSize&&A.setSize(_,S)}},this.setEffects=function(_){b=_,E=b.length>0&&b[0].isRenderPass===!0;let S=a.width,v=a.height;b.length>0&&o===null&&(o=new Pe(S,v,{type:ke,depthBuffer:!1,stencilBuffer:!1}),l=new Pe(S,v,{type:ke,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<b.length;A++){let x=b[A];x.setSize&&x.setSize(S,v)}},this.begin=function(_,S){if(y||_.toneMapping===Fn&&b.length===0)return!1;if(m=S,S!==null){let v=S.width,A=S.height;(a.width!==v||a.height!==A)&&this.setSize(v,A)}return E===!1&&_.setRenderTarget(a),g=_.toneMapping,_.toneMapping=Fn,!0},this.hasRenderPass=function(){return E},this.end=function(_,S){_.toneMapping=g,y=!0;let v=a,A=o;for(let x=0;x<b.length;x++){let T=b[x];T.enabled!==!1&&(T.render(_,A,v,S),T.needsSwap!==!1&&(v=A,A=A===o?l:o))}if(f!==_.outputColorSpace||p!==_.toneMapping){f=_.outputColorSpace,p=_.toneMapping,h.defines={},ee.getTransfer(f)===pe&&(h.defines.SRGB_TRANSFER="");let x=Ix[p];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=v.texture,_.setRenderTarget(m),_.render(u,d),m=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var Vf=new nn,Hh=new Si(1,1),Gf=new Lr,Wf=new Eo,Xf=new zr,Sf=[],wf=[],Ef=new Float32Array(16),Tf=new Float32Array(9),Af=new Float32Array(4);function js(r,t,e){let n=r[0];if(n<=0||n>0)return r;let i=t*e,s=Sf[i];if(s===void 0&&(s=new Float32Array(i),Sf[i]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(s,o)}return s}function ze(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function He(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Zl(r,t){let e=wf[t];e===void 0&&(e=new Int32Array(t),wf[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function Lx(r,t){let e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Dx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;r.uniform2fv(this.addr,t),He(e,t)}}function Nx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ze(e,t))return;r.uniform3fv(this.addr,t),He(e,t)}}function Ux(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;r.uniform4fv(this.addr,t),He(e,t)}}function Fx(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),He(e,t)}else{if(ze(e,n))return;Af.set(n),r.uniformMatrix2fv(this.addr,!1,Af),He(e,n)}}function Bx(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),He(e,t)}else{if(ze(e,n))return;Tf.set(n),r.uniformMatrix3fv(this.addr,!1,Tf),He(e,n)}}function Ox(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),He(e,t)}else{if(ze(e,n))return;Ef.set(n),r.uniformMatrix4fv(this.addr,!1,Ef),He(e,n)}}function kx(r,t){let e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function zx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;r.uniform2iv(this.addr,t),He(e,t)}}function Hx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;r.uniform3iv(this.addr,t),He(e,t)}}function Vx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;r.uniform4iv(this.addr,t),He(e,t)}}function Gx(r,t){let e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function Wx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;r.uniform2uiv(this.addr,t),He(e,t)}}function Xx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;r.uniform3uiv(this.addr,t),He(e,t)}}function qx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;r.uniform4uiv(this.addr,t),He(e,t)}}function $x(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Hh.compareFunction=e.isReversedDepthBuffer()?Vl:Hl,s=Hh):s=Vf,e.setTexture2D(t||s,i)}function Yx(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Wf,i)}function Zx(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Xf,i)}function Jx(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Gf,i)}function Kx(r){switch(r){case 5126:return Lx;case 35664:return Dx;case 35665:return Nx;case 35666:return Ux;case 35674:return Fx;case 35675:return Bx;case 35676:return Ox;case 5124:case 35670:return kx;case 35667:case 35671:return zx;case 35668:case 35672:return Hx;case 35669:case 35673:return Vx;case 5125:return Gx;case 36294:return Wx;case 36295:return Xx;case 36296:return qx;case 35678:case 36198:case 36298:case 36306:case 35682:return $x;case 35679:case 36299:case 36307:return Yx;case 35680:case 36300:case 36308:case 36293:return Zx;case 36289:case 36303:case 36311:case 36292:return Jx}}function jx(r,t){r.uniform1fv(this.addr,t)}function Qx(r,t){let e=js(t,this.size,2);r.uniform2fv(this.addr,e)}function ty(r,t){let e=js(t,this.size,3);r.uniform3fv(this.addr,e)}function ey(r,t){let e=js(t,this.size,4);r.uniform4fv(this.addr,e)}function ny(r,t){let e=js(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function iy(r,t){let e=js(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function sy(r,t){let e=js(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function ry(r,t){r.uniform1iv(this.addr,t)}function ay(r,t){r.uniform2iv(this.addr,t)}function oy(r,t){r.uniform3iv(this.addr,t)}function ly(r,t){r.uniform4iv(this.addr,t)}function cy(r,t){r.uniform1uiv(this.addr,t)}function hy(r,t){r.uniform2uiv(this.addr,t)}function dy(r,t){r.uniform3uiv(this.addr,t)}function uy(r,t){r.uniform4uiv(this.addr,t)}function fy(r,t,e){let n=this.cache,i=t.length,s=Zl(e,i);ze(n,s)||(r.uniform1iv(this.addr,s),He(n,s));let a;this.type===r.SAMPLER_2D_SHADOW?a=Hh:a=Vf;for(let o=0;o!==i;++o)e.setTexture2D(t[o]||a,s[o])}function py(r,t,e){let n=this.cache,i=t.length,s=Zl(e,i);ze(n,s)||(r.uniform1iv(this.addr,s),He(n,s));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Wf,s[a])}function my(r,t,e){let n=this.cache,i=t.length,s=Zl(e,i);ze(n,s)||(r.uniform1iv(this.addr,s),He(n,s));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||Xf,s[a])}function gy(r,t,e){let n=this.cache,i=t.length,s=Zl(e,i);ze(n,s)||(r.uniform1iv(this.addr,s),He(n,s));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Gf,s[a])}function xy(r){switch(r){case 5126:return jx;case 35664:return Qx;case 35665:return ty;case 35666:return ey;case 35674:return ny;case 35675:return iy;case 35676:return sy;case 5124:case 35670:return ry;case 35667:case 35671:return ay;case 35668:case 35672:return oy;case 35669:case 35673:return ly;case 5125:return cy;case 36294:return hy;case 36295:return dy;case 36296:return uy;case 35678:case 36198:case 36298:case 36306:case 35682:return fy;case 35679:case 36299:case 36307:return py;case 35680:case 36300:case 36308:case 36293:return my;case 36289:case 36303:case 36311:case 36292:return gy}}var Vh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Kx(e.type)}},Gh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=xy(e.type)}},Wh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(t,e[o.id],n)}}},kh=/(\w+)(\])?(\[|\.)?/g;function Rf(r,t){r.seq.push(t),r.map[t.id]=t}function yy(r,t,e){let n=r.name,i=n.length;for(kh.lastIndex=0;;){let s=kh.exec(n),a=kh.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Rf(e,c===void 0?new Vh(o,r,t):new Gh(o,r,t));break}else{let u=e.map[o];u===void 0&&(u=new Wh(o),Rf(e,u)),e=u}}}var Ks=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);yy(o,l,this)}let i=[],s=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(t,e,n,i){let s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,a=e.length;s!==a;++s){let o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,s=t.length;i!==s;++i){let a=t[i];a.id in e&&n.push(a)}return n}};function Cf(r,t,e){let n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}var vy=37297,_y=0;function My(r,t){let e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=i;a<s;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var If=new Xt;function by(r){ee._getMatrix(If,ee.workingColorSpace,r);let t=`mat3( ${If.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(r)){case Cr:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return Ot("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Pf(r,t,e){let n=r.getShaderParameter(t,r.COMPILE_STATUS),s=(r.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+s+`

`+My(r.getShaderSource(t),o)}else return s}function Sy(r,t){let e=by(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var wy={[ia]:"Linear",[sa]:"Reinhard",[ra]:"Cineon",[es]:"ACESFilmic",[oa]:"AgX",[la]:"Neutral",[aa]:"Custom"};function Ey(r,t){let e=wy[t];return e===void 0?(Ot("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Wl=new I;function Ty(){ee.getLuminanceCoefficients(Wl);let r=Wl.x.toFixed(4),t=Wl.y.toFixed(4),e=Wl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ay(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(va).join(`
`)}function Ry(r){let t=[];for(let e in r){let n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Cy(r,t){let e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let s=r.getActiveAttrib(t,i),a=s.name,o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function va(r){return r!==""}function Lf(r,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Df(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Iy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xh(r){return r.replace(Iy,Ly)}var Py=new Map;function Ly(r,t){let e=te[t];if(e===void 0){let n=Py.get(t);if(n!==void 0)e=te[n],Ot('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Xh(e)}var Dy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nf(r){return r.replace(Dy,Ny)}function Ny(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Uf(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Uy={[Qi]:"SHADOWMAP_TYPE_PCF",[qs]:"SHADOWMAP_TYPE_VSM"};function Fy(r){return Uy[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var By={[Li]:"ENVMAP_TYPE_CUBE",[ns]:"ENVMAP_TYPE_CUBE",[ca]:"ENVMAP_TYPE_CUBE_UV"};function Oy(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":By[r.envMapMode]||"ENVMAP_TYPE_CUBE"}var ky={[ns]:"ENVMAP_MODE_REFRACTION"};function zy(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":ky[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Hy={[mh]:"ENVMAP_BLENDING_MULTIPLY",[Yu]:"ENVMAP_BLENDING_MIX",[Zu]:"ENVMAP_BLENDING_ADD"};function Vy(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":Hy[r.combine]||"ENVMAP_BLENDING_NONE"}function Gy(r){let t=r.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Wy(r,t,e,n){let i=r.getContext(),s=e.defines,a=e.vertexShader,o=e.fragmentShader,l=Fy(e),c=Oy(e),h=zy(e),u=Vy(e),d=Gy(e),f=Ay(e),p=Ry(s),y=i.createProgram(),g,m,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(va).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(va).join(`
`),m.length>0&&(m+=`
`)):(g=[Uf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(va).join(`
`),m=[Uf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Fn?"#define TONE_MAPPING":"",e.toneMapping!==Fn?te.tonemapping_pars_fragment:"",e.toneMapping!==Fn?Ey("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,Sy("linearToOutputTexel",e.outputColorSpace),Ty(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(va).join(`
`)),a=Xh(a),a=Lf(a,e),a=Df(a,e),o=Xh(o),o=Lf(o,e),o=Df(o,e),a=Nf(a),o=Nf(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===wh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===wh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let E=b+g+a,_=b+m+o,S=Cf(i,i.VERTEX_SHADER,E),v=Cf(i,i.FRAGMENT_SHADER,_);i.attachShader(y,S),i.attachShader(y,v),e.index0AttributeName!==void 0?i.bindAttribLocation(y,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y);function A(P){if(r.debug.checkShaderErrors){let N=i.getProgramInfoLog(y)||"",B=i.getShaderInfoLog(S)||"",L=i.getShaderInfoLog(v)||"",O=N.trim(),q=B.trim(),z=L.trim(),j=!0,H=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(j=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,y,S,v);else{let Z=Pf(i,S,"vertex"),Y=Pf(i,v,"fragment");Vt("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+Z+`
`+Y)}else O!==""?Ot("WebGLProgram: Program Info Log:",O):(q===""||z==="")&&(H=!1);H&&(P.diagnostics={runnable:j,programLog:O,vertexShader:{log:q,prefix:g},fragmentShader:{log:z,prefix:m}})}i.deleteShader(S),i.deleteShader(v),x=new Ks(i,y),T=Cy(i,y)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=i.getProgramParameter(y,vy)),R},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=_y++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=S,this.fragmentShader=v,this}var Xy=0,qh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new $h(t),e.set(t,n)),n}},$h=class{constructor(t){this.id=Xy++,this.code=t,this.usedTimes=0}};function qy(r){return r===Ni||r===ma||r===ga}function $y(r,t,e,n,i,s){let a=new Ns,o=new qh,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,d=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return l.add(x),x===0?"uv":`uv${x}`}function y(x,T,R,P,N,B){let L=P.fog,O=N.geometry,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,j=t.get(x.envMap||q,z),H=j&&j.mapping===ca?j.image.height:null,Z=f[x.type];x.precision!==null&&(d=n.getMaxPrecision(x.precision),d!==x.precision&&Ot("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));let Y=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Et=Y!==void 0?Y.length:0,Mt=0;O.morphAttributes.position!==void 0&&(Mt=1),O.morphAttributes.normal!==void 0&&(Mt=2),O.morphAttributes.color!==void 0&&(Mt=3);let jt,Gt,Yt,J;if(Z){let we=ti[Z];jt=we.vertexShader,Gt=we.fragmentShader}else{jt=x.vertexShader,Gt=x.fragmentShader;let we=o.getVertexShaderStage(x),xe=o.getFragmentShaderStage(x);o.update(x,we,xe),Yt=we.id,J=xe.id}let et=r.getRenderTarget(),pt=r.state.buffers.depth.getReversed(),Bt=N.isInstancedMesh===!0,St=N.isBatchedMesh===!0,kt=!!x.map,de=!!x.matcap,it=!!j,at=!!x.aoMap,lt=!!x.lightMap,ct=!!x.bumpMap&&x.wireframe===!1,ut=!!x.normalMap,zt=!!x.displacementMap,Ft=!!x.emissiveMap,Wt=!!x.metalnessMap,qt=!!x.roughnessMap,D=x.anisotropy>0,ge=x.clearcoat>0,ne=x.dispersion>0,C=x.retroreflectivity>0,M=x.iridescence>0,k=x.sheen>0,X=x.transmission>0,K=D&&!!x.anisotropyMap,ht=ge&&!!x.clearcoatMap,dt=ge&&!!x.clearcoatNormalMap,Q=ge&&!!x.clearcoatRoughnessMap,nt=M&&!!x.iridescenceMap,mt=M&&!!x.iridescenceThicknessMap,Dt=k&&!!x.sheenColorMap,vt=k&&!!x.sheenRoughnessMap,gt=!!x.specularMap,Nt=!!x.specularColorMap,Ht=!!x.specularIntensityMap,Zt=X&&!!x.transmissionMap,F=X&&!!x.thicknessMap,xt=!!x.gradientMap,tt=!!x.alphaMap,yt=x.alphaTest>0,wt=!!x.alphaHash,st=!!x.extensions,Ut=Fn;x.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Ut=r.toneMapping);let Pt={shaderID:Z,shaderType:x.type,shaderName:x.name,vertexShader:jt,fragmentShader:Gt,defines:x.defines,customVertexShaderID:Yt,customFragmentShaderID:J,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:St,batchingColor:St&&N._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&N.instanceColor!==null,instancingMorph:Bt&&N.morphTexture!==null,outputColorSpace:et===null?r.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:ee.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:kt,matcap:de,envMap:it,envMapMode:it&&j.mapping,envMapCubeUVHeight:H,aoMap:at,lightMap:lt,bumpMap:ct,normalMap:ut,displacementMap:zt,emissiveMap:Ft,normalMapObjectSpace:ut&&x.normalMapType===ju,normalMapTangentSpace:ut&&x.normalMapType===zl,packedNormalMap:ut&&x.normalMapType===zl&&qy(x.normalMap.format),metalnessMap:Wt,roughnessMap:qt,anisotropy:D,anisotropyMap:K,clearcoat:ge,clearcoatMap:ht,clearcoatNormalMap:dt,clearcoatRoughnessMap:Q,dispersion:ne,retroreflection:C,iridescence:M,iridescenceMap:nt,iridescenceThicknessMap:mt,sheen:k,sheenColorMap:Dt,sheenRoughnessMap:vt,specularMap:gt,specularColorMap:Nt,specularIntensityMap:Ht,transmission:X,transmissionMap:Zt,thicknessMap:F,gradientMap:xt,opaque:x.transparent===!1&&x.blending===Pi&&x.alphaToCoverage===!1,alphaMap:tt,alphaTest:yt,alphaHash:wt,combine:x.combine,mapUv:kt&&p(x.map.channel),aoMapUv:at&&p(x.aoMap.channel),lightMapUv:lt&&p(x.lightMap.channel),bumpMapUv:ct&&p(x.bumpMap.channel),normalMapUv:ut&&p(x.normalMap.channel),displacementMapUv:zt&&p(x.displacementMap.channel),emissiveMapUv:Ft&&p(x.emissiveMap.channel),metalnessMapUv:Wt&&p(x.metalnessMap.channel),roughnessMapUv:qt&&p(x.roughnessMap.channel),anisotropyMapUv:K&&p(x.anisotropyMap.channel),clearcoatMapUv:ht&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:dt&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:Dt&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:vt&&p(x.sheenRoughnessMap.channel),specularMapUv:gt&&p(x.specularMap.channel),specularColorMapUv:Nt&&p(x.specularColorMap.channel),specularIntensityMapUv:Ht&&p(x.specularIntensityMap.channel),transmissionMapUv:Zt&&p(x.transmissionMap.channel),thicknessMapUv:F&&p(x.thicknessMap.channel),alphaMapUv:tt&&p(x.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(ut||D),vertexNormals:!!O.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!O.attributes.uv&&(kt||tt),fog:!!L,useFog:x.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||O.attributes.normal===void 0&&ut===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:pt,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Et,morphTextureStride:Mt,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&R.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ut,decodeVideoTexture:kt&&x.map.isVideoTexture===!0&&ee.getTransfer(x.map.colorSpace)===pe,decodeVideoTextureEmissive:Ft&&x.emissiveMap.isVideoTexture===!0&&ee.getTransfer(x.emissiveMap.colorSpace)===pe,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ye,flipSided:x.side===$e,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:st&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&x.extensions.multiDraw===!0||St)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Pt.vertexUv1s=l.has(1),Pt.vertexUv2s=l.has(2),Pt.vertexUv3s=l.has(3),l.clear(),Pt}function g(x){let T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(let R in x.defines)T.push(R),T.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(m(T,x),b(T,x),T.push(r.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function m(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numSunLights),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numSunLightShadows),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function b(x,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function E(x){let T=f[x.type],R;if(T){let P=ti[T];R=gn.clone(P.uniforms)}else R=x.uniforms;return R}function _(x,T){let R=h.get(T);return R!==void 0?++R.usedTimes:(R=new Wy(r,T,x,i),c.push(R),h.set(T,R)),R}function S(x){if(--x.usedTimes===0){let T=c.indexOf(x);c[T]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function v(x){o.remove(x)}function A(){o.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:E,acquireProgram:_,releaseProgram:S,releaseShaderCache:v,programs:c,dispose:A}}function Yy(){let r=new WeakMap;function t(a){return r.has(a)}function e(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function Zy(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function Ff(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Bf(){let r=[],t=0,e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,p,y,g,m){let b=r[t];return b===void 0?(b={id:d.id,object:d,geometry:f,material:p,materialVariant:a(d),groupOrder:y,renderOrder:d.renderOrder,z:g,group:m},r[t]=b):(b.id=d.id,b.object=d,b.geometry=f,b.material=p,b.materialVariant=a(d),b.groupOrder=y,b.renderOrder=d.renderOrder,b.z=g,b.group=m),t++,b}function l(d,f,p,y,g,m,b){b.reversedDepth===!0&&(g=-g);let E=o(d,f,p,y,g,m);p.transmission>0?n.push(E):p.transparent===!0?i.push(E):e.push(E)}function c(d,f,p,y,g,m){let b=o(d,f,p,y,g,m);p.transmission>0?n.unshift(b):p.transparent===!0?i.unshift(b):e.unshift(b)}function h(d,f){e.length>1&&e.sort(d||Zy),n.length>1&&n.sort(f||Ff),i.length>1&&i.sort(f||Ff)}function u(){for(let d=t,f=r.length;d<f;d++){let p=r[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:l,unshift:c,finish:u,sort:h}}function Jy(){let r=new WeakMap;function t(n,i){let s=r.get(n),a;return s===void 0?(a=new Bf,r.set(n,[a])):i>=s.length?(a=new Bf,s.push(a)):a=s[i],a}function e(){r=new WeakMap}return{get:t,dispose:e}}function Ky(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new I,color:new Rt};break;case"SpotLight":e={position:new I,direction:new I,color:new Rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Rt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Rt,groundColor:new Rt};break;case"RectAreaLight":e={color:new Rt,position:new I,halfWidth:new I,halfHeight:new I};break}return r[t.id]=e,e}}}function jy(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}var Qy=0;function tv(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function ev(r){let t=new Ky,e=jy(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);let i=new I,s=new re,a=new re;function o(c){let h=0,u=0,d=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let f=0,p=0,y=0,g=0,m=0,b=0,E=0,_=0,S=0,v=0,A=0,x=0,T=0,R=0;c.sort(tv);for(let N=0,B=c.length;N<B;N++){let L=c[N],O=L.color,q=L.intensity,z=L.distance,j=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Ni?j=L.shadow.map.texture:j=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=O.r*q,u+=O.g*q,d+=O.b*q;else if(L.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(L.sh.coefficients[H],q);R++}else if(L.isSunLight){let H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let Z=L.shadow,Y=e.get(L);Y.shadowIntensity=Z.intensity,Y.shadowBias=Z.bias,Y.shadowNormalBias=Z.normalBias,Y.shadowRadius=Z.radius,Y.shadowMapSize.copy(Z.mapSize).multiply(Z.getFrameExtents()),n.sunShadow[p]=Y,n.sunShadowMap[p]=j;let Et=Z.getViewportCount();for(let Mt=0;Mt<Et;Mt++)n.sunShadowMatrix[y+Mt]=Z.getMatrix(Mt),n.sunShadowCascade[y+Mt]=Z._cascadeData[Mt];y+=Et,p++}n.sun[f]=H,f++}else if(L.isDirectionalLight){let H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let Z=L.shadow,Y=e.get(L);Y.shadowIntensity=Z.intensity,Y.shadowBias=Z.bias,Y.shadowNormalBias=Z.normalBias,Y.shadowRadius=Z.radius,Y.shadowMapSize=Z.mapSize,n.directionalShadow[g]=Y,n.directionalShadowMap[g]=j,n.directionalShadowMatrix[g]=L.shadow.matrix,S++}n.directional[g]=H,g++}else if(L.isSpotLight){let H=t.get(L);H.position.setFromMatrixPosition(L.matrixWorld),H.color.copy(O).multiplyScalar(q),H.distance=z,H.coneCos=Math.cos(L.angle),H.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),H.decay=L.decay,n.spot[b]=H;let Z=L.shadow;if(L.map&&(n.spotLightMap[x]=L.map,x++,Z.updateMatrices(L),L.castShadow&&T++),n.spotLightMatrix[b]=Z.matrix,L.castShadow){let Y=e.get(L);Y.shadowIntensity=Z.intensity,Y.shadowBias=Z.bias,Y.shadowNormalBias=Z.normalBias,Y.shadowRadius=Z.radius,Y.shadowMapSize=Z.mapSize,n.spotShadow[b]=Y,n.spotShadowMap[b]=j,A++}b++}else if(L.isRectAreaLight){let H=t.get(L);H.color.copy(O).multiplyScalar(q),H.halfWidth.set(L.width*.5,0,0),H.halfHeight.set(0,L.height*.5,0),n.rectArea[E]=H,E++}else if(L.isPointLight){let H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),H.distance=L.distance,H.decay=L.decay,L.castShadow){let Z=L.shadow,Y=e.get(L);Y.shadowIntensity=Z.intensity,Y.shadowBias=Z.bias,Y.shadowNormalBias=Z.normalBias,Y.shadowRadius=Z.radius,Y.shadowMapSize=Z.mapSize,Y.shadowCameraNear=Z.camera.near,Y.shadowCameraFar=Z.camera.far,n.pointShadow[m]=Y,n.pointShadowMap[m]=j,n.pointShadowMatrix[m]=L.shadow.matrix,v++}n.point[m]=H,m++}else if(L.isHemisphereLight){let H=t.get(L);H.skyColor.copy(L.color).multiplyScalar(q),H.groundColor.copy(L.groundColor).multiplyScalar(q),n.hemi[_]=H,_++}}E>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ft.LTC_FLOAT_1,n.rectAreaLTC2=ft.LTC_FLOAT_2):(n.rectAreaLTC1=ft.LTC_HALF_1,n.rectAreaLTC2=ft.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let P=n.hash;(P.sunLength!==f||P.directionalLength!==g||P.pointLength!==m||P.spotLength!==b||P.rectAreaLength!==E||P.hemiLength!==_||P.numSunShadows!==p||P.numDirectionalShadows!==S||P.numPointShadows!==v||P.numSpotShadows!==A||P.numSpotMaps!==x||P.numLightProbes!==R)&&(n.sun.length=f,n.directional.length=g,n.spot.length=b,n.rectArea.length=E,n.point.length=m,n.hemi.length=_,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=v,n.pointShadowMap.length=v,n.pointShadowMatrix.length=v,n.spotShadow.length=A,n.spotShadowMap.length=A,n.spotLightMatrix.length=A+x-T,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=R,P.sunLength=f,P.directionalLength=g,P.pointLength=m,P.spotLength=b,P.rectAreaLength=E,P.hemiLength=_,P.numSunShadows=p,P.numDirectionalShadows=S,P.numPointShadows=v,P.numSpotShadows=A,P.numSpotMaps=x,P.numLightProbes=R,n.version=Qy++)}function l(c,h){let u=0,d=0,f=0,p=0,y=0,g=0,m=h.matrixWorldInverse;for(let b=0,E=c.length;b<E;b++){let _=c[b];if(_.isSunLight){let S=n.sun[u];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(m),u++}else if(_.isDirectionalLight){let S=n.directional[d];S.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(m),d++}else if(_.isSpotLight){let S=n.spot[p];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(m),p++}else if(_.isRectAreaLight){let S=n.rectArea[y];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),a.identity(),s.copy(_.matrixWorld),s.premultiply(m),a.extractRotation(s),S.halfWidth.set(_.width*.5,0,0),S.halfHeight.set(0,_.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),y++}else if(_.isPointLight){let S=n.point[f];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),f++}else if(_.isHemisphereLight){let S=n.hemi[g];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:n}}function Of(r){let t=new ev(r),e=[],n=[],i=[];function s(d){u.camera=d,e.length=0,n.length=0,i.length=0}function a(d){e.push(d)}function o(d){n.push(d)}function l(d){i.push(d)}function c(){t.setup(e)}function h(d){t.setupView(e,d)}let u={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function nv(r){let t=new WeakMap;function e(i,s=0){let a=t.get(i),o;return a===void 0?(o=new Of(r),t.set(i,[o])):s>=a.length?(o=new Of(r),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var iv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,rv=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],av=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],kf=new re,ya=new I,zh=new I;function ov(r,t,e){let n=new ks,i=new rt,s=new rt,a=new Te,o=new Oo,l=new ko,c={},h=e.maxTextureSize,u={[Ii]:$e,[$e]:Ii,[Ye]:Ye},d=new fe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:iv,fragmentShader:sv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let p=new ce;p.setAttribute("position",new ve(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new oe(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qi;let m=this.type;this.render=function(v,A,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||v.length===0)return;this.type===Cu&&(Ot("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Qi);let T=r.getRenderTarget(),R=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),N=r.state;N.setBlending(wn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let B=m!==this.type;B&&A.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(O=>O.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,O=v.length;L<O;L++){let q=v[L],z=q.shadow;if(z===void 0){Ot("WebGLShadowMap:",q,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);let j=z.getFrameExtents();i.multiply(j),s.copy(z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/j.x),i.x=s.x*j.x,z.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/j.y),i.y=s.y*j.y,z.mapSize.y=s.y));let H=r.state.buffers.depth.getReversed();if(z.camera._reversedDepth=H,z.map===null||B===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===qs){if(q.isPointLight){Ot("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new Pe(i.x,i.y,{format:Ni,type:ke,minFilter:De,magFilter:De,generateMipmaps:!1}),z.map.texture.name=q.name+".shadowMap",z.map.depthTexture=new Si(i.x,i.y,En),z.map.depthTexture.name=q.name+".shadowMapDepth",z.map.depthTexture.format=$n,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=We,z.map.depthTexture.magFilter=We}else q.isPointLight?(z.map=new ql(i.x),z.map.depthTexture=new Io(i.x,Bn)):(z.map=new Pe(i.x,i.y),z.map.depthTexture=new Si(i.x,i.y,Bn)),z.map.depthTexture.name=q.name+".shadowMap",z.map.depthTexture.format=$n,this.type===Qi?(z.map.depthTexture.compareFunction=H?Vl:Hl,z.map.depthTexture.minFilter=De,z.map.depthTexture.magFilter=De):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=We,z.map.depthTexture.magFilter=We);z.camera.updateProjectionMatrix()}z.map.isWebGLCubeRenderTarget!==!0&&(z.map.width!==i.x||z.map.height!==i.y)&&z.map.setSize(i.x,i.y);let Z=z.map.isWebGLCubeRenderTarget?6:z.getViewportCount();q.isPointLight!==!0&&z.updateMatrices(q,x);for(let Y=0;Y<Z;Y++){let Et=z.getCamera(Y);if(q.isPointLight){let Mt=z.camera,jt=z.matrix,Gt=q.distance||Mt.far;Gt!==Mt.far&&(Mt.far=Gt,Mt.updateProjectionMatrix()),ya.setFromMatrixPosition(q.matrixWorld),Mt.position.copy(ya),zh.copy(Mt.position),zh.add(rv[Y]),Mt.up.copy(av[Y]),Mt.lookAt(zh),Mt.updateMatrixWorld(),jt.makeTranslation(-ya.x,-ya.y,-ya.z),kf.multiplyMatrices(Mt.projectionMatrix,Mt.matrixWorldInverse),z._frustum.setFromProjectionMatrix(kf,Mt.coordinateSystem,Mt.reversedDepth)}if(z.map.isWebGLCubeRenderTarget)r.setRenderTarget(z.map,Y),r.clear();else{Y===0&&(r.setRenderTarget(z.map),r.clear());let Mt=z.getViewport(Y);a.set(s.x*Mt.x,s.y*Mt.y,s.x*Mt.z,s.y*Mt.w),N.viewport(a)}n=z.getFrustum(Y),_(A,x,Et,q,this.type)}z.isPointLightShadow!==!0&&this.type===qs&&b(z,x),z.needsUpdate=!1}m=this.type,g.needsUpdate=!1,r.setRenderTarget(T,R,P)};function b(v,A){let x=t.update(y);d.defines.VSM_SAMPLES!==v.blurSamples&&(d.defines.VSM_SAMPLES=v.blurSamples,f.defines.VSM_SAMPLES=v.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),v.mapPass===null?v.mapPass=new Pe(i.x,i.y,{format:Ni,type:ke}):(v.mapPass.width!==v.map.width||v.mapPass.height!==v.map.height)&&v.mapPass.setSize(v.map.width,v.map.height),d.uniforms.shadow_pass.value=v.map.depthTexture,d.uniforms.resolution.value.set(v.map.width,v.map.height),d.uniforms.radius.value=v.radius,r.setRenderTarget(v.mapPass),r.clear(),r.renderBufferDirect(A,null,x,d,y,null),f.uniforms.shadow_pass.value=v.mapPass.texture,f.uniforms.resolution.value.set(v.map.width,v.map.height),f.uniforms.radius.value=v.radius,r.setRenderTarget(v.map),r.clear(),r.renderBufferDirect(A,null,x,f,y,null)}function E(v,A,x,T){let R=null,P=x.isPointLight===!0?v.customDistanceMaterial:v.customDepthMaterial;if(P!==void 0)R=P;else if(R=x.isPointLight===!0?l:o,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let N=R.uuid,B=A.uuid,L=c[N];L===void 0&&(L={},c[N]=L);let O=L[B];O===void 0&&(O=R.clone(),L[B]=O,A.addEventListener("dispose",S)),R=O}if(R.visible=A.visible,R.wireframe=A.wireframe,T===qs?R.side=A.shadowSide!==null?A.shadowSide:A.side:R.side=A.shadowSide!==null?A.shadowSide:u[A.side],R.alphaMap=A.alphaMap,R.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,R.map=A.map,R.clipShadows=A.clipShadows,R.clippingPlanes=A.clippingPlanes,R.clipIntersection=A.clipIntersection,R.displacementMap=A.displacementMap,R.displacementScale=A.displacementScale,R.displacementBias=A.displacementBias,R.wireframeLinewidth=A.wireframeLinewidth,R.linewidth=A.linewidth,x.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let N=r.properties.get(R);N.light=x}return R}function _(v,A,x,T,R){if(v.visible===!1)return;if(v.layers.test(A.layers)&&(v.isMesh||v.isLine||v.isPoints)&&(v.castShadow||v.receiveShadow&&R===qs)&&(!v.frustumCulled||v.intersectsFrustum(n))){v.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,v.matrixWorld);let B=t.update(v),L=v.material;if(Array.isArray(L)){let O=B.groups;for(let q=0,z=O.length;q<z;q++){let j=O[q],H=L[j.materialIndex];if(H&&H.visible){let Z=E(v,H,T,R);v.onBeforeShadow(r,v,A,x,B,Z,j),r.renderBufferDirect(x,null,B,Z,v,j),v.onAfterShadow(r,v,A,x,B,Z,j)}}}else if(L.visible){let O=E(v,L,T,R);v.onBeforeShadow(r,v,A,x,B,O,null),r.renderBufferDirect(x,null,B,O,v,null),v.onAfterShadow(r,v,A,x,B,O,null)}}let N=v.children;for(let B=0,L=N.length;B<L;B++)_(N[B],A,x,T,R)}function S(v){v.target.removeEventListener("dispose",S);for(let x in c){let T=c[x],R=v.target.uuid;R in T&&(T[R].dispose(),delete T[R])}}}function lv(r,t){function e(){let F=!1,xt=new Te,tt=null,yt=new Te(0,0,0,0);return{setMask:function(wt){tt!==wt&&!F&&(r.colorMask(wt,wt,wt,wt),tt=wt)},setLocked:function(wt){F=wt},setClear:function(wt,st,Ut,Pt,we){we===!0&&(wt*=Pt,st*=Pt,Ut*=Pt),xt.set(wt,st,Ut,Pt),yt.equals(xt)===!1&&(r.clearColor(wt,st,Ut,Pt),yt.copy(xt))},reset:function(){F=!1,tt=null,yt.set(-1,0,0,0)}}}function n(){let F=!1,xt=!1,tt=null,yt=null,wt=null;return{setReversed:function(st){if(xt!==st){let Ut=t.get("EXT_clip_control");st?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT),xt=st;let Pt=wt;wt=null,this.setClear(Pt)}},getReversed:function(){return xt},setTest:function(st){st?et(r.DEPTH_TEST):pt(r.DEPTH_TEST)},setMask:function(st){tt!==st&&!F&&(r.depthMask(st),tt=st)},setFunc:function(st){if(xt&&(st=hf[st]),yt!==st){switch(st){case fo:r.depthFunc(r.NEVER);break;case po:r.depthFunc(r.ALWAYS);break;case mo:r.depthFunc(r.LESS);break;case Is:r.depthFunc(r.LEQUAL);break;case go:r.depthFunc(r.EQUAL);break;case xo:r.depthFunc(r.GEQUAL);break;case yo:r.depthFunc(r.GREATER);break;case vo:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}yt=st}},setLocked:function(st){F=st},setClear:function(st){wt!==st&&(wt=st,xt&&(st=1-st),r.clearDepth(st))},reset:function(){F=!1,tt=null,yt=null,wt=null,xt=!1}}}function i(){let F=!1,xt=null,tt=null,yt=null,wt=null,st=null,Ut=null,Pt=null,we=null;return{setTest:function(xe){F||(xe?et(r.STENCIL_TEST):pt(r.STENCIL_TEST))},setMask:function(xe){xt!==xe&&!F&&(r.stencilMask(xe),xt=xe)},setFunc:function(xe,An,zn){(tt!==xe||yt!==An||wt!==zn)&&(r.stencilFunc(xe,An,zn),tt=xe,yt=An,wt=zn)},setOp:function(xe,An,zn){(st!==xe||Ut!==An||Pt!==zn)&&(r.stencilOp(xe,An,zn),st=xe,Ut=An,Pt=zn)},setLocked:function(xe){F=xe},setClear:function(xe){we!==xe&&(r.clearStencil(xe),we=xe)},reset:function(){F=!1,xt=null,tt=null,yt=null,wt=null,st=null,Ut=null,Pt=null,we=null}}}let s=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap,h={},u={},d={},f=new WeakMap,p=[],y=null,g=!1,m=null,b=null,E=null,_=null,S=null,v=null,A=null,x=new Rt(0,0,0),T=0,R=!1,P=null,N=null,B=null,L=null,O=null,q=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,j=0,H=r.getParameter(r.VERSION);H.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(H)[1]),z=j>=1):H.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),z=j>=2);let Z=null,Y={},Et=r.getParameter(r.SCISSOR_BOX),Mt=r.getParameter(r.VIEWPORT),jt=new Te().fromArray(Et),Gt=new Te().fromArray(Mt);function Yt(F,xt,tt,yt){let wt=new Uint8Array(4),st=r.createTexture();r.bindTexture(F,st),r.texParameteri(F,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(F,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ut=0;Ut<tt;Ut++)F===r.TEXTURE_3D||F===r.TEXTURE_2D_ARRAY?r.texImage3D(xt,0,r.RGBA,1,1,yt,0,r.RGBA,r.UNSIGNED_BYTE,wt):r.texImage2D(xt+Ut,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,wt);return st}let J={};J[r.TEXTURE_2D]=Yt(r.TEXTURE_2D,r.TEXTURE_2D,1),J[r.TEXTURE_CUBE_MAP]=Yt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[r.TEXTURE_2D_ARRAY]=Yt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),J[r.TEXTURE_3D]=Yt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(r.DEPTH_TEST),a.setFunc(Is),ct(!1),ut(hh),et(r.CULL_FACE),at(wn);function et(F){h[F]!==!0&&(r.enable(F),h[F]=!0)}function pt(F){h[F]!==!1&&(r.disable(F),h[F]=!1)}function Bt(F,xt){return d[F]!==xt?(r.bindFramebuffer(F,xt),d[F]=xt,F===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=xt),F===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=xt),!0):!1}function St(F,xt){let tt=p,yt=!1;if(F){tt=f.get(xt),tt===void 0&&(tt=[],f.set(xt,tt));let wt=F.textures;if(tt.length!==wt.length||tt[0]!==r.COLOR_ATTACHMENT0){for(let st=0,Ut=wt.length;st<Ut;st++)tt[st]=r.COLOR_ATTACHMENT0+st;tt.length=wt.length,yt=!0}}else tt[0]!==r.BACK&&(tt[0]=r.BACK,yt=!0);yt&&r.drawBuffers(tt)}function kt(F){return y!==F?(r.useProgram(F),y=F,!0):!1}let de={[ts]:r.FUNC_ADD,[Pu]:r.FUNC_SUBTRACT,[Lu]:r.FUNC_REVERSE_SUBTRACT};de[Du]=r.MIN,de[Nu]=r.MAX;let it={[Uu]:r.ZERO,[Fu]:r.ONE,[Bu]:r.SRC_COLOR,[fh]:r.SRC_ALPHA,[Gu]:r.SRC_ALPHA_SATURATE,[Hu]:r.DST_COLOR,[ku]:r.DST_ALPHA,[Ou]:r.ONE_MINUS_SRC_COLOR,[ph]:r.ONE_MINUS_SRC_ALPHA,[Vu]:r.ONE_MINUS_DST_COLOR,[zu]:r.ONE_MINUS_DST_ALPHA,[Wu]:r.CONSTANT_COLOR,[Xu]:r.ONE_MINUS_CONSTANT_COLOR,[qu]:r.CONSTANT_ALPHA,[$u]:r.ONE_MINUS_CONSTANT_ALPHA};function at(F,xt,tt,yt,wt,st,Ut,Pt,we,xe){if(F===wn){g===!0&&(pt(r.BLEND),g=!1);return}if(g===!1&&(et(r.BLEND),g=!0),F!==Iu){if(F!==m||xe!==R){if((b!==ts||S!==ts)&&(r.blendEquation(r.FUNC_ADD),b=ts,S=ts),xe)switch(F){case Pi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case on:r.blendFunc(r.ONE,r.ONE);break;case dh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case uh:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Vt("WebGLState: Invalid blending: ",F);break}else switch(F){case Pi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case on:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case dh:Vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case uh:Vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Vt("WebGLState: Invalid blending: ",F);break}E=null,_=null,v=null,A=null,x.set(0,0,0),T=0,m=F,R=xe}return}wt=wt||xt,st=st||tt,Ut=Ut||yt,(xt!==b||wt!==S)&&(r.blendEquationSeparate(de[xt],de[wt]),b=xt,S=wt),(tt!==E||yt!==_||st!==v||Ut!==A)&&(r.blendFuncSeparate(it[tt],it[yt],it[st],it[Ut]),E=tt,_=yt,v=st,A=Ut),(Pt.equals(x)===!1||we!==T)&&(r.blendColor(Pt.r,Pt.g,Pt.b,we),x.copy(Pt),T=we),m=F,R=!1}function lt(F,xt){F.side===Ye?pt(r.CULL_FACE):et(r.CULL_FACE);let tt=F.side===$e;xt&&(tt=!tt),ct(tt),F.blending===Pi&&F.transparent===!1?at(wn):at(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),s.setMask(F.colorWrite);let yt=F.stencilWrite;o.setTest(yt),yt&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Ft(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?et(r.SAMPLE_ALPHA_TO_COVERAGE):pt(r.SAMPLE_ALPHA_TO_COVERAGE)}function ct(F){P!==F&&(F?r.frontFace(r.CW):r.frontFace(r.CCW),P=F)}function ut(F){F!==Au?(et(r.CULL_FACE),F!==N&&(F===hh?r.cullFace(r.BACK):F===Ru?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):pt(r.CULL_FACE),N=F}function zt(F){F!==B&&(z&&r.lineWidth(F),B=F)}function Ft(F,xt,tt){F?(et(r.POLYGON_OFFSET_FILL),(L!==xt||O!==tt)&&(L=xt,O=tt,a.getReversed()&&(xt=-xt),r.polygonOffset(xt,tt))):pt(r.POLYGON_OFFSET_FILL)}function Wt(F){F?et(r.SCISSOR_TEST):pt(r.SCISSOR_TEST)}function qt(F){F===void 0&&(F=r.TEXTURE0+q-1),Z!==F&&(r.activeTexture(F),Z=F)}function D(F,xt,tt){tt===void 0&&(Z===null?tt=r.TEXTURE0+q-1:tt=Z);let yt=Y[tt];yt===void 0&&(yt={type:void 0,texture:void 0},Y[tt]=yt),(yt.type!==F||yt.texture!==xt)&&(Z!==tt&&(r.activeTexture(tt),Z=tt),r.bindTexture(F,xt||J[F]),yt.type=F,yt.texture=xt)}function ge(){let F=Y[Z];F!==void 0&&F.type!==void 0&&(r.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function ne(){try{r.compressedTexImage2D(...arguments)}catch(F){Vt("WebGLState:",F)}}function C(){try{r.compressedTexImage3D(...arguments)}catch(F){Vt("WebGLState:",F)}}function M(){try{r.texSubImage2D(...arguments)}catch(F){Vt("WebGLState:",F)}}function k(){try{r.texSubImage3D(...arguments)}catch(F){Vt("WebGLState:",F)}}function X(){try{r.compressedTexSubImage2D(...arguments)}catch(F){Vt("WebGLState:",F)}}function K(){try{r.compressedTexSubImage3D(...arguments)}catch(F){Vt("WebGLState:",F)}}function ht(){try{r.texStorage2D(...arguments)}catch(F){Vt("WebGLState:",F)}}function dt(){try{r.texStorage3D(...arguments)}catch(F){Vt("WebGLState:",F)}}function Q(){try{r.texImage2D(...arguments)}catch(F){Vt("WebGLState:",F)}}function nt(){try{r.texImage3D(...arguments)}catch(F){Vt("WebGLState:",F)}}function mt(F){return u[F]!==void 0?u[F]:r.getParameter(F)}function Dt(F,xt){u[F]!==xt&&(r.pixelStorei(F,xt),u[F]=xt)}function vt(F){jt.equals(F)===!1&&(r.scissor(F.x,F.y,F.z,F.w),jt.copy(F))}function gt(F){Gt.equals(F)===!1&&(r.viewport(F.x,F.y,F.z,F.w),Gt.copy(F))}function Nt(F,xt){let tt=c.get(xt);tt===void 0&&(tt=new WeakMap,c.set(xt,tt));let yt=tt.get(F);yt===void 0&&(yt=r.getUniformBlockIndex(xt,F.name),tt.set(F,yt))}function Ht(F,xt){let yt=c.get(xt).get(F);l.get(xt)!==yt&&(r.uniformBlockBinding(xt,yt,F.__bindingPointIndex),l.set(xt,yt))}function Zt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),h={},u={},Z=null,Y={},d={},f=new WeakMap,p=[],y=null,g=!1,m=null,b=null,E=null,_=null,S=null,v=null,A=null,x=new Rt(0,0,0),T=0,R=!1,P=null,N=null,B=null,L=null,O=null,jt.set(0,0,r.canvas.width,r.canvas.height),Gt.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:et,disable:pt,bindFramebuffer:Bt,drawBuffers:St,useProgram:kt,setBlending:at,setMaterial:lt,setFlipSided:ct,setCullFace:ut,setLineWidth:zt,setPolygonOffset:Ft,setScissorTest:Wt,activeTexture:qt,bindTexture:D,unbindTexture:ge,compressedTexImage2D:ne,compressedTexImage3D:C,texImage2D:Q,texImage3D:nt,pixelStorei:Dt,getParameter:mt,updateUBOMapping:Nt,uniformBlockBinding:Ht,texStorage2D:ht,texStorage3D:dt,texSubImage2D:M,texSubImage3D:k,compressedTexSubImage2D:X,compressedTexSubImage3D:K,scissor:vt,viewport:gt,reset:Zt}}function cv(r,t,e,n,i,s,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new rt,h=new WeakMap,u=new Set,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(C,M){return p?new OffscreenCanvas(C,M):Ir("canvas")}function g(C,M,k){let X=1,K=ne(C);if((K.width>k||K.height>k)&&(X=k/Math.max(K.width,K.height)),X<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let ht=Math.floor(X*K.width),dt=Math.floor(X*K.height);d===void 0&&(d=y(ht,dt));let Q=M?y(ht,dt):d;return Q.width=ht,Q.height=dt,Q.getContext("2d").drawImage(C,0,0,ht,dt),Ot("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+ht+"x"+dt+")."),Q}else return"data"in C&&Ot("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),C;return C}function m(C){return C.generateMipmaps}function b(C){r.generateMipmap(C)}function E(C){return C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?r.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function _(C,M,k,X,K,ht=!1){if(C!==null){if(r[C]!==void 0)return r[C];Ot("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let dt;X&&(dt=t.get("EXT_texture_norm16"),dt||Ot("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=M;if(M===r.RED&&(k===r.FLOAT&&(Q=r.R32F),k===r.HALF_FLOAT&&(Q=r.R16F),k===r.UNSIGNED_BYTE&&(Q=r.R8),k===r.UNSIGNED_SHORT&&dt&&(Q=dt.R16_EXT),k===r.SHORT&&dt&&(Q=dt.R16_SNORM_EXT)),M===r.RED_INTEGER&&(k===r.UNSIGNED_BYTE&&(Q=r.R8UI),k===r.UNSIGNED_SHORT&&(Q=r.R16UI),k===r.UNSIGNED_INT&&(Q=r.R32UI),k===r.BYTE&&(Q=r.R8I),k===r.SHORT&&(Q=r.R16I),k===r.INT&&(Q=r.R32I)),M===r.RG&&(k===r.FLOAT&&(Q=r.RG32F),k===r.HALF_FLOAT&&(Q=r.RG16F),k===r.UNSIGNED_BYTE&&(Q=r.RG8),k===r.UNSIGNED_SHORT&&dt&&(Q=dt.RG16_EXT),k===r.SHORT&&dt&&(Q=dt.RG16_SNORM_EXT)),M===r.RG_INTEGER&&(k===r.UNSIGNED_BYTE&&(Q=r.RG8UI),k===r.UNSIGNED_SHORT&&(Q=r.RG16UI),k===r.UNSIGNED_INT&&(Q=r.RG32UI),k===r.BYTE&&(Q=r.RG8I),k===r.SHORT&&(Q=r.RG16I),k===r.INT&&(Q=r.RG32I)),M===r.RGB_INTEGER&&(k===r.UNSIGNED_BYTE&&(Q=r.RGB8UI),k===r.UNSIGNED_SHORT&&(Q=r.RGB16UI),k===r.UNSIGNED_INT&&(Q=r.RGB32UI),k===r.BYTE&&(Q=r.RGB8I),k===r.SHORT&&(Q=r.RGB16I),k===r.INT&&(Q=r.RGB32I)),M===r.RGBA_INTEGER&&(k===r.UNSIGNED_BYTE&&(Q=r.RGBA8UI),k===r.UNSIGNED_SHORT&&(Q=r.RGBA16UI),k===r.UNSIGNED_INT&&(Q=r.RGBA32UI),k===r.BYTE&&(Q=r.RGBA8I),k===r.SHORT&&(Q=r.RGBA16I),k===r.INT&&(Q=r.RGBA32I)),M===r.RGB&&(k===r.UNSIGNED_SHORT&&dt&&(Q=dt.RGB16_EXT),k===r.SHORT&&dt&&(Q=dt.RGB16_SNORM_EXT),k===r.UNSIGNED_INT_5_9_9_9_REV&&(Q=r.RGB9_E5),k===r.UNSIGNED_INT_10F_11F_11F_REV&&(Q=r.R11F_G11F_B10F)),M===r.RGBA){let nt=ht?Cr:ee.getTransfer(K);k===r.FLOAT&&(Q=r.RGBA32F),k===r.HALF_FLOAT&&(Q=r.RGBA16F),k===r.UNSIGNED_BYTE&&(Q=nt===pe?r.SRGB8_ALPHA8:r.RGBA8),k===r.UNSIGNED_SHORT&&dt&&(Q=dt.RGBA16_EXT),k===r.SHORT&&dt&&(Q=dt.RGBA16_SNORM_EXT),k===r.UNSIGNED_SHORT_4_4_4_4&&(Q=r.RGBA4),k===r.UNSIGNED_SHORT_5_5_5_1&&(Q=r.RGB5_A1)}return(Q===r.R16F||Q===r.R32F||Q===r.RG16F||Q===r.RG32F||Q===r.RGBA16F||Q===r.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function S(C,M){let k;return C?M===null||M===Bn||M===Ys?k=r.DEPTH24_STENCIL8:M===En?k=r.DEPTH32F_STENCIL8:M===$s&&(k=r.DEPTH24_STENCIL8,Ot("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Bn||M===Ys?k=r.DEPTH_COMPONENT24:M===En?k=r.DEPTH_COMPONENT32F:M===$s&&(k=r.DEPTH_COMPONENT16),k}function v(C,M){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==We&&C.minFilter!==De?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function A(C){let M=C.target;M.removeEventListener("dispose",A),T(M),M.isVideoTexture&&h.delete(M),M.isHTMLTexture&&u.delete(M)}function x(C){let M=C.target;M.removeEventListener("dispose",x),P(M)}function T(C){let M=n.get(C);if(M.__webglInit===void 0)return;let k=C.source,X=f.get(k);if(X){let K=X[M.__cacheKey];K.usedTimes--,K.usedTimes===0&&R(C),Object.keys(X).length===0&&f.delete(k)}n.remove(C)}function R(C){let M=n.get(C);r.deleteTexture(M.__webglTexture);let k=C.source,X=f.get(k);delete X[M.__cacheKey],a.memory.textures--}function P(C){let M=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(M.__webglFramebuffer[X]))for(let K=0;K<M.__webglFramebuffer[X].length;K++)r.deleteFramebuffer(M.__webglFramebuffer[X][K]);else r.deleteFramebuffer(M.__webglFramebuffer[X]);M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer[X])}else{if(Array.isArray(M.__webglFramebuffer))for(let X=0;X<M.__webglFramebuffer.length;X++)r.deleteFramebuffer(M.__webglFramebuffer[X]);else r.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&r.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let X=0;X<M.__webglColorRenderbuffer.length;X++)M.__webglColorRenderbuffer[X]&&r.deleteRenderbuffer(M.__webglColorRenderbuffer[X]);M.__webglDepthRenderbuffer&&r.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let k=C.textures;for(let X=0,K=k.length;X<K;X++){let ht=n.get(k[X]);ht.__webglTexture&&(r.deleteTexture(ht.__webglTexture),a.memory.textures--),n.remove(k[X])}n.remove(C)}let N=0;function B(){N=0}function L(){return N}function O(C){N=C}function q(){let C=N;return C>=i.maxTextures&&Ot("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+i.maxTextures),N+=1,C}function z(C){let M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function j(C,M){let k=n.get(C);if(C.isVideoTexture&&D(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&k.__version!==C.version){let X=C.image;if(X===null)Ot("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Ot("WebGLRenderer: Texture marked for update but image is incomplete");else{pt(k,C,M);return}}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(r.TEXTURE_2D,k.__webglTexture,r.TEXTURE0+M)}function H(C,M){let k=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){pt(k,C,M);return}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(r.TEXTURE_2D_ARRAY,k.__webglTexture,r.TEXTURE0+M)}function Z(C,M){let k=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){pt(k,C,M);return}e.bindTexture(r.TEXTURE_3D,k.__webglTexture,r.TEXTURE0+M)}function Y(C,M){let k=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&k.__version!==C.version){Bt(k,C,M);return}e.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture,r.TEXTURE0+M)}let Et={[qi]:r.REPEAT,[qn]:r.CLAMP_TO_EDGE,[_o]:r.MIRRORED_REPEAT},Mt={[We]:r.NEAREST,[Ju]:r.NEAREST_MIPMAP_NEAREST,[ha]:r.NEAREST_MIPMAP_LINEAR,[De]:r.LINEAR,[nl]:r.LINEAR_MIPMAP_NEAREST,[jn]:r.LINEAR_MIPMAP_LINEAR},jt={[tf]:r.NEVER,[af]:r.ALWAYS,[ef]:r.LESS,[Hl]:r.LEQUAL,[nf]:r.EQUAL,[Vl]:r.GEQUAL,[sf]:r.GREATER,[rf]:r.NOTEQUAL};function Gt(C,M){if(M.type===En&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===De||M.magFilter===nl||M.magFilter===ha||M.magFilter===jn||M.minFilter===De||M.minFilter===nl||M.minFilter===ha||M.minFilter===jn)&&Ot("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,Et[M.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,Et[M.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,Et[M.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,Mt[M.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,Mt[M.minFilter]),M.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,jt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===We||M.minFilter!==ha&&M.minFilter!==jn||M.type===En&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let k=t.get("EXT_texture_filter_anisotropic");r.texParameterf(C,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Yt(C,M){let k=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",A));let X=M.source,K=f.get(X);K===void 0&&(K={},f.set(X,K));let ht=z(M);if(ht!==C.__cacheKey){K[ht]===void 0&&(K[ht]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,k=!0),K[ht].usedTimes++;let dt=K[C.__cacheKey];dt!==void 0&&(K[C.__cacheKey].usedTimes--,dt.usedTimes===0&&R(M)),C.__cacheKey=ht,C.__webglTexture=K[ht].texture}return k}function J(C,M,k){return Math.floor(Math.floor(C/k)/M)}function et(C,M,k,X){let ht=C.updateRanges;if(ht.length===0)e.texSubImage2D(r.TEXTURE_2D,0,0,0,M.width,M.height,k,X,M.data);else{ht.sort((Dt,vt)=>Dt.start-vt.start);let dt=0;for(let Dt=1;Dt<ht.length;Dt++){let vt=ht[dt],gt=ht[Dt],Nt=vt.start+vt.count,Ht=J(gt.start,M.width,4),Zt=J(vt.start,M.width,4);gt.start<=Nt+1&&Ht===Zt&&J(gt.start+gt.count-1,M.width,4)===Ht?vt.count=Math.max(vt.count,gt.start+gt.count-vt.start):(++dt,ht[dt]=gt)}ht.length=dt+1;let Q=e.getParameter(r.UNPACK_ROW_LENGTH),nt=e.getParameter(r.UNPACK_SKIP_PIXELS),mt=e.getParameter(r.UNPACK_SKIP_ROWS);e.pixelStorei(r.UNPACK_ROW_LENGTH,M.width);for(let Dt=0,vt=ht.length;Dt<vt;Dt++){let gt=ht[Dt],Nt=Math.floor(gt.start/4),Ht=Math.ceil(gt.count/4),Zt=Nt%M.width,F=Math.floor(Nt/M.width),xt=Ht,tt=1;e.pixelStorei(r.UNPACK_SKIP_PIXELS,Zt),e.pixelStorei(r.UNPACK_SKIP_ROWS,F),e.texSubImage2D(r.TEXTURE_2D,0,Zt,F,xt,tt,k,X,M.data)}C.clearUpdateRanges(),e.pixelStorei(r.UNPACK_ROW_LENGTH,Q),e.pixelStorei(r.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(r.UNPACK_SKIP_ROWS,mt)}}function pt(C,M,k){let X=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(X=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(X=r.TEXTURE_3D);let K=Yt(C,M),ht=M.source;e.bindTexture(X,C.__webglTexture,r.TEXTURE0+k);let dt=n.get(ht);if(ht.version!==dt.__version||K===!0){if(e.activeTexture(r.TEXTURE0+k),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){let tt=ee.getPrimaries(ee.workingColorSpace),yt=M.colorSpace===On?null:ee.getPrimaries(M.colorSpace),wt=M.colorSpace===On||tt===yt?r.NONE:r.BROWSER_DEFAULT_WEBGL;e.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt)}e.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment);let nt=g(M.image,!1,i.maxTextureSize);nt=ge(M,nt);let mt=s.convert(M.format,M.colorSpace),Dt=s.convert(M.type),vt=_(M.internalFormat,mt,Dt,M.normalized,M.colorSpace,M.isVideoTexture);Gt(X,M);let gt,Nt=M.mipmaps,Ht=M.isVideoTexture!==!0,Zt=dt.__version===void 0||K===!0,F=ht.dataReady,xt=v(M,nt);if(M.isDepthTexture)vt=S(M.format===Di,M.type),Zt&&(Ht?e.texStorage2D(r.TEXTURE_2D,1,vt,nt.width,nt.height):e.texImage2D(r.TEXTURE_2D,0,vt,nt.width,nt.height,0,mt,Dt,null));else if(M.isDataTexture)if(Nt.length>0){Ht&&Zt&&e.texStorage2D(r.TEXTURE_2D,xt,vt,Nt[0].width,Nt[0].height);for(let tt=0,yt=Nt.length;tt<yt;tt++)gt=Nt[tt],Ht?F&&e.texSubImage2D(r.TEXTURE_2D,tt,0,0,gt.width,gt.height,mt,Dt,gt.data):e.texImage2D(r.TEXTURE_2D,tt,vt,gt.width,gt.height,0,mt,Dt,gt.data);M.generateMipmaps=!1}else Ht?(Zt&&e.texStorage2D(r.TEXTURE_2D,xt,vt,nt.width,nt.height),F&&et(M,nt,mt,Dt)):e.texImage2D(r.TEXTURE_2D,0,vt,nt.width,nt.height,0,mt,Dt,nt.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ht&&Zt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,xt,vt,Nt[0].width,Nt[0].height,nt.depth);for(let tt=0,yt=Nt.length;tt<yt;tt++)if(gt=Nt[tt],M.format!==cn)if(mt!==null)if(Ht){if(F)if(M.layerUpdates.size>0){let wt=Ch(gt.width,gt.height,M.format,M.type);for(let st of M.layerUpdates){let Ut=gt.data.subarray(st*wt/gt.data.BYTES_PER_ELEMENT,(st+1)*wt/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,tt,0,0,st,gt.width,gt.height,1,mt,Ut)}}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,tt,0,0,0,gt.width,gt.height,nt.depth,mt,gt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,tt,vt,gt.width,gt.height,nt.depth,0,gt.data,0,0);else Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?F&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,tt,0,0,0,gt.width,gt.height,nt.depth,mt,Dt,gt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,tt,vt,gt.width,gt.height,nt.depth,0,mt,Dt,gt.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{Ht&&Zt&&e.texStorage2D(r.TEXTURE_2D,xt,vt,Nt[0].width,Nt[0].height);for(let tt=0,yt=Nt.length;tt<yt;tt++)gt=Nt[tt],M.format!==cn?mt!==null?Ht?F&&e.compressedTexSubImage2D(r.TEXTURE_2D,tt,0,0,gt.width,gt.height,mt,gt.data):e.compressedTexImage2D(r.TEXTURE_2D,tt,vt,gt.width,gt.height,0,gt.data):Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?F&&e.texSubImage2D(r.TEXTURE_2D,tt,0,0,gt.width,gt.height,mt,Dt,gt.data):e.texImage2D(r.TEXTURE_2D,tt,vt,gt.width,gt.height,0,mt,Dt,gt.data)}else if(M.isDataArrayTexture)if(Ht){if(Zt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,xt,vt,nt.width,nt.height,nt.depth),F)if(M.layerUpdates.size>0){let tt=Ch(nt.width,nt.height,M.format,M.type);for(let yt of M.layerUpdates){let wt=nt.data.subarray(yt*tt/nt.data.BYTES_PER_ELEMENT,(yt+1)*tt/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,yt,nt.width,nt.height,1,mt,Dt,wt)}M.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,mt,Dt,nt.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,vt,nt.width,nt.height,nt.depth,0,mt,Dt,nt.data);else if(M.isData3DTexture)Ht?(Zt&&e.texStorage3D(r.TEXTURE_3D,xt,vt,nt.width,nt.height,nt.depth),F&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,mt,Dt,nt.data)):e.texImage3D(r.TEXTURE_3D,0,vt,nt.width,nt.height,nt.depth,0,mt,Dt,nt.data);else if(M.isFramebufferTexture){if(Zt)if(Ht)e.texStorage2D(r.TEXTURE_2D,xt,vt,nt.width,nt.height);else{let tt=nt.width,yt=nt.height;for(let wt=0;wt<xt;wt++)e.texImage2D(r.TEXTURE_2D,wt,vt,tt,yt,0,mt,Dt,null),tt>>=1,yt>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in r){let tt=r.canvas;if(tt.hasAttribute("layoutsubtree")||tt.setAttribute("layoutsubtree","true"),nt.parentNode!==tt){tt.appendChild(nt),u.add(M),tt.onpaint=yt=>{let wt=yt.changedElements;for(let st of u)wt.includes(st.image)&&(st.needsUpdate=!0)},tt.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,nt);else{let wt=r.RGBA,st=r.RGBA,Ut=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,wt,st,Ut,nt)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(Nt.length>0){if(Ht&&Zt){let tt=ne(Nt[0]);e.texStorage2D(r.TEXTURE_2D,xt,vt,tt.width,tt.height)}for(let tt=0,yt=Nt.length;tt<yt;tt++)gt=Nt[tt],Ht?F&&e.texSubImage2D(r.TEXTURE_2D,tt,0,0,mt,Dt,gt):e.texImage2D(r.TEXTURE_2D,tt,vt,mt,Dt,gt);M.generateMipmaps=!1}else if(Ht){if(Zt){let tt=ne(nt);e.texStorage2D(r.TEXTURE_2D,xt,vt,tt.width,tt.height)}F&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,mt,Dt,nt)}else e.texImage2D(r.TEXTURE_2D,0,vt,mt,Dt,nt);m(M)&&b(X),dt.__version=ht.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Bt(C,M,k){if(M.image.length!==6)return;let X=Yt(C,M),K=M.source;e.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+k);let ht=n.get(K);if(K.version!==ht.__version||X===!0){e.activeTexture(r.TEXTURE0+k);let dt=ee.getPrimaries(ee.workingColorSpace),Q=M.colorSpace===On?null:ee.getPrimaries(M.colorSpace),nt=M.colorSpace===On||dt===Q?r.NONE:r.BROWSER_DEFAULT_WEBGL;e.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let mt=M.isCompressedTexture||M.image[0].isCompressedTexture,Dt=M.image[0]&&M.image[0].isDataTexture,vt=[];for(let st=0;st<6;st++)!mt&&!Dt?vt[st]=g(M.image[st],!0,i.maxCubemapSize):vt[st]=Dt?M.image[st].image:M.image[st],vt[st]=ge(M,vt[st]);let gt=vt[0],Nt=s.convert(M.format,M.colorSpace),Ht=s.convert(M.type),Zt=_(M.internalFormat,Nt,Ht,M.normalized,M.colorSpace),F=M.isVideoTexture!==!0,xt=ht.__version===void 0||X===!0,tt=K.dataReady,yt=v(M,gt);Gt(r.TEXTURE_CUBE_MAP,M);let wt;if(mt){F&&xt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,yt,Zt,gt.width,gt.height);for(let st=0;st<6;st++){wt=vt[st].mipmaps;for(let Ut=0;Ut<wt.length;Ut++){let Pt=wt[Ut];M.format!==cn?Nt!==null?F?tt&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ut,0,0,Pt.width,Pt.height,Nt,Pt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ut,Zt,Pt.width,Pt.height,0,Pt.data):Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?tt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ut,0,0,Pt.width,Pt.height,Nt,Ht,Pt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ut,Zt,Pt.width,Pt.height,0,Nt,Ht,Pt.data)}}}else{if(wt=M.mipmaps,F&&xt){wt.length>0&&yt++;let st=ne(vt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,yt,Zt,st.width,st.height)}for(let st=0;st<6;st++)if(Dt){F?tt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,vt[st].width,vt[st].height,Nt,Ht,vt[st].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Zt,vt[st].width,vt[st].height,0,Nt,Ht,vt[st].data);for(let Ut=0;Ut<wt.length;Ut++){let we=wt[Ut].image[st].image;F?tt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ut+1,0,0,we.width,we.height,Nt,Ht,we.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ut+1,Zt,we.width,we.height,0,Nt,Ht,we.data)}}else{F?tt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,Nt,Ht,vt[st]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Zt,Nt,Ht,vt[st]);for(let Ut=0;Ut<wt.length;Ut++){let Pt=wt[Ut];F?tt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ut+1,0,0,Nt,Ht,Pt.image[st]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ut+1,Zt,Nt,Ht,Pt.image[st])}}}m(M)&&b(r.TEXTURE_CUBE_MAP),ht.__version=K.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function St(C,M,k,X,K,ht){let dt=s.convert(k.format,k.colorSpace),Q=s.convert(k.type),nt=_(k.internalFormat,dt,Q,k.normalized,k.colorSpace),mt=n.get(M),Dt=n.get(k);if(Dt.__renderTarget=M,!mt.__hasExternalTextures){let vt=Math.max(1,M.width>>ht),gt=Math.max(1,M.height>>ht);K===r.TEXTURE_3D||K===r.TEXTURE_2D_ARRAY?e.texImage3D(K,ht,nt,vt,gt,M.depth,0,dt,Q,null):e.texImage2D(K,ht,nt,vt,gt,0,dt,Q,null)}e.bindFramebuffer(r.FRAMEBUFFER,C),qt(M)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,X,K,Dt.__webglTexture,0,Wt(M)):(K===r.TEXTURE_2D||K>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,X,K,Dt.__webglTexture,ht),e.bindFramebuffer(r.FRAMEBUFFER,null)}function kt(C,M,k){if(r.bindRenderbuffer(r.RENDERBUFFER,C),M.depthBuffer){let X=M.depthTexture,K=X&&X.isDepthTexture?X.type:null,ht=S(M.stencilBuffer,K),dt=M.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;qt(M)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Wt(M),ht,M.width,M.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,Wt(M),ht,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,ht,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,dt,r.RENDERBUFFER,C)}else{let X=M.textures;for(let K=0;K<X.length;K++){let ht=X[K],dt=s.convert(ht.format,ht.colorSpace),Q=s.convert(ht.type),nt=_(ht.internalFormat,dt,Q,ht.normalized,ht.colorSpace);qt(M)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Wt(M),nt,M.width,M.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,Wt(M),nt,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,nt,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function de(C,M,k){let X=M.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(r.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=n.get(M.depthTexture);if(K.__renderTarget=M,(!K.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),X){if(K.__webglInit===void 0&&(K.__webglInit=!0,M.depthTexture.addEventListener("dispose",A)),K.__webglTexture===void 0){K.__webglTexture=r.createTexture(),e.bindTexture(r.TEXTURE_CUBE_MAP,K.__webglTexture),Gt(r.TEXTURE_CUBE_MAP,M.depthTexture);let mt=s.convert(M.depthTexture.format),Dt=s.convert(M.depthTexture.type),vt;M.depthTexture.format===$n?vt=r.DEPTH_COMPONENT24:M.depthTexture.format===Di&&(vt=r.DEPTH24_STENCIL8);for(let gt=0;gt<6;gt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,vt,M.width,M.height,0,mt,Dt,null)}}else j(M.depthTexture,0);let ht=K.__webglTexture,dt=Wt(M),Q=X?r.TEXTURE_CUBE_MAP_POSITIVE_X+k:r.TEXTURE_2D,nt=M.depthTexture.format===Di?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(M.depthTexture.format===$n)qt(M)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,nt,Q,ht,0,dt):r.framebufferTexture2D(r.FRAMEBUFFER,nt,Q,ht,0);else if(M.depthTexture.format===Di)qt(M)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,nt,Q,ht,0,dt):r.framebufferTexture2D(r.FRAMEBUFFER,nt,Q,ht,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function it(C){let M=n.get(C),k=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){let X=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),X){let K=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,X.removeEventListener("dispose",K)};X.addEventListener("dispose",K),M.__depthDisposeCallback=K}M.__boundDepthTexture=X}if(C.depthTexture&&!M.__autoAllocateDepthBuffer)if(k)for(let X=0;X<6;X++)de(M.__webglFramebuffer[X],C,X);else{let X=C.texture.mipmaps;X&&X.length>0?de(M.__webglFramebuffer[0],C,0):de(M.__webglFramebuffer,C,0)}else if(k){M.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[X]),M.__webglDepthbuffer[X]===void 0)M.__webglDepthbuffer[X]=r.createRenderbuffer(),kt(M.__webglDepthbuffer[X],C,!1);else{let K=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ht=M.__webglDepthbuffer[X];r.bindRenderbuffer(r.RENDERBUFFER,ht),r.framebufferRenderbuffer(r.FRAMEBUFFER,K,r.RENDERBUFFER,ht)}}else{let X=C.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=r.createRenderbuffer(),kt(M.__webglDepthbuffer,C,!1);else{let K=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ht=M.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ht),r.framebufferRenderbuffer(r.FRAMEBUFFER,K,r.RENDERBUFFER,ht)}}e.bindFramebuffer(r.FRAMEBUFFER,null)}function at(C,M,k){let X=n.get(C);M!==void 0&&St(X.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),k!==void 0&&it(C)}function lt(C){let M=C.texture,k=n.get(C),X=n.get(M);C.addEventListener("dispose",x);let K=C.textures,ht=C.isWebGLCubeRenderTarget===!0,dt=K.length>1;if(dt||(X.__webglTexture===void 0&&(X.__webglTexture=r.createTexture()),X.__version=M.version,a.memory.textures++),ht){k.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer[Q]=[];for(let nt=0;nt<M.mipmaps.length;nt++)k.__webglFramebuffer[Q][nt]=r.createFramebuffer()}else k.__webglFramebuffer[Q]=r.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer=[];for(let Q=0;Q<M.mipmaps.length;Q++)k.__webglFramebuffer[Q]=r.createFramebuffer()}else k.__webglFramebuffer=r.createFramebuffer();if(dt)for(let Q=0,nt=K.length;Q<nt;Q++){let mt=n.get(K[Q]);mt.__webglTexture===void 0&&(mt.__webglTexture=r.createTexture(),a.memory.textures++)}if(C.samples>0&&qt(C)===!1){k.__webglMultisampledFramebuffer=r.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let Q=0;Q<K.length;Q++){let nt=K[Q];k.__webglColorRenderbuffer[Q]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,k.__webglColorRenderbuffer[Q]);let mt=s.convert(nt.format,nt.colorSpace),Dt=s.convert(nt.type),vt=_(nt.internalFormat,mt,Dt,nt.normalized,nt.colorSpace,C.isXRRenderTarget===!0),gt=Wt(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,gt,vt,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Q,r.RENDERBUFFER,k.__webglColorRenderbuffer[Q])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(k.__webglDepthRenderbuffer=r.createRenderbuffer(),kt(k.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ht){e.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture),Gt(r.TEXTURE_CUBE_MAP,M);for(let Q=0;Q<6;Q++)if(M.mipmaps&&M.mipmaps.length>0)for(let nt=0;nt<M.mipmaps.length;nt++)St(k.__webglFramebuffer[Q][nt],C,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,nt);else St(k.__webglFramebuffer[Q],C,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);m(M)&&b(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(dt){for(let Q=0,nt=K.length;Q<nt;Q++){let mt=K[Q],Dt=n.get(mt),vt=r.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(vt=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(vt,Dt.__webglTexture),Gt(vt,mt),St(k.__webglFramebuffer,C,mt,r.COLOR_ATTACHMENT0+Q,vt,0),m(mt)&&b(vt)}e.unbindTexture()}else{let Q=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Q=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(Q,X.__webglTexture),Gt(Q,M),M.mipmaps&&M.mipmaps.length>0)for(let nt=0;nt<M.mipmaps.length;nt++)St(k.__webglFramebuffer[nt],C,M,r.COLOR_ATTACHMENT0,Q,nt);else St(k.__webglFramebuffer,C,M,r.COLOR_ATTACHMENT0,Q,0);m(M)&&b(Q),e.unbindTexture()}C.depthBuffer&&it(C)}function ct(C){let M=C.textures;for(let k=0,X=M.length;k<X;k++){let K=M[k];if(m(K)){let ht=E(C),dt=n.get(K).__webglTexture;e.bindTexture(ht,dt),b(ht),e.unbindTexture()}}}let ut=[],zt=[];function Ft(C){if(C.samples>0){if(qt(C)===!1){let M=C.textures,k=C.width,X=C.height,K=r.COLOR_BUFFER_BIT,ht=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,dt=n.get(C),Q=M.length>1;if(Q)for(let mt=0;mt<M.length;mt++)e.bindFramebuffer(r.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,dt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,dt.__webglMultisampledFramebuffer);let nt=C.texture.mipmaps;nt&&nt.length>0?e.bindFramebuffer(r.DRAW_FRAMEBUFFER,dt.__webglFramebuffer[0]):e.bindFramebuffer(r.DRAW_FRAMEBUFFER,dt.__webglFramebuffer);for(let mt=0;mt<M.length;mt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(K|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(K|=r.STENCIL_BUFFER_BIT)),Q){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,dt.__webglColorRenderbuffer[mt]);let Dt=n.get(M[mt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Dt,0)}r.blitFramebuffer(0,0,k,X,0,0,k,X,K,r.NEAREST),l===!0&&(ut.length=0,zt.length=0,ut.push(r.COLOR_ATTACHMENT0+mt),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(ut.push(ht),zt.push(ht),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,zt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ut))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Q)for(let mt=0;mt<M.length;mt++){e.bindFramebuffer(r.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.RENDERBUFFER,dt.__webglColorRenderbuffer[mt]);let Dt=n.get(M[mt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,dt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.TEXTURE_2D,Dt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,dt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let M=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[M])}}}function Wt(C){return Math.min(i.maxSamples,C.samples)}function qt(C){let M=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function D(C){let M=a.render.frame;h.get(C)!==M&&(h.set(C,M),C.update())}function ge(C,M){let k=C.colorSpace,X=C.format,K=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||k!==Rr&&k!==On&&(ee.getTransfer(k)===pe?(X!==cn||K!==ln)&&Ot("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Vt("WebGLTextures: Unsupported texture color space:",k)),M}function ne(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=q,this.resetTextureUnits=B,this.getTextureUnits=L,this.setTextureUnits=O,this.setTexture2D=j,this.setTexture2DArray=H,this.setTexture3D=Z,this.setTextureCube=Y,this.rebindTextures=at,this.setupRenderTarget=lt,this.updateRenderTargetMipmap=ct,this.updateMultisampleRenderTarget=Ft,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=St,this.useMultisampledRTT=qt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function hv(r,t){function e(n,i=On){let s,a=ee.getTransfer(i);if(n===ln)return r.UNSIGNED_BYTE;if(n===sl)return r.UNSIGNED_SHORT_4_4_4_4;if(n===rl)return r.UNSIGNED_SHORT_5_5_5_1;if(n===vh)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===_h)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===xh)return r.BYTE;if(n===yh)return r.SHORT;if(n===$s)return r.UNSIGNED_SHORT;if(n===il)return r.INT;if(n===Bn)return r.UNSIGNED_INT;if(n===En)return r.FLOAT;if(n===ke)return r.HALF_FLOAT;if(n===Mh)return r.ALPHA;if(n===bh)return r.RGB;if(n===cn)return r.RGBA;if(n===$n)return r.DEPTH_COMPONENT;if(n===Di)return r.DEPTH_STENCIL;if(n===al)return r.RED;if(n===ol)return r.RED_INTEGER;if(n===Ni)return r.RG;if(n===ll)return r.RG_INTEGER;if(n===cl)return r.RGBA_INTEGER;if(n===da||n===ua||n===fa||n===pa)if(a===pe)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===da)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ua)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===fa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===pa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===da)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ua)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===fa)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===pa)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===hl||n===dl||n===ul||n===fl)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===hl)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===dl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ul)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===fl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===pl||n===ml||n===gl||n===xl||n===yl||n===ma||n===vl)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===pl||n===ml)return a===pe?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===gl)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===xl)return s.COMPRESSED_R11_EAC;if(n===yl)return s.COMPRESSED_SIGNED_R11_EAC;if(n===ma)return s.COMPRESSED_RG11_EAC;if(n===vl)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===_l||n===Ml||n===bl||n===Sl||n===wl||n===El||n===Tl||n===Al||n===Rl||n===Cl||n===Il||n===Pl||n===Ll||n===Dl)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===_l)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ml)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===bl)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Sl)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===wl)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===El)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Tl)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Al)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Rl)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Cl)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Il)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Pl)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ll)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Dl)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Nl||n===Ul||n===Fl)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Nl)return a===pe?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ul)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Fl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Bl||n===Ol||n===ga||n===kl)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Bl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ol)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ga)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===kl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ys?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}var dv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,uv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Yh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Hr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new fe({vertexShader:dv,fragmentShader:uv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new oe(new Un(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Zh=class extends Yn{constructor(t,e){super();let n=this,i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null,y=typeof XRWebGLBinding<"u",g=new Yh,m={},b=e.getContextAttributes(),E=null,_=null,S=[],v=[],A=new rt,x=null,T=null,R=new je;R.viewport=new Te;let P=new je;P.viewport=new Te;let N=[R,P],B=new jo,L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let et=S[J];return et===void 0&&(et=new Us,S[J]=et),et.getTargetRaySpace()},this.getControllerGrip=function(J){let et=S[J];return et===void 0&&(et=new Us,S[J]=et),et.getGripSpace()},this.getHand=function(J){let et=S[J];return et===void 0&&(et=new Us,S[J]=et),et.getHandSpace()};function q(J){let et=v.indexOf(J.inputSource);if(et===-1)return;let pt=S[et];pt!==void 0&&(pt.update(J.inputSource,J.frame,c||a),pt.dispatchEvent({type:J.type,data:J.inputSource}))}function z(){i.removeEventListener("select",q),i.removeEventListener("selectstart",q),i.removeEventListener("selectend",q),i.removeEventListener("squeeze",q),i.removeEventListener("squeezestart",q),i.removeEventListener("squeezeend",q),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",j);for(let J=0;J<S.length;J++){let et=v[J];et!==null&&(v[J]=null,S[J].disconnect(et))}L=null,O=null,g.reset();for(let J in m)delete m[J];if(t.setRenderTarget(E),f=null,d=null,u=null,i=null,_=null,Yt.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(A.width,A.height,!1),T!==null){let J=T.camera;J.fov=T.fov,J.zoom=T.zoom,J.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,n.isPresenting===!0&&Ot("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&Ot("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(i,e)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(E=t.getRenderTarget(),i.addEventListener("select",q),i.addEventListener("selectstart",q),i.addEventListener("selectend",q),i.addEventListener("squeeze",q),i.addEventListener("squeezestart",q),i.addEventListener("squeezeend",q),i.addEventListener("end",z),i.addEventListener("inputsourceschange",j),b.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(A),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let pt=null,Bt=null,St=null;b.depth&&(St=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=b.stencil?Di:$n,Bt=b.stencil?Ys:Bn);let kt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(kt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new Pe(d.textureWidth,d.textureHeight,{format:cn,type:ln,depthTexture:new Si(d.textureWidth,d.textureHeight,Bt,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let pt={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,pt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new Pe(f.framebufferWidth,f.framebufferHeight,{format:cn,type:ln,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Yt.setContext(i),Yt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function j(J){for(let et=0;et<J.removed.length;et++){let pt=J.removed[et],Bt=v.indexOf(pt);Bt>=0&&(v[Bt]=null,S[Bt].disconnect(pt))}for(let et=0;et<J.added.length;et++){let pt=J.added[et],Bt=v.indexOf(pt);if(Bt===-1){for(let kt=0;kt<S.length;kt++)if(kt>=v.length){v.push(pt),Bt=kt;break}else if(v[kt]===null){v[kt]=pt,Bt=kt;break}if(Bt===-1)break}let St=S[Bt];St&&St.connect(pt)}}let H=new I,Z=new I;function Y(J,et,pt){H.setFromMatrixPosition(et.matrixWorld),Z.setFromMatrixPosition(pt.matrixWorld);let Bt=H.distanceTo(Z),St=et.projectionMatrix.elements,kt=pt.projectionMatrix.elements,de=St[14]/(St[10]-1),it=St[14]/(St[10]+1),at=(St[9]+1)/St[5],lt=(St[9]-1)/St[5],ct=(St[8]-1)/St[0],ut=(kt[8]+1)/kt[0],zt=de*ct,Ft=de*ut,Wt=Bt/(-ct+ut),qt=Wt*-ct;if(et.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(qt),J.translateZ(Wt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),St[10]===-1)J.projectionMatrix.copy(et.projectionMatrix),J.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let D=de+Wt,ge=it+Wt,ne=zt-qt,C=Ft+(Bt-qt),M=at*it/ge*D,k=lt*it/ge*D;J.projectionMatrix.makePerspective(ne,C,M,k,D,ge),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Et(J,et){et===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(et.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;let et=J.near,pt=J.far;g.texture!==null&&(g.depthNear>0&&(et=g.depthNear),g.depthFar>0&&(pt=g.depthFar)),B.near=P.near=R.near=et,B.far=P.far=R.far=pt,(L!==B.near||O!==B.far)&&(i.updateRenderState({depthNear:B.near,depthFar:B.far}),L=B.near,O=B.far),B.layers.mask=J.layers.mask|6,R.layers.mask=B.layers.mask&-5,P.layers.mask=B.layers.mask&-3;let Bt=J.parent,St=B.cameras;Et(B,Bt);for(let kt=0;kt<St.length;kt++)Et(St[kt],Bt);St.length===2?Y(B,R,P):B.projectionMatrix.copy(R.projectionMatrix),T===null&&J.isPerspectiveCamera&&(T={camera:J,fov:J.fov,zoom:J.zoom}),Mt(J,B,Bt)};function Mt(J,et,pt){pt===null?J.matrix.copy(et.matrixWorld):(J.matrix.copy(pt.matrixWorld),J.matrix.invert(),J.matrix.multiply(et.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(et.projectionMatrix),J.projectionMatrixInverse.copy(et.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=bo*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(J){l=J,d!==null&&(d.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(B)},this.getCameraTexture=function(J){return m[J]};let jt=null;function Gt(J,et){if(h=et.getViewerPose(c||a),p=et,h!==null){let pt=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let Bt=!1;pt.length!==B.cameras.length&&(B.cameras.length=0,Bt=!0);for(let it=0;it<pt.length;it++){let at=pt[it],lt=null;if(f!==null)lt=f.getViewport(at);else{let ut=u.getViewSubImage(d,at);lt=ut.viewport,it===0&&(t.setRenderTargetTextures(_,ut.colorTexture,ut.depthStencilTexture),t.setRenderTarget(_))}let ct=N[it];ct===void 0&&(ct=new je,ct.layers.enable(it),ct.viewport=new Te,N[it]=ct),ct.matrix.fromArray(at.transform.matrix),ct.matrix.decompose(ct.position,ct.quaternion,ct.scale),ct.projectionMatrix.fromArray(at.projectionMatrix),ct.projectionMatrixInverse.copy(ct.projectionMatrix).invert(),ct.viewport.set(lt.x,lt.y,lt.width,lt.height),it===0&&(B.matrix.copy(ct.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Bt===!0&&B.cameras.push(ct)}let St=i.enabledFeatures;if(St&&St.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&y){u=n.getBinding();let it=u.getDepthInformation(pt[0]);it&&it.isValid&&it.texture&&g.init(it,i.renderState)}if(St&&St.includes("camera-access")&&y){t.state.unbindTexture(),u=n.getBinding();for(let it=0;it<pt.length;it++){let at=pt[it].camera;if(at){let lt=m[at];lt||(lt=new Hr,m[at]=lt);let ct=u.getCameraImage(at);lt.sourceTexture=ct}}}}for(let pt=0;pt<S.length;pt++){let Bt=v[pt],St=S[pt];Bt!==null&&St!==void 0&&St.update(Bt,et,c||a)}jt&&jt(J,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),p=null}let Yt=new zf;Yt.setAnimationLoop(Gt),this.setAnimationLoop=function(J){jt=J},this.dispose=function(){}}},fv=new re,qf=new Xt;qf.set(-1,0,0,0,1,0,0,0,1);function pv(r,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Th(r)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,b,E,_){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),u(g,m)):m.isMeshPhongMaterial?(s(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,_)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),y(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,b,E):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===$e&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===$e&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let b=t.get(m),E=b.envMap,_=b.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(fv.makeRotationFromEuler(_)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(qf),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,b,E){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*b,g.scale.value=E*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,b){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===$e&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=b.texture,g.transmissionSamplerSize.value.set(b.width,b.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function y(g,m){let b=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(b.matrixWorld),g.nearDistance.value=b.shadow.camera.near,g.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function mv(r,t,e,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,S){let v=S.program;n.uniformBlockBinding(_,v)}function c(_,S){let v=i[_.id];v===void 0&&(g(_),v=h(_),i[_.id]=v,_.addEventListener("dispose",b));let A=S.program;n.updateUBOMapping(_,A);let x=t.render.frame;s[_.id]!==x&&(d(_),s[_.id]=x)}function h(_){let S=u();_.__bindingPointIndex=S;let v=r.createBuffer(),A=_.__size,x=_.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,A,x),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,S,v),v}function u(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return Vt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){let S=i[_.id],v=_.uniforms,A=_.__cache;r.bindBuffer(r.UNIFORM_BUFFER,S);for(let x=0,T=v.length;x<T;x++){let R=v[x];if(Array.isArray(R))for(let P=0,N=R.length;P<N;P++)f(R[P],x,P,A);else f(R,x,0,A)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(_,S,v,A){if(y(_,S,v,A)===!0){let x=_.__offset,T=_.value;if(Array.isArray(T)){let R=0;for(let P=0;P<T.length;P++){let N=T[P],B=m(N);p(N,_.__data,R),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(R+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(T,_.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,x,_.__data)}}function p(_,S,v){typeof _=="number"||typeof _=="boolean"?S[0]=_:_.isMatrix3?(S[0]=_.elements[0],S[1]=_.elements[1],S[2]=_.elements[2],S[3]=0,S[4]=_.elements[3],S[5]=_.elements[4],S[6]=_.elements[5],S[7]=0,S[8]=_.elements[6],S[9]=_.elements[7],S[10]=_.elements[8],S[11]=0):ArrayBuffer.isView(_)?S.set(new _.constructor(_.buffer,_.byteOffset,S.length)):_.toArray(S,v)}function y(_,S,v,A){let x=_.value,T=S+"_"+v;if(A[T]===void 0)return typeof x=="number"||typeof x=="boolean"?A[T]=x:ArrayBuffer.isView(x)?A[T]=x.slice():A[T]=x.clone(),!0;{let R=A[T];if(typeof x=="number"||typeof x=="boolean"){if(R!==x)return A[T]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(R.equals(x)===!1)return R.copy(x),!0}}return!1}function g(_){let S=_.uniforms,v=0,A=16;for(let T=0,R=S.length;T<R;T++){let P=Array.isArray(S[T])?S[T]:[S[T]];for(let N=0,B=P.length;N<B;N++){let L=P[N],O=Array.isArray(L.value)?L.value:[L.value];for(let q=0,z=O.length;q<z;q++){let j=O[q],H=m(j),Z=v%A,Y=Z%H.boundary,Et=Z+Y;v+=Y,Et!==0&&A-Et<H.storage&&(v+=A-Et),L.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=v,v+=H.storage}}}let x=v%A;return x>0&&(v+=A-x),_.__size=v,_.__cache={},this}function m(_){let S={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(S.boundary=4,S.storage=4):_.isVector2?(S.boundary=8,S.storage=8):_.isVector3||_.isColor?(S.boundary=16,S.storage=12):_.isVector4?(S.boundary=16,S.storage=16):_.isMatrix3?(S.boundary=48,S.storage=48):_.isMatrix4?(S.boundary=64,S.storage=64):_.isTexture?Ot("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(S.boundary=16,S.storage=_.byteLength):Ot("WebGLRenderer: Unsupported uniform value type.",_),S}function b(_){let S=_.target;S.removeEventListener("dispose",b);let v=a.indexOf(S.__bindingPointIndex);a.splice(v,1),r.deleteBuffer(i[S.id]),delete i[S.id],delete s[S.id]}function E(){for(let _ in i)r.deleteBuffer(i[_]);a=[],i={},s={}}return{bind:l,update:c,dispose:E}}var gv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Qn=null;function xv(){return Qn===null&&(Qn=new Yi(gv,16,16,Ni,ke),Qn.name="DFG_LUT",Qn.minFilter=De,Qn.magFilter=De,Qn.wrapS=qn,Qn.wrapT=qn,Qn.generateMipmaps=!1,Qn.needsUpdate=!0),Qn}var $l=class{constructor(t={}){let{canvas:e=of(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=ln}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let y=f,g=new Set([cl,ll,ol]),m=new Set([ln,Bn,$s,Ys,sl,rl]),b=new Uint32Array(4),E=new Int32Array(4),_=new I,S=null,v=null,A=[],x=[],T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Fn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,P=!1,N=null,B=null,L=null,O=null;this._outputColorSpace=Ge;let q=0,z=0,j=null,H=-1,Z=null,Y=new Te,Et=new Te,Mt=null,jt=new Rt(0),Gt=0,Yt=e.width,J=e.height,et=1,pt=null,Bt=null,St=new Te(0,0,Yt,J),kt=new Te(0,0,Yt,J),de=!1,it=new ks,at=!1,lt=!1,ct=new re,ut=new I,zt=new Te,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Wt=!1;function qt(){return j===null?et:1}let D=n;function ge(w,U){return e.getContext(w,U)}let ne,C,M,k,X,K,ht,dt,Q,nt,mt,Dt,vt,gt,Nt,Ht,Zt,F,xt,tt,yt,wt,st;try{let w={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",we,!1),e.addEventListener("webglcontextrestored",xe,!1),e.addEventListener("webglcontextcreationerror",An,!1),D===null){let U="webgl2";if(D=ge(U,w),D===null)throw ge(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ut()}catch(w){throw e.removeEventListener("webglcontextlost",we,!1),e.removeEventListener("webglcontextrestored",xe,!1),e.removeEventListener("webglcontextcreationerror",An,!1),Vt("WebGLRenderer: "+w.message),w}function Ut(){ne=new wx(D),ne.init(),yt=new hv(D,ne),C=new px(D,ne,t,yt),M=new lv(D,ne),C.reversedDepthBuffer&&d&&M.buffers.depth.setReversed(!0),B=D.createFramebuffer(),L=D.createFramebuffer(),O=D.createFramebuffer(),k=new Ax(D),X=new Yy,K=new cv(D,ne,M,X,C,yt,k),ht=new Sx(R),dt=new Cm(D),wt=new ux(D,dt),Q=new Ex(D,dt,k,wt),nt=new Cx(D,Q,dt,wt,k),F=new Rx(D,C,K),Nt=new mx(X),mt=new $y(R,ht,ne,C,wt,Nt),Dt=new pv(R,X),vt=new Jy,gt=new nv(ne),Zt=new dx(R,ht,M,nt,p,l),Ht=new ov(R,nt,C),st=new mv(D,k,C,M),xt=new fx(D,ne,k),tt=new Tx(D,ne,k),k.programs=mt.programs,R.capabilities=C,R.extensions=ne,R.properties=X,R.renderLists=vt,R.shadowMap=Ht,R.state=M,R.info=k}y!==ln&&(T=new Px(y,e.width,e.height,o,i,s));let Pt=new Zh(R,D);this.xr=Pt,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let w=ne.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=ne.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(w){w!==void 0&&(et=w,this.setSize(Yt,J,!1))},this.getSize=function(w){return w.set(Yt,J)},this.setSize=function(w,U,$=!0){if(Pt.isPresenting){Ot("WebGLRenderer: Can't change size while VR device is presenting.");return}Yt=w,J=U,e.width=Math.floor(w*et),e.height=Math.floor(U*et),$===!0&&(e.style.width=w+"px",e.style.height=U+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set(Yt*et,J*et).floor()},this.setDrawingBufferSize=function(w,U,$){Yt=w,J=U,et=$,e.width=Math.floor(w*$),e.height=Math.floor(U*$),this.setViewport(0,0,w,U)},this.setEffects=function(w){if(y===ln){Vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let U=0;U<w.length;U++)if(w[U].isOutputPass===!0){Ot("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(Y)},this.getViewport=function(w){return w.copy(St)},this.setViewport=function(w,U,$,G){w.isVector4?St.set(w.x,w.y,w.z,w.w):St.set(w,U,$,G),M.viewport(Y.copy(St).multiplyScalar(et).round())},this.getScissor=function(w){return w.copy(kt)},this.setScissor=function(w,U,$,G){w.isVector4?kt.set(w.x,w.y,w.z,w.w):kt.set(w,U,$,G),M.scissor(Et.copy(kt).multiplyScalar(et).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(w){M.setScissorTest(de=w)},this.setOpaqueSort=function(w){pt=w},this.setTransparentSort=function(w){Bt=w},this.getClearColor=function(w){return w.copy(Zt.getClearColor())},this.setClearColor=function(){Zt.setClearColor(...arguments)},this.getClearAlpha=function(){return Zt.getClearAlpha()},this.setClearAlpha=function(){Zt.setClearAlpha(...arguments)},this.clear=function(w=!0,U=!0,$=!0){let G=0;if(w){let W=!1;if(j!==null){let bt=j.texture.format;W=g.has(bt)}if(W){let bt=j.texture.type,At=m.has(bt),_t=Zt.getClearColor(),Ct=Zt.getClearAlpha(),Lt=_t.r,Qt=_t.g,ie=_t.b;At?(b[0]=Lt,b[1]=Qt,b[2]=ie,b[3]=Ct,D.clearBufferuiv(D.COLOR,0,b)):(E[0]=Lt,E[1]=Qt,E[2]=ie,E[3]=Ct,D.clearBufferiv(D.COLOR,0,E))}else G|=D.COLOR_BUFFER_BIT}U&&(G|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(G|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&D.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),N=w},this.dispose=function(){e.removeEventListener("webglcontextlost",we,!1),e.removeEventListener("webglcontextrestored",xe,!1),e.removeEventListener("webglcontextcreationerror",An,!1),Zt.dispose(),vt.dispose(),gt.dispose(),X.dispose(),ht.dispose(),nt.dispose(),wt.dispose(),st.dispose(),mt.dispose(),Pt.dispose(),Pt.removeEventListener("sessionstart",rd),Pt.removeEventListener("sessionend",ad),Fi.stop()};function we(w){w.preventDefault(),Pr("WebGLRenderer: Context Lost."),P=!0}function xe(){Pr("WebGLRenderer: Context Restored."),P=!1;let w=k.autoReset,U=Ht.enabled,$=Ht.autoUpdate,G=Ht.needsUpdate,W=Ht.type;Ut(),k.autoReset=w,Ht.enabled=U,Ht.autoUpdate=$,Ht.needsUpdate=G,Ht.type=W}function An(w){Vt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function zn(w){let U=w.target;U.removeEventListener("dispose",zn),sp(U)}function sp(w){rp(w),X.remove(w)}function rp(w){let U=X.get(w).programs;U!==void 0&&(U.forEach(function($){mt.releaseProgram($)}),w.isShaderMaterial&&mt.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,$,G,W,bt){U===null&&(U=Ft);let At=W.isMesh&&W.matrixWorld.determinantAffine()<0,_t=lp(w,U,$,G,W);M.setMaterial(G,At);let Ct=$.index,Lt=1;if(G.wireframe===!0){if(Ct=Q.getWireframeAttribute($),Ct===void 0)return;Lt=2}let Qt=$.drawRange,ie=$.attributes.position,It=Qt.start*Lt,ye=(Qt.start+Qt.count)*Lt;bt!==null&&(It=Math.max(It,bt.start*Lt),ye=Math.min(ye,(bt.start+bt.count)*Lt)),Ct!==null?(It=Math.max(It,0),ye=Math.min(ye,Ct.count)):ie!=null&&(It=Math.max(It,0),ye=Math.min(ye,ie.count));let Ne=ye-It;if(Ne<0||Ne===1/0)return;wt.setup(W,G,_t,$,Ct);let Ae,Se=xt;if(Ct!==null&&(Ae=dt.get(Ct),Se=tt,Se.setIndex(Ae)),W.isMesh)G.wireframe===!0?(M.setLineWidth(G.wireframeLinewidth*qt()),Se.setMode(D.LINES)):Se.setMode(D.TRIANGLES);else if(W.isLine){let Ze=G.linewidth;Ze===void 0&&(Ze=1),M.setLineWidth(Ze*qt()),W.isLineSegments?Se.setMode(D.LINES):W.isLineLoop?Se.setMode(D.LINE_LOOP):Se.setMode(D.LINE_STRIP)}else W.isPoints?Se.setMode(D.POINTS):W.isSprite&&Se.setMode(D.TRIANGLES);if(W.isBatchedMesh)if(ne.get("WEBGL_multi_draw"))Se.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let Ze=W._multiDrawStarts,Tt=W._multiDrawCounts,tn=W._multiDrawCount,ue=Ct?dt.get(Ct).bytesPerElement:1,yn=X.get(G).currentProgram.getUniforms();for(let Hn=0;Hn<tn;Hn++)yn.setValue(D,"_gl_DrawID",Hn),Se.render(Ze[Hn]/ue,Tt[Hn])}else if(W.isInstancedMesh)Se.renderInstances(It,Ne,W.count);else if($.isInstancedBufferGeometry){let Ze=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Tt=Math.min($.instanceCount,Ze);Se.renderInstances(It,Ne,Tt)}else Se.render(It,Ne)};function sd(w,U,$,G){N!==null&&w.isNodeMaterial&&N.setObject(G,w),at===!0&&Nt.setState(w,$,!1),w.transparent===!0&&w.side===Ye&&w.forceSinglePass===!1?(w.side=$e,w.needsUpdate=!0,Sa(w,U,G),w.side=Ii,w.needsUpdate=!0,Sa(w,U,G),w.side=Ye):Sa(w,U,G)}this.compile=function(w,U,$=null){$===null&&($=w),N!==null&&N.renderStart(w,U,$),v=gt.get($),v.init(U),x.push(v),$.traverseVisible(function(W){W.isLight&&W.layers.test(U.layers)&&(v.pushLight(W),W.castShadow&&v.pushShadow(W))}),w!==$&&w.traverseVisible(function(W){W.isLight&&W.layers.test(U.layers)&&(v.pushLight(W),W.castShadow&&v.pushShadow(W))}),v.setupLights(),N!==null&&N.updateLights(v.state.lightsArray),lt=this.localClippingEnabled,at=Nt.init(this.clippingPlanes,lt),at===!0&&Nt.setGlobalState(this.clippingPlanes,U),N!==null&&Ht.render(v.state.shadowsArray,$,U);let G=new Set;return w.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let bt=W.material;if(bt)if(Array.isArray(bt))for(let At=0;At<bt.length;At++){let _t=bt[At];sd(_t,$,U,W),G.add(_t)}else sd(bt,$,U,W),G.add(bt)}),v=x.pop(),N!==null&&N.renderEnd(),G},this.compileAsync=function(w,U,$=null){let G=this.compile(w,U,$);return new Promise(W=>{function bt(){if(G.forEach(function(At){let Ct=X.get(At).currentProgram;(Ct===void 0||Ct.isReady())&&G.delete(At)}),G.size===0){W(w);return}setTimeout(bt,10)}ne.get("KHR_parallel_shader_compile")!==null?bt():setTimeout(bt,10)})};let gc=null;function ap(w){gc&&gc(w)}function rd(){Fi.stop()}function ad(){Fi.start()}let Fi=new zf;Fi.setAnimationLoop(ap),typeof self<"u"&&Fi.setContext(self),this.setAnimationLoop=function(w){gc=w,Pt.setAnimationLoop(w),w===null?Fi.stop():Fi.start()},Pt.addEventListener("sessionstart",rd),Pt.addEventListener("sessionend",ad),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){Vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;N!==null&&N.renderStart(w,U);let $=Pt.enabled===!0&&Pt.isPresenting===!0,G=T!==null&&(j===null||$)&&T.begin(R,j);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Pt.enabled===!0&&Pt.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Pt.cameraAutoUpdate===!0&&Pt.updateCamera(U),U=Pt.getCamera()),w.isScene===!0&&w.onBeforeRender(R,w,U,j),v=gt.get(w,x.length),v.init(U),v.state.textureUnits=K.getTextureUnits(),x.push(v),ct.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),it.setFromProjectionMatrix(ct,Dn,U.reversedDepth),lt=this.localClippingEnabled,at=Nt.init(this.clippingPlanes,lt),S=vt.get(w,A.length),S.init(),A.push(S),Pt.enabled===!0&&Pt.isPresenting===!0){let At=R.xr.getDepthSensingMesh();At!==null&&xc(At,U,-1/0,R.sortObjects)}xc(w,U,0,R.sortObjects),S.finish(),N!==null&&N.updateLights(v.state.lightsArray),R.sortObjects===!0&&S.sort(pt,Bt),Wt=Pt.enabled===!1||Pt.isPresenting===!1||Pt.hasDepthSensing()===!1,Wt&&Zt.addToRenderList(S,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),at===!0&&Nt.beginShadows();let W=v.state.shadowsArray;if(Ht.render(W,w,U),at===!0&&Nt.endShadows(),(G&&T.hasRenderPass())===!1){let At=S.opaque,_t=S.transmissive;if(v.setupLights(),U.isArrayCamera){let Ct=U.cameras;if(_t.length>0)for(let Lt=0,Qt=Ct.length;Lt<Qt;Lt++){let ie=Ct[Lt];ld(At,_t,w,ie)}Wt&&Zt.render(w);for(let Lt=0,Qt=Ct.length;Lt<Qt;Lt++){let ie=Ct[Lt];od(S,w,ie,ie.viewport)}}else _t.length>0&&ld(At,_t,w,U),Wt&&Zt.render(w),od(S,w,U)}j!==null&&z===0&&(K.updateMultisampleRenderTarget(j),K.updateRenderTargetMipmap(j)),G&&T.end(R),w.isScene===!0&&w.onAfterRender(R,w,U),wt.resetDefaultState(),H=-1,Z=null,x.pop(),x.length>0?(v=x[x.length-1],K.setTextureUnits(v.state.textureUnits),at===!0&&Nt.setGlobalState(R.clippingPlanes,v.state.camera)):v=null,A.pop(),A.length>0?S=A[A.length-1]:S=null,N!==null&&N.renderEnd()};function xc(w,U,$,G){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)$=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLightProbeGrid)v.pushLightProbeGrid(w);else if(w.isLight)v.pushLight(w),w.castShadow&&v.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(it)){G&&zt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ct);let At=nt.update(w),_t=w.material;_t.visible&&S.push(w,At,_t,$,zt.z,null,U)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(it))){let At=nt.update(w),_t=w.material;if(G&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),zt.copy(w.boundingSphere.center)):(At.boundingSphere===null&&At.computeBoundingSphere(),zt.copy(At.boundingSphere.center)),zt.applyMatrix4(w.matrixWorld).applyMatrix4(ct)),Array.isArray(_t)){let Ct=At.groups;for(let Lt=0,Qt=Ct.length;Lt<Qt;Lt++){let ie=Ct[Lt],It=_t[ie.materialIndex];It&&It.visible&&S.push(w,At,It,$,zt.z,ie,U)}}else _t.visible&&S.push(w,At,_t,$,zt.z,null,U)}}let bt=w.children;for(let At=0,_t=bt.length;At<_t;At++)xc(bt[At],U,$,G)}function od(w,U,$,G){let{opaque:W,transmissive:bt,transparent:At}=w;v.setupLightsView($),at===!0&&Nt.setGlobalState(R.clippingPlanes,$),G&&M.viewport(Y.copy(G)),W.length>0&&ba(W,U,$),bt.length>0&&ba(bt,U,$),At.length>0&&ba(At,U,$),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function ld(w,U,$,G){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(v.state.transmissionRenderTarget[G.id]===void 0){let It=ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float");v.state.transmissionRenderTarget[G.id]=new Pe(1,1,{generateMipmaps:!0,type:It?ke:ln,minFilter:jn,samples:Math.max(4,C.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ee.workingColorSpace})}let bt=v.state.transmissionRenderTarget[G.id],At=G.viewport||Y;bt.setSize(At.z*R.transmissionResolutionScale,At.w*R.transmissionResolutionScale);let _t=R.getRenderTarget(),Ct=R.getActiveCubeFace(),Lt=R.getActiveMipmapLevel();R.setRenderTarget(bt),R.getClearColor(jt),Gt=R.getClearAlpha(),Gt<1&&R.setClearColor(16777215,.5),R.clear(),Wt&&Zt.render($);let Qt=R.toneMapping;R.toneMapping=Fn;let ie=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),v.setupLightsView(G),at===!0&&Nt.setGlobalState(R.clippingPlanes,G),ba(w,$,G),K.updateMultisampleRenderTarget(bt),K.updateRenderTargetMipmap(bt),ne.has("WEBGL_multisampled_render_to_texture")===!1){let It=!1;for(let ye=0,Ne=U.length;ye<Ne;ye++){let Ae=U[ye],{object:Se,geometry:Ze,material:Tt,group:tn}=Ae;if(Tt.side===Ye&&Se.layers.test(G.layers)){let ue=Tt.side;Tt.side=$e,Tt.needsUpdate=!0,cd(Se,$,G,Ze,Tt,tn),Tt.side=ue,Tt.needsUpdate=!0,It=!0}}It===!0&&(K.updateMultisampleRenderTarget(bt),K.updateRenderTargetMipmap(bt))}R.setRenderTarget(_t,Ct,Lt),R.setClearColor(jt,Gt),ie!==void 0&&(G.viewport=ie),R.toneMapping=Qt}function ba(w,U,$){let G=U.isScene===!0?U.overrideMaterial:null;for(let W=0,bt=w.length;W<bt;W++){let At=w[W],{object:_t,geometry:Ct,group:Lt}=At,Qt=At.material;Qt.allowOverride===!0&&G!==null&&(Qt=G),_t.layers.test($.layers)&&cd(_t,U,$,Ct,Qt,Lt)}}function cd(w,U,$,G,W,bt){N!==null&&W.isNodeMaterial&&N.setObject(w,W),w.onBeforeRender(R,U,$,G,W,bt),w.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),W.onBeforeRender(R,U,$,G,w,bt),W.transparent===!0&&W.side===Ye&&W.forceSinglePass===!1?(W.side=$e,W.needsUpdate=!0,R.renderBufferDirect($,U,G,W,w,bt),W.side=Ii,W.needsUpdate=!0,R.renderBufferDirect($,U,G,W,w,bt),W.side=Ye):R.renderBufferDirect($,U,G,W,w,bt),w.onAfterRender(R,U,$,G,W,bt)}function Sa(w,U,$){U.isScene!==!0&&(U=Ft);let G=X.get(w),W=v.state.lights,bt=v.state.shadowsArray,At=W.state.version,_t=mt.getParameters(w,W.state,bt,U,$,v.state.lightProbeGridArray),Ct=mt.getProgramCacheKey(_t),Lt=G.programs;G.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?U.environment:null,G.fog=U.fog;let Qt=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;G.envMap=ht.get(w.envMap||G.environment,Qt),G.envMapRotation=G.environment!==null&&w.envMap===null?U.environmentRotation:w.envMapRotation,Lt===void 0&&(w.addEventListener("dispose",zn),Lt=new Map,G.programs=Lt);let ie=Lt.get(Ct);if(ie!==void 0){if(G.currentProgram===ie&&G.lightsStateVersion===At)return dd(w,_t),ie}else _t.uniforms=mt.getUniforms(w),N!==null&&w.isNodeMaterial&&N.build(w,$,_t),w.onBeforeCompile(_t,R),ie=mt.acquireProgram(_t,Ct),Lt.set(Ct,ie),G.uniforms=_t.uniforms;let It=G.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(It.clippingPlanes=Nt.uniform),dd(w,_t),G.needsLights=hp(w),G.lightsStateVersion=At,G.needsLights&&(It.ambientLightColor.value=W.state.ambient,It.lightProbe.value=W.state.probe,It.sunLights.value=W.state.sun,It.sunLightShadows.value=W.state.sunShadow,It.directionalLights.value=W.state.directional,It.directionalLightShadows.value=W.state.directionalShadow,It.spotLights.value=W.state.spot,It.spotLightShadows.value=W.state.spotShadow,It.rectAreaLights.value=W.state.rectArea,It.ltc_1.value=W.state.rectAreaLTC1,It.ltc_2.value=W.state.rectAreaLTC2,It.pointLights.value=W.state.point,It.pointLightShadows.value=W.state.pointShadow,It.hemisphereLights.value=W.state.hemi,It.sunShadowMatrix.value=W.state.sunShadowMatrix,It.sunShadowCascade.value=W.state.sunShadowCascade,It.directionalShadowMatrix.value=W.state.directionalShadowMatrix,It.spotLightMatrix.value=W.state.spotLightMatrix,It.spotLightMap.value=W.state.spotLightMap,It.pointShadowMatrix.value=W.state.pointShadowMatrix),G.lightProbeGrid=v.state.lightProbeGridArray.length>0,G.currentProgram=ie,G.uniformsList=null,ie}function hd(w){if(w.uniformsList===null){let U=w.currentProgram.getUniforms();w.uniformsList=Ks.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function dd(w,U){let $=X.get(w);$.outputColorSpace=U.outputColorSpace,$.batching=U.batching,$.batchingColor=U.batchingColor,$.instancing=U.instancing,$.instancingColor=U.instancingColor,$.instancingMorph=U.instancingMorph,$.skinning=U.skinning,$.morphTargets=U.morphTargets,$.morphNormals=U.morphNormals,$.morphColors=U.morphColors,$.morphTargetsCount=U.morphTargetsCount,$.numClippingPlanes=U.numClippingPlanes,$.numIntersection=U.numClipIntersection,$.vertexAlphas=U.vertexAlphas,$.vertexTangents=U.vertexTangents,$.toneMapping=U.toneMapping}function op(w,U){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;_.setFromMatrixPosition(U.matrixWorld);for(let $=0,G=w.length;$<G;$++){let W=w[$];if(W.texture!==null&&W.boundingBox.containsPoint(_))return W}return null}function lp(w,U,$,G,W){U.isScene!==!0&&(U=Ft),K.resetTextureUnits();let bt=U.fog,At=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?U.environment:null,_t=j===null?R.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:ee.workingColorSpace,Ct=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Lt=ht.get(G.envMap||At,Ct),Qt=G.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ie=!!$.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),It=!!$.morphAttributes.position,ye=!!$.morphAttributes.normal,Ne=!!$.morphAttributes.color,Ae=Fn;G.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ae=R.toneMapping);let Se=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Ze=Se!==void 0?Se.length:0,Tt=X.get(G),tn=v.state.lights;if(at===!0&&(lt===!0||w!==Z)){let Ee=w===Z&&G.id===H;Nt.setState(G,w,Ee)}let ue=!1;G.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==tn.state.version||Tt.outputColorSpace!==_t||W.isBatchedMesh&&Tt.batching===!1||!W.isBatchedMesh&&Tt.batching===!0||W.isBatchedMesh&&Tt.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&Tt.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&Tt.instancing===!1||!W.isInstancedMesh&&Tt.instancing===!0||W.isSkinnedMesh&&Tt.skinning===!1||!W.isSkinnedMesh&&Tt.skinning===!0||W.isInstancedMesh&&Tt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Tt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Tt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Tt.instancingMorph===!1&&W.morphTexture!==null||Tt.envMap!==Lt||G.fog===!0&&Tt.fog!==bt||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==Nt.numPlanes||Tt.numIntersection!==Nt.numIntersection)||Tt.vertexAlphas!==Qt||Tt.vertexTangents!==ie||Tt.morphTargets!==It||Tt.morphNormals!==ye||Tt.morphColors!==Ne||Tt.toneMapping!==Ae||Tt.morphTargetsCount!==Ze||!!Tt.lightProbeGrid!=v.state.lightProbeGridArray.length>0)&&(ue=!0):(ue=!0,Tt.__version=G.version);let yn=Tt.currentProgram;ue===!0&&(yn=Sa(G,U,W),N&&G.isNodeMaterial&&N.onUpdateProgram(G,yn,Tt));let Hn=!1,fi=!1,os=!1,Me=yn.getUniforms(),Le=Tt.uniforms;if(M.useProgram(yn.program)&&(Hn=!0,fi=!0,os=!0),G.id!==H&&(H=G.id,fi=!0),Tt.needsLights){let Ee=op(v.state.lightProbeGridArray,W);Tt.lightProbeGrid!==Ee&&(Tt.lightProbeGrid=Ee,fi=!0)}if(Hn||Z!==w){M.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Me.setValue(D,"projectionMatrix",w.projectionMatrix),Me.setValue(D,"viewMatrix",w.matrixWorldInverse);let mi=Me.map.cameraPosition;mi!==void 0&&mi.setValue(D,ut.setFromMatrixPosition(w.matrixWorld)),C.logarithmicDepthBuffer&&Me.setValue(D,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Me.setValue(D,"isOrthographic",w.isOrthographicCamera===!0),Z!==w&&(Z=w,fi=!0,os=!0)}if(Tt.needsLights&&(tn.state.sunShadowMap.length>0&&Me.setValue(D,"sunShadowMap",tn.state.sunShadowMap,K),tn.state.directionalShadowMap.length>0&&Me.setValue(D,"directionalShadowMap",tn.state.directionalShadowMap,K),tn.state.spotShadowMap.length>0&&Me.setValue(D,"spotShadowMap",tn.state.spotShadowMap,K),tn.state.pointShadowMap.length>0&&Me.setValue(D,"pointShadowMap",tn.state.pointShadowMap,K)),W.isSkinnedMesh){Me.setOptional(D,W,"bindMatrix"),Me.setOptional(D,W,"bindMatrixInverse");let Ee=W.skeleton;Ee&&(Ee.boneTexture===null&&Ee.computeBoneTexture(),Me.setValue(D,"boneTexture",Ee.boneTexture,K))}W.isBatchedMesh&&(Me.setOptional(D,W,"batchingTexture"),Me.setValue(D,"batchingTexture",W._matricesTexture,K),Me.setOptional(D,W,"batchingIdTexture"),Me.setValue(D,"batchingIdTexture",W._indirectTexture,K),Me.setOptional(D,W,"batchingColorTexture"),W._colorsTexture!==null&&Me.setValue(D,"batchingColorTexture",W._colorsTexture,K));let pi=$.morphAttributes;if((pi.position!==void 0||pi.normal!==void 0||pi.color!==void 0)&&F.update(W,$,yn),(fi||Tt.receiveShadow!==W.receiveShadow)&&(Tt.receiveShadow=W.receiveShadow,Me.setValue(D,"receiveShadow",W.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&U.environment!==null&&(Le.envMapIntensity.value=U.environmentIntensity),Le.dfgLUT!==void 0&&(Le.dfgLUT.value=xv()),fi){if(Me.setValue(D,"toneMappingExposure",R.toneMappingExposure),Tt.needsLights&&cp(Le,os),bt&&G.fog===!0&&Dt.refreshFogUniforms(Le,bt),Dt.refreshMaterialUniforms(Le,G,et,J,v.state.transmissionRenderTarget[w.id]),Tt.needsLights&&Tt.lightProbeGrid){let Ee=Tt.lightProbeGrid;Le.probesSH.value=Ee.texture,Le.probesMin.value.copy(Ee.boundingBox.min),Le.probesMax.value.copy(Ee.boundingBox.max),Le.probesResolution.value.copy(Ee.resolution)}Ks.upload(D,hd(Tt),Le,K)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Ks.upload(D,hd(Tt),Le,K),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Me.setValue(D,"center",W.center),Me.setValue(D,"modelViewMatrix",W.modelViewMatrix),Me.setValue(D,"normalMatrix",W.normalMatrix),Me.setValue(D,"modelMatrix",W.matrixWorld),G.uniformsGroups!==void 0){let Ee=G.uniformsGroups;for(let mi=0,ls=Ee.length;mi<ls;mi++){let fd=Ee[mi];st.update(fd,yn),st.bind(fd,yn)}}return yn}function cp(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.sunLights.needsUpdate=U,w.sunLightShadows.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function hp(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(w,U,$){let G=X.get(w);G.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),X.get(w.texture).__webglTexture=U,X.get(w.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:$,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,U){let $=X.get(w);$.__webglFramebuffer=U,$.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,$=0){j=w,q=U,z=$;let G=null,W=!1,bt=!1;if(w){let _t=X.get(w);if(_t.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(D.FRAMEBUFFER,_t.__webglFramebuffer),Y.copy(w.viewport),Et.copy(w.scissor),Mt=w.scissorTest,M.viewport(Y),M.scissor(Et),M.setScissorTest(Mt),H=-1;return}else if(_t.__webglFramebuffer===void 0)K.setupRenderTarget(w);else if(_t.__hasExternalTextures)K.rebindTextures(w,X.get(w.texture).__webglTexture,X.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Qt=w.depthTexture;if(_t.__boundDepthTexture!==Qt){if(Qt!==null&&X.has(Qt)&&(w.width!==Qt.image.width||w.height!==Qt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(w)}}let Ct=w.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(bt=!0);let Lt=X.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Lt[U])?G=Lt[U][$]:G=Lt[U],W=!0):w.samples>0&&K.useMultisampledRTT(w)===!1?G=X.get(w).__webglMultisampledFramebuffer:Array.isArray(Lt)?G=Lt[$]:G=Lt,Y.copy(w.viewport),Et.copy(w.scissor),Mt=w.scissorTest}else Y.copy(St).multiplyScalar(et).floor(),Et.copy(kt).multiplyScalar(et).floor(),Mt=de;if($!==0&&(G=B),M.bindFramebuffer(D.FRAMEBUFFER,G)&&M.drawBuffers(w,G),M.viewport(Y),M.scissor(Et),M.setScissorTest(Mt),W){let _t=X.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,_t.__webglTexture,$)}else if(bt){let _t=U;for(let Ct=0;Ct<w.textures.length;Ct++){let Lt=X.get(w.textures[Ct]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Ct,Lt.__webglTexture,$,_t)}}else if(w!==null&&$!==0){let _t=X.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,_t.__webglTexture,$)}H=-1};function ud(w){let U=X.get(w);return(U.__readFormat!==w.format||U.__readType!==w.type)&&(U.__readFormat=w.format,U.__readType=w.type,U.__formatReadable=C.textureFormatReadable(w.format),U.__typeReadable=C.textureTypeReadable(w.type)),U}this.readRenderTargetPixels=function(w,U,$,G,W,bt,At,_t=0){if(!(w&&w.isWebGLRenderTarget)){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=X.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&At!==void 0&&(Ct=Ct[At]),Ct){M.bindFramebuffer(D.FRAMEBUFFER,Ct);try{let Lt=w.textures[_t],Qt=Lt.format,ie=Lt.type;w.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+_t);let It=ud(Lt);if(It.__formatReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(It.__typeReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-G&&$>=0&&$<=w.height-W&&D.readPixels(U,$,G,W,yt.convert(Qt),yt.convert(ie),bt)}finally{let Lt=j!==null?X.get(j).__webglFramebuffer:null;M.bindFramebuffer(D.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(w,U,$,G,W,bt,At,_t=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=X.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&At!==void 0&&(Ct=Ct[At]),Ct)if(U>=0&&U<=w.width-G&&$>=0&&$<=w.height-W){M.bindFramebuffer(D.FRAMEBUFFER,Ct);let Lt=w.textures[_t],Qt=Lt.format,ie=Lt.type;w.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+_t);let It=ud(Lt);if(It.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(It.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ye=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,ye),D.bufferData(D.PIXEL_PACK_BUFFER,bt.byteLength,D.STREAM_READ),D.readPixels(U,$,G,W,yt.convert(Qt),yt.convert(ie),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);let Ne=j!==null?X.get(j).__webglFramebuffer:null;M.bindFramebuffer(D.FRAMEBUFFER,Ne);let Ae=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await cf(D,Ae,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,ye),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,bt),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(ye),D.deleteSync(Ae),bt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,U=null,$=0){let G=Math.pow(2,-$),W=Math.floor(w.image.width*G),bt=Math.floor(w.image.height*G),At=U!==null?U.x:0,_t=U!==null?U.y:0;K.setTexture2D(w,0),D.copyTexSubImage2D(D.TEXTURE_2D,$,0,0,At,_t,W,bt),M.unbindTexture()},this.copyTextureToTexture=function(w,U,$=null,G=null,W=0,bt=0){let At,_t,Ct,Lt,Qt,ie,It,ye,Ne,Ae=w.isCompressedTexture?w.mipmaps[bt]:w.image;if($!==null)At=$.max.x-$.min.x,_t=$.max.y-$.min.y,Ct=$.isBox3?$.max.z-$.min.z:1,Lt=$.min.x,Qt=$.min.y,ie=$.isBox3?$.min.z:0;else{let Le=Math.pow(2,-W);At=Math.floor(Ae.width*Le),_t=Math.floor(Ae.height*Le),w.isDataArrayTexture?Ct=Ae.depth:w.isData3DTexture?Ct=Math.floor(Ae.depth*Le):Ct=1,Lt=0,Qt=0,ie=0}G!==null?(It=G.x,ye=G.y,Ne=G.z):(It=0,ye=0,Ne=0);let Se=yt.convert(U.format),Ze=yt.convert(U.type),Tt;U.isData3DTexture?(K.setTexture3D(U,0),Tt=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(K.setTexture2DArray(U,0),Tt=D.TEXTURE_2D_ARRAY):(K.setTexture2D(U,0),Tt=D.TEXTURE_2D),M.activeTexture(D.TEXTURE0),M.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),M.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),M.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);let tn=M.getParameter(D.UNPACK_ROW_LENGTH),ue=M.getParameter(D.UNPACK_IMAGE_HEIGHT),yn=M.getParameter(D.UNPACK_SKIP_PIXELS),Hn=M.getParameter(D.UNPACK_SKIP_ROWS),fi=M.getParameter(D.UNPACK_SKIP_IMAGES);M.pixelStorei(D.UNPACK_ROW_LENGTH,Ae.width),M.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ae.height),M.pixelStorei(D.UNPACK_SKIP_PIXELS,Lt),M.pixelStorei(D.UNPACK_SKIP_ROWS,Qt),M.pixelStorei(D.UNPACK_SKIP_IMAGES,ie);let os=w.isDataArrayTexture||w.isData3DTexture,Me=U.isDataArrayTexture||U.isData3DTexture;if(w.isDepthTexture){let Le=X.get(w),pi=X.get(U),Ee=X.get(Le.__renderTarget),mi=X.get(pi.__renderTarget);M.bindFramebuffer(D.READ_FRAMEBUFFER,Ee.__webglFramebuffer),M.bindFramebuffer(D.DRAW_FRAMEBUFFER,mi.__webglFramebuffer);for(let ls=0;ls<Ct;ls++)os&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,X.get(w).__webglTexture,W,ie+ls),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,X.get(U).__webglTexture,bt,Ne+ls)),D.blitFramebuffer(Lt,Qt,At,_t,It,ye,At,_t,D.DEPTH_BUFFER_BIT,D.NEAREST);M.bindFramebuffer(D.READ_FRAMEBUFFER,null),M.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(W!==0||w.isRenderTargetTexture||X.has(w)){let Le=X.get(w),pi=X.get(U);M.bindFramebuffer(D.READ_FRAMEBUFFER,L),M.bindFramebuffer(D.DRAW_FRAMEBUFFER,O);for(let Ee=0;Ee<Ct;Ee++)os?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Le.__webglTexture,W,ie+Ee):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Le.__webglTexture,W),Me?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,pi.__webglTexture,bt,Ne+Ee):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,pi.__webglTexture,bt),W!==0?D.blitFramebuffer(Lt,Qt,At,_t,It,ye,At,_t,D.COLOR_BUFFER_BIT,D.NEAREST):Me?D.copyTexSubImage3D(Tt,bt,It,ye,Ne+Ee,Lt,Qt,At,_t):D.copyTexSubImage2D(Tt,bt,It,ye,Lt,Qt,At,_t);M.bindFramebuffer(D.READ_FRAMEBUFFER,null),M.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Me?w.isDataTexture||w.isData3DTexture?D.texSubImage3D(Tt,bt,It,ye,Ne,At,_t,Ct,Se,Ze,Ae.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(Tt,bt,It,ye,Ne,At,_t,Ct,Se,Ae.data):D.texSubImage3D(Tt,bt,It,ye,Ne,At,_t,Ct,Se,Ze,Ae):w.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,bt,It,ye,At,_t,Se,Ze,Ae.data):w.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,bt,It,ye,Ae.width,Ae.height,Se,Ae.data):D.texSubImage2D(D.TEXTURE_2D,bt,It,ye,At,_t,Se,Ze,Ae);M.pixelStorei(D.UNPACK_ROW_LENGTH,tn),M.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ue),M.pixelStorei(D.UNPACK_SKIP_PIXELS,yn),M.pixelStorei(D.UNPACK_SKIP_ROWS,Hn),M.pixelStorei(D.UNPACK_SKIP_IMAGES,fi),bt===0&&U.generateMipmaps&&D.generateMipmap(Tt),M.unbindTexture()},this.initRenderTarget=function(w){X.get(w).__webglFramebuffer===void 0&&K.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?K.setTextureCube(w,0):w.isData3DTexture?K.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?K.setTexture2DArray(w,0):K.setTexture2D(w,0),M.unbindTexture()},this.resetState=function(){q=0,z=0,j=null,M.reset(),wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}};var tr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var xn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},yv=new Ci(-1,1,1,-1,0,1),Jh=class extends ce{constructor(){super(),this.setAttribute("position",new ae([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ae([0,2,0,0,2,0],2))}},vv=new Jh,Ui=class{constructor(t){this._mesh=new oe(vv,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,yv)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var Jl=class extends xn{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof fe?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=gn.clone(t.uniforms),this.material=new fe({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Ui(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var _a=class extends xn{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){let i=t.getContext(),s=t.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}},Kl=class extends xn{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var jl=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let n=t.getSize(new rt);this._width=n.width,this._height=n.height,e=new Pe(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ke}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Jl(tr),this.copyPass.material.blending=wn,this.timer=new ea}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());let e=this.renderer.getRenderTarget(),n=!1;for(let i=0,s=this.passes.length;i<s;i++){let a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}_a!==void 0&&(a instanceof _a?n=!0:a instanceof Kl&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new rt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Ql=class extends xn{constructor(t,e,n=null,i=null,s=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Rt}render(t,e,n){let i=t.autoClear;t.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(s=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=i}};var $f={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Rt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var er=class r extends xn{constructor(t,e=1,n,i){super(),this.strength=e,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new rt(t.x,t.y):new rt(256,256),this.clearColor=new Rt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Pe(s,a,{type:ke,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let u=new Pe(s,a,{type:ke,depthBuffer:!1});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);let d=new Pe(s,a,{type:ke,depthBuffer:!1});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),s=Math.round(s/2),a=Math.round(a/2)}let o=$f;this.highPassUniforms=gn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new fe({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new rt(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=gn.clone(tr.uniforms),this.blendMaterial=new fe({uniforms:this.copyUniforms,vertexShader:tr.vertexShader,fragmentShader:tr.fragmentShader,premultipliedAlpha:!0,blending:on,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Rt,this._oldClearAlpha=1,this._basic=new Sn,this._fsQuad=new Ui(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new rt(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,s){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),s&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=r.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=r.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=a}_getSeparableBlurMaterial(t){let e=[],n=t/3;for(let a=0;a<t;a++)e.push(.39894*Math.exp(-.5*a*a/(n*n))/n);let i=[],s=[];for(let a=1;a<t;a+=2){let o=e[a],l=a+1<t?e[a+1]:0,c=o+l;i.push((a*o+(a+1)*l)/c),s.push(c)}return new fe({defines:{KERNEL_PAIRS:i.length},uniforms:{colorTexture:{value:null},invSize:{value:new rt(.5,.5)},direction:{value:new rt(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:i},gaussianWeights:{value:s}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new fe({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};er.BlurDirectionX=new rt(1,0);er.BlurDirectionY=new rt(0,1);var Ma={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var tc=class extends xn{constructor(){super(),this.isOutputPass=!0,this.uniforms=gn.clone(Ma.uniforms),this.material=new Xs({name:Ma.name,uniforms:this.uniforms,vertexShader:Ma.vertexShader,fragmentShader:Ma.fragmentShader}),this._fsQuad=new Ui(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ee.getTransfer(this._outputColorSpace)===pe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ia?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===sa?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ra?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===es?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===oa?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===la?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===aa&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var nr=new I(-.45,.82,.38).normalize(),ec=class{constructor(t,e){this.map=e;let n=new $l({canvas:t,antialias:!0,powerPreference:"high-performance"});n.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),n.shadowMap.enabled=!0,n.shadowMap.type=Qi,n.toneMapping=es,n.toneMappingExposure=1.05,n.outputColorSpace=Ge,this.renderer=n;let i=new Nr;this.fogColor=new Rt("#c9d6dc"),i.fog=new Dr(this.fogColor,2e3,7e3),i.background=this.fogColor.clone(),this.scene=i,this.camera=new je(42,1,2,14e3);let s=new jr("#cfe3ff","#5a5040",1.25);i.add(s),this.hemi=s;let a=new ta("#fff1d6",2.6);a.castShadow=!0,a.shadow.mapSize.set(2048,2048),a.shadow.bias=-4e-4,a.shadow.normalBias=1.2,a.shadow.camera.near=10,a.shadow.camera.far=5e3,i.add(a),i.add(a.target),this.sun=a,this.buildSky(),this.cam={x:1480,z:1e3,dist:1500,yaw:0},this.want={...this.cam},this.minDist=170,this.maxDist=2700,this.targetH=10,this.shake=0,this.raycaster=new na,this.tmpV=new I,this.buildComposer(),this.resize()}buildComposer(){try{let t=this.renderer.getDrawingBufferSize(new rt),e=new Pe(t.x,t.y,{type:ke,samples:4}),n=new jl(this.renderer,e);n.addPass(new Ql(this.scene,this.camera)),this.bloom=new er(new rt(t.x/2,t.y/2),.55,.45,.88),n.addPass(this.bloom),n.addPass(new tc),this.composer=n,this.useBloom=!0}catch(t){console.warn("Bloom unavailable",t),this.composer=null,this.useBloom=!1}}buildSky(){let t=new Ei(9e3,32,16),e=new fe({side:$e,depthWrite:!1,fog:!1,uniforms:{top:{value:new Rt("#5f93c9")},horizon:{value:new Rt("#d9e4ea")},sunDir:{value:nr}},vertexShader:`
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          vec4 p = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * p;
        }`,fragmentShader:`
        uniform vec3 top; uniform vec3 horizon; uniform vec3 sunDir;
        varying vec3 vDir;
        void main() {
          float h = clamp(vDir.y, 0.0, 1.0);
          vec3 col = mix(horizon, top, pow(h, 0.55));
          float s = max(dot(normalize(vDir), sunDir), 0.0);
          col += vec3(1.0, 0.85, 0.6) * pow(s, 64.0) * 0.6;
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`});this.sky=new oe(t,e),this.sky.renderOrder=-10,this.scene.add(this.sky)}resize(){let t=window.innerWidth,e=window.innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.composer&&(this.composer.setPixelRatio(this.renderer.getPixelRatio()),this.composer.setSize(t,e)),this.width=t,this.height=e}pitchFor(t){return _e(.52,1.12,Fe(this.minDist,this.maxDist*.85,t))}updateCamera(t){let e=1-Math.exp(-t*9),n=this.cam,i=this.want;i.x=$t(i.x,-100,Jt.W+100),i.z=$t(i.z,-100,Jt.H+100),i.dist=$t(i.dist,this.minDist,this.maxDist),n.x=_e(n.x,i.x,e),n.z=_e(n.z,i.z,e),n.dist=_e(n.dist,i.dist,e);let s=i.yaw-n.yaw;n.yaw+=s*e;let a=Math.max(Jt.WATER,this.map.heightAt(n.x,n.z));this.targetH=_e(this.targetH,a,1-Math.exp(-t*3));let o=this.pitchFor(n.dist),l=Math.cos(o),c=n.x+Math.sin(n.yaw)*l*n.dist,h=n.z+Math.cos(n.yaw)*l*n.dist,u=this.targetH+Math.sin(o)*n.dist,d=this.map.heightAt(c,h);if(u<d+25&&(u=d+25),this.shake>0){let y=this.shake*Math.min(1,900/n.dist);c+=(Math.random()-.5)*y,u+=(Math.random()-.5)*y,h+=(Math.random()-.5)*y,this.shake=Math.max(0,this.shake-t*14)}this.camera.position.set(c,u,h),this.camera.lookAt(n.x,this.targetH,n.z),this.scene.fog.near=n.dist*1.1,this.scene.fog.far=n.dist*3.2+1200;let f=$t(n.dist*.85,280,1700),p=this.sun.shadow.camera;p.left=-f,p.right=f,p.top=f,p.bottom=-f,p.updateProjectionMatrix(),this.sun.position.set(n.x+nr.x*2200,this.targetH+nr.y*2200,n.z+nr.z*2200),this.sun.target.position.set(n.x,this.targetH,n.z),this.sun.target.updateMatrixWorld(),this.sky.position.copy(this.camera.position)}groundAt(t,e){let n=new rt(t/this.width*2-1,-(e/this.height)*2+1);this.raycaster.setFromCamera(n,this.camera);let i=this.raycaster.ray.origin,s=this.raycaster.ray.direction;if(s.y>=-.01)return null;let a=this.map,o=0,l=6,c=0,h=2e4;for(;o<h;){let u=i.x+s.x*o,d=i.y+s.y*o,f=i.z+s.z*o,p=Math.max(Jt.WATER,a.heightAt(u,f));if(d<=p){let y=c,g=o;for(let m=0;m<12;m++){let b=(y+g)/2,E=i.y+s.y*b,_=Math.max(Jt.WATER,a.heightAt(i.x+s.x*b,i.z+s.z*b));E<=_?g=b:y=b}return{x:i.x+s.x*g,z:i.z+s.z*g}}c=o,o+=Math.max(l,(d-p)*.5)}return null}planeAt(t,e,n){let i=new rt(t/this.width*2-1,-(e/this.height)*2+1);this.raycaster.setFromCamera(i,this.camera);let s=this.raycaster.ray.origin,a=this.raycaster.ray.direction;if(Math.abs(a.y)<1e-4)return null;let o=(n-s.y)/a.y;return o<0?null:{x:s.x+a.x*o,z:s.z+a.z*o}}project(t,e,n,i){let s=this.tmpV.set(t,e,n).project(this.camera);return i.x=(s.x*.5+.5)*this.width,i.y=(-s.y*.5+.5)*this.height,i.behind=s.z>1,i}flyTo(t,e,n){this.want.x=t,this.want.z=e,n&&(this.want.dist=n)}render(){this.useBloom&&this.composer?this.composer.render():this.renderer.render(this.scene,this.camera)}};var{W:Kh,H:jh,MARGIN:Tn,HM_STEP:Yf,WATER:rs}=Jt,ir=Kh+2*Tn,nc=jh+2*Tn,as=(r,t,e)=>[_e(r[0],t[0],e),_e(r[1],t[1],e),_e(r[2],t[2],e)];function sc(r,t,e,n){let i=r.noise3.fbm(t/420+11,e/420+4,4)+(n>30?.12:0);for(let s of r.locations){if(s.type==="bridge")continue;let a=s.type==="capital"?90:s.type==="city"?75:s.type==="fort"?65:45,o=Math.hypot(t-s.x,e-s.y);o<a*1.7&&(i-=.45*(1-Fe(a*.7,a*1.7,o)))}return i}function ic(r,t){let e=document.createElement("canvas");return e.width=r,e.height=t,e}var rc=class{constructor(t,e,n={}){this.rig=t,this.map=e,this.texSize=n.texSize||3072,this.buildGeometry(),this.paintBase(),this.buildOwnership(),this.buildDetail(),this.buildMesh(),this.buildWater(),this.flashes=[],this.ownVersion=-1,this.lastOwnDraw=0}buildGeometry(){let t=this.map,e=t.hmW,n=t.hmH,i=new Float32Array(e*n*3),s=new Float32Array(e*n*2);for(let c=0;c<n;c++)for(let h=0;h<e;h++){let u=c*e+h;i[u*3]=-Tn+h*Yf,i[u*3+1]=t.hm[u],i[u*3+2]=-Tn+c*Yf,s[u*2]=h/(e-1),s[u*2+1]=1-c/(n-1)}let a=new Uint32Array((e-1)*(n-1)*6),o=0;for(let c=0;c<n-1;c++)for(let h=0;h<e-1;h++){let u=c*e+h,d=u+1,f=u+e,p=f+1;a[o++]=u,a[o++]=f,a[o++]=d,a[o++]=f,a[o++]=p,a[o++]=d}let l=new ce;l.setAttribute("position",new ve(i,3)),l.setAttribute("uv",new ve(s,2)),l.setIndex(new ve(a,1)),l.computeVertexNormals(),l.computeBoundingSphere(),this.geometry=l}paintBase(){let t=this.map,e=this.texSize,n=Math.round(e*nc/ir),i=Math.round(e/2.4),s=Math.round(n/2.4),a=ic(i,s),o=a.getContext("2d"),l=o.createImageData(i,s),c=l.data,h=t.noise,u=t.noise2,d=[104,136,62],f=[152,152,84],p=[52,80,40],y=[122,112,98],g=[88,80,72],m=[238,242,246],b=[206,192,142],E=[96,118,104],_=[52,78,88];for(let T=0;T<s;T++){let R=-Tn+(T+.5)/s*nc;for(let P=0;P<i;P++){let N=-Tn+(P+.5)/i*ir,B=t.heightAt(N,R),L=t.heightAt(N+5,R)-B,O=t.heightAt(N,R+5)-B,q=Math.hypot(L,O)/5,z=h.fbm(N/190,R/190,3),j=u.get(N/22,R/22),H=as(d,f,Fe(-.35,.55,z)),Z=sc(t,N,R,B),Y=Fe(.12,.22,Z)*(1-Fe(70,110,B));H=as(H,p,Y*.9);let Et=Math.max(Fe(48,92,B+z*14),Fe(.75,1.5,q));H=as(H,as(y,g,j*.5+.5),Et);let Mt=Fe(140,178,B+z*22)*(1-Fe(1.3,2.4,q));H=as(H,m,Mt);let jt=1-Fe(rs+.6,rs+4.5,B);H=as(H,b,jt),B<rs&&(H=as(E,_,Fe(0,18,rs-B)));let Gt=1+j*.07,Yt=(T*i+P)*4;c[Yt]=$t(H[0]*Gt,0,255),c[Yt+1]=$t(H[1]*Gt,0,255),c[Yt+2]=$t(H[2]*Gt,0,255),c[Yt+3]=255}}o.putImageData(l,0,0);let S=ic(e,n),v=S.getContext("2d");v.imageSmoothingEnabled=!0,v.imageSmoothingQuality="high",v.drawImage(a,0,0,e,n);let A=e/ir;v.setTransform(A,0,0,A,Tn*A,Tn*A),this.paintFields(v),this.paintTowns(v),this.paintRivers(v),this.paintRoads(v),this.paintBorders(v),v.setTransform(1,0,0,1,0,0);let x=new Kn(S);x.colorSpace=Ge,x.anisotropy=Math.min(8,this.rig.renderer.capabilities.getMaxAnisotropy()),x.generateMipmaps=!0,x.minFilter=jn,this.baseTex=x,this.baseCanvas=S}paintFields(t){let e=this.map,n=new vn(e.seed*7+11),i=["rgba(214,190,108,0.55)","rgba(150,176,86,0.5)","rgba(146,112,74,0.5)","rgba(190,172,98,0.55)","rgba(124,156,72,0.5)","rgba(200,160,90,0.45)"];for(let s of e.locations){if(s.type==="bridge"||s.type==="fort")continue;let a=s.type==="capital"?70:s.type==="city"?46:22,o=s.type==="capital"?70:s.type==="city"?58:34,l=s.type==="capital"?220:s.type==="city"?175:115,c=n.float(0,Math.PI);for(let h=0;h<a;h++){let u=n.float(0,Math.PI*2),d=n.float(o,l),f=s.x+Math.cos(u)*d,p=s.y+Math.sin(u)*d;if(f<10||p<10||f>Kh-10||p>jh-10)continue;let y=e.heightAt(f,p);if(y<rs+3||y>55||sc(e,f,p,y)>.1)continue;let g=!1;for(let E of e.rivers)wa(f,p,E.pts)<22&&(g=!0);if(g)continue;let m=n.float(20,46),b=n.float(12,28);t.save(),t.translate(f,p),t.rotate(c+n.int(0,1)*Math.PI/2+n.float(-.15,.15)),t.fillStyle=n.pick(i),t.fillRect(-m/2,-b/2,m,b),t.strokeStyle="rgba(60,72,36,0.35)",t.lineWidth=1.2,t.strokeRect(-m/2,-b/2,m,b),t.strokeStyle="rgba(80,70,40,0.12)",t.lineWidth=.7;for(let E=-m/2+3;E<m/2;E+=3.5)t.beginPath(),t.moveTo(E,-b/2),t.lineTo(E,b/2),t.stroke();t.restore()}}}paintTowns(t){for(let e of this.map.locations){if(e.type==="bridge")continue;let n=e.type==="capital"?64:e.type==="city"?48:e.type==="fort"?44:24,i=t.createRadialGradient(e.x,e.y,0,e.x,e.y,n);i.addColorStop(0,"rgba(150,134,108,0.85)"),i.addColorStop(.7,"rgba(150,134,108,0.55)"),i.addColorStop(1,"rgba(150,134,108,0)"),t.fillStyle=i,t.beginPath(),t.arc(e.x,e.y,n,0,Math.PI*2),t.fill()}}paintRivers(t){t.lineJoin="round",t.lineCap="round";for(let e of this.map.rivers){let n=()=>{t.beginPath(),e.pts.forEach((i,s)=>s?t.lineTo(i[0],i[1]):t.moveTo(i[0],i[1]))};n(),t.strokeStyle="rgba(92,84,56,0.55)",t.lineWidth=22,t.stroke(),n(),t.strokeStyle="rgb(58,98,112)",t.lineWidth=12,t.stroke()}}paintRoads(t){t.lineJoin="round",t.lineCap="round";let e=(n,i,s)=>{for(let a of this.map.roads)a.major===n&&(t.beginPath(),a.pts.forEach((o,l)=>l?t.lineTo(o[0],o[1]):t.moveTo(o[0],o[1])),t.strokeStyle=s,t.lineWidth=i,t.stroke())};e(!1,4.2,"rgba(70,56,38,0.45)"),e(!1,2.4,"rgba(196,176,132,0.9)"),e(!0,7,"rgba(64,50,34,0.55)"),e(!0,4.2,"rgb(212,192,146)"),e(!0,1,"rgba(160,140,100,0.6)")}paintBorders(t){t.strokeStyle="rgba(30,26,16,0.10)",t.lineWidth=1.1;for(let e of this.map.cells)e.passable&&(t.beginPath(),e.poly.forEach((n,i)=>i?t.lineTo(n[0],n[1]):t.moveTo(n[0],n[1])),t.closePath(),t.stroke())}buildOwnership(){let e=Math.round(1024*nc/ir);this.ownCanvas=ic(1024,e),this.ownCtx=this.ownCanvas.getContext("2d"),this.ownScale=1024/ir;let n=new Kn(this.ownCanvas);n.colorSpace=Ge,n.minFilter=De,n.generateMipmaps=!1,this.ownTex=n}drawOwnership(t){let e=this.ownCtx,n=this.ownScale;e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,this.ownCanvas.width,this.ownCanvas.height),e.setTransform(n,0,0,n,Tn*n,Tn*n);let i=this.map;for(let s of[0,1]){let a=Ce[s].tint;e.fillStyle=`rgba(${a[0]},${a[1]},${a[2]},${s===0?.26:.3})`,e.beginPath();for(let o of i.cells)o.owner===s&&(o.poly.forEach((l,c)=>c?e.lineTo(l[0],l[1]):e.moveTo(l[0],l[1])),e.closePath());e.fill()}this.flashes=this.flashes.filter(s=>t-s.t<1.6);for(let s of this.flashes){let a=1-(t-s.t)/1.6,o=i.cells[s.cell],l=Ce[s.side].tint;e.fillStyle=`rgba(${Math.min(255,l[0]+90)},${Math.min(255,l[1]+90)},${Math.min(255,l[2]+90)},${.7*a})`,e.beginPath(),o.poly.forEach((c,h)=>h?e.lineTo(c[0],c[1]):e.moveTo(c[0],c[1])),e.closePath(),e.fill()}this.ownTex.needsUpdate=!0}flash(t,e,n){this.flashes.push({cell:t,side:e,t:n})}update(t,e){(e!==this.ownVersion||this.flashes.length>0)&&t-this.lastOwnDraw>1/12&&(this.drawOwnership(t),this.ownVersion=e,this.lastOwnDraw=t),this.waterMat.uniforms.time.value=t}buildDetail(){let e=ic(256,256),n=e.getContext("2d"),i=n.createImageData(256,256),s=new vn(99),a=d=>{let f=new Float32Array(d*d);for(let p=0;p<f.length;p++)f[p]=s.next();return(p,y)=>{let g=p/256*d,m=y/256*d,b=Math.floor(g),E=Math.floor(m),_=g-b,S=m-E,v=(T,R)=>f[(R%d+d)%d*d+(T%d+d)%d],A=_*_*(3-2*_),x=S*S*(3-2*S);return _e(_e(v(b,E),v(b+1,E),A),_e(v(b,E+1),v(b+1,E+1),A),x)}},o=a(8),l=a(16),c=a(32),h=a(64);for(let d=0;d<256;d++)for(let f=0;f<256;f++){let p=o(f,d)*.4+l(f,d)*.3+c(f,d)*.2+h(f,d)*.1,y=(d*256+f)*4,g=$t(p*255,0,255);i.data[y]=g,i.data[y+1]=g,i.data[y+2]=g,i.data[y+3]=255}n.putImageData(i,0,0);let u=new Kn(e);u.wrapS=qi,u.wrapT=qi,u.colorSpace=On,this.detailTex=u}buildMesh(){let t=new qe({map:this.baseTex,roughness:.94,metalness:0}),e=this.ownTex,n=this.detailTex;t.onBeforeCompile=s=>{s.uniforms.ownMap={value:e},s.uniforms.detailMap={value:n},s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vWPos;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`),s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
uniform sampler2D ownMap;
uniform sampler2D detailMap;
varying vec3 vWPos;`).replace("#include <map_fragment>",`#include <map_fragment>
          float det = texture2D(detailMap, vWPos.xz * 0.019).r * 0.55 + texture2D(detailMap, vWPos.xz * 0.0043).r * 0.45;
          diffuseColor.rgb *= 0.8 + det * 0.4;
          vec4 own = texture2D(ownMap, vMapUv);
          diffuseColor.rgb = mix(diffuseColor.rgb, own.rgb, own.a);`)};let i=new oe(this.geometry,t);i.receiveShadow=!0,i.castShadow=!0,this.mesh=i,this.rig.scene.add(i)}buildWater(){let t=this.map,e=t.hmW,n=t.hmH,i=new Uint8Array(e*n*4);for(let h=0;h<n;h++)for(let u=0;u<e;u++){let d=h*e+u,f=$t((t.hm[d]+60)/300,0,1)*255,p=((n-1-h)*e+u)*4;i[p]=f,i[p+1]=f,i[p+2]=f,i[p+3]=255}let s=new Yi(i,e,n,cn);s.minFilter=De,s.magFilter=De,s.needsUpdate=!0;let a=16e3,o=new Un(a,a,1,1);o.rotateX(-Math.PI/2);let l=new fe({transparent:!0,fog:!0,uniforms:gn.merge([ft.fog,{time:{value:0},hTex:{value:s},sunDir:{value:nr},deep:{value:new Rt("#1d4a5e")},shallow:{value:new Rt("#3f8a8f")},sky:{value:new Rt("#a9c7d8")},bounds:{value:new Te(-Tn,-Tn,ir,nc)}}]),vertexShader:`
        varying vec3 vW;
        #include <fog_pars_vertex>
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vW = wp.xyz;
          vec4 mvPosition = viewMatrix * wp;
          gl_Position = projectionMatrix * mvPosition;
          #include <fog_vertex>
        }`,fragmentShader:`
        uniform float time; uniform sampler2D hTex; uniform vec3 sunDir;
        uniform vec3 deep; uniform vec3 shallow; uniform vec3 sky; uniform vec4 bounds;
        varying vec3 vW;
        #include <fog_pars_fragment>
        float wave(vec2 p) {
          return sin(p.x * 0.045 + time * 0.9) * 0.5 + sin(p.y * 0.061 - time * 0.7) * 0.5
               + sin((p.x + p.y) * 0.13 + time * 1.4) * 0.22 + sin((p.x * 0.6 - p.y) * 0.27 - time * 1.9) * 0.1;
        }
        void main() {
          vec2 p = vW.xz;
          vec2 uv = (p - bounds.xy) / bounds.zw;
          float ground = texture2D(hTex, vec2(uv.x, 1.0 - uv.y)).r * 300.0 - 60.0;
          if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) ground = -60.0;
          float depth = ${rs.toFixed(1)} - ground;
          if (depth < -0.5) discard;
          float e = 1.5;
          vec3 n = normalize(vec3(wave(p - vec2(e, 0.0)) - wave(p + vec2(e, 0.0)), 3.2, wave(p - vec2(0.0, e)) - wave(p + vec2(0.0, e))));
          vec3 v = normalize(cameraPosition - vW);
          float fres = pow(1.0 - max(dot(n, v), 0.0), 3.0);
          vec3 col = mix(shallow, deep, smoothstep(0.0, 14.0, depth));
          col = mix(col, sky, 0.12 + fres * 0.55);
          vec3 r = reflect(-sunDir, n);
          col += vec3(1.0, 0.92, 0.75) * pow(max(dot(r, v), 0.0), 90.0) * 1.3;
          float foam = (1.0 - smoothstep(0.0, 1.6, depth)) * (0.55 + 0.45 * sin(time * 2.0 + p.x * 0.2 + p.y * 0.17));
          col = mix(col, vec3(0.92, 0.95, 0.95), foam * 0.55);
          float alpha = mix(0.55, 0.96, smoothstep(0.0, 9.0, depth));
          gl_FragColor = vec4(col, alpha);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
          #include <fog_fragment>
        }`}),c=new oe(o,l);c.position.set(Kh/2,rs,jh/2),c.renderOrder=1,this.waterMat=l,this.water=c,this.rig.scene.add(c)}};function ui(r,t=!1){let e=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},a={},o=r[0].morphTargetsRelative,l=new ce,c=0;for(let h=0;h<r.length;++h){let u=r[h],d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0,u=[];for(let d=0;d<r.length;++d){let f=r[d].index;for(let p=0;p<f.count;++p)u.push(f.getX(p)+h);h+=r[d].attributes.position.count}l.setIndex(u)}for(let h in s){let u=Zf(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let y=0;y<a[h].length;++y)f.push(a[h][y][d]);let p=Zf(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}}return l}function Zf(r){let t,e,n,i=-1,s=0;for(let c=0;c<r.length;++c){let h=r[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*e}let a=new t(s),o=new ve(a,e,n),l=0;for(let c=0;c<r.length;++c){let h=r[c];if(h.isInterleavedBufferAttribute){let u=l/e;for(let d=0,f=h.count;d<f;d++)for(let p=0;p<e;p++){let y=h.getComponent(d,p);o.setComponent(d+u,p,y)}}else a.set(h.array,l);l+=h.count*e}return i!==void 0&&(o.gpuType=i),o}var{W:Jf,H:Kf,WATER:Qh}=Jt;function le(r,t){let e=r.index?r.toNonIndexed():r,n=new Rt(t),i=e.attributes.position.count,s=new Float32Array(i*3);for(let a=0;a<i;a++)s[a*3]=n.r,s[a*3+1]=n.g,s[a*3+2]=n.b;return e.setAttribute("color",new ve(s,3)),e.attributes.uv&&e.deleteAttribute("uv"),e}var td=class{constructor(t){this.step=t,this.w=Math.ceil(Jf/t)+1,this.h=Math.ceil(Kf/t)+1,this.data=new Uint8Array(this.w*this.h)}markLine(t,e){let n=this.step,i=Math.ceil(e/n);for(let[s,a]of cr(t,n*.5)){let o=Math.round(s/n),l=Math.round(a/n);for(let c=l-i;c<=l+i;c++)for(let h=o-i;h<=o+i;h++)h<0||c<0||h>=this.w||c>=this.h||Math.hypot(h*n-s,c*n-a)<=e&&(this.data[c*this.w+h]=1)}}at(t,e){let n=Math.round(t/this.step),i=Math.round(e/this.step);return n<0||i<0||n>=this.w||i>=this.h?1:this.data[i*this.w+n]}},ac=class{constructor(t,e,n={}){this.rig=t,this.map=e,this.scene=t.scene,this.quality=n.quality||1,this.mask=new td(5);for(let i of e.roads)this.mask.markLine(i.pts,i.major?9:7);for(let i of e.rivers)this.mask.markLine(i.pts,15);this.buildTrees(),this.buildTowns(),this.buildForts(),this.buildBridges(),this.buildFlags(),this.buildBeacons()}slope(t,e){let n=this.map,i=n.heightAt(t,e);return Math.hypot(n.heightAt(t+4,e)-i,n.heightAt(t,e+4)-i)/4}nearTown(t,e,n=0){for(let i of this.map.locations){if(i.type==="bridge")continue;let s=(i.type==="capital"?82:i.type==="city"?62:i.type==="fort"?52:34)+n;if(Math.hypot(t-i.x,e-i.y)<s)return!0}return!1}buildTrees(){let t=this.map,e=new vn(t.seed*3+5),n=ui([le(new Oe(.5,.7,4,5).translate(0,2,0),"#5b4330"),le(new wi(4.6,8,7).translate(0,7.2,0),"#2c5530"),le(new wi(3.4,6.5,7).translate(0,11,0),"#336238"),le(new wi(2.1,4.5,6).translate(0,14,0),"#3a6b3c")]),i=ui([le(new Oe(.6,.85,5,5).translate(0,2.5,0),"#5d4631"),le(new Ws(4.6,0).translate(0,8.2,0),"#4d7a36"),le(new Ws(3.2,0).translate(1.8,10.4,.8),"#5a8a3c")]),s=[],a=[],o=12.5/Math.sqrt(this.quality);for(let h=8;h<Kf-4;h+=o)for(let u=8;u<Jf-4;u+=o){let d=u+e.float(-.45,.45)*o,f=h+e.float(-.45,.45)*o,p=t.heightAt(d,f);if(p<Qh+2.5||p>132||this.mask.at(d,f))continue;let y=sc(t,d,f,p),g=y>.16+e.float(-.03,.05),m=!g&&y>-.05&&e.chance(.022);if(!g&&!m||this.slope(d,f)>1.5||this.nearTown(d,f,4))continue;(p>42||e.chance(f<700?.55:.3)?s:a).push([d,p,f,e.float(.55,1),e.float(0,Math.PI*2),e.float(.82,1.12)])}let l=new qe({vertexColors:!0,roughness:.92,flatShading:!0}),c=(h,u)=>{let d=new fn(h,l,u.length),f=new re,p=new Xe,y=new an,g=new I,m=new I,b=new Rt;return u.forEach(([E,_,S,v,A,x],T)=>{y.set(0,A,0),p.setFromEuler(y),g.set(v,v*(.9+(x-.8)),v),m.set(E,_-.6,S),f.compose(m,p,g),d.setMatrixAt(T,f),b.setRGB(x,x*(.96+A%.08),x*.95),d.setColorAt(T,b)}),d.castShadow=!0,d.receiveShadow=!0,d.instanceMatrix.needsUpdate=!0,this.scene.add(d),d};this.conifers=c(n,s),this.leafy=c(i,a),this.treeCount=s.length+a.length}buildTowns(){let t=this.map,e=new vn(t.seed*17+2),n=[],i=[],s=[];for(let v of t.locations){if(v.type==="bridge"||v.type==="fort")continue;let A={capital:{n:62,r:60,big:1.25},city:{n:34,r:44,big:1.1},village:{n:7,r:21,big:.85}}[v.type];v.type!=="village"&&i.push({x:v.x,y:v.y,h:v.type==="capital"?34:22,r:v.type==="capital"?7:5});let x=0;for(let T=0;T<A.n*6&&x<A.n;T++){let R=e.float(0,Math.PI*2),P=Math.sqrt(e.next())*A.r+9,N=v.x+Math.cos(R)*P,B=v.y+Math.sin(R)*P,L=t.heightAt(N,B);if(L<Qh+2||this.mask.at(N,B)||n.some(H=>Math.hypot(H.x-N,H.y-B)<9.5))continue;let O=Math.round(R/(Math.PI/2))*(Math.PI/2)+e.float(-.2,.2),q=e.float(6,10)*A.big,z=e.float(5,7)*A.big,j=e.float(4.5,7)*A.big*(P<A.r*.5&&v.type!=="village"?1.5:1);n.push({x:N,y:B,h:L,w:q,d:z,hh:j,rot:O,wall:e.int(0,3),roof:e.int(0,3)}),x++}if(v.type==="capital")for(let P=0;P<40;P++){let N=P/40*Math.PI*2,B=(P+1)/40*Math.PI*2,L=v.x+Math.cos(N)*74,O=v.y+Math.sin(N)*74,q=v.x+Math.cos(B)*74,z=v.y+Math.sin(B)*74,j=(L+q)/2,H=(O+z)/2;this.mask.at(j,H)||s.push({x:j,y:H,len:Math.hypot(q-L,z-O)+.6,rot:-Math.atan2(z-O,q-L),tower:P%4===0})}}let a=["#e3d7bf","#cdbd9d","#b5a993","#ece3d0"].map(v=>new Rt(v)),o=["#a24a30","#7d4a36","#5b616d","#b0583a"].map(v=>new Rt(v)),l=new me(1,1,1).translate(0,.5,0),c=new Oe(1,1,1,3).rotateZ(Math.PI/2).rotateX(-Math.PI/2);c.translate(0,.5,0),c.scale(1,.66,1/1.732);let h=new qe({color:"#ffffff",roughness:.85,flatShading:!0}),u=new fn(l,h,n.length+s.length),d=new fn(c,h,n.length),f=new re,p=new Xe,y=new an,g=new I,m=new I;n.forEach((v,A)=>{y.set(0,v.rot,0),p.setFromEuler(y),m.set(v.x,v.h-1,v.y),g.set(v.w,v.hh+1,v.d),f.compose(m,p,g),u.setMatrixAt(A,f),u.setColorAt(A,a[v.wall]),m.set(v.x,v.h+v.hh,v.y),g.set(v.w*1.08,v.d*.9,v.d*1.12),f.compose(m,p,g),d.setMatrixAt(A,f),d.setColorAt(A,o[v.roof])});let b=new Rt("#a39d90");s.forEach((v,A)=>{let x=n.length+A;y.set(0,v.rot,0),p.setFromEuler(y);let T=this.map.heightAt(v.x,v.y);m.set(v.x,T-2,v.y),g.set(v.len,v.tower?15:10,v.tower?7:3.5),f.compose(m,p,g),u.setMatrixAt(x,f),u.setColorAt(x,b)});for(let v of[u,d])v.castShadow=!0,v.receiveShadow=!0,v.instanceMatrix.needsUpdate=!0,this.scene.add(v);let E=ui([le(new Oe(1,1.1,1,8).translate(0,.5,0),"#d9cdb5"),le(new wi(1.35,.55,8).translate(0,1.27,0),"#8a3d2a")]),_=new qe({vertexColors:!0,roughness:.8,flatShading:!0}),S=new fn(E,_,i.length);i.forEach((v,A)=>{let x=this.map.heightAt(v.x,v.y);f.compose(new I(v.x,x-1,v.y),new Xe,new I(v.r,v.h,v.r)),S.setMatrixAt(A,f)}),S.castShadow=!0,S.receiveShadow=!0,this.scene.add(S)}buildForts(){let t=this.map,e=t.locations.filter(u=>u.type==="fort"),n=new Vs,i=5,s=40,a=27;for(let u=0;u<i*2;u++){let d=u/(i*2)*Math.PI*2-Math.PI/2,f=u%2===0?s:a,p=Math.cos(d)*f,y=Math.sin(d)*f;u===0?n.moveTo(p,y):n.lineTo(p,y)}n.closePath();let o=new Ji;for(let u=0;u<i*2;u++){let d=u/(i*2)*Math.PI*2-Math.PI/2,f=u%2===0?s-8:a-6,p=Math.cos(d)*f,y=Math.sin(d)*f;u===0?o.moveTo(p,y):o.lineTo(p,y)}o.closePath(),n.holes.push(o);let l=new Zr(n,{depth:11,bevelEnabled:!0,bevelSize:1.2,bevelThickness:1.2,bevelSegments:1});l.rotateX(-Math.PI/2);let c=new qe({color:"#9f988a",roughness:.9,flatShading:!0}),h=new qe({color:"#7d7466",roughness:.9,flatShading:!0});for(let u of e){let d=t.heightAt(u.x,u.y),f=new oe(l,c);f.position.set(u.x,d-3,u.y),f.castShadow=!0,f.receiveShadow=!0,this.scene.add(f);let p=new oe(new me(12,14,12),h);p.position.set(u.x,d+5,u.y),p.castShadow=!0,this.scene.add(p);for(let y=0;y<3;y++){let g=y/3*Math.PI*2+.4,m=new oe(new me(10,6,5),h);m.position.set(u.x+Math.cos(g)*16,d+2,u.y+Math.sin(g)*16),m.rotation.y=-g,m.castShadow=!0,this.scene.add(m)}}}buildBridges(){let t=this.map;this.bridgeMeshes=[];let e=new qe({color:"#8a6a48",roughness:.85,flatShading:!0}),n=new qe({color:"#8f887c",roughness:.9,flatShading:!0});for(let i of t.bridges){let s=new li,a=t.cells[i.a],o=t.cells[i.b],l=Math.atan2(o.y-a.y,o.x-a.x),c=46,h=t.heightAt(i.x-Math.cos(l)*c*.5,i.y-Math.sin(l)*c*.5),u=t.heightAt(i.x+Math.cos(l)*c*.5,i.y+Math.sin(l)*c*.5),d=Math.max(Qh+3.5,Math.min(h,u)+1.5),f=[];for(let p=-1;p<=1;p++){let y=new oe(new me(c/3+.4,1.6,9),e);y.position.set(p*c/3,0,0),y.castShadow=!0,y.receiveShadow=!0,s.add(y);for(let g of[-1,1]){let m=new oe(new me(c/3,1.6,.7),e);m.position.set(p*c/3,1.6,g*4.3),s.add(m),f.push({mesh:m,k:p})}f.push({mesh:y,k:p})}for(let p of[-c/6,c/6]){let y=new oe(new me(3.5,14,10),n);y.position.set(p,-7.5,0),s.add(y)}s.position.set(i.x,d,i.y),s.rotation.y=-l,this.scene.add(s),this.bridgeMeshes[i.id]={group:s,parts:f,destroyed:!1}}}setBridgeDestroyed(t,e){let n=this.bridgeMeshes[t];if(!(!n||n.destroyed===e)){n.destroyed=e;for(let i of n.parts)i.k===0&&(i.mesh.visible=!e)}}buildFlags(){let t=this.map;this.flagLocs=t.locations.filter(h=>h.type!=="village");let e=this.flagLocs.length,n=new Oe(.45,.55,30,6).translate(0,15,0),i=new qe({color:"#d8d8d8",roughness:.4,metalness:.6}),s=new fn(n,i,e),a=new Un(14,8,10,2).translate(7,0,0),o=new qe({color:"#ffffff",side:Ye,roughness:.7});this.flagTime={value:0},o.onBeforeCompile=h=>{h.uniforms.time=this.flagTime,h.vertexShader=h.vertexShader.replace("#include <common>",`#include <common>
uniform float time;`).replace("#include <begin_vertex>",`#include <begin_vertex>
          float ph = instanceMatrix[3].x * 0.05 + instanceMatrix[3].z * 0.07;
          transformed.z += sin(position.x * 0.45 - time * 5.0 + ph) * position.x * 0.12;
          transformed.y += sin(position.x * 0.3 - time * 3.0 + ph) * position.x * 0.04;`)};let l=new fn(a,o,e),c=new re;this.flagLocs.forEach((h,u)=>{let d=t.heightAt(h.x,h.y),f=h.type==="capital"?52:h.type==="fort"?34:30,p=h.type==="capital"?1.4:1;c.compose(new I(h.x,d+(h.type==="fort"?10:0),h.y),new Xe,new I(p,f/30,p)),s.setMatrixAt(u,c),c.compose(new I(h.x,d+f+(h.type==="fort"?10:0)-4.5,h.y),new Xe,new I(p,p,p)),l.setMatrixAt(u,c)}),s.castShadow=!0,l.castShadow=!0,this.scene.add(s),this.scene.add(l),this.flags=l,this.updateFlags()}updateFlags(){let t=new Rt;this.flagLocs.forEach((e,n)=>{t.set(e.owner===V?Ce[V].color:e.owner===ot?Ce[ot].color:"#cccccc"),this.flags.setColorAt(n,t)}),this.flags.instanceColor.needsUpdate=!0}buildBeacons(){let t=this.map,e=[...sn[V],...sn[ot]];this.beacons=[];let n=new Oe(9,14,260,20,1,!0).translate(0,130,0);for(let i of e){let s=t.locByKey[i],a=new fe({transparent:!0,depthWrite:!1,blending:on,side:Ye,uniforms:{color:{value:new Rt("#ffffff")},time:this.flagTime,strength:{value:1}},vertexShader:`
          varying float vH; varying vec3 vN; varying vec3 vV;
          void main() {
            vH = position.y / 260.0;
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vN = normalize(mat3(modelMatrix) * normal);
            vV = normalize(cameraPosition - wp.xyz);
            gl_Position = projectionMatrix * viewMatrix * wp;
          }`,fragmentShader:`
          uniform vec3 color; uniform float time; uniform float strength;
          varying float vH; varying vec3 vN; varying vec3 vV;
          void main() {
            float edge = pow(1.0 - abs(dot(vN, vV)), 1.5);
            float a = (1.0 - vH) * (1.0 - vH) * (0.25 + 0.75 * (1.0 - edge));
            a *= 0.32 + 0.08 * sin(time * 2.5 - vH * 12.0);
            gl_FragColor = vec4(color * a * strength, 1.0);
          }`}),o=new oe(n,a);o.position.set(s.x,t.heightAt(s.x,s.y),s.y),o.renderOrder=5,this.scene.add(o),this.beacons.push({loc:s,mesh:o,mat:a})}this.updateBeacons()}updateBeacons(){for(let t of this.beacons){let e=t.loc.owner;t.mat.uniforms.color.value.set(e===V?"#7dffa0":"#ff7a5c")}}update(t,e){this.flagTime.value=t;for(let n of this.beacons)n.mat.uniforms.strength.value=Math.min(1.2,Math.max(.25,e/1400))}};var ed=1800,jf=9.6,Qf=9.4;function tp(r){let t=r===V?"#3f7a45":"#8a3a30",e=r===V?"#2f5a33":"#5e2721",n=[le(new me(1.2,3.4,.8).translate(0,1.7,-.55),"#3b3a32"),le(new me(1.2,3.4,.8).translate(0,1.7,.55),"#3b3a32"),le(new me(1.7,3.3,2.4).translate(0,4.9,0),t),le(new me(.7,2.8,.7).translate(.4,5,-1.45),t),le(new me(.7,2.8,.7).translate(.4,5,1.45),t),le(new Ei(.85,8,6).translate(0,7.25,0),"#e2b48c"),le(new Ei(1.05,8,5,0,Math.PI*2,0,Math.PI/2).translate(0,7.45,0),e),le(new me(4.2,.35,.35).translate(1.6,5.2,.9),"#2a2622"),le(new me(1.1,1.6,1.8).translate(-1.3,5.2,0),"#5d5340")];return ui(n).scale(1.75,1.75,1.75)}function _v(){return ui([le(new Oe(.75,1.05,11,8).rotateZ(Math.PI/2).translate(3.5,3.6,0),"#2e3230"),le(new me(7,1.6,3.2).translate(-1,2.6,0),"#4b4a3a"),le(new me(6,.8,.8).rotateZ(.25).translate(-5,1.2,1.1),"#4b4a3a"),le(new me(6,.8,.8).rotateZ(.25).translate(-5,1.2,-1.1),"#4b4a3a"),le(new Oe(2.6,2.6,.7,12).rotateX(Math.PI/2).translate(0,2.6,2.2),"#3a3328"),le(new Oe(2.6,2.6,.7,12).rotateX(Math.PI/2).translate(0,2.6,-2.2),"#3a3328"),le(new me(.6,4.2,5).translate(1.8,4.6,0),"#454536")]).scale(1.5,1.5,1.5)}function ep(r){let t=r===V?"#4c6a3c":"#6e4a36",e=[le(new me(11,3.4,6).translate(0,3.2,0),t),le(new me(5,2,5).translate(-1,5.8,0),t),le(new Oe(.4,.4,5,6).rotateZ(Math.PI/2).translate(3.6,6,0),"#222"),le(new me(3,1.8,5.4).translate(4.6,4.6,0),t)];for(let n of[-3.5,3.5])for(let i of[-3,3])e.push(le(new Oe(1.6,1.6,1.2,10).rotateX(Math.PI/2).translate(n,1.6,i),"#1f1f1f"));return ui(e).scale(1.45,1.45,1.45)}function Mv(){return ui([le(new Oe(5.5,5.5,13,3).rotateZ(Math.PI/2).rotateX(-Math.PI/2).translate(0,2.75,0),"#efeee6"),le(new me(5,.4,1.4).translate(0,8.4,0),"#d22a2a"),le(new me(1.4,.4,5).translate(0,8.4,0),"#d22a2a")]).scale(1.4,1.4,1.4)}var oc=r=>{let t=Math.sin(r*127.1+311.7)*43758.5453;return t-Math.floor(t)},lc=class{constructor(t,e){this.rig=t,this.map=e,this.scene=t.scene;let n=new qe({vertexColors:!0,roughness:.75,flatShading:!0}),i=(c,h)=>{let u=new fn(c,n,h);return u.castShadow=!0,u.receiveShadow=!1,u.frustumCulled=!1,u.count=0,this.scene.add(u),u};this.figs=[i(tp(V),ed),i(tp(ot),ed)],this.cannons=i(_v(),120),this.cars=[i(ep(V),60),i(ep(ot),60)],this.tents=i(Mv(),40),this.sandbags=i(le(new me(7,3,3.4),"#b9a578"),600);let s=le(new Oe(.4,.4,28,5).translate(0,14,0),"#3b2f22");this.poles=i(s,120);let a=new Un(12,7.5,8,2).translate(6,0,0);this.flagTime={value:0};let o=new qe({color:"#ffffff",side:Ye,roughness:.7});o.onBeforeCompile=c=>{c.uniforms.time=this.flagTime,c.vertexShader=c.vertexShader.replace("#include <common>",`#include <common>
uniform float time;`).replace("#include <begin_vertex>",`#include <begin_vertex>
          float ph = instanceMatrix[3].x * 0.09 + instanceMatrix[3].z * 0.05;
          transformed.z += sin(position.x * 0.6 - time * 6.0 + ph) * position.x * 0.13;`)},this.banners=new fn(a,o,120),this.banners.frustumCulled=!1,this.banners.castShadow=!0,this.banners.count=0,this.scene.add(this.banners),this.rings=[];let l=new ji(34,39,48).rotateX(-Math.PI/2);this.ringMat=new Sn({color:"#ffe066",transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1}),this.enemyRingMat=new Sn({color:"#ff5a4a",transparent:!0,opacity:.85,depthTest:!1,depthWrite:!1});for(let c=0;c<30;c++){let h=new oe(l,this.ringMat);h.renderOrder=20,h.visible=!1,this.scene.add(h),this.rings.push(h)}this.state=new Map,this.m=new re,this.q=new Xe,this.e=new an,this.s=new I,this.p=new I,this.c=new Rt}stateFor(t){let e=this.state.get(t.id);return e||(e={h:t.heading,front:[],center:[t.x,0,t.y],spread:1,fade:0},this.state.set(t.id,e)),e}put(t,e,n,i,s,a,o=1,l=1,c=1,h=0){this.e.set(0,a,h,"YXZ"),this.q.setFromEuler(this.e),this.p.set(n,i,s),this.s.set(o,l,c),this.m.compose(this.p,this.q,this.s),t.setMatrixAt(e,this.m)}update(t,e,n,i,s){let a=this.map,o={f0:0,f1:0,cannon:0,car0:0,car1:0,tent:0,bag:0,ban:0};this.flagTime.value=t;for(let u of n.units){if(!u.alive){this.state.delete(u.id);continue}if(!n.isVisible(u))continue;let d=this.stateFor(u),f=u.heading-d.h;for(;f>Math.PI;)f-=Math.PI*2;for(;f<-Math.PI;)f+=Math.PI*2;d.h+=f*Math.min(1,e*5);let p=d.h,y=Math.cos(p),g=Math.sin(p),m=-g,b=y,E=-p,_=u.routed?1.7:u.battle?1.1:1;d.spread+=(_-d.spread)*Math.min(1,e*2);let S=d.spread,v=!!u.battle,A=u.moving&&u.speedNow>0,x,T=0,R=0,P=0;u.type==="heavy"?(T=Math.max(1,Math.min(3,Math.round(u.soldiers/200))),x=Math.max(2,Math.min(8,Math.round(u.soldiers/90)))):u.type==="scout"?(R=Math.max(1,Math.min(3,Math.round(u.soldiers/140))),x=Math.max(1,Math.min(4,Math.round(u.soldiers/120)))):u.type==="medical"?(P=A?0:2,x=Math.max(2,Math.min(6,Math.round(u.soldiers/60)))):x=Math.max(2,Math.min(16,Math.round(u.soldiers/64)));let N=Math.max(1,Math.ceil(Math.sqrt(x*1.7))),B=Math.ceil(x/N);d.front.length=0;let L=this.figs[u.side],O=u.side===V?"f0":"f1",q=(B-1)/2*Qf;for(let z=0;z<x&&!(o[O]>=ed);z++){let j=Math.floor(z/N),H=j===B-1?x-j*N:N,Z=z%N,Y=u.id*31+z,Et=(oc(Y)-.5)*2.4,Mt=(oc(Y+7)-.5)*2.4,jt=((Z-(H-1)/2)*jf+Et)*S,Gt=(q-j*Qf+Mt)*S,Yt=0,J=1,et=0,pt=E;if(A&&(Yt=Math.abs(Math.sin(t*9+Y))*.9,et=-.08),v){let de=t*3+Y*1.3;Gt+=Math.sin(de)*1.2,jt+=Math.sin(de*.7)*.8,j===0&&oc(Y+Math.floor(t*.7))>.5&&(J=.72),pt+=Math.sin(de*.5)*.15}u.routed&&(pt+=Math.PI+(oc(Y+3)-.5)*1.2,Yt=Math.abs(Math.sin(t*12+Y))*1.2);let Bt=u.x+y*Gt+m*jt,St=u.y+g*Gt+b*jt,kt=a.heightAt(Bt,St)-.3+Yt;this.put(L,o[O]++,Bt,kt,St,pt,1,J,1,et),j===0&&d.front.push([Bt+y*6,kt+9*J,St+g*6])}for(let z=0;z<T;z++){let j=(z-(T-1)/2)*20,H=q+16,Z=u.x+y*H+m*j,Y=u.y+g*H+b*j,Et=v?Math.max(0,Math.sin(t*2.2+z*2.1+u.id))**8*-1.6:0;this.put(this.cannons,o.cannon++,Z+y*Et,a.heightAt(Z,Y)-.2,Y+g*Et,E),d.front.push([Z+y*16,a.heightAt(Z,Y)+6,Y+g*16])}for(let z=0;z<R;z++){let j=(z-(R-1)/2)*19,H=q+14,Z=u.x+y*H+m*j,Y=u.y+g*H+b*j,Et=this.cars[u.side],Mt=u.side===V?"car0":"car1";this.put(Et,o[Mt]++,Z,a.heightAt(Z,Y)+(A?Math.sin(t*14+z)*.3:0),Y,E),d.front.push([Z+y*8,a.heightAt(Z,Y)+6,Y+g*8])}for(let z=0;z<P;z++){let j=(z-.5)*24,H=-q-16,Z=u.x+y*H+m*j,Y=u.y+g*H+b*j;this.put(this.tents,o.tent++,Z,a.heightAt(Z,Y)-.3,Y,E+Math.PI/2)}if(u.entrench>.3&&!A&&!u.routed){let z=Math.min(7,3+Math.floor(u.entrench*5)),j=N*jf/2+6,H=q+11;for(let Z=0;Z<z;Z++){let Y=z===1?0:Z/(z-1)-.5,Et=Y*j*2,Mt=-Math.abs(Y)*7,jt=u.x+y*(H+Mt)+m*Et,Gt=u.y+g*(H+Mt)+b*Et;this.put(this.sandbags,o.bag++,jt,a.heightAt(jt,Gt)+.6,Gt,E+Math.PI/2+Y*.9)}}{let z=-q-6,j=u.x+y*z,H=u.y+g*z,Z=a.heightAt(j,H)+(A?Math.abs(Math.sin(t*9+u.id))*.8:0);this.put(this.poles,o.ban,j,Z,H,0),this.put(this.banners,o.ban,j,Z+24,H,E+Math.PI),this.c.set(Ce[u.side].color),this.banners.setColorAt(o.ban,this.c),o.ban++}d.center=[u.x,a.heightAt(u.x,u.y),u.y]}this.figs[0].count=o.f0,this.figs[1].count=o.f1,this.cannons.count=o.cannon,this.cars[0].count=o.car0,this.cars[1].count=o.car1,this.tents.count=o.tent,this.sandbags.count=o.bag,this.poles.count=o.ban,this.banners.count=o.ban;for(let u of[...this.figs,this.cannons,...this.cars,this.tents,this.sandbags,this.poles,this.banners])u.instanceMatrix.needsUpdate=!0;this.banners.instanceColor&&(this.banners.instanceColor.needsUpdate=!0);let l=0,c=1+Math.sin(t*5)*.06,h=(u,d)=>{if(l>=this.rings.length)return;let f=this.rings[l++];f.visible=!0,f.material=d,f.position.set(u.x,a.heightAt(u.x,u.y)+1.5,u.y),f.scale.setScalar(c)};for(let u of i)u.alive&&h(u,this.ringMat);for(s&&s.alive&&h(s,this.enemyRingMat);l<this.rings.length;l++)this.rings[l].visible=!1}};function bv(r=0){let e=document.createElement("canvas");e.width=64,e.height=64;let n=e.getContext("2d"),i=n.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.25+r*.3,"rgba(255,255,255,0.8)"),i.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=i,n.fillRect(0,0,64,64),new Kn(e)}function np(){let t=document.createElement("canvas");t.width=128,t.height=128;let e=t.getContext("2d");for(let n=0;n<14;n++){let i=64+(Math.random()-.5)*128*.4,s=128/2+(Math.random()-.5)*128*.4,a=128*(.18+Math.random()*.2),o=e.createRadialGradient(i,s,0,i,s,a);o.addColorStop(0,"rgba(255,255,255,0.5)"),o.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=o,e.fillRect(0,0,128,128)}return new Kn(t)}var cc=class{constructor(t,e,n,i){this.max=e,this.list=[];let s=new ce;this.pos=new Float32Array(e*3),this.col=new Float32Array(e*3),this.size=new Float32Array(e),this.alpha=new Float32Array(e),s.setAttribute("position",new ve(this.pos,3).setUsage(di)),s.setAttribute("color",new ve(this.col,3).setUsage(di)),s.setAttribute("size",new ve(this.size,1).setUsage(di)),s.setAttribute("alpha",new ve(this.alpha,1).setUsage(di)),this.geo=s,this.uniforms={tex:{value:n},scale:{value:500}};let a=new fe({uniforms:this.uniforms,transparent:!0,depthWrite:!1,blending:i?on:Pi,vertexShader:`
        attribute float size; attribute float alpha; attribute vec3 color;
        uniform float scale;
        varying float vA; varying vec3 vC;
        void main() {
          vA = alpha; vC = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * scale / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        uniform sampler2D tex;
        varying float vA; varying vec3 vC;
        void main() {
          vec4 t = texture2D(tex, gl_PointCoord);
          gl_FragColor = vec4(vC * t.rgb, t.a * vA);
          #include <colorspace_fragment>
        }`});this.points=new kr(s,a),this.points.frustumCulled=!1,this.points.renderOrder=i?12:11,t.add(this.points)}add(t){this.list.length>=this.max&&this.list.shift(),t.age=0,this.list.push(t)}update(t){let e=0,n=[];for(let i of this.list){if(i.age+=t,i.age>=i.life)continue;n.push(i);let s=i.age/i.life;i.vy+=(i.g||0)*t;let a=i.drag?Math.exp(-i.drag*t):1;i.vx*=a,i.vy*=a,i.vz*=a,i.x+=i.vx*t,i.y+=i.vy*t,i.z+=i.vz*t,i.floor!==void 0&&i.y<i.floor&&(i.y=i.floor,i.vy=0,i.vx*=.5,i.vz*=.5),this.pos[e*3]=i.x,this.pos[e*3+1]=i.y,this.pos[e*3+2]=i.z;let o=i.c0,l=i.c1||o;this.col[e*3]=o[0]+(l[0]-o[0])*s,this.col[e*3+1]=o[1]+(l[1]-o[1])*s,this.col[e*3+2]=o[2]+(l[2]-o[2])*s,this.size[e]=i.s0+(i.s1-i.s0)*s;let c=i.fadeIn?Math.min(1,i.age/i.fadeIn):1;this.alpha[e]=i.a0*(1-s)**(i.fadePow||1)*c,e++}this.list=n,this.geo.setDrawRange(0,e);for(let i of["position","color","size","alpha"])this.geo.attributes[i].needsUpdate=!0}},hc=class{constructor(t,e){this.rig=t,this.map=e;let n=t.scene;this.glow=new cc(n,2600,bv(0),!0),this.smoke=new cc(n,1600,np(),!1),this.buildTracers(n),this.buildRings(n),this.buildRain(n),this.buildClouds(n),this.pending=[]}buildTracers(t){this.tracerMax=500,this.tracers=[],this.tPos=new Float32Array(500*6),this.tCol=new Float32Array(500*6);let n=new ce;n.setAttribute("position",new ve(this.tPos,3).setUsage(di)),n.setAttribute("color",new ve(this.tCol,3).setUsage(di)),this.tGeo=n;let i=new Zi({vertexColors:!0,transparent:!0,blending:on,depthWrite:!1}),s=new zs(n,i);s.frustumCulled=!1,s.renderOrder=13,t.add(s)}buildRings(t){this.rings=[];let e=new ji(.85,1,64).rotateX(-Math.PI/2);for(let n=0;n<24;n++){let i=new Sn({color:"#ffffff",transparent:!0,opacity:0,depthWrite:!1,blending:on}),s=new oe(e,i);s.visible=!1,s.renderOrder=9,t.add(s),this.rings.push({mesh:s,age:0,life:0})}}buildRain(t){this.rainN=2200,this.rainPos=new Float32Array(2200*6),this.rainDrops=[];for(let s=0;s<2200;s++)this.rainDrops.push({x:Math.random(),y:Math.random(),z:Math.random()});let n=new ce;n.setAttribute("position",new ve(this.rainPos,3).setUsage(di));let i=new Zi({color:"#c7d3e0",transparent:!0,opacity:.38,depthWrite:!1});this.rain=new zs(n,i),this.rain.frustumCulled=!1,this.rain.visible=!1,this.rainGeo=n,t.add(this.rain)}buildClouds(t){let e=np();this.clouds=[];for(let n=0;n<16;n++){let i=new Bs({map:e,color:"#ffffff",transparent:!0,opacity:0,depthWrite:!1,fog:!1}),s=new Or(i),a=380+Math.random()*420;s.scale.set(a,a*.55,1),s.position.set(Math.random()*(Jt.W+1200)-600,380+Math.random()*160,Math.random()*(Jt.H+800)-400),s.renderOrder=30,t.add(s),this.clouds.push({sprite:s,speed:6+Math.random()*6,base:.5+Math.random()*.35})}}ground(t,e){return Math.max(Jt.WATER,this.map.heightAt(t,e))}muzzle(t,e,n){this.glow.add({x:t,y:e,z:n,vx:0,vy:4,vz:0,life:.07+Math.random()*.06,s0:5+Math.random()*3,s1:3,a0:1,c0:[1,.88,.5]}),Math.random()<.25&&this.smoke.add({x:t,y:e,z:n,vx:(Math.random()-.5)*4,vy:3+Math.random()*3,vz:(Math.random()-.5)*4,life:1.2+Math.random(),s0:3,s1:12,a0:.25,c0:[.85,.85,.82],fadeIn:.1})}tracer(t,e,n=[1,.85,.45],i=.16,s=null){this.tracers.length>=this.tracerMax&&this.tracers.shift(),this.tracers.push({a:t,b:e,age:0,dur:i,color:n,onDone:s})}explosion(t,e,n=!1,i=null){let s=i??this.ground(t,e)+1,a=n?1.6:1;this.glow.add({x:t,y:s+4*a,z:e,vx:0,vy:0,vz:0,life:.3,s0:20*a,s1:58*a,a0:.8,c0:[1,.62,.22],c1:[.9,.25,.05],fadePow:1.6});for(let l=0;l<8*a;l++){let c=Math.random()*Math.PI*2,h=10+Math.random()*25;this.glow.add({x:t,y:s+2,z:e,vx:Math.cos(c)*h,vy:18+Math.random()*30,vz:Math.sin(c)*h,g:-30,drag:1.5,life:.4+Math.random()*.4,s0:10*a,s1:3,a0:.9,c0:[1,.6,.2],c1:[.8,.15,.05]})}for(let l=0;l<7*a;l++){let c=Math.random()*Math.PI*2,h=4+Math.random()*10,u=.22+Math.random()*.2;this.smoke.add({x:t+Math.cos(c)*4,y:s+3,z:e+Math.sin(c)*4,vx:Math.cos(c)*h+4,vy:8+Math.random()*10,vz:Math.sin(c)*h,drag:.6,life:2.6+Math.random()*2.2,s0:14*a,s1:56*a,a0:.85,c0:[u,u*.95,u*.9],c1:[.5,.5,.5],fadeIn:.15})}for(let l=0;l<10*a;l++){let c=Math.random()*Math.PI*2,h=15+Math.random()*30;this.smoke.add({x:t,y:s+2,z:e,vx:Math.cos(c)*h,vy:30+Math.random()*40,vz:Math.sin(c)*h,g:-110,life:.9+Math.random()*.4,s0:2.6,s1:2.2,a0:.9,c0:[.22,.18,.12],floor:s})}this.onBoom?.(t,e,n);let o=Math.hypot(this.rig.camera.position.x-t,this.rig.camera.position.z-e);o<700&&(this.rig.shake=Math.max(this.rig.shake,(n?5:2.5)*(1-o/700)))}shell(t,e){let n=this.ground(t,e),i=[t-120+Math.random()*60,n+380,e-60+Math.random()*40];this.tracer(i,[t,n+2,e],[1,.7,.35],.5,()=>this.explosion(t,e,Math.random()<.4))}dust(t,e){let n=this.ground(t,e)+1;this.smoke.add({x:t+(Math.random()-.5)*20,y:n,z:e+(Math.random()-.5)*20,vx:(Math.random()-.5)*4,vy:3,vz:(Math.random()-.5)*4,life:1.8,s0:9,s1:30,a0:.35,c0:[.62,.55,.42],fadeIn:.2})}ring(t,e,n,i=80){let s=this.rings.find(a=>!a.mesh.visible)||this.rings[0];s.mesh.visible=!0,s.mesh.material.color.set(Ce[n].color),s.mesh.position.set(t,this.ground(t,e)+3,e),s.age=0,s.life=1.3,s.size=i}update(t,e,n){this.glow.uniforms.scale.value=this.rig.height/(2*Math.tan(this.rig.camera.fov*Math.PI/360)),this.smoke.uniforms.scale.value=this.glow.uniforms.scale.value,this.glow.update(t),this.smoke.update(t);let i=0,s=[];for(let h of this.tracers){h.age+=t;let u=h.age/h.dur;if(u>=1){h.onDone&&h.onDone();continue}s.push(h);let d=u,f=Math.max(0,u-.3);for(let p=0;p<3;p++)this.tPos[i*6+p]=h.a[p]+(h.b[p]-h.a[p])*f,this.tPos[i*6+3+p]=h.a[p]+(h.b[p]-h.a[p])*d,this.tCol[i*6+p]=h.color[p]*.15,this.tCol[i*6+3+p]=h.color[p];i++}this.tracers=s,this.tGeo.setDrawRange(0,i*2),this.tGeo.attributes.position.needsUpdate=!0,this.tGeo.attributes.color.needsUpdate=!0;for(let h of this.rings){if(!h.mesh.visible)continue;h.age+=t;let u=h.age/h.life;if(u>=1){h.mesh.visible=!1;continue}let d=h.size*(.2+u*.9);h.mesh.scale.set(d,1,d),h.mesh.material.opacity=(1-u)*.8}let a=n==="rain";if(this.rain.visible=a,a){let h=this.rig.cam.x,u=this.rig.cam.z,d=Math.min(2400,this.rig.cam.dist*1.6),f=this.rig.targetH,p=this.rig.cam.dist*.9;for(let y=0;y<this.rainN;y++){let g=this.rainDrops[y];g.y-=t*1.1,g.y<0&&(g.y+=1,g.x=Math.random(),g.z=Math.random());let m=h+(g.x-.5)*d,b=u+(g.z-.5)*d,E=f+g.y*p;this.rainPos[y*6]=m,this.rainPos[y*6+1]=E,this.rainPos[y*6+2]=b,this.rainPos[y*6+3]=m+2,this.rainPos[y*6+4]=E+16,this.rainPos[y*6+5]=b+1}this.rainGeo.attributes.position.needsUpdate=!0}let o=this.rig.cam.dist,l=Math.min(1,Math.max(0,(o-1500)/1200)),c=n==="rain"?1.3:n==="fog"?1.1:1;for(let h of this.clouds)h.sprite.position.x+=h.speed*t,h.sprite.position.x>Jt.W+700&&(h.sprite.position.x=-700),h.sprite.material.opacity=Math.min(.4,l*h.base*c*.32),h.sprite.material.color.set(n==="rain"?"#9aa3ab":"#ffffff")}};var nd=`
  attribute vec2 rib; // x: distance along, y: across (-1..1)
  varying vec2 vRib;
  #include <fog_pars_vertex>
  void main() {
    vRib = rib;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }`,Sv=`
  uniform float time;
  varying vec2 vRib;
  #include <fog_pars_fragment>
  void main() {
    float a = abs(vRib.y);
    float edge = smoothstep(0.5, 0.7, a);
    float flow = 0.5 + 0.5 * sin(vRib.x * 0.09 - time * 4.0);
    vec3 core = mix(vec3(1.0, 0.42, 0.08), vec3(1.0, 0.86, 0.45), flow * flow);
    vec3 col = mix(core * 1.6, vec3(0.12, 0.05, 0.02), edge);
    float alpha = 1.0 - smoothstep(0.92, 1.0, a);
    gl_FragColor = vec4(col, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
  }`,wv=`
  uniform float time; uniform float strength;
  varying vec2 vRib;
  void main() {
    float a = 1.0 - abs(vRib.y);
    float pulse = 0.75 + 0.25 * sin(vRib.x * 0.035 - time * 2.2);
    float g = a * a * pulse * strength;
    gl_FragColor = vec4(vec3(1.0, 0.45, 0.12) * g, 1.0);
  }`,Ev=`
  uniform float time; uniform float strength;
  varying vec2 vRib;
  void main() {
    float h = vRib.y; // 0 bottom .. 1 top
    float bands = 0.6 + 0.4 * sin(vRib.x * 0.06 - time * 3.0 + h * 4.0);
    float a = (1.0 - h) * (1.0 - h) * bands * strength;
    gl_FragColor = vec4(vec3(1.0, 0.5, 0.18) * a, 1.0);
  }`,dc=class{constructor(t,e){this.rig=t,this.map=e,this.time={value:0},this.glowStrength={value:.5},this.curtainStrength={value:.35};let n=gn.clone(ft.fog);this.coreMat=new fe({uniforms:{...n,time:this.time},vertexShader:nd,fragmentShader:Sv,transparent:!0,fog:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}),this.glowMat=new fe({uniforms:{time:this.time,strength:this.glowStrength},vertexShader:nd.replace("#include <fog_pars_vertex>","").replace("#include <fog_vertex>",""),fragmentShader:wv,transparent:!0,blending:on,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),this.curtainMat=new fe({uniforms:{time:this.time,strength:this.curtainStrength},vertexShader:nd.replace("#include <fog_pars_vertex>","").replace("#include <fog_vertex>",""),fragmentShader:Ev,transparent:!0,blending:on,depthWrite:!1,side:Ye}),this.core=new oe(new ce,this.coreMat),this.glow=new oe(new ce,this.glowMat),this.curtain=new oe(new ce,this.curtainMat);for(let i of[this.core,this.glow,this.curtain])i.frustumCulled=!1,t.scene.add(i);this.core.renderOrder=8,this.glow.renderOrder=7,this.curtain.renderOrder=14,this.version=-1}h(t,e){return Math.max(Jt.WATER+.5,this.map.heightAt(t,e))}ribbon(t,e,n){let i=[],s=[],a=[];for(let l of t){let c=cr(l.pts,6);if(c.length<2)continue;let h=i.length/3,u=0;for(let d=0;d<c.length;d++){let f=c[d],p=c[Math.max(0,d-1)],y=c[Math.min(c.length-1,d+1)],g=y[0]-p[0],m=y[1]-p[1],b=Math.hypot(g,m)||1;g/=b,m/=b;let E=-m,_=g;d>0&&(u+=Math.hypot(f[0]-c[d-1][0],f[1]-c[d-1][1]));for(let S of[-1,1]){let v=f[0]+E*S*e*.5,A=f[1]+_*S*e*.5;i.push(v,this.h(v,A)+n,A),s.push(u,S)}if(d>0){let S=h+d*2;a.push(S-2,S-1,S,S-1,S+1,S)}}}let o=new ce;return o.setAttribute("position",new ae(i,3)),o.setAttribute("rib",new ae(s,2)),o.setIndex(a),o}wall(t,e){let n=[],i=[],s=[];for(let o of t){let l=cr(o.pts,10);if(l.length<2)continue;let c=n.length/3,h=0;for(let u=0;u<l.length;u++){let d=l[u];u>0&&(h+=Math.hypot(d[0]-l[u-1][0],d[1]-l[u-1][1]));let f=this.h(d[0],d[1]);if(n.push(d[0],f+1,d[1],d[0],f+e,d[1]),i.push(h,0,h,1),u>0){let p=c+u*2;s.push(p-2,p-1,p,p-1,p+1,p)}}}let a=new ce;return a.setAttribute("position",new ae(n,3)),a.setAttribute("rib",new ae(i,2)),a.setIndex(s),a}rebuild(t,e){for(let n of[this.core,this.glow,this.curtain])n.geometry.dispose();this.core.geometry=this.ribbon(t,6*e,1.6),this.glow.geometry=this.ribbon(t,46*e,1.2),this.curtain.geometry=this.wall(t,30*Math.sqrt(e))}update(t,e,n){let i=Math.round(Math.min(3.2,Math.max(1,n/750))*4)/4;(e.version!==this.version||i!==this.ws)&&(this.version=e.version,this.ws=i,this.rebuild(e.frontLines(),i)),this.time.value=t;let s=Math.min(1,Math.max(0,(n-300)/1800));this.glowStrength.value=.55+s*.35,this.curtainStrength.value=.4+s*.3}};var Tv={move:"#ffffff",attack:"#ff6a48",reinforce:"#5cd4ff",retreat:"#ffd34d",defend:"#9fe08a"},uc=class{constructor(t,e,n){this.canvas=t,this.ctx=t.getContext("2d"),this.rig=e,this.map=n,this.floats=[],this.tmp={x:0,y:0,behind:!1},this.objectiveKeys=new Set([...sn[V],...sn[ot]]),this.counterRects=[],this.battleRects=[],this.resize()}resize(){let t=Math.min(window.devicePixelRatio||1,2);this.dpr=t,this.canvas.width=Math.round(window.innerWidth*t),this.canvas.height=Math.round(window.innerHeight*t),this.canvas.style.width=window.innerWidth+"px",this.canvas.style.height=window.innerHeight+"px"}proj(t,e,n){return this.rig.project(t,e,n,{x:0,y:0,behind:!1})}float(t,e,n,i){let s=performance.now()/1e3;this.floats.some(a=>a.text===n&&Math.hypot(a.x-t,a.y-e)<60&&s-a.t<1)||(this.floats.push({x:t,y:e,text:n,side:i,t:s}),this.floats.length>14&&this.floats.shift())}draw(t,e,n){let i=this.ctx,s=window.innerWidth,a=window.innerHeight;i.setTransform(this.dpr,0,0,this.dpr,0,0),i.clearRect(0,0,s,a);let o=this.rig.cam.dist,l=$t(1100/o,.72,1.25);this.k=l,this.drawLocations(i,e,o,l),this.drawPaths(i,t,e,n),this.drawUnits(i,t,e,n,o,l),this.drawBattles(i,t,e,n,o,l),this.drawSieges(i,e,l),this.drawFloats(i,t),this.drawSelectBox(i,n),this.drawCursor(i,t,n,e)}drawLocations(t,e,n,i){let s=this.map;for(let a of s.locations){let o=this.objectiveKeys.has(a.key);if(a.type==="village"&&n>1250||a.type==="bridge"&&!o&&n>900)continue;let l=a.type==="capital"?70:a.type==="city"?48:a.type==="fort"?50:22,c=this.proj(a.x,s.heightAt(a.x,a.y)+l,a.y);if(c.behind||c.x<-100||c.y<-50||c.x>window.innerWidth+100||c.y>window.innerHeight+50)continue;let h=a.owner,u=h===V?"#bff5c9":h===ot?"#ffc9bd":"#eeeeee",d=(a.type==="capital"?17:a.type==="village"?11:14)*i;t.font=`${a.type==="village"?500:700} ${d}px Rajdhani, "Segoe UI", sans-serif`,t.textAlign="center",t.textBaseline="middle";let f=a.name;a.type==="capital"?f="\u2605 "+f.toUpperCase()+" \u2605":a.type!=="village"&&(f=f.toUpperCase());let p=t.measureText(f).width;if(o){let y=sn[V].includes(a.key),g=h===V;t.fillStyle=g?"rgba(30,110,60,0.85)":"rgba(120,30,24,0.85)";let m=y?g?"\u2713 OBJECTIVE TAKEN":"\u25CE OBJECTIVE":g?"\u2691 DEFEND":"\u26A0 LOST \u2014 RETAKE";t.font=`700 ${9.5*i}px Rajdhani, "Segoe UI", sans-serif`;let b=t.measureText(m).width+10;t.beginPath(),t.roundRect(c.x-b/2,c.y-d-12*i,b,13*i,3),t.fill(),t.fillStyle="#fff",t.fillText(m,c.x,c.y-d-5.5*i),t.font=`700 ${d}px Rajdhani, "Segoe UI", sans-serif`}t.font=`${a.type==="village"?500:700} ${d}px Rajdhani, "Segoe UI", sans-serif`,t.textAlign="center",t.textBaseline="middle",t.lineWidth=3.5,t.strokeStyle="rgba(10,12,10,0.85)",t.lineJoin="round",t.strokeText(f,c.x,c.y),t.fillStyle=u,t.fillText(f,c.x,c.y),(a.type==="fort"||a.type==="city"||a.type==="capital")&&(t.fillStyle=h===V?Ce[V].color:Ce[ot].color,t.fillRect(c.x-p/2,c.y+d*.55,p,2))}}drawSieges(t,e,n){for(let i of e.sieges.values()){let s=i.loc,a=s.type==="capital"?70:s.type==="city"?48:s.type==="fort"?50:22,o=this.proj(s.x,this.map.heightAt(s.x,s.y)+a,s.y);if(o.behind)continue;t.font=`700 ${14*n}px Rajdhani, "Segoe UI", sans-serif`;let l=t.measureText(s.name.toUpperCase()).width;this.siegeRing(t,o.x+l/2+24*n,o.y,i,n)}}siegeRing(t,e,n,i,s){let a=$t(i.progress/i.need,0,1),o=i.side===V,l=13*s,c=performance.now()/1e3;t.save(),t.beginPath(),t.arc(e,n,l+4,0,Math.PI*2),t.fillStyle="rgba(10,10,8,0.85)",t.fill(),t.beginPath(),t.arc(e,n,l,-Math.PI/2,-Math.PI/2+a*Math.PI*2),t.strokeStyle=o?"#6ee07a":"#ff5a4a",t.lineWidth=4*s,t.stroke(),t.fillStyle="#fff",t.font=`700 ${Math.round(10*s)}px Rajdhani, "Segoe UI", sans-serif`,t.textAlign="center",t.textBaseline="middle",t.fillText(Math.round(a*100)+"%",e,n+.5);let h=o?"CAPTURING":"UNDER SIEGE";t.font=`700 ${Math.round(11*s)}px Rajdhani, "Segoe UI", sans-serif`,t.globalAlpha=o?1:.65+.35*Math.sin(c*6),t.lineWidth=3,t.strokeStyle="rgba(0,0,0,0.9)",t.strokeText(h,e,n+l+11*s),t.fillStyle=o?"#9dffb2":"#ff8a7a",t.fillText(h,e,n+l+11*s),t.restore()}pathPoints(t){let e=this.map,n=[[t.x,t.y]],i=t.cell;for(let s of t.path){let a=e.edge(i,s);a&&n.push([a.mx,a.my]);let o=e.cells[s];n.push([o.x,o.y]),i=s}return n}strokePath(t,e,n,i,s,a,o,l){let c=[];for(let[h,u]of e){let d=this.proj(h,Math.max(-2,this.map.heightAt(h,u))+4,u);if(d.behind)return;c.push(d)}if(!(c.length<2)){if(t.save(),t.globalAlpha=s,t.lineCap="round",t.lineJoin="round",t.beginPath(),c.forEach((h,u)=>u?t.lineTo(h.x,h.y):t.moveTo(h.x,h.y)),t.strokeStyle="rgba(0,0,0,0.55)",t.lineWidth=i+3,t.stroke(),a&&(t.setLineDash([10,8]),t.lineDashOffset=-o*40),t.strokeStyle=n,t.lineWidth=i,t.stroke(),t.setLineDash([]),l){let h=c[c.length-2],u=c[c.length-1],d=Math.atan2(u.y-h.y,u.x-h.x),f=7+i*2;t.beginPath(),t.moveTo(u.x+Math.cos(d)*f*.6,u.y+Math.sin(d)*f*.6),t.lineTo(u.x+Math.cos(d+2.5)*f,u.y+Math.sin(d+2.5)*f),t.lineTo(u.x+Math.cos(d-2.5)*f,u.y+Math.sin(d-2.5)*f),t.closePath(),t.fillStyle=n,t.strokeStyle="rgba(0,0,0,0.6)",t.lineWidth=2,t.stroke(),t.fill()}t.restore()}}drawPaths(t,e,n,i){for(let s of n.units){if(!s.alive||!s.path.length)continue;let a=i.selected.includes(s);if(s.side===V){let o=Tv[s.order.type]||"#ffffff";this.strokePath(t,this.pathPoints(s),o,a?3.2:2,a?.95:.4,!0,e,!0)}else if(n.isVisible(s)&&(s.order.type==="attack"||s.task?.kind==="offensive")){let o=this.pathPoints(s).slice(0,7);this.strokePath(t,o,"#ff4a3a",2.4,.75,!1,e,!0)}}i.preview&&i.preview.pts&&this.strokePath(t,i.preview.pts,i.preview.color,2.5,.6,!0,e,!0)}symbol(t,e,n,i,s,a){t.strokeStyle="#fff",t.fillStyle="#fff",t.lineWidth=1.6;let o=n-s/2+3,l=n+s/2-3,c=i-a/2+3,h=i+a/2-3;t.beginPath(),e==="infantry"||e==="assault"?(t.moveTo(o,c),t.lineTo(l,h),t.moveTo(l,c),t.lineTo(o,h),t.stroke(),e==="assault"&&(t.beginPath(),t.moveTo(n-4,c-1),t.lineTo(n,c+3),t.lineTo(n+4,c-1),t.lineWidth=2,t.stroke())):e==="scout"?(t.moveTo(o,h),t.lineTo(l,c),t.stroke()):e==="medical"?(t.fillRect(n-1.8,c+1,3.6,h-c-2),t.fillRect(n-(h-c)/2+1,i-1.8,h-c-2,3.6)):e==="heavy"&&(t.arc(n,i,Math.min(s,a)*.2,0,Math.PI*2),t.fill(),t.beginPath(),t.moveTo(o,h),t.lineTo(l,h),t.stroke())}drawUnits(t,e,n,i,s,a){this.counterRects=[];let o=this.map,l=n.units.filter(h=>h.alive&&n.isVisible(h)),c=this.rig.camera.position;l.sort((h,u)=>Math.hypot(u.x-c.x,u.y-c.z)-Math.hypot(h.x-c.x,h.y-c.z));for(let h of l){let u=o.heightAt(h.x,h.y),d=this.proj(h.x,u+2,h.y);if(d.behind)continue;let f=window.innerWidth,p=window.innerHeight;if(d.x<-60||d.y<-60||d.x>f+60||d.y>p+90)continue;let y=this.proj(h.x,u+30,h.y),g={x:d.x,y:Math.min(y.y,d.y-30*a)-16*a},m=i.selected.includes(h),b=i.hover===h,E=34*a,_=22*a,S=g.x,v=g.y-_/2;t.strokeStyle="rgba(0,0,0,0.45)",t.lineWidth=1.2,t.beginPath(),t.moveTo(S,v+_/2),t.lineTo(d.x,d.y),t.stroke();let A=Ce[h.side],x=h.routed?.75:1;t.globalAlpha=x;let T=t.createLinearGradient(0,v-_/2,0,v+_/2);T.addColorStop(0,h.side===V?"#3fa660":"#cc4434"),T.addColorStop(1,h.side===V?"#24703c":"#8e2a20"),t.fillStyle=T,t.beginPath(),t.roundRect(S-E/2,v-_/2,E,_,3),t.fill(),t.lineWidth=m?2.6:1.4,t.strokeStyle=m?`rgba(255,224,102,${.75+Math.sin(e*6)*.25})`:b?"#ffffff":"rgba(255,255,255,0.75)",t.stroke(),this.symbol(t,h.type,S,v,E,_),t.fillStyle="#fff",t.font=`700 ${8*a}px sans-serif`,t.textAlign="center",t.textBaseline="bottom",t.fillText("I I",S,v-_/2-1);let R=E,P=v+_/2+3,N=h.soldiers/h.max;t.fillStyle="rgba(0,0,0,0.65)",t.fillRect(S-R/2-1,P-1,R+2,9*a),t.fillStyle=N>.6?"#6ee07a":N>.33?"#ffd24a":"#ff5a4a",t.fillRect(S-R/2,P,R*N,3.6*a),t.fillStyle="#7ec8ff",t.fillRect(S-R/2,P+4.4*a,R*h.morale,2.6*a),t.globalAlpha=1;let B=S+E/2,L=v-_/2;if(h.battle?this.badgeSwords(t,B,L,7.5*a,e):h.routed?this.badge(t,B,L,7*a,"#eeeeee","\u2690","#333"):h.surrounded&&this.badge(t,B,L,7*a,"#ff4040","!","#fff"),!h.battle&&h.entrench>.3&&!h.moving&&this.shield(t,S-E/2,L,7*a,h.entrench),s<1150||m||b){t.font=`700 ${11*a}px Rajdhani, "Segoe UI", sans-serif`,t.textBaseline="top",t.lineWidth=3,t.strokeStyle="rgba(0,0,0,0.85)";let O=P+9*a;t.strokeText(h.short,S,O),t.fillStyle=h.side===V?"#d9ffe1":"#ffd9d2",t.fillText(h.short,S,O)}this.counterRects.push({u:h,x:S-E/2-4,y:v-_/2-8,w:E+8,h:_+22,fx:d.x,fy:d.y})}}badge(t,e,n,i,s,a,o){t.beginPath(),t.arc(e,n,i,0,Math.PI*2),t.fillStyle=s,t.fill(),t.strokeStyle="rgba(0,0,0,0.6)",t.lineWidth=1,t.stroke(),t.fillStyle=o,t.font=`700 ${i*1.5}px sans-serif`,t.textAlign="center",t.textBaseline="middle",t.fillText(a,e,n+.5)}badgeSwords(t,e,n,i,s){t.beginPath(),t.arc(e,n,i*(1+Math.sin(s*8)*.08),0,Math.PI*2),t.fillStyle="#ff8a2a",t.fill(),t.strokeStyle="rgba(0,0,0,0.6)",t.lineWidth=1,t.stroke(),this.swords(t,e,n,i*.8,"#fff",1.4)}swords(t,e,n,i,s,a){t.save(),t.strokeStyle=s,t.lineWidth=a,t.lineCap="round";for(let o of[-1,1])t.beginPath(),t.moveTo(e-i*o,n+i),t.lineTo(e+i*o,n-i),t.stroke(),t.beginPath(),t.moveTo(e-i*o*.95+i*.35,n+i*.6+i*.35*o*o),t.lineTo(e-i*o*.95-i*.35*.2,n+i*.35),t.stroke();t.restore()}shield(t,e,n,i,s){t.save(),t.beginPath(),t.moveTo(e,n-i),t.lineTo(e+i*.85,n-i*.6),t.lineTo(e+i*.7,n+i*.4),t.lineTo(e,n+i),t.lineTo(e-i*.7,n+i*.4),t.lineTo(e-i*.85,n-i*.6),t.closePath(),t.fillStyle=s>.6?"#9fe08a":"#d8e8b0",t.fill(),t.strokeStyle="rgba(0,0,0,0.65)",t.lineWidth=1,t.stroke(),t.restore()}battleAnchor(t){let e=this.map,n=t.attackers[0],i=e.cells[t.cell],s=n?(n.x+i.x)/2:i.x,a=n?(n.y+i.y)/2:i.y;return[s,a]}drawBattles(t,e,n,i,s,a){this.battleRects=[];for(let o of n.combat.battles){let[l,c]=this.battleAnchor(o),h=this.map.heightAt(l,c),u=this.proj(l,h+58,c);if(u.behind)continue;if(o.over){let E=n.time-o.endTime,_=$t(1-E/4,0,1);t.globalAlpha=_,this.badge(t,u.x,u.y,12*a,Ce[o.winner].color,o.winner===V?"\u2713":"\u2717","#fff"),t.globalAlpha=1;continue}let d=i.focusBattle===o,f=(d?17:14)*a,p=1+Math.sin(e*6+o.id)*.1;t.beginPath(),t.arc(u.x,u.y,f*1.55*p,0,Math.PI*2),t.fillStyle="rgba(255,120,40,0.18)",t.fill(),t.beginPath(),t.arc(u.x,u.y,f,0,Math.PI*2),t.fillStyle="rgba(28,20,14,0.92)",t.fill(),t.lineWidth=2.2,t.strokeStyle=d?"#ffe066":"#ff9a3c",t.stroke(),this.swords(t,u.x,u.y,f*.52,"#ffd9a0",2.2);let y=o.attSide===V?o.adv:1-o.adv,g=64*a,m=6*a,b=u.y+f+5;if(t.fillStyle="rgba(0,0,0,0.7)",t.fillRect(u.x-g/2-1.5,b-1.5,g+3,m+3),t.fillStyle=Ce[V].color,t.fillRect(u.x-g/2,b,g*y,m),t.fillStyle=Ce[ot].color,t.fillRect(u.x-g/2+g*y,b,g*(1-y),m),t.fillStyle="#fff",t.fillRect(u.x-g/2+g*y-1,b-2,2,m+4),s<1500||d){let E=n.combat.summary(o),_=o.attSide===V?E.attSoldiers:E.defSoldiers,S=o.attSide===V?E.defSoldiers:E.attSoldiers;t.font=`700 ${11*a}px Rajdhani, "Segoe UI", sans-serif`,t.textAlign="center",t.textBaseline="top";let v=`${Math.round(_).toLocaleString()}  vs  ${Math.round(S).toLocaleString()}`;t.lineWidth=3,t.strokeStyle="rgba(0,0,0,0.85)",t.strokeText(v,u.x,b+m+3),t.fillStyle="#ffe9c8",t.fillText(v,u.x,b+m+3)}this.battleRects.push({b:o,x:u.x-f,y:u.y-f,w:f*2,h:f*2+30})}}drawFloats(t,e){let n=performance.now()/1e3;if(this.floats=this.floats.filter(o=>n-o.t<2.6),!this.floats.length)return;let i=Math.round(15*this.k);t.font=`700 ${i}px Rajdhani, "Segoe UI", sans-serif`,t.textAlign="center",t.textBaseline="middle",t.lineWidth=4,t.strokeStyle="rgba(0,0,0,0.9)";let s=window.innerWidth,a=window.innerHeight;for(let o of this.floats){let l=n-o.t,c=this.map.heightAt(o.x,o.y),h=this.proj(o.x,c+80,o.y);if(h.behind||h.x<-80||h.x>s+80||h.y<-40||h.y>a+40)continue;t.globalAlpha=l<.2?l/.2:$t(1-(l-1.6)/1,0,1);let u=h.y-l*22-(l<.2?(.2-l)*30:0);t.strokeText(o.text,h.x,u),t.fillStyle=o.side===V?"#9dffb2":o.side===ot?"#ffab9a":"#fff",t.fillText(o.text,h.x,u)}t.globalAlpha=1}drawSelectBox(t,e){let n=e.dragBox;if(!n)return;t.fillStyle="rgba(255,224,102,0.12)",t.strokeStyle="rgba(255,224,102,0.9)",t.lineWidth=1.5;let i=Math.min(n.x0,n.x1),s=Math.min(n.y0,n.y1);t.fillRect(i,s,Math.abs(n.x1-n.x0),Math.abs(n.y1-n.y0)),t.strokeRect(i,s,Math.abs(n.x1-n.x0),Math.abs(n.y1-n.y0))}drawCursor(t,e,n){if(!n.mouse||!n.selected.length)return;let i=n.mode;if(i==="move"&&!n.hover)return;let{x:s,y:a}=n.mouse,o="",l="#fff";if(n.hover&&n.hover.side===ot)o="ATTACK",l="#ff6a48";else if(i==="attack")o="ATTACK",l="#ff6a48";else if(i==="reinforce")o=n.hover&&n.hover.side===V?"REINFORCE":"PICK A BATTALION",l="#5cd4ff";else return;t.save(),t.strokeStyle=l,t.lineWidth=2;let c=12+Math.sin(e*8)*1.5;t.beginPath(),t.arc(s,a,c,0,Math.PI*2),t.moveTo(s-c-5,a),t.lineTo(s-c+4,a),t.moveTo(s+c-4,a),t.lineTo(s+c+5,a),t.moveTo(s,a-c-5),t.lineTo(s,a-c+4),t.moveTo(s,a+c-4),t.lineTo(s,a+c+5),t.stroke(),t.font='700 12px Rajdhani, "Segoe UI", sans-serif',t.textAlign="left",t.textBaseline="middle",t.lineWidth=3,t.strokeStyle="rgba(0,0,0,0.85)",t.strokeText(o,s+c+8,a),t.fillStyle=l,t.fillText(o,s+c+8,a),t.restore()}unitAt(t,e,n){let i=null,s=1/0;for(let a of this.counterRects){if(n&&!n(a.u))continue;let o=t>=a.x&&t<=a.x+a.w&&e>=a.y&&e<=a.y+a.h,l=Math.hypot(t-a.fx,e-a.fy),c=o?0:l<22?l:1/0;c<=s&&c!==1/0&&(s=c,i=a.u)}return i}battleAt(t,e){for(let n of this.battleRects)if(t>=n.x&&t<=n.x+n.w&&e>=n.y&&e<=n.y+n.h)return n.b;return null}};var Kt=r=>document.getElementById(r),he=r=>String(r).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),sr={none:'Click one of your <b style="color:#7dffa0">green battalions</b> to select it \xB7 Drag to pan \xB7 Scroll to zoom',move:'Click the map to <b>MOVE</b> \xB7 Click a <b style="color:#ff8a6a">red battalion</b> to <b>ATTACK</b> \xB7 Shift-click to add battalions',attack:'Click an <b style="color:#ff8a6a">enemy battalion</b> or enemy ground to <b>ATTACK</b> \xB7 Esc to cancel',reinforce:'Click a <b style="color:#7dffa0">friendly battalion</b> or a battle to <b>REINFORCE</b> it \xB7 Esc to cancel',enemy:"Enemy battalion \u2014 select your own battalions, then click this one to attack it",routed:"This battalion is routed and regrouping \u2014 it will take orders once it recovers"},fc=class{constructor(t){this.app=t,this.selected=[],this.mode="move",this.hover=null,this.focusBattle=null,this.battleIdx=0,this.dragBox=null,this.mouse=null,this.feed=[],this.bannerQueue=[],this.bannerBusy=!1,this.lastPanel=0,this.lastTop=0,this.lastClick={t:0,u:null},this.keys=new Set,this.pointers=new Map,this.bind()}get game(){return this.app.game}get rig(){return this.app.rig}commandable(){return this.selected.filter(t=>t.side===V&&t.alive&&!t.routed)}select(t,e=!1){if(t=t.filter(n=>n&&n.alive),e)for(let n of t)this.selected.includes(n)?this.selected=this.selected.filter(i=>i!==n):n.side===V&&this.selected.every(i=>i.side===V)&&this.selected.push(n);else this.selected=t;(!this.selected.length||this.selected.some(n=>n.side!==V))&&(this.mode="move"),this.app.audio.click(),this.refreshPanels(!0)}clearSelection(){this.selected=[],this.mode="move",this.refreshPanels(!0)}setMode(t){if(!this.commandable().length){this.flashHint("Select one of your battalions first");return}this.mode=this.mode===t?"move":t,this.app.audio.click(),this.refreshPanels(!0)}orderButton(t){let e=this.commandable();if(!e.length){this.flashHint(this.selected.length?sr.routed:"Select one of your battalions first");return}let n=this.game.orders;if(t==="move"||t==="attack"||t==="reinforce"){this.setMode(t);return}let i=0;for(let s of e)t==="defend"&&n.defend(s)&&i++,t==="retreat"&&n.retreat(s)&&i++;i?(this.app.audio.order(),this.flashHint(t==="defend"?`${i} battalion${i>1?"s":""} digging in`:`${i} battalion${i>1?"s":""} falling back to safety`)):t==="retreat"&&this.flashHint("No safe line of retreat!"),this.mode="move",this.refreshPanels(!0)}spreadCells(t,e){let n=this.game.map,i=[t],s=new Set([t]),a=[t];for(;i.length<e&&a.length;){let o=a.shift();for(let l of n.cells[o].nbrs)if(!(s.has(l)||(s.add(l),!n.cells[l].passable))&&!this.game.enemiesInCell(V,l).length&&(i.push(l),a.push(l),i.length>=e))break}return i}orderMoveTo(t,e){let n=this.game,i=this.commandable();if(!i.length)return;let s=n.map,a=0;if(e||i.length===1)for(let l of i)(e?n.orders.attack(l,{cell:t}):n.orders.move(l,t))&&a++;else{let l=this.spreadCells(t,i.length),c=i.slice();for(let h of l){let u=s.cells[h];c.sort((f,p)=>Math.hypot(f.x-u.x,f.y-u.y)-Math.hypot(p.x-u.x,p.y-u.y));let d=c.shift();d&&n.orders.move(d,h)&&a++}}let o=s.cells[t];a?(this.app.effects.ring(o.x,o.y,V,46),this.app.audio.order()):this.flashHint("Can't find a route there"),this.mode="move"}orderAttackUnit(t){let e=this.commandable(),n=0;for(let i of e)this.game.orders.attack(i,{unit:t})&&n++;n?(this.app.effects.ring(t.x,t.y,ot,50),this.app.audio.order(),this.flashHint(`${n} battalion${n>1?"s":""} attacking ${t.short}`)):this.flashHint("Can't reach that battalion"),this.mode="move"}orderReinforce(t){let e=this.commandable().filter(i=>i!==t);if(!e.length){this.flashHint("Select other battalions to send as reinforcements");return}let n=0;for(let i of e)this.game.orders.reinforce(i,t)&&n++;n?(this.app.effects.ring(t.x,t.y,V,50),this.app.audio.order(),this.flashHint(`${e.map(i=>i.short).join(", ")} \u2192 ${t.short}`)):this.flashHint("Can't reach that battalion"),this.mode="move"}bind(){let t=Kt("gl");t.addEventListener("contextmenu",e=>e.preventDefault()),t.addEventListener("pointerdown",e=>this.onDown(e)),window.addEventListener("pointermove",e=>this.onMove(e)),window.addEventListener("pointerup",e=>this.onUp(e)),window.addEventListener("pointercancel",e=>this.onUp(e)),t.addEventListener("wheel",e=>this.onWheel(e),{passive:!1}),t.addEventListener("pointerleave",()=>{this.mouse=null,this.setTooltip(null)}),window.addEventListener("keydown",e=>this.onKey(e,!0)),window.addEventListener("keyup",e=>this.onKey(e,!1)),document.querySelectorAll(".obtn").forEach(e=>e.addEventListener("click",()=>this.orderButton(e.dataset.order))),Kt("pauseBtn").addEventListener("click",()=>this.togglePause()),document.querySelectorAll(".speed").forEach(e=>e.addEventListener("click",()=>this.setSpeed(+e.dataset.speed))),Kt("generalsBtn").addEventListener("click",()=>this.openGenerals()),Kt("helpBtn").addEventListener("click",()=>this.openHelp()),Kt("soundBtn").addEventListener("click",()=>{let e=this.app.audio.toggle();Kt("soundBtn").textContent=e?"\u{1F50A}":"\u{1F508}"})}onDown(t){if(!this.game||!this.app.started)return;if(Kt("gl").setPointerCapture?.(t.pointerId),this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.pointers.size===2){let[n,i]=[...this.pointers.values()];this.pinch={d:Math.hypot(n.x-i.x,n.y-i.y),dist:this.rig.want.dist},this.drag=null;return}let e=this.rig;this.drag={x0:t.clientX,y0:t.clientY,button:t.button,shift:t.shiftKey,moved:!1,plane:e.targetH,grab:e.planeAt(t.clientX,t.clientY,e.targetH),yaw0:e.want.yaw}}onMove(t){if(this.mouse={x:t.clientX,y:t.clientY},!this.game||!this.app.started)return;let e=this.rig;if(this.pointers.has(t.pointerId)&&this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.pinch&&this.pointers.size===2){let[i,s]=[...this.pointers.values()],a=Math.hypot(i.x-s.x,i.y-s.y);e.want.dist=$t(this.pinch.dist*this.pinch.d/Math.max(10,a),e.minDist,e.maxDist);return}let n=this.drag;if(n){let i=t.clientX-n.x0,s=t.clientY-n.y0;if(!n.moved&&Math.hypot(i,s)>6&&(n.moved=!0),n.moved){if(n.button===1||n.button===2&&t.altKey)e.want.yaw=n.yaw0-i*.006;else if(n.shift&&n.button===0)this.dragBox={x0:n.x0,y0:n.y0,x1:t.clientX,y1:t.clientY};else if(n.button===0||n.button===2){let a=e.planeAt(t.clientX,t.clientY,n.plane);if(a&&n.grab){let o=n.grab.x-a.x,l=n.grab.z-a.z;e.want.x+=o,e.want.z+=l,e.cam.x+=o,e.cam.z+=l}}this.setTooltip(null);return}}this.updateHover(t.clientX,t.clientY)}onUp(t){this.pointers.delete(t.pointerId),this.pointers.size<2&&(this.pinch=null);let e=this.drag;if(this.drag=null,!(!e||!this.game||!this.app.started)){if(this.dragBox){let n=this.dragBox;this.dragBox=null;let i=Math.min(n.x0,n.x1),s=Math.max(n.x0,n.x1),a=Math.min(n.y0,n.y1),o=Math.max(n.y0,n.y1),l=this.app.hud.counterRects.filter(c=>c.u.side===V).filter(c=>{let h=c.x+c.w/2,u=c.y+c.h/2;return h>=i&&h<=s&&u>=a&&u<=o||c.fx>=i&&c.fx<=s&&c.fy>=a&&c.fy<=o}).map(c=>c.u);l.length&&this.select(l,t.shiftKey&&this.selected.length>0);return}e.moved||this.click(t.clientX,t.clientY,e.button,t.shiftKey)}}onWheel(t){if(t.preventDefault(),!this.game)return;let e=this.rig,n=e.want.dist,i=Math.exp($t(t.deltaY,-120,120)*.0016);e.want.dist=$t(n*i,e.minDist,e.maxDist);let s=e.planeAt(t.clientX,t.clientY,e.targetH);if(s){let a=1-e.want.dist/n;e.want.x+=(s.x-e.want.x)*a,e.want.z+=(s.z-e.want.z)*a}}onKey(t,e){if(t.target&&(t.target.tagName==="SELECT"||t.target.tagName==="INPUT"))return;let n=t.key.toLowerCase();if(e?this.keys.add(n):this.keys.delete(n),!(!e||!this.game||!this.app.started)){if(!Kt("generalsModal").classList.contains("hidden")||!Kt("helpModal").classList.contains("hidden")){(n==="escape"||n==="g"||n==="h")&&this.closeModals();return}if(!this.game.over)switch(n){case"m":this.orderButton("move");break;case"a":t.ctrlKey||t.metaKey?(t.preventDefault(),this.select(this.game.units.filter(i=>i.alive&&i.side===V))):this.orderButton("attack");break;case"d":this.orderButton("defend");break;case"r":this.orderButton("retreat");break;case"f":this.orderButton("reinforce");break;case"escape":this.mode!=="move"?this.mode="move":this.clearSelection(),this.refreshPanels(!0);break;case" ":t.preventDefault(),this.togglePause();break;case"1":this.setSpeed(1);break;case"2":this.setSpeed(2);break;case"3":this.setSpeed(4);break;case"tab":{t.preventDefault();let i=this.game.units.filter(o=>o.alive&&o.side===V);if(!i.length)break;let s=this.selected.length===1?i.indexOf(this.selected[0]):-1,a=i[(s+(t.shiftKey?i.length-1:1))%i.length];this.select([a]),this.rig.flyTo(a.x,a.y);break}case"g":this.openGenerals();break;case"h":case"?":this.openHelp();break;case"home":this.rig.want.yaw=0,this.rig.flyTo(1600,1e3,2e3);break;case"b":{let i=this.currentBattle();i&&this.rig.flyTo(i.x,i.y,Math.min(this.rig.want.dist,700));break}default:break}}}updateKeys(t){let e=this.rig;if(!e)return;let n=0,i=0;if(this.keys.has("arrowup")&&(i-=1),this.keys.has("arrowdown")&&(i+=1),this.keys.has("arrowleft")&&(n-=1),this.keys.has("arrowright")&&(n+=1),n||i){let s=e.want.dist*1.1*t,a=e.want.yaw;e.want.x+=(n*Math.cos(a)+i*Math.sin(a))*s,e.want.z+=(-n*Math.sin(a)+i*Math.cos(a))*s}this.keys.has("q")&&(e.want.yaw+=t*1.4),this.keys.has("e")&&(e.want.yaw-=t*1.4),(this.keys.has("+")||this.keys.has("="))&&(e.want.dist=Math.max(e.minDist,e.want.dist*(1-t*1.5))),(this.keys.has("-")||this.keys.has("_"))&&(e.want.dist=Math.min(e.maxDist,e.want.dist*(1+t*1.5)))}updateHover(t,e){let n=this.app.hud,i=n.unitAt(t,e);if(this.hover=i,i){this.setTooltip(this.unitTooltip(i),t,e);return}let s=n.battleAt(t,e);if(s){let a=this.game.combat.summary(s),o=s.attSide===V?a.attSoldiers:a.defSoldiers,l=s.attSide===V?a.defSoldiers:a.attSoldiers;this.setTooltip(`<div class="tt-name" style="color:#ffc28a">\u2694 Battle ${he(s.place)}</div>${Rn(o)} vs ${Rn(l)}<div class="muted">${this.commandable().length?"Click to send selected battalions as reinforcements":"Click to view this battle"}</div>`,t,e);return}this.setTooltip(null)}unitTooltip(t){let e=this.game,n=hr(t.xp),i=t.side===V?"leaf":"stone",s="";t.side===ot&&this.commandable().length?s='<div style="color:#ff8a6a;font-weight:700">Click to ATTACK</div>':t.side===V&&this.mode==="reinforce"&&(s='<div style="color:#5cd4ff;font-weight:700">Click to REINFORCE</div>');let a=e.general(t);return`<div class="tt-name ${i}">${he(t.name)}</div>
      <div class="muted">${Gn[t.type].name} \xB7 ${n.name}${a?" \xB7 Gen. "+he(a.name):""}</div>
      <div>${Rn(t.soldiers)} / ${Rn(t.max)} soldiers</div>
      <div>Morale ${Oi(t.morale)} \xB7 Org ${Oi(t.org)}</div>
      <div class="muted">${Mc(e,t)}</div>${s}`}setTooltip(t,e,n){let i=Kt("tooltip");if(!t){i.classList.remove("show");return}i.innerHTML=t,i.classList.add("show");let s=i.offsetWidth,a=i.offsetHeight,o=e+18,l=n+14;o+s>window.innerWidth-8&&(o=e-s-14),l+a>window.innerHeight-8&&(l=n-a-10),i.style.left=o+"px",i.style.top=l+"px"}click(t,e,n,i){let s=this.game;if(s.over)return;let a=this.app.hud,o=a.unitAt(t,e),l=o?null:a.battleAt(t,e),c=this.commandable();if(n===2){if(this.mode!=="move"){this.mode="move",this.refreshPanels(!0);return}if(!c.length)return}if(this.mode==="reinforce"&&c.length){if(o&&o.side===V)return this.orderReinforce(o);if(l){let f=[...l.attackers,...l.defenders].find(p=>p.side===V);if(f)return this.orderReinforce(f)}this.flashHint("Pick a friendly battalion to reinforce");return}if(o){if(o.side===V){if(n===2&&c.length&&o.battle)return this.orderReinforce(o);if(n===2&&c.length){this.orderMoveTo(o.cell,!1);return}let f=performance.now();this.lastClick.u===o&&f-this.lastClick.t<350&&o.army?this.select(s.units.filter(p=>p.alive&&p.side===V&&p.army===o.army)):this.select([o],i),this.lastClick={t:f,u:o};return}if(c.length)return this.orderAttackUnit(o);this.select([o]);return}if(l){if(c.length){let f=[...l.attackers,...l.defenders].find(p=>p.side===V);if(f&&!c.includes(f))return this.orderReinforce(f)}this.focusBattle=l,this.refreshPanels(!0);return}let h=this.rig.groundAt(t,e);if(!h)return;let u=s.map.cellAt(h.x,h.z);if(u<0)return;if(!c.length){this.selected.length&&this.clearSelection();return}if(!s.map.cells[u].passable){this.flashHint("Battalions can't go there");return}let d=s.map.cells[u].owner===ot&&s.enemiesInCell(V,u).length;this.orderMoveTo(u,this.mode==="attack"||!!d)}togglePause(){let t=this.game;!t||t.over||(t.paused=!t.paused,Kt("pauseBtn").classList.toggle("paused",t.paused),Kt("pauseBtn").textContent=t.paused?"\u25B6":"\u275A\u275A",Kt("pausedTag").classList.toggle("hidden",!t.paused))}setSpeed(t){this.game&&(this.game.speed=t,this.game.paused&&this.togglePause(),document.querySelectorAll(".speed").forEach(e=>e.classList.toggle("active",+e.dataset.speed===t)))}addFeed(t){let e=this.game.dateString();t.when=`D${e.day} ${e.hour}`;for(let n of this.feed)n.fresh=!1;t.fresh=!0,this.feed.unshift(t),this.feed.length>60&&this.feed.pop(),this.renderFeed(),t.alert&&this.app.audio.alert()}renderFeed(){let t=Kt("feed");t.innerHTML="<h3>BATTLE REPORTS</h3>"+this.feed.slice(0,18).map((e,n)=>`<div class="feed-item ${e.kind||"info"} ${e.alert?"alert":""} ${e.fresh?"fresh":""}" data-i="${n}"><span class="fi">${e.icon||"\u2022"}</span><span class="fx">${he(e.text)}</span><span class="ft">${e.when}</span></div>`).join(""),t.querySelectorAll(".feed-item").forEach(e=>e.addEventListener("click",()=>{let n=this.feed[+e.dataset.i];this.jumpTo(n)}))}jumpTo(t){let e=this.game.map,n=t.x,i=t.y;t.battle?(n=t.battle.x,i=t.battle.y,t.battle.over||(this.focusBattle=t.battle)):t.unit&&t.unit.alive?(n=t.unit.x,i=t.unit.y,t.unit.side===V&&this.select([t.unit])):t.cell!==void 0&&(n=e.cells[t.cell].x,i=e.cells[t.cell].y),n!==void 0&&this.rig.flyTo(n,i,Math.min(this.rig.want.dist,800)),this.refreshPanels(!0)}banner(t){this.bannerQueue.push(t),this.bannerQueue.length>4&&this.bannerQueue.shift(),this.bannerBusy||this.nextBanner()}nextBanner(){let t=this.bannerQueue.shift(),e=Kt("banner");if(!t){this.bannerBusy=!1;return}this.bannerBusy=!0;let n=this.bannerToken=(this.bannerToken||0)+1;e.className=`${t.kind||"info"} ${t.big?"big":""}`,e.innerHTML=`<div class="bt">${he(t.text)}</div><div class="rule"></div><div class="bs">${he(t.sub||"")}</div>`,requestAnimationFrame(()=>n===this.bannerToken&&e.classList.add("show")),t.kind==="good"?this.app.audio.fanfare(!0):t.kind==="bad"&&this.app.audio.fanfare(!1),setTimeout(()=>{this.bannerToken++,e.classList.remove("show"),setTimeout(()=>this.nextBanner(),450)},t.big?3600:2500)}hintHtml(){let t=this.selected;return t.length?t.every(e=>e.side===ot)?sr.enemy:this.commandable().length?sr[this.mode]||sr.move:sr.routed:sr.none}flashHint(t){this.hintFlash={text:t,until:performance.now()+2200},Kt("hint").innerHTML=he(t)}refreshPanels(t){this.lastPanel=t?0:this.lastPanel}update(t){let e=performance.now();this.updateKeys(t),e-this.lastPanel>220&&(this.lastPanel=e,this.selected=this.selected.filter(n=>n.alive),this.focusBattle&&this.focusBattle.over&&e-this.focusBattle.endTime>0,this.renderUnitPanel(),this.renderBattlePanel(),this.renderOrders()),e-this.lastTop>500&&(this.lastTop=e,this.renderTop())}renderOrders(){let t=this.commandable();document.querySelectorAll(".obtn").forEach(e=>{e.disabled=!t.length,e.classList.toggle("active",t.length>0&&e.dataset.order===this.mode&&this.mode!=="move")}),(!this.hintFlash||performance.now()>this.hintFlash.until)&&(this.hintFlash=null,Kt("hint").innerHTML=this.hintHtml())}renderTop(){let t=this.game,e=t.dateString();Kt("date").textContent=`Year ${e.year} \xB7 Day ${e.day} \xB7 ${e.hour}`;let n=t.weather.type,i=Kt("weather");i.textContent=n==="rain"?"\u{1F327} Heavy Rain":n==="fog"?"\u{1F32B} Fog":"\u2600 Clear",i.className="chip "+n;let s=t.territory.controlShare();Kt("leafPct").textContent=Math.round(s*100)+"%",Kt("stonePct").textContent=Math.round((1-s)*100)+"%",Kt("leafBar").style.width=s*100+"%",Kt("collapse").textContent=t.collapsing[ot]?"ENEMY FRONT COLLAPSING":t.collapsing[V]?"OUR FRONT IS COLLAPSING":"";let a=t.map,o=Kt("objectives");o.innerHTML=sn[V].map(l=>{let c=a.locByKey[l],h=c.owner===V;return`<div class="obj ${h?"held":""}" data-k="${l}" title="${he(c.name)} \u2014 ${h?"captured":"capture this objective"}"><span class="ic">${h?"\u2713":"\u25CE"}</span><span class="nm">${he(c.name)}</span></div>`}).join(""),o.querySelectorAll(".obj").forEach(l=>l.addEventListener("click",()=>{let c=a.locByKey[l.dataset.k];this.rig.flyTo(c.x,c.y,Math.min(this.rig.want.dist,900))}))}bar(t,e){return`<div class="bar ${t}"><i style="width:${$t(e,0,1)*100}%"></i></div>`}strengthCls(t){return t>.6?"":t>.33?"mid":"low"}renderUnitPanel(){let t=Kt("leftPanel"),e=this.game,n=this.selected;if(!n.length){t.innerHTML=this.rosterHtml(),t.querySelectorAll("[data-uid]").forEach(m=>m.addEventListener("click",()=>{let b=e.unitById.get(+m.dataset.uid);b&&(this.select([b]),this.rig.flyTo(b.x,b.y,Math.min(this.rig.want.dist,900)))}));return}if(n.length>1){t.innerHTML=`<h3>${n.length} BATTALIONS SELECTED</h3>`+n.map(m=>`<div class="multi-row" data-uid="${m.id}"><span class="nm">${he(m.short)}</span><span class="muted" style="text-align:right;font-size:11px">${Rn(m.soldiers)}</span>
          ${this.bar("str "+this.strengthCls(m.soldiers/m.max),m.soldiers/m.max)}${this.bar("mor",m.morale)}</div>`).join("")+'<div class="panel-actions"><button class="sbtn" id="clearSel">CLEAR</button></div>',t.querySelectorAll("[data-uid]").forEach(m=>m.addEventListener("click",()=>{let b=e.unitById.get(+m.dataset.uid);b&&(this.select([b]),this.rig.flyTo(b.x,b.y))})),Kt("clearSel").addEventListener("click",()=>this.clearSelection());return}let i=n[0],s=hr(i.xp),a=i.soldiers/i.max,o=e.map,l=o.cells[i.cell],c=l.loc!==null?o.locations[l.loc]:null,h=c&&c.type!=="village"&&c.type!=="bridge"?`${c.name} (${gi[c.type].name})`:Vn[l.terrain].name,u=e.general(i),d=e.armies[i.army],f=Mc(e,i),p=i.battle?"battle":i.routed||i.surrounded?"bad":i.stance==="defend"?"good":"",y=i.side===ot,g="";if(i.battle){let m=i.role==="att"?i.battle.defenders:i.battle.attackers;g=`<div class="muted" style="margin-top:6px;font-size:12px">Fighting ${he(m.map(b=>b.short).join(", "))} ${he(i.battle.place)}</div>`}else i.path.length&&(g=`<div class="muted" style="margin-top:6px;font-size:12px">Arrives in ~${Math.max(1,Math.round(bc(e,i)))}h</div>`);t.innerHTML=`
      ${y?'<div class="enemy-tag">ENEMY BATTALION</div>':""}
      <div class="unit-head">
        <canvas class="nato ${y?"stone":"leaf"}" id="natoIcon" width="92" height="64"></canvas>
        <div>
          <div class="unit-name">${he(i.name)}</div>
          <div class="unit-sub">${Gn[i.type].name} \xB7 <span class="stars">${"\u2605".repeat(s.stars)}${"\u2606".repeat(3-s.stars)}</span> ${s.name}</div>
        </div>
      </div>
      <div class="stat"><div class="stat-row"><span>Soldiers</span><b>${Rn(i.soldiers)} / ${Rn(i.max)}</b></div>${this.bar("str "+this.strengthCls(a),a)}</div>
      <div class="stat"><div class="stat-row"><span>Morale</span><b>${Oi(i.morale)}</b></div>${this.bar("mor",i.morale)}</div>
      <div class="stat"><div class="stat-row"><span>Organization</span><b>${Oi(i.org)}</b></div>${this.bar("org",i.org)}</div>
      <div class="kv">
        <span>Commander</span><b>Captain ${he(i.captain)}</b>
        <span>Army</span><b>${d?he(d.name):"\u2014"}</b>
        <span>General</span><b>${u?`${he(u.name)} <span class="stars">${Ea[u.trait].icon}</span> ${u.trait}${u.woundedUntil>e.time?" (wounded)":""}`:"\u2014"}</b>
        <span>Position</span><b>${he(h)}</b>
        ${i.entrench>.05?`<span>Dug in</span><b>+${Math.round(i.entrench*40)}% defense</b>`:""}
      </div>
      <div class="status ${p}">${i.battle?"\u2694":i.routed?"\u2690":i.stance==="defend"?"\u26E8":"\u25CF"} ${he(f)}</div>
      ${g}
      ${y?"":'<div class="panel-actions"><button class="sbtn" id="selArmy">SELECT ARMY</button><button class="sbtn" id="nextUnit">NEXT \u25B6</button></div>'}
    `,this.drawNato(Kt("natoIcon"),i),y||(Kt("selArmy").addEventListener("click",()=>this.select(e.units.filter(m=>m.alive&&m.side===V&&m.army===i.army))),Kt("nextUnit").addEventListener("click",()=>this.onKey({key:"Tab",preventDefault(){},shiftKey:!1,target:null},!0)))}drawNato(t,e){if(!t)return;let n=t.getContext("2d");n.scale(2,2),this.app.hud.symbol(n,e.type,23,16,46,32)}rosterHtml(){let t=this.game,e=Object.values(t.armies).filter(i=>i.side===V),n='<h3>YOUR BATTALIONS</h3><div class="empty-card" style="margin-bottom:8px">Click a battalion here or on the map. Double-click on the map selects its whole army.</div>';for(let i of e){let s=t.units.filter(o=>o.alive&&o.side===V&&o.army===i.id);if(!s.length)continue;let a=t.generals[i.general];n+=`<div style="margin:10px 0 4px;font-family:var(--heading);font-weight:700;letter-spacing:.08em;color:#cfd8cf">${he(i.name)} <span class="muted" style="font-weight:600">\u2014 ${a?he(a.name):"no general"}</span></div>`;for(let o of s){let l=o.battle?"\u2694":o.routed?"\u2690":o.moving?"\u279C":o.stance==="defend"?"\u26E8":"";n+=`<div class="multi-row" data-uid="${o.id}"><span class="nm">${l} ${he(o.short)}</span><span class="muted" style="text-align:right;font-size:11px">${Rn(o.soldiers)}</span>${this.bar("str "+this.strengthCls(o.soldiers/o.max),o.soldiers/o.max)}${this.bar("mor",o.morale)}</div>`}}return n}currentBattle(){let t=this.game,e=t.combat.battles.filter(i=>!i.over);if(this.focusBattle&&(!this.focusBattle.over||t.time-this.focusBattle.endTime<3))return this.focusBattle;let n=this.selected[0];return n&&n.battle?n.battle:e.length?(this.battleIdx=$t(this.battleIdx,0,e.length-1),e[this.battleIdx]):null}renderBattlePanel(){let t=Kt("battlePanel"),e=this.game,n=e.combat.battles.filter(R=>!R.over),i=this.currentBattle();if(!i){t.innerHTML='<h3>BATTLE</h3><div class="empty-card">The front is quiet. Select a battalion and click a <b style="color:#ff8a6a">red enemy battalion</b> to attack.</div>';return}let s=e.combat.summary(i),a=i.attSide===V,o=a?i.attackers:i.defenders,l=a?i.defenders:i.attackers,c=a?s.attSoldiers:s.defSoldiers,h=a?s.defSoldiers:s.attSoldiers,u=a?s.attMorale:s.defMorale,d=a?s.defMorale:s.attMorale,f=a?s.attOrg:s.defOrg,p=a?s.defOrg:s.attOrg,y=a?i.adv:1-i.adv,g=R=>R.length?he(R[0].short)+(R.length>1?` +${R.length-1}`:""):"\u2014",m=n.indexOf(i),b=e.map.cells[i.cell],E=b.loc!==null?e.map.locations[b.loc]:null,_=E&&E.type!=="village"&&E.type!=="bridge"?gi[E.type].name:Vn[b.terrain].name,S=[];S.push(`${a?"Enemy defends":"We defend"}: ${_} ${s.terrain>1.01?`(+${Math.round((s.terrain-1)*100)}% defense)`:""}`),i.attackers.some(R=>e.map.edge(R.cell,i.cell)?.river)&&S.push("Attackers crossing a river"),e.weather.type!=="clear"&&S.push(e.weather.type==="rain"?"Rain hampers the attack":"Fog over the battlefield");for(let R of s.incoming)R.side===V&&S.push(`<span class="reinf">\u2192 ${he(R.short)} arriving (~${Math.max(1,Math.round(bc(e,R)))}h)</span>`);s.incoming.filter(R=>R.side===ot&&e.isVisible(R)).length&&S.push('<span style="color:#ff9a86">\u26A0 Enemy reinforcements approaching</span>');let x=`\u2694 BATTLE ${he(i.place.toUpperCase())}`;i.over&&(x=i.winner===V?"\u2713 VICTORY "+he(i.place.toUpperCase()):"\u2717 DEFEAT "+he(i.place.toUpperCase())),t.innerHTML=`
      <div class="battle-title"><span>${x}</span><span class="nav">${n.length>1?`<button id="bPrev">\u25C0</button><span style="font-size:12px;color:var(--muted);padding:3px 2px">${m+1}/${n.length}</span><button id="bNext">\u25B6</button>`:""}<button id="bJump" title="Jump to battle (B)">\u25CE</button></span></div>
      <div class="versus">
        <div class="side"><div class="nm leaf">${g(o)}</div><div class="big">${Rn(c)}</div><div class="small">Morale ${Oi(u)}</div>${this.bar("org",f)}</div>
        <div class="vs">VS</div>
        <div class="side right"><div class="nm stone">${g(l)}</div><div class="big">${Rn(h)}</div><div class="small">Morale ${Oi(d)}</div>${this.bar("org",p)}</div>
      </div>
      <div class="adv"><div class="adv-track"><i style="width:${y*100}%"></i></div>
      <div class="adv-label"><span>${y>.55?"We are winning":y<.45?"We are losing":"Evenly matched"}</span><span>${Math.round(i.hours)}h of fighting</span></div></div>
      <div class="battle-notes">${S.join("<br>")}</div>
      <div class="battle-log">${i.log.slice(0,3).map(R=>`<div>${he(R.text)}</div>`).join("")}</div>`;let T=R=>{this.focusBattle=null,this.battleIdx=(m+R+n.length)%n.length;let P=n[this.battleIdx];this.focusBattle=P,this.rig.flyTo(P.x,P.y),this.refreshPanels(!0)};Kt("bPrev")?.addEventListener("click",()=>T(-1)),Kt("bNext")?.addEventListener("click",()=>T(1)),Kt("bJump")?.addEventListener("click",()=>this.rig.flyTo(i.x,i.y,Math.min(this.rig.want.dist,700)))}closeModals(){Kt("generalsModal").classList.add("hidden"),Kt("helpModal").classList.add("hidden"),this.pausedByModal&&this.game.paused&&this.togglePause(),this.pausedByModal=!1}pauseForModal(){this.game.paused||(this.togglePause(),this.pausedByModal=!0)}openGenerals(){let t=this.game;this.pauseForModal();let e=Kt("generalsModal");e.classList.remove("hidden");let n=Object.values(t.generals).filter(l=>l.side===V),i=Object.values(t.armies).filter(l=>l.side===V),s=l=>l.split(" ").map(c=>c[0]).join("").slice(0,2),a=(l,c)=>l?`<div class="general"><div class="portrait ${c?"stone":""} ${l.woundedUntil>t.time?"wounded":""}">${s(l.name)}</div><div><div class="gname">General ${he(l.name)}</div><div class="gtrait"><b>${Ea[l.trait].icon} ${l.trait}</b> \u2014 ${Ea[l.trait].desc}${l.woundedUntil>t.time?' <span style="color:#ff9a86">(wounded)</span>':""}</div></div></div>`:'<div class="general"><div class="portrait">?</div><div class="gname">No general</div></div>',o=n.filter(l=>!i.some(c=>c.general===l.id));e.innerHTML=`<div class="modal-card">
      <div class="modal-head"><div><h2>\u2605 GENERALS</h2><p class="lead">Each army fights under one general. Swap generals to match the job: Aggressive for the main push, Defensive for holding a sector, Strategist where several battalions attack together.</p></div><button class="close" id="genClose">\u2715</button></div>
      <div class="armies">${i.map(l=>{let c=t.generals[l.general],h=t.units.filter(u=>u.alive&&u.side===V&&u.army===l.id);return`<div class="army"><h4>${he(l.name)}</h4>${a(c)}
            <select data-army="${l.id}">${n.map(u=>`<option value="${u.id}" ${u.id===l.general?"selected":""}>${he(u.name)} \u2014 ${u.trait}${i.find(d=>d.general===u.id&&d!==l)?" (swap)":""}</option>`).join("")}</select>
            <div style="margin-top:8px">${h.map(u=>`<div class="bat-chip" data-uid="${u.id}"><span>${he(u.name)}</span><select data-unit="${u.id}">${i.map(d=>`<option value="${d.id}" ${d.id===l.id?"selected":""}>${he(d.name)}</option>`).join("")}</select></div>`).join("")}</div></div>`}).join("")}</div>
      ${o.length?`<h3 style="margin-top:16px">IN RESERVE</h3><div class="enemy-gens">${o.map(l=>a(l)).join("")}</div>`:""}
      <h3 style="margin-top:18px;color:#ff9a86">ENEMY COMMANDERS</h3>
      <div class="enemy-gens">${Object.values(t.armies).filter(l=>l.side===ot).map(l=>`<div>${a(t.generals[l.general],!0)}<div class="muted" style="font-size:11px;margin:4px 0 0 54px">${he(l.name)}</div></div>`).join("")}</div>
    </div>`,Kt("genClose").addEventListener("click",()=>this.closeModals()),e.onclick=l=>{l.target===e&&this.closeModals()},e.querySelectorAll("select[data-army]").forEach(l=>l.addEventListener("change",()=>{let c=t.armies[l.dataset.army],h=i.find(u=>u.general===l.value&&u!==c);h&&(h.general=c.general),c.general=l.value,this.app.audio.order(),this.addFeed({kind:"info",icon:"\u2605",text:`General ${t.generals[l.value].name} takes command of the ${c.name}`}),this.openGenerals()})),e.querySelectorAll("select[data-unit]").forEach(l=>l.addEventListener("change",()=>{let c=t.unitById.get(+l.dataset.unit);c&&(c.army=l.value),this.openGenerals()}))}openHelp(){this.pauseForModal();let t=Kt("helpModal");t.classList.remove("hidden");let e=[["Select battalion","<kbd>Click</kbd>"],["Add to selection","<kbd>Shift</kbd>+<kbd>Click</kbd>"],["Box select","<kbd>Shift</kbd>+<kbd>Drag</kbd>"],["Select whole army","<kbd>Double-click</kbd>"],["Select all battalions","<kbd>Ctrl</kbd>+<kbd>A</kbd>"],["Next battalion","<kbd>Tab</kbd>"],["Move (default)","<kbd>Click</kbd> map / <kbd>M</kbd>"],["Attack","<kbd>Click</kbd> enemy / <kbd>A</kbd>"],["Defend (dig in)","<kbd>D</kbd>"],["Retreat","<kbd>R</kbd>"],["Reinforce","<kbd>F</kbd> then click friend"],["Contextual order","<kbd>Right-click</kbd>"],["Pan camera","<kbd>Drag</kbd> / <kbd>Arrows</kbd>"],["Zoom","<kbd>Wheel</kbd> / <kbd>+</kbd><kbd>\u2212</kbd>"],["Rotate camera","<kbd>Q</kbd> <kbd>E</kbd> / middle-drag"],["Jump to battle","<kbd>B</kbd>"],["Pause","<kbd>Space</kbd>"],["Speed 1\xD7 / 2\xD7 / 4\xD7","<kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd>"],["Generals","<kbd>G</kbd>"],["Cancel / deselect","<kbd>Esc</kbd>"]];t.innerHTML=`<div class="modal-card"><div class="modal-head"><div><h2>FIELD MANUAL</h2><p class="lead">Those are your battalions (green). That's the enemy (red). The glowing line is the front. Push them back.</p></div><button class="close" id="helpClose">\u2715</button></div>
      <div class="help-grid">${e.map(([n,i])=>`<div><span>${n}</span><span>${i}</span></div>`).join("")}</div>
      <div class="help-tips">
        <b>Battles take time.</b> Watch the balance bar \u2014 send more battalions with <b>REINFORCE</b> to tip a fight.<br>
        <b>Terrain matters.</b> Forests, mountains, towns and forts make defenders much stronger. Attacking across a river is costly \u2014 use bridges.<br>
        <b>Dig in.</b> A battalion ordered to <b>DEFEND</b> entrenches over a few hours and becomes very hard to dislodge.<br>
        <b>Morale and organization</b> drain in combat. At zero a battalion breaks and retreats. Pull tired units back to towns to recover; the Medical Battalion heals nearby friends.<br>
        <b>Don't get surrounded.</b> Battalions cut off from friendly towns can't recover \u2014 and may surrender.<br>
        <b>Win</b> by capturing the four \u25CE objectives or the enemy capital Kharzad. Lose Sennai and the war is lost.
      </div></div>`,Kt("helpClose").addEventListener("click",()=>this.closeModals()),t.onclick=n=>{n.target===t&&this.closeModals()}}showEnd(t){let e=this.game,n=t.winner===V,i=Kt("endScreen");i.classList.remove("hidden");let s=e.dateString(),a=Math.round(e.territory.controlShare()*100);i.innerHTML=`<div class="modal-card end-card">
      <div class="kicker">${n?"THE WAR IS WON":"THE WAR IS LOST"}</div>
      <div class="end-title ${n?"win":"lose"}">${n?"VICTORY":"DEFEAT"}</div>
      <div class="end-reason">${he(t.reason)}</div>
      <div class="end-stats">
        <div><b>${s.day}</b><span>DAYS OF WAR</span></div>
        <div><b>${e.stats.battles}</b><span>BATTLES FOUGHT</span></div>
        <div><b>${e.stats.battlesWon}</b><span>BATTLES WON</span></div>
        <div><b>${e.stats.enemyDestroyed}</b><span>ENEMY BATTALIONS DESTROYED</span></div>
        <div><b>${e.stats.unitsLost}</b><span>BATTALIONS LOST</span></div>
        <div><b>${a}%</b><span>TERRITORY HELD</span></div>
      </div>
      <button class="start" id="againBtn">NEW WAR</button>
    </div>`,Kt("againBtn").addEventListener("click",()=>location.reload()),this.app.audio.fanfare(n,!0)}};var{W:rr,H:ar,MARGIN:or}=Jt,pc=class{constructor(t,e){this.canvas=t,this.app=e,this.ctx=t.getContext("2d"),this.version=-1,this.last=0,this.layer=document.createElement("canvas"),this.resize();let n=s=>{let a=t.getBoundingClientRect(),o=(s.clientX-a.left)/a.width*rr,l=(s.clientY-a.top)/a.height*ar;e.rig.flyTo(o,l)},i=!1;t.addEventListener("pointerdown",s=>{i=!0,t.setPointerCapture(s.pointerId),n(s)}),t.addEventListener("pointermove",s=>i&&n(s)),t.addEventListener("pointerup",()=>i=!1)}resize(){let t=this.canvas.getBoundingClientRect(),e=Math.min(window.devicePixelRatio||1,2);this.w=Math.max(100,Math.round(t.width||256)),this.h=Math.max(60,Math.round(t.height||160)),this.canvas.width=this.w*e,this.canvas.height=this.h*e,this.dpr=e,this.layer.width=this.canvas.width,this.layer.height=this.canvas.height,this.version=-1}rebuild(t){let e=this.layer.getContext("2d"),n=this.layer.width,i=this.layer.height,s=this.app.terrain.baseCanvas,a=or/(rr+2*or)*s.width,o=or/(ar+2*or)*s.height,l=rr/(rr+2*or)*s.width,c=ar/(ar+2*or)*s.height;e.drawImage(s,a,o,l,c,0,0,n,i);let h=n/rr,u=i/ar;e.setTransform(h,0,0,u,0,0);for(let d of[V,ot]){let f=Ce[d].tint;e.fillStyle=`rgba(${f[0]},${f[1]},${f[2]},0.42)`,e.beginPath();for(let p of t.map.cells)p.owner===d&&(p.poly.forEach((y,g)=>g?e.lineTo(y[0],y[1]):e.moveTo(y[0],y[1])),e.closePath());e.fill()}e.strokeStyle="#ffe9a0",e.lineWidth=2.4/h,e.lineJoin="round";for(let d of t.territory.frontLines())e.beginPath(),d.pts.forEach((f,p)=>p?e.lineTo(f[0],f[1]):e.moveTo(f[0],f[1])),e.stroke();e.setTransform(1,0,0,1,0,0)}draw(t,e){if(t-this.last<.1)return;this.last=t,e.territory.version!==this.version&&(this.version=e.territory.version,this.rebuild(e));let n=this.ctx;n.setTransform(1,0,0,1,0,0),n.drawImage(this.layer,0,0);let i=this.canvas.width/rr,s=this.canvas.height/ar,a=this.dpr;for(let c of[...sn[V],...sn[ot]]){let h=e.map.locByKey[c];n.beginPath(),n.arc(h.x*i,h.y*s,4.5*a,0,Math.PI*2),n.strokeStyle=h.owner===V?"#7dffa0":"#ffb3a6",n.lineWidth=1.6*a,n.stroke()}for(let c of e.units){if(!c.alive||!e.isVisible(c))continue;n.fillStyle=c.side===V?"#3dff7a":"#ff4a3a";let h=(c.side===V&&this.app.ui.selected.includes(c)?4.5:3)*a;n.fillRect(c.x*i-h/2,c.y*s-h/2,h,h),this.app.ui.selected.includes(c)&&(n.strokeStyle="#ffe066",n.lineWidth=1.2*a,n.strokeRect(c.x*i-h,c.y*s-h,h*2,h*2))}for(let c of e.combat.battles){if(c.over)continue;let h=(3+Math.sin(t*8+c.id)*1.2)*a;n.beginPath(),n.arc(c.x*i,c.y*s,h+2*a,0,Math.PI*2),n.fillStyle="rgba(255,140,40,0.85)",n.fill()}let o=this.app.rig,l=[[0,0],[o.width,0],[o.width,o.height],[0,o.height]].map(([c,h])=>o.planeAt(c,Math.max(h,o.height*.02),o.targetH));l.every(Boolean)&&(n.beginPath(),l.forEach((c,h)=>h?n.lineTo(c.x*i,c.z*s):n.moveTo(c.x*i,c.z*s)),n.closePath(),n.strokeStyle="rgba(255,255,255,0.85)",n.lineWidth=1.2*a,n.stroke())}};var mc=class{constructor(){this.ctx=null,this.on=!0,this.lastBoom=0,this.lastAlert=0,this.crackleAcc=0}init(){if(this.ctx)return;try{let l=window.AudioContext||window.webkitAudioContext;this.ctx=new l}catch{this.ctx=null;return}let t=this.ctx;this.master=t.createGain(),this.master.gain.value=.55;let e=t.createDynamicsCompressor();e.threshold.value=-18,e.ratio.value=6,this.master.connect(e),e.connect(t.destination);let n=t.sampleRate*2;this.noise=t.createBuffer(1,n,t.sampleRate);let i=this.noise.getChannelData(0);for(let l=0;l<n;l++)i[l]=Math.random()*2-1;let s=t.createBufferSource();s.buffer=this.noise,s.loop=!0;let a=t.createBiquadFilter();a.type="lowpass",a.frequency.value=380;let o=t.createGain();o.gain.value=.035,s.connect(a).connect(o).connect(this.master),s.start()}resume(){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}toggle(){return this.on=!this.on,this.master&&(this.master.gain.value=this.on?.55:0),this.on}ok(){return this.ctx&&this.on}burst({dur:t=.1,freq:e=1e3,type:n="bandpass",q:i=1,gain:s=.2,decay:a=t,delay:o=0}){let l=this.ctx,c=l.currentTime+o,h=l.createBufferSource();h.buffer=this.noise;let u=l.createBiquadFilter();u.type=n,u.frequency.value=e,u.Q.value=i;let d=l.createGain();d.gain.setValueAtTime(s,c),d.gain.exponentialRampToValueAtTime(1e-4,c+a),h.connect(u).connect(d).connect(this.master),h.start(c,Math.random()*1.5),h.stop(c+a+.05)}tone(t,e,n="sine",i=.08,s=0,a=null){let o=this.ctx,l=o.currentTime+s,c=o.createOscillator();c.type=n,c.frequency.setValueAtTime(t,l),a&&c.frequency.exponentialRampToValueAtTime(a,l+e);let h=o.createGain();h.gain.setValueAtTime(1e-4,l),h.gain.exponentialRampToValueAtTime(i,l+.012),h.gain.exponentialRampToValueAtTime(1e-4,l+e),c.connect(h).connect(this.master),c.start(l),c.stop(l+e+.05)}click(){this.ok()&&this.tone(880,.05,"sine",.05)}order(){this.ok()&&(this.tone(520,.07,"triangle",.08),this.tone(780,.09,"triangle",.08,.06))}alert(){if(!this.ok())return;let t=performance.now();t-this.lastAlert<1500||(this.lastAlert=t,this.tone(660,.12,"square",.035),this.tone(440,.16,"square",.035,.13))}fanfare(t,e=!1){if(!this.ok())return;(t?[523,659,784,e?1047:0]:[440,392,330,e?262:0]).forEach((i,s)=>i&&this.tone(i,e?.5:.28,"triangle",.07,s*(e?.16:.1)))}explosion(t=1){if(!this.ok()||t<.03)return;let e=performance.now();e-this.lastBoom<70||(this.lastBoom=e,this.burst({dur:1.1,freq:380+Math.random()*200,type:"lowpass",q:.7,gain:.5*t,decay:1}),this.tone(60+Math.random()*20,.45,"sine",.35*t,0,30))}battle(t,e){if(!(!this.ok()||t<.02))for(this.crackleAcc+=e*t*26;this.crackleAcc>1;){this.crackleAcc-=1;let n=Math.random()*.05;this.burst({dur:.06,freq:1800+Math.random()*1800,type:"bandpass",q:1.2,gain:(.05+Math.random()*.07)*Math.min(1,t*1.4),decay:.05+Math.random()*.05,delay:n})}}};var kn=r=>document.getElementById(r),Av=()=>new Promise(r=>requestAnimationFrame(()=>setTimeout(r,0))),Rv=7,id=class{constructor(){this.started=!1,this.last=performance.now(),this.weatherMix={fog:0,rain:0},this.dustAcc=0,this.bridgeCheck=0,this.perf={acc:0,frames:0,level:0}}adaptQuality(t){let e=this.perf;if(e.acc+=t,e.frames++,e.acc<2.5)return;let n=e.acc/e.frames;if(e.acc=0,e.frames=0,n<1/38||e.level>=3)return;e.level++;let i=this.rig.renderer;e.level===1&&i.getPixelRatio()>1?(i.setPixelRatio(1),this.rig.resize()):e.level<=2&&this.rig.useBloom?this.rig.useBloom=!1:e.level<=2?(this.rig.sun.shadow.mapSize.set(1024,1024),this.rig.sun.shadow.map?.dispose(),this.rig.sun.shadow.map=null):this.rig.sun.castShadow=!1}async boot(){let t=async(e,n)=>{kn("loadText").textContent=e,kn("loadBar").style.width=n+"%",await Av()};try{await t("Surveying the battlefield\u2026",6),this.map=new Ra(Rv).generate(),await t("Raising mountains and carving rivers\u2026",30),this.rig=new ec(kn("gl"),this.map);let e=Math.min(window.innerWidth,window.innerHeight)<700||/Mobi|Android/i.test(navigator.userAgent),n=this.rig.renderer.capabilities.maxTextureSize;this.terrain=new rc(this.rig,this.map,{texSize:e||n<4096?2048:3072}),await t("Planting forests and building towns\u2026",62),this.props=new ac(this.rig,this.map,{quality:e?.6:1}),await t("Mustering battalions\u2026",84),this.formations=new lc(this.rig,this.map),this.effects=new hc(this.rig,this.map),this.front=new dc(this.rig,this.map),this.hud=new uc(kn("hud"),this.rig,this.map),this.audio=new mc,this.game=new fr(this.map,"normal"),this.game.paused=!0,this.ui=new fc(this),this.minimap=new pc(kn("minimap"),this),await t("Ready.",100)}catch(e){console.error(e),kn("loadText").textContent="Could not start: "+(e&&e.message?e.message:e)+" \u2014 this game needs WebGL.";return}window.addEventListener("resize",()=>{this.rig.resize(),this.hud.resize(),this.minimap.resize()}),this.setupTitle(),kn("loading").classList.add("hidden"),kn("title").classList.remove("hidden"),this.rig.cam={x:1650,z:980,dist:1500,yaw:-.5},this.rig.want={...this.rig.cam},requestAnimationFrame(e=>this.frame(e))}setupTitle(){let t="normal";document.querySelectorAll("#difficulty button").forEach(e=>e.addEventListener("click",()=>{t=e.dataset.diff,document.querySelectorAll("#difficulty button").forEach(n=>n.classList.toggle("active",n===e))})),kn("startBtn").addEventListener("click",()=>this.start(t))}start(t){this.audio.init(),this.audio.resume(),this.game=new fr(this.map,t),this.wire(this.game),this.ui.selected=[],this.ui.feed=[],this.started=!0,kn("title").classList.add("hidden"),kn("ui").classList.remove("hidden"),this.minimap.resize(),this.rig.want={x:1450,z:1e3,dist:1350,yaw:0},this.ui.renderFeed(),this.ui.renderTop(),this.ui.addFeed({kind:"info",icon:"\u2691",text:"The war begins. Hold the line and break through the Stone front."}),this.ui.addFeed({kind:"info",icon:"\u25CE",text:"Objectives: Fort Kazan, the Eastern Bridge, Vorsk and Kharzad."}),this.ui.banner({text:"THE WAR BEGINS",sub:"Push the Stone Dominion back. Capture the \u25CE objectives.",kind:"info",big:!0}),window.__app=this}wire(t){let e=()=>performance.now()/1e3;t.on("feed",n=>this.ui.addFeed(n)),t.on("banner",n=>this.ui.banner(n)),t.on("float",n=>this.hud.float(n.x,n.y,n.text,n.side)),t.on("captured",({cell:n,side:i})=>this.terrain.flash(n,i,e())),t.on("locationCaptured",({loc:n,side:i})=>{this.props.updateFlags(),this.props.updateBeacons(),n.type!=="village"?(this.effects.ring(n.x,n.y,i,220),setTimeout(()=>this.effects.ring(n.x,n.y,i,150),250)):this.effects.ring(n.x,n.y,i,90)}),t.on("shell",({x:n,y:i})=>this.effects.shell(n,i)),t.on("explosion",({x:n,y:i,big:s})=>this.effects.explosion(n,i,s)),t.on("bridge",({bridge:n,destroyed:i})=>this.props.setBridgeDestroyed(n.id,i)),t.on("unitDestroyed",n=>{this.effects.explosion(n.x,n.y,!0),this.effects.explosion(n.x+15,n.y-10,!1)}),t.on("gameOver",n=>setTimeout(()=>this.ui.showEnd(n),1200)),this.effects.onBoom=(n,i,s)=>{let a=Math.hypot(n-this.rig.cam.x,i-this.rig.cam.z),o=$t(1-a/(this.rig.cam.dist*1.4),0,1)*$t(900/this.rig.cam.dist,.25,1);this.audio.explosion(o*(s?1:.7))}}battleFx(t){let e=this.game;if(e.paused||e.over)return;let n=this.rig,i=this.effects,s=Math.sqrt(e.speed),a=n.cam.dist,o=a>1900?.3:a>1200?.6:1,l=0,c=h=>this.formations.state.get(h.id);for(let h of e.combat.battles){if(h.over)continue;let u=h.attackers.map(c).filter(b=>b&&b.front.length),d=h.defenders.map(c).filter(b=>b&&b.front.length);if(!u.length||!d.length)continue;let f=Math.hypot(h.x-n.cam.x,h.y-n.cam.z);l=Math.max(l,$t(1-f/(a*1.3),0,1)*$t(1e3/a,.2,1));let p=h.fx||(h.fx={m:0,t:0,e:0,s:0}),y=.6+Math.min(1.4,(h.attackers.length+h.defenders.length)*.25);p.m+=t*26*o*s*y,p.t+=t*12*o*s*y;let g=[...h.attackers,...h.defenders].filter(b=>b.type==="heavy").length;p.e+=t*(.45+g*.8)*s,p.s+=t*2.2*o;let m=b=>b[Math.floor(Math.random()*b.length)];for(;p.m>1;){p.m-=1;let b=m(m(Math.random()<.5?u:d).front);i.muzzle(b[0]+(Math.random()-.5)*3,b[1],b[2]+(Math.random()-.5)*3)}for(;p.t>1;){p.t-=1;let b=Math.random()<.5,E=m(m(b?u:d).front),_=m(b?d:u).center,S=[_[0]+(Math.random()-.5)*34,_[1]+3+Math.random()*4,_[2]+(Math.random()-.5)*34];i.tracer(E,S,b?[1,.82,.4]:[1,.62,.32],.12+Math.random()*.1)}for(;p.e>1;){p.e-=1;let b=Math.random()<h.adv,E=m(b?d:u).center,_=E[0]+(Math.random()-.5)*60,S=E[2]+(Math.random()-.5)*60;i.explosion(_,S,Math.random()<.25)}for(;p.s>1;){p.s-=1;let b=m(Math.random()<.5?u:d).center;i.dust(b[0]+(Math.random()-.5)*40,b[2]+(Math.random()-.5)*40)}}this.audio.battle(l,t)}marchDust(t){let e=this.game;if(e.paused||(this.dustAcc+=t,this.dustAcc<.22))return;this.dustAcc=0;let n=this.rig;if(!(n.cam.dist>1400))for(let i of e.units)!i.alive||!i.moving||!i.speedNow||!e.isVisible(i)||Math.hypot(i.x-n.cam.x,i.y-n.cam.z)>n.cam.dist*1.2||this.effects.dust(i.x-Math.cos(i.heading)*18,i.y-Math.sin(i.heading)*18)}weatherVisuals(t){let e=this.game.weather.type,n=1-Math.exp(-t*.8);this.weatherMix.fog=_e(this.weatherMix.fog,e==="fog"?1:0,n),this.weatherMix.rain=_e(this.weatherMix.rain,e==="rain"?1:0,n);let i=this.rig,s=this.weatherMix.fog,a=this.weatherMix.rain;i.scene.fog.near*=1-s*.75,i.scene.fog.far*=1-s*.62-a*.25,i.scene.fog.color.setRGB(_e(.79,.74,a)+s*.04,_e(.84,.77,a)+s*.02,_e(.86,.8,a)),i.scene.background.copy(i.scene.fog.color),i.sun.intensity=2.6*(1-a*.45-s*.3),i.hemi.intensity=1.25*(1-a*.2)}frame(t){let e=t/1e3,n=Math.min(.05,(t-this.last)/1e3);this.last=t,window.__noAdapt||this.adaptQuality(n);let i=this.game;if(this.started?(i.update(n),this.ui.update(n)):this.rig.want.yaw+=n*.035,this.rig.updateCamera(n),this.weatherVisuals(n),this.terrain.update(e,i.territory.version),this.front.update(e,i.territory,this.rig.cam.dist),this.props.update(e,this.rig.cam.dist),this.formations.update(e,n,i,this.started?this.ui.selected:[],this.ui.hover&&this.ui.hover.side===ot&&this.ui.commandable().length?this.ui.hover:null),this.started&&(this.battleFx(n),this.marchDust(n),this.bridgeCheck+=n,this.bridgeCheck>1)){this.bridgeCheck=0;for(let s of this.map.bridges)this.props.setBridgeDestroyed(s.id,s.destroyedUntil>i.time)}this.effects.update(n,e,i.weather.type),this.rig.render(),this.started?(this.hud.draw(e,i,this.ui),this.minimap.draw(e,i)):(this.hud.ctx.setTransform(1,0,0,1,0,0),this.hud.ctx.clearRect(0,0,this.hud.canvas.width,this.hud.canvas.height)),requestAnimationFrame(s=>this.frame(s))}},ip=new id;window.__app=ip;ip.boot();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
//# sourceMappingURL=game.js.map
