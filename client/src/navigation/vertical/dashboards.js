// ** Icons Import
import { Home } from 'react-feather'

export default [
    {
        id: 'dashboard',
        title: 'Dashboard',
        action: 'read',
        resource: 'dashboard',
        icon: <Home size={20} />,
        badge: 'light-warning',
        navLink: '/dashboard/analytics'
    }
]
