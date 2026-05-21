import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer

} from "recharts";

const COLORS = [

  "#2563eb",

  "#7c3aed",

  "#06b6d4",

  "#ec4899",

  "#14b8a6"
];

const TopProductsChart = ({ data }) => {

  return (

    <ResponsiveContainer width="100%" height={300}>

      <PieChart>

        <Pie

          data={data}

          dataKey="total_sales"

          nameKey="product"

          outerRadius={100}

          fill="#8884d8"

          label
        >

          {data.map((entry, index) => (

            <Cell

              key={`cell-${index}`}

              fill={
                COLORS[
                  index % COLORS.length
                ]
              }
            />
          ))}

        </Pie>

        <Tooltip />

      </PieChart>

    </ResponsiveContainer>
  );
};

export default TopProductsChart;