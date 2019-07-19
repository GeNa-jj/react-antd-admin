// 首页
import Home from '../pages/home'
import NotFound from '../pages/404'
import Text from '../pages/text'

export const MenusConfig = [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/text/can',
			name: 'Home',
			component: Text
		},
		{
			path: '/exception/404',
			name: 'NotFound',
			component: NotFound
		}
]
