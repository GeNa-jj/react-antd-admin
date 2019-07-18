// 首页
import Home from '../pages/home'
import NotFound from '../pages/404'
import Text from '../pages/text'

export const MenusConfig = [
		{
			path: '/app/index',
			name: 'Home',
			component: Home
		},
		{
			path: '/app/text/can',
			name: 'Home',
			component: Text
		},
		{
			path: '/app/exception/404',
			name: 'NotFound',
			component: NotFound
		}
]
