import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='sticky top-0 mb-6 border-b py-2 bg-gray-950/30 backdrop-blur border-gray-800 z-50'>
      <div className='container'>
        <Link to='/' className='text-xl text-emerald-500'>
          <span>
            Hacker<span className='text-emerald-50'>News</span>
          </span>
        </Link>
      </div>
    </header>
  )
}

export default Header
