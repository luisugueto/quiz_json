const create_label = (name) =>{
    let label = document.createElement("label");
    let textLabel = document.createTextNode(name);
    
    label.appendChild(textLabel);

    return label;
};

module.exports = create_label;