/**
 * 基础路由
 * @type { *[] }
 */

const constantRouterMap = [
/*   {
    path: '/',
    name: 'Example',
    redirect: { name: 'ExampleHelloIndex' },
    children: [
      {
        path: '/example',
        name: 'ExampleHelloIndex',
        component: () => import('@/views/example/hello/Index.vue')
      },
    ]
  }, */
  {
    path: '/',
    name: 'Upload',
    component: () => import('@/views/Upload.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/Test.vue')
  },
  {
    path: '/process',
    name: 'Process',
    component: () => import('@/views/Process.vue')
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('@/views/Upload.vue')
  },
  {
    path: '/tables',
    name: 'Tables',
    component: () => import('@/views/Tables.vue')
  },
]

export default constantRouterMap