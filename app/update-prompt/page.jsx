'use client'
import React, { useEffect ,useState} from 'react'


import { useRouter ,useSearchParams} from 'next/navigation'
import Form from '@components/Form'

const EditPrompt = () => {
    const router = useRouter()
    
const [submitting,setSubmitting] = useState(false)
const [post,setPost] = useState({
    prompt:'',
    tag:''
})
const searchParmas = useSearchParams()
const promptId =searchParmas.get('id')
useEffect(() => {
const getPromptDetails = async() => {
    const response = await fetch(`/api/prompt/${promptId}`)
    const data = await response.json()
    setPost({
        prompt:data.prompt,
        tag:data.tag
    })
}
if(promptId) getPromptDetails()
},[promptId])

const updatePrompt = async (e) => {
e.preventDefault()
setSubmitting(true)

if(!promptId) return alert("Prompt Id not found")

try {
    const response = await fetch(`/api/prompt/${promptId}`,{
method:'PATCH',
body:JSON.stringify({
    prompt:post.prompt,
    tag:post.tag
})

    })
    if(response.ok){
        router.push('/')
    }
} catch (error) {
    console.log(error)
}finally{
    setSubmitting(true)
}

}
  return (
    <Form 
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt
