const ideas = Array.from({length:31},(_,i)=>({
 title:`Day ${i+1}`,
 text:`Replace this with your idea for Day ${i+1}.`,
 link:"",
 nsfw:false
}));

const opened=JSON.parse(localStorage.getItem("bm-opened")||"[]");
const grid=document.getElementById("grid");
const modal=document.getElementById("modal");

const update=()=>{
 document.getElementById("counter").textContent=`${opened.length} / ${ideas.length} opened`;
 document.getElementById("bar").style.width=(opened.length/ideas.length*100)+'%';
}
update();

ideas.forEach((idea,i)=>{
 const c=document.createElement("div");
 c.className="card"+(opened.includes(i)?" opened":"");
 c.innerHTML=`${String(i+1).padStart(2,"0")}${idea.nsfw?'<span class="badge">🔥</span>':''}`;
 c.onclick=()=>{
  document.getElementById("dayTag").textContent=`Day ${i+1}`;
  document.getElementById("title").textContent=idea.title;
  document.getElementById("text").textContent=idea.text;
  const a=document.getElementById("link");
  if(idea.link){a.href=idea.link;a.style.display="inline-block";}
  else{a.style.display="none";}
  modal.showModal();
  if(!opened.includes(i)){opened.push(i);localStorage.setItem("bm-opened",JSON.stringify(opened));c.classList.add("opened");update();}
 };
 grid.appendChild(c);
});
document.getElementById("close").onclick=()=>modal.close();
modal.addEventListener("click",e=>{if(e.target===modal)modal.close();});
