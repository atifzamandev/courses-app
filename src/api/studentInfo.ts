import axios from 'axios'
import { SubmitInfoProp } from '../types/course'

export const postStudentInfo = async (data: SubmitInfoProp) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL_SUMMIT_INFO
  const { data: studentInfoData } = await axios.post(apiUrl, data)
  return studentInfoData
}
