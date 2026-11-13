(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const translations = {
    en: {heroLead:"A friendly, practical path to learning HTML, CSS and JavaScript — one clear lesson at a time.",explore:"Explore courses"},
    te: {heroLead:"HTML, CSS, JavaScript నేర్చుకోవడానికి సులభమైన మార్గం — ఒక్కో పాఠం చొప్పున అర్థం చేసుకుంటూ, మీరే కోడ్ రాయండి.",explore:"కోర్సులు చూడండి"}
  };
  const courses = [
    {id:"html",number:"01",name:"HTML",tag:"STRUCTURE",icon:"&lt;/&gt;",iconClass:"icon-html",description:"Build the structure of web pages with elements, headings, links, images, forms and semantic HTML.",lessons:["What is HTML?","Your first HTML document","Headings and paragraphs","Links and images","Lists and tables","Forms and input elements","Semantic HTML","Build a profile page"],intro:"HTML (HyperText Markup Language) describes the structure and meaning of content on a web page. It uses elements represented by tags.",example:'<!doctype html>\n<html>\n  <head><title>My page</title></head>\n  <body>\n    <h1>Hello, world!</h1>\n    <p>This is my first page.</p>\n  </body>\n</html>',task:"Create a page with one main heading, one paragraph and a link to your favourite learning resource."},
    {id:"css",number:"02",name:"CSS",tag:"PRESENTATION",icon:"✳",iconClass:"icon-css",description:"Style your pages with colours, typography, spacing, layouts, Flexbox, Grid and responsive design.",lessons:["What is CSS?","Ways to add CSS","Selectors and specificity","Colours and typography","The box model","Display and positioning","Flexbox layouts","CSS Grid","Responsive design","Build a landing page"],intro:"CSS (Cascading Style Sheets) controls how HTML content looks. It defines colours, spacing, typography and page layouts.",example:'body {\n  font-family: Arial, sans-serif;\n  background: #f4f6ff;\n}\nh1 {\n  color: #5145cd;\n  margin-bottom: 12px;\n}',task:"Write a CSS rule that gives the page a light background and makes its main heading purple."},
    {id:"javascript",number:"03",name:"JavaScript",tag:"INTERACTION",icon:"JS",iconClass:"icon-js",description:"Bring pages to life with variables, functions, conditions, events, arrays, objects and DOM interaction.",lessons:["What is JavaScript?","Add JavaScript to a page","Variables and data types","Operators and expressions","Conditions","Loops","Functions","Arrays and objects","DOM selection and events","Build an interactive counter"],intro:"JavaScript is a programming language that makes web pages interactive. It can respond to clicks, update content and work with data.",example:'const button = document.querySelector("button");\nbutton.addEventListener("click", () => {\n  document.querySelector("p").textContent = "You did it!";\n});',task:"Select a button and make it change a paragraph when someone clicks it."}
  ];
  const progressKey = "codesaathi.progress.v1";
  const readProgress = () => { try { return JSON.parse(localStorage.getItem(progressKey) || "{}"); } catch { return {}; } };
  const saveProgress = (course, lesson) => { const p=readProgress(); p[course]=Array.from(new Set([...(p[course]||[]),lesson])); localStorage.setItem(progressKey,JSON.stringify(p)); };
  const progress = readProgress();
  function renderCourses(){
    $("#courseGrid").innerHTML = courses.map(c => {
      const done=(progress[c.id]||[]).length;
      return '<article class="course-card"><div class="course-top"><span class="course-icon '+c.iconClass+'">'+c.icon+'</span><span class="course-number">'+c.number+' / 03</span></div><h3>'+c.name+'</h3><p>'+c.description+'</p><div class="course-meta"><span>◷ '+c.lessons.length+' lessons</span><span>• Beginner friendly</span></div><div class="course-footer"><span class="course-price">₹1 <small>launch offer*</small></span><button class="course-open" data-course="'+c.id+'">Explore course ↗</button></div><small class="progress-note">'+done+' of '+c.lessons.length+' lessons completed</small></article>';
    }).join("");
    $("#courseGrid").querySelectorAll("[data-course]").forEach(btn=>btn.addEventListener("click",()=>openCourse(btn.dataset.course)));
  }
  function openCourse(id){
    const c=courses.find(x=>x.id===id); if(!c)return;
    const completed=progress[c.id]||[];
    $("#lessonContent").innerHTML='<div class="eyebrow">'+c.tag+' · '+c.lessons.length+' LESSONS</div><h2>'+c.name+' course</h2><p>'+c.intro+'</p><h3>Course roadmap</h3><ol class="lesson-list">'+c.lessons.map((l,i)=>'<li><button class="lesson-select" data-lesson="'+i+'">'+(completed.includes(i)?'✓':'○')+' &nbsp;'+l+'</button></li>').join("")+'</ol><div id="activeLesson"><h3>Start here: '+c.lessons[0]+'</h3><p>'+c.intro+'</p><pre></pre><div class="lesson-task"><strong>Try it:</strong> '+c.task+'</div><p class="lesson-explain">Choose a lesson above to explore the roadmap. Your completion is saved on this device.</p><button class="lesson-complete" id="markLesson">Mark lesson complete</button></div>';
    $("#activeLesson pre").textContent=c.example;
    $("#lessonDialog").showModal();
    $("#lessonContent").querySelectorAll("[data-lesson]").forEach(btn=>btn.addEventListener("click",()=>{
      const i=Number(btn.dataset.lesson);
      $("#activeLesson").innerHTML='<h3>'+c.lessons[i]+'</h3><p>'+c.intro+'</p><pre></pre><div class="lesson-task"><strong>Practice:</strong> '+c.task+'</div><p class="lesson-explain">Read the example, change it in the playground, and practise until you can explain each line.</p><button class="lesson-complete" id="markLesson" data-index="'+i+'">Mark lesson complete</button>';
      $("#activeLesson pre").textContent=c.example;
      bindComplete(c.id,i);
    }));
    bindComplete(c.id,0);
  }
  function bindComplete(course,index){
    const btn=$("#markLesson"); if(!btn)return;
    btn.addEventListener("click",()=>{saveProgress(course,index);progress[course]=readProgress()[course];btn.textContent="✓ Lesson saved";btn.disabled=true;renderCourses();});
  }
  const editor=$("#codeEditor"),frame=$("#previewFrame");
  function runCode(){
    const doc=frame.contentDocument;
    doc.open();
    doc.write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font:16px Arial,sans-serif;padding:22px;color:#172033}button{padding:9px 14px;border:0;border-radius:7px;background:#6558e8;color:white;cursor:pointer}</style></head><body>'+editor.value+'</body></html>');
    doc.close();
  }
  $("#runCode").addEventListener("click",runCode);
  $("#closeLesson").addEventListener("click",()=>$("#lessonDialog").close());
  $("#languageSelect").addEventListener("change",e=>{
    const t=translations[e.target.value]||translations.en;
    document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(t[key])el.textContent=t[key];});
    document.documentElement.lang=e.target.value;
  });
  $("#startHeader").addEventListener("click",()=>$("#courses").scrollIntoView({behavior:"smooth"}));
  $("#year").textContent=new Date().getFullYear();
  renderCourses();runCode();
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(err => console.warn("Offline mode unavailable:", err)));
  }
})();

/* CodeSaathi shared language preference — additive foundation layer.
 * Supported UI languages in this release: English and Telugu.
 * Other planned languages remain unavailable until their translations are implemented.
 */
(() => {
  "use strict";
  const LANGUAGE_KEY = "codesaathi.language.v1";
  const SUPPORTED_LANGUAGES = new Set(["en", "te"]);
  const UI_TRANSLATIONS = {
    en: {
      heroLead: "A friendly, practical path to learning HTML, CSS and JavaScript — one clear lesson at a time.",
      explore: "Explore courses"
    },
    te: {
      heroLead: "HTML, CSS, JavaScript నేర్చుకోవడానికి సులభమైన మార్గం — ఒక్కో పాఠం చొప్పున అర్థం చేసుకుంటూ, మీరే కోడ్ రాయండి.",
      explore: "కోర్సులు చూడండి"
    }
  };
  const selector = document.querySelector("#languageSelect");
  if (!selector) return;

  const applyLanguage = (requestedLanguage) => {
    const language = SUPPORTED_LANGUAGES.has(requestedLanguage) ? requestedLanguage : "en";
    const translationsForLanguage = UI_TRANSLATIONS[language];
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (Object.prototype.hasOwnProperty.call(translationsForLanguage, key)) {
        element.textContent = translationsForLanguage[key];
      }
    });
    selector.value = language;
    document.documentElement.lang = language;
    return language;
  };

  const readSavedLanguage = () => {
    try {
      return localStorage.getItem(LANGUAGE_KEY) || "en";
    } catch {
      return "en";
    }
  };

  const initialLanguage = applyLanguage(readSavedLanguage());
  try {
    localStorage.setItem(LANGUAGE_KEY, initialLanguage);
  } catch {
    // Language selection still works for this page when storage is unavailable.
  }

  selector.addEventListener("change", () => {
    const language = applyLanguage(selector.value);
    try {
      localStorage.setItem(LANGUAGE_KEY, language);
    } catch {
      // Keep the current page usable when browser storage is unavailable.
    }
  });
})();
