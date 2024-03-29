import Image from 'next/image';
import Right from '../icons/Right';

export default function Hero() {
  return(
    <section className='hero md:mt-4'>
      <div className='py-8 md:py-12'>
        <h1 className='text-4xl font-semibold'>
          Everethign<br />is better<br />with a&nbsp;
          <span className='text-primary'>Pizza</span>
        </h1>
        <p className='my-6 text-gray-500 text-sm'>
          Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life
        </p>
        <div className='flex gap-4 text-sm'>
          <button className='flex gap-2 justify-center bg-primary uppercase text-white px-4 py-2 rounded-full items-center'>
            Order now
            <Right />
          </button>
          <button className='flex border-0 gap-2 py-2 text-gray-600 font-semibold items-center'>
            Leran more
            <Right />
          </button>
        </div>
      </div>
      <div className="relative hidden md:block h-full w-full object-contain">
        <Image src={'/pizza-1.png'} fill sizes="100wv" priority={true} alt={'pizza'} />
      </div>
    </section>
  )
}