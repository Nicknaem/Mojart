function query(selector){
    return document.querySelector(selector);
}

function times(count){
    return new Array(count).fill(0);
}

async function copy(string){
    try {
        await navigator.clipboard.writeText(string);
        console.log('Content copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
        copySafari(string)
    }
}

function copySafari(string){
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', string);
    input.style.opacity = '0';
    input.style.position = 'absolute';
    // input.style.left = '-9999px';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}