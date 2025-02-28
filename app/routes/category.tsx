import { Outlet } from 'react-router';
import type { Route } from './+types/category';

export const meta: Route.MetaFunction = () => {
  return [
    { title: "NQESH Reviewer" },
    { name: "description", content: "Take the NQESH Reviewer" },
  ];
};

export default function CategoryLayout() {
  return <Outlet />;
}
