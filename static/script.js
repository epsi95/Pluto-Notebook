let selectedCellNumber = 1;
let maxCellNumber = 1;

function do_resize(textbox) {

    var maxrows=50; 
     var txt=textbox.value;
     var cols=textbox.cols;
   
    var arraytxt=txt.split('\n');
     var rows=arraytxt.length; 
   
    for (i=0;i<arraytxt.length;i++) 
     rows+=parseInt(arraytxt[i].length/cols);
   
    if (rows>maxrows) textbox.rows=maxrows;
     else textbox.rows=rows;
    }

function selecteCell(cell){
    if(selectedCellNumber){
        document.getElementById(selectedCellNumber).style.backgroundColor = "white";
    }
    selectedCellNumber = cell.id;
    document.getElementById(selectedCellNumber).style.backgroundColor = "coral";
    console.log('cell selected: ', selectedCellNumber)
}

// automatically select the first cell
selecteCell(document.getElementById("1"))

function addCell(){
    maxCellNumber ++;
    document.getElementById("cell-list").insertAdjacentHTML( 'beforeend', 
    `<div class="cell" id="${maxCellNumber}" onclick="selecteCell(this)"> 
    <h4>[${maxCellNumber}]</h4>
    <textarea onkeyup="do_resize(this);"></textarea>
    <p></p>
    </div>`);
    selecteCell(document.getElementById(maxCellNumber));
}
