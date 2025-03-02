import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("reviewer", "routes/reviewer.tsx"),
  route("category/:categoryId", "routes/category.tsx", [
    route(":questionId", "routes/question.tsx"),
    route("results", "routes/results.tsx"),
  ]),
  route("pricing", "routes/pricing.tsx"),
  route("faq", "routes/faq.tsx"),
  route("refund-policy", "routes/refund-policy.tsx"),
  route("payment-methods", "routes/payment-methods.tsx"),
  route("seed", "routes/seed.tsx"),
  route("admin", "routes/admin.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("terms", "routes/terms.tsx"),
  route("deped-order", "routes/deped-order.tsx"),
  route("*", "routes/not-found.tsx")
] satisfies RouteConfig;