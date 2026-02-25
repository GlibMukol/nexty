import SideBar from "@/components/sidebar";
import { addInventory } from "@/lib/actions/product";
import { getUser } from "@/lib/helper/getUser";
import Link from "next/link";

export default async function AddProduct() {
    const { id: userId } = await getUser();
    return (
        <div className="grid grid-cols-[1rem_1fr] min-h-screen bg-gray-50">
            <SideBar curentPath="/add-product" />
            <main className="ml-64 p-6 text-black">
                <div className="mb-8">
                    <div className="flex item-centers justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-grey-900">
                                Add Product
                            </h1>
                            <p className="text-sm text-gray-500">
                                Add a new product to your inventory
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <form className="space-y-6" action={addInventory}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Product name*
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                                    placeholder="Enter product name"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="quantity"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Product quantity*
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        min="0"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="price"
                                        className="block text-sm font-medium text-gray-700 mb-2"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                                        placeholder="0.0"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="scu"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    SCU(optional)
                                </label>
                                <input
                                    type="text"
                                    id="scu"
                                    name="scu"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                                    placeholder="Enter SKU"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="lowStackAt"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Low Stock(optional)
                                </label>
                                <input
                                    type="number"
                                    id="lowStackAt"
                                    name="lowStackAt"
                                    min="0"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                                    placeholder="Enter low stack"
                                />
                            </div>
                            <div className="flex gap-4 justify-center">
                                <button type="submit" className="uppercase text-center px-6 py-3 w-36 bg-blue-500 text-white rounded-lg hover:bg-blue-800 hover:scale-110 transition-transform duration-200">Add </button>
                                <Link href="/inventory" className="uppercase text-center px-6 w-36 py-3 bg-gray-500 text-white rounded-lg hover:bg-red-500  hover:scale-110  transition-transform duration-200">cancel </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
