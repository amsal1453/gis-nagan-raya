
import EachUtils from '@/Utils/EachUtils'
import { Link } from '@inertiajs/react'
import React from 'react'

const Breadcrumbs = ({ items }) => {
    return (
        <div className="text-lg breadcrumbs">
            <ul>
                <EachUtils of={items} render={(item, index) => (
                    <li key={index}>
                        {item.link ? (
                            <Link href={item.link}>{item.label}</Link>
                        ) : (
                            <span>{item.label}</span>
                        )}
                    </li>
                )} />
            </ul>
        </div>
    )
}

export default Breadcrumbs