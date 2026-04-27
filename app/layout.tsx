// Root layout — intentionally minimal.
// The [locale] layout provides <html> and <body> for all lander routes.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children as React.ReactElement}
    
    </>
  );
}
