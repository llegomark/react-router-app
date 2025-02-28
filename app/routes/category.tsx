import { Outlet } from 'react-router';

export function meta() {
  return [
    { title: "Quiz" },
    { name: "description", content: "Take the quiz" },
  ];
}

export default function CategoryLayout() {
  return <Outlet />;
}