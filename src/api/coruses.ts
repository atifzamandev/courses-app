import axios from 'axios'
import { CourseProp } from '../types/course'
import { useQuery } from '@tanstack/react-query'

const fetchCourses = async (): Promise<CourseProp[]> => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL
  try {
    const { data: coursesData } = await axios.get<CourseProp[]>(apiUrl)
    return coursesData
  } catch {
    throw new Error('Failed to fetch courses data')
  }
}

export const useCoursesData = () => {
  return useQuery<CourseProp[], Error>({
    queryKey: ['apiCourses'],
    queryFn: fetchCourses,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
}
