import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'

const FileUploader = () => {
    const fileInputRef = React.useRef<HTMLInputElement>(null)
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
    }

    function handleSubmit() {
        alert('Function not implemented.')
    }

  return (
    <Container className='text-center'>
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
        <Button className='mt-4' onClick={handleSubmit}>Get Notes</Button>
    </Container>
  )
}

export default FileUploader