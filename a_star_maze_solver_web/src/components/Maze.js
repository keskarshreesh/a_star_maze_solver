import React from 'react';
import "./Maze.css";

const Maze = (props) => {
    
    const {maze} = props;

    return (
        <div style={{display : "grid", gridTemplateRows: "repeat(101,2fr)", height: '707px', width: '202px', marginTop: '15px', marginLeft: '15px'}}>
            {maze && maze.map((item,index) => (
                <MazeRow mazeRow={item} key={index}/>
            ))}
        </div>
    )
    
}

const MazeRow = (props) => {

    const {mazeRow} = props;

    // const playerContextValues = useContext(playerContext);

    return (
        <div style={{display : "grid", gridTemplateColumns: "repeat(101,2fr)"}}>
            {mazeRow && mazeRow.map((item,index) => {
                const current_class = () => {
                    switch (item) {
                        case 'c': return "box white";
                        case 'w': return "box black";
                        case 'T': return "box green";
                        case 'A': return "box red";
                    }
                }
                return (
                    <div className={current_class()} key={index}/>
                )
            })}
        </div>
    )
}

export default Maze;