import {deleted_Questions} from '../modules/questions';

export const getJson = () => {
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
    }
    
    json.info.slug = slug;
    json.info.category = category;
    json.info.questions = [];

    for(let i = 0; i <= countQuestions.value; i++){
        
        if(deleted_Questions.indexOf(i) < 0){
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
    }

    return console.log("["+JSON.stringify(json)+"]");
};

window.checkform = () => {
    var form = document.getElementById("form");

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
    return false;
};