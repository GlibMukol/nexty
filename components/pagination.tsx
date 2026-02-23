"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";


type TPagination = {
    current: number,
    total: number,
    baseUrl: string,
    searchParams: Record<string, string>
}

const getVisiblePages = (total: number, current: number, goToPage: (page: number) => string) => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(delta, current - delta); i <= Math.min(total - 1, current + delta); i++) {
        range.push(i)
    }

    if (current - delta > 2) {
        rangeWithDots.push(1, '...')
    } else {
        rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (current + delta < total - 1) {
        rangeWithDots.push('...', total)
    } else {
        rangeWithDots.push(total);
    }

    return rangeWithDots.map(item => {
        if (item === '...') return <span key={item} className="px-3 py-2 text-sm text-gray-500">...</span>
        return (
            <Link
                href={goToPage(Number(item))}
                key={item}
                className={`px-3 py-2 text-sm font-medium rounded-lg ${Number(item) === current ? "bg-blue-400 text-white" : "text-gray-700 hover:bg-gray-100 border border-gray-400"
                    }`}
            >
                {item}
            </Link>)
    })

}


const getPage = (searchParams: Record<string, string>, baseUrl: string, page: number,) => {
    const params = new URLSearchParams({ ...searchParams, page: String(page) });
    return `${baseUrl}?${params.toString()}`
}


export const Pagination = ({
    current,
    baseUrl,
    searchParams,
    total
}: TPagination) => {
    if (total <= 1) return null;


    const getPagePagination = getPage.bind(null, searchParams, baseUrl);

    return (
        <nav className="flex items-center justify-center gap-1">
            <Link href={getPagePagination(current - 1)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg  hover:bg-gray-200 ${current <= 1 ? 'text-gray-400 cursor-not-allowed bg-gray-100' : ""}`}
                area-disabled={current <= 1 ? "true" : ""}
            >
                <ChevronLeft /> Prevous
            </Link>
            {getVisiblePages(total, current, getPagePagination)}
            <Link href={getPagePagination(current + 1)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-200  ${current >= total ? 'text-gray-400 cursor-not-allowed bg-gray-100' : ""}`}
                area-disabled={current >= total ? "true" : ""}
            >
                <ChevronRight /> Next
            </Link>
        </nav>
    )
}
