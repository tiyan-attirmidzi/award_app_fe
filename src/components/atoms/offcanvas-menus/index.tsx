import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { Nav, Offcanvas } from "react-bootstrap";
import { toast } from "react-toastify";
// eslint-disable-next-line import/no-extraneous-dependencies
import Swal from "sweetalert2";

interface OffcanvasMenuProps {
  isShow: boolean
  handleHide: () => void;
}

export default function OffcanvasMenu(props: OffcanvasMenuProps) {
  const { isShow, handleHide } = props;

  const router = useRouter();

  const onClickSignOut = () => {
    Swal.fire({
      title: 'Are you sure, you want to Sign Out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#fda516',
      confirmButtonText: 'Sign Out',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Cookies.remove('token');
        toast.success('User Signed Out Successfully.');
        router.push('/sign-in');
      }
    });
  };

  return (
    <Offcanvas show={isShow} onHide={handleHide} placement="start" name="start" className="cs-w-offcanvas-menu">
      <Image
        src="/images/award.png"
        className="Image-fluid gradient-main mt-5 mb-3 mx-3"
        alt="images"
        width={128}
        height={128}
      />
      <Offcanvas.Header>
        <Offcanvas.Title>Awards Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column">
          <Nav.Link href="/" className="text-dark fw-medium">Home</Nav.Link>
          <Nav.Link className="text-secondary" disabled>Cards</Nav.Link>
          <Nav.Link className="text-secondary" disabled>Profile</Nav.Link>
          <Nav.Link className="text-dark" onClick={onClickSignOut}>
            Sign Out
          </Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
