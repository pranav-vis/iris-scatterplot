import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import {
  csv,
  max,
  extent,
  format,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
} from 'd3';

import { useData } from './useData.js';
import { AxisBottom } from './axisBottom.js';
import { AxisLeft } from './axisLeft.js';
import { Marks } from './marks.js';
import { ColorLegend } from './ColorLegend.js';

const width = 960;
const height = 500;

const margin = {
  top: 30,
  bottom: 80,
  left: 100,
  right: 200,
};

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

const centerX = width / 2;
const centerY = height / 2;

/*const ColorLegend = ({colorScale, tickSpacing=5, tickSize=10}) => {
  return colorScale.domain().map((domainValue, i) => {
    <g transform={`translate(0, ${i * tickSpacing})`}>
      <circle cx= {100} cy ={200} fill={colorScale(domainValue)} r={tickSize} />
      <text>{domainValue}</text>
    </g>;
  });
};*/

export const App = () => {
  const data = useData();
  const [hoveredValue, setHoveredValue] = useState(null);

  if (!data) {
    return (
      <pre id="message-container">Data is loading</pre>
    );
  }

  const yValue = (d) => d.sepal_width;
  const xValue = (d) => d.petal_length;
  const colorValue = (d) => d.species;

  const filteredData = data.filter(
    (d) => colorValue(d) === hoveredValue
  );
  const fadeOpacity = .2;

  const xAxisLabel = 'Petal Length';
  const yAxisLabel = 'Sepal Width';
  const colorLegendLabel = 'Species';

  const siFormat = format('.2s');
  const tickFormat = (tickValue) =>
    siFormat(tickValue).replace('G', 'B');

  const tooltipFormat = (tickValue) =>
    siFormat(tickValue).replace('G', 'Bln');

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])
    .nice();

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#E6842A', '#137B80', '#8E6C8A']);

  return (
    <svg width={width} height={height}>
      <g
        transform={`translate(${margin.left}, ${margin.top})`}
      >
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={tickFormat}
          tickOffset={5}
        />
        <text
          className="axisLabel"
          y={innerHeight / 2}
          textAnchor="middle"
          font-size="28"
          transform={`translate(${-250}, ${innerHeight / 2})
          rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} />
        <text
          className="axisLabel"
          x={innerWidth / 2}
          y={innerHeight + 50}
          textAnchor="middle"
          font-size="28"
        >
          {xAxisLabel}
        </text>
        <g transform={`translate(${innerWidth + 50})`}>
          <text
            x={25}
            y={2}
            className="colorLegendLabel"
            textAnchor="middle"
            font-size="28"
          >
            {colorLegendLabel}
          </text>
          <g>
          <ColorLegend
            colorScale={colorScale}
            onHover={setHoveredValue}
            hoveredValue = {hoveredValue}
            fadeOpacity = {fadeOpacity}
          />
          </g>
        </g>
        <g opacity = {hoveredValue ? fadeOpacity:1}>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          colorValue={colorValue}
          colorScale={colorScale}
          tooltipFormat={tooltipFormat}
        />
          </g>
        <Marks
          data={filteredData}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          colorValue={colorValue}
          colorScale={colorScale}
          tooltipFormat={tooltipFormat}
        />
      </g>
    </svg>
  );
};

