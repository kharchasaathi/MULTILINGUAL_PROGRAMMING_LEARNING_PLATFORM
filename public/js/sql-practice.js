(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const state = { bank:null, blankIndex:0, blankCorrect:0, blankAnswered:new Set(), quiz:[], quizIndex:0, quizCorrect:0, quizAnswered:false, questionBank:null, exam:[], examIndex:0, examCorrect:0, examAnswered:false, challenges:[], challenge:null, solved:new Set(), worker:null, workerReady:false, runId:0, pending:null };
  const safeText = value => String(value ?? "");
  function setTab(name) {
    for (const tab of document.querySelectorAll("[data-tab]")) tab.setAttribute("aria-pressed", String(tab.dataset.tab === name));
    $("blanksPanel").hidden = name !== "blanks";
    $("quizPanel").hidden = name !== "quiz";
    $("examPanel").hidden = name !== "exam";
    $("challengesPanel").hidden = name !== "challenges";
  }
  document.querySelectorAll("[data-tab]").forEach(button => button.addEventListener("click", () => setTab(button.dataset.tab)));
  async function loadJson(path) { const response = await fetch(path, {cache:"no-cache"}); if (!response.ok) throw new Error("Could not load " + path + " (HTTP " + response.status + ")"); return response.json(); }
  async function init() {
    try {
      state.bank = await loadJson("/content/en/sql/sql-practice-bank.json");
      renderBlank();
      const challengeBank = await loadJson("/content/en/sql/sql-code-challenges.json");
      state.challenges = challengeBank.challenges || [];
      state.challengeBankSetup = challengeBank.dataset?.setupSql || "";
      $("challengeCount").textContent = state.challenges.length + " challenges";
      renderChallengeList();
      state.worker = new Worker("/js/sql-playground-worker.js", {name:"codesaathi-sql-practice"});
      state.worker.onmessage = event => {
        const message = event.data || {};
        if (message.type === "ready") { state.workerReady = true; return; }
        if (message.runId !== state.runId) return;
        if (message.type === "challenge-result") {
          const pending = state.pending; state.pending = null;
          $("checkChallenge").disabled = false;
          if (!pending) return;
          if (message.matches) {
            state.solved.add(pending.id);
            try { localStorage.setItem("codesaathi-sql-challenges", JSON.stringify([...state.solved])); } catch {}
            $("challengeFeedback").className = "practice-feedback good";
            $("challengeFeedback").textContent = "Correct — your query matches the expected result.";
            $("challengeOutput").textContent = "Returned " + message.rows.length + " row(s). Challenge completed.";
          } else {
            $("challengeFeedback").className = "practice-feedback bad";
            $("challengeFeedback").textContent = "Not quite. Compare your result with the requested columns, rows and order.";
            $("challengeOutput").textContent = "Expected rows:\n" + JSON.stringify(message.expectedRows, null, 2) + "\n\nYour rows:\n" + JSON.stringify(message.rows, null, 2);
          }
          $("challengeCompleted").textContent = state.solved.size + " solved";
          renderChallengeList();
        } else if (message.type === "error") {
          state.pending = null;
          $("checkChallenge").disabled = false;
          $("challengeFeedback").className = "practice-feedback bad";
          $("challengeFeedback").textContent = "The query could not be checked.";
          $("challengeOutput").textContent = message.message || "Unknown SQL error";
        }
      };
      state.worker.onerror = event => {
        $("challengeFeedback").className = "practice-feedback bad";
        $("challengeFeedback").textContent = "The local SQL worker failed to start.";
        $("challengeOutput").textContent = event.message || "Worker error";
      };
      state.worker.postMessage({type:"init",bytes:null});
      try { state.solved = new Set(JSON.parse(localStorage.getItem("codesaathi-sql-challenges") || "[]")); } catch {}
      $("challengeCompleted").textContent = state.solved.size + " solved";
    } catch (error) {
      $("blankPrompt").textContent = error.message;
      $("challengeCount").textContent = "Could not load challenges";
    }
  }
  function renderBlank() {
    const items = state.bank?.exercises || [];
    const item = items[state.blankIndex];
    if (!item) return;
    $("blankCounter").textContent = "Exercise " + (state.blankIndex + 1) + " of " + items.length;
    $("blankScore").textContent = state.blankCorrect + " correct";
    $("blankProgress").style.width = (state.blankAnswered.size / items.length * 100) + "%";
    $("blankPrompt").textContent = item.prompt;
    $("blankOptions").replaceChildren();
    $("blankFeedback").textContent = "";
    $("blankFeedback").className = "practice-feedback";
    $("blankHintText").hidden = true;
    $("blankHintText").textContent = item.hint;
    $("blankNext").disabled = true;
    item.options.forEach(option => {
      const button = document.createElement("button");
      button.type = "button"; button.textContent = option; button.setAttribute("aria-pressed","false");
      button.addEventListener("click", () => {
        if (state.blankAnswered.has(item.id)) return;
        for (const other of $("blankOptions").querySelectorAll("button")) { other.disabled = true; other.setAttribute("aria-pressed", String(other === button)); }
        state.blankAnswered.add(item.id);
        if (option === item.answer) {
          state.blankCorrect += 1;
          $("blankFeedback").className = "practice-feedback good";
          $("blankFeedback").textContent = "Correct. " + item.explanation;
        } else {
          $("blankFeedback").className = "practice-feedback bad";
          $("blankFeedback").textContent = "Correct answer: " + item.answer + ". " + item.explanation;
        }
        $("blankScore").textContent = state.blankCorrect + " correct";
        $("blankProgress").style.width = (state.blankAnswered.size / items.length * 100) + "%";
        $("blankNext").disabled = false;
        $("blankNext").textContent = state.blankIndex === items.length - 1 ? "Restart exercises" : "Next exercise";
      });
      $("blankOptions").append(button);
    });
  }
  $("blankHint").addEventListener("click", () => { $("blankHintText").hidden = !$("blankHintText").hidden; });
  $("blankNext").addEventListener("click", () => {
    if (state.blankIndex >= state.bank.exercises.length - 1) { state.blankIndex = 0; state.blankCorrect = 0; state.blankAnswered.clear(); }
    else state.blankIndex += 1;
    renderBlank();
  });
  async function loadQuizBank() {
    const index = await loadJson("/content/curriculum-index.json");
    const topics = index.topics.filter(topic => topic.courseId === "sql" && topic.languages?.en);
    const questions = [];
    for (let start = 0; start < topics.length; start += 10) {
      const batch = topics.slice(start, start + 10);
      const lessons = await Promise.all(batch.map(async topic => {
        try { return await loadJson(topic.languages.en); } catch { return null; }
      }));
      lessons.filter(Boolean).forEach(lesson => (lesson.assessment?.questions || []).forEach(question => {
        const answer = Number.isInteger(question.answer) ? question.options?.[question.answer] : question.answer;
        if (question.prompt && Array.isArray(question.options) && question.options.length >= 2 && question.options.includes(answer)) questions.push({...question,answer,topicId:lesson.topicId});
      }));
    }
    if (questions.length < 20) throw new Error("Not enough lesson questions were available to build the cumulative quiz.");
    return questions;
  }
  function shuffle(items) { const copy=[...items]; for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];} return copy; }
  async function startQuiz() {
    $("startQuiz").disabled = true; $("startQuiz").textContent = "Loading lesson questions…";
    try {
      const all = await loadQuizBank();
      state.quiz = shuffle(all).slice(0,20); state.quizIndex=0; state.quizCorrect=0;
      $("quizIntro").hidden=true; $("quizResult").hidden=true; $("quizStage").hidden=false;
      renderQuizQuestion();
    } catch(error) { $("quizIntro").hidden=false; $("startQuiz").textContent=error.message; }
    $("startQuiz").disabled=false;
  }
  function renderQuizQuestion() {
    const q=state.quiz[state.quizIndex]; state.quizAnswered=false;
    $("quizCounter").textContent="Question "+(state.quizIndex+1)+" of "+state.quiz.length+" · "+q.topicId;
    $("quizProgressText").textContent=state.quizCorrect+" correct so far";
    $("quizProgress").style.width=(state.quizIndex/state.quiz.length*100)+"%";
    $("quizPrompt").textContent=q.prompt; $("quizOptions").replaceChildren();
    $("quizFeedback").textContent=""; $("quizFeedback").className="practice-feedback"; $("quizNext").disabled=true;
    q.options.forEach(option=>{
      const label=document.createElement("label"); const input=document.createElement("input");
      input.type="radio"; input.name="cumulative-question"; input.value=option;
      input.addEventListener("change",()=>{
        if(state.quizAnswered)return; state.quizAnswered=true;
        for(const control of $("quizOptions").querySelectorAll("input"))control.disabled=true;
        if(option===q.answer){state.quizCorrect+=1;$("quizFeedback").className="practice-feedback good";$("quizFeedback").textContent="Correct. "+(q.explanation||"");}
        else{$("quizFeedback").className="practice-feedback bad";$("quizFeedback").textContent="Correct answer: "+q.answer+". "+(q.explanation||"");}
        $("quizProgressText").textContent=state.quizCorrect+" correct so far"; $("quizNext").disabled=false;
        $("quizNext").textContent=state.quizIndex===state.quiz.length-1?"View result":"Next question";
      });
      label.append(input,document.createTextNode(" "+option));$("quizOptions").append(label);
    });
  }
  $("startQuiz").addEventListener("click",startQuiz);
  $("quizNext").addEventListener("click",()=>{
    if(state.quizIndex<state.quiz.length-1){state.quizIndex+=1;renderQuizQuestion();return;}
    $("quizStage").hidden=true;$("quizResult").hidden=false;
    $("quizScore").textContent=state.quizCorrect+" / "+state.quiz.length;
    $("quizSummary").textContent="You answered "+Math.round(state.quizCorrect/state.quiz.length*100)+"% correctly. Review the explanations and try another set to strengthen your understanding.";
    try{localStorage.setItem("codesaathi-sql-last-quiz",JSON.stringify({score:state.quizCorrect,total:state.quiz.length,completedAt:new Date().toISOString()}));}catch{}
  });
  $("retryQuiz").addEventListener("click",()=>{ $("quizResult").hidden=true;$("quizIntro").hidden=false;$("startQuiz").textContent="Start another 20-question quiz"; });
  async function startExam() {
    $("startExam").disabled = true; $("startExam").textContent = "Loading the full lesson question bank…";
    try {
      const all = await loadQuizBank();
      state.exam = shuffle(all).slice(0,50); state.examIndex=0; state.examCorrect=0;
      $("examIntro").hidden=true; $("examResult").hidden=true; $("examStage").hidden=false;
      renderExamQuestion();
    } catch(error) { $("examIntro").hidden=false; $("startExam").textContent=error.message; }
    $("startExam").disabled=false;
  }
  function renderExamQuestion() {
    const q=state.exam[state.examIndex]; state.examAnswered=false;
    $("examCounter").textContent="Question "+(state.examIndex+1)+" of "+state.exam.length+" · "+q.topicId;
    $("examProgressText").textContent=state.examCorrect+" correct";
    $("examProgress").style.width=(state.examIndex/state.exam.length*100)+"%";
    $("examPrompt").textContent=q.prompt; $("examOptions").replaceChildren();
    $("examFeedback").textContent=""; $("examFeedback").className="practice-feedback"; $("examNext").disabled=true;
    q.options.forEach(option=>{
      const label=document.createElement("label"); const input=document.createElement("input");
      input.type="radio"; input.name="final-assessment-question"; input.value=option;
      input.addEventListener("change",()=>{
        if(state.examAnswered)return; state.examAnswered=true;
        for(const control of $("examOptions").querySelectorAll("input"))control.disabled=true;
        if(option===q.answer){state.examCorrect+=1;$("examFeedback").className="practice-feedback good";$("examFeedback").textContent="Correct. "+(q.explanation||"");}
        else{$("examFeedback").className="practice-feedback bad";$("examFeedback").textContent="Correct answer: "+q.answer+". "+(q.explanation||"");}
        $("examProgressText").textContent=state.examCorrect+" correct"; $("examNext").disabled=false;
        $("examNext").textContent=state.examIndex===state.exam.length-1?"Finish assessment":"Next question";
      });
      label.append(input,document.createTextNode(" "+option));$("examOptions").append(label);
    });
  }
  $("startExam").addEventListener("click",startExam);
  $("examNext").addEventListener("click",()=>{
    if(state.examIndex<state.exam.length-1){state.examIndex+=1;renderExamQuestion();return;}
    const percent=Math.round(state.examCorrect/state.exam.length*100);
    const passed=percent>=80;
    $("examStage").hidden=true;$("examResult").hidden=false;
    $("examScore").textContent=state.examCorrect+" / "+state.exam.length+" ("+percent+"%)";
    $("examOutcome").className="practice-feedback "+(passed?"good":"bad");
    $("examOutcome").textContent=passed?"PASS — You met the 80% suggested pass mark.":"NOT YET — Review the lessons and try again.";
    $("examSummary").textContent="This result is saved locally only. It is not an accredited or externally verifiable certificate.";
    try{localStorage.setItem("codesaathi-sql-final-assessment",JSON.stringify({score:state.examCorrect,total:state.exam.length,percent,passed,completedAt:new Date().toISOString()}));}catch{}
  });
  $("retryExam").addEventListener("click",()=>{$("examResult").hidden=true;$("examIntro").hidden=false;$("startExam").textContent="Start another final assessment";});
  function renderChallengeList() {
    $("challengeList").replaceChildren();
    state.challenges.forEach((challenge,index)=>{
      const button=document.createElement("button");button.type="button";
      button.setAttribute("aria-pressed",String(state.challenge?.id===challenge.id));
      button.textContent=(state.solved.has(challenge.id)?"✓ ":"")+challenge.id+" · "+challenge.title+" ("+challenge.difficulty+")";
      button.addEventListener("click",()=>selectChallenge(challenge));$("challengeList").append(button);
    });
  }
  function selectChallenge(challenge) {
    state.challenge=challenge;$("challengeTitle").textContent=challenge.title;$("challengePrompt").textContent=challenge.prompt;
    $("challengeDialect").textContent=challenge.dialectNote||"SQLite retail dataset";
    $("challengeSql").value=challenge.starterCode||"";$("checkChallenge").disabled=!state.workerReady;
    $("showHint").disabled=false;$("challengeFeedback").textContent="";$("challengeFeedback").className="practice-feedback";
    $("challengeOutput").textContent="Each check uses a fresh database snapshot. Your query does not change the shared challenge data.";
    renderChallengeList();
  }
  $("showHint").addEventListener("click",()=>{
    if(!state.challenge)return;
    const hints=state.challenge.hints||[];
    $("challengeFeedback").className="practice-feedback";$("challengeFeedback").textContent=hints.length?hints.join(" "):"No hint is available for this challenge.";
  });
  $("checkChallenge").addEventListener("click",()=>{
    if(!state.challenge||!state.workerReady||state.pending)return;
    state.runId+=1;state.pending={id:state.challenge.id};
    $("checkChallenge").disabled=true;$("challengeFeedback").className="practice-feedback";$("challengeFeedback").textContent="Checking query in an isolated SQLite database…";
    state.worker.postMessage({type:"challenge-check",runId:state.runId,setupSql:state.challengeBankSetup,code:$("challengeSql").value,expectedRows:state.challenge.expectedRows,challengeId:state.challenge.id});
  });
  init();
})();
