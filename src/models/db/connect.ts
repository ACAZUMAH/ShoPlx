import { connect } from 'mongoose'

const connectDB = (url: string) => {
  return connect(url, {
    autoIndex: true,
  })
}

export default connectDB
