import React, {useEffect, useRef, useState} from 'react';
import {select,line,curveCardinal,scaleLinear,axisBottom,axisRight} from 'd3'
function Intensity({datachart}) {
    const [intensitySet,setIntensightySet]=useState([])
    const svgRef=useRef();
    useEffect(()=>{
        if(intensitySet.length==0){
        setIntensightySet((datachart).map((item)=>(item.intensity)))}
        else{
        console.log(intensitySet)
        const svg=select(svgRef.current)
            const xScale=scaleLinear()
                .domain([0,datachart.length-1])
                .range([0,30000])
            const yScale=scaleLinear()
                .domain([0,140])
                .range([500,0])
            const xaxis=axisBottom(xScale)
                .ticks(datachart.length)
                .tickFormat(index=>datachart[index].endYear)
            const yaxis=axisRight(yScale)

            svg
                .selectAll('.y-axis')
                .style('transform','translateX(30000px)')
                .call(yaxis)
            svg
                .selectAll('.x-axis')
                .style('transform','translateY(500px)')
                .call(xaxis)
            const myLine=line()
                .x((value,index)=>xScale(index))
                .y((value)=>yScale(value))
                .curve(curveCardinal)
            svg
                .selectAll('.line')
                .data([intensitySet])
                .join("path")
                .attr('class','line')
                .attr('d',(val)=>myLine(val))
                .attr('fill','none')
                .attr('stroke','black')
        }
    },[datachart,intensitySet])
    return (
        <div style={{width:'1600px',height:'500px',padding:'100px'}} className='Intensity'>
            <svg width={30000} height={500} style={{background:'lightgrey',overflow:'visible'}} ref={svgRef}>
                <g className={'x-axis'}></g>
                <g className={'y-axis'}></g>
            </svg>
        </div>
    );
}

export default Intensity;