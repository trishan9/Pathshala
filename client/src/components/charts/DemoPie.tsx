import { ResponsivePie } from "@nivo/pie";
const data = [
  {
    id: "javascript",
    label: "javascript",
    value: 358,
    color: "hsl(23, 70%, 50%)",
  },
  {
    id: "java",
    label: "java",
    value: 428,
    color: "hsl(279, 70%, 50%)",
  },
  {
    id: "golang",
    label: "golang",
    value: 351,
    color: "hsl(181, 70%, 50%)",
  },
  {
    id: "sql",
    label: "sql",
    value: 260,
    color: "hsl(8, 70%, 50%)",
  },
  {
    id: "python",
    label: "python",
    value: 218,
    color: "hsl(271, 70%, 50%)",
  },
];

export const DemoPie = () => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.6}
    padAngle={0.5}
    cornerRadius={5}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={3}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 1.2]],
    }}
    fill={[
      {
        match: {
          id: "ruby",
        },
        id: "dots",
      },
      {
        match: {
          id: "c",
        },
        id: "dots",
      },
      {
        match: {
          id: "go",
        },
        id: "dots",
      },
      {
        match: {
          id: "python",
        },
        id: "dots",
      },
      {
        match: {
          id: "scala",
        },
        id: "lines",
      },
      {
        match: {
          id: "lisp",
        },
        id: "lines",
      },
      {
        match: {
          id: "elixir",
        },
        id: "lines",
      },
      {
        match: {
          id: "javascript",
        },
        id: "lines",
      },
    ]}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);
