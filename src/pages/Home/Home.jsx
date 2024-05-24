import parse from 'html-react-parser'
import moment from 'moment'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'
import { default as URLParse } from 'url-parse'

function getHostname(url) {
  const parsedUrl = new URLParse(url)
  let domain = parsedUrl.hostname

  if (domain.startsWith('www.')) {
    domain = domain.slice(4)
  }

  return domain
}

const Home = () => {
  const [stories, setStories] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`)
    const storyIds = await response.json()
    const startIndex = (page - 1) * 35
    const endIndex = page * 35
    const itemsPromises = storyIds.slice(startIndex, endIndex).map(async (id) => {
      const itemResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
      return await itemResponse.json()
    })

    const newItems = await Promise.all(itemsPromises)
    setStories([...stories, ...newItems])
    setPage(page + 1)
  }

  return (
    <div className='mx-auto mb-4 max-w-3xl'>
      <InfiniteScroll
        loader={<Loading />}
        className='space-y-4'
        dataLength={stories.length}
        next={() => fetchItems()}
        hasMore={true}
      >
        {stories.map((story, index) => (
          <div key={index}>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between md:gap-3'>
              <a
                target='_blank'
                href={story.url}
                className='text-blue-600 visited:font-medium visited:text-pink-500 hover:text-blue-800'
              >
                {story.title}
              </a>
              <span className='text-xs text-neutral-400'>({getHostname(story.url)})</span>
            </div>
            <div className='flex items-center justify-between text-sm text-gray-500'>
              <span>
                {story.score} point by&nbsp;
                <Link to={`/user/${story.by}`} className='self-end hover:underline'>
                  {story.by}
                </Link>
                &nbsp;at&nbsp;{moment.unix(story.time).format('LLL')}
              </span>
            </div>

            {story.text && (
              <div className='my-4 border-l-4 border-blue-100 pl-4'>
                <div className='prose max-w-none'>{parse(story.text)}</div>
              </div>
            )}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default Home

export const Loading = () => {
  return (
    <div className='flex items-center justify-center gap-3 py-4 text-gray-400'>
      <svg
        className='h-5 w-5 animate-spin text-blue-600'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
      <span className='text-sm'>Loading...</span>
    </div>
  )
}
