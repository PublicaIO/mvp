const pageA = { template: '<div>Page A</div>' }
const pageB = { template: '<div>Page B</div>' }

export default [
    {
        path: '/page-a',
        component: pageA,
        alias: '/'
    },
    {
        path: '/page-b',
        component: pageB
    }
]