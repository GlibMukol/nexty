"use client"

import { PieChart, Pie, Label, ResponsiveContainer } from 'recharts';

// #region Sample data
// const data = [
//     { name: 'Group A', value: 400, fill: '#0088FE' },
//     { name: 'Group B', value: 300, fill: '#00C49F' },
//     { name: 'Group C', value: 300, fill: '#FFBB28' },
//     // { name: 'Group D', value: 200, fill: '#FF8042' },
// ];

type TStackPie = {
    name: string,
    value: number,
    fill: string
}


export default function StackChart({ data }: { data: TStackPie[] }) {

    return (
        <div className="w-68 h-68 flex-2  min-h-0" style={{ minHeight: 0, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 200 }}>
                <PieChart

                    responsive
                >
                    <Pie data={data} dataKey="value" nameKey="name" outerRadius="80%" innerRadius="60%" isAnimationActive={true} />
                    <Label fontWeight={"bold"} position="center" fill="#666">
                        {`${data[0].name} ${data[0].value}%`}
                    </Label>
                </PieChart>
            </ResponsiveContainer >
        </div>
    );
}
