import { useContext } from 'react'
import SelectedCourseContext, { SelectedCourseContextProp } from './SelectedCourseContext'

export const useSelectedCourse = (): SelectedCourseContextProp => {
  const context = useContext(SelectedCourseContext)
  if (context === undefined) {
    throw new Error('useSelectedCourse must be used within a SelectedCourseProvider')
  }
  return context
}
