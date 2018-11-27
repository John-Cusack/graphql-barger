import React from 'react'
import {Query} from 'react-apollo'

const withSession = Component => props => (
    <Query>
        {(data, loading) => {
            return (
                <Component {...props}/>
            )
        }}
    </Query>
)