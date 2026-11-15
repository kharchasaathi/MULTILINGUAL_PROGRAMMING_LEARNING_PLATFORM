(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
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
    if (window.CodeSaathiLessonTemplate) {
      window.CodeSaathiLessonTemplate.render($("#activeLesson"), {
        title: c.lessons[0],
        understand: c.intro,
        explanation: "Study this original example. Notice the important tags, properties or statements and connect them to what the browser displays.",
        analogy: c.id === "html" ? "HTML is like the structural plan of a page; the analogy helps with structure, but HTML itself is a markup language interpreted by the browser." : c.id === "css" ? "CSS is like the visual design and arrangement of a page; the browser applies actual style rules rather than painting a physical object." : "JavaScript is like the controls that respond to a person's actions; the browser executes instructions rather than moving physical parts.",
        code: c.example,
        practice: c.task,
        quizQuestion: "What part of this example controls the result you see?",
        quizAnswer: "Identify the element, rule or statement responsible, then change it and run the example again.",
        onComplete: () => {}
      });
    }
    $("#lessonDialog").showModal();
    $("#lessonContent").querySelectorAll("[data-lesson]").forEach(btn=>btn.addEventListener("click",()=>{
      const i=Number(btn.dataset.lesson);
      $("#activeLesson").innerHTML='<h3>'+c.lessons[i]+'</h3><p>'+c.intro+'</p><pre></pre><div class="lesson-task"><strong>Practice:</strong> '+c.task+'</div><p class="lesson-explain">Read the example, change it in the playground, and practise until you can explain each line.</p><button class="lesson-complete" id="markLesson" data-index="'+i+'">Mark lesson complete</button>';
      if (window.CodeSaathiLessonTemplate) {
        window.CodeSaathiLessonTemplate.render($("#activeLesson"), {
          title: c.lessons[i],
          understand: c.intro,
          explanation: "Study this original example. Notice the important tags, properties or statements and connect them to what the browser displays.",
          analogy: c.id === "html" ? "HTML is like the structural plan of a page; the analogy helps with structure, but HTML itself is a markup language interpreted by the browser." : c.id === "css" ? "CSS is like the visual design and arrangement of a page; the browser applies actual style rules rather than painting a physical object." : "JavaScript is like the controls that respond to a person's actions; the browser executes instructions rather than moving physical parts.",
          code: c.example,
          practice: c.task,
          quizQuestion: "What part of this example controls the result you see?",
          quizAnswer: "Identify the element, rule or statement responsible, then change it and run the example again.",
          onComplete: () => {}
        });
      }
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
  $("#startHeader").addEventListener("click",()=>$("#courses").scrollIntoView({behavior:"smooth"}));
  const menuButton = $("#menuToggle");
  const primaryNavigation = $("#primaryNavigation");
  if (menuButton && primaryNavigation) {
    const closeMenu = () => {
      primaryNavigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      menuButton.textContent = "☰";
    };
    menuButton.addEventListener("click", () => {
      const isOpen = primaryNavigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
      menuButton.textContent = isOpen ? "×" : "☰";
    });
    primaryNavigation.querySelectorAll("a[href^=\"#\"]").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
    document.addEventListener("click", event => {
      if (!primaryNavigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
  }
  $("#year").textContent=new Date().getFullYear();
  renderCourses();runCode();
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(err => console.warn("Offline mode unavailable:", err)));
  }
})();

