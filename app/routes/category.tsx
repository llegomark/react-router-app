import { Outlet } from 'react-router';
import type { Route } from './+types/category';

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Quiz" },
    { name: "description", content: "Take the quiz" },
  ];
};

export default function CategoryLayout() {
  return <Outlet />;
}
