export const ColorLegend = ({
    colorScale,
    margin = 20,
    legendOffset = 15,
    onHover,
    hoveredValue,
    fadeOpacity,
  }) =>
    colorScale.domain().map((value, i) => (
      <>
        <g
          opacity={
            hoveredValue && value !== hoveredValue
              ? fadeOpacity
              : 1
          }
          className="color-legend"
          onMouseEnter={() => onHover(value)}
          onMouseOut={() => onHover(null)}
        >
          <circle
            className="color-legend-item"
            fill={colorScale(value)}
            cy={margin + i * legendOffset}
            r={5}
          ></circle>
          <text
            className="color-legend-item-text"
            y={margin + i * legendOffset}
            dy=".32em"
            dx=".71em"
          >
            {value}
          </text>
        </g>
      </>
    ));
  