export const Marks = ({
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    colorValue,
    colorScale,
    tooltipFormat,
  }) =>
    data.map((d) => (
      <circle
        className="mark"
        fill={colorScale(colorValue(d))}
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={10}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>
    ));
  