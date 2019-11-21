import React from 'react';

function Board(props) {
        return (
            <div className="board">
                <div className="btn-wrap">
                    <input type="text" onChange={props.onChange} value={props.value} />
                    <button onClick={props.onClick}>Добавить актёра</button>
                </div>
            </div>
        );
}

export default Board; 