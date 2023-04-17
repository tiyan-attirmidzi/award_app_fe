import { Button } from "react-bootstrap";

interface ButtonCustomProps {
  label: string
  type?: "button" | "submit" | "reset" | undefined
  variant?: string | undefined
  loading?: boolean | undefined
}

export default function ButtonCustom(props: ButtonCustomProps) {
  const {
    label, type, variant, loading,
  } = props;
  return (
    <Button type={type} variant={variant} disabled={loading}>
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          &nbsp;
          Loading...
        </>
      ) : label}
    </Button>
  );
}
