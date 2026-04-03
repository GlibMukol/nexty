import MainContainer from "@/components/containers/Main";
import SideBar from "@/components/sidebar";
import { addInventory } from "@/lib/actions/product";
import { getUser } from "@/lib/helper/getUser";
import Link from "next/link";

export default async function AddProduct() {
    await getUser();
    return (
        <MainContainer
            header="Add Product"
            description="Add a new product to your inventory"
            sidebar={<SideBar curentPath="/add-product" />}
        >
            <div className="w-full max-w-2xl">
                <div className="bg-white rounded-lg border border-gray-200 p-6 dark:bg-zinc-900 dark:border-zinc-800">
                    <form className="space-y-6" action={addInventory}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-2 dark:text-zinc-300"
                            >
                                Product name*
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                                placeholder="Enter product name"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="quantity"
                                    className="block text-sm font-medium text-gray-700 mb-2 dark:text-zinc-300"
                                >
                                    Product quantity*
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    min="0"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700 mb-2 dark:text-zinc-300"
                                >
                                    Price*
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    step="0.01"
                                    min="0"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                                    placeholder="0.0"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="scu"
                                className="block text-sm font-medium text-gray-700 mb-2 dark:text-zinc-300"
                            >
                                SCU(optional)
                            </label>
                            <input
                                type="text"
                                id="scu"
                                name="scu"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                                placeholder="Enter SKU"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="lowStackAt"
                                className="block text-sm font-medium text-gray-700 mb-2 dark:text-zinc-300"
                            >
                                Low Stock(optional)
                            </label>
                            <input
                                type="number"
                                id="lowStackAt"
                                name="lowStackAt"
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                                placeholder="Enter low stack"
                            />
                        </div>
                        <div className="flex flex-col gap-4 justify-center sm:flex-row">
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-blue-500 px-6 py-3 text-center uppercase text-white transition-transform duration-200 hover:scale-[1.02] hover:bg-blue-800 sm:w-36"
                            >
                                Add
                            </button>
                            <Link
                                href="/inventory"
                                className="w-full rounded-lg bg-gray-500 px-6 py-3 text-center uppercase text-white transition-transform duration-200 hover:scale-[1.02] hover:bg-red-500 sm:w-36"
                            >
                                cancel
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </MainContainer>
    );
}
