import React from 'react';
import "./Maze.css";

const Maze = (props) => {
    
    const {maze} = props;

    return (
        <div style={{display : "grid", gridTemplateRows: "repeat(101,1fr)", height: '202px', width: '202px'}}>
            {maze && maze.map((item,index) => (
                <MazeRow mazeRow={item} key={index}/>
            ))}
        </div>
    )
    
}

const MazeRow = (props) => {

    const {mazeRow} = props;

    return (
        <div style={{display : "grid", gridTemplateColumns: "repeat(101,1fr)"}}>
            {mazeRow && mazeRow.map((item,index) => {
                const current_class = () => {
                    switch (item) {
                        case 'c': return "box white";
                        case 'w': return "box black";
                        case 'A': return "box blue";
                        case 'T': return "box green";
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