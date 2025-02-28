import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("category/:categoryId", "routes/category.tsx", [
    route(":questionId", "routes/question.tsx"),
    route("results", "routes/results.tsx"),
  ]),
  route("seed", "routes/seed.tsx"),
  route("admin", "routes/admin.tsx")
] satisfies RouteConfig;