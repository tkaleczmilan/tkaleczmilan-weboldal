(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function(id){return document.getElementById(id)};

  // mobil menü
  var nav=document.querySelector('nav'), menuBtn=$('menuBtn');
  if(nav&&menuBtn){
    menuBtn.addEventListener('click',function(){var o=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',o?'true':'false')});
    nav.querySelectorAll('.links a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')})});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.focus()}});
  }

  // előtte-utána csúszka (ha van az oldalon)
  var box=$('ba'), r=$('baRange');
  if(box&&r){
    var setPos=function(v){box.style.setProperty('--pos',v+'%')};
    r.addEventListener('input',function(){setPos(r.value)});
    setPos(50);
    if(!reduce && 'IntersectionObserver' in window){
      var played=false;
      new IntersectionObserver(function(es,o){es.forEach(function(e){
        if(e.isIntersecting && !played){played=true;o.disconnect();
          var t0=null;(function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/1800,1);
            var v=50+Math.sin(p*Math.PI*2)*28*(1-p);setPos(v.toFixed(1));r.value=v;
            if(p<1)requestAnimationFrame(step)})(performance.now())}
      })},{threshold:.5}).observe(box);
    }
  }

  // névkártya: whoami, utána kiírja a nevet
  (function(){
    var cmd=$('idCmd'),nm=$('idName'),role=$('idRole');
    if(reduce||!cmd||!nm||!role)return;
    var c=cmd.textContent,n=nm.textContent;cmd.textContent='';nm.textContent='';role.style.opacity=0;
    var i=0;
    (function t1(){cmd.textContent=c.slice(0,++i);if(i<c.length)setTimeout(t1,45);else setTimeout(function(){i=0;t2()},350)})();
    function t2(){nm.textContent=n.slice(0,++i);if(i<n.length)setTimeout(t2,55);else role.style.opacity=1}
  })();

  // gombok, amik előre kiválasztják az űrlap témáját
  document.querySelectorAll('[data-tema]').forEach(function(a){
    a.addEventListener('click',function(){var s=$('tema');if(s)s.value=a.getAttribute('data-tema')});
  });
  // az aloldal saját témája alapból
  var pageTema=document.body.getAttribute('data-page-tema');
  if(pageTema&&$('tema'))$('tema').value=pageTema;

  // terminál
  var term=$('term');
  if(term){
    var lines=[
      ['p','$ ','atadas-elotti-ellenorzes'],
      ['ok','✓ ','Windows telepítve, frissítve'],
      ['ok','✓ ','Illesztőprogramok rendben'],
      ['ok','✓ ','Kártevő-ellenőrzés: tiszta'],
      ['ok','✓ ','Adatok átmásolva'],
      ['p','$ ','kész, átadható']
    ];
    term.innerHTML=lines.map(function(l){return '<div><span class="'+l[0]+'">'+l[1]+'</span>'+l[2]+'</div>'}).join('')+'<span class="caret"></span>';
    if(!reduce && 'IntersectionObserver' in window){
      var typed=false;
      new IntersectionObserver(function(es,o){es.forEach(function(e){
        if(e.isIntersecting && !typed){typed=true;o.disconnect();
          term.innerHTML='';var i=0,j=0,row=null;
          (function tick(){
            if(i>=lines.length){term.insertAdjacentHTML('beforeend','<span class="caret"></span>');return}
            var l=lines[i];
            if(j===0){row=document.createElement('div');row.innerHTML='<span class="'+l[0]+'">'+l[1]+'</span><span></span>';term.appendChild(row)}
            row.lastChild.textContent=l[2].slice(0,++j);
            if(j>=l[2].length){i++;j=0;setTimeout(tick,l[0]==='ok'?160:380)}else setTimeout(tick,l[0]==='p'?28:12);
          })();
        }
      })},{threshold:.6}).observe(term);
    }
  }

  // nagyító
  function openLb(src,alt,back){
    var lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-label','Kép nagyítva');
    var btn=document.createElement('button');btn.type='button';btn.textContent='Bezárás ✕';
    var im=document.createElement('img');im.src=src;im.alt=alt||'';
    lb.appendChild(btn);lb.appendChild(im);
    function close(){lb.remove();document.removeEventListener('keydown',esc);if(back)back.focus()}
    function esc(k){if(k.key==='Escape')close()}
    lb.addEventListener('click',function(ev){if(ev.target!==im)close()});
    document.addEventListener('keydown',esc);
    document.body.appendChild(lb);btn.focus();
  }

  // felnis gép galéria
  var stage=$('stage');
  if(stage){
    var imgs=stage.querySelectorAll('img'), th=document.querySelectorAll('#thumbs button'), cap=$('cap'), cur=0;
    var show=function(n){cur=(n+imgs.length)%imgs.length;imgs.forEach(function(im,i){im.classList.toggle('cur',i===cur)});th.forEach(function(b,i){b.classList.toggle('on',i===cur)});cap.textContent=(cur+1)+' / '+imgs.length};
    th.forEach(function(b,i){b.addEventListener('click',function(){show(i)})});
    stage.addEventListener('click',function(){openLb(imgs[cur].src,imgs[cur].alt,stage)});
    stage.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();openLb(imgs[cur].src,imgs[cur].alt,stage)}
      if(e.key==='ArrowRight')show(cur+1); if(e.key==='ArrowLeft')show(cur-1);
    });
  }
  ['builds','gal'].forEach(function(id){
    var el=$(id);if(!el)return;
    el.addEventListener('click',function(e){
      var b=e.target.closest('button');if(!b)return;var im=b.querySelector('img');openLb(im.src,im.alt,b);
    });
  });

  // kapcsolati űrlap -> /api/contact (Resend)
  var form=$('f'),note=$('note'),sendBtn=$('sendBtn');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var d={};new FormData(form).forEach(function(v,k){d[k]=v});
      sendBtn.disabled=true;note.textContent='Küldés…';
      fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})
        .then(function(r){return r.json().catch(function(){return {}}).then(function(j){if(!r.ok||!j.success){var er=new Error(j.error||('HTTP '+r.status));er.server=true;throw er}return j})})
        .then(function(){form.reset();if(pageTema&&$('tema'))$('tema').value=pageTema;note.textContent='Köszönöm, megkaptam az üzeneted! Hamarosan jelentkezem.'})
        .catch(function(err){console.warn('Űrlap hiba:',err);var why=err&&err.server&&err.message?' ('+err.message+')':'';note.textContent='Nem sikerült elküldeni'+why+'. Írj a tkaleczmilan@gmail.com címre, vagy hívj: +36 30 243 6073.'})
        .finally(function(){sendBtn.disabled=false});
    });
  }
})();
