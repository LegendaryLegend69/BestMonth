const opened=JSON.parse(localStorage.getItem('opened')||'[]');

fetch('ideas.json')
.then(r=>r.json())
.then(ideas=>{
 const grid=document.getElementById('grid');
 ideas.forEach((idea,i)=>{
   const c=document.createElement('div');
   c.className='card'+(opened.includes(i)?' open':'');
   c.innerHTML=String(i+1).padStart(2,'0')+(idea.nsfw?'<span class="badge">🔥</span>':'');
   c.onclick=()=>{
      day.textContent='Day '+(i+1);
      title.textContent=idea.title;
      text.textContent=idea.text;
      if(idea.link){link.style.display='inline-block';link.href=idea.link;}
      else{link.style.display='none';}
      modal.showModal();
      if(!opened.includes(i)){opened.push(i);localStorage.setItem('opened',JSON.stringify(opened));c.classList.add('open');}
   };
   grid.appendChild(c);
 });
});
close.onclick=()=>modal.close();
modal.onclick=e=>{if(e.target===modal)modal.close();};