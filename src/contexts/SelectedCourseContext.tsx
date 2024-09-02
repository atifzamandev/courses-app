import { createContext, useState, FC, PropsWithChildren } from 'react'

export interface SelectedCourseContextProp {
  selectedCourse: string | null
  setSelectedCourse: (courseName: string | null) => void
}

const SelectedCourseContext = createContext<SelectedCourseContextProp | undefined>(undefined)

export const SelectedCourseProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

  const contextValue = {
    selectedCourse,
    setSelectedCourse,
  }

  return (
    <SelectedCourseContext.Provider value={contextValue}>{children}</SelectedCourseContext.Provider>
  )
}

export default SelectedCourseContext
