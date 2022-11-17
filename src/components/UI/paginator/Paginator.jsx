import React from 'react'
import { getPageArray } from '../../../utils/pages'

export default function Paginator({ totalPage, page, changePage }) {
    let pageArray = getPageArray(totalPage)
    return (
        <div className="page__wrapper">
            {pageArray.map(p =>
                <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? "page page__current" : "page"}>
                    {p}
                </span>)}
        </div>
    )
}
