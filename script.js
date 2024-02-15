var board = [
    ['','',''],
    ['','',''],
    ['','','']
];
var HUMAN = -1;
var AI = 1;

var winner = null;
var winningIndexes = [];

var prevMove = 'x';
var currentMove = 'o';
let maxdepth = Infinity;

let times = [];
let nodes = [];
let nodesExpanded = [0,0];

let minimax = function (board, depth, player, currentMove, prevMove){
    var best = null;
    nodesExpanded[0]++;
    var newBoard = board;
    if(player=='comp'){
        best = [-1,-1,-Infinity];
    }else{
        best = [-1,-1,Infinity];
    }
    if(depth==0 || terminal(newBoard)){
        if(player=='comp'){
            best = [-1,-1,eval(newBoard, currentMove, prevMove)];
            return best;
        }else{
            best = [-1,-1,eval(newBoard, prevMove, currentMove)];
            return best;
        }
    };
    if(player=='comp'){
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(newBoard[i][j]==''){
                    tempBoard = newBoard;
                    tempBoard[i][j] = currentMove;
                    var value = minimax(tempBoard, depth-1, 'human', prevMove, currentMove);
                    //console.log(value)
                    newBoard[i][j] = '';
                    if(value[2]>best[2]){
                        best = [i,j,value[2]];
                    }
                }
            }
        }
    }else if(player=='human'){
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(newBoard[i][j]==''){
                    tempBoard = newBoard;
                    tempBoard[i][j] = currentMove;
                    var value = minimax(tempBoard, depth-1, 'comp', prevMove, currentMove);
                    //console.log(value)
                    newBoard[i][j] = '';
                    if(value[2]<best[2]){
                        best = [i,j,value[2]];
                    }
                }
            }
        }
    }
    return best;
}

let terminal= function(board){
    //checking rows and columns
    for(let i=0;i<3;i++){
        if(board[i][0]!='' && board[i][0]==board[i][1] && board[i][1]==board[i][2]){
            return true;
        }
        if(board[0][i]!='' && board[0][i]==board[1][i] && board[1][i]==board[2][i]){
            return true;
        }
    }
    //checking diagonals
    if(board[0][0]!='' && board[0][0]==board[1][1] && board[1][1]==board[2][2]){
        return true;
    }
    if(board[0][2]!='' && board[0][2]==board[1][1] && board[1][1]==board[2][0]){
        return true;
    }
    //checking if board is full
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j]==''){
                return false;
            }
        }
    }
    return true;

};

let eval = function(board, currentPlayer, prevPlayer){
    //console.log(1);
    let score = 0;
    var opponent = prevPlayer;
    //adding number of directions open for max to win
    for(let i=0;i<3;i++){
        if((board[i][0]==currentPlayer||board[i][0]=='') && (board[i][1]==currentPlayer||board[i][1]=='') && (board[i][2]==currentPlayer||board[i][2]=='')){
            score++;
        } //checking rows
        if((board[0][i]==currentPlayer||board[0][i]=='') && (board[1][i]==currentPlayer||board[1][i]=='') && (board[2][i]==currentPlayer||board[2][i]=='')){
            score++;
        } //checking columns
    }
        if((board[0][0]==currentPlayer||board[0][0]=='') && (board[1][1]==currentPlayer||board[1][1]=='') && (board[2][2]==currentPlayer||board[2][2]=='')){
            score++;
        } //checking first diagonal
        if((board[0][2]==currentPlayer||board[0][2]=='') && (board[1][1]==currentPlayer||board[1][1]=='') && (board[2][0]==currentPlayer||board[2][0]=='')){
            score++;
        } //checking second diagonal
    //subtracting number of directions open for min to win
    for(let i=0;i<3;i++){
        if((board[i][0]==opponent||board[i][0]=='') && (board[i][1]==opponent||board[i][1]=='') && (board[i][2]==opponent||board[i][2]=='')){
            score--;
        } //checking rows
        if((board[0][i]==opponent||board[0][i]=='') && (board[1][i]==opponent||board[1][i]=='') && (board[2][i]==opponent||board[2][i]=='')){
            score--;
        } //checking columns
    }
        if((board[0][0]==opponent||board[0][0]=='') && (board[1][1]==opponent||board[1][1]=='') && (board[2][2]==opponent||board[2][2]=='')){
            score--;
        } //checking first diagonal
        if((board[0][2]==opponent||board[0][2]=='') && (board[1][1]==opponent||board[1][1]=='') && (board[2][0]==opponent||board[2][0]=='')){
            score--;
        } //checking second diagonal
        //checking if there is a winner
        let tienum = 0;
        for (let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(board[i][j]!=''){
                    tienum++;
                }
            }
        }
        if(tienum==9){
            score = 0;
        }
        for(let i=0;i<3;i++){
            if(board[i][0]!='' && board[i][0]==board[i][1] && board[i][1]==board[i][2]){
                board[i][0]==currentPlayer?score=Infinity:score=-Infinity;
            }
            if(board[0][i]!='' && board[0][i]==board[1][i] && board[1][i]==board[2][i]){
                board[0][i]==currentPlayer?score=Infinity:score=-Infinity;
            }
        }
        if(board[0][0]!='' && board[0][0]==board[1][1] && board[1][1]==board[2][2]){
            board[0][0]==currentPlayer?score=Infinity:score=-Infinity;
        }
        if(board[0][2]!='' && board[0][2]==board[1][1] && board[1][1]==board[2][0]){
            board[0][2]==currentPlayer?score=Infinity:score=-Infinity;
        }
        //checkig if there is a tie
    return score;
}

playAgain = function(){
    board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];
    winner = null;
    winningIndexes = [];
    prevMove = 'x';
    currentMove = 'o';
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            document.getElementById(`${i}${j}`).style.backgroundColor = 'rgba(255, 255, 255, 0)';
            document.getElementById(`${i}${j}`).style.backgroundImage = 'none';
        }
    }
    document.getElementById('winner').style.display= 'none';
    document.getElementById('add_ai_turn').style.display = 'block';
    document.getElementById('depth').style.display = 'flex';
    document.getElementById('algo').style.display = 'block';
    times = [];
}

change_depth = function(){
    //set maxdepth to value attribute of input element inside div with id 'depth'
    maxdepth = document.getElementById('depth').childNodes[1].value;
}

let minimax_with_alpha_beta = function(board, depth, alpha, beta, player, currentMove, prevMove){   
    var best = null;
    var newBoard = board;
    nodesExpanded[1]++;
    if(player=='comp'){
        best = [-1,-1,-Infinity];
    }else{
        best = [-1,-1,Infinity];
    }
    if(depth==0 || terminal(newBoard)){
        if(player=='comp'){
            best = [-1,-1,eval(newBoard, currentMove, prevMove)];
            return best;
        }else{
            best = [-1,-1,eval(newBoard, prevMove, currentMove)];
            return best;
        }
    };
    if(player=='comp'){
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(newBoard[i][j]==''){
                    tempBoard = newBoard;
                    tempBoard[i][j] = currentMove;
                    var value = minimax_with_alpha_beta(tempBoard, depth-1, alpha, beta, 'human', prevMove, currentMove);
                    newBoard[i][j] = '';
                    if(value[2]>best[2]){
                        best = [i,j,value[2]];
                    }
                    alpha = Math.max(alpha, value[2]);
                    if(alpha>=beta){
                        break;
                    }
                }
            }
        }
    }else if(player=='human'){
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(newBoard[i][j]==''){
                    tempBoard = newBoard;
                    tempBoard[i][j] = currentMove;
                    var value = minimax_with_alpha_beta(tempBoard, depth-1, alpha, beta, 'comp', prevMove, currentMove);
                    newBoard[i][j] = '';
                    if(value[2]<best[2]){
                        best = [i,j,value[2]];
                    }
                    beta = Math.min(beta, value[2]);
                    if(alpha>=beta){
                        break;
                    }
                }
            }
        }
    }
    return best;
}

change_algo = function(){
    if(algo==minimax){
        algo = minimax_with_alpha_beta;
        document.getElementById('algo').innerText = 'Algorithm: Minimax with Alpha-Beta Pruning, click to change.';
    }
    else{
        algo = minimax;
        document.getElementById('algo').innerText = 'Algorithm: Simple Minimax, click to change.';
    }
}

let algo = minimax;

function addMark(id){
    let x = Number(id[0]);
    let y = Number(id[1]);
    if(board[x][y]==''){
        board[x][y] = currentMove;
        prevMove = currentMove;
        document.getElementById(id).style.backgroundImage = `url("${currentMove}.png")`;
        if(currentMove=='x'){
            currentMove = 'o';
        }else{
            currentMove = 'x';
        }
        // console.log(eval(board))
        if(isGameOver()){
            displayWinner();
        }
    }
}

function hasWinner(){
    //checking rows
    for(let i=0;i<3;i++){
        if(board[i][0]!='' && board[i][0]==board[i][1] && board[i][1]==board[i][2]){
            winningIndexes = [[i,0],[i,1],[i,2]];
            return true;
        }
    }
    //checking columns
    for(let i=0;i<3;i++){
        if(board[0][i]!='' && board[0][i]==board[1][i] && board[1][i]==board[2][i]){
            winningIndexes = [[0,i],[1,i],[2,i]];
            return true;
        }
    }
    //checking first diagonal
    if(board[0][0]!='' && board[0][0]==board[1][1] && board[1][1]==board[2][2]){
        winningIndexes = [[0,0],[1,1],[2,2]];
        return true;
    }
    //checking second diagonal
    if(board[0][2]!='' && board[0][2]==board[1][1] && board[1][1]==board[2][0]){
        winningIndexes = [[0,2],[1,1],[2,0]];
        return true;
    }
    return false;
}

function isBoardFull(){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j]==''){
                return false;
            }
        }
    }
    return true;
}

function isGameOver(){
    if(hasWinner()){
        winner = prevMove;
        return true;
    }else if(isBoardFull()){
        winner = 'tie';
        return true;
    }
    return false;
}

function displayWinner(){
    if(winner!='tie'){
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                for(let k=0;k<3; k++){
                    if(winningIndexes[k][0]==i && winningIndexes[k][1]==j){
                        document.getElementById(`${i}${j}`).style.backgroundImage = 'none';
                        document.getElementById(`${i}${j}`).style.backgroundColor = 'green';
                    }
                }
            }
        }
        document.getElementById('winnertext').innerText = `Winner: ${winner.toUpperCase()}`;
        document.getElementById('winner').style.display= 'block';
        document.getElementById('add_ai_turn').style.display = 'none';
        document.getElementById('depth').style.display = 'none';
        document.getElementById('algo').style.display = 'none';
    }
    else {
        document.getElementById('winnertext').innerText = `It's a tie!`;
        document.getElementById('winner').style.display= 'block';
        document.getElementById('add_ai_turn').style.display = 'none';
        document.getElementById('depth').style.display = 'none';
        document.getElementById('algo').style.display = 'none';
    }
}

function ai_turn(){
    if(winner==null){
        var currentSign = currentMove;
        let numEmpty = 0;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(board[i][j]==''){
                    numEmpty++;
                }
            }
        } 
        var nextTurn = null;
        const startTime = performance.now();
        if(numEmpty==9){
            nextTurn = [Math.floor(Math.random()*3), Math.floor(Math.random()*3), board];
        }
        else{
            //nextTurn = algo(board, maxdepth ,'comp', currentMove, prevMove);
            if(algo==minimax){
                nextTurn = minimax(board, maxdepth ,'comp', currentMove, prevMove);
            }
            else{
                nextTurn = minimax_with_alpha_beta(board, maxdepth, -Infinity, Infinity, 'comp', currentMove, prevMove);
            }
        }
        const endTime = performance.now();
        let algorithm = '';
        if(algo==minimax){
            algorithm = 'Simple Minimax algorithm';
        }else{
            algorithm = 'Minimax with Alpha-Beta Pruning algorithm';
        }
        // measure time taken by another algorithm
        const startTime2 = performance.now();
        let nextTurn2 = null;
        if(numEmpty!=9){
            if(algo==minimax){
                nextTurn2 = minimax_with_alpha_beta(board, maxdepth, -Infinity, Infinity, 'comp', currentMove, prevMove);
            }
            else{
                nextTurn2 = minimax(board, maxdepth ,'comp', currentMove, prevMove);
            }
        }
        const endTime2 = performance.now();
        let algorithm2 = '';
        if(algo==minimax){
            algorithm2 = 'Minimax with Alpha-Beta Pruning algorithm';
        }
        else{
            algorithm2 = 'Simple Minimax algorithm';
        }
        document.getElementById('ai_time').innerText = `The time taken by ${algorithm} to take turn is: ${endTime-startTime}ms
        The time taken by ${algorithm2} to take turn is: ${endTime2-startTime2}ms`;
        times.push([endTime-startTime, endTime2-startTime2]);
        document.getElementById('nodes_expanded').innerText = `The number of nodes expanded by ${algorithm} is: ${nodesExpanded[0]}
        The number of nodes expanded by ${algorithm2} is: ${nodesExpanded[1]}`;
        nodes.push([nodesExpanded[0],nodesExpanded[1]]);
        displayGraph();
        displayGraphNodes();
        var x = nextTurn[0];
        var y = nextTurn[1];
        board[x][y] = currentSign;
        prevMove = currentSign;
        document.getElementById(`${x}${y}`).style.backgroundImage = `url("${currentSign}.png")`;
        currentMove = currentMove=='x'?'o':'x';
        // console.log(eval(board))
        if(isGameOver()){
            displayWinner();
        }
    }
}
function displayGraph(){
        let data = [[],[]];
        for(let i=0;i<times.length;i++){
            data[0].push({x: i+1, y: times[i][0]});
        };
        for(let i=0;i<times.length;i++){
            data[1].push({x: i+1, y: times[i][1]});
        };
        console.log(data);
        var chart = new CanvasJS.Chart("chartContainer", {
            
            animationEnabled: true,
            title:{
                text: "Time taken by algorithms to take turn"
            },
            axisX: {
                title: "Turn number"
            },
            axisY: {
                title: "Time taken (ms)"
            },
            data: [{
                type: "line",
                showInLegend: true,
                name: "Simple Minimax",
                dataPoints: data[0]
            },
            {
                type: "line",
                showInLegend: true,
                name: "Minimax with Alpha-Beta Pruning",
                dataPoints: data[1]
            }]
        });
        chart.render();
}

function displayGraphNodes(){
    let data = [[],[]];
    for(let i=0;i<times.length;i++){
        data[0].push({x: i+1, y: nodes[i][0]});
    };
    for(let i=0;i<times.length;i++){
        data[1].push({x: i+1, y: nodes[i][1]});
    };
    console.log(data);
    var chart = new CanvasJS.Chart("chartContainer2", {
        
        animationEnabled: true,
        title:{
            text: "Cumulative Nodes expanded"
        },
        axisX: {
            title: "Turn number"
        },
        axisY: {
            title: "Cumulative number of nodes"
        },
        data: [{
            type: "line",
            showInLegend: true,
            name: "Simple Minimax",
            dataPoints: data[0]
        },
        {
            type: "line",
            showInLegend: true,
            name: "Minimax with Alpha-Beta Pruning",
            dataPoints: data[1]
        }]
    });
    chart.render();
}
