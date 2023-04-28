import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/articule'

const Demo = () => {
  const [articule, setArticule] = useState({ url: '', summary: '' })
  const [allArticules, setAllArticules] = useState([])
  const [copied, setCopied] = useState('')

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const articulesFromLocalStorage = JSON.parse(localStorage.getItem('articules'))

    if (articulesFromLocalStorage) {
      setAllArticules(articulesFromLocalStorage)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(articule)

    const { data } = await getSummary({ articuleUrl: articule.url })

    if (data?.summary) {
      const newArticule = { ...articule, summary: data.summary }
      const updatedAllArticules = [newArticule, ...allArticules]

      setArticule(newArticule)
      setAllArticules(updatedAllArticules)

      // eslint-disable-next-line no-undef
      localStorage.setItem('articule', JSON.stringify(updatedAllArticules))
    }
  }

  const handleCopied = (copyUrl) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'>
        {/* SEARCH */}
        <form onSubmit={handleSubmit} className='relative flex justify-center items-center'>
          <img src={linkIcon} alt='Link_ivon' className='absolute left-0 my-2 ml-3 w-5' />
          <input value={articule.url} onChange={(e) => setArticule({ ...articule, url: e.target.value })} type='url' placeholder='Enter an URL' required className='url_input peer' />
          <button type='submit' className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>↵</button>
        </form>

        {/* BROWSER HISTORY  */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticules.map((item, index) => (
            <div
              key={`link-${index}`}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopied(item.url)}>
                <img
                  src={copied === item.url ? tick : copy} alt='copy_icon'
                  className='w-[48%] h-[48%] object-contain'
                />
              </div>
              <p onClick={() => setArticule(item)} className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>{item.url}</p>
            </div>
          ))}
        </div>
      </div>
      {/* DISPLAY RESULTS */}
      <div className='my-10 mx-w-full flex justify-center items-center'>
        {isFetching
          ? (
            <img src={loader} className='w-20 h-20 object-contain' />
            )
          : error
            ? (
              <p className='font-inter font-bold text-black text-center'>Well, that wasn't supposed to happen...<br />
                <span className='font-satoshi font-normal text-gray-700'>{error?.data?.error}</span>
              </p>
              )
            : (
                articule.summary && (
                  <div className='flex flex-col gap-3'>
                    <h2 className='font-satoshi font-bold text-gray-600 text-xl text-center'>Articule <span className='blue_gradient'>Summary</span></h2>
                    <div className='summary_box'><p className='font-inter font-medium text-sm text-gray-700'>{articule.summary}</p></div>
                  </div>
                )
              )}
      </div>
    </section>
  )
}

export default Demo
