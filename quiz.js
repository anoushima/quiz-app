let quizbox=document.querySelector(".quiz");
let startbtn=document.querySelector(".btn");
let score=0;

startbtn.addEventListener("click",function(){
    quizbox.classList.add("active-quiz");
    showquestion();
})



let questions=[
    {
        question:"which language runs in a web browser?",
        options:["Java","C","Python","JavaScript"],
        answer:"JavaScript"
    },
    {
        question:"what does css stands for?",
        options:[
            "cascading style sheets",
            "creative style system",
            "computer styled system",
            "colorfulstyle sheets"
        ],
        answer:"cascading style sheets"

    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyperlink and Text Markup Language",
            "HighText Machine Language",
            "HyperText Markup Language",
            "Home Tool Markup Language"
        ],
        answer: "HyperText Markup Language"
    },
    {
        question: "Which company developed Java?",
        options: ["Microsoft", "Sun Microsystems", "Google", "IBM"],
        answer: "Sun Microsystems"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "#", "<!-- -->", "/* */"],
        answer: "//"
    },
    
];


let currentquestion=0;
let timer;


function showquestion(){
    let q=questions[currentquestion];
    quizbox.innerHTML=
    '<div class="question-container">'+
    "<h2>"+(currentquestion+1)+"."+q.question+"</h2>"+
    '<p id="timer">⏳ 10</p>' +
    '<div class="options">'+
    q.options
    .map(function(opt,index){
        let letters=["a) ","b) ","c) ","d) "];
        return'<button class="option-btn">'+letters[index]+opt+"</button>";
    })

    .join("")+
    "</div>"+
    '<button class="next-btn"disabled>Next</button>'
    "</div>";


    let optionbuttons=document.getElementsByClassName("option-btn");
    let nextbtn=document.querySelector(".next-btn");

   


    for(let i=0;i<optionbuttons.length;i++)
        optionbuttons[i].onclick=function(){
    checkanswer(this,q.answer);
    nextbtn.disabled=false;
};

 nextbtn.addEventListener("click",function(){
    clearInterval(timer);
    nextquestion();
});

let timeleft=10;
let timedisplay=document.getElementById("timer");



timer=setInterval(function(){
    timeleft--;
    timedisplay.textContent="⏳ "+timeleft+"s";
    if(timeleft===0){
        clearInterval(timer);
        nextquestion();
    }
},1000);




}

function checkanswer(selectedbtn,correctans){
    clearInterval(timer);
    let optionbuttons=document.getElementsByClassName("option-btn");

    for (let i=0;i<optionbuttons.length;i++){
        optionbuttons[i].disabled=true;
       
    }

    if(selectedbtn.textContent.slice(2).trim()===correctans){
        score++;
    }

    
    // setTimeout(nextquestion,1000);

}

function nextquestion(){
    let container=document.querySelector(".question-container");
    currentquestion++
    if(!container)return;

    container.classList.add("slideout");

    container.addEventListener("animationend",function(){
        if(currentquestion<questions.length){
            showquestion();
        }
        else{
            showresult();
        }
    },{once:true});
}

function showresult(){
    let total=questions.length;
    quizbox.innerHTML=`
        <div class="result-container">
        <h2>🎉 Quiz completed!</h2>
        <div class="score-meter">
        <span>${score}/${total}</span>
        </div>
        <button class="review-btn">Review</button>
        <button class="restart-btn">Restat</button>
        </div>`;


document.querySelector(".review-btn").addEventListener("click",function(){
    showreview();
});

document.querySelector(".restart-btn").addEventListener("click",function(){
    restartquiz();
});

}




function showreview(){
    let reviewHTML="<h2>Review</h2>";
    questions.forEach(function(q,index){
        reviewHTML+=`
            <div class="review-question">
            <h3>${index+1}.${q.question}</h3>
            <p><b>Correct Answer:</b>${q.answer}</p>
            </div>`;
    });
    quizbox.innerHTML=reviewHTML+`
        <button class="restart-btn">Restart Quiz</button>
        `;
    document.querySelector(".restart-btn").addEventListener("click",function(){
        restartquiz();
    });
}

function restartquiz(){
    currentquestion=0;
    score=0;
    clearInterval(timer);
    showquestion();
}
