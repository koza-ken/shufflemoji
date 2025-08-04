// import * as React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { TopPage } from './pages/TopPage';
import { GamePage } from './pages/GamePage';
import { ResultPage } from './pages/ResultPage';
import { NotFound } from './pages/NotFoundPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
			{/* <Route path="/" element={<Navigate to="/todo" replace={true} />} /> */}
			<Route path="/" element={<TopPage />} />
			<Route path="/game" element={<GamePage />} />
			<Route path="/result" element={<ResultPage />} />
			<Route path="*" element={<NotFound />} />
		</>,
  )
)

export const App = () => (
  <RouterProvider router={router} />
);
