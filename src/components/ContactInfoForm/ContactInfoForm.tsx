import { Box, Typography, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { SubmitInfoProp } from '../../types/course'
import useLocalStorage from '../../hooks/useLocalStorage'
import { useMutation } from '@tanstack/react-query'
import { useSelectedCourse } from '../../contexts/useSelectedCourse'
import { postStudentInfo } from '../../api/studentInfo'

const ContactInfoForm = () => {
  const { selectedCourse } = useSelectedCourse()
  const [submitInfo, setSubmitInfo] = useState<SubmitInfoProp>({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    selectedCourse: '',
    message: '',
  })

  const [, setSubmitInfoLS] = useLocalStorage<SubmitInfoProp | null>('studentInfo', null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setSubmitInfo({
      ...submitInfo,
      selectedCourse,
      [name]: value,
    })
  }

  const mutation = useMutation({
    mutationFn: (studentInfo: SubmitInfoProp) =>
      postStudentInfo({
        ...studentInfo,
        selectedCourse,
        contactedDate: new Date().toISOString(),
      }),
    onSuccess: () => {
      // Here call invalidateQueries to refetch but we have no get request for this API so just conolse success message.
      console.log('Form successfully submitted')
    },
    onError: (error) => {
      console.error('Error submitting form:', error)
    },
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitInfoLS(submitInfo)
    mutation.mutate(submitInfo)
  }
  return (
    <Box
      component='form'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '350px',
        margin: 'auto',
        marginTop: 4,
      }}
      onSubmit={handleSubmit}>
      <Typography variant='h6' component='h1'>
        Send Information
      </Typography>
      <TextField
        label='Full Name'
        name='fullName'
        value={submitInfo.fullName}
        onChange={handleInputChange}
        required
      />
      <TextField
        label='Email Address'
        name='emailAddress'
        type='email'
        value={submitInfo.emailAddress}
        onChange={handleInputChange}
        required
      />
      <TextField
        label='Phone Number'
        name='phoneNumber'
        type='tel'
        value={submitInfo.phoneNumber}
        onChange={handleInputChange}
        required
      />
      <TextField
        label='Selected Course'
        name='selectedCourse'
        value={selectedCourse || 'No Course Selected'}
        onChange={handleInputChange}
      />

      <TextField
        label='Message'
        name='message'
        multiline
        rows={4}
        value={submitInfo.message}
        onChange={handleInputChange}
      />
      <Button type='submit' variant='contained' color='primary'>
        Submit
      </Button>
    </Box>
  )
}

export default ContactInfoForm
