/* Shared CodeSaathi language layer: translate learner-facing UI, never code syntax. */
(() => {
  "use strict";
  const KEY = "codesaathi.language.v1";
  const te = {
    "Courses":"కోర్సులు","How it works":"ఇది ఎలా పనిచేస్తుంది","Practice":"ప్రాక్టీస్","Language":"భాష",
    "Start learning":"నేర్చుకోవడం ప్రారంభించండి","YOUR JOURNEY INTO TECHNOLOGY STARTS HERE":"సాంకేతిక ప్రపంచంలోకి మీ ప్రయాణం ఇక్కడ ప్రారంభం",
    "Don't just use the web.":"వెబ్‌ను ఉపయోగించడం మాత్రమే కాదు.","Learn to build it.":"వెబ్‌సైట్‌లను నిర్మించడం నేర్చుకోండి.",
    "A friendly, practical path to learning HTML, CSS and JavaScript — one clear lesson at a time.":"HTML, CSS, JavaScript నేర్చుకోవడానికి సులభమైన, ఆచరణాత్మక మార్గం — ఒక్కో పాఠం చొప్పున నేర్చుకోండి.",
    "Explore courses":"కోర్సులను అన్వేషించండి","See how it works":"ఇది ఎలా పనిచేస్తుందో చూడండి",
    "Start with the fundamentals":"ప్రాథమిక అంశాలతో ప్రారంభించండి","Learn • Practise • Build":"నేర్చుకోండి • సాధన చేయండి • నిర్మించండి",
    "BROWSER PREVIEW":"బ్రౌజర్ ప్రివ్యూ","BUILT FOR BEGINNERS":"ప్రారంభకుల కోసం రూపొందించబడింది",
    "NO EXPERIENCE NEEDED":"ముందస్తు అనుభవం అవసరం లేదు","LEARN AT YOUR PACE":"మీ వేగంతో నేర్చుకోండి",
    "Core web courses":"ప్రధాన వెబ్ కోర్సులు","Step-by-step path":"దశలవారీ అభ్యాస మార్గం",
    "Room to experiment":"ప్రయోగాలు చేయడానికి విస్తృత అవకాశం","Launch offer*":"ప్రారంభ ఆఫర్*",
    "THE FOUNDATIONS":"ప్రాథమిక అంశాలు","Three skills. One big beginning.":"మూడు నైపుణ్యాలు. ఒక గొప్ప ప్రారంభం.",
    "Learn the building blocks behind every modern website.":"ప్రతి ఆధునిక వెబ్‌సైట్‌కు ఆధారమైన అంశాలను నేర్చుకోండి.",
    "A SIMPLE WAY TO LEARN":"నేర్చుకోవడానికి సులభమైన మార్గం","Understand it.":"అర్థం చేసుకోండి.",
    "Try it yourself.":"మీరే ప్రయత్నించండి.","Short explanations, examples you can change, and quick checks that help concepts stick. No complicated setup required.":"సంక్షిప్త వివరణలు, మార్చి చూడగల ఉదాహరణలు, భావనలు గుర్తుండేలా చిన్న పరీక్షలు. క్లిష్టమైన సెటప్ అవసరం లేదు.",
    "Try the code playground":"Code Playgroundలో సాధన చేయండి","Learn one concept":"ఒక్కో భావనను నేర్చుకోండి",
    "Start with a plain-language explanation and a small example.":"సులభమైన వివరణతో, చిన్న ఉదాహరణతో ప్రారంభించండి.",
    "Change the code":"Codeను మార్చండి","Experiment in your browser and see your changes instantly.":"మీ Browserలో ప్రయోగాలు చేసి మార్పులను వెంటనే చూడండి.",
    "Check your understanding":"మీ అవగాహనను పరీక్షించుకోండి","Answer a quick question and keep track of your learning.":"చిన్న ప్రశ్నకు సమాధానం ఇచ్చి మీ అభ్యాస పురోగతిని గమనించండి.",
    "YOUR FIRST EXPERIMENT":"మీ మొదటి ప్రయోగం","Make something. Right here.":"ఇక్కడే ఏదైనా రూపొందించండి.",
    "Edit the HTML and run it. Your browser becomes your classroom.":"HTMLను మార్చి Run చేయండి. మీ Browserనే మీ తరగతి గది.",
    "▶ Run code":"▶ కోడ్‌ను అమలు చేయండి","PREVIEW":"ప్రివ్యూ","● READY":"● సిద్ధంగా ఉంది",
    "TIP: Change the text, then select Run code.":"సూచన: Textను మార్చి, Run code ఎంచుకోండి.",
    "THE CODESAATHI PROMISE":"CodeSaathi హామీ","Made for the curious.":"తెలుసుకోవాలనే ఆసక్తి ఉన్నవారి కోసం.",
    "Built for the doers.":"సాధించి చూపేవారి కోసం.",
    "Start small, practise often, and turn what you learn into things you can share with the world.":"చిన్నగా ప్రారంభించండి, తరచూ సాధన చేయండి, నేర్చుకున్నదాన్ని ప్రపంచంతో పంచుకోగలిగే రూపంలోకి మార్చండి.",
    "Your friendly companion on the journey to building for the web.":"Web అభివృద్ధి నేర్చుకునే మీ ప్రయాణంలో మీకు తోడుగా ఉండే స్నేహితుడు.",
    "Playground":"ప్రాక్టీస్ ప్రదేశం","Contact":"సంప్రదించండి","Learn with curiosity.":"ఆసక్తితో నేర్చుకోండి.",
    "Courses":"కోర్సులు","Explore course ↗":"కోర్సును చూడండి ↗","Explore curriculum ↗":"పాఠ్య ప్రణాళికను చూడండి ↗",
    "FREE PREVIEW":"ఉచిత ప్రివ్యూ","Beginner friendly":"ప్రారంభకులకు అనుకూలం","lessons":"పాఠాలు",
    "launch offer*":"ప్రారంభ ఆఫర్*","of":"లో","completed":"పూర్తయ్యాయి","Course roadmap":"కోర్సు అభ్యాస మార్గం",
    "Start here:":"ఇక్కడ ప్రారంభించండి:","Try it:":"ప్రయత్నించండి:","Practice:":"సాధన:",
    "Mark lesson complete":"పాఠాన్ని పూర్తయినట్లు గుర్తించండి","✓ Lesson saved":"✓ పాఠం భద్రపరచబడింది",
    "STAGE 1 · UNDERSTAND":"దశ 1 · అర్థం చేసుకోండి","Understand the idea":"భావనను అర్థం చేసుకోండి",
    "STAGE 2 · HUMAN EXPLANATION":"దశ 2 · వివరణ","STAGE 2 · EXPLANATION":"దశ 2 · వివరణ",
    "See how it works":"ఇది ఎలా పనిచేస్తుందో తెలుసుకోండి",
    "STAGE 3 · WRITE, RUN, OBSERVE & PRACTISE":"దశ 3 · రాయండి, అమలు చేయండి, గమనించండి, సాధన చేయండి",
    "Try it yourself":"మీరే ప్రయత్నించండి","Open the practice area":"ప్రాక్టీస్ విభాగాన్ని తెరవండి",
    "Knowledge check:":"అవగాహన పరీక్ష:","More knowledge checks":"మరిన్ని అవగాహన పరీక్షలు",
    "Answer:":"సమాధానం:","Guided:":"మార్గదర్శక సాధన:","Independent:":"స్వతంత్ర సాధన:",
    "← Back to ":"← తిరిగి వెళ్లండి:","Loading ":"లోడ్ అవుతోంది: ",
    "This topic is not yet translated into your selected language. Showing the English lesson instead.":"ఈ అంశం మీరు ఎంచుకున్న భాషలో ఇంకా అనువదించబడలేదు. ప్రస్తుతం ఇంగ్లీష్ పాఠాన్ని చూపిస్తున్నాము.",
    "DRAFT LESSON · This content is not yet editorially reviewed or approved for release.":"ముసాయిదా పాఠం · ఈ కంటెంట్ ఇంకా సమీక్ష మరియు విడుదల ఆమోదం పొందలేదు.",
    "This lesson has not been authored in the selected language yet.":"ఈ పాఠం ఎంచుకున్న భాషలో ఇంకా రూపొందించబడలేదు.",
    "Could not load this lesson":"ఈ పాఠాన్ని లోడ్ చేయలేకపోయాము",
    "The authored curriculum could not be loaded. The original course preview remains available.":"పాఠ్య ప్రణాళికను లోడ్ చేయలేకపోయాము. అసలు కోర్సు ప్రివ్యూ అందుబాటులో ఉంటుంది.",
    "Load this lesson's starter code in the playground":"ఈ పాఠం ప్రారంభ Codeను Playgroundలో తెరవండి",
    "Programming Foundations":"ప్రోగ్రామింగ్ పునాదులు","CORE CONCEPTS":"ప్రధాన భావనలు",
    "Understand computers, programs and problem-solving before writing code.":"Code రాయడానికి ముందు కంప్యూటర్లు, ప్రోగ్రామ్‌లు, సమస్యల పరిష్కారం గురించి తెలుసుకోండి.",
    "Build meaningful, accessible document structure for the web.":"Web కోసం అర్థవంతమైన, అందరికీ అందుబాటులో ఉండే పేజీ నిర్మాణాన్ని రూపొందించండి.",
    "Control layout, typography, colour and responsive design.":"Layout, Typography, రంగులు, Responsive Designను నియంత్రించడం నేర్చుకోండి.",
    "Build interactive behaviour, logic and dynamic web experiences.":"Interactive పనితీరు, Logic, Dynamic Web అనుభవాలను రూపొందించండి.",
    "STRUCTURE":"నిర్మాణం","PRESENTATION":"రూపకల్పన","INTERACTION":"పరస్పర చర్య",
    "TOPICS":"అంశాలు","authored lesson topics · English and Telugu drafts":"పాఠ్య అంశాలు · English, తెలుగు పాఠాలు",
    "English and Telugu drafts":"English, తెలుగు పాఠ్యాలు","FREE PREVIEW":"ఉచిత ప్రివ్యూ",
    "of 14 completed":"లో 14 పూర్తయ్యాయి","of 110 completed":"లో 110 పూర్తయ్యాయి","of 164 completed":"లో 164 పూర్తయ్యాయి","of 213 completed":"లో 213 పూర్తయ్యాయి",
    "YOUR FIRST EXPERIMENT":"మీ మొదటి ప్రయోగం","THE FOUNDATIONS":"ప్రాథమిక అంశాలు",
    "© ":"© ","CodeSaathi. Learn with curiosity.":"CodeSaathi. ఆసక్తితో నేర్చుకోండి.",
    "*₹1 launch offer is subject to final course access and payment setup.":"*₹1 ప్రారంభ ఆఫర్ తుది కోర్సు ప్రవేశం, చెల్లింపు ఏర్పాట్లకు లోబడి ఉంటుంది.",
    "Hello, CodeSaathi!":"నమస్కారం, CodeSaathi!","I am learning to build for the web.":"నేను Web పేజీలు రూపొందించడం నేర్చుకుంటున్నాను.",
    "I made this work!":"నేను దీన్ని పనిచేయించాను!","Click me":"నన్ను క్లిక్ చేయండి"
  };
  const protectedTags = new Set(["SCRIPT","STYLE","CODE","PRE"]);
  const originals = new WeakMap();
  const attributeOriginals = new WeakMap();
  const editorEnglish = '<h1>Hello, CodeSaathi!</h1>\n<p>I am learning to build for the web.</p>\n<button onclick="document.querySelector(\'p\').textContent=\'I made this work!\' ">Click me</button>';
  const editorTelugu = '<h1>నమస్కారం, CodeSaathi!</h1>\n<p>నేను Web పేజీలు రూపొందించడం నేర్చుకుంటున్నాను.</p>\n<button onclick="document.querySelector(\'p\').textContent=\'నేను దీన్ని పనిచేయించాను!\' ">నన్ను క్లిక్ చేయండి</button>';
  function translate(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.nodeValue.trim() || protectedTags.has(node.parentElement?.tagName)) continue;
      nodes.push(node);
    }
    nodes.forEach(node => {
      if (!originals.has(node)) originals.set(node, node.nodeValue);
      const original = originals.get(node), trimmed = original.trim();
      let translated = te[trimmed];
      if (!translated) {
        translated = trimmed
          .replace(/^(\\d+) authored lesson topics · English and Telugu drafts$/, "$1 పాఠ్య అంశాలు · English, తెలుగు పాఠ్యాలు")
          .replace(/^(\\d+) TOPICS$/, "$1 అంశాలు")
          .replace(/^(\\d+) of (\\d+) completed$/, "$1 / $2 పూర్తయ్యాయి")
          .replace(/^(\\d+) lessons$/, "$1 పాఠాలు")
          .replace(/^([A-Z]+) course$/, "$1 కోర్సు");
      }
      node.nodeValue = translated ? original.replace(trimmed, translated) : original;
    });
    root.querySelectorAll("[aria-label],[title],[placeholder]").forEach(el => {
      ["aria-label","title","placeholder"].forEach(attr => {
        const value = el.getAttribute(attr);
        if (!attributeOriginals.has(el)) attributeOriginals.set(el, {});
        const saved = attributeOriginals.get(el);
        if (!(attr in saved)) saved[attr] = value;
        if (saved[attr] && te[saved[attr]]) el.setAttribute(attr, te[saved[attr]]);
      });
    });
  }
  function restore(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) if (originals.has(walker.currentNode)) walker.currentNode.nodeValue = originals.get(walker.currentNode);
    root.querySelectorAll("[aria-label],[title],[placeholder]").forEach(el => {
      const saved = attributeOriginals.get(el);
      if (saved) Object.entries(saved).forEach(([attr,value]) => { if (value !== null) el.setAttribute(attr,value); });
    });
  }
  function apply(language) {
    const lang = ["en","te","ml","kn","ta","hi"].includes(language) ? language : "en";
    document.documentElement.lang = lang;
    restore(document.body);
    if (lang === "te") translate(document.body);
    const editor = document.getElementById("codeEditor");
    if (editor) {
      const current = editor.value;
      if (current === editorEnglish || current === editorTelugu) {
        editor.value = lang === "te" ? editorTelugu : editorEnglish;
        document.getElementById("runCode")?.click();
      }
    }
    const notice = document.querySelector("#languageFallbackNotice");
    if (notice) {
      const unsupported = !["en","te"].includes(lang);
      notice.hidden = !unsupported;
      notice.textContent = unsupported ? "ఈ భాషలో UI అనువాదం ఇంకా అందుబాటులో లేదు. ప్రస్తుతం ఇంగ్లీష్ UI చూపిస్తున్నాము." : "";
    }
  }
  function init() {
    let lang = "en";
    try { lang = localStorage.getItem(KEY) || "en"; } catch {}
    const selector = document.querySelector("#languageSelect");
    if (selector) {
      selector.value = lang;
      selector.addEventListener("change", () => {
        try { localStorage.setItem(KEY, selector.value); } catch {}
        apply(selector.value);
      });
    }
    apply(lang);
    const observer = new MutationObserver(records => {
      if (document.documentElement.lang !== "te") return;
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          if (!originals.has(node)) originals.set(node,node.nodeValue);
          const original = originals.get(node), trimmed = original.trim();
          let translated = te[trimmed];
          if (!translated) {
            translated = trimmed
              .replace(/^(\\d+) authored lesson topics · English and Telugu drafts$/, "$1 పాఠ్య అంశాలు · English, తెలుగు పాఠ్యాలు")
              .replace(/^(\\d+) TOPICS$/, "$1 అంశాలు")
              .replace(/^(\\d+) of (\\d+) completed$/, "$1 / $2 పూర్తయ్యాయి")
              .replace(/^(\\d+) lessons$/, "$1 పాఠాలు");
          }
          if (translated) node.nodeValue = original.replace(trimmed,translated);
        } else if (node.nodeType === Node.ELEMENT_NODE && !protectedTags.has(node.tagName)) translate(node);
      }));
    });
    observer.observe(document.body,{childList:true,subtree:true});
    window.CodeSaathiI18n = Object.freeze({apply,language:()=>document.documentElement.lang});
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
