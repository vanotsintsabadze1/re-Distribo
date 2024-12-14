interface Props {
  children: React.ReactNode;
}

export default function UnauthenticatedLayout({ children }: Props) {
  return <>{children}</>;
}
