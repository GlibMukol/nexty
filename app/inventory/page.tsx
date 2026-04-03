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
                <div className="bg-white rounded-lg border border-gray-200 p-6 dark:bg-zinc-900 dark:border-zinc-800">
                    <form
                        className="flex flex-col gap-2 sm:flex-row"
                        action="/inventory"
                        method="GET"
                    >
                        <input
                            name="query"
                            placeholder="Search..."
                            defaultValue={contains}
                            className="w-full flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500"
                        />
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-400 px-6 py-2 text-white hover:bg-blue-600 sm:w-auto"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:bg-zinc-900 dark:border-zinc-800">
                    <div className="overflow-x-auto">
                        <table className="min-w-[720px] w-full">
                            <thead className="bg-gray-50 dark:bg-zinc-800">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6 dark:text-zinc-400">
                                        Name
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6 dark:text-zinc-400">
                                        SKU
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6 dark:text-zinc-400">
                                        Price
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6 dark:text-zinc-400">
                                        Quantity
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6 dark:text-zinc-400">
                                        Low Stack
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6 dark:text-zinc-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-zinc-900 dark:divide-zinc-800">
                                {products.map(product => (
                                    <tr className="" key={product.id}>
                                        <td className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6 dark:text-zinc-300">
                                            {product.name}
                                        </td>
                                        <td className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6 dark:text-zinc-300">
                                            {product.sku || "-"}
                                        </td>
                                        <td className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6 dark:text-zinc-300">
                                            {Number(product.price)}
                                        </td>
                                        <td className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6 dark:text-zinc-300">
                                            {product.quantity}
                                        </td>
                                        <td className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6 dark:text-zinc-300">
                                            {product.lowStockAt || "-"}
                                        </td>
                                        <td className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6 dark:text-zinc-300">
                                            <form action={async (formData: FormData) => {
                                                "use server"
                                                const test = await deleteInventory(formData);
                                            }}>
                                                <input type="hidden" name="id" value={product.id} />
                                                <button className="uppercase text-red-600 hover:text-red-900 dark:hover:text-red-400">Delete</button>
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
                        <div className="bg-white rounded-lg border border-gray-200 p-6 dark:bg-zinc-900 dark:border-zinc-800">
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