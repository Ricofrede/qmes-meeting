import { useQuery } from 'react-query'

import { Sponsor, findSponsor } from '../../firebase/functions'
import SponsorListItem from './SponsorListItem'

interface SponsorListWrapperProps {
    searchStr: string
}

export default function SponsorListWrapper({ searchStr }: SponsorListWrapperProps) {
    const { data: sponsors, isLoading, error } = useQuery<Sponsor[], Error>(
        `sponsor-query-${decodeURIComponent(searchStr)}`,
        () => findSponsor(searchStr)
    )

    if (isLoading) return <div>Procurando padrinhos...</div>
    if (error) return <></>

    return (
        <>
            {sponsors && sponsors.length ? (
                sponsors.map((sponsor, index) => (
                    <SponsorListItem key={`sponsort-item-${index}`} sponsor={sponsor} />
                ))
            ) : <></>}
        </>
    )
}
