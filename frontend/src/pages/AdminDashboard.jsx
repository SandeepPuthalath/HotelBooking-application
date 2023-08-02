import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  return <div>
    <p>Go to applications</p>
    <Link to="users">users</Link>
    </div>
}

export default AdminDashboard
