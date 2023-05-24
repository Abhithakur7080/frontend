let equal_pressed = 0;
let button_pressed =document.querySelectorAll('.input-button');

let input = document.getElementById('input');
let equal = document.getElementById('equal');
let clear = document.getElementById('clear');
let erase = document.getElementById('erase');

//to show on window screen
window.onload = () => {
    input.value = "";
}

// after equal pressed show result
button_pressed.forEach((button_class) => {
    button_class.addEventListener('click', () => {
        if(equal_pressed == 1){
            // input.value ="";
            equal_pressed=0;
        }
        input.value += button_class.value;
    });
});

equal.addEventListener('click', () => {
    equal_pressed=1;
    let inp_value = input.value;
    try{
        let solution = eval(inp_value);
        if(Number.isInteger(solution)){
            input.value = solution;
        }
        else{
            input.value = solution.toFixed(2);
        }
    } catch(err) {
        alert("Invalid Input");
    }
});

clear.addEventListener('click', () => {
    input.value = "";
});
erase.addEventListener('click', () => {
    // input.value = input.value.substr(0, input.value.length-1);
    input.value = input.value.slice(0, input.value.length-1);
})