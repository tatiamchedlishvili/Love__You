const memories = [
  {
    type: "image",
    src: "images/1.jpg",
    caption: "ჩემი ღიმილის მიზეზი ხარ ❤️"
  },

  {
    type: "video",
    src: "videos/v1.mp4",
    caption: "შენთან ყოფნა ყველაზე მეტად მიყვარს✨"
  },

  {
    type: "image",
    src: "images/2.jpg",
    caption: "შენთან ერთად ჩვეულებრივი დღეც განსაკუთრებულია 💜"
  },

  {
    type: "video",
    src: "videos/v2.mp4",
    caption: "ჩემი ბაიკო და ქურქუ ხარ ❤️"
  },

  {
    type: "image",
    src: "images/3.jpg",
    caption: " როგორ ვუხდებით ერთმანეთს ჰიიჰიიჰჰჰჰ✨"
  },

  {
    type: "video",
    src: "videos/v3.mp4",
    caption: "შენთან გატარებული დრო არასდროს მყოფნის 💌"
  },

  {
    type: "image",
    src: "images/4.jpg",
    caption: "ჩემი საყვარელი ადგილი ყოველთვის შენთანაა ❤️"
  },

  {
    type: "video",
    src: "videos/v4.mp4",
    caption: "მუდამ ასე ტკბილად უნდა ვიყოთ💌✨"
  },

  {
    type: "image",
    src: "images/5.jpg",
    caption: "ჩემი ყველაზე ლამაზი მოგონებები შენ გიკავშირდება✨"
  },

  {
    type: "video",
    src: "videos/v5.mp4",
    caption: "მიყვარს როგორ მიგებ და გესმის ჩემი✨ ❤️"
  },

  {
    type: "image",
    src: "images/6.jpg",
    caption: "ყოველთვის შენთან ვიქნები💜"
  },

  {
    type: "video",
    src: "videos/v6.mp4",
    caption: "უსაზღვროდ მიყვარხარ✨"
  },

  {
    type: "image",
    src: "images/7.jpg",
    caption: "შენ ხარ ჩემი ყველაზე ლამაზი ისტორია ❤️"
  },

  {
    type: "video",
    src: "videos/v7.mp4",
    caption: "და ამას დასასრული არასდროს ექნება... ✨"
  }
];

let currentIndex = 0;

let autoTimer = null;

let started = false;
let paused = false;
let finaleStarted = false;

const sky =
  document.getElementById("sky");

const starField =
  document.getElementById("starField");

const ourStar =
  document.getElementById("ourStar");

const hint =
  document.getElementById("hint");

const progress =
  document.getElementById("progress");

const memoryBox =
  document.getElementById("memoryBox");

const memoryImage =
  document.getElementById("memoryImage");

const memoryVideo =
  document.getElementById("memoryVideo");

const memoryCaption =
  document.getElementById("memoryCaption");

const pauseButton =
  document.getElementById("pauseButton");

const nextButton =
  document.getElementById("nextButton");

const finaleButton =
  document.getElementById("finaleButton");

const final =
  document.getElementById("final");

const finalParticles =
  document.getElementById("finalParticles");

const finalLineOne =
  document.getElementById("finalLineOne");

const finalLineTwo =
  document.getElementById("finalLineTwo");

const finalSignature =
  document.getElementById("finalSignature");

const restartButton =
  document.getElementById("restartButton");

/* პატარა ვარსკვლავების შექმნა */

function createStars(){
  starField.innerHTML = "";

  for(let i = 0; i < 170; i++){
    const star =
      document.createElement("span");

    star.className = "small-star";

    star.style.left =
      `${Math.random() * 100}%`;

    star.style.top =
      `${Math.random() * 100}%`;

    star.style.animationDelay =
      `${Math.random() * 3}s`;

    star.style.animationDuration =
      `${1.8 + Math.random() * 3}s`;

    const size =
      1 + Math.random() * 3;

    star.style.width =
      `${size}px`;

    star.style.height =
      `${size}px`;

    starField.appendChild(star);
  }
}

createStars();

/* მოგონებების დაწყება */

function startJourney(){
  if(started || finaleStarted){
    return;
  }

  started = true;

  ourStar.classList.add("started");

  hint.textContent =
    "You & Me ❤️";

  progress.classList.add("show");

  createStartExplosion();

  setTimeout(() => {
    showCurrentMemory();
  }, 1300);
}

/* დაწყების პატარა აფეთქება */

function createStartExplosion(){
  const symbols =
    ["✨", "⭐", "💫", "✦"];

  for(let i = 0; i < 50; i++){
    const particle =
      document.createElement("span");

    particle.textContent =
      symbols[
        Math.floor(
          Math.random() * symbols.length
        )
      ];

    particle.style.position =
      "fixed";

    particle.style.left =
      "50%";

    particle.style.top =
      "46%";

    particle.style.zIndex =
      "500";

    particle.style.pointerEvents =
      "none";

    particle.style.fontSize =
      `${12 + Math.random() * 22}px`;

    const angle =
      Math.random() * Math.PI * 2;

    const distance =
      70 + Math.random() * 260;

    particle.animate(
      [
        {
          opacity:1,
          transform:
            "translate(-50%, -50%) scale(.3)"
        },

        {
          opacity:0,
          transform:
            `translate(
              calc(-50% + ${Math.cos(angle) * distance}px),
              calc(-50% + ${Math.sin(angle) * distance}px)
            ) scale(1.5) rotate(220deg)`
        }
      ],
      {
        duration:
          1200 + Math.random() * 700,

        easing:"ease-out"
      }
    );

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 2100);
  }
}

/* მიმდინარე ფოტო ან ვიდეო */

function showCurrentMemory(){
  clearTimeout(autoTimer);

  if(finaleStarted){
    return;
  }

  if(currentIndex >= memories.length){
    closeMemoryBox();
    startFinale();
    return;
  }

  const memory =
    memories[currentIndex];

  memoryImage.classList.remove("visible");
  memoryVideo.classList.remove("visible");

  memoryVideo.pause();
  memoryVideo.onended = null;
  memoryVideo.removeAttribute("src");
  memoryVideo.load();

  memoryBox.classList.add("open");
  memoryBox.setAttribute(
    "aria-hidden",
    "false"
  );

  memoryCaption.textContent =
    memory.caption;

  progress.textContent =
    `${currentIndex + 1} / ${memories.length}`;

  if(memory.type === "image"){
    memoryImage.src =
      memory.src;

    memoryImage.classList.add("visible");

    if(!paused){
      autoTimer = setTimeout(
        nextMemory,
        4200
      );
    }
  }
  else{
    memoryVideo.src =
      memory.src;

    memoryVideo.classList.add("visible");

    memoryVideo.onended = () => {
      if(!paused){
        nextMemory();
      }
    };

    memoryVideo.play().catch(() => {
      memoryCaption.textContent +=
        " — დააჭირე Play-ს";
    });
  }
}

/* შემდეგი მოგონება */

function nextMemory(){
  clearTimeout(autoTimer);

  if(finaleStarted){
    return;
  }

  currentIndex++;

  showCurrentMemory();
}

/* პაუზა */

function togglePause(){
  paused = !paused;

  if(paused){
    clearTimeout(autoTimer);

    memoryVideo.pause();

    pauseButton.textContent =
      "Continue ▶️";
  }
  else{
    pauseButton.textContent =
      "Pause ⏸️";

    const currentMemory =
      memories[currentIndex];

    if(!currentMemory){
      return;
    }

    if(currentMemory.type === "video"){
      memoryVideo.play().catch(() => {});
    }
    else{
      autoTimer = setTimeout(
        nextMemory,
        4200
      );
    }
  }
}

/* ფანჯრის დახურვა */

function closeMemoryBox(){
  clearTimeout(autoTimer);

  memoryBox.classList.remove("open");

  memoryBox.setAttribute(
    "aria-hidden",
    "true"
  );

  memoryVideo.pause();
}

/* ფინალის დაწყება */

function startFinale(){
  if(finaleStarted){
    return;
  }

  finaleStarted = true;

  clearTimeout(autoTimer);

  memoryVideo.pause();

  closeMemoryBox();

  sky.classList.add("final-mode");

  setTimeout(() => {
    final.classList.add("show");
    createFinalExplosion();
    typeFinalMessage();
  }, 900);
}

/* ფინალური ნაწილაკები */

function createFinalExplosion(){
  const symbols =
    ["✨", "⭐", "💫", "💖", "✦"];

  for(let i = 0; i < 120; i++){
    const particle =
      document.createElement("span");

    particle.className =
      "final-particle";

    particle.textContent =
      symbols[
        Math.floor(
          Math.random() * symbols.length
        )
      ];

    const angle =
      Math.random() * Math.PI * 2;

    const distance =
      130 + Math.random() * 550;

    const x =
      Math.cos(angle) * distance;

    const y =
      Math.sin(angle) * distance;

    particle.style.setProperty(
      "--x",
      `${x}px`
    );

    particle.style.setProperty(
      "--y",
      `${y}px`
    );

    particle.style.fontSize =
      `${12 + Math.random() * 27}px`;

    particle.style.animationDelay =
      `${Math.random() * .5}s`;

    finalParticles.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 3500);
  }
}

/* ტექსტის წერა */

function typeText(
  element,
  text,
  speed
){
  return new Promise(resolve => {
    let letterIndex = 0;

    function write(){
      if(letterIndex < text.length){
        element.textContent +=
          text.charAt(letterIndex);

        letterIndex++;

        setTimeout(write, speed);
      }
      else{
        resolve();
      }
    }

    write();
  });
}

/* ფინალური ტექსტი */

async function typeFinalMessage(){
  finalLineOne.textContent = "";
  finalLineTwo.textContent = "";

  await new Promise(resolve =>
    setTimeout(resolve, 1800)
  );

  await typeText(
    finalLineOne,
    "No matter where life takes us...",
    60
  );

  await new Promise(resolve =>
    setTimeout(resolve, 650)
  );

  await typeText(
    finalLineTwo,
    "I'll always choose you. ❤️",
    82
  );

  await new Promise(resolve =>
    setTimeout(resolve, 800)
  );

  finalSignature.classList.add("show");

  await new Promise(resolve =>
    setTimeout(resolve, 900)
  );

  restartButton.classList.add("show");
}

/* თავიდან დაწყება */

function restartStory(){
  currentIndex = 0;

  started = false;
  paused = false;
  finaleStarted = false;

  clearTimeout(autoTimer);

  memoryVideo.pause();

  final.classList.remove("show");

  finalSignature.classList.remove("show");

  restartButton.classList.remove("show");

  finalLineOne.textContent = "";
  finalLineTwo.textContent = "";

  finalParticles.innerHTML = "";

  sky.classList.remove("final-mode");

  ourStar.classList.remove("started");

  hint.textContent =
    "Touch our star ❤️";

  progress.textContent =
    "0 / 14";

  progress.classList.remove("show");

  pauseButton.textContent =
    "Pause ⏸️";
}

/* ღილაკები */

ourStar.addEventListener(
  "click",
  startJourney
);

pauseButton.addEventListener(
  "click",
  togglePause
);

nextButton.addEventListener(
  "click",
  nextMemory
);

finaleButton.addEventListener(
  "click",
  startFinale
);

restartButton.addEventListener(
  "click",
  restartStory
);

/* კლავიატურა */

document.addEventListener(
  "keydown",
  event => {

    if(
      event.key === "ArrowRight" &&
      started &&
      !finaleStarted
    ){
      nextMemory();
    }

    if(
      event.code === "Space" &&
      started &&
      !finaleStarted
    ){
      event.preventDefault();

      togglePause();
    }

    
  }
);