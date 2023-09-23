import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

// we will pass the destination page, but if we don't pass it default route will be '/'
const BackButton = ({ destination = '/' }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit"
      >
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  )
}

export default BackButton
