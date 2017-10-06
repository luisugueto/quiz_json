import label from './create_label';
export var deleted_Questions = '';

window.add_question = () => {
    let questions = document.getElementById('questions'), countQuestions = document.querySelector('input[name="countQuestions"]');
    let divQuestion = document.createElement("div"), divAnswer = document.createElement("div"), divButton = document.createElement("div");
    let labelQuestion = label('Question'), labelAnswer = label('Answer'), labelAnswerCorrect = label('Correct');
    let inputQuestion = document.createElement("input"), inputAnswer = document.createElement("input"), inputCountAnswer = document.createElement("input");
    let radioAnswer = document.createElement("input"), buttonAnswer = document.createElement("button"), buttonDelete = document.createElement("button"), br = document.createElement("br");;  
    let contador = parseInt(countQuestions.value);
    
    contador++;
    countQuestions.value = contador;

    buttonAnswer.innerHTML = 'Add Answer';
    buttonAnswer.setAttribute('class', 'btn btn-primary');
    buttonAnswer.onclick = () =>{
        add_answer(contador);
    };

    buttonDelete.innerHTML = 'Remove Question';
    buttonDelete.setAttribute('class', 'btn btn-warning');
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

    divQuestion.id = "question"+contador;

    inputCountAnswer.name    = "countAnswerQuestion"+contador;
    inputCountAnswer.type = "hidden";
    inputCountAnswer.value = 0;

    divAnswer.appendChild(labelAnswer);
    divAnswer.appendChild(inputAnswer)
    divAnswer.appendChild(labelAnswerCorrect)
    divAnswer.appendChild(radioAnswer)

    divQuestion.appendChild(br);
    divQuestion.appendChild(labelQuestion);
    divQuestion.appendChild(inputQuestion);
    divQuestion.appendChild(inputCountAnswer);
    divQuestion.appendChild(divAnswer);
    
    divButton.id="button_question"+contador;

    questions.appendChild(divQuestion); 
    divButton.appendChild(buttonAnswer);
    divButton.appendChild(buttonDelete); 
    questions.appendChild(divButton);      

    return questions;
};

window.deleteQuestion = (number) => {
    let element = document.getElementById("question"+number);
    let button = document.getElementById("button_question"+number);
    element.parentNode.removeChild(element);
    button.parentNode.removeChild(button);

    if(deleted_Questions == ''){
        deleted_Questions += number;  
    }
    else{
        deleted_Questions += ","+number;  
    }

    return deleted_Questions;
};