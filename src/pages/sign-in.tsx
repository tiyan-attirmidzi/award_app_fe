import Image from "next/image";

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  Col, Form,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { ErrorSignInTypes, SignInTypes } from "../cores/types/auth.dto";
import SignInValidation from "../cores/validates/auth.validate";
import signInService from "../services/auth";
import ButtonCustom from "../components/atoms/forms/ButtonCustom";
import TextFieldCustom from "../components/atoms/forms/TextFieldCustom";

export default function SignInPage() {
  const router = useRouter();

  const [values, setValues] = useState<SignInTypes>({ email: "" });
  const [errors, setErrors] = useState<ErrorSignInTypes>({});
  const [loading, setLoading] = useState(false);

  const onChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errs = SignInValidation(values);

    if (errs && Object.keys(errs).length > 0) {
      return setErrors(errs);
    }

    // set errors to default
    setErrors({});
    setLoading(true);

    setTimeout(async () => {
      const response = await signInService(values);

      if (response.error) {
        toast.error(response.data.message);
      } else {
        const token = btoa(response.data.data.token);
        Cookies.set('token', token);
        toast.success(response.data.message);
        router.push('/');
      }

      setLoading(false);
    }, 3000);
  };

  return (

    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center cs-sign-in-content">

      <Image
        src="/images/award.png"
        className="Image-fluid gradient-main"
        alt="Award Logo"
        width={215}
        height={215}
      />

      <p className="text-center text-uppercase h5 text-body-secondary m-3">
        Enter your email address to sign in and continue
      </p>

      <Form onSubmit={onSubmitSignIn}>
        <Col lg="12">
          <TextFieldCustom
            value={values.email}
            id="emailBlock"
            name="email"
            type="text"
            placeholder="Enter your Email Address"
            onChange={onChangeValues}
            error={!!errors.email}
            errorMessage={errors.email ? errors.email : ""}
          />
          <Form.Text id="emailBlock" muted>
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Col>

        <div className="d-flex justify-content-center mt-3">
          <ButtonCustom
            label="SIGN IN"
            type="submit"
            variant="btn cs-sign-in-btn fw-medium text-white"
            loading={loading}
          />
        </div>
      </Form>

    </div>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
