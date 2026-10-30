const WA = "2347025397659", PHONE = "0702 539 7659", TEL = "07025397659", ADDR = "No 3 Jogger Road, Nigeria", BUNDLE_OFF = 500;
const P = [
 {id:"moisturizer",name:"Neutrogena Hydro Boost Water Gel",tag:"Moisturizer",img:"assets/moisturizer.jpg",price:2000,desc:"A light, bouncy gel with hyaluronic acid that keeps your skin hydrated and plump all day."},
 {id:"perfume",name:"Bleu de Chanel Eau de Parfum",tag:"Perfume",img:"assets/perfume.jpg",price:2000,desc:"A deep, fresh and woody scent that feels confident from morning to night."},
 {id:"hair-oil",name:"Dabur Amla Hair Oil",tag:"Hair oil",img:"assets/hair-oil.jpg",price:2000,desc:"Nourishing amla oil for hair that feels stronger, softer and shinier."}
];
const R = [
 ["moisturizer",5,"Amaka O.","My face feels soft and fresh all day, and it sits well under makeup."],
 ["moisturizer",5,"Chinelo M.","Lightweight and cooling. I stopped feeling tight and dry after washing my face."],
 ["perfume",5,"Tunde A.","I got compliments the first day I wore it. The scent lasts and feels classy."],
 ["perfume",4,"Emeka N.","Great scent for work and for evenings out. Ordering again soon."],
 ["hair-oil",5,"Ngozi E.","My hair feels smoother and easier to comb. The smell is lovely too."],
 ["hair-oil",5,"Halima S.","Good for my dry ends. Ordering on WhatsApp was quick and easy."]
];
const T = [
 ["Amaka O.","I was tired of products that promised too much. Skinny cossy was honest about what would work for my skin, and I’m glad I listened."],
 ["Tunde A.","Ordering took two minutes on WhatsApp and I always get a reply fast. That is rare these days."],
 ["Ngozi E.","Simple prices, no confusion. I picked my products and my order came exactly as I asked."]
];
const $ = s => document.querySelector(s);
const money = n => "₦" + n.toLocaleString("en-NG");
const stars = n => "★".repeat(n) + "☆".repeat(5 - n);
const wa = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;

let cart = {};
try {
 const c = JSON.parse(localStorage.getItem("sc_cart")) || {};
 P.forEach(p => { const q = parseInt(c[p.id], 10); if (q > 0) cart[p.id] = Math.min(q, 20); });
} catch (e) {}
const save = () => { try { localStorage.setItem("sc_cart", JSON.stringify(cart)); } catch (e) {} };
const count = () => Object.values(cart).reduce((a, b) => a + b, 0);
const sub = () => P.reduce((s, p) => s + p.price * (cart[p.id] || 0), 0);
const saving = () => P.every(p => cart[p.id] > 0) ? BUNDLE_OFF * Math.min(...P.map(p => cart[p.id])) : 0;
const total = () => sub() - saving();

/* layout shared by both pages */
const onAbout = /about/.test(location.pathname);
const link = (h, t, on) => `<a href="${h}"${on ? ' class="on"' : ""}>${t}</a>`;
document.body.insertAdjacentHTML("afterbegin", `
<div class="announce">Order in minutes on WhatsApp. Every product is just ${money(2000)}.</div>
<header><div class="wrap bar">
 <a class="logo" href="index.html"><i></i>Skinny cossy</a>
 <nav id="nav" aria-label="Main">${link("index.html#products","Products")}${link("index.html#reviews","Reviews")}${link("about.html","About us",onAbout)}${link("index.html#feedback","Feedback")}</nav>
 <div class="tools">
  <button class="cartbtn" data-open aria-label="Open cart">Cart<b id="cartCount" data-n="0">0</b></button>
  <button id="menu" aria-expanded="false" aria-controls="nav">Menu</button>
 </div>
</div></header>`);
document.body.insertAdjacentHTML("beforeend", `
<footer><div class="wrap">
 <div class="fg">
  <div><h3>Skinny cossy</h3><p>Skincare, fragrance and hair care at one friendly price. Order in minutes on WhatsApp.</p></div>
  <div><h3>Visit and call</h3><a href="tel:${TEL}">${PHONE}</a><a>${ADDR}</a><a href="${wa("Hello Skinny cossy, I have a question.")}" target="_blank" rel="noopener">Chat on WhatsApp</a></div>
  <div><h3>Explore</h3><a href="index.html#products">Products</a><a href="index.html#reviews">Reviews</a><a href="about.html">About us</a><a href="index.html#feedback">Feedback</a></div>
 </div>
 <p class="copy">© ${new Date().getFullYear()} Skinny cossy. All rights reserved.</p>
</div></footer>
<div class="ov" data-close></div>
<aside class="drawer" id="drawer" aria-label="Shopping cart">
 <div class="dh"><h3>Your cart</h3><button data-close aria-label="Close cart">✕</button></div>
 <div id="cartItems"></div>
 <div class="df">
  <div class="tot"><span>Subtotal</span><span id="sub"></span></div>
  <div class="tot save" id="saveRow" hidden><span>Bundle saving</span><span id="save"></span></div>
  <div class="tot big"><span>Total</span><span id="total"></span></div>
  <button class="btn green" id="checkout">Order on WhatsApp</button>
  <p class="note">Your order opens in WhatsApp. We’ll confirm delivery details with you there.</p>
 </div>
</aside>
<button class="btn rose mbar" id="mbar" data-open></button>
<a class="wa" href="${wa("Hello Skinny cossy, I’d like to ask about your products.")}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>`);
$("#drawer").inert = true;

/* products, reviews, testimonials */
const avg = id => { const r = R.filter(x => x[0] === id); return r.length ? { n: r.length, a: Math.round(r.reduce((s, x) => s + x[1], 0) / r.length) } : null; };
if ($("#grid")) $("#grid").innerHTML = P.map(p => {
 const r = avg(p.id);
 return `<article class="card"><img src="${p.img}" alt="${p.name}" loading="lazy" width="259" height="340"><div class="in">
  <span class="tag">${p.tag}</span><h3>${p.name}</h3>
  ${r ? `<div class="stars" aria-label="${r.a} out of 5 stars">${stars(r.a)}<small>${r.n} reviews</small></div>` : ""}
  <p>${p.desc}</p><div class="price">${money(p.price)}</div>
  <div class="acts"><button class="btn rose sm" data-add="${p.id}">Add to cart</button><button class="btn ghost sm" data-buy="${p.id}">Buy now</button></div>
 </div></article>`;
}).join("");
if ($("#reviewList")) {
 const all = R.map(x => x[1]), a = (all.reduce((s, x) => s + x, 0) / all.length).toFixed(1);
 $("#avg").innerHTML = `<span class="stars">${stars(Math.round(a))}</span> ${a} average from ${all.length} customer reviews`;
 $("#reviewList").innerHTML = R.map(x => `<div class="rev"><div class="stars" aria-label="${x[1]} out of 5 stars">${stars(x[1])}</div><p>${x[3]}</p><b>${x[2]}</b><small>${P.find(p => p.id === x[0]).name}</small></div>`).join("");
}
if ($("#testi")) $("#testi").innerHTML = T.map(x => `<div class="rev"><div class="stars">${stars(5)}</div><p>${x[1]}</p><b>${x[0]}</b><small>Happy customer</small></div>`).join("");

/* cart */
function draw() {
 save();
 const items = P.filter(p => cart[p.id]), n = count(), s = saving();
 $("#cartItems").innerHTML = items.length ? items.map(p => `<div class="line"><img src="${p.img}" alt=""><div><b>${p.name}</b><span>${money(p.price)}</span><div class="qty"><button data-q="${p.id}" data-d="-1" aria-label="Remove one ${p.tag}">−</button><i>${cart[p.id]}</i><button data-q="${p.id}" data-d="1" aria-label="Add one ${p.tag}">+</button></div></div><button class="x" data-x="${p.id}" aria-label="Remove ${p.name}">✕</button></div>`).join("") : '<p class="empty">Your cart is empty. Add a product and it will show up here.</p>';
 $("#cartCount").textContent = n; $("#cartCount").dataset.n = n;
 $("#sub").textContent = money(sub());
 $("#saveRow").hidden = !s; $("#save").textContent = "−" + money(s);
 $("#total").textContent = money(total());
 $("#checkout").disabled = !n;
 $("#mbar").textContent = `View cart (${n}) · ${money(total())}`;
 document.body.classList.toggle("has-cart", n > 0);
}
function setCart(open) {
 document.body.classList.toggle("cart-open", open);
 $("#drawer").inert = !open;
 if (open) $("#drawer .dh button").focus();
}
function order(list, t) {
 const lines = list.map(([p, q]) => `• ${q} x ${p.name} (${money(p.price * q)})`).join("\n");
 window.open(wa(`Hello Skinny cossy, I’d like to order:\n${lines}\n\nTotal: ${money(t)}\n\nName:\nDelivery address:`), "_blank", "noopener");
}
document.addEventListener("click", e => {
 const t = e.target.closest("[data-add],[data-buy],[data-q],[data-x],[data-open],[data-close],[data-bundle],#checkout,#menu,#nav a");
 if (!t) return;
 const d = t.dataset;
 if (d.add) { cart[d.add] = Math.min((cart[d.add] || 0) + 1, 20); draw(); setCart(true); }
 else if (d.buy) order([[P.find(p => p.id === d.buy), 1]], P.find(p => p.id === d.buy).price);
 else if (d.q) { cart[d.q] = Math.min((cart[d.q] || 0) + Number(d.d), 20); if (cart[d.q] <= 0) delete cart[d.q]; draw(); }
 else if (d.x) { delete cart[d.x]; draw(); }
 else if (d.bundle !== undefined) { P.forEach(p => { cart[p.id] = Math.max(cart[p.id] || 0, 1); }); draw(); setCart(true); }
 else if (t.hasAttribute("data-open")) setCart(true);
 else if (t.hasAttribute("data-close")) setCart(false);
 else if (t.id === "checkout") order(P.filter(p => cart[p.id]).map(p => [p, cart[p.id]]), total());
 else if (t.id === "menu") t.setAttribute("aria-expanded", $("#nav").classList.toggle("open"));
 else { $("#nav").classList.remove("open"); $("#menu").setAttribute("aria-expanded", "false"); }
});
document.addEventListener("keydown", e => { if (e.key === "Escape") setCart(false); });
draw();

/* feedback form */
if ($("#fb")) $("#fb").addEventListener("submit", e => {
 e.preventDefault();
 window.open(wa(`Feedback for Skinny cossy\nName: ${$("#fn").value}\nRating: ${$("#fr").value} out of 5\nMessage: ${$("#fm").value}`), "_blank", "noopener");
 $("#fb").reset();
 $("#fdone").textContent = "Thank you! Your feedback is ready to send in WhatsApp.";
});
