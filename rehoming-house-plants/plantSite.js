/* ---- contact details wiring ---- */
(function(){
  var el = document.getElementById('emailLink');
  el.textContent = CONTACT_EMAIL;
  el.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent('Plant estimate request');
  var pRow = document.getElementById('phoneRow');
  if(CONTACT_PHONE && CONTACT_PHONE.trim()){
    var p = document.getElementById('phoneLink');
    p.textContent = CONTACT_PHONE;
    p.href = 'tel:' + CONTACT_PHONE.replace(/[^0-9+]/g,'');
  } else { pRow.style.display='none'; }
  document.getElementById('year').textContent = new Date().getFullYear();
})();

/* ---- sticky header ---- */
var header = document.getElementById('site-header');
function onScroll(){ header.classList.toggle('scrolled', window.scrollY > 40); }
onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

/* ---- mobile menu ---- */
var menuBtn = document.getElementById('menuBtn');
var navlinks = document.getElementById('navlinks');
menuBtn.addEventListener('click', function(){
  var open = navlinks.classList.toggle('open');
  menuBtn.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open);
  header.classList.add('scrolled');
});
navlinks.querySelectorAll('a').forEach(function(a){
  a.addEventListener('click', function(){ navlinks.classList.remove('open'); menuBtn.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); });
});

/* ---- reveal on scroll ---- */
var io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('[data-reveal]').forEach(function(n){ io.observe(n); });

/* ---- inquiry form -> mailto ---- */
document.getElementById('sendBtn').addEventListener('click', function(){
  var name = document.getElementById('f-name').value.trim();
  var email = document.getElementById('f-email').value.trim();
  var phone = document.getElementById('f-phone').value.trim();
  var msg = document.getElementById('f-msg').value.trim();
  var body =
    "Name: " + (name||"—") + "\n" +
    "Email: " + (email||"—") + "\n" +
    "Phone: " + (phone||"—") + "\n\n" +
    "What I'd like done:\n" + (msg||"—") + "\n\n" +
    "(Reminder: attach photos of the plant before sending.)";
  var href = "mailto:" + CONTACT_EMAIL +
    "?subject=" + encodeURIComponent("Plant estimate request — " + (name||"New inquiry")) +
    "&body=" + encodeURIComponent(body);
  window.location.href = href;
});