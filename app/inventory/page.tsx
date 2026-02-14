import SideBar from "@/components/sidebar";
import { getUser } from "@/lib/helper/getUser";
import { prisma } from "@/lib/prisma";

export default async function Inventory() {
    const { id: userId } = await getUser();
    const products = await prisma.product.findMany({ where: { userId } })
    return (
        <div className="grid grid-cols-[1rem_1fr] min-h-screen bg-gray-50">
            <SideBar curentPath="/inventory" />
            <main className="ml-64 p-6 text-black" >
                <div className="mb-8">
                    <div className="flex item-centers justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-grey-900">Inventory</h1>
                            <p className="text-sm text-gray-500">Manage you products and inventory lavels </p>
                        </div>
                    </div>
                </div>


                <div id="test" className="space-y-6">
                    <div className="bg-white rounded-lg border border-gray-200">
                        <table className="w-full ">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Low Stack</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 ">
                                {products.map(product => (
                                    <tr className="" key={product.id}>
                                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{product.name}</td>
                                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{product.sku || "-"}</td>
                                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{Number(product.price)}</td>
                                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{product.quantity}</td>
                                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{product.lowStockAt || "-"}</td>
                                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{ }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )

}