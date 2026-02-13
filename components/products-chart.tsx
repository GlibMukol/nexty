"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


type ProductCharData = {
    week: string,
    products: number
};


export default function ProductsChart({ data }: { data: Array<ProductCharData> }) {
    return (
        <div className="h-48 w-full" style={{ minHeight: 0, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 200 }}>
                <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
                    <CartesianGrid strokeDasharray="3 3" stroke="" />
                    <XAxis dataKey="week" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis dataKey="products" stroke="#666" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Area
                        type="monotone"
                        dataKey="products"
                        stroke="#75f542"
                        fill="#75f542"
                        fillOpacity={0.2}
                        strokeWidth={2}
                        dot={{
                            fill: "#75f542",
                            strokeWidth: 2,
                            r: 2

                        }}
                        activeDot={{
                            fill: "#75f542",
                            strokeWidth: 2,
                            r: 4
                        }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #edfff4",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
                        }}
                        labelStyle={{
                            color: "gray",
                            fontWeight: 500
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}