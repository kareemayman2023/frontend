import Lottie from 'lottie-react'
import emptyList from '../../assets/emptyList.json'

const Empty = () => {
  return (
    <Lottie
      animationData={emptyList}
      loop={true}
      style={{ width: 300, height: 300 }}
    />
  )
}

export default Empty
