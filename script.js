function setActiveButton(buttonId, type) {
    const buttons = document.querySelectorAll(`.toolbar .button${type}`);
    buttons.forEach(button => button.classList.remove(`active${type}`));
    document.getElementById(buttonId).classList.add(`active${type}`);
}
  
function changeColor(color) {
    document.getElementById('editor').style.color = color;
    setActiveButton(`${color}Button1`, 1);
}
  
function changeSize(size) {
    document.getElementById('editor').style.fontSize = size;
    setActiveButton(`${size}Button2`, 2);
}
  
function makeBold() {
    const editor = document.getElementById('editor');
    editor.style.fontWeight = editor.style.fontWeight === 'bold' ? 'normal' : 'bold';
    setActiveButton('boldButton3', 3);
}


const editor = document.getElementById('editor');
const text = "Start typing here...";
let index = 0;
let forward = true;
let typingStarted = false;

function typeWriter() {
    if (!typingStarted) {
    if (forward) {
    if (index < text.length) {
        editor.innerHTML += text.charAt(index);
        index++;
    } else {
        forward = false;
        index--;
    }
    } else {
    if (index >= 0) {
        const newText = text.substring(0, index);
        editor.innerHTML = newText;
        index--;
    } else {
        forward = true;
        index = 0;
    }
    }
    // 50- time in millisec
    setTimeout(typeWriter, 50);
    } else {
    // Clear the content of the editor when typing starts
    editor.innerHTML = "";
    }
}
//   typeWriter()
window.onload = function() {
    editor.addEventListener('focus', function() {
        typingStarted = true;
    });
    var contentFromLocalStorage = localStorage.getItem('editor');
    if (contentFromLocalStorage) {
        document.getElementById("editor").innerText = contentFromLocalStorage;
    } else {
        typeWriter();
    }

    
    
};




document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("clear").addEventListener("click", () => {
        localStorage.clear();
        editor.innerHTML = "";
    });
});
document.getElementById("save").addEventListener("click", ()=> (localStorage.setItem("editor", editor.innerHTML)))
// document.getElementById("copy").addEventListener("click", ()=> {
//     copyText = document.getElementById('editor');
//     copyText.select();
//      copyText.setSelectionRange(0, 99999);
//     // copyText = document.getElementById('editor');
//     navigator.clipboard.writeText(copyText.textContent)
// })


document.getElementById("copy").addEventListener("click", () => {
    let copyText = document.getElementById('editor');
    navigator.clipboard.writeText(copyText.textContent)
        // .then(() => {
        //     console.log('Text copied successfully!');
        // })
        // .catch(err => {
        //     console.error('Error copying text: ', err);
        // });
});
  