var add_badges = () => {
    let badges = document.getElementById('badges'), countBadges = document.querySelector('input[name="countBadges"]');
    let divSlug = document.createElement("div"), divPoints = document.createElement("div");
    let labelSlug = document.createElement("label"), labelPoints = document.createElement("label");
    let textLabelSlug = document.createTextNode('Slug'), textLabelPoints = document.createTextNode('Points');
    let inputSlug = document.createElement("input"), inputPoints = document.createElement("input"), inputBadges = document.createElement("input");  
    let contador = parseInt(countBadges.value);

    contador++;
    countBadges.value = contador;

    inputSlug.type = "text";
    inputSlug.setAttribute('class', 'slug');
    inputSlug.name = "slug[]";
    inputSlug.required = "required";
    
    inputPoints.type = "number";
    inputPoints.name = "point[]";
    inputPoints.setAttribute('class', 'point');
    inputPoints.value = 0;
    inputPoints.max = 100;
    inputPoints.min = 0;
    inputPoints.required = "required";
    
    labelSlug.appendChild(textLabelSlug);
    labelPoints.appendChild(textLabelPoints);
    
    divSlug.appendChild(labelSlug);
    divSlug.appendChild(inputSlug);
    
    divPoints.appendChild(labelPoints);
    divPoints.appendChild(inputPoints);
    
    badges.appendChild(divSlug);
    badges.appendChild(divPoints);
};

var add_question = () => {
    let questions = document.getElementById('questions'), countQuestions = document.querySelector('input[name="countQuestions"]');
    let divQuestion = document.createElement("div"), divAnswer = document.createElement("div"), divAnswer2 = document.createElement("div");
    let labelQuestion = document.createElement("label"), labelAnswer = document.createElement("label"), labelAnswerCorrect = document.createElement("label");
    let textLabelQuestion = document.createTextNode('Question'), textLabelAnswer = document.createTextNode('Answer'), textLabelAnswerCorrect = document.createTextNode('Correct');
    let inputQuestion = document.createElement("input"), inputAnswer = document.createElement("input"), inputCountAnswer = document.createElement("input");
    let radioAnswer = document.createElement("input"), buttonAnswer = document.createElement("button"), buttonDelete = document.createElement("button");  
    let contador = parseInt(countQuestions.value);
    
    contador++;
    countQuestions.value = contador;

    buttonAnswer.innerHTML = 'Add Answer';
    buttonAnswer.onclick = () =>{
        add_answer(contador);
    };

    buttonDelete.innerHTML = 'Remove Question';
    buttonDelete.onclick = () =>{
        deleteQuestion(contador);
    };
    
    inputQuestion.type="text";
    inputQuestion.name ="question"+contador;
    inputQuestion.required = "required";

    radioAnswer.type ="radio";
    radioAnswer.value = contador;
    radioAnswer.name = "correct"+contador;
    radioAnswer.checked = "checked";

    inputAnswer.type = "text";
    inputAnswer.name = "answer0-Question"+contador;
    inputAnswer.required = "required";

    divAnswer2.id = "answer"+contador;
    divQuestion.id = "question"+contador;

    labelAnswer.appendChild(textLabelAnswer);

    inputCountAnswer.name    = "countAnswerQuestion"+contador;
    inputCountAnswer.type = "hidden";
    inputCountAnswer.value = 0;

    divAnswer.appendChild(labelAnswer);
    divAnswer.appendChild(inputAnswer);
    labelAnswerCorrect.appendChild(textLabelAnswerCorrect);
    divAnswer.appendChild(labelAnswerCorrect);
    divAnswer.appendChild(radioAnswer);
    divAnswer2.appendChild(buttonDelete);

    labelQuestion.appendChild(textLabelQuestion);

    divQuestion.appendChild(labelQuestion);
    divQuestion.appendChild(inputQuestion);
    divQuestion.appendChild(inputCountAnswer);
    divQuestion.appendChild(divAnswer);
    divQuestion.appendChild(divAnswer2);
    divQuestion.appendChild(buttonAnswer);
    questions.appendChild(divQuestion);    
};

var add_answer = (number) => {
    let answers = document.getElementById('answer'+number), countAnswers = document.querySelector('input[name="countAnswerQuestion'+number+'"]'), contador = parseInt(countAnswers.value);
    let divAnswer = document.createElement("div");
    let labelAnswer = document.createElement("label"), labelAnswerCorrect = document.createElement("label");
    let textLabelAnswer = document.createTextNode('Answer'), textLabelAnswerCorrect = document.createTextNode('Correct');
    let inputAnswer = document.createElement("input"), radioAnswer = document.createElement("input");
    
    labelAnswer.appendChild(textLabelAnswer);
    contador++;
    countAnswers.value = contador;
    
    inputAnswer.name = "answer"+contador+"-Question"+number;
    inputAnswer.required = "required";

    radioAnswer.type ="radio";
    radioAnswer.value = contador;
    radioAnswer.name = "correct"+number;

    divAnswer.appendChild(labelAnswer);
    divAnswer.appendChild(inputAnswer);
    labelAnswerCorrect.appendChild(textLabelAnswerCorrect);
    divAnswer.appendChild(labelAnswerCorrect);
    divAnswer.appendChild(radioAnswer);
    answers.appendChild(divAnswer);
};

var getJson = () => {
    let name = document.querySelector('input[name="name"]').value, main = document.querySelector('input[name="main"]').value; 
    let results = document.querySelector('input[name="results"]').value, slug = document.querySelector('input[name="slug"]').value; 
    let category = document.querySelector('input[name="category"]').value; 
    let countBadges = document.querySelector('input[name="countBadges"]'), countQuestions = document.querySelector('input[name="countQuestions"]');    
    var json = {};

    var info = {
        "name": name,
        "main": main,
        "results": results,
    }
    json.info = info;

    json.info.badges = [];
    
    var inputsSlug = document.getElementsByClassName( 'slug' ),
    namesSlug  = [].map.call(inputsSlug, function( input ) {
        return input.value;
    }).join( '|' );

    var inputsPoint = document.getElementsByClassName( 'point' ),
    namesPoint  = [].map.call(inputsPoint, function( input ) {
        return input.value;
    }).join( '|' );
    
    
    for(let i = 1; i <= inputsPoint.length; i++){  
        let structJson = {};
        structJson.slug = inputsSlug[i-1].value;
        structJson.points = inputsPoint[i-1].value;
        json.info.badges.push(structJson);
        alert(inputsSlug[i-1].value);
    }
    
    json.info.slug = slug;
    json.info.category = category;
    json.info.questions = [];

    for(let i = 0; i <= countQuestions.value; i++){
        let questions = document.querySelector('input[name="question'+i+'"]');
        let countQuestions = document.querySelector('input[name="countAnswerQuestion'+i+'"]');
        
        let correct_answer;
        let structJson = {};
        structJson.q = questions.value;
        structJson.a = [];
        for(let j = 0; j <= countQuestions.value; j++){
            let correct = document.getElementsByName("correct"+i);
            if(correct[j].checked)
                correct_answer = j;
        }
        
        for(let j = 0; j <= countQuestions.value; j++){
            let answer = document.querySelector('input[name="answer'+j+'-Question'+i+'"]');
            let deleteQuestions = document.getElementById("deleteQuestions"), answerJson = {};
            
            answerJson.option = answer.value
            
            if(j == correct_answer)
                answerJson.correct = true;
            else
                answerJson.correct = false;
            structJson.a.push(answerJson);
        }
        json.info.questions.push(structJson);        
    }
    
    console.log("["+JSON.stringify(json)+"]");
};

var checkform = () => {
    var form = document.getElementById("form");
    questions
    // get all the inputs within the submitted form
    var inputs = form.getElementsByTagName('input');
    
    for (var i = 0; i < inputs.length; i++) {
        // only validate the inputs that have the required attribute
        if(inputs[i].hasAttribute("required")){
            if(inputs[i].value == ""){
                // found an empty field that is required
                alert("Please fill all required fields");
                return false;
            }
        }
    }    
    getJson();
};

var deleteQuestion = (number) => {
    let element = document.getElementById("question"+number);
    let deleteQuestions = document.getElementById("deleteQuestions");
    element.parentNode.removeChild(element);
    if(deleteQuestions.value === '')
        deleteQuestions.value += number;    
    else
        deleteQuestions.value += ","+number;  

    var deletes = deleteQuestions.value.split(",");

    for(let i = 0; i < deletes.length; i++)
        alert(deletes[i]);
    

};