const navToggle=document.getElementById('nav-toggle');const navMenu=document.getElementById('nav-menu');const navClose=document.getElementById('nav-close');const navLinks=document.querySelectorAll('.nav__link');const header=document.getElementById('header');

if(navToggle){navToggle.addEventListener('click',()=>{navMenu.classList.add('show')})}
if(navClose){navClose.addEventListener('click',()=>{navMenu.classList.remove('show')})}
navLinks.forEach(link=>{link.addEventListener('click',()=>{navMenu.classList.remove('show')})});
document.addEventListener('click',(e)=>{if(navMenu&&navMenu.classList.contains('show')){if(!navMenu.contains(e.target)&&!navToggle.contains(e.target)){navMenu.classList.remove('show')}}});

window.addEventListener('scroll',()=>{if(window.pageYOffset>80){header.classList.add('scrolled')}else{header.classList.remove('scrolled')}});

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{anchor.addEventListener('click',function(e){const href=this.getAttribute('href');if(href==='#'||href===''){e.preventDefault();return}const target=document.querySelector(href);if(target){e.preventDefault();const headerOffset=100;const elementPosition=target.getBoundingClientRect().top;const offsetPosition=elementPosition+window.pageYOffset-headerOffset;window.scrollTo({top:offsetPosition,behavior:'smooth'})}})});

const carousel3D=document.getElementById('carousel-3d');const carouselPrev=document.getElementById('carousel-prev');const carouselNext=document.getElementById('carousel-next');const carouselDots=document.querySelectorAll('.carousel-dot');const carouselCards=document.querySelectorAll('.carousel-card');let currentRotation=0;let currentIndex=0;const totalCards=3;

function updateCardsOpacity(){carouselCards.forEach((card,index)=>{if(index===currentIndex){card.style.opacity='1';card.style.pointerEvents='auto';card.style.zIndex='3'}else{card.style.opacity='0.4';card.style.pointerEvents='none';card.style.zIndex='1'}})}

function rotateCarousel(direction){if(direction==='next'){currentRotation-=120;currentIndex=(currentIndex+1)%totalCards}else{currentRotation+=120;currentIndex=(currentIndex-1+totalCards)%totalCards}
if(carousel3D){carousel3D.style.transform=`rotateY(${currentRotation}deg)`}
carouselDots.forEach((dot,index)=>{dot.classList.toggle('active',index===currentIndex)});updateCardsOpacity()}

if(carouselNext){carouselNext.addEventListener('click',()=>rotateCarousel('next'))}
if(carouselPrev){carouselPrev.addEventListener('click',()=>rotateCarousel('prev'))}
carouselDots.forEach((dot,index)=>{dot.addEventListener('click',()=>{const diff=(index-currentIndex+totalCards)%totalCards;for(let i=0;i<diff;i++){rotateCarousel('next')}})});

let autoRotate=setInterval(()=>rotateCarousel('next'),4000);
if(carousel3D){carousel3D.addEventListener('mouseenter',()=>clearInterval(autoRotate));carousel3D.addEventListener('mouseleave',()=>{autoRotate=setInterval(()=>rotateCarousel('next'),4000)})}

updateCardsOpacity();

document.querySelectorAll('.streaming-scroll').forEach(container=>{const scrollContainer=container.querySelector('.streaming-scroll__container');const btnLeft=container.querySelector('.streaming-nav--left');const btnRight=container.querySelector('.streaming-nav--right');
if(!scrollContainer)return;
if(btnLeft){btnLeft.addEventListener('click',()=>{scrollContainer.scrollBy({left:-340,behavior:'smooth'})})}
if(btnRight){btnRight.addEventListener('click',()=>{scrollContainer.scrollBy({left:340,behavior:'smooth'})})}});

const observerOptions={threshold:0.1,rootMargin:'0px 0px -50px 0px'};
const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}})},observerOptions);

window.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.project-card-unified, .category-card').forEach(element=>{element.classList.add('scroll-reveal');observer.observe(element)});const currentPage=window.location.pathname.split('/').pop()||'index.html';navLinks.forEach(link=>{const linkPage=link.getAttribute('href');if(linkPage===currentPage){link.classList.add('active')}})});

console.log('%cBienvenue sur javed.fr! 👋','font-size:20px;font-weight:bold;color:#3B82F6');
