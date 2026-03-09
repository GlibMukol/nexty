import SideBar from "@/components/sidebar";
import { getUser } from "@/lib/helper/getUser";
import { deleteInventory } from "@/lib/actions/product";
import { prisma } from "@/lib/prisma";
import { Pagination } from "@/components/pagination";
import MainContainer from "@/components/containers/Main";

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
        <>
            <MainContainer
                header="Inventory"
                description="Manage you products and inventory lavels"
                sidebar={<SideBar curentPath="/inventory" />}
            >
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <form
                        className="flex flex-col gap-2 sm:flex-row"
                        action="/inventory"
                        method="GET"
                    >
                        <input
                            name="query"
                            placeholder="Search..."
                            defaultValue={contains}
                            className="w-full flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-400 px-6 py-2 text-white hover:bg-blue-600 sm:w-auto"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="min-w-[720px] w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">
                                    SKU
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">
                                    Price
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">
                                    Quantity
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">
                                    Low Stack
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 ">
                            {products.map(product => (
                                <tr className="" key={product.id}>
                                    <td className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">
                                        {product.name}
                                    </td>
                                    <td className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">
                                        {product.sku || "-"}
                                    </td>
                                    <td className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">
                                        {Number(product.price)}
                                    </td>
                                    <td className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">
                                        {product.quantity}
                                    </td>
                                    <td className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">
                                        {product.lowStockAt || "-"}
                                    </td>
                                    <td className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">
                                        <form action={async (formData: FormData) => {
                                            "use server"
                                            const test = await deleteInventory(formData);
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
            </MainContainer>

        </>
    )

}