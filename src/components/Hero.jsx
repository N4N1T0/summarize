import { logo } from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={logo} alt='Sums Logo' className='w-28 onject-contain' />
        {/* add an onClick property */}
        <button type='button' className='black_btn'>Github</button>
      </nav>
      <h1 className='head_text'>Summarize with <br className='max-md:hidden' /><span className='orange_gradient'>OpenAI GPT</span></h1>
      <h2 className='desc'>Simplify your reading with Summize, an open-source articule summarizer that transform lengthly articules into clear and consise summaries</h2>
    </header>
  )
}

export default Hero
