import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// const PageTwo = lazy(() => import('src/pages/dashboard/two'));
// const PageThree = lazy(() => import('src/pages/dashboard/three'));
// const PageFour = lazy(() => import('src/pages/dashboard/four'));
// const PageFive = lazy(() => import('src/pages/dashboard/five'));
// const PageSix = lazy(() => import('src/pages/dashboard/six'));

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
export const BlogPage = lazy(() => import('src/pages/Blog'));
export const UserPage = lazy(() => import('src/pages/User'));
export const ProductsPage = lazy(() => import('src/pages/Products'));
export const ProjectsPage = lazy(() => import('src/pages/Projects'));
export const DeploymentPage = lazy(() => import('src/pages/Deployment'));
export const PodPage = lazy(() => import('src/pages/Pod'));
export const Secret = lazy(() => import('src/pages/Secret'));
export const SecretNew = lazy(() => import('src/pages/Secret/new'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'user',
        element: <UserPage />,
      },
      {
        path: 'deployment',
        element: <DeploymentPage />,
      },
      {
        path: 'pod/:namespaceName/:deploymentName',
        element: <PodPage />,
      },
      {
        path: 'pod',
        element: <PodPage />,
      },
      {
        path: 'secret',
        element: <Secret />,
      },
      {
        path: 'secret/new',
        element: <SecretNew />,
      },
      { path: 'products', element: <ProductsPage /> },
      { path: 'blog', element: <BlogPage /> },
      {
        path: 'app',
        children: [
          {
            element: <UserPage />,
            index: true,
          },
          { path: 'one', element: <UserPage /> },
          { path: 'two', element: <ProjectsPage /> },
        ],
      },
      // {
      //   path: 'group',
      //   children: [
      //     { element: <PageFour />, index: true },
      //     { path: 'five', element: <PageFive /> },
      //     { path: 'six', element: <PageSix /> },
      //   ],
      // },
    ],
  },
];
