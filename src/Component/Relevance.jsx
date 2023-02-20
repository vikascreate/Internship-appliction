import React, { useRef } from 'react';

function Relevance({datachart}) {
    const svgRef=useRef()
    return (
        <div style={{width:'1800px',height:'600px',padding:'10px 0px 0px 150px'}} >
            <svg width={1700} height={500} style={{background:'lightgrey',overflow:'visible'}} ref={svgRef}>
                <g className={'x-axis'}></g>
                <g className={'y-axis'}></g>
            </svg>
        </div> 
    );
}

export default Relevance;