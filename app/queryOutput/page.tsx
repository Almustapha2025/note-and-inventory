import React from 'react'
import getUser from '../libs/db';

const QueryOutPut = async () => {

    const users = await getUser()
    console.log(JSON.stringify(users))

  return (
    <div>QueryOutPut</div>
  )
}

export default QueryOutPut