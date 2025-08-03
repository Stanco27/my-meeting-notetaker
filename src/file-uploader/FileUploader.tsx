import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import './FileUploader.css'
import { getTranscription, startTranscription, uploadAudioFile } from '../APIs/api'

const FileUploader = () => {
    const fileInputRef = React.useRef<HTMLInputElement>(null)
    const [fileName, setFileName] = React.useState<string>('')
    const supportedFileTypes = ['mp3', 'mp4', 'wav', 'ogg', 'webm', 'm4a', 'flac', 'aac', 'pcm', 'mp2','opus']

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

    const pattern = new RegExp(`\\.(${supportedFileTypes.join('|')})$`, 'i')

        if (!file) {
            alert('Error: No file selected.')
            fileInputRef.current!.value = ''
        } else if (!pattern.test(file.name)) {
            alert('Error: Not a valid file type.')
            fileInputRef.current!.value = ''
        } else {
            alert(`Selected file: ${file.name}`)
        }
        setFileName(file ? file.name : '')
    }

    const handleSubmit = async () => {
        alert('Function not implemented.')
        const response = await uploadAudioFile(fileInputRef.current!.files![0])
        console.log('Audio file uploaded successfully:', response)
        const transcription = await getTranscription(response.transcriptId)
        console.log('Transcription result:', transcription)
    }

  return (
    <Container className='file-uploader-container'>
        <h1>Upload</h1>
        <Form>
            <Form.Group>
                <Form.Control 
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                />
            </Form.Group>
        </Form>
        {fileName != '' && (
            <p className='mt-3'>Selected file: {fileName}</p>
        )}
        <Button className='mt-4' onClick={handleSubmit}>Get Notes</Button>
    </Container>
  )
}

export default FileUploader