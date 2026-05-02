
let providers = [
{id:1,name:"DJ Marco",city:"CDMX",price:5000},
{id:2,name:"Flores de Luna",city:"Guadalajara",price:3000},
{id:3,name:"FotoPro Studio",city:"Monterrey",price:4500}
];

function save(key,value){localStorage.setItem(key,JSON.stringify(value));}
function get(key){return JSON.parse(localStorage.getItem(key));}

function register(){
let users=get("users")||[];
let user={name:regName.value,email:regEmail.value,pass:regPass.value,role:role.value};
users.push(user);
save("users",users);
msg.innerText="Registro exitoso";
}

function login(){
let users=get("users")||[];
let user=users.find(u=>u.email===email.value && u.pass===password.value);
if(user){save("currentUser",user);window.location="dashboard.html";}
else{msg.innerText="Datos incorrectos";}
}

function logout(){localStorage.removeItem("currentUser");window.location="index.html";}

function renderProviders(){
let city=filterCity.value;
let list=city?providers.filter(p=>p.city===city):providers;
providerList.innerHTML="";
list.forEach(p=>{
providerList.innerHTML+=`<div class='card'>
<h3>${p.name}</h3>
<p>${p.city}</p>
<p>$${p.price}</p>
<a class='btn primary' href='profile.html?id=${p.id}'>Ver perfil</a>
</div>`;
});
}

if(window.location.pathname.includes("marketplace")){renderProviders();}

if(window.location.pathname.includes("profile")){
let id=new URLSearchParams(window.location.search).get("id");
let p=providers.find(x=>x.id==id);
provName.innerText=p.name;
provCity.innerText=p.city;
provPrice.innerText="$"+p.price;
renderReviews(id);
}

function hire(){
let events=get("events")||[];
events.push({provider:provName.innerText,date:new Date().toLocaleDateString()});
save("events",events);
alert("Contratación simulada exitosa");
}

function renderReviews(id){
let reviews=get("reviews")||{};
let list=reviews[id]||[];
document.getElementById("reviews").innerHTML=list.map(r=>`<p>${"⭐".repeat(r.stars)} ${r.text}</p>`).join("");
}

function addReview(){
let id=new URLSearchParams(window.location.search).get("id");
let reviews=get("reviews")||{};
if(!reviews[id])reviews[id]=[];
reviews[id].push({text:reviewText.value,stars:parseInt(reviewStars.value)});
save("reviews",reviews);
renderReviews(id);
}

if(window.location.pathname.includes("dashboard")){
let events=get("events")||[];
events.forEach(e=>eventsDiv.innerHTML+=`<p>${e.provider} - ${e.date}</p>`);
}

let messages=get("chat")||[];
function sendMessage(){
messages.push(chatInput.value);
save("chat",messages);
chatBox.innerHTML=messages.map(m=>`<p>${m}</p>`).join("");
chatInput.value="";
}
