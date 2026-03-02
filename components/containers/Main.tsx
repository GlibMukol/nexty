
type TMainContainer = {
    sidebar: React.ReactNode,
    children: React.ReactNode,
    header: string,
    description: string
}

export default function MainContainer(props: TMainContainer) {
    return (
        <div className="grid grid-cols-[1rem_1fr] min-h-screen bg-gray-50">
            {props.sidebar}
            <main className="ml-64 p-6 text-black" >
                <div className="mb-8">
                    <div className="flex item-centers justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-grey-900">{props.header}</h1>
                            <p className="text-sm text-gray-500">{props.description}</p>
                        </div>
                    </div>
                </div>


                <div className="space-y-6">
                    {props.children}
                </div>
            </main>
        </div>
    )
}