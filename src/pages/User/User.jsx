import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { Loading } from '../Home/Home'

const User = () => {
  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState({})
  const { username } = useParams()

  useEffect(() => {
    axios({
      method: 'GET',
      baseURL: 'https://hacker-news.firebaseio.com/v0',
      url: `/user/${username}.json`,
    })
      .then((response) => {
        setDetails(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error.response)
        setLoading(false)
      })
    return () => {
      setDetails({})
      setLoading(true)
    }
  }, [])

  return (
    <div className='mx-auto mb-4 max-w-3xl'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className='mb-3 text-2xl text-blue-600'>{username}</h1>
          <div className='space-x-1'>
            <span>Karma:</span>
            <span>{details.karma}</span>
          </div>
          <div className='space-x-1'>
            <span>Created:</span>
            <span>{moment.unix(details.created).format('LL')}</span>
          </div>
        </>
      )}
    </div>
  )
}

export default User
