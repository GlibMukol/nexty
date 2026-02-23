import SideBar from "@/components/sidebar";
import { getUser } from "@/lib/helper/getUser";
import { deleteInventory } from "@/lib/actions/product";
import { prisma } from "@/lib/prisma";
import { Pagination } from "@/components/pagination";

type TSearchParam = Promise<{
    query?: string,
    page?: string
}>
export default async function Inventory({ searchParams }: { searchParams: TSearchParam }) {
    const { id: userId } = await getUser();
    const params = await searchParams
    const contains = (params.query ?? '').trim()
    const page = Math.max(1, Number((params.page ?? 1)))
    const pageSize = 10;


    const where = {
        where: {
            userId, ...(contains ? { name: { contains, mode: "insensitive" as const } } : {})
        }
    }

    const [count, products] = await Promise.all([
        prisma.product.count(where),
        prisma.product.findMany({ ...where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * pageSize, take: pageSize })
    ]);

    const totalPages = Math.max(1, Math.ceil(count / pageSize));


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


                <div className="space-y-6">


                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <form className="flex gap-2" action="/inventory" method="GET">
                            <input name="query" placeholder="Search..." defaultValue={contains} className="px-4 py-2 flex-1 border border-gray-300 rounded-lg focus:border-transparent" />
                            <button type="submit" className="px-6 py-2 bg-blue-400 rounded-lg hover:bg-blue-600 text-white">Search</button>
                        </form>
                    </div>

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
                                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            <form action={async (formData: FormData) => {
                                                "use server"
                                                const test = await deleteInventory(formData);
                                                console.log('test :>> ', test);
                                            }}>
                                                <input type="hidden" name="id" value={product.id} />
                                                <button className="uppercase text-red-600 hover:text-red-900">Delete</button>
                                            </form>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {
                        totalPages > 1 ?
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <Pagination current={page} total={totalPages} baseUrl="/inventory" searchParams={{
                                    query: contains,
                                    pageSize: String(pageSize)
                                }} />
                            </div> :
                            <></>
                    }
                </div>
            </main>
        </div>
    )

}