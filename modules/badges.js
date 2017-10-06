import label from './create_label';

window.add_badges = () => {
    let badges = document.getElementById('badges'), countBadges = document.querySelector('input[name="countBadges"]');
    let divSlug = document.createElement("div"), divPoints = document.createElement("div");
    let labelSlug = label('Slug'), labelPoints = label('Points');
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
    
    divSlug.appendChild(labelSlug);
    divSlug.appendChild(inputSlug);
    
    divPoints.appendChild(labelPoints);
    divPoints.appendChild(inputPoints);
    
    badges.appendChild(divSlug);
    badges.appendChild(divPoints);
    
    return badges;
};