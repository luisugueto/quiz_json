import label from './create_label';

window.add_answer = (number) => {
    let answers = document.getElementById('answer'+number), countAnswers = document.querySelector('input[name="countAnswerQuestion'+number+'"]'), contador = parseInt(countAnswers.value);
    let divAnswer = document.createElement("div");
    let divQuestion = document.getElementById('question'+number);
    let labelAnswer = label('Answer'), labelAnswerCorrect = label('Correct');
    let inputAnswer = document.createElement("input"), radioAnswer = document.createElement("input");
    
    contador++;
    countAnswers.value = contador;
    
    inputAnswer.name = "answer"+contador+"-Question"+number;
    inputAnswer.required = "required";

    radioAnswer.type ="radio";
    radioAnswer.value = contador;
    radioAnswer.name = "correct"+number;

    divAnswer.appendChild(labelAnswer);
    divAnswer.appendChild(inputAnswer);
    divAnswer.appendChild(labelAnswerCorrect);
    divAnswer.appendChild(radioAnswer);

    divQuestion.appendChild(divAnswer);

    return divQuestion;
};