import styled from '@emotion/styled'
import {
  TableCell,
  tableCellClasses,
  TableRow,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Button,
  Box,
  CircularProgress,
  TextField,
  TablePagination,
} from '@mui/material'
import { common, teal } from '@mui/material/colors'
import { useCoursesData } from '../../api/coruses'
import styles from './CoursesTable.module.css'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelectedCourse } from '../../contexts/useSelectedCourse'

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: teal[900],
    color: common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: teal[100],
  '&:nth-of-type(odd)': {
    backgroundColor: teal[50],
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const CoursesTable = () => {
  const { data: coursesData, isLoading, error } = useCoursesData()
  const navigate = useNavigate()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(100)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { setSelectedCourse } = useSelectedCourse()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setPage(0)
  }

  const filteredCourses = useMemo(() => {
    return coursesData?.filter((course) =>
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [coursesData, searchQuery])

  const paginatedCourses = useMemo(() => {
    return filteredCourses?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  }, [filteredCourses, page, rowsPerPage])

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value))
    setPage(0)
  }

  const handleSelectCourse = (courseName: string) => {
    setSelectedCourse(courseName)
    navigate('/contact-info')
  }

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress sx={{ color: teal[900] }} size={200} thickness={8} />
        </Box>
      </div>
    )
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return <div>Error: {errorMessage}</div>
  }

  return (
    <Box component='div' sx={{ m: 4 }}>
      <Box component='form' sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <TextField
          variant='outlined'
          color='secondary'
          label='Search Courses'
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder='Search Interested Courses'
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>InstituteName</StyledTableCell>
              <StyledTableCell align='center'>Course Name</StyledTableCell>
              <StyledTableCell align='center'>Category</StyledTableCell>
              <StyledTableCell align='center'>Delivery Method</StyledTableCell>
              <StyledTableCell align='center'>Location</StyledTableCell>
              <StyledTableCell align='center'>Language</StyledTableCell>
              <StyledTableCell align='center'>Start Date</StyledTableCell>
              <StyledTableCell align='center'>Select Course</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCourses?.map((course) => (
              <StyledTableRow key={course.courseId}>
                <StyledTableCell>{course.instituteName}</StyledTableCell>
                <StyledTableCell align='center'>{course.courseName}</StyledTableCell>
                <StyledTableCell align='center'>{course.category}</StyledTableCell>
                <StyledTableCell align='center'>{course.deliveryMethod}</StyledTableCell>
                <StyledTableCell align='center'>{course.location}</StyledTableCell>
                <StyledTableCell align='center'>{course.language}</StyledTableCell>
                <StyledTableCell align='center'>
                  {new Date(course.startDate).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <Button
                    variant='contained'
                    color='secondary'
                    sx={{ margin: '0 auto', display: 'flex' }}
                    onClick={() => handleSelectCourse(course.courseName)}>
                    Submit Interest
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={filteredCourses?.length || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[50, 100]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}

export default CoursesTable
