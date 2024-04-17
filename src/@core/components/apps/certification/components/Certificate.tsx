import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { formatDistanceToNow } from 'date-fns'
import { useCertificate } from 'src/@core/hooks/apps/useCertificate'
// @ts-ignore
import styles from './style.module.css'
import { useAuth } from 'src/hooks/useAuth'
import { Typography, Theme, Button, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  certificationSection: {
    background: 'linear-gradient(180deg, #1f63ba 10%, transparent 7%)',
    borderRadius: '10px'
  }
}))

const Certificate = () => {
  const {
    query: { id, student_id }
  } = useRouter()

  const { getCertificate, certificateData } = useCertificate(null)

  const theme = useTheme()

  const { user } = useAuth()

  const certificateRef: any = useRef()

  const classes = useStyles()

  const downloadCertificate = async () => {
    try {
      if (typeof window !== 'undefined') {
        // @ts-ignore
        const html2canvas = (await import('html2canvas')).default
        const jsPDF = (await import('jspdf')).default

        const pdfOptions = {
          margin: [15, 0, 15, 0],
          filename: `Certificate.pdf`,
          image: { type: 'jpeg', quality: 1 }, // Adjust quality as needed (0 to 1)
          html2canvas: {
            scale: 2, // Adjust scale as needed
            useCORS: true,
            logging: true,
            letterRendering: true,
            allowTaint: false,
            scrollY: -window.scrollY // Fix for scroll offset
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }

        // Temporarily remove the background color for PDF generation
        const originalBackgroundColor = certificateRef.current.style.background
        certificateRef.current.style.background = 'transparent'

        const canvas = await html2canvas(certificateRef.current, pdfOptions.html2canvas)
        const imgData = canvas.toDataURL('image/jpeg', pdfOptions.image.quality)
        // @ts-ignore
        const pdf = new jsPDF({ ...pdfOptions.jsPDF })
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297) // Adjust width and height as needed

        // Restore the original background color
        certificateRef.current.style.background = originalBackgroundColor

        pdf.save(pdfOptions.filename)
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentId = (user?.role.code === 'STUDENT' ? user.id : student_id) as string
        await getCertificate(id as string, studentId)
      } catch (error) {
        console.error('Error fetching certificate data:', error)
      }
    }

    fetchData()
  }, [id, student_id])

  if (!certificateData?.playList) {
    return (
      <Typography variant='h3' textAlign={'center'}>
        You are not eligible for certificate
      </Typography>
    )
  } else
    return (
      <>
        {user?.role.code === 'STUDENT' && (
          <Box display={'flex'} gap={5} justifyContent={'center'} mb={10} alignItems={'baseline'}>
            <Typography variant='h5' textAlign={'center'}>
              Congratulations On Completing{' '}
              <Typography component={'span'} variant='h5' color={theme.palette.customColors.themeColor}>
                {certificateData?.playList?.name} 🥳
              </Typography>
            </Typography>
            <Button variant='contained' color='primary' onClick={downloadCertificate}>
              Download Certificate
            </Button>
          </Box>
        )}
        <div
          ref={certificateRef}
          className={`${styles.section} ${classes.certificationSection}`}
          style={{ border: `2px dashed ${theme.palette.customColors.lightBg}` }}
        >
          <div className={styles.row}>
            <div className={styles.col1}>
              <div className={styles.certificatelogo}>
                {' '}
                <Image src='/images/logos/wealth-alliance-logo.png' alt='wealth-alliance-logo' width={280} height={100} />
              </div>
              {certificateData?.createdAt && (
                <h6 className={styles.date}>
                  {formatDistanceToNow(new Date(certificateData?.createdAt), { addSuffix: true })}
                </h6>
              )}
              <h1 className={styles.name}>
                {certificateData?.user?.first_name + ' ' + certificateData?.user?.last_name || 'Chrelle Lewis'}{' '}
              </h1>
              <p className={styles.para}>has successfully completed</p>
              <h2 className={styles.course}>{certificateData?.playList?.name}</h2>
              <p className={styles.para}>
                an online non-credit course authorized by Google and offered through The Wealth Alliance
              </p>
              <div className={styles.signature}>
                <h2 className={styles.googleline}>Teaminer-Academy</h2>
                <p className={styles.para}>Teaminer-Academy</p>
              </div>
            </div>
            <div className={styles.col2}>
              <div className={styles.courseimg}>
                <Image src='/images/logos/certify.png' alt='certify' width={280} height={660} />
              </div>
              <div className={styles.text}>
                <h5 className={styles.verify}>verify at coursera.org/verify/ZRNXREMC2JDZ</h5>
                <p className={styles.details}>
                  coursera has confirmed the idenitity of this individual and their participation in the
                  Teaminer-academy
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default Certificate
