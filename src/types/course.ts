export interface CourseProp {
  courseId: string
  instituteName: string
  courseName: string
  category: string
  deliveryMethod: string
  location: string
  language: string
  startDate: Date
}

export interface SubmitInfoProp {
  fullName: string
  emailAddress: string
  phoneNumber: string
  selectedCourse?: string
  message?: string
  contactedDate?: string
}
