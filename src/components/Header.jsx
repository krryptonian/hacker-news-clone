import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='sticky top-0 mb-4 border-b border-neutral-800 bg-neutral-900/60 py-4 backdrop-blur'>
      <div className='mx-auto max-w-3xl'>
        <Link
          to='/'
          className='font-semibold uppercase tracking-wide text-lime-600'
        >
          Hacker<span className='text-neutral-100'>News</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
