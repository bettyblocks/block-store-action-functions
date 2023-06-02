const switchText = async ({input, cases, defaultCase = ""}) => {
    // The input is a string value
    // E.g case === [{key:  "firstName", value: "Betty"}]
    // If the input equals the key.name then return the value
    // If the input does not equal the key.name then return the input

    let result = defaultCase;
    cases.forEach((caseItem) => { 
        if (input === caseItem.key) {
            result = caseItem.value;
        }
    });
    
    
    return { result };
}

export default switchText;