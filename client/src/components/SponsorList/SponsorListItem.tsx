import React from 'react'
import { useQuery } from 'react-query'

import { Sponsor, Child, getChild } from '../../firebase/functions'
import ChildrenListItem from '../ChildrenList/ChildrenListItem'

interface SponsorListItemProps {
    sponsor: Sponsor
}

export default function SponsorListItem({ sponsor }: SponsorListItemProps) {
    const { data: child, isLoading, error } = useQuery<Child, Error>(
        `sponsor-child-${decodeURIComponent(sponsor.child.id)}`,
        () => getChild(sponsor.child)
    )

    function getGender() {
        if (!sponsor.gender) return <></>
        const isMale = sponsor.gender === 'male'
        if (isMale) {
            return <p><strong>Gênero:</strong> Masculino</p>
        } else {
            return <p><strong>Gênero:</strong> Feminino</p>
        }
    }

    function getZap() {
        if (sponsor.isZap) {
            return <p><strong>Contato por WhatsApp:</strong> Sim</p>
        } else {
            return <p><strong>Contato por WhatsApp:</strong> Não</p>
        }
    }

    function getStatus() {
        if (sponsor.status) {
            return <p><strong>Apadrinhamento Confirmado:</strong> Sim</p>
        } else {
            return <p><strong>Apadrinhamento Confirmado:</strong> Não</p>
        }
    }

    return (
        <div className="sponsor-card card">
            <div className="card-header">
                <h3>{sponsor.name}</h3>
            </div>
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    {sponsor?.email ? (
                        <p><strong>E-mail:</strong> {sponsor.email}</p>
                    ) : <></>}
                    {sponsor?.phone ? (
                        <p><strong>Telefone:</strong> {sponsor.phone}</p>
                    ) : <></>}
                    {getZap()}
                    {getGender()}
                    {getStatus()}
                </blockquote>
                <div className="sponsorList-child-card">
                    {isLoading ? (
                        <>Procurando criança apadrinhada ...</>
                    ) : <></>}
                    {error ? (
                        <>Algo deu errado, não encontramos a criança apadrinhada.</>
                    ) : <></>}
                    {child ? (
                        <>
                            <h5>Criança Apadrinhada</h5>
                            <div className="childrenList-card card">
                                <ChildrenListItem child={child} />
                            </div>
                        </>
                    ) : (
                        <>Algo deu errado, não encontramos a criança apadrinhada.</>
                    )}
                </div>
            </div>
        </div>
    )
}
