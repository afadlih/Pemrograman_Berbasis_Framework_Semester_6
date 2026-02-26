import Navbar from "../Navbar";

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  return (
    <main>
      <Navbar />
      {children}
      <footer>
        <p>Footer AppShell</p>
      </footer>
    </main>
  );
};

export default AppShell;
