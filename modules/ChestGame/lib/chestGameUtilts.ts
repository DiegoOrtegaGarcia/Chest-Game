export const createNewBoard = () => {
    const board : number[][] = []
    for (let index = 0; index <= 7; index++) {
            board.push(createRowPieces(index))
    }
    return board
}

const createRowPieces = (index : number) => {
     if(index === 0 || index === 7){
            return [2,3,4,8,9,4,3,2]
        }
     if (index === 1 || index  === 6){
            return [1,1,1,1,1,1,1,1]
        }    
    return([0,0,0,0,0,0,0,0])
  
}

export const selectBoxColor = (rowIndex: number, colIndex: number) => {
    if(rowIndex == 0||rowIndex ==2 || rowIndex ==4 ||rowIndex ==6) {
        const result = colIndex % 2
        return result ? "white" : "black"
    }else{
        const result = colIndex % 2
        return result ? "black" : "white"
    }
}