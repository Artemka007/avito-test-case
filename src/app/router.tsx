import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { AdDetailsPage } from '@/pages/ad-details-page';
import { AdEditPage } from '@/pages/ad-edit-page';
import { AdsListPage } from '@/pages/ads-list-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { AppShell } from '@/shared/ui/app-shell';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/ads" replace />,
      },
      {
        path: 'ads',
        element: <AdsListPage />,
      },
      {
        path: 'ads/:id',
        element: <AdDetailsPage />,
      },
      {
        path: 'ads/:id/edit',
        element: <AdEditPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
