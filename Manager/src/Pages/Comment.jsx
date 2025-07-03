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
        setComments(res.data.comments)
      } catch (err) {
        setError('Failed to fetch comments')
      } finally {
        setLoading(false)
      }
    }
    fetchComments()
  }, [])

  if (loading) return <div className="p-4">Loading comments...</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.length === 0 ? (
        <div>No comments found.</div>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c._id} className="border rounded p-3 bg-white shadow">
              <div className="font-semibold">
                {c.anonymous ? 'Anonymous' : c.name || 'No Name'}
                <span className="text-xs text-gray-400 ml-2">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="mt-1 text-gray-700">{c.comment}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Comment
