"use client"

import { PieChart, Pie, Label, ResponsiveContainer } from 'recharts';

type TStackPie = {
    name: string,
    value: number,
    fill: string
}


export default function StackChart({ data }: { data: TStackPie[] }) {

    return (
        <div
            data-testid="stack-chart"
            className="h-64 w-full shrink-0 min-h-0 md:h-56 md:w-56 lg:h-64 lg:w-64"
            style={{ minHeight: 0, minWidth: 0 }}
        >
            <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 200 }}>
                <PieChart

                    responsive
                >
                    <Pie data={data} dataKey="value" nameKey="name" outerRadius="80%" innerRadius="60%" isAnimationActive={true} />
                    <Label fontWeight={"bold"} position="center" fill="var(--foreground, #ededed)">
                        {`${data[0].name} ${data[0].value}%`}
                    </Label>
                </PieChart>
            </ResponsiveContainer >
        </div>
    );
}
