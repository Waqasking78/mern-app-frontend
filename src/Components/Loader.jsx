import logo from '../assets/loading.gif'


const Loading = ({ smallLoading }) => {
  console.log(smallLoading)
  return (
    smallLoading ? (
      <div className="box">
        <div className="overlay absolute h-full flex items-center justify-center w-full  bg-[#79797939] top-0 left-0 cursor-default">
          <img className='h-1/4' src={logo} alt="" />
        </div>
      </div>
    ) : (
      <div className="box gap-1 absolute top-0 left-0 h-screen w-full z-50 bg-black flex items-center justify-center ">
        <img className='h-20' src={logo} alt="" />
      </div>

    )
  )
}

export default Loading