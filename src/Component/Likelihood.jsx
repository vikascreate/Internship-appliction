import React, {useEffect, useRef, useState} from 'react';
import {select,line,curveCardinal,scaleLinear,scaleBand,axisBottom,axisLeft} from 'd3'
function Likelihood({datachart}) {
    const [likelihood,setLikelihood]=useState([])
    const [sector,setSector]=useState([])
    const [swot,setSwot]=useState([])
    const svgRef=useRef()
    useEffect(()=>{
        if(likelihood.length==0){
            let distinctSector=new Map();
            for(var i=0;i<datachart.length;i++){
                //console.log(datachart[i].sector)
                if(distinctSector.has(datachart[i].sector)){
                    distinctSector.set(datachart[i].sector,distinctSector.get(datachart[i].sector)+1)
                }else{
                    distinctSector.set(datachart[i].sector,1)
                }
            }
            let newSet=[];let nextSet=[]
            distinctSector.forEach((value,key)=>{newSet.push(key)
            nextSet.push(value)})
            setLikelihood(nextSet)
            setSector(newSet)
            console.log(likelihood)
            console.log(sector)

        }else{
            console.log(likelihood)
            console.log(sector)
            const svg=select(svgRef.current);
            const yScale=scaleBand()
                .domain(sector.map((val,ind)=> ind))
                .range([0,500])
                .padding(0.3)
            //console.log(yScale.bandwidth())
            const yAxis=axisLeft(yScale)
                .tickFormat((data,index)=>sector[index])
            const xScale=scaleLinear()
                .domain([0,350])
                .range([0,1700])
                //.tick
            const colorScale=scaleLinear()
                .domain([0,300])
                .range(["#48C9B0 ","#0E6251"])
                .clamp(true)
            const xAxis=axisBottom(xScale)
                .ticks(40)
            svg
                .selectAll('.y-axis')
               // .style('transform', 'translateX(500px)')
                .call(yAxis)
            svg
                .selectAll('.x-axis')
                .style('transform','translateY(500px)')
                .call(xAxis)

            svg
                .selectAll('.bar')
                .data(likelihood)
                .join('rect')
                .attr('class', 'bar')
                
                .attr('fill',colorScale)
                .style('transform','scaleX(-1,1)')
                .attr('x', 0)
                .attr('y',(val,index)=>yScale(index))
                // .on('mouseenter',(index,val)=>
                //   //  console.log('value'+val)
                //     svg
                //     .selectAll('.tooltip')
                //     .data([val])
                //     .join('text')
                //     .attr('class','tooltip')
                //     .text(val)
                //     .attr('x',xScale(val))
                //     .attr('y',yScale(val))
                // )
                .transition()
                .attr('height',yScale.bandwidth())
                .attr('width',value=>xScale(value))


        }
    },[datachart,likelihood])
    return (
        <div style={{width:'1800px',height:'600px',padding:'10px 0px 0px 150px'}} >
            <svg width={1700} height={500} style={{background:'lightgrey',overflow:'visible'}} ref={svgRef}>
                <g className={'x-axis'}></g>
                <g className={'y-axis'}></g>
            </svg>
        </div>
    );
}

export default Likelihood;