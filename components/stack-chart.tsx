"use client"

import { PieChart, Pie, Label, ResponsiveContainer } from 'recharts';

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
