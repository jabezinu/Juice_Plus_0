import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Comment = () => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/comments')
        setComments(res.data.comments || [])
      } catch {
        setError('Failed to fetch comments')
      } finally {
        setLoading(false)
      }
    }
    fetchComments()
  }, [])

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {comments.map((comment, idx) => (
          <li key={comment._id || idx} className="bg-white shadow rounded p-4">
            <div className="font-semibold">{comment.author || 'Anonymous'}</div>
            <div className="text-gray-700 mt-1">{comment.text || comment.content || ''}</div>
            <div className="text-xs text-gray-400 mt-2">{comment.createdAt ? new Date(comment.createdAt).toLocaleString() : ''}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Comment
