document.addEventListener("DOMContentLoaded", () => {
  const chatIcon = document.getElementById("chatbot-icon");
  const chatWindow = document.getElementById("chat-window");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");

  // toggle chat window
  chatIcon.addEventListener("click", () => {
    // link for chatbot
    window.open("https://slm-vintage-chatbot.onrender.com/", "_blank");
  });

  chatInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

  // send message
  window.sendMessage = function () {
    const userText = chatInput.value.trim();
    if (userText === "") return;

    appendMessage("You", userText);
    chatInput.value = "";

    const reply = getSudhaReply(userText);
    setTimeout(() => {
      appendMessage("Sudha", reply);
      speakText(reply);
    }, 500);
  };

  // append message
  function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // manually chat bot -- later need to implement SLM model.

  function getSudhaReply(input) {
    input = input.toLowerCase();

    if (input.includes("hello") || input.includes("hi")) {
      return "Hello! I'm Sudha. How can I assist you. Want to enable you with our property in ECR, good technology enabled virtual demonstration?";
    } else if (input.includes("plot") && input.includes("available")) {
      return "Yes, we have residential and commercial plots available. Would you like to know the locations?";
    } else if (input.includes("villa") && input.includes("available")) {
      return "Yes, villas are available in multiple gated communities. We also offer virtual tours.";
    } else if (input.includes("site visit")) {
      return "Sure! We can schedule a site visit. Could you please provide your preferred date and location?";
    } else if (input.includes("price") || input.includes("cost")) {
      return "Prices depend on the size and location. Please specify the area you're interested in.";
    } else if (input.includes("emi") || input.includes("loan")) {
      return "We provide EMI options and help with bank loan arrangements. Do you want to connect with a consultant?";
    } else if (input.includes("location")) {
      return "We have properties in Chennai. Where are you looking to buy?";
    } else if (
      input.includes("approval") ||
      input.includes("dtcp") ||
      input.includes("rera")
    ) {
      return "Yes, all our plots are DTCP and RERA approved. You're in safe hands.";
    } else if (input.includes("water") || input.includes("electricity")) {
      return "Yes, water pipelines and EB connections are available for every plot.";
    } else if (input.includes("maintenance")) {
      return "There's a one-time maintenance fee for common amenities and layout upkeep.";
    } else if (input.includes("thank")) {
      return "You're most welcome! I'm here anytime you need assistance.";
    } else if (input.includes("contact") || input.includes("number")) {
      return "You can contact our agent at +91-9876543210 or we can call you back. Just let me know!";
    } else if (input.includes("booking") || input.includes("advance")) {
      return "Booking starts from just ₹10,000. Would you like us to reserve a plot for you?";
    } else if (input.includes("velachery")) {
      return randomFromArray([
        "Velachery is a prime spot! We have plots and apartments there.",
        "Yes, we offer residential properties in Velachery. Near malls and IT parks!",
      ]);
    } else if (input.includes("annanagar")) {
      return randomFromArray([
        "Annanagar has premium villa plots available. Great location with top schools nearby.",
        "Yes! We deal in select projects around Annanagar. Interested in visiting?",
      ]);
    } else if (input.includes("tambaram")) {
      return randomFromArray([
        "Tambaram properties are in high demand. We have budget-friendly plots there.",
        "Yes, Tambaram plots available with DTCP approval. Easy access to GST Road.",
      ]);
    } else if (input.includes("sholinganallur")) {
      return randomFromArray([
        "We have gated community projects in Sholinganallur. Ideal for IT professionals.",
        "Sholinganallur villas and plots are available. Close to top tech companies.",
      ]);
    } else if (input.includes("porur")) {
      return randomFromArray([
        "Porur area has affordable residential plots. Would you like a site visit?",
        "Yes, Porur has great connectivity and we have some ready-to-build plots there.",
      ]);
    } else if (input.includes("mambakkam")) {
      return randomFromArray([
        "We have new projects launching in Mambakkam. Calm environment, good investment!",
        "Yes, plots in Mambakkam are available with water and EB facilities.",
      ]);
    } else if (input.includes("medavakkam")) {
      return randomFromArray([
        "Medavakkam is growing fast! We offer plots and flats there.",
        "Yes, DTCP-approved properties available in Medavakkam. Near IT corridor!",
      ]);
    } else if (input.includes("siruseri")) {
      return randomFromArray([
        "Siruseri has tech park proximity and great investment plots. Interested?",
        "Yes, we have plots in Siruseri—ideal for working professionals in OMR.",
      ]);
    } else if (input.includes("ecr")) {
      return randomFromArray([
        "ECR offers a peaceful environment with scenic views. We have residential properties available here.",
        "Yes, properties on ECR are great for long-term investment. Would you like to explore options?",
      ]);
    } else if (input.includes("omr")) {
      return randomFromArray([
        "OMR is a booming location known for tech hubs and excellent connectivity. We have properties available in this area.",
        "Yes, we offer residential and commercial plots along OMR. Ideal for professionals working in IT parks.",
      ]);
    } else {
      return "I'm here to assist with anything related to real estate—plots, villas, pricing, loans, and more!";
    }
  }

  // Utility function
  function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // text-to-speech
  function speakText(text) {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();

    // Filter only female voices
    const femaleVoices = voices.filter(
      (v) =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("woman") ||
        v.name.toLowerCase().includes("female") ||
        v.gender === "female"
    );

    // Preferred female voices (order matters)
    const preferred = [
      "Google UK English Female",
      "Microsoft Heera",
      "Heera",
      "Google हिन्दी Female",
    ];

    // Select first preferred female voice, or first available female voice
    let selected =
      femaleVoices.find((v) => preferred.includes(v.name)) ||
      femaleVoices.find((v) => v.lang.includes("en-IN")) ||
      femaleVoices[0];

    // Fallback to first available voice if no female voices found
    if (!selected && voices.length > 0) {
      selected = voices[0];
      console.warn("No female voices available, falling back to default");
    }

    const utter = new SpeechSynthesisUtterance(text);
    if (selected) utter.voice = selected;
    utter.rate = 1;
    utter.pitch = 1.1;
    synth.speak(utter);
  }

  // ensure voices load
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };

  // voice input
  window.startListening = function () {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Sorry, your browser does not support speech input.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      chatInput.value = transcript;
      sendMessage();
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };
});

document.querySelectorAll(".ar-video").forEach((video) => {
  video.addEventListener("click", function () {
    if (this.requestFullscreen) {
      this.requestFullscreen();
    } else if (this.webkitRequestFullscreen) {
      this.webkitRequestFullscreen();
    } else if (this.msRequestFullscreen) {
      this.msRequestFullscreen();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const imageContainer = document.querySelector(".image-container");
  const videoOverlay = document.querySelector(".video-hover-overlay");
  const video = document.querySelector(".hover-video");
  const playPauseBtn = document.querySelector(".play-pause-btn");
  const muteBtn = document.querySelector(".mute-btn");
  const closeBtn = document.querySelector(".close-overlay-btn");

  // create a seek line element
  const seekLine = document.createElement("div");
  seekLine.style.position = "absolute";
  seekLine.style.width = "2px";
  seekLine.style.height = "100%";
  seekLine.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  seekLine.style.top = "0";
  seekLine.style.zIndex = "10";
  seekLine.style.pointerEvents = "none";
  seekLine.style.display = "none";
  videoOverlay.appendChild(seekLine);

  let isOverlayClosed = false;

  video.muted = false;
  muteBtn.textContent = "🔊";

  // handle image container hover
  imageContainer.addEventListener("mouseenter", function () {
    if (!isOverlayClosed) {
      videoOverlay.style.display = "block";
      video
        .play()
        .then(() => {
          playPauseBtn.textContent = "❚❚";
        })
        .catch((error) => {
          console.error("Video play failed:", error);
        });
    }
  });

  imageContainer.addEventListener("mouseleave", function () {
    if (!isOverlayClosed) {
      videoOverlay.style.display = "none";
      video.pause();
      video.currentTime = 0;
      playPauseBtn.textContent = "▶";
      seekLine.style.display = "none";
    }
  });

  // play/pause functionality
  playPauseBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (video.paused) {
      video.play().then(() => {
        playPauseBtn.textContent = "❚❚";
      });
    } else {
      video.pause();
      playPauseBtn.textContent = "▶";
    }
  });

  // mute/unmute functionality
  muteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? "🔇" : "🔊";
  });

  // close overlay functionality
  closeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    isOverlayClosed = true;
    videoOverlay.style.display = "none";
    video.pause();
    video.currentTime = 0;
    playPauseBtn.textContent = "▶";
    seekLine.style.display = "none";

    setTimeout(() => {
      isOverlayClosed = false;
    }, 100);
  });

  // reset play button state when video ends
  video.addEventListener("ended", function () {
    playPauseBtn.textContent = "▶";
  });

  // add click-to-seek functionality with visible line
  video.addEventListener("click", function (e) {
    e.stopPropagation();

    // calculate the click position
    const clickPosition = e.offsetX / video.clientWidth;
    const seekTime = clickPosition * video.duration;

    // position the seek line
    seekLine.style.left = `${e.offsetX}px`;
    seekLine.style.display = "block";

    // hide the line after a short delay
    setTimeout(() => {
      seekLine.style.display = "none";
    }, 500);

    // seek to the calculated time
    video.currentTime = seekTime;

    // If video was paused, play it after seeking
    if (video.paused) {
      video.play();
      playPauseBtn.textContent = "❚❚";
    }
  });

  // css for the video container to ensure proper positioning
  const style = document.createElement("style");
  style.textContent = `
      .image-container {
        position: relative;
      }
      .video-hover-overlay {
        position: absolute;
        top: -45;
        left: -50;
        width: 180%;
        height: 180%;
      }
      .hover-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `;
  document.head.appendChild(style);
});
