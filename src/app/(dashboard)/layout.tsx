// (فكرة فقط)
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="dashboard">{children}</div>;
}

// // src/app/(dashboard)/layout.tsx
// import AuthGate from "@/guards/AuthGate";
// import RoleGate from "@/guards/RoleGate";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <AuthGate>
//       <RoleGate group="admins">{children}</RoleGate>
//     </AuthGate>
//   );
// }
