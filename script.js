const prefersReducedMotion = window.matchMedia(
"(prefers-reduced-motion: reduce)"
).matches;

gsap.registerPlugin(ScrollTrigger);

if (!prefersReducedMotion) {

const lenis = new Lenis({
duration:1.1,
easing:(t)=>Math.min(1,1.001-Math.pow(2,-10*t)),
smoothWheel:true
});

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time)=>lenis.raf(time*1000));
gsap.ticker.lagSmoothing(0);

}

const header = document.getElementById("site-header");
let lastScrollY = 0;

window.addEventListener("scroll",()=>{

const currentY = window.scrollY;

if(currentY > lastScrollY && currentY > 120){
header.classList.add("is-hidden");
}else{
header.classList.remove("is-hidden");
}

lastScrollY = currentY;

});

function escapeHtml(text){
const div=document.createElement("div");
div.textContent=text;
return div.innerHTML;
}

function buildRow(entry){

return `
<tr class="data-row">
<td>${entry.rank}</td>
<td>${escapeHtml(entry.name)}</td>
<td>${entry.bookings}</td>
</tr>
`;

}

fetch("data.json")
.then(res=>res.json())
.then(data=>{

document.getElementById("flyers-body").innerHTML =
data.topFlyers.map(buildRow).join("");

document.getElementById("packages-body").innerHTML =
data.topPackages.map(buildRow).join("");

})
.catch(()=>{
document.getElementById("flyers-body").innerHTML =
"<tr><td colspan='3'>Leaderboard unavailable</td></tr>";
});