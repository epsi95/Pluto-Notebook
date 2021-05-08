function runCell() {
    text = document.getElementById(selectedCellNumber).children[1].value;
    console.log(text);

    // we need to disable the run button for further run
    document.getElementById('run').disabled = true;
    fetch('/evaluate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            command: text
        })
    }).then((response)=>response.json()).then((data)=>{
        console.log(data);
        document.getElementById(selectedCellNumber).children[2].innerText = data.result;
        document.getElementById('run').disabled = false;
    });
}