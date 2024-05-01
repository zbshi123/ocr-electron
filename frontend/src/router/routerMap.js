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
    path: '/test1',
    name: 'Test1',
    component: () => import('@/views/Test1.vue')
  },
  {
    path: '/test2',
    name: 'Test2',
    component: () => import('@/views/Test2.vue')
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
]

export default constantRouterMap